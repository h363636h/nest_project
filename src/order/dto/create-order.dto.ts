import { IsNotEmpty, IsEnum, IsDateString, IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { OrderStatus, YesOrNo } from "../enum/order.enum";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    o_order_id: string;
    
    @IsEnum(YesOrNo)
    o_is_member: YesOrNo;

    @IsString()
    o_member_id: string;

    @IsNumber()
    @Type(() => Number)
    o_product_price: number;

    @IsNumber()
    @Type(() => Number)
    o_used_point: number;
    
    @IsString()
    o_paymethod: string;

    @IsEnum(OrderStatus)
    o_order_status: string;

    @IsDateString()
    o_order_date: string;
}

export class CreateOrderProductDto {
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    op_order_id: string;
    
    @IsNumber()
    op_uid: number;

    @IsString()
    op_name: string;

    @IsNumber()
    @Type(() => Number)
    op_stock: number;

    @IsNumber()
    @Type(() => Number)
    op_price: number;
    
    @IsNumber()
    @Type(() => Number)
    op_reserve: number;
}