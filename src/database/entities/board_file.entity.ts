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
export class BoardFile {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  bf_id: number;

  @Column({
    length: 200,
    default: '',
  })
  bf_name: string;

  @Column({
    length: 200,
    default: '',
  })
  bf_url: string;

  @CreateDateColumn()
  bf_reg_date: Date;

  @UpdateDateColumn()
  bf_mod_date: Date;

  @ManyToOne(() => Board, (board) => board.b_id)
  @JoinColumn({ name: 'bf_b_id', referencedColumnName: 'b_id' })
  board: Board;

  static fromBoardFileEntity(bf_name: string, bf_url: string, board: Board) {
    const bf = new BoardFile();
    bf.bf_url = bf_url;
    bf.bf_name = bf_name;
    bf.board = board;
    return bf;
  }
}
