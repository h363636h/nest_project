import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn({unsigned:true, default:0})
    u_number:number;

    @Column({unique:true, length:35})
    u_id:string;

    @Column()
    u_password:string;

    @Column({length:35})
    u_email:string;

    @Column({length:35})
    u_name:string;

    @Column({unsigned:true, default:0})
    u_point:number;

    @Column({nullable:true, length:20})
    u_post:string;

    @Column({nullable:true})
    u_address1:string;

    @Column({nullable:true})
    u_address2:string;

    @Column({nullable:true, length:15})
    u_cellphone:string;

    @CreateDateColumn()
    u_reg_date:Date;

    @UpdateDateColumn()
    u_mod_date:Date;

    @UpdateDateColumn()
    u_last_login_date:Date;

}