import z from "zod";
import { menuItems } from "../db/db.js";
import { adminProcedure, publicProcedure } from "../orpc.js";

export const menuRouter = {
  // getMenu is our first procedure
  getMenu: publicProcedure
    .handler(async () => {
      // Fetch menu from database (Cook and serve to customer)
      return menuItems;
    })
    .callable(),

  // নতুন খাবার যোগ করার API (শুধুমাত্র অ্যাডমিন পারবে)
  addMenuItem: adminProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        isAvailable: z.boolean().default(true),
      }),
    )
    .handler(async ({ input, context }) => {
      // এখানে ctx রিসিভ করা হচ্ছে
      console.log(`Action performed by: ${context.user.name}`); // এখন আর এরর দিবে না
      const newItem = {
        id: menuItems.length + 1,
        ...input,
      };

      menuItems.push(newItem); // ডাটাবেজে নতুন আইটেম সেভ হলো

      return {
        success: true,
        message: `${input.name} সফলভাবে মেন্যুতে যুক্ত করা হয়েছে!`,
        item: newItem,
      };
    })
    .callable(),
};
