import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/prisma/global-prisma-client";
import { NextResponse } from "next/server";

export async function POST(request: Request, params: { algorithmId: string }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 403,
      }
    );
  }

  try {
    const learnedAlgorithm = await prisma.learnedAlgorithm.findFirst({
      where: {
        userId: session.user.id,
        algorithmId: params.algorithmId,
      },
    });

    // idempotence; if the algorithm is already learned, ignore the request
    if (learnedAlgorithm) {
      return NextResponse.json({
        status: 200,
      });
    }

    await prisma.learnedAlgorithm.create({
      data: {
        userId: session.user.id,
        algorithmId: params.algorithmId,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Could not mark algorithm as learned.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    status: 200,
  });
}
