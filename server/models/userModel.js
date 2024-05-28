const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    contactNumber: { type: String, unique: true, }, 
    image: { type: String },
    otp: { type: String, default: null },
    role: {
      type: String,
      enum: ['user', 'superadmin', 'personalloanmanger', 'businessfinanceloanmanger', 'realestateloanmanger', 'mortageloanmanger'],
      default: 'user', // Default role is set to 'user'
      required: true,
    },     
    googleId: { type: String, unique: true },
    delStatus : { type: Boolean, default: false },
    // References to loan models
    // personalLoans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PersonalLoan' }],
    // businessFinanceLoans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessFinanceLoan' }],
    // mortgageLoans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MortgageLoan' }],
    // realEstateLoans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RealEstateLoan' }]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
