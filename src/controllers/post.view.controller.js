import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const renderNewPostForm = (req, res) => {
  res.render("post/new-post", { errors: {}, post: {} });
};

export const createPostView = async (req, res) => {
  try {
    const { title, content, tags, category, published, slug, views } = req.body;

    const errors = {};

    if (!title || title.trim().length < 3) {
      errors.title = "El título es obligatorio y debe tener al menos 3 caracteres";
    }
    if (!content || content.trim().length < 20) {
      errors.content = "El contenido es obligatorio y debe tener al menos 20 caracteres";
    }
    if (tags && !Array.isArray(tags)) {
      errors.tags = "Los tags deben ser un array";
    }
    if (category && typeof category !== "string") {
      errors.category = "La categoría debe ser un string";
    }
    if (published !== undefined && typeof published !== "boolean") {
      errors.published = "El campo published debe ser booleano";
    }
    if (views !== undefined && (typeof views !== "number" || views < 0)) {
      errors.views = "El campo views no debe ser menor a 0";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).render("post/new-post", {
        errors,
        post: req.body,
      });
    }

    const newPost = new Post({
      title: title.trim(),
      content: content.trim(),
      tags: tags || [],
      category: category || "general",
      published: published !== undefined ? published : false,
      slug: slug ? slug.trim().toLowerCase() : undefined,
      views: views || 0,
    });

    await newPost.save();
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.status(500).render("post/new-post", {
      errors: { general: "Error interno del servidor" },
      post: req.body,
    });
  }
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
    res.render("post/edit-post", { post, errors: {} });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  }
};

export const updatePostView = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("ID inválido");
    }

    const { title, content, tags, category, published, slug, views } = req.body;

    const errors = {};

    if (!title || title.trim().length < 3) {
      errors.title = "El título es obligatorio y debe tener al menos 3 caracteres";
    }
    if (!content || content.trim().length < 20) {
      errors.content = "El contenido es obligatorio y debe tener al menos 20 caracteres";
    }
    if (tags && !Array.isArray(tags)) {
      errors.tags = "Los tags deben ser un array";
    }
    if (category && typeof category !== "string") {
      errors.category = "La categoría debe ser un string";
    }
    if (published !== undefined && typeof published !== "boolean") {
      errors.published = "El campo published debe ser booleano";
    }
    if (views !== undefined && (typeof views !== "number" || views < 0)) {
      errors.views = "El campo views no debe ser menor a 0";
    }

    if (Object.keys(errors).length > 0) {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).send("Post no encontrado");
      }
      return res.status(400).render("post/edit-post", {
        errors,
        post: { ...post.toObject(), ...req.body },
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        content: content.trim(),
        tags: tags || [],
        category: category || "general",
        published: published !== undefined ? published : false,
        slug: slug ? slug.trim().toLowerCase() : undefined,
        views: views || 0,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send("Post no encontrado");
    }

    res.redirect(`/posts/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).render("post/edit-post", {
      errors: { general: "Error interno del servidor" },
      post: req.body,
    });
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
