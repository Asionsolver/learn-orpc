import { menuRouter } from "./menu.router.js";

// Our restaurant's complete router (App Router)
export const appRouter = {
  menu: menuRouter, // I placed the menuRouter under the name 'menu'.
};

// For TypeScript, we export the type of the router (needed for frontend)
export type AppRouter = typeof appRouter;
