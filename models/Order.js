const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem", required: true }],
  status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
  totalAmount: { type: mongoose.Schema.Types.Decimal128, required: true },
  paymentStatus: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
