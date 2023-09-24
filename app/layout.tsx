import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { SidebarNav, SidebarNavItem } from "@/components/sidebar-nav";
import { ThemeToggle } from "@/components/ThemeToggle/theme-toggle";
import prisma from "@/prisma/global-prisma-client";
import ClientSessionProvider from "@/context/client-session-provider";
import { UserAccountNav } from "@/components/user-account-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlgDB: New and Improved!",
  description: "Find cubing algorithms for your favorite puzzles.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const puzzles = await prisma.puzzle.findMany();
  const sets = await prisma.set.findMany({
    include: {
      puzzle: true,
    },
  });
  const methods = await prisma.method.findMany({
    include: {
      puzzle: true,
    },
  });
  const mainNavItems = [
    {
      title: "Puzzles",
      href: "/puzzles",
    },
    {
      title: "Algorithm Sets",
      href: "/sets",
    },
    {
      title: "Methods",
      href: "/methods",
    },
  ];
  const sidebarNavItems: SidebarNavItem[] = [
    {
      title: "Puzzles",
      items: puzzles.map((puzzle) => ({
        title: puzzle.name,
        href: `/puzzles/${puzzle.slug}`,
      })),
    },
    {
      title: "Algorithm Sets",
      items: sets.map((set) => ({
        title: set.name,
        href: `/puzzles/${set.puzzle.slug}/sets/${set.slug}`,
      })),
    },
    {
      title: "Methods",
      items: methods.map((method) => ({
        title: method.name,
        href: `/puzzles/${method.puzzle.slug}/methods/${method.slug}`,
      })),
    },
  ];
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientSessionProvider session={session}>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-40 w-full h-16 box-border border-b bg-background">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                  <MainNav items={mainNavItems}>
                    <SidebarNav items={sidebarNavItems} />
                  </MainNav>
                  <div className="flex flex-1 items-center space-x-4 justify-end">
                    <ThemeToggle />
                    {session?.user ? (
                      <UserAccountNav user={session.user} />
                    ) : (
                      <Link
                        href="/api/auth/signin"
                        className={cn(buttonVariants({ variant: "default" }))}
                      >
                        Sign in
                      </Link>
                    )}
                  </div>
                </div>
              </header>
              <div className="container flex-1">
                <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
                  <aside className="fixed top-16 z-30 hidden h-[calc(100vh-64px)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
                    <SidebarNav items={sidebarNavItems} />
                  </aside>
                  <div className="pt-4 h-full">{children}</div>
                </div>
              </div>
            </div>
          </ClientSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
