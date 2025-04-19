"use client";

import QuadrantVisualization from "@/components/QuadrantVisualization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

interface Initiative {
  id: string;
  name: string;
  value: number;
  complexity: number;
}

const initialInitiatives: Initiative[] = [
  { id: "1", name: "Example 1", value: 7, complexity: 3 },
  { id: "2", name: "Example 2", value: 5, complexity: 5 },
  { id: "3", name: "Example 3", value: 3, complexity: 7 },
];

export default function Home() {
  const [initiatives, setInitiatives] = useState<Initiative[]>(initialInitiatives);

  const addInitiative = (newInitiative: Omit<Initiative, 'id'>) => {
    setInitiatives([...initiatives, { ...newInitiative, id: crypto.randomUUID() }]);
  };

  const clearInitiatives = () => {
    setInitiatives([]);
  };

  const deleteInitiative = (id: string) => {
    setInitiatives(initiatives.filter((initiative) => initiative.id !== id));
  };

  const updateInitiative = (id: string, updatedInitiative: Partial<Initiative>) => {
    setInitiatives(
      initiatives.map((initiative) =>
        initiative.id === id ? { ...initiative, ...updatedInitiative } : initiative
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Value/Complexity Visualizer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Initiative Input</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <InitiativeTable
              initiatives={initiatives}
              addInitiative={addInitiative}
              clearInitiatives={clearInitiatives}
              deleteInitiative={deleteInitiative}
              updateInitiative={updateInitiative}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Priority Quadrant</CardTitle>
          </CardHeader>
          <CardContent>
            <QuadrantVisualization initiatives={initiatives} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface InitiativeTableProps {
  initiatives: Initiative[];
  addInitiative: (initiative: Omit<Initiative, 'id'>) => void;
  clearInitiatives: () => void;
  deleteInitiative: (id: string) => void;
  updateInitiative: (id: string, updatedInitiative: Partial<Initiative>) => void;
}

const InitiativeTable: React.FC<InitiativeTableProps> = ({
  initiatives,
  addInitiative,
  clearInitiatives,
  deleteInitiative,
  updateInitiative,
}) => {
  const handleAddRow = () => {
    addInitiative({ name: "", value: 1, complexity: 1 });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Complexity</TableHead>
            <TableHead className="w-[50px]">
              <Button variant="ghost" size="icon" onClick={clearInitiatives}>
                <Trash className="h-4 w-4" />
                <span className="sr-only">Clear Initiatives</span>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initiatives.map((initiative, index) => (
            <InitiativeTableRow
              key={initiative.id}
              initiative={initiative}
              index={index}
              deleteInitiative={deleteInitiative}
              updateInitiative={updateInitiative}
            />
          ))}
          <TableRow>
            <TableCell colSpan={5} className="p-0">
              <Button variant="ghost" className="w-full" onClick={handleAddRow}>
                Add Initiative
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableCaption>A list of all initiatives.</TableCaption>
      </Table>
    </div>
  );
};

interface InitiativeTableRowProps {
  initiative: Initiative;
  index: number;
  deleteInitiative: (id: string) => void;
  updateInitiative: (id: string, updatedInitiative: Partial<Initiative>) => void;
}

const InitiativeTableRow: React.FC<InitiativeTableRowProps> = ({
  initiative,
  index,
  deleteInitiative,
  updateInitiative,
}) => {
  const [name, setName] = useState(initiative.name);
  const [value, setValue] = useState(initiative.value.toString());
  const [complexity, setComplexity] = useState(initiative.complexity.toString());

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    updateInitiative(initiative.id, { name: e.target.value });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 9) {
      setValue(e.target.value);
      updateInitiative(initiative.id, { value: newValue });
    }
  };

  const handleComplexityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newComplexity = parseInt(e.target.value);
    if (!isNaN(newComplexity) && newComplexity >= 1 && newComplexity <= 9) {
      setComplexity(e.target.value);
      updateInitiative(initiative.id, { complexity: newComplexity });
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>
        <Input type="text" value={name} onChange={handleNameChange} />
      </TableCell>
      <TableCell>
        <Input type="number" value={value} onChange={handleValueChange} />
      </TableCell>
      <TableCell>
        <Input type="number" value={complexity} onChange={handleComplexityChange} />
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="icon" onClick={() => deleteInitiative(initiative.id)}>
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete Initiative</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

    