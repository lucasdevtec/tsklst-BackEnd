import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const detail = new DetailUserService();
    const detailUser = await detail.execute(req.userKey);
    return res.json(detailUser);
  }
}
export { DetailUserController };
