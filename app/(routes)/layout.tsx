import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { Separator } from "@/components/ui/separator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-y-2">{children}</div>;
}
