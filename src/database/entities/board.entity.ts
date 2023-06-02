import { YesOrNo } from 'src/common/enum/common.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  b_id: number;

  @Column({
    length: 200,
    default: '',
  })
  b_title: string;

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
    default: YesOrNo.N,
    enum: YesOrNo,
  })
  b_is_lock: YesOrNo;

  @Column({
    type: 'enum',
    default: YesOrNo.Y,
    enum: YesOrNo,
  })
  b_is_view: YesOrNo;

  @CreateDateColumn()
  b_reg_date: Date;

  @UpdateDateColumn()
  b_mod_date: Date;

  @ManyToOne(() => User, (user) => user.u_id, { nullable: true })
  @JoinColumn({ name: 'b_writer', referencedColumnName: 'u_id' })
  user: User;

  static fromBoardEntity(
    title: string,
    content: string,
    writer: User,
    is_lock: YesOrNo,
    is_view: YesOrNo,
    passwd: string,
  ) {
    const board = new Board();
    board.b_title = title;
    board.user = writer;
    board.b_content = content;
    board.b_is_lock = is_lock;
    board.b_is_view = is_view;
    board.b_passwd = passwd;
    return board;
  }
}
