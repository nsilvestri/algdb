import Link from "next/link";

export type CardProps = {
  title: string;
  icon: React.ReactNode;
  href: string;
};
export function Card({ title, icon, href }: CardProps) {
  return (
    <Link href={href}>
      <div className="bg-gray-800 h-40 w-32 p-3 rounded">
        <div className="m-2 bg-gray-200 aspect-square"></div>
        <p className="text-lg text-center">{title}</p>
      </div>
    </Link>
  );
}
