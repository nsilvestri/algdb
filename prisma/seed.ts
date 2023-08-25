import { PrismaClient } from "@prisma/client";
import { puzzles } from "./seed-data/puzzle";
import { sets } from "./seed-data/set";
const prisma = new PrismaClient();

async function main() {
  const puzzlePromises = puzzles.map(async (puzzle) => {
    await prisma.puzzle.create({ data: puzzle });
  });
  await Promise.all(puzzlePromises);

  const setPromises = sets.map(async (set) => {
    await prisma.set.create({ data: set });
  });
  await Promise.all(setPromises);
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
