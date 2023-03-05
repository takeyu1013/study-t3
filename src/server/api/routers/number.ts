import { observable } from "@trpc/server/observable";
import { clearInterval } from "timers";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const numberRouter = createTRPCRouter({
  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 500);
      return () => {
        clearInterval(int);
      };
    });
  }),
});
