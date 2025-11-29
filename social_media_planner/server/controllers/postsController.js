import Post from "../models/Post.js";

// Create
export const createPost = async (req, res) => {
  try {
    const { title, content, platform, scheduledAt, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });
    const post = await Post.create({
      user: req.user.id,
      title,
      content,
      platform,
      scheduledAt,
      status: status || "Draft",
    });
    res.status(201).json(post);
  } catch (err) {
    console.error("createPost error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Read all posts for user
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ scheduledAt: 1, createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("getPosts error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Read single post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user.id) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("getPost error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user.id) return res.status(404).json({ message: "Post not found" });
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error("updatePost error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete

// Delete
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.deleteOne({ _id: post._id });

    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("deletePost error:", err);
    res.status(500).json({ message: err.message });
  }
};
