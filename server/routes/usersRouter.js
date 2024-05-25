const router = require("express").Router();
const passport = require("../passport");
const jwt = require('jsonwebtoken');
const { generateToken, isAuth } = require('../utils');
const User = require('../models/userModel'); 
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const BusinessFinanceLoan = require('../models/businessFinanceLoanModel');
const MortgageLoan = require('../models/mortgageLoanModel');
const RealEstateLoan = require('../models/realEstateLoanModel');
const { OAuth2Client } = require("google-auth-library");
// Middleware to parse JSON request bodies

cloudinary.config({
    cloud_name: 'dn1oz4vt9',
    api_key: '376365558848471',
    api_secret: 'USb46ns9p4V7fAWMppTP54xiv00'
});

// Configure multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });
const client = new OAuth2Client("914723857650-1qa0dsvirt7gkgdgb8svb01j629efa5n.apps.googleusercontent.com");

router.post("/google-signin", async (req, res) => {
    try {
        const { accessToken, userData } = req.body; // Extract the access token and user data from the request body

        // Process user data as needed
        const googleId = userData.id; // Unique identifier for the user provided by Google

        // Check if the user already exists in the database
        let user = await User.findOne({ googleId }).populate([
            { path: 'personalLoans' },
            { path: 'businessFinanceLoans' },
            { path: 'mortgageLoans' },
            { path: 'realEstateLoans' }
        ]);

        if (!user) {
            // If user doesn't exist, create a new user in the database
            user = new User({
                googleId,
                name: userData.name,
                email: userData.email,
                image: userData.picture
            });
            await user.save();
        }

        // Generate token
        const token = generateToken(user);

        // Omit the password field from the user object in the response
        const userWithoutPassword = { ...user.toObject(), password: undefined };

        // Include token inside the user object
        userWithoutPassword.token = token;

        res.status(200).json({ error: false, message: "Google Sign-In successful", user: userWithoutPassword });
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        res.status(500).json({ error: true, message: "Google Sign-In Error" });
    }
});


  

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, contactnumber, image } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: true, message: "User with this email is already registered. Please login." });
        }
        const existingUserPhone = await User.findOne({ contactnumber });
        if (existingUserPhone) {
            return res.status(400).json({ error: true, message: "User with this contact number is already registered. Please login." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword, 
            contactnumber,
            image,
        });
        const user = await newUser.save();
        res.status(201).json({ error: false, message: "User registered successfully",});
    } catch (error) {
        res.status(400).json({ error: true, message: "Registration failed", details: error.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email }).populate([
            { path: 'personalLoans' },
            { path: 'businessFinanceLoans' },
            { path: 'mortgageLoans' },
            { path: 'realEstateLoans' }
        ]);

        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        // Check if password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: true, message: "Incorrect password" });
        }

        // Generate token
        const token = generateToken(user);

        // Omit the password field from the user object in the response
        const userWithoutPassword = { ...user.toObject(), password: undefined };

        // Include token inside the user object
        userWithoutPassword.token = token;

        res.status(200).json({ error: false, message: "Login successful", user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error", details: error.message });
    }
});


router.put("/edit-profile", isAuth , upload.single('image'), async (req, res) => {
    try {
        const {  name, email, contactNumber, password } = req.body;
        let { image } = req.body;
        const userId = req.user._id;

        // Find user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        // Update user information
        user.name = name || user.name;
        user.email = email || user.email;
        user.contactNumber = contactNumber || user.contactNumber;

        // Update password if provided
        if (password) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Upload image to Cloudinary if provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            image = result.secure_url;
        }

        user.image = image || user.image;

        // Save updated user
        const updatedUser = await user.save();

        res.status(200).json({ error: false, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error", details: error.message });
    }
});




module.exports = router;
