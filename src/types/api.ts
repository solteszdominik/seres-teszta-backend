import type { ParamsDictionary } from "express-serve-static-core";
import type { CreateOrderInput, OrderStatus } from "./order";

export interface IdParams extends ParamsDictionary {
  id: string;
}

export interface SlugParams extends ParamsDictionary {
  slug: string;
}

export type CreateOrderRequest = CreateOrderInput;

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}
