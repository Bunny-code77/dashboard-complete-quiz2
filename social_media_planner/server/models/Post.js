import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String },
  platform: { type: String }, // e.g. Instagram, Facebook
  scheduledAt: { type: Date },
  status: { type: String, enum: ["Draft","Scheduled","Published"], default: "Draft" },
  meta: { type: Object },
}, { timestamps: true });

export default mongoose.model("Post", postSchema);