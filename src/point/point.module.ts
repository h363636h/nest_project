import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { Point } from 'src/database/entities/point.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Point, User])],
  controllers: [PointController],
  providers: [PointService, UserService],
  exports: [PointService],
})
export class PointModule {}
