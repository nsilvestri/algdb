import { CardList } from "@/components/CardList/CardList";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/prisma/global-prisma-client";
import Link from "next/link";
import { PNGVisualizerOptions } from "sr-puzzlegen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
export default async function Page({
  params,
}: {
  params: {
    puzzleSlug: string;
    methodSlug: string;
  };
}) {
  const method = await prisma.method.findFirst({
    where: {
      slug: params.methodSlug,
    },
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
      <h2 className="font-bold text-2xl">Sets</h2>
      <CardList>
        {method?.sets.map((set) => {
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
  const methods = await prisma.method.findMany();

  return methods.map((method) => ({
    slug: method.slug,
  }));
}
