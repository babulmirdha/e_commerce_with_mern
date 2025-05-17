const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
});

router.get("/", async (req, res) => {
  const orders = await Order.find().populate("user items shippingAddress");
  res.json(orders);
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user items shippingAddress");
  res.json(order);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});

router.delete("/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
