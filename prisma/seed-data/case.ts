import { Prisma } from "@prisma/client";
import { twoByTwo } from "./puzzle";

export const pbl2x2Cases: Prisma.CaseCreateInput[] = [
  {
    name: "J Perm / T Perm",
    puzzle: {
      connect: {
        id: twoByTwo.id,
      },
    },
    setup: "R U R' U' R' F R2 U' R' U' R U R' F' U'",
    algorithms: {
      create: [
        {
          moves: "y R U R' U' R' F R2 U' R' U' R U R' F'",
        },
        {
          moves: "y R U R' F' R U R' U' R' F R2 U' R'",
        },
      ],
    },
  },
  {
    name: "Y Perm",
    puzzle: {
      connect: {
        id: twoByTwo.id,
      },
    },
    setup: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    algorithms: {
      create: [
        {
          moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
        },
      ],
    },
  },
  {
    name: "Vertical Bars",
    puzzle: {
      connect: {
        id: twoByTwo.id,
      },
    },
    setup: "R2 F2 R2",
    algorithms: {
      create: [
        {
          moves: "R2 F2 R2",
        },
        {
          moves: "R2 B2 R2",
        },
        {
          moves: "x R2 U2 R2",
        },
      ],
    },
  },
  {
    name: "Adj-Adj",
    puzzle: {
      connect: {
        id: twoByTwo.id,
      },
    },
    setup: "R2 U' B2 U2 R2 U' R2",
    algorithms: {
      create: [
        {
          moves: "R2 U' B2 U2 R2 U' R2",
        },
        {
          moves: "y2 R2 U' R2 U2 F2 U' R2",
        },
        {
          moves: "y2 R2 U' R2 U2 y R2 U' R2",
        },
      ],
    },
  },
  {
    name: "Adj-Opp",
    puzzle: {
      connect: {
        id: twoByTwo.id,
      },
    },
    setup: "R U' R F2 R' U R'",
    algorithms: {
      create: [
        {
          moves: "R U' R F2 R' U R'",
        },
        {
          moves: "y2 R' U R' F2 R F' R",
        },
        {
          moves: "z2 L D' L F2 L' D L'",
        },
      ],
    },
  },
];
