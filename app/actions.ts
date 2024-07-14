"use server";

import prisma from "@/prisma/global-prisma-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function updateLearnedStatus(
  algorithmsForCaseId: string,
  status: string
) {
  console.log("updateLearnedStatus", algorithmsForCaseId, status);
  const session = await getServerSession(authOptions);

  console.log("session", session);

  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  await prisma.userLearnedAlgorithmForCase.upsert({
    where: {
      userId_algorithmsForCaseId: {
        algorithmsForCaseId: algorithmsForCaseId,
        userId: session.user.id,
      },
    },
    update: {
      status: status,
    },
    create: {
      algorithmsForCaseId: algorithmsForCaseId,
      userId: session.user.id,
      status: status,
    },
  });
}
