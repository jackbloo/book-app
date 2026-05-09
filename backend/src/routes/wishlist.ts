import express from "express";
import Wishlist from "../models/Wishlist";

const router = express.Router();

router.get("/", async (_, res) => {
  const items = await Wishlist.find().sort({ createdAt: -1 });
  res.json(items);
});

router.post("/", async (req, res) => {
  try {
    const { volumeId } = req.body;

    const existing = await Wishlist.findOne({ volumeId });
    if (existing) {
      return res.status(409).json({ error: "Book already in wishlist", item: existing });
    }

    const item = await Wishlist.create(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
});

router.delete("/:id", async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
