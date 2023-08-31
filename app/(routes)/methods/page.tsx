import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardList } from "@/components/CardList/CardList";
import prisma from "@/prisma/global-prisma-client";
import Link from "next/link";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
import { PNGVisualizerOptions } from "sr-puzzlegen";

export default async function Page() {
  const puzzles = await prisma.puzzle.findMany({
    include: {
      methods: {
        include: {
          visualization: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-y-2">
      <p className="font-bold text-2xl">Methods</p>
      {puzzles.map((puzzle) => {
        return (
          <>
            <p className="font-bold text-lg">{puzzle.name}</p>
            <CardList>
              {puzzle.methods.map((method) => {
                return (
                  <Link
                    key={method.slug}
                    href={`/puzzles/${puzzle.slug}/methods/${method.slug}`}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{method.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 w-32">
                          <PuzzleGen
                            type={method.visualization.type as VisualizerType}
                            options={
                              method.visualization
                                .options as PNGVisualizerOptions
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </CardList>
          </>
        );
      })}
    </div>
  );
}
