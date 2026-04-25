"use client";

import React, { useState, useEffect } from "react";
import { Users, UserPlus, Calendar, Clock, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface DashboardData {
  stats: {
    total: number;
    last24h: number;
    last7d: number;
    last30d: number;
  };
  recent: Array<{
    email: string;
    created_at: string;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fetchDashboard = async (userEmail: string, userPass: string) => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_WAITLIST_URL;
      const credentials = btoa(`${userEmail}:${userPass}`);
      const response = await fetch(`${baseUrl}/dashboard`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.ok) {
        const result = (await response.json()) as DashboardData;
        setData(result);
        setIsAuthorized(true);
        sessionStorage.setItem("dashboard_email", userEmail);
        sessionStorage.setItem("dashboard_pass", userPass);
      } else if (response.status === 401) {
        setError("Invalid email or password");
        setIsAuthorized(false);
      } else {
        setError("Failed to fetch dashboard data");
      }
    } catch (err) {
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("dashboard_email");
    const savedPass = sessionStorage.getItem("dashboard_pass");
    if (savedEmail && savedPass) {
      setEmail(savedEmail);
      setPassword(savedPass);
      fetchDashboard(savedEmail, savedPass);
    } else {
      setLoading(false);
    }
  }, []);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#151518] flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white font-serif italic">Dashboard Login</h1>
            <p className="text-white/60 text-sm mt-2">Enter admin credentials to continue</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchDashboard(email, password);
            }}
            className="space-y-4"
          >
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF8B21]/50 transition-all"
                autoFocus
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF8B21]/50 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF8B21] text-[#151518] font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Access Dashboard
            </button>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#151518] text-white p-6 md:p-10 font-sans selection:bg-[#FF8B21]/30">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-serif italic">Waitlist Dashboard</h1>
            <p className="text-white/60">Real-time signup analytics and data</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => fetchDashboard(email, password)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-[#FF8B21]" />
              Refresh Data
            </button>
            <button 
              onClick={() => {
                sessionStorage.removeItem("dashboard_pass");
                setIsAuthorized(false);
                setPassword("");
              }}
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Total Signups" 
            value={data.stats.total} 
            icon={<Users className="w-5 h-5 text-[#FF8B21]" />} 
          />
          <StatCard 
            label="Last 24 Hours" 
            value={data.stats.last24h} 
            icon={<UserPlus className="w-5 h-5 text-green-400" />} 
          />
          <StatCard 
            label="Last 7 Days" 
            value={data.stats.last7d} 
            icon={<Calendar className="w-5 h-5 text-blue-400" />} 
          />
          <StatCard 
            label="Last 30 Days" 
            value={data.stats.last30d} 
            icon={<Clock className="w-5 h-5 text-purple-400" />} 
          />
        </div>

        {/* Recent Signups Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif italic">Recent Signups (50)</h2>
            <div className="text-xs text-white/40 uppercase tracking-wider">Live Feed</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="px-6 py-4 font-medium">Email Address</th>
                  <th className="px-6 py-4 font-medium">Joined At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.recent.map((signup, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-white/90 group-hover:text-white">{signup.email}</td>
                    <td className="px-6 py-4 text-sm text-white/50">{new Date(signup.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-10 border-t border-white/5 flex items-center justify-center">
          <Link href="/waitlist" className="text-white/40 hover:text-[#FF8B21] transition-all flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Waitlist Page
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 backdrop-blur-sm hover:border-white/20 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-sm font-medium">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold tracking-tight">{value.toLocaleString()}</div>
    </div>
  );
}
