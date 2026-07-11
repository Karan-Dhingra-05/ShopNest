const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
const Product = require("./models/Product.js");
const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await User.deleteMany();
    // await Product.deleteMany();

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash("password123", salt);

    // const adminUser = await User.create({
    //   name: "Admin User",
    //   email: "admin@shopnest.com",
    //   password: hashedPassword,
    //   role: "admin",
    // });

    const products = [
      {
        name: "Apple AirPods Pro (2nd Gen)",
        description:
          "Premium wireless earbuds with Active Noise Cancellation and Spatial Audio.",
        price: 24999,
        category: "Electronics",
        stock: 20,
        imageUrl:
          "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2",
        ratings: 4.8,
        numReviews: 312,
      },
      {
        name: "Logitech MX Master 3S",
        description:
          "Advanced wireless productivity mouse with ultra-fast scrolling.",
        price: 9999,
        category: "Electronics",
        stock: 18,
        imageUrl:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
        ratings: 4.9,
        numReviews: 184,
      },
      {
        name: "Samsung 27-inch 4K Monitor",
        description: "Ultra HD IPS monitor ideal for gaming and productivity.",
        price: 28999,
        category: "Electronics",
        stock: 10,
        imageUrl:
          "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
        ratings: 4.6,
        numReviews: 76,
      },
      {
        name: "Nike Air Force 1",
        description: "Classic white sneakers with premium leather finish.",
        price: 7499,
        category: "Footwear",
        stock: 35,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        ratings: 4.8,
        numReviews: 410,
      },
      {
        name: "Adidas Sports Hoodie",
        description:
          "Comfortable fleece hoodie perfect for workouts and casual wear.",
        price: 3499,
        category: "Fashion",
        stock: 40,
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        ratings: 4.5,
        numReviews: 128,
      },
      {
        name: "Fossil Leather Wallet",
        description: "Premium genuine leather wallet with RFID protection.",
        price: 1999,
        category: "Accessories",
        stock: 50,
        imageUrl:
          "https://images.unsplash.com/photo-1627123424574-724758594e93",
        ratings: 4.4,
        numReviews: 61,
      },
      {
        name: "Mechanical RGB Keyboard",
        description: "Hot-swappable mechanical keyboard with RGB lighting.",
        price: 5499,
        category: "Electronics",
        stock: 22,
        imageUrl:
          "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
        ratings: 4.7,
        numReviews: 145,
      },
      {
        name: "Gaming Office Chair",
        description: "Ergonomic office chair with adjustable lumbar support.",
        price: 11999,
        category: "Furniture",
        stock: 12,
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        ratings: 4.6,
        numReviews: 92,
      },
      {
        name: "Smart Fitness Watch",
        description: "Track heart rate, workouts, sleep, and notifications.",
        price: 8999,
        category: "Wearables",
        stock: 28,
        imageUrl:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        ratings: 4.5,
        numReviews: 214,
      },
      {
        name: "Bluetooth Portable Speaker",
        description:
          "Water-resistant speaker with powerful bass and 12-hour battery.",
        price: 4999,
        category: "Electronics",
        stock: 24,
        imageUrl:
          "https://images.unsplash.com/photo-1589003077984-894e133dabab",
        ratings: 4.7,
        numReviews: 173,
      },
      {
        name: "Coffee Maker",
        description: "Programmable coffee maker with 12-cup capacity.",
        price: 6999,
        category: "Home & Kitchen",
        stock: 16,
        imageUrl:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        ratings: 4.3,
        numReviews: 84,
      },
      {
        name: "Travel Backpack",
        description:
          "Water-resistant backpack with laptop compartment and USB charging port.",
        price: 3999,
        category: "Accessories",
        stock: 30,
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        ratings: 4.6,
        numReviews: 101,
      },
    ];

    await Product.insertMany(products);

    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
