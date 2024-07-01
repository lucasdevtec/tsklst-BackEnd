import { Request, NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoadType {
  sub: string;
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
  let secretjwt: string;
  if (process.env.HASHMD5JWT) {
    secretjwt = process.env.HASHMD5JWT;
  } else {
    throw new Error("1010");
  }
  let reqToken: string;
  try {
    if (req.headers.authorization) {
      reqToken = req.headers.authorization;
    } else {
      throw new Error();
    }
    const [, jwtToken] = reqToken?.split(" ");
    const { sub } = verify(jwtToken, secretjwt) as PayLoadType;
    req.userKey = sub;
    return next();
  } catch (error) {
    res.status(401).json({ status: "Não Autorizado" });
  } finally {
  }
}
