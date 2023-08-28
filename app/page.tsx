import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardList } from "@/components/CardList/CardList";
import prisma from "@/prisma/global-prisma-client";
import Link from "next/link";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
import { PNGVisualizerOptions } from "sr-puzzlegen";
import { SetSelector } from "@/components/SetSelector/SetSelector";
import { PuzzleSelector } from "@/components/PuzzleSelector/PuzzleSelector";

export default async function Home() {
  const puzzles = await prisma.puzzle.findMany({
    include: {
      visualization: true,
    },
  });

  return (
    <div className="flex flex-col gap-y-2">
      <p className="font-bold text-xl">Puzzles</p>
      <PuzzleSelector />
      <p className="font-bold text-xl">Popular Sets</p>
      <SetSelector />
    </div>
  );
}
