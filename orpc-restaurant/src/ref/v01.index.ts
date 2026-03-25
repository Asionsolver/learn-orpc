import { appRouter } from "./routers/index.js";
import { createRouterClient } from "@orpc/server";
async function main() {
  console.log("Welcome to our oRPC Restaurant Kitchen! 🍔\n");

  console.log("--- Customer is asking for the Menu ---");

  // Just like calling a normal function! That's the magic of oRPC.
  const menu = await appRouter.menu.getMenu();

  console.log("Here is the Menu:");
  console.log(menu);

  try {
    console.log("--- Customer is ordering 2 Beef Burgers (ID: 1) ---");

    // Zod will check if the input is correct
    const orderReceipt = await appRouter.order.placeOrder({
      itemId: 1,
      quantity: 2,
    });

    console.log("✅ Success:");
    console.log(orderReceipt);

    console.log("\n--- Customer is trying to order Cold Coffee (ID: 3) ---");
    // Cold Coffee is given isAvailable: false in our database
    await appRouter.order.placeOrder({
      itemId: 3,
      quantity: 1,
    });
  } catch (error: any) {
    // if there's any error, it will be caught here
    console.log("❌ Failed:");
    console.error(error.message);
  }

  try {
    const result = await appRouter.menu.addMenuItem({
      name: "White Sauce Pasta",
      price: 250,
      isAvailable: true,
    });

    console.log("✅ Admin Action:", result.message);

    // Let's check the menu again to see if Pasta has arrived.
    const updatedMenu = await appRouter.menu.getMenu();
    console.log("\n--- Updated menu ---");
    console.log(updatedMenu);
  } catch (error: any) {
    console.log("❌ Security Error:", error.message);
  }

  try {
    // 1. Order a burger (ID: 1)
    const orderResponse = await appRouter.order.placeOrder({
      itemId: 1,
      quantity: 3,
    });
    console.log("✅ Order Placed! ID:", orderResponse.orderId);

    // 2. Check the order status
    const status = await appRouter.order.checkOrderStatus({
      orderId: orderResponse.orderId,
    });

    console.log("\n--- 📋 Digital Receipt (Output Validated) ---");
    console.log(`Order ID: ${status.orderId}`);
    console.log(`Status: ${status.status}`);
    console.log(`Bill: ${status.totalPrice} Taka`);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }

  try {
    // Add a new menu item (Admin action)
    const addItemResponse = await appRouter.menu.addMenuItem({
      name: "Chocolate Shake",
      price: 180,
      isAvailable: true,
    });
    console.log("✅ Admin Action:", addItemResponse.message);

    // Now, let's try to order the new item to see if it works.
    const orderResponse = await appRouter.order.placeOrder({
      itemId: 4, // Assuming this is the ID of the newly added item
      quantity: 2,
    });
    console.log(
      "✅ Order Placed for Chocolate Shake! ID:",
      orderResponse.orderId,
    );
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }

  try {
    // 1. Order a Chocolate Shake (ID: 4)
    const orderResponse = await appRouter.order.placeOrder({
      itemId: 5,
      quantity: 3,
    });
    console.log("✅ Order Placed! ID:", orderResponse.orderId);

    // 2. Check the order status
    const status = await appRouter.order.checkOrderStatus({
      orderId: orderResponse.orderId,
    });

    console.log("\n--- 📋 Digital Receipt (Output Validated) ---");
    console.log(`Order ID: ${status.orderId}`);

    console.log(`Status: ${status.status}`);
    console.log(`Bill: ${status.totalPrice} Taka`);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }

  try {
    console.log("--- Hacker trying to add 'Poison' to the menu ---");

    // হ্যাকারের জন্য একটি Server-Side Client বানালাম (ভুল পাসওয়ার্ড দিয়ে)
    const hackerCaller = createRouterClient(appRouter, {
      context: { adminSecret: "wrong-password" },
    });

    // ম্যাজিক! এখন আর ২য় আর্গুমেন্টে context পাঠাতে হবে না! শুধু ইনপুট পাঠালেই হবে।
    await hackerCaller.admin.addMenuItem({
      name: "Poison",
      price: 100,
      isAvailable: true,
    });
  } catch (error: any) {
    console.log("❌ Hacker Failed:");
    console.error(error.message, "\n");
  }

  try {
    console.log("--- Real Manager is adding 'Pizza' ---");

    // ম্যানেজারের জন্য একটি আসল Server-Side Client বানালাম (সঠিক পাসওয়ার্ডসহ)
    const managerCaller = createRouterClient(appRouter, {
      context: { adminSecret: "super-secret-key" },
    });

    // শুধু পিজ্জার ইনপুট পাঠাচ্ছি, context নিজে থেকেই চলে যাবে!
    const result = await managerCaller.admin.addMenuItem({
      name: "Cheese Pizza",
      price: 500,
      isAvailable: true,
    });

    console.log("✅ Success:");
    console.log(result.message);

    console.log("\n--- Checking Updated Menu ---");
    console.log(await appRouter.menu.getMenu());
  } catch (error: any) {
    console.error(error.message);
  }
  console.log(menu);
}

main();
