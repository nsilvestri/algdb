"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { markAlgorithmAsLearned, markAlgorithmAsUnlearned } from "./actions";

export type LearnedButtonProps = {
  initialLearned: boolean;
  algorithmId: string;
};

export function LearnedButton({
  initialLearned,
  algorithmId,
}: LearnedButtonProps) {
  const [learned, setLearned] = useState(initialLearned);

  async function onClick() {
    if (learned) {
      await markAlgorithmAsUnlearned();
    } else {
      await markAlgorithmAsLearned(algorithmId);
    }
    setLearned(!learned);
  }

  return (
    <Button variant="outline" onClick={onClick}>
      {learned ? "✅" : "❌"} Learned
    </Button>
  );
}
