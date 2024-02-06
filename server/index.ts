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
// cors는 Cross-Origin Resource Sharing의 약자로,
// 서로 다른 도메인 간에 리소스를 공유할 수 있게 해주는 표준 규약임
// cors 라이브러리를 사용하여, 서버에 cors 정책을 적용함
// -> 클라이언트에서 서버로 요청을 보낼 때, 서버가 응답할 수 있게 됨

app.use(express.json());
// express의 json 미들웨어를 사용하여, 요청의 body를 파싱함
// -> req.body에 JSON 형태의 데이터를 넣을 수 있음

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
