const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../Controllers/authController");
const { protect } = require("../Middlewares/authMiddleware");
const upload = require("../Middlewares/uploadMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); // Register A New User
router.post("/login", loginUser); // Login A User
router.get("/profile", protect, getUserProfile); // Get User Profile

/*
req.body -> form-data -> key (image) -> value (file)
*/
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No File Uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
}); // Upload Profile Image

module.exports = router;
