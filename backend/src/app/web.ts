import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth-routes";
import messageRoutes from "../routes/message-routes";
import userRoutes from "../routes/user-routes";
import { notFound } from "../middleware/not-found";
import cors from "cors";
import { mongodbClient } from "../db/db";
import { errorMiddleware } from "../middleware/error-middleware";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.json("ok");
});
app.use(errorMiddleware);
app.use(notFound);

app.listen(port, async () => {
  await mongodbClient();
  console.log(`Server running on http://localhost:${port}`);
});
