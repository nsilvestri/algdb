import { Prisma } from "@prisma/client";
import { twoByTwo } from "./puzzle";
import cuid from "cuid";

export const pbl2x2JPerm: Prisma.CaseCreateInput = {
  id: cuid(),
  name: "J Perm / T Perm",
  puzzle: {
    connect: {
      id: twoByTwo.id,
    },
  },
  setup: "R U R' U' R' F R2 U' R' U' R U R' F' U'",
};

export const pbl2x2YPerm: Prisma.CaseCreateInput = {
  id: cuid(),
  name: "Y Perm",
  puzzle: {
    connect: {
      id: twoByTwo.id,
    },
  },
  setup: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
};

export const pbl2x2VerticalBars: Prisma.CaseCreateInput = {
  id: cuid(),
  name: "Vertical Bars",
  puzzle: {
    connect: {
      id: twoByTwo.id,
    },
  },
  setup: "R2 F2 R2",
};

export const pbl2x2AdjAdj: Prisma.CaseCreateInput = {
  id: cuid(),
  name: "Adj-Adj",
  puzzle: {
    connect: {
      id: twoByTwo.id,
    },
  },
  setup: "R2 U' B2 U2 R2 U' R2",
};

export const pbl2x2AdjOpp: Prisma.CaseCreateInput = {
  id: cuid(),
  name: "Adj-Opp",
  puzzle: {
    connect: {
      id: twoByTwo.id,
    },
  },
  setup: "R U' R F2 R' U R'",
};

export const pbl2x2Cases: Prisma.CaseCreateInput[] = [
  pbl2x2JPerm,
  pbl2x2YPerm,
  pbl2x2VerticalBars,
  pbl2x2AdjAdj,
  pbl2x2AdjOpp,
];
