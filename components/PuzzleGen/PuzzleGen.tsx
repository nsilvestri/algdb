"use client";
import React, { useEffect, useRef } from "react";
import { PNG, Type, PNGVisualizerOptions } from "sr-puzzlegen"; // Assuming these are the correct imports

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

    // Clean up when the component unmounts
    return () => {
      if (puzzleContainerRef.current) {
        puzzleContainerRef.current.innerHTML = "";
      }
    };
  }, [type, options, puzzleContainerRef.current]);

  return <div id="puzzle" ref={puzzleContainerRef}></div>;
};

export default PuzzleGen;
