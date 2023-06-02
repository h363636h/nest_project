import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  getAccessToken({ user }, res) {
    const payload = { user: { u_id: user.u_id, u_email: user.u_email } };

    // accesstoken 발행
    const accesstoken = this.jwtService.sign(payload);
    console.log(accesstoken);

    // refreshtoekn 발행
    const refreshToken = this.jwtService.sign(payload, {
      secret: 'myRefreshKey',
      expiresIn: '2h',
    });
    console.log(refreshToken);

    res.setHeader('Authorization', 'Bearer ' + accesstoken);

    // cookie 생성
    res.setHeader('Set-Cookie', [
      'Authentication=' + accesstoken + '; HttpOnly; Path=/; Max-Age=3600;',
      'refreshToken=' + refreshToken + '; HttpOnly; Path=/; Max-Age=7200;',
    ]);

    const data = {
      accesstoken: accesstoken,
      refreshtoken: refreshToken,
    };

    return res.json(data);
  }

  logout() {
    return `Authentication=; refreshToken=; HttpOnly; Path=/; Max-Age=0`;
  }

  validateToken(req) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.substring(7); // 'Bearer ' 접두사 제거
        const payload = this.jwtService.verify(token);
        console.log(payload);
        return payload.user;
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'token verify 실패하였습니다.',
          error: error.sqlMessage,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
