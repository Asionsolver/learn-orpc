import { appRouter } from "../routers/index.js";

export async function runCustomerScenarios() {
  console.log("\n==============================================");
  console.log("      🧑‍🍳 CUSTOMER SCENARIOS STARTED");
  console.log("==============================================\n");

  console.log("--- Customer is asking for the Menu ---");
  const menu = await appRouter.menu.getMenu();
  console.log(menu);

  try {
    console.log("\n--- Customer is ordering 2 Beef Burgers (ID: 1) ---");
    const orderReceipt = await appRouter.order.placeOrder({
      itemId: 1,
      quantity: 2,
    });
    console.log("✅ Success:", orderReceipt);

    console.log("\n--- Customer is trying to order Cold Coffee (ID: 3) ---");
    await appRouter.order.placeOrder({ itemId: 3, quantity: 1 });
  } catch (error: any) {
    console.log("❌ Failed:", error.message);
  }

  try {
    console.log("\n--- Customer checking order status ---");
    const orderResponse = await appRouter.order.placeOrder({
      itemId: 1,
      quantity: 3,
    });
    const status = await appRouter.order.checkOrderStatus({
      orderId: orderResponse.orderId,
    });

    console.log("📋 Digital Receipt:");
    console.log(
      `Order ID: ${status.orderId} | Status: ${status.status} | Bill: ${status.totalPrice} Taka`,
    );
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  }
}
