import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardList } from "@/components/CardList/CardList";
import prisma from "@/prisma/global-prisma-client";
import Link from "next/link";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
import { PNGVisualizerOptions } from "sr-puzzlegen";
import { SetSelector } from "@/components/SetSelector/SetSelector";

export default async function Page() {
  const puzzles = await prisma.puzzle.findMany({
    include: {
      sets: {
        include: {
          visualization: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-y-2">
      <p className="font-bold text-xl">Sets</p>
      {puzzles.map((puzzle) => {
        return (
          <>
            <p className="font-bold text-lg">{puzzle.name}</p>
            <CardList>
              {puzzle.sets.map((set) => {
                return (
                  <Link
                    key={set.slug}
                    href={`/puzzles/${puzzle.slug}/sets/${set.slug}`}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{set.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 w-32">
                          <PuzzleGen
                            type={set.visualization.type as VisualizerType}
                            options={
                              set.visualization.options as PNGVisualizerOptions
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
