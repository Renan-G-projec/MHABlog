// Ad Maiorem Dei Gloriam!
import { Router } from "express";

const router = Router({})
router.get("/", (req, res) => {
    return res.send([])
})

router.post("/", (req, res) => {
    return res.send({success: true, reason: "No posts are there yet..."})
})

export default router;