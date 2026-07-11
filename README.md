# ShopNest

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![Render](https://img.shields.io/badge/Deploy-Render-5C4EE5?logo=render)

A full-stack **MERN E-commerce Application** built using **React, Node.js, Express, and MongoDB**. ShopNest provides a complete online shopping experience with secure JWT authentication, email verification via OTP, Razorpay payment integration, Cloudinary image uploads, and a powerful admin dashboard for managing products, users, and orders.

---

## 🌐 Live Demo

**Live Website:** https://shopnest-8xr3.onrender.com

> **Note:** The application is hosted on **Render's free tier**. The first request may take **30–60 seconds** while the backend server wakes up.

---

# 🏗️ Architecture

ShopNest follows a **Monolithic MERN Architecture**.

- Single GitHub repository
- React frontend built using **Vite**
- Express.js backend exposing REST APIs
- Frontend production build served by the Express server
- MongoDB Atlas as the cloud database
- Deployed as a **single application on Render**

This architecture simplifies deployment and maintenance while keeping the frontend and backend tightly integrated.

---

# Features

## 👤 User Features

- User Registration & Login
- Secure JWT Authentication
- Email Verification using OTP
- Password Hashing using bcrypt
- Browse Products
- Product Search
- Category Filtering
- Product Details
- Shopping Cart
- Quantity Management
- Checkout
- Razorpay Payment Integration
- Order Placement
- Order History
- User Profile

---

## 🔐 Authentication & Security

- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt
- Email Verification using OTP
- SHA-256 Hashed OTP Storage
- OTP Expiration
- Resend OTP Functionality
- Login restricted until email verification
- Environment Variables for sensitive credentials

---

## 🛒 Shopping Features

- Responsive Product Listing
- Product Details Page
- Add to Cart
- Remove from Cart
- Update Quantity
- Dynamic Price Calculation
- Stock Management
- Responsive UI

---

## 💳 Payment

- Razorpay Payment Gateway
- Secure Payment Flow
- Order Creation
- Payment Verification
- Order Success Page

---

## 🛠️ Admin Dashboard

- Dashboard Analytics
- Add Products
- Edit Products
- Delete Products
- Manage Users
- Manage Orders
- Update Order Status

---

## ☁️ Cloudinary Integration

- Product Image Upload
- Cloud Storage
- Optimized Image Delivery

---

## 📧 Email Services

- Welcome Email
- OTP Verification Email
- Resend OTP Email

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Context API

---

## Backend

- Node.js
- Express.js
- REST APIs

---

## Database

- MongoDB Atlas
- Mongoose

---

## Authentication

- JWT
- bcryptjs
- Crypto (SHA-256)

---

## Payments

- Razorpay

---

## Image Storage

- Cloudinary
- Multer

---

## Email

- Nodemailer

---

## Deployment

- Render
- MongoDB Atlas

---

# 📂 Project Structure

```
ShopNest
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── utils
│   ├── seed.js
│   └── index.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── admin
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── redux
│   │   └── App.jsx
│   └── vite.config.js
│
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/Karan-Dhingra-05/ShopNest.git

cd ShopNest
```

---

## Install Dependencies

```bash
npm run install-all
```

---

## Configure Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_key

RAZORPAY_SECRET=your_secret

FRONTEND_URL=http://localhost:5173
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```

---

## Seed Products

```bash
npm run seed
```

---

# Application Flow

## User Flow

```
Register
      │
      ▼
Generate OTP
      │
      ▼
Hash OTP
      │
      ▼
Store in MongoDB
      │
      ▼
Send Email
      │
      ▼
Verify OTP
      │
      ▼
Generate JWT
      │
      ▼
Login
      │
      ▼
Browse Products
      │
      ▼
Add to Cart
      │
      ▼
Checkout
      │
      ▼
Razorpay Payment
      │
      ▼
Order Created
      │
      ▼
View Orders
```

---

## Admin Flow

```
Admin Login
      │
      ▼
Dashboard
      │
      ▼
Manage Products
      │
      ▼
Manage Orders
      │
      ▼
Manage Users
```

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- SHA-256 Hashed OTP Storage
- OTP Expiration
- Protected Admin Routes
- Secure Payment Integration
- Environment Variable Protection

---

# Deployment

ShopNest is deployed using **Render** with a **Monolithic Architecture**.

### Production Stack

- React (Vite)
- Express.js
- MongoDB Atlas
- Cloudinary
- Razorpay
- Nodemailer
- Render

---

## ⭐ If you found this project useful, consider giving it a star on GitHub!
