export type CardListProps = {
  children: React.ReactNode;
};
export function CardList({ children }: CardListProps) {
  return <div className="flex gap-3">{children}</div>;
}
