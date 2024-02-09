import mongoose from "mongoose";

// Schema는 몽고 DB의 컬렉션의 구조를 정의함
const userSchema = new mongoose.Schema({
  name: String,
  imageId: String,
  email: { type: String, unique: true },
  messages: [
    {
      message: String,
      sender: String,
      receiver: String,
      time: Date,
    },
  ],
});

// chatgram_users은 몽고 DB 연결 URL의 파라미터임
// User는 몽고 DB의 모델임
// => chatgram_users 컬렉션에 userSchema의 구조를 가진 문서를 저장함
export const User = mongoose.model("User", userSchema, "chatgram_users");
