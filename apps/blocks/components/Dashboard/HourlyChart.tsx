"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { CHART_THEME } from "../../lib/utils/transform";

interface HourlyChartProps {
  data: Array<{ hour: string; count: number }>;
}

export function HourlyChart({ data }: HourlyChartProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold font-serif italic text-white">Signup Activity</h2>
        <p className="text-white/40 text-sm">Distribution by hour of day (Last 1000)</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={CHART_THEME.grid} />
            <XAxis
              dataKey="hour"
              stroke={CHART_THEME.text}
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis
              stroke={CHART_THEME.text}
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#151518",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                fontSize: "12px"
              }}
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
            />
            <Bar
              dataKey="count"
              fill={CHART_THEME.accent}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.count > 0 ? CHART_THEME.accent : "rgba(255, 255, 255, 0.1)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
