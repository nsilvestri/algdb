import { Prisma } from "@prisma/client";

export const visualization3x3: Prisma.VisualizationCreateManyInput = {
  id: "cllr1mhft000008jn5qtl0pu4",
  type: "cube",
  options: {
    puzzle: {
      size: 3,
    },
  },
};

export const visualization3x3Pll: Prisma.VisualizationCreateManyInput = {
  id: "cllr1mwh8000108jn18l6bqts",
  type: "cube",
  options: {
    puzzle: {
      size: 3,
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
  id: "cllr1n3bm000208jn82iwduah",
  type: "cube",
  options: {
    puzzle: {
      size: 3,
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
  id: "cllr1n8xk000308jn9hvjd61n",
  type: "cube",
  options: {
    puzzle: {
      size: 4,
    },
  },
};

export const visualization2x2: Prisma.VisualizationCreateManyInput = {
  id: "cllr1nj3b000508jncg9505lx",
  type: "cube",
  options: {
    puzzle: {
      size: 2,
    },
  },
};

export const visualizations: Prisma.VisualizationCreateManyInput[] = [
  visualization3x3,
  visualization3x3Oll,
  visualization3x3Pll,
  visualization4x4,
  visualization2x2,
];
