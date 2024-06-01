const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    contactNumber: { type: String, unique: true, sparse: true },
    image: { type: String },
    otp: { type: String, default: null },
    otpExpiration: { type: Date, default: null }, // Add field for OTP expiration
    resetToken: { type: String, default: null }, // Add field for reset token
    resetTokenExpiration: { type: Date, default: null }, // Add field for reset token expiration
    role: {
      type: String,
      enum: ['user', 'superadmin', 'personalloanmanger', 'businessfinanceloanmanger', 'realestateloanmanger', 'mortgageloanmanger'],
      default: 'user', // Default role is set to 'user'
      required: true,
    },
    googleId: { type: String, unique: true, sparse: true }, // Ensure unique but allow null values
    delStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
