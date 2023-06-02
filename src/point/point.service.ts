import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Point } from 'src/database/entities/point.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  // 회원 포인트 내역 추가 (+ - 둘다 가능함, interface 처리 안함 rest 어떻게 하는지 모르겠음)
  async add_point({ _user, body }) {
    // 트랜잭션 처리 함
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 회원 데이터 가져오기
      const user = await this.userService.getOne(_user.u_id);
      if (!user) {
        throw new UnprocessableEntityException('회원 정보가 없습니다.');
      }

      // 포인트 추가
      const plusPoint = await this.pointRepository.create({
        ...body,
        user,
      });
      await queryRunner.manager.save(plusPoint);

      // 회원포인트 업데이트
      const userPoint = await this.userRepository.create({
        ...user,
        u_point: user.u_point + body.pt_point,
      });
      await queryRunner.manager.save(userPoint);

      // 커밋 함
      await queryRunner.commitTransaction();

      // 회원 최종 포인트 리턴
      return { user_point: userPoint.u_point };
    } catch (error) {
      // 포인트 추가 중 오류 발생 시 롤백함
      queryRunner.rollbackTransaction();

      // 오류 타입 검색하기 싫어서 아무거나 넣음
      throw new UnprocessableEntityException('처리 중 오류가 발생 하였습니다.');
    } finally {
      // 연결 종료!!  필수!!! 안하면 db 사망
      queryRunner.release();
    }
    /*
    // 회원 데이터 가져오기
    const user = await this.userService.getOne(_user.u_id);
    if (!user) {
      throw new UnprocessableEntityException('회원 정보가 없습니다.');
    }

    // 포인트 추가
    const plusPoint = await this.pointRepository.create({
      ...body,
      user,
    });
    const pointRes = await this.pointRepository.save(plusPoint);

    // 회원포인트 업데이트
    const user_res = await this.userRepository.save({
      ...user,
      u_point: user.u_point + body.pt_point,
    });
    */
  }

  // 로그인 된 회원의 포인 내역 조회하기
  async get_my_point_list({ auth }) {
    const user = await this.userRepository.findOne({
      where: { u_id: auth.u_id },
      select: { u_number: true },
    });
    if (!user) {
      throw new UnprocessableEntityException('회원 정보가 없습니다.');
    }
    return this.pointRepository.find({ where: { user: user } });
  }
}
