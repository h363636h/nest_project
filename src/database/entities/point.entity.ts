import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum POINT_PT_TYPE_ENUM {
  JOIN = 'JOIN',
  ORDER = 'ORDER',
  LOGIN = 'LOGIN',
}

@Entity({ name: 'point', synchronize: true })
export class Point {
  @PrimaryGeneratedColumn()
  pt_idx: number;

  @Column({ type: 'enum', enum: POINT_PT_TYPE_ENUM })
  pt_type: string;

  @Column()
  pt_point: number;

  @Column()
  pt_comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;
}
