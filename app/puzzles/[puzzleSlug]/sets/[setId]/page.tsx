import { PageProps } from "@/.next/types/app/page";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import prisma from "@/prisma/global-prisma-client";
import { PNGVisualizerOptions } from "sr-puzzlegen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
export default async function Page({ params }: PageProps) {
  const puzzle = await prisma.puzzle.findFirst({
    where: {
      slug: params.puzzleSlug,
    },
  });
  const set = await prisma.set.findFirst({
    where: {
      slug: params.setSlug,
    },
    include: {
      visualization: true,
      cases: true,
    },
  });
  return (
    <>
      <h2 className="font-bold text-xl">{puzzle?.name}</h2>
      {set?.cases.map((c) => {
        return (
          <div key={c.id} className="flex">
            <div>
              <h3>{c.name}</h3>
            </div>
            <div>
              <PuzzleGen
                type={set.visualization.type as VisualizerType}
                options={{
                  ...(set.visualization.options as PNGVisualizerOptions),
                  puzzle: {
                    ...(set.visualization.options as PNGVisualizerOptions)
                      .puzzle,
                    alg: c.setup,
                  },
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
