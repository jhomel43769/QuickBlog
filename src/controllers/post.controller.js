import mongoose from "mongoose";
import Post from "../models/post.model.js";

//crear post 
export const createPost = async (req, res) => {
    try {
        const { title, content, tags, category, published, slug, views } = req.body;
        
        if (!title || title.trim().length < 3) {
            return res.status(400).json({ error: "El título es obligatorio y debe tener al menos 3 caracteres" });
        }

        if (!content || content.trim().length < 20) {
            return res.status(400).json({ error: "El contenido es obligatorio y debe tener al menos 20 caracteres" });
        }

        if (tags && !Array.isArray(tags)) {
            return res.status(400).json({ error: "Los tags deben ser un array" });
        }

        if (category && typeof category !== "string") {
            return res.status(400).json({ error: "La categoría debe ser un string" });
        }

        if (published !== undefined && typeof published !== "boolean") {
            return res.status(400).json({ error: "El campo published debe ser booleano" });
        }

        if (views !== undefined && (typeof views !== "number" || views < 0)) {
            return res.status(400).json({ error: "El campo views no debe ser menor a 0" });
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

        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
    } catch (err) {
        console.error("Error al crear el post", err);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
//traer todos post 
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findOne()
        return res.status(200).json({posts})
    } catch (err) {
        console.error("error al treare los post", err)
        return res.status(500).json({error: "error interno del servidor"})
    }
};
//traer por el id
export const getPostById = async (req, res) => {
    try {
        const {id} = req.params; 
        if (!mongoose.Types.ObjectId.isValid(id)) {
             return res.status(400).json({ error: "ID inválido" });
        }

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({error: "el post que buscas no existe"})
        } 

        return res.status(200).json(post)
    } catch (err) {
        console.error("error al traerte el post", err)
        return res.status(500).json({error: "error interno del servidor"})
    }
};

//actualizar por el id
export const updatePostById = async (req, res) => {
    try {
        const { id } = req.params; 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }

        const { title, content, tags } = req.body;

        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (content !== undefined) updateFields.content = content;
        if (tags !== undefined) updateFields.tags = tags;

        const updatedPost = await Post.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: "El post que quieres actualizar no existe" });
        }

        return res.status(200).json(updatedPost);
    } catch (err) {
        console.error("Error al actualizar el post", err);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

//borrar post por el id
export const deletePost = async (req, res) => {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ error: "Id inválido" });
        
        const post = await Post.findByIdAndDelete(id)
        if (!post) 
            return res.status(404).json({error: "el post que quiere borrar no existe"})

        return res.status(200).json({message: "post borrado con exito"})
    } catch (err) {
        console.error("error al borrar el post", err)
        return res.status(500).json({error: "error interno del servidor"})
    }
}