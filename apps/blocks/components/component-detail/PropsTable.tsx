"use client";

export function PropsTable({ content }: { content: any }) {
  if (!content || typeof content !== 'string') return null;

  const lines = content.split('\n').filter(l => l.trim().includes('|') && !l.includes('---'));

  if (lines.length > 0) {
    const headers = lines[0].split('|').filter(Boolean).map(h => h.trim());
    const rows = lines.slice(1).map(row => row.split('|').filter(Boolean).map(r => r.trim()));

    return (
      <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 bg-white dark:bg-[#141212]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/5 bg-white dark:bg-[#141212]">
                {headers.map((header, i) => (
                  <th key={i} className="px-6 py-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap text-[#737373] dark:text-[#f5f5f5]">
                      {header}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/5">
              {rows.map((row, i) => (
                <tr key={i} className="group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  {row.map((cell, j) => {
                    const isType = headers[j]?.toLowerCase().includes('type');
                    const isName = headers[j]?.toLowerCase().includes('name') || headers[j]?.toLowerCase().includes('prop') || headers[j]?.toLowerCase().includes('property');
                    return (
                      <td key={j} className="px-6 py-5">
                        <span className={`text-[13.5px] ${isType ? 'font-mono text-blue-400 bg-blue-400/5 px-2 py-0.5 rounded border border-blue-400/10' :
                          isName ? 'font-bold text-[#262626] dark:text-[#a1ff62]' : 'text-[#262626] dark:text-[#f5f5f5] dark:opacity-60'
                          }`}>
                          {cell}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-3xl border border-black/10 dark:border-white/5 bg-white dark:bg-[#141212] text-[#262626] dark:text-[#f5f5f5] dark:opacity-60 leading-relaxed text-[15px]">
      {content}
    </div>
  );
}
