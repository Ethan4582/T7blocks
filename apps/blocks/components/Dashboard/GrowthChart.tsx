"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { CHART_THEME } from "../../lib/utils/transform";

interface GrowthChartProps {
  data: Array<{ date: string; growth: number }>;
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold font-serif italic text-white">Cumulative Growth</h2>
        <p className="text-white/40 text-sm">Total signups over the last 30 days</p>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_THEME.accent} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_THEME.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke={CHART_THEME.text}
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              stroke={CHART_THEME.text}
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#151518",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                fontSize: "12px"
              }}
              itemStyle={{ color: CHART_THEME.accent }}
            />
            <Area
              type="monotone"
              dataKey="growth"
              stroke={CHART_THEME.accent}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorGrowth)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
