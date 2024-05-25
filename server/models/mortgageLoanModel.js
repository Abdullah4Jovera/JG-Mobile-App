const mongoose = require('mongoose');

const mortgageLoanSchema = new mongoose.Schema({
  typeOfProperty: {
    type: String,
    required: true
  },
  propertyLocation: {
    type: String,
    required: true
  },
  monthlyIncome: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  applicationDate: { type: Date, default: Date.now },
  delStatus : { type: Boolean, default: false },
  documents: [
    {
      type: String
    }
  ]
});

const MortgageLoan = mongoose.model('MortgageLoan', mortgageLoanSchema);

module.exports = MortgageLoan;