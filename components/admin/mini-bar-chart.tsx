"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DataPoint {
  date: string;
  value: number;
}

interface MiniBarChartProps {
  title: string;
  data: DataPoint[];
  /** "number" shows integer, "currency" shows $X.XX */
  format?: "number" | "currency";
  suffix?: string;
  color?: string;
}

function formatValue(v: number, format: "number" | "currency", suffix: string): string {
  if (format === "currency") return `$${v.toFixed(2)}${suffix}`;
  return `${v}${suffix}`;
}

export function MiniBarChart({
  title,
  data,
  format = "number",
  suffix = "",
  color = "rgb(99, 102, 241)",
}: MiniBarChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = 100 / data.length;

  return (
    <Card className="bg-card/50 border-border">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {hovered !== null && (
            <span className="text-xs font-mono text-foreground">
              {data[hovered].date.slice(5)} · {formatValue(data[hovered].value, format, suffix)}
            </span>
          )}
        </div>
        <svg
          viewBox="0 0 100 40"
          className="w-full h-32 sm:h-40"
          preserveAspectRatio="none"
          onMouseLeave={() => setHovered(null)}
        >
          {data.map((d, i) => {
            const height = (d.value / max) * 36;
            const isHovered = hovered === i;
            return (
              <rect
                key={d.date}
                x={i * barWidth + barWidth * 0.15}
                y={40 - height}
                width={barWidth * 0.7}
                height={Math.max(height, 0.5)}
                rx={0.5}
                fill={isHovered ? "rgb(165, 180, 252)" : color}
                opacity={hovered === null || isHovered ? 0.9 : 0.4}
                className="transition-opacity duration-150"
                onMouseEnter={() => setHovered(i)}
              />
            );
          })}
        </svg>
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-mono">
          <span>{data[0]?.date.slice(5)}</span>
          <span>{data[data.length - 1]?.date.slice(5)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
