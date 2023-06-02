import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { validate as validateEmail } from 'email-validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 회원 리스트
  async getList(): Promise<object> {
    const list = this.userRepository.find();
    if (!list) {
      throw new NotFoundException('회원리스트가 존재하지 않습니다.');
    }
    return list;
  }

  // 특정 회원 정보
  async getOne(u_id: string): Promise<User> {
    const list = await this.userRepository.findOne({ where: { u_id: u_id } });
    if (!list) {
      throw new NotFoundException(`${u_id}에 해당하는 회원이 없습니다.`);
    }
    return list;
  }

  // 특정 회원 정보
  async getOneFromNumber(u_number: string): Promise<User> {
    const list = await this.userRepository.findOne({
      where: { u_number: u_number },
    });
    if (!list) {
      throw new NotFoundException(`${u_number}에 해당하는 회원이 없습니다.`);
    }
    return list;
  }

  // 회원 가입
  async createUser(createUserDto: createUserDto) {
    // 1. 같은 id 회원이 있는지 먼저 체크
    const list = await this.userRepository.findOne({
      where: { u_id: createUserDto.u_id },
    });
    if (list) {
      throw new ConflictException('이미 가입된 회원입니다.');
    }

    try {
      // 2. 이메일 형식 체크
      const emailChk = validateEmail(createUserDto.u_email);
      if (emailChk === false) {
        throw new NotFoundException('이메일 형식을 맞춰주세요.');
      }

      // 3. 비밀번호 hash
      createUserDto.u_password = await bcrypt.hash(
        createUserDto.u_password,
        10,
      );

      // 4. 회원가입
      const result = await this.userRepository.save({
        ...createUserDto,
      });

      if (!result) {
        throw new NotFoundException('회원가입에 실패하였습니다.1');
      }
      return result;
    } catch (error) {
      throw new HttpException(
        {
          message: '회원가입에 실패하였습니다.2',
          error: error.sqlMessage,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // 회원 수정
  async updateUser(u_id: string, updateUserDto) {
    const user = await this.userRepository.findOneBy({ u_id: u_id });
    if (!user) {
      throw new NotFoundException('회원이 존재하지 않습니다.');
    }

    const emailChk = validateEmail(updateUserDto.u_email);
    if (emailChk === false) {
      throw new NotFoundException('이메일 형식을 맞춰주세요.');
    }

    updateUserDto.u_password = await bcrypt.hash(updateUserDto.u_password, 10);
    const result = await this.userRepository.update(
      { u_id: u_id },
      { ...updateUserDto },
    );
    return result.affected ? true : false;
  }

  // 회원 탈퇴
  async delteUser(u_id: string) {
    const user = await this.userRepository.findOneBy({ u_id: u_id });
    if (!user) {
      throw new NotFoundException('회원이 존재하지 않습니다.');
    }

    const result = await this.userRepository.delete({ u_id: u_id });
    return result.affected ? true : false;
  }
}
