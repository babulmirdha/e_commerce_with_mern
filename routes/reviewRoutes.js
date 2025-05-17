const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.post("/", async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
});

router.get("/", async (req, res) => {
  const reviews = await Review.find().populate("user product");
  res.json(reviews);
});

router.get("/:id", async (req, res) => {
  const review = await Review.findById(req.params.id).populate("user product");
  res.json(review);
});

router.put("/:id", async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(review);
});

router.delete("/:id", async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
