import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const renderNewPostForm = (req, res) => {
  res.render("post/new-post");
};

export const renderEditPostForm = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("ID inválido");
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send("Post no encontrado");
    }
    res.render("post/edit-post", { post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

export const renderPostsList = async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("post/posts-list", { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

export const renderPostById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("ID inválido");
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send("Post no encontrado");
    }
    res.render("post/view-post", { post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};