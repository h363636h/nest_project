import {
  Controller,
  Get,
  Body,
  ValidationPipe,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiCreatedResponse({ description: '회원 리스트를 리턴합니다.' })
  async getUserList(): Promise<object> {
    return this.userService.getList();
  }

  @Get(':u_number')
  @ApiCreatedResponse({ description: '특정회원 리스트를 리턴합니다.' })
  async getUser(@Param('u_number', ParseIntPipe) u_number: number) {
    return this.userService.getOne(u_number);
  }

  @Post('/join')
  @ApiCreatedResponse({ description: '회원가입' })
  join(@Body(ValidationPipe) createUserDto: createUserDto) {
    console.log(createUserDto);
    return true;
  }
}
