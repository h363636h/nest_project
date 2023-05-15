import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getList(): Promise<object> {
    const list = this.userRepository.find();
    if (!list) {
      throw new NotFoundException('There is no data');
    }
    return list;
  }

  getOne(u_number: number) {
    const list = this.userRepository.findOne({ where: { u_number: u_number } });
    if (!list) {
      throw new NotFoundException('There is no data');
    }
    return true;
  }
}
