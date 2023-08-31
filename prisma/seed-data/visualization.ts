import { Prisma } from "@prisma/client";

export const visualization3x3: Prisma.VisualizationCreateManyInput = {
  type: "cube",
  options: {
    puzzle: {
      size: 3,
    },
  },
};

export const visualization3x3Pll: Prisma.VisualizationCreateManyInput = {
  type: "cube-top",
  options: {
    puzzle: {
      size: 3,
      alg: "R2 u' R U' R U R' u R2 y R U' R'",
      mask: {
        F: [3, 4, 5, 6, 7, 8],
        B: [3, 4, 5, 6, 7, 8],
        R: [3, 4, 5, 6, 7, 8],
        L: [3, 4, 5, 6, 7, 8],
        D: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
    },
  },
};

export const visualization3x3Oll: Prisma.VisualizationCreateManyInput = {
  type: "cube-top",
  options: {
    puzzle: {
      size: 3,
      alg: "r U r' R U R' U' r U' r'",
      mask: {
        R: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        F: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        D: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        L: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        B: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
    },
  },
};

export const visualization4x4: Prisma.VisualizationCreateManyInput = {
  type: "cube",
  options: {
    puzzle: {
      size: 4,
    },
  },
};

export const visualization2x2: Prisma.VisualizationCreateManyInput = {
  type: "cube",
  options: {
    puzzle: {
      size: 2,
    },
  },
};

export const visualization2x2Pbl: Prisma.VisualizationCreateManyInput = {
  type: "cube",
  options: {
    puzzle: {
      size: 2,
      alg: "R U' R F2 R' U R'",
    },
  },
};

export const visualization2x2Ortega: Prisma.VisualizationCreateManyInput = {
  type: "cube",
  options: {
    puzzle: {
      size: 2,
      alg: "D2 U R U' R F2 R' U R'",
    },
  },
};

export const visualizations: Prisma.VisualizationCreateManyInput[] = [
  visualization3x3,
  visualization3x3Oll,
  visualization3x3Pll,
  visualization4x4,
  visualization2x2,
  visualization2x2Pbl,
  visualization2x2Ortega,
];
