const User = require("../Schema/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// @desc     Register A New User
// @route    POST /api/auth/register
// @access   Public
const registerUser = async (req, res) => {};

// @desc     Login A User
// @route    POST /api/auth/login
// @access   Public
const loginUser = async (req, res) => {};

// @desc     Get User Profile
// @route    GET /api/auth/profile
// @access   Private {Requires JWT Token}
const getUserProfile = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
