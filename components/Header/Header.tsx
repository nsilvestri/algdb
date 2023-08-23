import Link from "next/link";

export function Header() {
  return (
    <Link href="/">
      <div className="bg-gray-800 p-3">Header</div>
    </Link>
  );
}
