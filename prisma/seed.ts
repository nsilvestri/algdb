import { PrismaClient } from "@prisma/client";
import { puzzles } from "./seed-data/puzzle";
const prisma = new PrismaClient();

async function main() {
  await prisma.puzzle.createMany({
    data: puzzles,
  });
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
