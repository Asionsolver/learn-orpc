import { z } from "zod";
import { publicProcedure } from "../orpc.js"; // .js দেওয়াটা ESM-এর জন্য জরুরি
import { menuItems, orders } from "../db/db.js";

export const orderRouter = {
  // placeOrder is our new API
  placeOrder: publicProcedure
    // 1. Input Validation (Zod Guard): Strict rules on what the customer will send!
    .input(
      z.object({
        itemId: z.number(), // Item ID must be a number
        quantity: z.number().min(1, "Quantity must be at least 1"), // Minimum quantity is 1
      }),
    )
    // 2. Handler (cooking or main logic)
    .handler(async ({ input }) => {
      // 'input' is now 100% Type-safe thanks to Zod!
      // TypeScript knows that input contains itemId and quantity.s

      const item = menuItems.find((i) => i.id === input.itemId);

      // if the item is not found on the menu
      if (!item) {
        throw new Error("Item not found on the menu!");
      }

      // if the item is not available (e.g., our Cold Coffee)
      if (!item.isAvailable) {
        throw new Error(`Sorry, ${item.name} is currently unavailable.`);
      }

      const newOrder = {
        orderId: orders.length + 1,
        menuItemId: item.id,
        quantity: input.quantity,
        totalPrice: item.price * input.quantity,
        status: "Pending",
      };
      orders.push(newOrder); // Save the order in our "database"
      // calculate total price
      const totalPrice = item.price * input.quantity;

      // return digital receipt (Output) to the customer
      return {
        success: true,
        message: `Order placed successfully for ${input.quantity}x ${item.name}`,
        totalPrice: `${totalPrice} Taka`,
        orderId: newOrder.orderId,
      };
    })
    .callable(), // Added this to run locally

  // New task for step 5: Checking orders with Output Validation
  checkOrderStatus: publicProcedure
    .input(z.object({ orderId: z.number() }))
    // Output Validation: We will only send the following 3 pieces of information to the client
    .output(
      z.object({
        orderId: z.number(),
        status: z.string(),
        totalPrice: z.number(),
      }),
    )
    .handler(async ({ input }) => {
      const order = orders.find((o) => o.orderId === input.orderId);

      if (!order) {
        throw new Error("Order not found!");
      }

      // The order object may contain many fields, but Zod will only send the defined output fields
      return {
        orderId: order.orderId,
        status: order.status,
        totalPrice: order.totalPrice,
      };
    })
    .callable(),
};
