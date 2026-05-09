import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  volumeId: { type: String, unique: true, required: true },
  title: String,
  authors: [String],
  thumbnail: String,
  rating: Number
}, { timestamps: true });

export default mongoose.model("Wishlist", wishlistSchema);
