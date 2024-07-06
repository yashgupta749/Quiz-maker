import { Router } from "express";
const router = Router();
import { verifyToken } from "../controller/AuthController";
import { findAll, get } from "../controller/QuizzerController";

router.get("/data", verifyToken, async (req, res, next) => {
  await findAll(req, res, next);
});

// get quizzer profile
router.get("/:id", verifyToken, async (req, res, next) => {
  await get(req, res, next);
});

export default router;
