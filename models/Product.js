const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  description: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  stock: { type: Number, default: 0 },
  images: [{ type: String }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
