"use client";

import React, { useState } from "react";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics/analytics";
import { FAQ_DATA } from "@/lib/waitlist/faqData";
import Image from "next/image";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left backdrop-blur-[6px] bg-white/5 border border-white/10 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-white/10 group"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="font-medium text-white text-[15px] leading-none truncate pr-4">
            {question}
          </p>
          <div className="relative w-2.5 h-2.5 shrink-0">
            <div className={`absolute w-3 h-[1.2px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            <div className={`absolute w-[1.2px] h-3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
          </div>
        </div>
        {isOpen && (
          <div className="mt-3 text-white/60 text-sm leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
            {answer}
          </div>
        )}
      </button>
    </div>
  );
}

export default function WaitlistingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitted(true);
    trackEvent(ANALYTICS_EVENTS.WAITLIST_JOINED, { email });

    try {
      const baseUrl = process.env.NEXT_PUBLIC_WAITLIST_URL;
      await fetch(`${baseUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error("Waitlist submission failed:", error);
    }
  };

  return (
    <div className="text-white text-[16px] leading-[normal] w-full font-sans">
      <div className="bg-[#151518] text-[12px] min-h-screen">
        <div className="content-center items-center flex flex-col h-min justify-start overflow-hidden relative bg-[#151518] gap-[0px] min-h-[900px]">

          {/* Background Gradients */}
          <div
            aria-label="Blur 1"
            className="absolute w-[31%] left-[-80px] top-[-80px] aspect-[0.824324_/_1] blur-[100px] -rotate-45 z-[0] shrink-[0] opacity-[0.9] pointer-events-none"
          >
            <div className="overflow-hidden absolute w-full left-0 top-0 aspect-[0.831818_/_1] bg-[rgb(255,_139,_33)] blur-[100px] rounded-[100%]"></div>
            <div className="aspect-square overflow-hidden absolute w-[60%] left-[50%] top-0 bg-white translate-x-[-50%] rounded-[100%]"></div>
          </div>

          <div
            aria-label="Blur 2"
            className="absolute w-[31%] top-[-80px] right-[-80px] aspect-[0.824324_/_1] blur-[100px] rotate-45 z-[0] shrink-[0] opacity-[0.9] pointer-events-none"
          >
            <div className="overflow-hidden absolute w-full left-0 top-0 aspect-[0.831818_/_1] bg-[rgb(255,_139,_33)] blur-[100px] rounded-[100%]"></div>
            <div className="aspect-square overflow-hidden absolute w-[60%] left-[50%] top-0 bg-white translate-x-[-50%] rounded-[100%]"></div>
          </div>

         
          <header className="relative z-10 flex justify-center -mb-8 mt-8">
            <div className="w-[160px] h-[104px]">
              <Image
                src="/wait.png"
                alt="T7 Block Logo"
                width={160}
                height={104}
                className="w-full h-full object-contain"
              />
            </div>
          </header>

        
          <main className="content-center items-center flex flex-col h-min justify-center overflow-hidden relative w-full gap-[10px] max-w-[600px] pt-4 pr-10 pb-10 pl-10 z-[1] shrink-[0] text-center">
            <div className="flex flex-col justify-start relative whitespace-pre-wrap  pb-2 w-full">
              <h1 className="font-bold text-center text-white text-[48px] tracking-[-1.44px] leading-[50px] font-serif">
                 Join the T7Blocks <br/> Waitlist Today
              </h1>
            </div>
            <div className="flex flex-col justify-start relative whitespace-pre-wrap w-full max-w-[480px] shrink-[0]">
              <p className="text-center text-white/80 text-[16px] leading-[24px] font-sans line-clamp-3">
               Get early access to premium components built to the standard of top agency work and your first few are on us.
              </p>
            </div>

            <div className="relative w-full shrink-[0] mt-4">
              <div className="items-center flex size-full justify-center relative">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex relative w-full text-[rgb(21,_21,_24)] gap-[0px]">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block overflow-clip w-full bg-white/4 shadow-[rgb(255,139,33)_0px_0px_0px_0px_inset,_rgba(255,255,255,0.08)_0px_0px_0px_1px_inset] text-white text-[16px] leading-[16px] pt-4 pr-[164px] pb-4 pl-6 rounded-xl outline-none focus:shadow-[rgb(255,139,33)_0px_0px_0px_1px_inset,_rgba(255,255,255,0.08)_0px_0px_0px_1px_inset]"
                    />
                    <div className="absolute top-[5px] right-[5px] bottom-[5px]">
                      <button
                        type="submit"
                        className="inline-block font-bold h-full overflow-clip text-center whitespace-pre w-[140px] bg-[rgb(255,_139,_33)] text-[16px] tracking-[-0.48px] leading-[16px] z-[1] rounded-[0.4375rem] hover:brightness-110 active:scale-95 transition-all"
                      >
                        Get Notified
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-4 px-6 bg-[rgb(255,_139,_33)]/10 border border-[rgb(255,_139,_33)]/20 rounded-xl text-[rgb(255,_139,_33)] font-semibold animate-in fade-in zoom-in duration-300 w-full">
                    ✨ You&apos;re on the list!
                  </div>
                )}
              </div>
            </div>
          </main>

          <section className="content-center items-center flex flex-col h-min justify-center overflow-hidden relative w-full gap-[12px] max-w-[600px] pt-4 pr-10 pb-32 pl-10 z-[1] shrink-[0]">
            <div className="flex flex-col justify-start relative whitespace-pre-wrap w-full max-w-[480px] shrink-[0]">
              <p className="italic text-center text-white text-[20px] leading-[30px] font-serif">
                Frequently Asked Questions
              </p>
            </div>

            <div className="relative w-full z-[2]">
              <div className="content-start items-start flex flex-col h-min justify-start relative w-full gap-[8px]">
                {FAQ_DATA.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
