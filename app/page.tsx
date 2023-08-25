import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardList } from "../components/CardList/CardList";
import prisma from "@/prisma/global-prisma-client";
import Link from "next/link";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
import { PNGVisualizerOptions } from "sr-puzzlegen";

export default async function Home() {
  const puzzles = await prisma.puzzle.findMany({
    include: {
      visualization: true,
    },
  });

  return (
    <CardList>
      {puzzles.map((puzzle) => {
        return (
          <Link key={puzzle.slug} href={`/puzzles/${puzzle.slug}`}>
            <Card>
              <CardHeader>
                <CardTitle>{puzzle.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-48">
                  <PuzzleGen
                    type={puzzle.visualization.type as VisualizerType}
                    options={
                      puzzle.visualization.options as PNGVisualizerOptions
                    }
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
