"use client";
import React, { useEffect, useRef } from "react";
import { PNG, SVG, Type, PNGVisualizerOptions } from "sr-puzzlegen"; // Assuming these are the correct imports

interface PuzzleProps {
  type: Type;
  options: PNGVisualizerOptions;
}

const PuzzleGen: React.FC<PuzzleProps> = ({ type, options }) => {
  const puzzleContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (puzzleContainerRef.current) {
      // Clean up previous puzzle element
      puzzleContainerRef.current.innerHTML = "";

      // Generate new puzzle element
      PNG(puzzleContainerRef.current, type, options);
    }

    return () => {
      puzzleContainerRef.current = null;
    };
  }, [type, options, puzzleContainerRef]);

  return <div ref={puzzleContainerRef} />;
};

export default PuzzleGen;
