"use client";

import { Lock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/analytics";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-accent/20 border border-border flex items-center justify-center mb-8 rotate-3 shadow-xl">
        <Lock className="w-8 h-8 text-accent-foreground" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl px-4">
        Unlock the Full Vault of Premium UI Components
      </h1>
      
      <p className="text-muted-foreground text-lg mb-12 max-w-[500px]">
        Get all-access to my private collection of high-performance React blocks. Join the waitlist for early access.
      </p>

      {!submitted ? (
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            setSubmitted(true); 
            trackEvent(ANALYTICS_EVENTS.WAITLIST_JOINED, { email });
          }}
          className="w-full max-w-md flex flex-col md:flex-row gap-3 bg-muted/20 p-2 rounded-2xl border border-border/40 mb-16"
        >
          <input 
            type="email" 
            required 
            placeholder="enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 focus:outline-none placeholder:text-muted-foreground/30 text-sm font-medium"
          />
          <button 
            type="submit"
            className="group px-6 py-3 bg-foreground text-background rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
          >
            <span>Secure My Spot</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      ) : (
        <div className="mb-16 py-4 px-8 bg-accent/10 border border-accent/20 rounded-2xl text-accent-foreground font-semibold flex items-center gap-3 animate-in fade-in zoom-in duration-500">
           ✨ You&apos;re on the list! We&apos;ll notify you soon.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
           {["200+ Blocks", "Framer Motion", "GSAP Ready", "Lifetime Access"].map((item) => (
             <span key={item} className="text-xs font-mono uppercase tracking-[0.2em]">{item}</span>
           ))}
      </div>
    </div>
  );
}