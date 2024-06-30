import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (name && password && email) {
      const createUser = new CreateUserService();
      const newUser = await createUser.execute(name, email, password);
      return res.json(newUser);
    }
    throw new Error("Missing Data");
  }
}
export { CreateUserController };
