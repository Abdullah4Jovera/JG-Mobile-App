const express = require('express');
const router = express.Router();
const MortgageLoan = require('../models/mortgageLoanModel');
const User = require('../models/userModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { isAuth, isUser } = require('../utils');
const storage = multer.diskStorage({});
const upload = multer({ storage });
cloudinary.config({
    cloud_name: 'dn1oz4vt9',
    api_key: '376365558848471',
    api_secret: 'USb46ns9p4V7fAWMppTP54xiv00'
});

// POST route to apply for a mortgage loan
router.post('/apply-for-mortgage-loan', async (req, res) => {
    try {
        const { typeOfProperty, propertyLocation, monthlyIncome, message, userId } = req.body;
        
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user has provided all required profile information
        if (!user.name || !user.email || !user.contactNumber) {
            return res.status(400).json({ error: 'Incomplete profile. Please provide your name, email, and contact number before applying for a loan' });
        }
        const existingLoan = await MortgageLoan.findOne({ userId });
        if (existingLoan) {
            return res.status(400).json({ error: 'User has already applied for a Mortgage loan' });
        }

        // Create a new mortgage loan application
        const mortgageLoan = new MortgageLoan({
            typeOfProperty,
            propertyLocation,
            monthlyIncome,
            message,
            userId
        });

        // Save the mortgage loan application
        await mortgageLoan.save();

        // Push the ID of the loan into the user's loans array
        user.mortgageLoans.push(mortgageLoan._id);
        await user.save();

        res.status(201).json({ message: 'Mortgage loan application submitted successfully' });
    } catch (error) {
        console.error('Error submitting mortgage loan application:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/upload-documents/:loanId', isAuth, isUser, upload.array('documents', 5), async (req, res) => {
    try {
        const { loanId } = req.params;
        const userId = req.user._id; 
        
        // Find the mortgage loan by ID
        const mortgageLoan = await MortgageLoan.findById(loanId);
        if (!mortgageLoan) {
            return res.status(404).json({ error: 'Mortgage loan not found' });
        }
        if (mortgageLoan.userId.toString() !== userId.toString()) {
            return res.status(401).json({ error: 'Unauthorized. User does not have permission to upload documents for this loan' });
        }
        
        // Check if documents were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No documents uploaded' });
        }

        // Ensure mortgageLoan.documents is an array
        if (!Array.isArray(mortgageLoan.documents)) {
            mortgageLoan.documents = [];
        }

        // Upload new documents to Cloudinary
        const uploadedDocuments = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            uploadedDocuments.push(result.secure_url);
        }

        // Append new documents to existing documents
        mortgageLoan.documents.push(...uploadedDocuments);

        // Save the updated documents for the mortgage loan
        await mortgageLoan.save();

        res.status(200).json({ message: 'Documents uploaded successfully' });
    } catch (error) {
        console.error('Error uploading documents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
