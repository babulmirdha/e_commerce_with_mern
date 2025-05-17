//server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();
app.use(bodyParser.json());

const DB_HOST = process.env.DB_HOST || "mongodb://localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "e_commerce_db";

// Connect to MongoDB
mongoose.connect(`${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
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
