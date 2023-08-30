import { Prisma } from "@prisma/client";
import { twoByTwo } from "./puzzle";

export const pbl2x2Cases: Prisma.CaseCreateInput[] = [
  {
    name: "PBL 1",
    puzzle: {
      connect: {
        id: twoByTwo.id,
      },
    },
    setup: "R U R' U' R' F R2 U' R' U' R U R' F' U'",
  },
];
