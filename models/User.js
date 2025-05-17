const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  roles: [{ type: String, enum: ["admin", "customer", "editor"] }],
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
