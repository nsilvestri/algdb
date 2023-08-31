import { Prisma } from "@prisma/client";
import { twoByTwo } from "./puzzle";
import { visualization2x2Ortega } from "./visualization";
import { pbl2x2 } from "./set";

export const ortega: Prisma.MethodCreateInput = {
  name: "Ortega",
  slug: "ortega",
  puzzle: {
    connect: {
      id: twoByTwo.id,
    },
  },
  visualization: {
    create: visualization2x2Ortega,
  },
  sets: {
    connect: {
      id: pbl2x2.id,
    },
  },
};

export const methods = [ortega];
