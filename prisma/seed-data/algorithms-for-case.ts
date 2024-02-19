import { Prisma } from "@prisma/client";
import {
  pbl2x2JPerm,
  pbl2x2YPerm,
  pbl2x2VerticalBars,
  pbl2x2AdjAdj,
  pbl2x2AdjOpp,
} from "./case";
import {
  tPerm,
  jPerm,
  yPerm,
  bars2x2_1,
  bars2x2_2,
  bars2x2_3,
} from "./algorithm";

export const caseAlgorithmLinks: Prisma.AlgorithmsForCaseCreateInput[] = [
  {
    case: {
      connect: {
        id: pbl2x2JPerm.id,
      },
    },
    algorithm: {
      connect: {
        id: tPerm.id,
      },
    },
  },
  {
    case: {
      connect: {
        id: pbl2x2JPerm.id,
      },
    },
    algorithm: {
      connect: {
        id: jPerm.id,
      },
    },
  },
  {
    case: {
      connect: {
        id: pbl2x2YPerm.id,
      },
    },
    algorithm: {
      connect: {
        id: yPerm.id,
      },
    },
  },
  {
    case: {
      connect: {
        id: pbl2x2VerticalBars.id,
      },
    },
    algorithm: {
      connect: {
        id: bars2x2_1.id,
      },
    },
  },
  {
    case: {
      connect: {
        id: pbl2x2VerticalBars.id,
      },
    },
    algorithm: {
      connect: {
        id: bars2x2_2.id,
      },
    },
  },
  {
    case: {
      connect: {
        id: pbl2x2VerticalBars.id,
      },
    },
    algorithm: {
      connect: {
        id: bars2x2_3.id,
      },
    },
  },
  {
    case: {
      connect: {
        id: pbl2x2AdjAdj.id,
      },
    },
    algorithm: {
      create: {
        moves: "R2 U' B2 U2 R2 U' R2",
      },
    },
  },
  {
    case: {
      connect: {
        id: pbl2x2AdjOpp.id,
      },
    },
    algorithm: {
      create: {
        moves: "R U' R F2 R' U R'",
      },
    },
  },
];
