import { Router } from "express";
const router = Router();
import {
  verifyToken,
  loginUser,
  registerUser,
} from "../controller/AuthController";
import { createQuizzer } from "../controller/QuizzerController";

router.get("/", verifyToken, (req, res, next) => {
  res.send("Hello From AUTH!");
});

// user login
router.post("/login", async (req, res, next) => {
  await loginUser(req, res, next);
});

// register new user
router.post("/registration", async (req, res, next) => {
  req.body = await registerUser(req, res, next);
  // creating the quizzer profile
  await createQuizzer(req, res, next);
});

export default router;
