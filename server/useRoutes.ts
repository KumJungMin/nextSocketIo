import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "./useModel";

const router = Router();

// express의 라우터를 사용하여 /auth 경로에 POST 요청을 처리함
// 요청의 body에 있는 데이터를 User 모델을 사용하여 DB에 저장함
router.post("/auth", async (req: Request, res: Response) => {
  const user = new User(req.body);
  try {
    await user.save();
    // 헤더에 쿠키 설정하기
    const accessToken = jwt.sign(
      user.toObject(),
      process.env.ACCESS_TOKEN_SECRET!
    );
    res.setHeader("Set-Cookie", `user=${accessToken}`);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/user", async (req: Request, res: Response) => {
  try {
    // verify는 토큰을 해독하는 함수
    // 헤더에 있는 토큰을 해독하여 유저 정보를 가져옴
    const data = jwt.verify(
      req.headers.authorization!,
      process.env.ACCESS_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    // 토큰에 있는 이메일 정보를 사용하여 DB에서 유저 정보를 가져옴
    const user = await User.find({ email: data?.email });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/messages", async (req: Request, res: Response) => {
  const { sender, receiver } = req.query;
  const user = await User.findOne({ email: receiver });
  const filteredUser = user?.messages?.filter((message: any) => {
    return message.sender === sender;
  });
  console.log("filteredUser", filteredUser);
  res.send(filteredUser);
});

export default router;
