const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Basic CRUD same as users
router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

router.get("/", async (req, res) => {
  const categories = await Category.find().populate("products");
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id).populate("products");
  res.json(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
});

router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
