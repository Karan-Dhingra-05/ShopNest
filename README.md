# ShopNest 🛒 — Full-Stack MERN E-Commerce App

ShopNest is a professionally engineered, production-ready full-stack E-commerce platform built strictly using modern standard React on the frontend and an Express/MongoDB architecture on the backend. It features a unified admin dashboard, real-time secure checkout via Razorpay, dynamic cloud image uploads, and efficient state management.

---

## 🛠️ Tech Stack & Architecture

### Frontend

- **Core:** React.js (Create React App workflow)
- **State Management:** Redux Toolkit (handling seamless Cart states & actions)
- **Authentication:** AuthContext API (managing persistent JWT-based user sessions)

### Backend & Database

- **Server Engine:** Node.js + Express.js (structured with clean, middleware-driven routing)
- **Database:** MongoDB via Mongoose Schemas (highly optimized for products, users, and orders)

### Infrastructure & Cloud Integrations

- **Payment Gateway:** Razorpay API (fully implemented for secure checkouts)
- **Cloud Storage:** Cloudinary integration for secure product image uploads handled via Multer middleware

---

## ✨ Key Features

- **Unified Admin Dashboard:** Complete control over managing products, users, and monitoring store performance.
- **Seamless Payments:** Integrated Razorpay checkout using standard or test metrics.
- **Direct Cloudinary Content Maps:** Dynamic product image uploads processed securely from local file inputs.
- **Personal User Profiles:** Custom user accounts tied directly to persistent, mapped Order Histories.
- **Monorepo Simplicity:** Single-point root control using `concurrently` to orchestrate both runtime environments simultaneously.

---

## Dependencies & Environments

Ensure you have **MongoDB** running locally, or have access to a remote MongoDB Atlas connection string.

Create a `.env` file inside the `backend/` directory and configure your variables accordingly:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/shopnest
JWT_SECRET=super_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```
