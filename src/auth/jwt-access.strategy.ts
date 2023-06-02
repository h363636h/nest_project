import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

// PassportStrategy
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'myGuard') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // req.headers.Authorization...
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      user: payload.user,
    };
  }
}
