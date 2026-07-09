const express = require("express");
const { protect } = require("../middlewares/authMiddleware.js");
const { admin } = require("../middlewares/adminMiddleware.js");
const { getAdminStats } = require("../controllers/analyticsController.js");
const router = express.Router();

router.get("/", protect, admin, getAdminStats);

module.exports = router;
