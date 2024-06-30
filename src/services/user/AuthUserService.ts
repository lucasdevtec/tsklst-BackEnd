import { compare } from "bcryptjs";
import { verificarUserPorEmail } from "../../DAOs/users";
import { sign } from "jsonwebtoken";

class AuthUserService {
  async execute(email: string, password: string) {
    let secretjwt: string;
    if (process.env.HASHMD5JWT) {
      secretjwt = process.env.HASHMD5JWT;
      console.log(secretjwt);
    } else {
      throw new Error("1010");
    }
    const user = await verificarUserPorEmail(email);
    if (!user) {
      throw new Error("Usuário ou senha b");
    }
    const passwordDcrypt = await compare(password, user.password);
    if (!passwordDcrypt) {
      throw new Error("Usuário ou senha a");
    }
    const tokenJWT = sign(
      { name: user.name, email: email },
      process.env.HASHMD5JWT,
      { expiresIn: "10h" }
    );

    return {
      user: user.name,
      email: email,
      status: "authenticated",
      token: tokenJWT,
    };
  }
}
export { AuthUserService };
