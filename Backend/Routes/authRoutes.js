const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../Controllers/authController");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); // Register A New User
router.post("/login", loginUser); // Login A User
router.get("/profile", protect, getUserProfile); // Get User Profile

module.exports = router;
