import { PrismaClient } from "@prisma/client";
import { DataExport } from "@/app/api/data-export/route";
const prisma = new PrismaClient();

/**
 * Inserts the data from the DataExport object into the database.
 * @param data
 */
async function loadData(data: DataExport) {
  await prisma.visualization.createMany({
    data: data.visualizations,
  });

  await prisma.puzzle.createMany({
    data: data.puzzles,
  });

  await prisma.method.createMany({
    data: data.methods,
  });

  await prisma.algorithm.createMany({
    data: data.algorithms,
  });

  await prisma.case.createMany({
    data: data.cases,
  });

  await prisma.algorithmsForCase.createMany({
    data: data.algorithmsForCase,
  });

  // Set data cannot be created with createMany due to Prisma limitations
  await Promise.all(
    data.sets.map(async (set) => {
      await prisma.set.create({
        data: {
          ...set,
          cases: {
            connect: set.cases,
          },
          methods: {
            connect: set.methods,
          },
        },
      });
    })
  );
}

/**
 * Retrieves data from the endpoint declared in the environment variable SEED_DATA_SOURCE
 * and returns it as a DataExport object.
 */
async function fetchData(): Promise<DataExport> {
  const response = await fetch(process.env.SEED_DATA_SOURCE as string);
  const data = await response.json();
  return data as DataExport;
}

async function main() {
  const data = await fetchData();
  await loadData(data);
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
