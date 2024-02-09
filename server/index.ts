import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./useRoutes";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { User } from "./useModel";

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

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("joined", () => {
    io.sockets.emit("new-user", "new user joined");
  });

  socket.on("private message", async (to, message, mySelf) => {
    // 몽고 DB에서 to에 해당하는 유저를 찾음
    const user = await User.find({ email: to });
    const decoded = jwt.verify(mySelf, process.env.ACCESS_TOKEN_SECRET!);
    const sender = await User.findById(decoded);
    io.sockets.emit("refresh", "new Message");

    if (user) {
      // 유저 메시지를 데이터베이스 배열에 추가
      user[0].messages.push({
        receiver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });
      sender?.messages.push({
        receiver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });
      // save를 통해 데이터베이스에 저장
      await user[0].save();
      await sender?.save();
    }
  });
});

// express의 라우터를 사용하여 요청을 처리함
app.use("/", userRouter);
