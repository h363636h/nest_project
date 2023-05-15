import { YesOrNo } from 'src/board/enum/board.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  b_id: number;

  @Column({
    unsigned: true,
    default: 0,
  })
  b_sub_id: number;

  @Column({
    default: '',
  })
  b_title: string;

  @Column({
    default: '',
  })
  b_writer: string;

  @Column({
    type: 'text',
    default: '',
  })
  b_content: string;

  @Column({
    default: '',
  })
  b_file_url: string;

  @Column({
    default: 0,
    unsigned: true,
  })
  b_view_cnt: number;

  @Column({
    default: 0,
    unsigned: true,
  })
  b_like_cnt: number;

  @Column({
    default: '',
  })
  b_passwd: string;

  @Column({
    type: 'enum',
    default: 'N',
    enum: ['Y', 'N'],
  })
  b_is_lock: YesOrNo;

  @Column({
    type: 'enum',
    default: 'Y',
    enum: ['Y', 'N'],
  })
  b_is_view: YesOrNo;

  @CreateDateColumn()
  b_reg_date: Date;

  @UpdateDateColumn()
  b_mod_date: Date;
}
