import React from "react";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  loading,
  error
}: LoginFormProps) {
  return (
    <div className="min-h-screen bg-[#151518] flex items-center justify-center p-6 selection:bg-[#FF8B21]/30">
      <div className="w-full max-w-md space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white font-serif italic tracking-tight">Dashboard Login</h1>
          <p className="text-white/40 text-sm">Enter your admin credentials to access the analytics suite</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold ml-1">Email Address</label>
              <input
                type="email"
                placeholder="admin@t7blocks.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF8B21]/50 transition-all placeholder:text-white/20"
                autoFocus
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold ml-1">Secret Key</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF8B21]/50 transition-all placeholder:text-white/20"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF8B21] text-[#151518] font-bold py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-[#FF8B21]/10"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Session"}
          </button>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
              <p className="text-red-400 text-xs text-center font-medium">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
