// Ad Maiorem Dei Gloriam!a
import { getPostsFeed, createPost } from "../controllers/postController.js";
import { json, Router } from "express";

const router = Router();

router.get("/", getPostsFeed);
router.post("/", createPost);

export default router;