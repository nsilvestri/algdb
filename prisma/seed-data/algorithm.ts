import { Prisma } from "@prisma/client";
import cuid from "cuid";

export const tPerm: Prisma.AlgorithmCreateInput = {
  id: cuid(),
  moves: "R U R' U' R' F R2 U' R' U' R U R' F'",
};

export const jPerm: Prisma.AlgorithmCreateInput = {
  id: cuid(),
  moves: "R U R' F' R U R' U' R' F R2 U' R'",
};

export const yPerm: Prisma.AlgorithmCreateInput = {
  id: cuid(),
  moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
};

export const bars2x2_1: Prisma.AlgorithmCreateInput = {
  id: cuid(),
  moves: "R2 F2 R2",
};

export const bars2x2_2: Prisma.AlgorithmCreateInput = {
  id: cuid(),
  moves: "R2 B2 R2",
};

export const bars2x2_3: Prisma.AlgorithmCreateInput = {
  id: cuid(),
  moves: "x R2 U2 R2",
};

export const algorithms = [
  tPerm,
  jPerm,
  yPerm,
  bars2x2_1,
  bars2x2_2,
  bars2x2_3,
];
