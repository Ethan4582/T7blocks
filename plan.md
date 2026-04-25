# Waitlist Dashboard — Premium Refactor Plan

## Folder structure
```
apps/blocks/app/dashboard/
├── page.tsx                     ← entry point, fetches data, composes layout


├── components/
├── Dashboard/
│   ├── DashboardHeader.tsx      ← title, refresh button, logout
│   ├── StatCard.tsx             ← reusable metric card (total, 24h, 7d, 30d)
│   ├── GrowthChart.tsx          ← signup trend over time
│   ├── HourlyChart.tsx          ← signups by hour of day (bar chart)
│   ├── SignupTable.tsx          ← paginated email + timestamp table
│   └── TablePagination.tsx      ← prev/next controls, page indicator
└── lib/
    └── transform.ts             ← pure functions: group by day, group by hour
```

---

1. **`transform.ts`** — write two pure functions: `groupByDay(signups)` buckets signups into daily counts for the last 30 days filling gaps with zero, and `groupByHour(signups)` buckets signups by hour of day (0–23). No fetch logic here — only data transformation. Both functions take the raw signups array from the `/dashboard` endpoint.

2. **`StatCard.tsx`** — single reusable card accepting `label`, `value`, and `icon` props. Render a large number, subtle label, and a small percentage change badge comparing current period to previous period (e.g. 24h vs previous 24h). Derive the comparison delta inside the component from the values passed — no additional fetch.

3. **`GrowthChart.tsx`** — cumulative signup growth line chart using the daily grouped data from `transform.ts`. Use **Recharts** `AreaChart` with a gradient fill — dark background, a glowing accent stroke, custom tooltip showing date and count. No axes clutter — only bottom date labels and a minimal left axis. This is the hero visual of the dashboard.

4. **`HourlyChart.tsx`** — bar chart showing signups by hour of day using `groupByHour` data. Use Recharts `BarChart` with rounded bars and the same dark theme. This reveals when users are most active — useful insight from data already in the DB without any schema changes.

5. **`SignupTable.tsx`** — renders the current page of signups as a clean table with `EMAIL ADDRESS` and `JOINED AT` columns. Accepts `data`, `currentPage`, `totalPages`, `onPageChange` as props. No fetch logic inside — purely presentational. Format the timestamp as relative time (e.g. "2 hours ago") using `Intl.RelativeTimeFormat`.

6. **`TablePagination.tsx`** — standalone pagination controls: previous button, page X of Y indicator, next button. Accepts `currentPage`, `totalPages`, `onPageChange`. Disable prev on page 1 and next on last page. Page size is 20 rows. Total pages derived from `Math.ceil(total / 20)` passed from parent.

7. **`DashboardHeader.tsx`** — title, subtitle, refresh button that calls a passed `onRefresh` callback, and logout button. Keep this purely presentational — no state or fetch logic inside.

8. **`page.tsx`** — owns all state: `data`, `loading`, `currentPage`. Fetches `/dashboard` on mount and on refresh. Passes transformed data down to chart and table components. Handles Basic Auth header. Computes pagination slice as `signups.slice(currentPage * 20, (currentPage + 1) * 20)` before passing to `SignupTable`. Reset `currentPage` to 0 on every refresh.

9. **Chart theme** — both charts share a consistent dark theme: `#010101` background, single accent colour matching the existing blocks site colour token, no grid lines on the growth chart, subtle dotted grid on the hourly chart. Define chart theme constants in `transform.ts` and import into both chart components so colour never diverges.

10. **No new dependencies beyond Recharts** — Recharts is lightweight, tree-shakeable, and sufficient for both chart types. Do not install a separate charting library for each chart. Do not add any animation library to the dashboard — Recharts has built-in entrance animations that are sufficient.