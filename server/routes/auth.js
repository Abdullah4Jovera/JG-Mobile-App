const router = require("express").Router();
const passport = require("../passport");
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils');
const User = require('../models/userModel'); 
const bcrypt = require('bcrypt');

// Login routes
router.get("/login/success", (req, res) => {
    if (req.user) {
        const token = generateToken(req.user);
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: { ...req.user.toObject(), token }, 
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
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
        const user = await User.findOne({ email });
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




module.exports = router;
