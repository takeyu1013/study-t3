import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const micropostRouter = createTRPCRouter({
  getUserMicroposts: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.micropost.findMany({
        where: { userId: input.userId },
      });
    }),
  createMicropost: publicProcedure
    .input(
      z.object({ userId: z.string(), content: z.string().max(140).min(1) })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: { id: input.userId },
      });

      return await ctx.prisma.micropost.create({
        data: { content: input.content, user: { connect: { id: user.id } } },
      });
    }),
});
