import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z
          .string()
          .min(8)
          .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i),
        passwordConfirmation: z.string().min(1),
      })
    )
    .mutation(
      async ({
        ctx: {
          prisma: {
            user: { create },
          },
        },
        input: { name, email, password, passwordConfirmation },
      }) => {
        if (password !== passwordConfirmation) {
          return;
        }
        return await create({
          data: {
            name,
            email,
            passwordDigest: await hash(password, 10),
            image: `https://secure.gravatar.com/avatar/#${email}`,
          },
        });
      }
    ),
  deleteUser: publicProcedure.input(z.object({ id: z.string() })).mutation(
    async ({
      ctx: {
        prisma: {
          user: { delete: remove },
        },
      },
      input: { id },
    }) => {
      return await remove({ where: { id } });
    }
  ),
  editUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        password: z
          .string()
          .min(8)
          .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i),
        passwordConfirmation: z.string().min(1),
      })
    )
    .mutation(
      async ({
        ctx: {
          prisma: {
            user: { update },
          },
        },
        input: { id, name, email, password, passwordConfirmation },
      }) => {
        if (password !== passwordConfirmation) {
          return;
        }
        return await update({
          where: { id },
          data: {
            name,
            email,
            passwordDigest: await hash(password, 10),
          },
        });
      }
    ),
});
