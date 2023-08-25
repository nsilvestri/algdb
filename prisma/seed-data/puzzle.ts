import { Puzzle } from "@prisma/client";

export const threeByThree: Puzzle = {
  id: "333",
  name: "3x3x3",
  slug: "333",
  rank: 0,
};

export const twoByTwo: Puzzle = {
  id: "222",
  name: "2x2x2",
  slug: "222",
  rank: 10,
};

export const fourByFour: Puzzle = {
  id: "444",
  name: "4x4x4",
  slug: "444",
  rank: 20,
};

export const puzzles: Puzzle[] = [threeByThree, twoByTwo, fourByFour];
