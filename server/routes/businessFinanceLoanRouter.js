const express = require('express');
const router = express.Router();
const BusinessFinanceLoan = require('../models/businessFinanceLoanModel');
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { isAuth, isUser, isSuperAdmin , isBFM } = require('../utils');
const storage = multer.diskStorage({});
const upload = multer({ storage });
const { getIO } = require('../socket');

// POST route to apply for a business finance loan 
router.post('/apply-for-business-finance-loan', isAuth, isUser, async (req, res) => {
    try { 
        const { services, message, companyName, companyTurnoverAnually, companyAutoFinance, totalEMIDpaidMonthly, LGRequestFor, posTurnoverMonthly, companyPOS } = req.body;
        const userId = req.user._id;
        const io = getIO();
        
        // Check if the user exists 
        const user = await User.findById(userId); 
        if (!user) { 
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user has provided all required profile information
        if (!user.name || !user.email || !user.contactNumber) {
            return res.status(400).json({ error: 'Incomplete profile. Please provide your name, email, and contact number before applying for a loan' });
        }

        // Check if the user has already applied for a loan with the same services
        // const existingLoan = await BusinessFinanceLoan.findOne({ userId, services });
        // if (existingLoan) {
        //     return res.status(400).json({ error: 'You have already applied for a loan with  this services' });
        // }

        // Create a new business finance loan application
        const businessFinanceLoan = new BusinessFinanceLoan({
            services,
            message,
            userId,
            companyName,
            companyTurnoverAnually,
            companyAutoFinance,
            totalEMIDpaidMonthly,
            LGRequestFor,
            posTurnoverMonthly,
            companyPOS
        });

        // Save the business finance loan application
        await businessFinanceLoan.save();

        // Fetch all users with the role of 'superadmin'
        const superAdmins = await User.find({ role: 'superadmin' });

        // Save notifications to the database and emit real-time notifications
        for (const superAdmin of superAdmins) {
            const notification = new Notification({
                sender: userId,
                receiver: superAdmin._id,
                entityType: 'businessFinanceLoans',
                entityId: businessFinanceLoan._id,
                message: 'A new business finance loan application has been submitted from a client.',
            });
            await notification.save();

            // Emit notification to active superadmin users
            io.to(superAdmin._id.toString()).emit('newLoanApplication', {
                message: notification.message,
                loanId: notification.entityId,
                entityType: notification.entityType
            });
        }

        res.status(201).json({ message: 'Business finance loan application submitted successfully' });
    } catch (error) {
        console.error('Error submitting business finance loan application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/upload-documents/:loanId', isAuth, isUser, async (req, res) => {
    try {
        const { loanId } = req.params;
        const userId = req.user._id;
        const { documents } = req.body;

        // Check if documents array is provided and in correct format
        if (!documents || !Array.isArray(documents) || documents.length === 0) {
            return res.status(400).json({ error: 'Documents URLs not provided or invalid format' });
        }
        if (documents.some(doc => typeof doc !== 'string')) {
            return res.status(400).json({ error: 'Invalid format for documents' });
        }
        
        // Find the business finance loan by ID
        const businessFinanceLoan = await BusinessFinanceLoan.findById(loanId);
        if (!businessFinanceLoan) {
            return res.status(404).json({ error: 'Business finance loan not found' });
        }

        // Check if the user has permission to upload documents for this loan
        if (businessFinanceLoan.userId.toString() !== userId.toString()) {
            return res.status(401).json({ error: 'Unauthorized. User does not have permission to upload documents for this loan' });
        }

        // Ensure businessFinanceLoan.documents is an array
        if (!Array.isArray(businessFinanceLoan.documents)) {
            businessFinanceLoan.documents = [];
        }

        // Append new document URLs to existing documents array
        businessFinanceLoan.documents.push(...documents);

        // Save the updated documents for the business finance loan
        await businessFinanceLoan.save();

        res.status(200).json({ message: 'Documents URLs saved successfully' });
    } catch (error) {
        console.error('Error submitting documents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


 
// GET route to get all business finance loans (for Business Finance Manger)
router.get('/all-business-finance-loans', isAuth , isBFM,  async (req, res) => {
    try {
        // Find all business finance loans and populate the userId field with name and email only
        const businessFinanceLoans = await BusinessFinanceLoan.find().populate({
            path: 'userId',
            select: 'name email'
        });
        res.status(200).json({ businessFinanceLoans });
    } catch (error) {
        console.error('Error fetching all business finance loans:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// PUT route to update the status of a business finance loan (for superadmin)
router.put('/update-loan-status/:loanId', isAuth, isBFM, async (req, res) => {
    try {
        const { loanId } = req.params;
        const { status } = req.body;
        const io = getIO(); 

        // Check if the provided status is valid
        if (!['Request To Call', 'Submit Documents', 'Follow Up', 'Request To Signature', 'Reject'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status provided' });
        }

        // Find the business finance loan by ID
        const loan = await BusinessFinanceLoan.findById(loanId);
        if (!loan) {
            return res.status(404).json({ error: 'Business finance loan not found' });
        }

        // Update the status
        loan.status = status;
        await loan.save();

        // Create a notification for the user
        const notification = new Notification({
            sender: req.user._id,
            receiver: loan.userId,
            entityType: 'business_finance_loan',
            entityId: loan._id,
            message: `Loan status has been changed to ${status}.`,
        });
        await notification.save();

        // Emit notification to the user
        io.to(loan.userId.toString()).emit('loanStatusChanged', {
            message: notification.message,
            loanId: notification.entityId,
        });

        res.status(200).json({ message: 'Loan status updated successfully' });
    } catch (error) {
        console.error('Error updating loan status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;