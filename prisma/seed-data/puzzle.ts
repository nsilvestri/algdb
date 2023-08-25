import { Prisma } from "@prisma/client";

import {
  visualization2x2,
  visualization3x3,
  visualization4x4,
} from "./visualization";

export const threeByThree: Prisma.PuzzleCreateInput = {
  id: "333",
  name: "3x3x3",
  slug: "333",
  rank: 0,
  visualization: {
    create: visualization3x3,
  },
};

export const twoByTwo: Prisma.PuzzleCreateInput = {
  id: "222",
  name: "2x2x2",
  slug: "222",
  rank: 10,
  visualization: {
    create: visualization2x2,
  },
};

export const fourByFour: Prisma.PuzzleCreateInput = {
  id: "444",
  name: "4x4x4",
  slug: "444",
  rank: 20,
  visualization: {
    create: visualization4x4,
  },
};

export const puzzles: Prisma.PuzzleCreateInput[] = [
  threeByThree,
  twoByTwo,
  fourByFour,
];
