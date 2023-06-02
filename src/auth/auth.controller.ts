import {
  Body,
  Controller,
  Post,
  Response,
  Request,
  UnprocessableEntityException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: '로그인 accesstoken 발행' })
  @ApiOperation({ summary: '로그인 accesstoken 발행' })
  @ApiBody({
    schema: {
      properties: { u_id: { type: 'string' }, u_password: { type: 'string' } },
    },
  })
  @ApiResponse({ description: 'accesstoken' })
  async login(
    @Body() login_param: { u_id: string; u_password: string },
    @Response() res,
  ) {
    // id에 해당하는 회원 있는지 확인
    const user = await this.userService.getOne(login_param.u_id);
    if (!user)
      throw new UnprocessableEntityException('해당하는 회원이 없습니다.');

    // 비번이 같은지 확인
    const isAuth = await bcrypt.compare(
      login_param.u_password,
      user.u_password,
    );
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다');

    // accesstoken, refreshtoken 발행
    return this.authService.getAccessToken({ user }, res);
  }

  @Post('/validate')
  @ApiCreatedResponse({ description: 'accesstoken 인가처리 후 회원정보 리턴' })
  @ApiOperation({ summary: 'accesstoken 인가처리 후 회원정보 리턴' })
  @ApiBearerAuth() // Bearer Token 인증 설정
  @UseGuards(AuthGuard('myGuard'))
  fetchUser(@Request() req: any) {
    console.log(req);
    return req.user;
  }

  @Post('/restore')
  @UseGuards(AuthGuard('refresh'))
  @ApiCreatedResponse({ description: 'refreshtoken으로 accesstoken 재발급' })
  @ApiOperation({ summary: '3. refreshtoken으로 accesstoken 재발급' })
  restoreAccessToken(@Request() req: any, @Response() res) {
    console.log(req.user);
    return this.authService.getAccessToken(req.user, res);
  }

  @Post('/logout')
  @UseGuards(AuthGuard('myGuard'))
  @ApiCreatedResponse({ description: '로그아웃' })
  @ApiOperation({ summary: '로그아웃' })
  @ApiBearerAuth()
  logOut(@Request() req, @Response() res) {
    res.setHeader('Set-Cookie', this.authService.logout());
    return res.sendStatus(200);
  }

  @Get('/login_user')
  @ApiCreatedResponse({ description: '로그인한 회원의 정보를 리턴합니다.' })
  @ApiOperation({ summary: '로그인한 회원 정보(u_id)' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('myGuard'))
  loginUser(@Request() req: any) {
    const { u_id } = req.user;
    const login_user = this.userService.getOne(u_id);
    return login_user;
  }
}
