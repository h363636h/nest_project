import { YesOrNo } from "src/order/enum/order.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('order')
export class order extends BaseEntity{
    @PrimaryGeneratedColumn()
    o_order_id: string;

    @Column({type: 'enum', default: 'N', enum: ['Y', 'N']})
    o_is_member: YesOrNo;

    @Column({default: ''})
    o_member_id: string;

    @Column({default: 0, unsigned:true})
    o_product_price: number;

    @Column({default: 0, unsigned:true})
    o_used_point: number;

    @Column({default: ''})
    o_paymethod: string;

    @Column({default: 'N'})
    o_order_status: string;

    @CreateDateColumn()
    o_order_date: string;
}

@Entity('order_product')
export class order_product extends BaseEntity{
    @PrimaryGeneratedColumn()
    op_order_id: string;

    @Column({})
    op_uid: number;

    @Column({ length: 200, default: '' })
    op_name: string;

    @Column({ default: 0 })
    op_stock: number;

    @Column({ default: 0 })
    op_price: number;

    @Column({ default: 0 })
    op_reserve: number;
}
