"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PuzzleGen from "@/components/PuzzleGen/PuzzleGen";
import { VisualizerType } from "sr-puzzlegen/dist/lib/visualizer/enum";
import { Puzzle, Visualization } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { CubeOptions, SVGVisualizerOptions } from "sr-puzzlegen";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { Alg } from "cubing/alg";
import { Prisma } from "@prisma/client";
import { slugify } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

// Model for Cases for use on this form
type FormCase = {
  id: string;
  name: string;
  algorithms: FormAlg[];
};

// Model for Algs for use on this form
type FormAlg = {
  id: string;
  alg: string;
};

export type AddSetFormProps = {
  puzzles: (Puzzle & {
    visualization: Visualization;
    sets: {
      visualization: {
        id: string;
        type: string;
        options: Prisma.JsonValue;
      };
    }[];
  })[];
};

export function createFormCase(): FormCase {
  return {
    id: crypto.randomUUID(),
    name: "",
    algorithms: [],
  };
}

export function createFormAlg(): FormAlg {
  return {
    id: crypto.randomUUID(),
    alg: "",
  };
}

function parseMask(maskText: string) {
  try {
    return JSON.parse(maskText);
  } catch (e) {
    return [];
  }
}

async function postSet(set: Prisma.SetCreateInput) {
  const response = await fetch("/api/sets", {
    method: "POST",
    body: JSON.stringify(set),
  });

  if (!response.ok) {
    throw new Error((await response.json())!.message);
  }
}

const visualizerTypes = [VisualizerType.CUBE, VisualizerType.CUBE_TOP];

