import { appRouter } from "./routers/index.js";

async function main() {
  console.log("Welcome to our oRPC Restaurant Kitchen! 🍔\n");

  console.log("--- Customer is asking for the Menu ---");

  // Just like calling a normal function! That's the magic of oRPC.
  const menu = await appRouter.menu.getMenu();

  console.log("Here is the Menu:");
  console.log(menu);
}

main();
