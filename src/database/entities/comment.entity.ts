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
import { Board } from './board.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  c_id: number;

  @Column({
    type: 'text',
    default: '',
  })
  c_content: string;

  @Column({
    default: 0,
    unsigned: true,
  })
  c_view_cnt: number;

  @Column({
    default: 0,
    unsigned: true,
  })
  c_like_cnt: number;

  @Column({
    type: 'enum',
    default: YesOrNo.Y,
    enum: YesOrNo,
  })
  c_is_view: YesOrNo;

  @CreateDateColumn()
  c_reg_date: Date;

  @UpdateDateColumn()
  c_mod_date: Date;

  @ManyToOne(() => User, (user) => user.u_id)
  @JoinColumn({ name: 'writer', referencedColumnName: 'u_id' })
  user: User;

  @ManyToOne(() => Board, (board) => board.b_id, { nullable: false })
  @JoinColumn({ name: 'c_b_id', referencedColumnName: 'b_id' })
  board: Board;

  static fromCommentEntity(
    board: Board,
    writer: User,
    content: string,
    is_view: YesOrNo,
  ) {
    const comment = new Comment();
    comment.board = board;
    comment.user = writer;
    comment.c_content = content;
    comment.c_is_view = is_view;
    return comment;
  }
}
