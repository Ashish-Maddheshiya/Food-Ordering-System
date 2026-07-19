const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id },
        process.env.JWT_SECRET, {
            expiresIn: "7d",
        }
    );
};

// ==========================
// User Signup
// ==========================
exports.signup = async(req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Create User
        const user = await User.create({
            name,
            email,
            password,
            phone,
        });

        // Create safe user object (Don't send password)
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profileImage: user.profileImage,
        };

        res.status(201).json({
            success: true,
            message: "Signup successful",
            token: generateToken(user._id),
            user: userData,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================
// User Login
// ==========================
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        // Compare Password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        // Create safe user object (Don't send password)
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profileImage: user.profileImage,
        };

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: generateToken(user._id),
            user: userData,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================
// Get Logged In User Profile
// ==========================
exports.getProfile = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.resetPassword = async(req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.password = password;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};