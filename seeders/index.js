const mongoose = require("mongoose");
require("dotenv").config();

const seedUsers = require("./usersSeeder");
const seedCategories = require("./categoriesSeeder");
const seedProducts = require("./productsSeeder");
const seedAddresses = require("./addressesSeeder");
const seedReviews = require("./reviewsSeeder");
const seedOrders = require("./ordersSeeder");

const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Address = require("../models/Address");
const Review = require("../models/Review");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

async function runSeeder() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce_db");
    console.log("✅ Connected to DB");

    // Clear old data
    await Promise.all([
      User.deleteMany(),
      Category.deleteMany(),
      Product.deleteMany(),
      Address.deleteMany(),
      Review.deleteMany(),
      Order.deleteMany(),
      OrderItem.deleteMany()
    ]);

    // Run seeders in order
    const users = await seedUsers();
    const categories = await seedCategories();
    const products = await seedProducts(categories);
    const addresses = await seedAddresses(users);
    await seedReviews(users, products);
    await seedOrders(users, products, addresses);

    console.log("✅ Database seeded successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  }
}

runSeeder();
