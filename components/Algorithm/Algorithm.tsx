import Link from "next/link";
import { Button } from "../ui/button";
import { Alg } from "cubing/alg";

export type AlgorithmProps = {
  moves: string;
};

export function Algorithm({ moves }: AlgorithmProps) {
  return (
    <div className="flex justify-between items-center">
      <p>{moves}</p>
      <div className="space-x-2">
        <Button variant="outline">Learned</Button>
        <Button variant="outline" asChild>
          <Link
            href={`https://alg.cubing.net/?alg=${moves}&setup=${new Alg(moves)
              .invert()
              .toString()}`}
            target="_blank"
          >
            Visualize
          </Link>
        </Button>
      </div>
    </div>
  );
}
