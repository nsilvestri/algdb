import { PrismaClient } from "@prisma/client";
import { puzzles } from "./seed-data/puzzle";
import { sets } from "./seed-data/set";
import { methods } from "./seed-data/method";
import { algorithms } from "./seed-data/algorithm";
import { caseAlgorithmLinks } from "./seed-data/algorithms-for-case";
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

  const methodPromises = methods.map(async (method) => {
    await prisma.method.create({ data: method });
  });
  await Promise.all(methodPromises);

  const algorithmPromises = algorithms.map(async (algorithm) => {
    await prisma.algorithm.create({ data: algorithm });
  });
  await Promise.all(algorithmPromises);

  const caseAlgorithmLinkPromises = caseAlgorithmLinks.map(async (link) => {
    await prisma.algorithmsForCase.create({ data: link });
  });
  await Promise.all(caseAlgorithmLinkPromises);
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
