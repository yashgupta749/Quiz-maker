import { Router } from "express";
const router = Router();

// import
import { dbconnect } from "../../database/DBConnection";
import auth from "./auth";
import quizzer from "./quizzer";
import quiz from "./quiz";

// {base API URL}
const api_uri = process.env.API_URI;

router.get("/", (req, res) => {
  res.send("Hello to QuizDen Backend System");
});

// connect to database
dbconnect();

// route middleware
router.use(api_uri + "/auth", auth);
router.use(api_uri + "/quizzers", quizzer);
router.use(api_uri + "/quizzes", quiz);

export default router;