export default function AddSetForm({ puzzles }: AddSetFormProps) {
  const [setName, setSetName] = useState("");
  const [selectedPuzzleId, setSelectedPuzzleId] = useState<string>(
    puzzles.find((puzzle) => puzzle.id === "333")?.id ?? "333"
  );
  const [selectedVisualizerType, setSelectedVisualizerType] =
    useState<VisualizerType>(VisualizerType.CUBE);
  const [setupAlg, setSetupAlg] = useState("");
  const [uMaskText, setUMaskText] = useState("[0,1,2,3,4,5,6,7,8]");
  const [lMaskText, setLMaskText] = useState("[0,1,2,3,4,5,6,7,8]");
  const [fMaskText, setFMaskText] = useState("[0,1,2,3,4,5,6,7,8]");
  const [rMaskText, setRMaskText] = useState("[0,1,2,3,4,5,6,7,8]");
  const [bMaskText, setBMaskText] = useState("[0,1,2,3,4,5,6,7,8]");
  const [dMaskText, setDMaskText] = useState("[0,1,2,3,4,5,6,7,8]");
  const [cases, setCases] = useState<FormCase[]>([]);

  const { toast } = useToast();
  const router = useRouter();

  const mask = {
    U: parseMask(uMaskText),
    L: parseMask(lMaskText),
    F: parseMask(fMaskText),
    R: parseMask(rMaskText),
    B: parseMask(bMaskText),
    D: parseMask(dMaskText),
  };

  const selectedPuzzle = puzzles.find((p) => p.id === selectedPuzzleId);

  // Size property is not present in all puzzle types, and tbh I think
  // the types built into sr-puzzlegen are a little bit broken.
  // Hard-coding in just CubeOptions (NxNs) for now
  let puzzleOptions: CubeOptions = {
    size:
      (
        (selectedPuzzle?.visualization?.options as SVGVisualizerOptions)
          ?.puzzle as CubeOptions
      )?.size ?? 3,
    alg: setupAlg,
    mask: mask,
  };
  let options: SVGVisualizerOptions = {
    puzzle: puzzleOptions,
  };

  function onAddCase() {
    setCases([...cases, createFormCase()]);
  }

  function updateCaseName(caseId: string, newName: string) {
    const caseIndex = cases.findIndex((c) => c.id === caseId);
    if (caseIndex === -1) return;

    const newCases = [...cases];
    newCases[caseIndex].name = newName;
    setCases(newCases);
  }

  function onAddAlg(caseId: string) {
    const caseIndex = cases.findIndex((c) => c.id === caseId);
    if (caseIndex === -1) return;

    const newCases = [...cases];
    newCases[caseIndex].algorithms.push(createFormAlg());
    setCases(newCases);
  }

  function modifyAlg(caseId: string, algId: string, newAlg: string) {
    const caseIndex = cases.findIndex((c) => c.id === caseId);
    if (caseIndex === -1) return;

    const algIndex = cases[caseIndex].algorithms.findIndex(
      (a) => a.id === algId
    );
    if (algIndex === -1) return;

    const newCases = [...cases];
    newCases[caseIndex].algorithms[algIndex].alg = newAlg;
    setCases(newCases);
  }

  /**
   * Uses the current state of this component to construct a Prisma.SetCreateInput object
   * @returns A Prisma.SetCreateInput object that can be used to create a new set with the API
   */
  function constructSet(): Prisma.SetCreateInput {
    return {
      name: setName,
      slug: slugify(setName),
      visualization: {
        create: {
          type: selectedVisualizerType,
          options: options as Prisma.InputJsonValue,
        },
      },
      puzzle: {
        connect: selectedPuzzleId ? { id: selectedPuzzleId } : undefined,
      },
      cases: {
        create: cases.map((c) => {
          return {
            name: c.name,
            setup: new Alg(c.algorithms[0]?.alg || "").invert().toString(),
            puzzle: {
              connect: selectedPuzzleId ? { id: selectedPuzzleId } : undefined,
            },
            algorithms: {
              create: c.algorithms.map((a) => {
                return {
                  moves: a.alg,
                };
              }),
            },
          };
        }),
      },
    };
  }

  async function onPublishClick() {
    const set = constructSet();
    try {
      await postSet(set);
      router.push(`/puzzles/${set.puzzle.connect!.id}/sets/${set.slug}`);
    } catch (e: unknown) {
      console.error(e);
      toast({
        title: "An error occurred",
        description:
          "An error occurred while publishing the set. Check the console for details.",
      });
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">Add a new set</p>
        <Button onClick={onPublishClick}>
          <span>Publish new set</span>
          <SendHorizonal className="ml-2 h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
      <p className="font-bold text-lg">Set Overview</p>
      <div className="flex gap-x-2">
        <Card className="h-56">
          <CardHeader>
            <CardTitle>{setName.length > 0 ? setName : "Set Name"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 w-32">
              <PuzzleGen
                type={selectedVisualizerType}
                options={options as SVGVisualizerOptions}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            id="setName"
            placeholder="Set Name"
            className="w-48"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
          <Select
            value={selectedPuzzleId}
            onValueChange={(value) => setSelectedPuzzleId(value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select a puzzle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Puzzles</SelectLabel>
                {puzzles.map((puzzle) => {
                  return (
                    <SelectItem key={puzzle.id} value={puzzle.id}>
                      {puzzle.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(newValue) =>
              setSelectedVisualizerType(newValue as VisualizerType)
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Visualizer Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Visualizer Type</SelectLabel>
                {visualizerTypes.map((visualizerType) => {
                  return (
                    <SelectItem key={visualizerType} value={visualizerType}>
                      {visualizerType}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="text"
            id="setupAlg"
            placeholder="Setup Alg"
            className="w-48"
            onChange={(e) => setSetupAlg(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Mask Settings</h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="u-mask">U</Label>
          <Input
            id="u-mask"
            value={uMaskText}
            onChange={(e) => setUMaskText(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="l-mask">L</Label>
          <Input
            id="l-mask"
            value={lMaskText}
            onChange={(e) => setLMaskText(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="f-mask">F</Label>
          <Input
            id="f-mask"
            value={fMaskText}
            onChange={(e) => setFMaskText(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="r-mask">R</Label>
          <Input
            id="r-mask"
            value={rMaskText}
            onChange={(e) => setRMaskText(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="b-mask">B</Label>
          <Input
            id="b-mask"
            value={bMaskText}
            onChange={(e) => setBMaskText(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="d-mask">D</Label>
          <Input
            id="d-mask"
            value={dMaskText}
            onChange={(e) => setDMaskText(e.target.value)}
          />
        </div>
      </div>
      <p className="font-bold text-lg">Cases ({cases.length})</p>
      {cases.map((c) => {
        return (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle>
                <Input
                  type="text"
                  placeholder="Case Name"
                  onChange={(e) => updateCaseName(c.id, e.target.value)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-x-4">
                <div className="w-40 h-40">
                  <PuzzleGen
                    type={selectedVisualizerType}
                    options={{
                      ...(options as SVGVisualizerOptions),
                      puzzle: {
                        ...(options as SVGVisualizerOptions).puzzle,
                        alg: new Alg(c.algorithms[0]?.alg || "")
                          .invert()
                          .toString(),
                      },
                    }}
                  />
                </div>
                <div className="flex flex-col gap-y-1 flex-grow">
                  {c.algorithms.map((alg, i) => {
                    const isLast = i === c.algorithms.length - 1;
                    return (
                      <>
                        <Input
                          type="text"
                          onChange={(e) =>
                            modifyAlg(c.id, alg.id, e.target.value)
                          }
                        />
                        {!isLast && <Separator />}
                      </>
                    );
                  })}
                  <Button
                    variant="outline"
                    className="w-32"
                    onClick={() => onAddAlg(c.id)}
                  >
                    + Add an alg
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <Button variant="outline" className="w-32" onClick={onAddCase}>
        + Add a case
      </Button>
    </div>
  );
}
