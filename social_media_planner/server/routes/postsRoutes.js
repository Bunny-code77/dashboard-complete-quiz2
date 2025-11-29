import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createPost, getPosts, getPost, updatePost, deletePost } from "../controllers/postsController.js";

const router = express.Router();

router.use(protect); // protect all routes

router.route("/")
  .get(getPosts)
  .post(createPost);

router.route("/:id")
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

export default router;