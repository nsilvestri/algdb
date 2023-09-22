import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardList } from "@/components/CardList/CardList";
import prisma from "@/prisma/global-prisma-client";
import Link from "next/link";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
import { PNGVisualizerOptions } from "sr-puzzlegen";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function Page() {
  const session = await getServerSession(authOptions);
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
      <p className="font-bold text-2xl">Sets</p>
      {session?.user?.role === "admin" && (
        <Link href="/sets/new" className="underline">
          Add a new set →
        </Link>
      )}
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
