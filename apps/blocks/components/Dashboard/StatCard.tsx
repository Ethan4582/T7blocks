import React from "react";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  trend?: number; // Previous value for comparison
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  const diff = trend !== undefined ? value - trend : 0;
  const percent = trend && trend > 0 ? (diff / trend) * 100 : 0;

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 backdrop-blur-sm hover:border-white/20 transition-all group">
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-sm font-medium">{label}</span>
        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#FF8B21]/10 transition-colors">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="text-3xl font-bold tracking-tight">{value.toLocaleString()}</div>
        {trend !== undefined && (
          <div className={`text-xs font-bold px-2 py-1 rounded-full ${percent >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {percent >= 0 ? '+' : ''}{percent.toFixed(1)}%
          </div>
        )}
      </div>
    </div>
  );
}
