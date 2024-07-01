import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, newPassword } = req.body;
    const updateUser = new UpdateUserService();
    let userUpdated;
    if (newPassword || password) {
      if (newPassword) {
        if (password) {
          userUpdated = await updateUser.execute(
            req.userEmail,
            {
              name: name,
              password: newPassword,
              email: email,
            },
            password
          );
          return res.json(userUpdated);
        }
        throw new Error("Missing Data: password");
      }
      throw new Error("Missing Data: newPassword");
    }
    if (name || email) {
      userUpdated = await updateUser.execute(req.userEmail, {
        name: name,
        password: newPassword,
        email: email,
      });
      return res.json(userUpdated);
    }
    throw new Error("Missing Data");
  }
}
export { UpdateUserController };
