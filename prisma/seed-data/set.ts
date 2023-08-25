import { Prisma } from "@prisma/client";

import { threeByThree } from "./puzzle";

export const pll3x3: Prisma.SetCreateManyInput = {
  name: "PLL",
  slug: "pll",
  puzzleId: threeByThree.id,
};

export const oll3x3: Prisma.SetCreateManyInput = {
  name: "OLL",
  slug: "oll",
  puzzleId: threeByThree.id,
};

export const sets: Prisma.SetCreateManyInput[] = [pll3x3, oll3x3];
