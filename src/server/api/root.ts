import { micropostRouter } from "./routers/micropost";
import { numberRouter } from "./routers/number";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  micropost: micropostRouter,
  number: numberRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
