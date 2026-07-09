const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const path = require("path");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/products", require("./routes/productRoutes.js"));
app.use("/api/orders", require("./routes/orderRoutes.js"));
app.use("/api/payment", require("./routes/paymentRoutes.js"));
app.use("/api/analytics", require("./routes/analyticsRoutes.js"));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
