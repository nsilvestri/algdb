import { Card, CardProps } from "../components/Card/Card";
import { CardList } from "../components/CardList/CardList";
import prisma from "@/prisma/global-prisma-client";

export default async function Home() {
  const puzzles = await prisma.puzzle.findMany();

  return (
    <CardList>
      {puzzles.map((puzzle) => {
        return (
          <Card
            key={puzzle.slug}
            title={puzzle.slug}
            icon={null}
            href={`/puzzles/${puzzle.slug}`}
          />
        );
      })}
    </CardList>
  );
}
