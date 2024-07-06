import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import routes from "./app/router";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    exposedHeaders: ["auth-token"],
  })
);

app.use(express.json());

// serving static files from react
app.use(express.static(path.join(__dirname, "client", "build")));

// route middleware
app.use(routes);

// fallback for react routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "", "client", "build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
