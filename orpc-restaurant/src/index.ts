import { RPCHandler } from "@orpc/server/node";
import { appRouter } from "./routers/index.js";
import { CORSPlugin } from "@orpc/server/plugins";
import { createServer } from "node:http";
// 1. Creating an oRPC Handler (this will convert our routers to HTTP)
const handler = new RPCHandler(appRouter, {
  plugins: [
    new CORSPlugin(), // Adding this so that when calling from the browser, CORS error does not occur
  ],
});

// 2. Creating a Node.js HTTP server
const server = createServer(async (req, res) => {
  // Customer (or Frontend) is calling us
  const { matched } = await handler.handle(req, res, {
    prefix: "/api", // Our APIs will start with '/api'
    context: {}, // Here we can pass data from the request to the context
  });

  // If oRPC finds a matching route (e.g., menu.getMenu), it will handle the response itself
  if (matched) {
    return;
  }

  // If no matching route is found
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "Route Not Found in our Restaurant!" }));
});

// 3. Starting the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log("\n==============================================");
  console.log(` 🚀 oRPC Restaurant Server is running!`);
  console.log(` 🌐 URL: http://localhost:${PORT}`);
  console.log("==============================================\n");
});
