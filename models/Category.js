const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true, unique: true },
  description: { type: String, trim: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
