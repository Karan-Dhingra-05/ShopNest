const express = require("express");
const {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const { admin } = require("../middlewares/adminMiddleware.js");

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
