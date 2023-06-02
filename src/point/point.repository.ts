import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from 'src/database/entities/point.entity';
import { CreatePointDto } from './dto/create-point.dto';

@Injectable()
export class PointRepository {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
  ) {}

  async create(point: CreatePointDto): Promise<Point> {
    return await this.pointRepository.create(point);
  }
}
