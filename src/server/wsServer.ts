import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";

import { appRouter } from "./api/root";
import { createTRPCContext } from "./api/trpc";

const wss = new ws.Server({ port: 3001 });

const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: createTRPCContext,
});

wss.on("connection", (ws) => {
  console.log(`connection open ${wss.clients.size}`);
  ws.once("close", () => {
    console.log(`connection close ${wss.clients.size}`);
  });
});
console.log("WebSocket Server");

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
