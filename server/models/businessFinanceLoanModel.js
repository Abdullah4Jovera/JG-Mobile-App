
const mongoose = require('mongoose');

const businessFinanceLoanSchema = new mongoose.Schema({
  services: {
    type: String,
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

const BusinessFinanceLoan = mongoose.model('BusinessFinanceLoan', businessFinanceLoanSchema);

module.exports = BusinessFinanceLoan;