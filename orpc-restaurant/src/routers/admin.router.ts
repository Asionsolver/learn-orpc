import { z } from "zod";
import { os } from "@orpc/server";
import { menuItems } from "../db/db.js";
//   We told the OS that our Context may contain adminSecret!
const osWithContext = os.$context<{ adminSecret?: string }>();

// Our security guard (Middleware)
const adminGuard = osWithContext.use(async ({ context, next }) => {
  const isAdmin = context.adminSecret === "super-secret-key";

  if (!isAdmin) {
    throw new Error("Unauthorized! You are not the Manager!");
  }

  return next();
});

export const adminRouter = {
  // adminGuard কে বেইজ হিসেবে ব্যবহার করে Procedure বানাচ্ছি
  addMenuItem: adminGuard
    .input(
      z.object({
        name: z.string(),
        price: z.number().min(10),
        isAvailable: z.boolean(),
      }),
    )
    .handler(async ({ input }) => {
      // নতুন একটি আইডি তৈরি করা
      const newId = menuItems.length + 1;

      const newItem = { id: newId, ...input };
      menuItems.push(newItem); // ডাটাবেসে সেভ করলাম

      return {
        success: true,
        message: `${input.name} added to the menu!`,
        newItem,
      };
    })
    .callable(),
};
