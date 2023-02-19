import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure.query(
    async ({
      ctx: {
        prisma: {
          user: { findMany },
        },
      },
    }) => {
      return await findMany();
    }
  ),
  getOneUser: publicProcedure.input(z.object({ userId: z.string() })).query(
    async ({
      ctx: {
        prisma: {
          user: { findUnique },
        },
      },
      input: { userId: id },
    }) => {
      const user = await findUnique({
        where: { id },
      });

      if (user) {
        return user;
      } else {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
    }
  ),
});
