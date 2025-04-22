"use client";

import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceLine,
  Text,
} from "recharts";

interface Initiative {
  name: string;
  value: number;
  complexity: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Initiative[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const initiative = payload[0].payload as Initiative;
    return (
      <div className="bg-white border rounded shadow-md p-2">
        <p className="font-bold">{`${initiative.name}`}</p>
        <p>{`Value: ${initiative.value}`}</p>
        <p>{`Complexity: ${initiative.complexity}`}</p>
      </div>
    );
  }

  return null;
};

interface QuadrantVisualizationProps {
  initiatives: Initiative[];
}

const QuadrantVisualization: React.FC<QuadrantVisualizationProps> = ({
  initiatives,
}) => {
  const [tooltipContent, setTooltipContent] = useState<Initiative | null>(null);

  const handleMouseEnter = (initiative: Initiative) => {
    setTooltipContent(initiative);
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis
          type="number"
          dataKey="complexity"
          name="Complexity"
          domain={[0, 10]}
          tickCount={11}
          label={{ value: "Complexity", position: "bottom", offset: 0 }}
        />
        <YAxis
          type="number"
          dataKey="value"
          name="Value"
          domain={[0, 10]}
          tickCount={11}
          label={{ value: "Value", angle: -90, position: "left", offset: 0 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Scatter
          name="Initiatives"
          data={initiatives}
          fill="#2ecc71"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Quadrant Dividers */}
        <ReferenceLine x={5} stroke="#ccc" strokeDasharray="3 3" />
        <ReferenceLine y={5} stroke="#ccc" strokeDasharray="3 3" />

        {/* Quadrant Labels */}
        <Text
          x={2.5}
          y={7.5}
          textAnchor="middle"
          verticalAnchor="middle"
          fontSize={16}
          fill="#8884d8"
        >
          High Value, Low Complexity
        </Text>
        <Text
          x={7.5}
          y={7.5}
          textAnchor="middle"
          verticalAnchor="middle"
          fontSize={16}
          fill="#8884d8"
        >
          High Value, High Complexity
        </Text>
        <Text
          x={2.5}
          y={2.5}
          textAnchor="middle"
          verticalAnchor="middle"
          fontSize={16}
          fill="#8884d8"
        >
          Low Value, Low Complexity
        </Text>
        <Text
          x={7.5}
          y={2.5}
          textAnchor="middle"
          verticalAnchor="middle"
          fontSize={16}
          fill="#8884d8"
        >
          Low Value, High Complexity
        </Text>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default QuadrantVisualization;
