"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { markAlgorithmAsLearned, markAlgorithmAsUnlearned } from "./actions";

export type LearnedButtonProps = {
  learned: boolean;
  algorithmId: string;
};

export function LearnedButton({ learned, algorithmId }: LearnedButtonProps) {
  async function onClick() {
    if (learned) {
      await markAlgorithmAsUnlearned();
    } else {
      await markAlgorithmAsLearned(algorithmId);
    }
  }

  return (
    <Button variant="outline" onClick={onClick}>
      {learned ? "✅" : "❌"} Learned
    </Button>
  );
}
