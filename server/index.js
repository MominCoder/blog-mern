import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
  .catch((err) => console.log(err.message));
