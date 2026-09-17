import { supabase } from "../config/supabase";
import type { CreateOrderInput, OrderStatus } from "../types/order";

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
    const { data: createdOrder, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        company_name: order.company_name ?? null,
        postal_code: order.postal_code,
        city: order.city,
        street_address: order.street_address,
        message: order.message ?? null,
        status: "new",
        total_amount: totalAmount,
      })
      .select("*")
      .single();

    if (orderError || !createdOrder) {
      return {
        data: null,
        error: orderError ?? new Error("A rendelés létrehozása sikertelen."),
      };
    }

    const orderItems = items.map((item) => ({
      order_id: createdOrder.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
    }));

    const { data: createdItems, error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems)
      .select("*");

    if (itemsError) {
      // Ne maradjon félkész rendelés, ha az order_items mentése elbukik.
      await supabase.from("orders").delete().eq("id", createdOrder.id);

      return {
        data: null,
        error: itemsError,
      };
    }

    return {
      data: {
        ...createdOrder,
        order_items: createdItems,
      },
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
