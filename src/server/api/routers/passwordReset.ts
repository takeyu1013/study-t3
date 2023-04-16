import { compare, hash } from "bcrypt";
import { getRandomValues } from "crypto";
import { z } from "zod";

import { env } from "../../../env.mjs";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const passwordResetRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(
      async ({
        ctx: {
          prisma: {
            user: { update },
          },
        },
        input: { email },
      }) => {
        const i2hex = (i: number) => ("0" + i.toString(16)).slice(-2);
        const r = (a: string, i: number): string => a + i2hex(i);
        const bytes = getRandomValues(new Uint8Array(32));
        const token = Array.from(bytes).reduce(r, "");
        console.log("token", token);
        const reset = `${token}${env.NEXTAUTH_SECRET || ""}`;
        const resetDigest = await hash(reset, 10);
        const user = await update({
          where: { email },
          data: {
            resetDigest,
            resetSentAt: new Date(Date.now()),
          },
        });
        if (!user) {
          return false;
        }
        console.log(await compare(reset, resetDigest));
        return true;
      }
    ),
});
