"use client";

import InitiativeForm from "@/components/InitiativeForm";
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
} from "@/components/ui/table"

interface Initiative {
  name: string;
  value: number;
  complexity: number;
}

const initialInitiatives: Initiative[] = [
  { name: "Example 1", value: 7, complexity: 3 },
  { name: "Example 2", value: 5, complexity: 5 },
  { name: "Example 3", value: 3, complexity: 7 },
];

export default function Home() {
  const [initiatives, setInitiatives] = useState<Initiative[]>(initialInitiatives);

  const addInitiative = (newInitiative: Initiative) => {
    setInitiatives([...initiatives, newInitiative]);
  };

  const clearInitiatives = () => {
    setInitiatives([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Value/Complexity Visualizer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Initiative Input</CardTitle>
          </CardHeader>
          <CardContent>
            <InitiativeForm addInitiative={addInitiative} clearInitiatives={clearInitiatives} />
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
      <Card className="w-full max-w-4xl mt-4">
        <CardHeader>
          <CardTitle>Initiative List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Complexity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initiatives.map((initiative, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{initiative.name}</TableCell>
                  <TableCell>{initiative.value}</TableCell>
                  <TableCell>{initiative.complexity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
