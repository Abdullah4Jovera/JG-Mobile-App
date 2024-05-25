const express = require('express');
const router = express.Router();
const PersonalLoan = require('../models/personalLoanModel');
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
// POST route to apply for a personal loan
router.post('/apply-for-personal-loan', async (req, res) => {
    try {
      const { companyName, loanAmount, monthlySalary, anyLoan, message, userId } = req.body;
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the user has provided all required profile information
      if (!user.name || !user.email || !user.contactNumber) {
        return res.status(400).json({ error: 'Incomplete profile. Please provide your name, email, and contact number before applying for a loan' });
      }
  
      // Check if the user has already applied for a personal loan
      if (user.personalLoans.length > 0) {
        return res.status(400).json({ error: 'User has already applied for a personal loan' });
      }
  
      // Create a new personal loan application
      const personalLoan = new PersonalLoan({
        companyName,
        loanAmount,
        monthlySalary,
        anyLoan,
        message,
        userId
      });
  
      // Save the personal loan application
      await personalLoan.save();
  
      // Update the user document with the loan's ID
      user.personalLoans.push(personalLoan._id);
      await user.save();
  
      res.status(201).json({ message: 'Personal loan application submitted successfully' });
    } catch (error) {
      console.error('Error submitting personal loan application:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.put('/upload-documents/:loanId', isAuth, isUser, upload.array('documents', 5), async (req, res) => {
    try {
        const { loanId } = req.params;
        const userId = req.user._id; // Get user ID from req.user
      
        // Find the personal loan by ID
        const personalLoan = await PersonalLoan.findById(loanId);
        if (!personalLoan) {
            return res.status(404).json({ error: 'Personal loan not found' });
        }

        // Check if the user ID matches the user ID associated with the loan
        if (personalLoan.userId.toString() !== userId.toString()) {
          return res.status(401).json({ error: 'Unauthorized. User does not have permission to upload documents for this loan' });
      }
      

        // Upload new documents to Cloudinary
        const uploadedDocuments = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            uploadedDocuments.push(result.secure_url);
        }

        // Append new documents to existing documents
        personalLoan.documents = [...personalLoan.documents, ...uploadedDocuments];

        // Save the updated documents for the personal loan
        await personalLoan.save();

        res.status(200).json({ message: 'Documents uploaded successfully' });
    } catch (error) {
        console.error('Error uploading documents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;