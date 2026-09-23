import { supabase } from "../config/supabase";
import type {
  CreatedOrder,
  CreateOrderInput,
  OrderStatus,
} from "../types/order";

interface VerifiedOrderItem {
  product_id: string;
  unit_price: number;
  quantity: number;
}

export const orderRepository = {
  async createOrderWithItems(
    order: CreateOrderInput,
    items: VerifiedOrderItem[],
    totalAmount: number,
    orderNumber: string,
  ) {
    const { data, error } = await supabase.rpc("create_order_with_items", {
      p_order_number: orderNumber,
      p_customer_name: order.customer_name,
      p_customer_email: order.customer_email,
      p_customer_phone: order.customer_phone,
      p_company_name: order.company_name ?? null,
      p_postal_code: order.postal_code,
      p_city: order.city,
      p_street_address: order.street_address,
      p_message: order.message ?? null,
      p_total_amount: totalAmount,
      p_items: items,
    });

    if (error || !data) {
      return {
        data: null,
        error: error ?? new Error("A rendelés létrehozása sikertelen."),
      };
    }

    return {
      data: data as CreatedOrder,
      error: null,
    };
  },

  async findAll() {
    return supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          id,
          product_id,
          unit_price,
          quantity
        )
      `,
      )
      .order("created_at", { ascending: false });
  },

  async findById(id: string) {
    return supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          id,
          product_id,
          unit_price,
          quantity
        )
      `,
      )
      .eq("id", id)
      .single();
  },

  async updateStatus(id: string, status: OrderStatus) {
    return supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();
  },
};
