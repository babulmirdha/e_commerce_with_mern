const express = require("express");
const router = express.Router();
const Address = require("../models/Address");

router.post("/", async (req, res) => {
  const address = await Address.create(req.body);
  res.status(201).json(address);
});

router.get("/", async (req, res) => {
  const addresses = await Address.find().populate("user");
  res.json(addresses);
});

router.get("/:id", async (req, res) => {
  const address = await Address.findById(req.params.id).populate("user");
  res.json(address);
});

router.put("/:id", async (req, res) => {
  const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(address);
});

router.delete("/:id", async (req, res) => {
  await Address.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
