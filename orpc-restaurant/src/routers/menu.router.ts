import { menuItems } from "../db/db.js";
import { publicProcedure } from "../orpc.js";

export const menuRouter = {
  // getMenu is our first procedure
  getMenu: publicProcedure
    .handler(async () => {
      // Fetch menu from database (Cook and serve to customer)
      return menuItems;
    })
    .callable(),
};
