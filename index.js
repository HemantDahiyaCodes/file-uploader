const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.delete({
    where: {
      name: "test_userr",
    },
  });

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
