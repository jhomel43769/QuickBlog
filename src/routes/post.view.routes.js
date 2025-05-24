import express from "express";
import { renderNewPostForm, renderEditPostForm, renderPostsList, renderPostById } from "../controllers/post.view.controller.js";

const viewRouter = express.Router(); 

viewRouter.get("/new", renderNewPostForm);
viewRouter.get("/edit/:id", renderEditPostForm);
viewRouter.get("/list", renderPostsList);
viewRouter.get("/view/:id", renderPostById);

export { viewRouter };
