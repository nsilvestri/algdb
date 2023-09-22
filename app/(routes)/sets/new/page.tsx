import prisma from "@/prisma/global-prisma-client";
import AddSetForm from "@/components/add-set-form";

export default async function Page() {
  const puzzles = await prisma.puzzle.findMany({
    include: {
      sets: {
        include: {
          visualization: true,
        },
      },
      visualization: true,
    },
  });

  return <AddSetForm puzzles={puzzles} />;
}
