import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { order } from 'src/database/entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(order)
        private readonly OrderRepository: Repository<order>,
      ) {}

    //모든 주문내역 조회
    async getAllOrder(): Promise<order[]> {
        const found = await this.OrderRepository.find();
        if (!found) {
            throw new NotFoundException(`can't frint Order list`);
        }
        return found;
    }

    //주문ID로 주문조회
    async getOrderByOrderId(o_order_id: string): Promise<order> {
        return this.OrderRepository.findOne({where : {o_order_id : o_order_id}}); 
    }

    //회원ID로 주문조회
    async getOrderByUserId(o_member_id: string): Promise<order> {
        return this.OrderRepository.findOne({where : {o_member_id : o_member_id}}); 
    }

    //새주문 생성
    async createOrder(CreateOrderDto: CreateOrderDto){
        const {o_order_id, o_is_member, o_member_id, 
               o_product_price, o_used_point, o_paymethod, 
               o_order_status, o_order_date} = CreateOrderDto;
        const c_order = new order();
        const chk_order_id = await this.chkOrderId(o_order_id);

        if (chk_order_id !=undefined) {
            throw new NotFoundException(`order_id duplicated ${o_order_id}`);
        } else {
            c_order.o_order_id      = o_order_id;
            c_order.o_is_member     = o_is_member;
            c_order.o_member_id     = o_member_id;
            c_order.o_product_price = o_product_price;
            c_order.o_used_point    = o_used_point;
            c_order.o_paymethod     = o_paymethod;
            c_order.o_order_status  = o_order_status;
            c_order.o_order_date    = o_order_date;
            
            return await this.OrderRepository.save(order).then((v) => [v.o_order_id, v.o_member_id, o_product_price]);
        }
    }

    //OrderId중복 체크 
    async chkOrderId(o_order_id: string): Promise<order> {
        return this.OrderRepository.findOne({where:{o_order_id : o_order_id}});
      }

    //주문 상태변경
    async updateOrderById(o_order_id: string, order_update: UpdateOrderDto) {
        const preOrderSet = await this.getOrderByOrderId(o_order_id);
        await this.OrderRepository.update({o_order_id: o_order_id}, {...order_update});
    }

    //주문 삭제
    async deleteOrder(o_order_id: string) {
        const res = await this.OrderRepository.delete(o_order_id);

        if (res.affected === 0) {
          throw new NotFoundException(`not exists order. order_id: ${o_order_id}`);
        }
    }
}