// orpc.ts
import { os } from "@orpc/server";

export const publicProcedure = os;

// This is our 'Security Guard' (Middleware)
export const adminProcedure = os.use(async ({ next }) => {
  // In real life, we would check Token or Session here
  // For now, we assume the request has 'isAdmin: true'
  const isAdmin = true; // Set this to false to see the error

  if (!isAdmin) {
    throw new Error("You are not authorized to update the menu!");
  }

  // We pass the user information to the next step via ctx
  return next({
    context: {
      user: { id: "admin-01", name: "Robin (Manager)" },
    },
  });
});
