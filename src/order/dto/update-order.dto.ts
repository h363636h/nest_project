import { IsNotEmpty, IsOptional, IsDateString, IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { YesOrNo } from "../enum/order.enum";

export class UpdateOrderDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    o_order_id: string;
    
    @IsOptional()
    @IsString()
    o_is_member: YesOrNo;

    @IsOptional()
    @IsString()
    o_member_id: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    o_product_price: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    o_used_point: number;
    
    @IsOptional()
    @IsString()
    o_paymethod: string;

    @IsOptional()
    @IsString()
    o_order_status: string;

    @IsOptional()
    @IsDateString()
    o_order_date: string;
}