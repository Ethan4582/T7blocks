'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './PopHero.css';

export const PopHero = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const imageWrapperRef = useRef<HTMLDivElement>(null);
   const navbarRef = useRef<HTMLElement>(null);
   const centerTextRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!imageWrapperRef.current || !navbarRef.current || !centerTextRef.current) return;

      const mm = gsap.matchMedia();

      mm.add({
         isMobile: "(max-width: 768px)",
         isDesktop: "(min-width: 769px)"
      }, (context) => {
         const { isMobile } = context.conditions as any;

         // Initial states
         gsap.set(imageWrapperRef.current, {
            y: '100vh',
            rotation: isMobile ? 8 : 15,
            scale: isMobile ? 0.7 : 0.5,
            opacity: 0,
            width: isMobile ? '85vw' : '60vw',
            height: isMobile ? '65vh' : '75vh',
            borderRadius: isMobile ? '1.5rem' : '2rem',
            transformOrigin: 'center center',
         });

         gsap.set(centerTextRef.current, {
            opacity: 0,
            y: 20
         });

         gsap.fromTo(navbarRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
         );

         // Create the cinematic entry timeline
         const tl = gsap.timeline({
            defaults: { ease: 'power2.out' }
         });

         // 1. Entry Phase (Bottom to Center)
         tl.to(imageWrapperRef.current, {
            y: '0%',
            scale: isMobile ? 0.85 : 0.7,
            opacity: 1,
            duration: 1.2,
         })
            // 2. Center Trigger Phase (Expand to full screen)
            .to(imageWrapperRef.current, {
               rotation: 0,
               scale: 1,
               width: '100vw',
               height: '100vh',
               borderRadius: '0px',
               duration: 1.4,
               ease: 'expo.out',
            }, '-=0.1')
            // 3. Post-Animation: Reveal Text
            .to(centerTextRef.current, {
               opacity: 1,
               y: 0,
               duration: 1.5,
               ease: 'power3.out'
            }, '-=0.5');
      });

      return () => mm.revert();
   }, []);

   return (
      <main
         ref={containerRef}
         className="pop-hero-main relative min-h-screen bg-black text-white overflow-hidden selection:bg-[#EBDCCB] selection:text-black"
      >

         {/* Premium Transparent Navbar */}
         <nav
            ref={navbarRef}
            className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:p-10 flex justify-between items-center pointer-events-auto"
         >
            <div className="text-base md:text-2xl font-normal tracking-tighter uppercase opacity-90 drop-shadow-sm">Waves.studios</div>
            <div className="flex gap-4 md:gap-16 text-[10px] md:text-[11px] uppercase tracking-widest md:tracking-[0.4em] font-normal opacity-70">
               <a href="#" className="hover:opacity-100 transition-opacity">Work</a>
               <a href="#" className="hover:opacity-100 transition-opacity">About</a>
               <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
            </div>
         </nav>

         {/* Hero Animation Container */}
         <div className="relative h-screen w-full flex items-center justify-center">
            <div
               ref={imageWrapperRef}
               className="relative overflow-hidden shadow-2xl z-10 will-change-transform"
            >
               <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
               />

               {/* Overlays removed for brightness as per user request */}

               {/* Centered Nature Text */}
               <div
                  ref={centerTextRef}
                  className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6 -translate-y-6 md:-translate-y-12"
               >
                  <h1 className="text-4xl md:text-[9rem] tracking-tight text-[#fdfcfb] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-[1.1] md:leading-[0.9] text-center">
                     Nature&apos;s <span className="italic block mt-0 md:mt-[-0.1em] opacity-90">Quiet Pulse</span>
                  </h1>
               </div>
            </div>
         </div>

         {/* Background Decorative Layer */}
         <div className="absolute inset-0 pointer-events-none -z-10 text-white/5 flex items-center justify-center text-[20vw] font-bold opacity-10 blur-3xl">
            WAVES
         </div>
      </main>
   );
}

export default PopHero;
