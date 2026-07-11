const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

      newUser.otp = hashedOTP;
      newUser.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
      await newUser.save();

      const message = `Welcome to ShopNest, ${name}!

Your OTP for email verification is:

${otp}

This OTP will expire in 10 minutes.`;

      await sendEmail({
        to: email,
        subject: "ShopNest Email Verification",
        text: message,
      });

      res.status(201).json({
        success: true,
        email: newUser.email,
        message: "OTP sent successfully. Please verify your email.",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.verified) {
        return res.status(403).json({
          message: "Please verify your email before logging in.",
          email: user.email,
        });
      }

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        message: "User logged in successfully.",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Exclude password field from the response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email is already verified.",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        message: "No OTP found. Please request a new OTP.",
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedOTP !== user.otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error.",
    });
  }
};

const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email is already verified.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    user.otp = hashedOTP;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const message = `Your new ShopNest verification OTP is:

${otp}

This OTP will expire in 10 minutes.`;

    await sendEmail({
      to: email,
      subject: "ShopNest OTP Verification",
      text: message,
    });

    res.status(200).json({
      message: "A new OTP has been sent to your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error.",
    });
  }
};

module.exports = { registerUser, loginUser, getUsers, verifyOTP, resendOTP };
