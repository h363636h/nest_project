import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshTokenRegex = /refreshToken=([^;]+)/;
        const refreshtoekn = refreshTokenRegex.exec(cookie);

        //console.log(refreshtoekn);
        return refreshtoekn[1];
      },
      secretOrKey: 'myRefreshKey',
    });
  }

  validate(payload) {
    return {
      user: payload.user,
    };
  }
}
