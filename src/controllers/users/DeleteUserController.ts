import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const deleteUser = new DeleteUserService();
    const userDeleted = await deleteUser.execute(req.userEmail);
    return res.json(userDeleted);
  }
}
export { DeleteUserController };
