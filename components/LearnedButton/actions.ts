"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/prisma/global-prisma-client";

export async function markAlgorithmAsLearned(algorithmId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      message: "Unauthorized",
    };
  }

  try {
    const learnedAlgorithm = await prisma.learnedAlgorithm.findFirst({
      where: {
        userId: session.user.id,
        algorithmId: algorithmId,
      },
    });

    // idempotence; if the algorithm is already learned, ignore the request
    if (learnedAlgorithm) {
      return;
    }

    await prisma.learnedAlgorithm.create({
      data: {
        userId: session.user.id,
        algorithmId: algorithmId,
      },
    });
  } catch (error: unknown) {
    return {
      message: "Could not mark algorithm as learned.",
    };
  }
}

export async function markAlgorithmAsUnlearned() {}
