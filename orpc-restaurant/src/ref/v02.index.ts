import { runCustomerScenarios } from "./scenarios/customer.scenario.js";
import { runAdminScenarios } from "./scenarios/admin.scenario.js";

async function main() {
  console.log("🍕 Welcome to our oRPC Restaurant Kitchen! 🍕");

  // ১. কাস্টমারের লজিকগুলো টেস্ট করছি
  await runCustomerScenarios();

  // ২. সিকিউরিটি এবং অ্যাডমিন লজিকগুলো টেস্ট করছি
  await runAdminScenarios();

  console.log("\n✨ ALL TESTS COMPLETED SUCCESSFULLY! ✨\n");
}

main();
