"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Users, UserPlus, Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "../../components/Dashboard/DashboardHeader";
import { StatCard } from "../../components/Dashboard/StatCard";
import { GrowthChart } from "../../components/Dashboard/GrowthChart";
import { HourlyChart } from "../../components/Dashboard/HourlyChart";
import { SignupTable } from "../../components/Dashboard/SignupTable";
import { TablePagination } from "../../components/Dashboard/TablePagination";
import { LoginForm } from "../../components/Dashboard/LoginForm";
import { groupByDay, groupByHour, Signup } from "../../lib/utils/transform";

interface DashboardData {
  stats: {
    total: number;
    last24h: number;
    last7d: number;
    last30d: number;
  };
  recent: Signup[];
}

const PAGE_SIZE = 20;

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchDashboard = async (userEmail: string, userPass: string) => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_WAITLIST_URL?.replace(/\/$/, "");
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
        setCurrentPage(0);
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

  const transformedData = useMemo(() => {
    if (!data) return { daily: [], hourly: [] };
    return {
      daily: groupByDay(data.recent),
      hourly: groupByHour(data.recent)
    };
  }, [data]);

  const paginatedRecent = useMemo(() => {
    if (!data) return [];
    return data.recent.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
  }, [data, currentPage]);

  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.recent.length / PAGE_SIZE);
  }, [data]);

  const handleLogout = () => {
    sessionStorage.removeItem("dashboard_email");
    sessionStorage.removeItem("dashboard_pass");
    setIsAuthorized(false);
    setData(null);
    setEmail("");
    setPassword("");
  };

  if (!isAuthorized) {
    return (
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        error={error}
        onSubmit={(e) => {
          e.preventDefault();
          fetchDashboard(email, password);
        }}
      />
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen w-full bg-[#010101] text-white p-6 md:p-10 font-sans selection:bg-[#FF8B21]/30">
      <div className="w-full space-y-10 max-w-[1400px] mx-auto">
        <DashboardHeader
          loading={loading}
          onRefresh={() => fetchDashboard(email, password)}
          onLogout={handleLogout}
        />

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GrowthChart data={transformedData.daily} />
          </div>
          <div className="lg:col-span-1">
            <HourlyChart data={transformedData.hourly} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <SignupTable data={paginatedRecent} />
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex items-center justify-between">
          <Link href="/waitlist" className="text-white/40 hover:text-[#FF8B21] transition-all flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Return to Waitlist
          </Link>
          <div className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
            T7 Blocks Admin Suite v1.0
          </div>
        </div>
      </div>
    </div>
  );
}
