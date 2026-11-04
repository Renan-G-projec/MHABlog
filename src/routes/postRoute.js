// Ad Maiorem Dei Gloriam!
import { getPostsFeed, createPost } from "../controllers/postController.js";
import { Router } from "express";

const router = Router();

router.get("/", getPostsFeed);
router.post("/", createPost);

export default router;