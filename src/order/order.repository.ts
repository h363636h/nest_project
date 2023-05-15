import { order } from "src/database/entities/order.entity";
import { Entity, Repository } from "typeorm";

export class OrderRepository extends Repository<order> {}