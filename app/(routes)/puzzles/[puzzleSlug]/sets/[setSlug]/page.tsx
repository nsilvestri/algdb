import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/prisma/global-prisma-client";
import { PNGVisualizerOptions } from "sr-puzzlegen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
export default async function Page({
  params,
}: {
  params: {
    puzzleSlug: string;
    setSlug: string;
  };
}) {
  const set = await prisma.set.findFirst({
    where: {
      puzzle: {
        slug: params.puzzleSlug,
      },
      slug: params.setSlug,
    },
    include: {
      visualization: true,
      cases: {
        include: {
          algorithmsForCase: {
            include: {
              algorithm: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold text-2xl">{set?.name}</h2>
      {set?.cases.map((c) => {
        return (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
            </CardHeader>
            <CardContent key={c.id}>
              <div className="flex gap-x-4 h-40">
                <div className="w-40">
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
                <Separator orientation="vertical" />
                <div className="flex flex-col gap-y-1 flex-grow">
                  {c.algorithmsForCase.map((afc, i) => {
                    const isLast = i === c.algorithmsForCase.length - 1;
                    return (
                      <>
                        <div>
                          <p>{afc.algorithm.moves}</p>
                        </div>
                        {!isLast && <Separator />}
                      </>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
