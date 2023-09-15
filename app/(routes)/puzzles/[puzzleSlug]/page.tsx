import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardList } from "@/components/CardList/CardList";
import prisma from "@/prisma/global-prisma-client";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
import { PNGVisualizerOptions } from "sr-puzzlegen";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

export default async function Page({
  params,
}: {
  params: {
    puzzleSlug: string;
  };
}) {
  const puzzle = await prisma.puzzle.findFirst({
    where: {
      slug: params.puzzleSlug,
    },
  });
  const sets = await prisma.set.findMany({
    where: {
      puzzle: {
        slug: params.puzzleSlug,
      },
    },
    include: {
      visualization: true,
    },
  });
  const methods = await prisma.method.findMany({
    where: {
      puzzle: {
        slug: params.puzzleSlug,
      },
    },
    include: {
      visualization: true,
    },
  });
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold text-2xl">{puzzle?.name}</h2>
      <h3 className="font-bold text-xl">Sets</h3>
      <CardList>
        {sets.map((set) => {
          return (
            <Link
              key={set.slug}
              href={`/puzzles/${params.puzzleSlug}/sets/${set.slug}`}
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
      <h3 className="font-bold text-xl">Methods</h3>
      <CardList>
        {methods.map((method) => {
          return (
            <Link
              key={method.slug}
              href={`/puzzles/${params.puzzleSlug}/methods/${method.slug}`}
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
                        method.visualization.options as PNGVisualizerOptions
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </CardList>
    </div>
  );
}
