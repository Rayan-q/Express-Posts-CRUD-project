import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
const router = express.Router();

// router.use((req, res, next) => {
//   console.log("Inside the posts router middleware");
//   next();
// });

// Get all posts
router.get("/", getPosts);

// Get single post | Use route params :something for dynamic requests
router.get("/:id", getPost);

// Create new post
router.post("/", createPost);

// Update a post's title
router.put("/:id", updatePost);

// Delete Post
router.delete("/:id", deletePost);

export default router;
