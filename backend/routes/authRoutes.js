const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  verifyOTP,
  resendOTP,
} = require("../controllers/authController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const { admin } = require("../middlewares/adminMiddleware.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

module.exports = router;
