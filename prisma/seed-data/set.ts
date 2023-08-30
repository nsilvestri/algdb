import { Prisma } from "@prisma/client";

import { threeByThree, twoByTwo } from "./puzzle";
import {
  visualization2x2Pbl,
  visualization3x3Oll,
  visualization3x3Pll,
} from "./visualization";
import { pbl2x2Cases } from "./case";

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

export const pbl2x2: Prisma.SetCreateInput = {
  name: "PBL",
  slug: "pbl",
  puzzle: {
    connect: {
      id: twoByTwo.id,
    },
  },
  visualization: {
    create: visualization2x2Pbl,
  },
  cases: {
    create: pbl2x2Cases,
  },
};

export const sets: Prisma.SetCreateInput[] = [pll3x3, oll3x3, pbl2x2];
