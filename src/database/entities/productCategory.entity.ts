import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn({ unsigned: true })
  pc_uid: number;

  @Column({ length: 255 })
  pc_name: string;
}
