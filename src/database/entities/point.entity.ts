import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'point', synchronize: true })
export class Point {
  @PrimaryGeneratedColumn()
  pt_idx: number;
  @Column()
  u_number: number;
  @Column()
  pt_type: string;
  @Column()
  pt_point: number;
  @Column()
  pt_comment: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
