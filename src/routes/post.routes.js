import express from "express"
import { createPost, deletePost, getPostById, getPosts, updatePostById } from "../controllers/post.controller.js"

export const apiRouter = express.Router();

apiRouter.post("/createPost", createPost)

apiRouter.get("/getPosts", getPosts)

apiRouter.get("/getPostbyId/:id", getPostById)

apiRouter.put("/updatePost/:id", updatePostById)

apiRouter.delete("/deletePost/:id", deletePost)
