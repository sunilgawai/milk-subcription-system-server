import jwt from "jsonwebtoken";
import { APP_JWT_TOKEN_EXPIRES_IN, APP_JWT_TOKEN_SECRET } from "../../config";

class JwtService {
  static sign(
    payload: any,
    secret: string = APP_JWT_TOKEN_SECRET!,
    options: any = {
      expiresIn: APP_JWT_TOKEN_EXPIRES_IN,
    }
  ) {
    return jwt.sign(payload, secret, options);
  }

  static verify(token: string, secret: string) {
    return jwt.verify(token, secret);
  }
}

export default JwtService;
