import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const passwordResetRouter = createTRPCRouter({
  create: publicProcedure.input(z.string().email()).mutation(({ input }) => {
    console.log(input);
    return {};
  }),
});
