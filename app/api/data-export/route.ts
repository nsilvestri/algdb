import prisma from "@/prisma/global-prisma-client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export type DataExport = {
  algorithms: Prisma.AlgorithmCreateManyInput[];
  algorithmsForCase: Prisma.AlgorithmsForCaseCreateManyInput[];
  cases: Prisma.CaseCreateManyInput[];
  methods: Prisma.MethodCreateManyInput[];
  puzzles: Prisma.PuzzleCreateManyInput[];
  sets: {
    id: string;
    name: string;
    slug: string;
    puzzleId: string;
    visualizationId: string;
    cases: {
      id: string;
      name: string;
      setup: string;
      puzzleId: string;
    }[];
    methods: {
      id: string;
      name: string;
      slug: string;
      puzzleId: string;
      visualizationId: string;
    }[];
  }[];
  visualizations: Prisma.VisualizationCreateManyInput[];
};

export async function GET(request: Request) {
  const algorithms = prisma.algorithm.findMany();
  const algorithmsForCase = prisma.algorithmsForCase.findMany();
  const cases = prisma.case.findMany();
  const methods = prisma.method.findMany();
  const puzzles = prisma.puzzle.findMany();
  const sets = prisma.set.findMany({
    include: {
      cases: true,
      methods: true,
    },
  });
  const visualizations = prisma.visualization.findMany();

  const data = await Promise.all([
    algorithms,
    algorithmsForCase,
    cases,
    methods,
    puzzles,
    sets,
    visualizations,
  ]);

  return NextResponse.json(
    {
      algorithms: data[0],
      algorithmsForCase: data[1],
      cases: data[2],
      methods: data[3],
      puzzles: data[4],
      sets: data[5],
      visualizations: data[6],
    },
    { status: 200 }
  );
}
