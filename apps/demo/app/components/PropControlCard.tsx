import React from 'react';

type PropControlCardProps = {
  schema: any;
  values: any;
  onChange: (key: string, value: any) => void;
};

export default function PropControlCard({ schema, values, onChange }: PropControlCardProps) {
  if (!schema || !values) return null;

  return (
    <div className="fixed bottom-8 right-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-[240px] shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] z-50 text-white/80 transition-all duration-300 hover:border-white/20">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">Customizer</h3>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
      </div>
      
      <div className="space-y-5">
        {Object.entries(schema).map(([key, config]: [string, any]) => {
          return (
            <div key={key} className="group flex flex-col gap-1.5">
              <label 
                className="text-[10px] font-medium text-white/30 uppercase tracking-widest pl-1 group-hover:text-white/50 transition-colors"
                htmlFor={key}
              >
                {config.label}
              </label>
              
              {renderControl(key, config, values[key], onChange)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderControl(key: string, config: any, value: any, onChange: (key: string, value: any) => void) {
  const baseStyles = "w-full bg-white/[0.03] border border-white/5 rounded-lg px-2.5 py-1.5 text-[12px] text-white/90 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer";

  if (config.type === "select") {
    return (
      <div className="relative">
        <select
          id={key}
          value={value}
          onChange={(e) => onChange(key, e.target.value)}
          className={baseStyles}
        >
          {config.options.map((opt: string) => (
            <option key={opt} value={opt} className="bg-[#111]">{opt}</option>
          ))}
        </select>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 3L4 6L7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    );
  }

  if (config.type === "text" || config.type === "color") {
    return (
      <div className="relative flex items-center gap-2">
        <input
          id={key}
          type="text"
          value={value}
          onChange={(e) => onChange(key, e.target.value)}
          className={baseStyles}
        />
        {/* If it looks like a hex color, show a tiny preview */}
        {typeof value === 'string' && value.startsWith('#') && (
           <div 
            className="absolute right-2 w-3.5 h-3.5 rounded-full border border-white/10" 
            style={{ backgroundColor: value }}
          />
        )}
      </div>
    );
  }

  if (config.type === "number") {
    return (
      <input
        id={key}
        type="number"
        value={value}
        onChange={(e) => onChange(key, Number(e.target.value))}
        className={baseStyles}
      />
    );
  }

  return null;
}