//server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
;
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const addressRoutes = require("./routes/addressRoutes");


const app = express();
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce_db";

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/products', productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/addresses", addressRoutes);

// Start server
const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
