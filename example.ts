import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.debug(allUsers);

  const user = await prisma.user.findUnique({ where: { id: "aaa" } });
  console.debug("user", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
