import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle/theme-toggle";

import { Navigation } from "@/components/Navigation/Navigation";
import prisma from "@/prisma/global-prisma-client";

export async function Header() {
  const puzzles = await prisma.puzzle.findMany();
  return (
    <header className="flex justify-between content-center p-3 bg-slate-200 dark:bg-slate-900">
      <div className="flex gap-2">
        <Link href="/">
          <h1 className="font-bold text-4xl">AlgDB</h1>
        </Link>
        <Navigation puzzles={puzzles} />
      </div>
      <div className="flex gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
