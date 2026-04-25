import React from "react";
import { Mail, Clock } from "lucide-react";
import { formatRelativeTime } from "../../lib/utils/transform";

interface SignupTableProps {
  data: Array<{ email: string; created_at: string }>;
}

export function SignupTable({ data }: SignupTableProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-xl font-bold font-serif italic text-white">Recent Entries</h2>
        <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium px-2 py-1 bg-white/5 rounded-full border border-white/5">
          Live Feed
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-white/40 text-[10px] uppercase tracking-[0.2em] border-b border-white/5 font-bold">
              <th className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  Email Address
                </div>
              </th>
              <th className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Joined At
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length > 0 ? (
              data.map((signup, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-white/90 group-hover:text-white selection:bg-[#FF8B21]/30">
                    {signup.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-white/50 group-hover:text-white/80">
                    <div className="flex flex-col">
                      <span>{formatRelativeTime(signup.created_at)}</span>
                      <span className="text-[10px] opacity-40">
                        {new Date(signup.created_at).toLocaleString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-20 text-center text-white/20 italic">
                  No signup entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
