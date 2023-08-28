import Link from "next/link";

import { PageProps } from "@/.next/types/app/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardList } from "@/components/CardList/CardList";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import prisma from "@/prisma/global-prisma-client";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
import { PNGVisualizerOptions } from "sr-puzzlegen";
import { visualization2x2 } from "@/prisma/seed-data/visualization";

export default async function PuzzlePage({ params }: PageProps) {
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
    <>
      <Breadcrumbs />

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
                  <div className="h-48 w-48">
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
}
