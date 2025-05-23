import express from "express"
import { createPost, deletePost, getPostById, getPosts, updatePostById } from "../controllers/post.controller.js"

export const router = express.Router();

router.post("/createPost", createPost)

router.get("/getPosts", getPosts)

router.get("/getPostbyId/:id", getPostById)

router.put("/updatePost/:id", updatePostById)

router.delete("/deletePost/:id", deletePost)
