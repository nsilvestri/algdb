"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").slice(1);
  return (
    <div className="flex space-x-1">
      {paths.map((path) => {
        return (
          <>
            <p>/</p>
            <Link
              href={
                paths.indexOf(path) === paths.length - 1
                  ? pathname
                  : pathname.slice(0, pathname.indexOf(path) + path.length)
              }
            >
              {path}
            </Link>
          </>
        );
      })}
    </div>
  );
}
