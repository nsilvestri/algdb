import prisma from "@/prisma/global-prisma-client";
import { CardList } from "@/components/CardList/CardList";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PuzzleGen from "../PuzzleGen/PuzzleGen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
import { PNGVisualizerOptions } from "sr-puzzlegen";
import { twMerge } from "tailwind-merge";

export async function SetSelector() {
  const sets = await prisma.set.findMany({
    include: {
      visualization: true,
      puzzle: true,
    },
  });

  return (
    <CardList>
      {sets.map((set) => {
        return (
          <Link
            key={set.slug}
            href={`/puzzles/${set.puzzle.slug}/sets/${set.slug}`}
          >
            <Card>
              <CardHeader>
                <CardTitle>{set.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 w-32">
                  <PuzzleGen
                    type={set.visualization.type as VisualizerType}
                    options={set.visualization.options as PNGVisualizerOptions}
                  />
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </CardList>
  );
}
