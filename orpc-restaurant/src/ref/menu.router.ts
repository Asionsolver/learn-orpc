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

  // API to add new food (only admin can)
  addMenuItem: adminProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        isAvailable: z.boolean().default(true),
      }),
    )
    .handler(async ({ input, context }) => {
      console.log(`Action performed by: ${context.user.name}`);
      const newItem = {
        id: menuItems.length + 1,
        ...input,
      };

      menuItems.push(newItem);

      return {
        success: true,
        message: `${input.name} Successfully added to the menu!`,
        item: newItem,
      };
    })
    .callable(),
};
