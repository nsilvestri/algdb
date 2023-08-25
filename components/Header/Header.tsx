import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle/theme-toggle";

export async function Header() {
  return (
    <header className="flex justify-between content-center p-3">
      <Link href="/">
        <p>AlgDB</p>
      </Link>
      <div className="flex gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
