import {
  Controller,
  Get,
  Body,
  ValidationPipe,
  Post,
  Param,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list_all')
  @ApiCreatedResponse({ description: '회원 리스트를 리턴합니다.' })
  @ApiOperation({ summary: '회원 리스트' })
  async getUserList(): Promise<object> {
    return this.userService.getList();
  }

  @Get('/list_number/:u_number')
  @ApiCreatedResponse({ description: '특정회원 리스트를 리턴합니다.' })
  @ApiOperation({ summary: '특정 회원 정보(u_number)' })
  async getUserFromNumber(@Param('u_number') u_number: string) {
    return this.userService.getOneFromNumber(u_number);
  }

  @Get('/list_id/:u_id')
  @ApiCreatedResponse({ description: '특정회원 리스트를 리턴합니다.' })
  @ApiOperation({ summary: '특정 회원 정보(u_id)' })
  async getUser(@Param('u_id') u_id: string) {
    return this.userService.getOne(u_id);
  }

  @Post('/join')
  @ApiCreatedResponse({ description: '회원 가입' })
  @ApiOperation({ summary: '회원 가입' })
  createUser(@Body(ValidationPipe) createUserDto: createUserDto) {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Patch('/update/:u_id')
  @ApiCreatedResponse({ description: '회원 수정' })
  @ApiOperation({ summary: '회원 수정' })
  updateUser(
    @Param('u_id') u_id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(u_id, updateUserDto);
  }

  @Delete('/delete/:u_id')
  @ApiCreatedResponse({ description: '회원 탈퇴' })
  @ApiOperation({ summary: '회원 탈퇴' })
  deleteUser(@Param('u_id') u_id: string) {
    return this.userService.delteUser(u_id);
  }
}
