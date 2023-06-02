import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { PointService } from './point.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreatePointDto } from './dto/create-point.dto';

@ApiTags('Point API')
@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Get()
  @ApiOperation({ summary: '내 포인트 조회' })
  @ApiBearerAuth() // Bearer Token 인증 설정
  @UseGuards(AuthGuard('myGuard'))
  getMyPointList(@Request() req) {
    return this.pointService.get_my_point_list({ auth: req.user });
  }

  @Post()
  @ApiOperation({ summary: '포인트 지급' })
  @ApiBearerAuth() // Bearer Token 인증 설정
  @UseGuards(AuthGuard('myGuard'))
  create(@Body() body: CreatePointDto, @Request() req) {
    return this.pointService.add_point({ _user: req.user, body });
  }
}
