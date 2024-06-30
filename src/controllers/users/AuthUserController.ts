import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const auth = new AuthUserService();
    const { email, password } = req.body;
    if (password && email) {
      const authUser = await auth.execute(email, password);
      return res.json(authUser);
    }
    throw new Error("Body da requisição incompleto");
  }
}
export { AuthUserController };
