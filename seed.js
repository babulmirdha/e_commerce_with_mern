const mongoose = require("mongoose");
require("dotenv").config();

const {
  User,
  Category,
  Product,
  Address,
  Review,
  Order,
  OrderItem
} = require("./models"); // adjust if path differs

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce_db";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Cleanup
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Address.deleteMany({});
    await Review.deleteMany({});
    await Order.deleteMany({});
    await OrderItem.deleteMany({});

    // Users
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "hashed-password", // In real case, hash it
      roles: ["admin"]
    });

    const customer = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "hashed-password",
      roles: ["customer"]
    });

    // Categories
    const electronics = await Category.create({ name: "Electronics", description: "Electronic gadgets" });
    const books = await Category.create({ name: "Books", description: "All kinds of books" });

    // Products
    const laptop = await Product.create({
      name: "Laptop",
      price: 85000.00,
      description: "High-performance laptop",
      categories: [electronics._id],
      stock: 20,
      images: ["laptop.jpg"]
    });

    const novel = await Product.create({
      name: "Science Fiction Novel",
      price: 500.00,
      description: "Exciting futuristic novel",
      categories: [books._id],
      stock: 50,
      images: ["novel.jpg"]
    });

    // Add products to category
    electronics.products.push(laptop._id);
    books.products.push(novel._id);
    await electronics.save();
    await books.save();

    // Address
    const address = await Address.create({
      user: customer._id,
      fullName: "John Doe",
      phone: "017xxxxxxxx",
      street: "123 Street",
      city: "Dhaka",
      postalCode: "1207",
      country: "Bangladesh",
      isDefault: true
    });

    // Review
    await Review.create({
      user: customer._id,
      product: laptop._id,
      rating: 5,
      comment: "Excellent product!"
    });

    // Order Items
    const item1 = await OrderItem.create({
      product: laptop._id,
      quantity: 1,
      price: laptop.price
    });

    const item2 = await OrderItem.create({
      product: novel._id,
      quantity: 2,
      price: novel.price
    });

    // Order
    await Order.create({
      user: customer._id,
      items: [item1._id, item2._id],
      totalAmount: (parseFloat(laptop.price.toString()) + 2 * parseFloat(novel.price.toString())).toFixed(2),
      paymentStatus: "paid",
      status: "processing",
      shippingAddress: address._id
    });

    console.log("✅ Sample data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
  await seedData();
})();
