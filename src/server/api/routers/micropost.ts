import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
  infiniteMicroposts: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().min(1).nullish(),
      })
    )
    .query(
      async ({
        input: { userId, limit, cursor },
        ctx: {
          prisma: {
            micropost: { findMany, count },
          },
        },
      }) => {
        const take = (limit ?? 50) + 1;
        const items = cursor
          ? await findMany({
              take,
              skip: 1,
              cursor: { id: cursor },
              orderBy: { id: "asc" },
              where: { userId },
            })
          : await findMany({
              take,
              orderBy: { id: "asc" },
              where: { userId },
            });
        const total = await count();
        return { items, nextCursor: items.at(-1)?.id, total };
      }
    ),
});
