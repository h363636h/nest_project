import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fruits')
export class Fruit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  inventory: number;
}