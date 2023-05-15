import { Body, Get, Param, Controller, Post, UsePipes, ValidationPipe, Patch, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private OrderService: OrderService) {}
    
    //모든 주문내역 조회
    @Get('/')
    getAllOrder() {
        return this.OrderService.getAllOrder();
    }

    //주문ID로 주문 찾기 
    @Get('o_id/:o_order_id')
    async getBoardOne(@Param('o_order_id') o_order_id: string) {
        return await this.OrderService.getOrderByOrderId(o_order_id);
    }

    //회원ID로 주문 찾기 
    @Get('mem_id/:o_member_id')
    async getBoardByUserId(@Param('o_member_id') o_member_id: string) {
        return await this.OrderService.getOrderByUserId(o_member_id);
    }

    //새 주문생성
    @Post()
    @UsePipes(ValidationPipe) //헨들러레벨 파이프
    createOrder(
        @Body() createOrderDto: CreateOrderDto
    ) {
        return this.OrderService.createOrder(createOrderDto);
    }

    //주문상태 업데이트
    @Patch('update/:o_order_id')
    updateOrder(
        @Param('o_order_id') o_order_id:string, 
        @Body() UpdateOrderDto: UpdateOrderDto) {
        return this.OrderService.updateOrderById(o_order_id, UpdateOrderDto);
    }

    //주문내역 삭제
    @Delete('/:o_order_id')
    deleteOrderByOrderId(@Param('o_order_id') o_order_id:string) {
        return this.OrderService.deleteOrder(o_order_id);
    }
}