import { YesOrNo } from "./enum/order.enum";

export interface Orders {
    o_order_id: string;
    o_is_member: YesOrNo;
    o_member_id: string;
    o_product_price: number;
    o_used_point: number;
    o_paymethod: string;
    o_order_status: string;
    o_order_date: string;
}