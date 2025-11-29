import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import postsRoutes from "./routes/postsRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("âœ… MongoDB connected"))
  .catch((err) => console.error("âŒ MongoDB connection error:", err.message));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`ðŸš€ Server running on port ${process.env.PORT || 5000}`)
);