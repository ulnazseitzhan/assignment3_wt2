const express = require("express");
const router = express.Router();
const Laptop = require("../models/Laptop");

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const { name, brand, price, description } = req.body;

    if (!name || !brand || price === undefined) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const laptop = new Laptop({ name, brand, price, description });
    await laptop.save();

    res.status(201).json(laptop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* READ ALL */
router.get("/", async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* READ ONE */
router.get("/:id", async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);

    if (!laptop) {
      return res.status(404).json({ message: "Laptop not found" });
    }

    res.json(laptop);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  try {
    const laptop = await Laptop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!laptop) {
      return res.status(404).json({ message: "Laptop not found" });
    }

    res.json(laptop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  try {
    const laptop = await Laptop.findByIdAndDelete(req.params.id);

    if (!laptop) {
      return res.status(404).json({ message: "Laptop not found" });
    }

    res.json({ message: "Laptop deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = router;
