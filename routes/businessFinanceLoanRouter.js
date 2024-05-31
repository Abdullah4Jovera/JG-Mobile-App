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
        const { services, message } = req.body;
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

        // Create a new business finance loan application
        const businessFinanceLoan = new BusinessFinanceLoan({
            services,
            message,
            userId
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
                entityType: 'business_finance_loan',
                entityId: businessFinanceLoan._id,
                message: 'A new business finance loan application has been submitted from a client.',
            });
            await notification.save();

            // Emit notification to active superadmin users
            io.to(superAdmin._id.toString()).emit('newLoanApplication', {
                message: notification.message,
                loanId: notification.entityId,
            });
        }

        res.status(201).json({ message: 'Business finance loan application submitted successfully' });
    } catch (error) {
        console.error('Error submitting business finance loan application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/upload-documents/:loanId', isAuth, isUser, upload.array('documents', 5), async (req, res) => {
    try {
        const { loanId } = req.params;
        const userId = req.user._id;
        // Find the business finance loan by ID
        const businessFinanceLoan = await BusinessFinanceLoan.findById(loanId);
        if (!businessFinanceLoan) {
            return res.status(404).json({ error: 'Business finance loan not found' });
        }
        if (businessFinanceLoan.userId.toString() !== userId.toString()) {
            return res.status(401).json({ error: 'Unauthorized. User does not have permission to upload documents for this loan' });
        }
        // Ensure businessFinanceLoan.documents is an array
        if (!Array.isArray(businessFinanceLoan.documents)) {
            businessFinanceLoan.documents = [];
        }
        // Upload new documents to Cloudinary
        const uploadedDocuments = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            uploadedDocuments.push(result.secure_url);
        }

        // Append new documents to existing documents
        businessFinanceLoan.documents.push(...uploadedDocuments);

        // Save the updated documents for the business finance loan
        await businessFinanceLoan.save();

        res.status(200).json({ message: 'Documents uploaded successfully' });
    } catch (error) {
        console.error('Error uploading documents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 
// GET route to get all business finance loans (for superadmin)
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
router.put('/update-loan-status/:loanId', isAuth, isSuperAdmin, async (req, res) => {
    try {
        const { loanId } = req.params;
        const { status } = req.body;

        // Check if the provided status is valid
        if (!['pending', 'approved', 'rejected'].includes(status)) {
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

        res.status(200).json({ message: 'Loan status updated successfully' });
    } catch (error) {
        console.error('Error updating loan status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;