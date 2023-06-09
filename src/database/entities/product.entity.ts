import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ProductCategory } from './productCategory.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  p_uid: number;

  @Column({ length: 255 })
  p_name: string;

  @Column({ type: 'int', default: 0 })
  p_category: number;

  @Column({ type: 'text', default: 0 })
  p_content: string;

  @Column({ type: 'int', default: 0 })
  p_price: number;

  @Column({ type: 'int', default: 0 })
  p_reserve: number;

  @Column({ type: 'int', default: 0 })
  p_point: number;

  @Column({ type: 'int', default: 0 })
  p_stock: number;

  @Column({ type: 'enum', enum: ['Y', 'N'], default: 'N' })
  p_soldout: 'Y' | 'N';

  @Column({ length: 255, nullable: true })
  p_image: string | null;

  @Column({ type: 'enum', enum: ['Y', 'N'], default: 'Y' })
  p_status: 'Y' | 'N';

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  p_regdate: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  p_moddate: Date;

  // N(상품) : 1 (카테고리)
  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;
}
