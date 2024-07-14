"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateLearnedStatus } from "@/app/actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const learnedStatuses = ["Not learned", "Learning", "Learned"];

export type AlgorithmRowProps = {
  algorithm: { id: string; moves: string };
  algorithmForCase: { id: string };
  initialStatus: string;
  loggedIn: boolean;
};

export function AlgorithmRow({
  algorithm,
  algorithmForCase,
  initialStatus,
  loggedIn,
}: AlgorithmRowProps) {
  const [status, setStatus] = useState(initialStatus);
  let statusStyle = "";
  if (status === "Learned") {
    statusStyle =
      "border border-green-400 bg-green-100 dark:border-green-700 dark:bg-green-950";
  }
  if (status === "Learning") {
    statusStyle =
      "border border-yellow-400 bg-yellow-100 dark:border-yellow-700 dark:bg-yellow-950";
  }

  function onStatusChange(newValue: string) {
    setStatus(newValue);
    updateLearnedStatus(algorithmForCase.id, newValue);
  }

  return (
    <div
      className={`flex justify-between items-center ${statusStyle} p-1 rounded-sm`}
    >
      <div>
        <p>{algorithm.moves}</p>
      </div>
      <TooltipWrapper disableTooltip={loggedIn}>
        <Select
          onValueChange={(newValue) => onStatusChange(newValue)}
          value={status}
          disabled={!loggedIn}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {learnedStatuses.map((learnedStatus) => {
                return (
                  <SelectItem key={learnedStatus} value={learnedStatus}>
                    {learnedStatus}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </TooltipWrapper>
    </div>
  );
}

type TooltipWrapperProps = {
  children: React.ReactNode;
  disableTooltip?: boolean;
};
const TooltipWrapper = ({ children, disableTooltip }: TooltipWrapperProps) => {
  if (disableTooltip) {
    return children;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>Log in to track progress!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
