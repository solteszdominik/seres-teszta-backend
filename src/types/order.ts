export type OrderStatus = "new" | "processing" | "completed" | "cancelled";

export interface CreateOrderItemInput {
  product_id: string;
  quantity: number;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;

  company_name?: string;

  postal_code: string;
  city: string;
  street_address: string;

  message?: string;

  items: CreateOrderItemInput[];
}

export interface Order {
  id: string;
  order_number: string;

  customer_name: string;
  customer_email: string;
  customer_phone: string;

  company_name: string | null;

  postal_code: string;
  city: string;
  street_address: string;

  message: string | null;

  status: OrderStatus;
  total_amount: number;

  created_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface CreatedOrder extends Order {
  order_items: OrderItem[];
}
