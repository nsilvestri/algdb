import { PrismaClient } from "@prisma/client";
import { puzzles } from "./seed-data/puzzle";
import { sets } from "./seed-data/set";
const prisma = new PrismaClient();

async function main() {
  await prisma.puzzle.createMany({
    data: puzzles,
  });
  await prisma.set.createMany({
    data: sets,
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
