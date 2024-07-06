import { Router } from "express";
const router = Router();
import { verifyToken } from "../controller/AuthController";
import QuizzerController from "../controller/QuizzerController";
import {
  createQuiz,
  findAll,
  findById,
  findByUser,
  submitQuizAnswer,
} from "../controller/QuizController";

router.post("/create/:user_id", verifyToken, async (req, res, next) => {
  await createQuiz(req, res, next);
});

router.get("/", verifyToken, async (req, res, next) => {
  console.log("Get Quizzer Data");
  await findAll(req, res, next);
});

router.get("/:quiz_id", verifyToken, async (req, res, next) => {
  await findById(req, res, next);
});

router.get("/quizzer/:user_id", verifyToken, async (req, res, next) => {
  await findByUser(req, res, next);
});

router.post("/submit/:user_id", verifyToken, async (req, res, next) => {
  await submitQuizAnswer(req, res, next);
});

export default router;
