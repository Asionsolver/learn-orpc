import { appRouter } from "../routers/index.js";
import { createRouterClient } from "@orpc/server";

export async function runAdminScenarios() {
  console.log("\n==============================================");
  console.log("      🛡️ ADMIN & SECURITY SCENARIOS STARTED");
  console.log("==============================================\n");

  // --- Hacker's part (will remain the same as before) ---
  try {
    console.log("--- Hacker trying to add 'Poison' to the menu ---");
    const hackerCaller = createRouterClient(appRouter, {
      context: { adminSecret: "wrong-password" },
    });

    await hackerCaller.admin.addMenuItem({
      name: "Poison",
      price: 100,
      isAvailable: true,
    });
  } catch (error: any) {
    console.log("❌ Hacker Blocked Successfully:");
    console.error(error.message);
  }

  // --- Real Manager's part (here we will add multiple items) ---
  try {
    console.log("\n--- Real Manager is adding Multiple Items ---");

    // Manager's VIP phone
    const managerCaller = createRouterClient(appRouter, {
      context: { adminSecret: "super-secret-key" },
    });

    //  I made a list of new items to add.
    const newItemsToAdd = [
      { name: "Cheese Pizza", price: 500, isAvailable: true },
      { name: "White Sauce Pasta", price: 250, isAvailable: true },
      { name: "Chocolate Ice Cream", price: 150, isAvailable: true },
      { name: "Spicy Fried Chicken", price: 350, isAvailable: false },
    ];

    // I am adding all the items one by one in a loop.
    for (const item of newItemsToAdd) {
      const result = await managerCaller.admin.addMenuItem(item);
      const newItem = result.newItem;
      console.log(
        `✅ Manager added: ${newItem.name} (ID: ${newItem.id}) - Price: ${newItem.price} Taka`,
      );
    }

    // Checking the final venue after everything is added.
    console.log("\n--- Checking Final Updated Menu ---");
    console.log(await appRouter.menu.getMenu());
  } catch (error: any) {
    console.error("❌ Manager Error:", error.message);
  }
}
