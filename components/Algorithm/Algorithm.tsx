import Link from "next/link";
import { Button } from "../ui/button";
import { Alg } from "cubing/alg";
import { LearnedButton } from "../LearnedButton/LearnedButton";

export type AlgorithmProps = {
  moves: string;
  algorithmId: string;
  learned: boolean;
};

export function Algorithm({ moves, algorithmId }: AlgorithmProps) {
  return (
    <div className="flex justify-between items-center">
      <p>{moves}</p>
      <div className="space-x-2">
        <LearnedButton initialLearned={false} algorithmId={algorithmId} />
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
