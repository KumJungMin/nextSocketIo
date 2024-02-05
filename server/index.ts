import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./useRoutes";

const app = express();
const server = http.createServer(app);
const { PORT } = process.env || 4000;

app.use(cors());

// 몽고 DB 연결
mongoose.connect(process.env.MONGO_URL!);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// express의 라우터를 사용하여 요청을 처리함
app.use("/", userRouter);
