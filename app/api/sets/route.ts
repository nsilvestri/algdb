import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/prisma/global-prisma-client";
import { ZodError, z } from "zod";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 403,
      }
    );
  }

  const unvalidatedSet: unknown = await request.json();
  try {
    const set = Set.parse(unvalidatedSet);
    await prisma.set.create({
      data: set,
    });
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof ZodError) {
      return NextResponse.json(
        {
          message: JSON.stringify(e),
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Set could not be created.",
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

const Set: z.ZodType<Prisma.SetCreateInput> = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  visualization: z.object({
    create: z.object({
      type: z.string(),
      options: z.object({
        puzzle: z.object({
          size: z.number().optional(),
          alg: z.string().optional(),
          mask: z
            .object({
              U: z.array(z.number()).optional(),
              L: z.array(z.number()).optional(),
              F: z.array(z.number()).optional(),
              R: z.array(z.number()).optional(),
              B: z.array(z.number()).optional(),
              D: z.array(z.number()).optional(),
            })
            .optional(),
        }),
      }),
    }),
  }),
  puzzle: z.object({
    connect: z.optional(
      z.object({
        id: z.string(),
      })
    ),
  }),
  cases: z.object({
    create: z
      .array(
        z.object({
          name: z.string().min(1).max(255),
          setup: z.string().min(1).max(255),
          puzzleId: z.string(),
          puzzle: z.object({
            connect: z.optional(
              z.object({
                id: z.string(),
              })
            ),
          }),
          algorithms: z.object({
            create: z
              .array(
                z.object({
                  moves: z.string(),
                  algorithmId: z.string(),
                })
              )
              .nonempty(),
          }),
        })
      )
      .nonempty(),
  }),
});
