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
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="font-bold text-xl">{puzzle?.name}</h2>
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
    </div>
  );
}

export async function generateStaticParams() {
  const puzzles = await prisma.puzzle.findMany();

  return puzzles.map((puzzle) => ({
    slug: puzzle.slug,
  }));
}
