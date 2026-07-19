const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    getProfile,
    resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// User Signup
router.post("/signup", signup);

// User Login
router.post("/login", login);
// forgot password
router.post("/reset-password", resetPassword);

// Get Logged In User Profile
router.get("/profile", protect, getProfile);

module.exports = router;