import React from "react";
import { Clock, LogOut, Loader2 } from "lucide-react";

interface DashboardHeaderProps {
  onRefresh: () => void;
  onLogout: () => void;
  loading: boolean;
}

export function DashboardHeader({ onRefresh, onLogout, loading }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-serif italic text-white">Waitlist Dashboard</h1>
        <p className="text-white/60">Real-time signup analytics and data insight</p>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#FF8B21]" />
          ) : (
            <Clock className="w-4 h-4 text-[#FF8B21]" />
          )}
          Refresh Data
        </button>
        <button 
          onClick={onLogout}
          className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
