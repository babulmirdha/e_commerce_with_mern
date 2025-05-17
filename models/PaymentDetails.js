const mongoose = require("mongoose");

const paymentDetailSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  method: { type: String, enum: ["bkash", "nagad", "card", "cash_on_delivery"], required: true },
  transactionId: { type: String },
  paidAt: { type: Date }
});

module.exports = mongoose.model("PaymentDetail", paymentDetailSchema);
