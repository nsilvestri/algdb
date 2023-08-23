import { Header } from "../components/Header/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlgDB2: New and Improved!",
  description: "Find cubing algorithms for your favorite puzzles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="p-3">{children}</div>
      </body>
    </html>
  );
}
