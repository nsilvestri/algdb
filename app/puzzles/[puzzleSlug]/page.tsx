import { Card, CardProps } from "../../../components/Card/Card";
import { CardList } from "../../../components/CardList/CardList";

import { PageProps } from "@/.next/types/app/page";
import prisma from "@/prisma/global-prisma-client";

const sets = [
  {
    name: "OLL",
    slug: "oll",
  },
];

export default async function PuzzlePage({ params }: PageProps) {
  return (
    <>
      {params.puzzleSlug}
      <CardList>
        {sets.map((set) => {
          return (
            <Card
              key={set.slug}
              title={set.name}
              icon={null}
              href={`/puzzles/${params.puzzleSlug}/sets/${set.slug}`}
            />
          );
        })}
      </CardList>
    </>
  );
}
