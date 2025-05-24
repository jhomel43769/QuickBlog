import express from "express";
import {
  renderNewPostForm,
  createPostView,
  renderEditPostForm,
  updatePostView,
  renderPostsList,
  renderPostById
} from "../controllers/post.view.controller.js";

const viewRouter = express.Router();

viewRouter.get("/new", renderNewPostForm);
viewRouter.post("/new", createPostView);

viewRouter.get("/edit/:id", renderEditPostForm);
viewRouter.put("/edit/:id", updatePostView);

viewRouter.get("/list", renderPostsList);
viewRouter.get("/view/:id", renderPostById);

export { viewRouter };
