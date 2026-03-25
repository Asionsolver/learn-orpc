import { adminRouter } from "./admin.router.js";
import { menuRouter } from "./menu.router.js";
import { orderRouter } from "./order.router.js";

// Our restaurant's complete router (App Router)
export const appRouter = {
  menu: menuRouter, // I placed the menuRouter under the name 'menu'.
  order: orderRouter, // I also added the orderRouter to our appRouter.
  admin: adminRouter, // Don't forget to add the admin router as well!
};

// For TypeScript, we export the type of the router (needed for frontend)
export type AppRouter = typeof appRouter;
