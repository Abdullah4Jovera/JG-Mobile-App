const express = require('express');
const router = express.Router();
const BusinessFinanceLoan = require('../models/businessFinanceLoanModel');
const MortgageLoan = require('../models/mortgageLoanModel');
const PersonalLoan = require('../models/personalLoanModel');
const RealEstateLoan = require('../models/realEstateLoanModel');
const { isAuth, isUser, isSuperAdmin, isBFM } = require('../utils');
const User = require('../models/userModel');

// Route to get all types of loans for a specific user
router.get('/my-loans', isAuth, isUser, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Find loans associated with the user ID
    const businessFinanceLoans = await BusinessFinanceLoan.find({ userId });
    const mortgageLoans = await MortgageLoan.find({ userId });
    const personalLoans = await PersonalLoan.find({ userId });
    const realEstateLoans = await RealEstateLoan.find({ userId });
    
    res.json({
      businessFinanceLoans,
      mortgageLoans,
      personalLoans,
      realEstateLoans
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Route to get all types of loans for all users (for superadmin)
router.get('/all-loans', isAuth, isSuperAdmin, async (req, res) => {
  try {
    // Find all loans and populate with user details
    const allBusinessFinanceLoans = await BusinessFinanceLoan.find().populate('userId', 'name email contactNumber');
    const allMortgageLoans = await MortgageLoan.find().populate('userId', 'name email contactNumber');
    const allPersonalLoans = await PersonalLoan.find().populate('userId', 'name email contactNumber');
    const allRealEstateLoans = await RealEstateLoan.find().populate('userId', 'name email contactNumber');
    
    res.json({
      allBusinessFinanceLoans,
      allMortgageLoans, 
      allPersonalLoans,
      allRealEstateLoans
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single loan by ID for superadmin
router.get('/loans/:type/:id', isAuth, isBFM, async (req, res) => {
  try {
    const { type, id } = req.params;
    let loan;
    switch(type) {
      case 'businessFinanceLoans':
        loan = await BusinessFinanceLoan.findById(id).populate('userId', 'name email contactNumber');
        break;
      case 'mortgageLoans':
        loan = await MortgageLoan.findById(id).populate('userId', 'name email contactNumber');
        break;
      case 'personalLoans':
        loan = await PersonalLoan.findById(id).populate('userId', 'name email contactNumber');
        break;
      case 'realEstateLoans':
        loan = await RealEstateLoan.findById(id).populate('userId', 'name email contactNumber');
        break;
      default:
        return res.status(400).json({ error: 'Invalid loan type' });
    }
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Route to get a single loan information for a specific user
router.get('/loan/:loanId/:loanType', isAuth, isUser, async (req, res) => {
  const { loanType, loanId } = req.params;
  const userId = req.user._id;
  let loanModel;

  try {
    // Determine which loan model to use based on loanType parameter
    switch (loanType) {
      case 'businessFinanceLoans':
        loanModel = BusinessFinanceLoan;
        break;
      case 'mortgageLoans':
        loanModel = MortgageLoan;
        break;
      case 'personalLoans':
        loanModel = PersonalLoan;
        break;
      case 'realEstateLoans':
        loanModel = RealEstateLoan;
        break;
      default:
        return res.status(400).json({ error: 'Invalid loan type' });
    }

    // Find the specific loan for the user
    const loan = await loanModel.findOne({ _id: loanId, userId });
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found for the user' });
    }

    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single loan information for a specific user
router.get('/single-loan-for-superadmin/:loanId/:loanType', isAuth, isSuperAdmin, async (req, res) => {
  const { loanType, loanId } = req.params;
  let loanModel;

  try {
    // Determine which loan model to use based on loanType parameter
    switch (loanType) {
      case 'businessFinanceLoans':
        loanModel = BusinessFinanceLoan;
        break;
      case 'mortgageLoans':
        loanModel = MortgageLoan;
        break;
      case 'personalLoans':
        loanModel = PersonalLoan;
        break;
      case 'realEstateLoans':
        loanModel = RealEstateLoan;
        break;
      default:
        return res.status(400).json({ error: 'Invalid loan type' });
    }

    // Find the specific loan for the user
    const loan = await loanModel.findOne({ _id: loanId });
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found for the user' });
    }

    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
