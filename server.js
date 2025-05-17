//server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');


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
app.use('/api/products', productRoutes);

// Start server
const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
