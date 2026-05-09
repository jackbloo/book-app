import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import wishlistRoutes from "./routes/wishlist";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/wishlist", wishlistRoutes);

app.get("/", (_, res) => {
  res.send("Bookverse Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
