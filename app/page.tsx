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
  return (
    <div className="flex flex-col gap-y-2 h-full">
      <h2 className="font-bold text-2xl">Puzzles</h2>
      <PuzzleSelector />
      <h2 className="font-bold text-2xl">Popular Sets</h2>
      <SetSelector />
    </div>
  );
}
