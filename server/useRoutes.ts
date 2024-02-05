import { Request, Response, Router } from "express";
import { User } from "./useModel";

const router = Router();

// express의 라우터를 사용하여 /auth 경로에 POST 요청을 처리함
// 요청의 body에 있는 데이터를 User 모델을 사용하여 DB에 저장함
router.post("/auth", async (req: Request, res: Response) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
