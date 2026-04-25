export interface Signup {
  email: string;
  created_at: string;
}

export const CHART_THEME = {
  accent: "#FF8B21",
  background: "#010101",
  grid: "rgba(255, 255, 255, 0.05)",
  text: "rgba(255, 255, 255, 0.4)",
};

export function groupByDay(signups: Signup[]) {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });

  const counts: Record<string, number> = {};
  signups.forEach((s) => {
    const date = s.created_at.split("T")[0];
    counts[date] = (counts[date] || 0) + 1;
  });

  let cumulative = 0;

  return last30Days.map((date) => {
    cumulative += counts[date] || 0;
    return {
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count: counts[date] || 0,
      growth: cumulative,
    };
  });
}

export function groupByHour(signups: Signup[]) {
  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    count: 0,
  }));

  signups.forEach((s) => {
    const date = new Date(s.created_at);
    const hour = date.getHours();
    hours[hour].count++;
  });

  return hours;
}

export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}
