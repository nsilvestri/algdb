import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardList } from "../components/CardList/CardList";
import prisma from "@/prisma/global-prisma-client";
import Link from "next/link";

export default async function Home() {
  const puzzles = await prisma.puzzle.findMany();

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
                <div className="h-48 w-48"></div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </CardList>
  );
}
