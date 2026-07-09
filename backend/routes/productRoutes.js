const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware.js");
const { admin } = require("../middlewares/adminMiddleware.js");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.single("image"), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
