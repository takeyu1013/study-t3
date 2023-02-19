import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const micropostRouter = createTRPCRouter({
  getUserMicroposts: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(
      async ({
        ctx: {
          prisma: {
            micropost: { findMany },
          },
        },
        input: { userId },
      }) => {
        return await findMany({
          where: { userId },
        });
      }
    ),
  createMicropost: publicProcedure
    .input(
      z.object({ userId: z.string(), content: z.string().max(140).min(1) })
    )
    .mutation(
      async ({
        ctx: {
          prisma: {
            micropost: { create },
            user: { findUniqueOrThrow },
          },
        },
        input: { userId, content },
      }) => {
        const { id } = await findUniqueOrThrow({
          where: { id: userId },
        });

        return await create({
          data: { content, user: { connect: { id } } },
        });
      }
    ),
});
