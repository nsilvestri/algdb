import { Prisma } from "@prisma/client";

import { threeByThree } from "./puzzle";
import { visualization3x3Oll, visualization3x3Pll } from "./visualization";

export const pll3x3: Prisma.SetCreateInput = {
  name: "PLL",
  slug: "pll",
  puzzle: {
    connect: {
      id: threeByThree.id,
    },
  },
  visualization: {
    create: visualization3x3Pll,
  },
};

export const oll3x3: Prisma.SetCreateInput = {
  name: "OLL",
  slug: "oll",
  puzzle: {
    connect: {
      id: threeByThree.id,
    },
  },
  visualization: {
    create: visualization3x3Oll,
  },
};

export const sets: Prisma.SetCreateInput[] = [pll3x3, oll3x3];
