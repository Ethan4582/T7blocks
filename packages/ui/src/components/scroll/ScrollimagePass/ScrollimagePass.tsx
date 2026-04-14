'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// Font is handled via fontClassName prop to avoid build errors in bundled systems


gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { url: 'https://pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev/good_one/good_assets/ferrari.png',    x: '0%',   y: '10%',   size: '360px' },
  { url: 'https://pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev/good_one/good_assets/art2.png',       x: '35%',  y: '25%',   size: '360px' },
  { url: 'https://pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev/good_one/good_assets/side_model.png', x: '-32%', y: '105%',  size: '360px' },
  { url: 'https://pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev/good_one/good_assets/model5.png',     x: '18%',  y: '-40%',  size: '360px' },
  { url: 'https://pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev/good_one/good_assets/model6.png',     x: '-20%', y: '45%',   size: '360px' },
  { url: 'https://pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev/good_one/good_assets/wallart.png',    x: '21%',  y: '-15%',  size: '360px' },
];

const STAGGER_TIME = 0.6;

interface ScrollimagePassProps {
  passDuration?: number;
  fontClassName?: string;
}


export function ScrollimagePass({ 
  passDuration = 2.5,
  fontClassName = "" 
}: ScrollimagePassProps) {
  const sectionRef        = useRef<HTMLDivElement>(null);
  const titleRef          = useRef<HTMLHeadingElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs         = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentWrapperRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2500',
        pin: true,
        scrub: 1.2,
      },
    });

    gsap.set(titleRef.current, { opacity: 1, scale: 1, y: 0 });

    // Pass all images except the last one straight through
    imageRefs.current.forEach((img, index) => {
      if (!img || index === IMAGES.length - 1) return;

      tl.fromTo(
        img,
        { y: '120vh' },
        { y: '-120vh', duration: passDuration, ease: 'none' },
        index * STAGGER_TIME
      );
    });

    // Last image: enter to center, then drive the exit transition
    const lastIndex   = IMAGES.length - 1;
    const lastImg     = imageRefs.current[lastIndex];
    const lastStart   = lastIndex * STAGGER_TIME;

    if (lastImg) {
      tl.fromTo(
        lastImg,
        { y: '120vh' },
        { y: '0vh', duration: passDuration / 2, ease: 'none' },
        lastStart
      );

      tl.to(
        contentWrapperRef.current,
        { y: '-120vh', duration: passDuration / 2, ease: 'none' },
        '+=0'
      );
    }

    // Scale title in sync with the full timeline
    tl.to(
      titleRef.current,
      { scale: 8 / 14, duration: tl.duration(), ease: 'none' },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [passDuration]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const el = imageRefs.current[index];
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width  / 2) * 0.1;
    const y = (e.clientY - top  - height / 2) * 0.1;

    gsap.to(el.querySelector('img'), { x, y, duration: 0.6, ease: 'power2.out' });
  };

  const handleMouseLeave = (index: number) => {
    const el = imageRefs.current[index];
    if (!el) return;

    gsap.to(el.querySelector('img'), { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
  };

  return (
    <div className="relative bg-white selection:bg-black selection:text-white">

      {/* Hero card */}
      <div className="h-screen w-full flex flex-col items-center justify-center relative z-[60] bg-white overflow-hidden">
        <h1
          className={`text-[8vw] font-normal tracking-tighter text-black select-none leading-none text-center px-10 ${fontClassName}`}

        >
          Scroll &bull; Explore
        </h1>
      </div>

      {/* Pinned scroll section */}
      <div ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-white">
        <div ref={contentWrapperRef} className="absolute inset-0 w-full h-full">

          <div className="relative w-full h-full flex items-center justify-center">
            <h2
              ref={titleRef}
              className={`text-[14vw] font-normal tracking-tighter text-black select-none z-10 leading-none ${fontClassName}`}

            >
              Works
            </h2>

            <div className="absolute inset-0 z-20 pointer-events-none w-full h-full">
              {IMAGES.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => { imageRefs.current[i] = el; }}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  className="absolute pointer-events-auto group cursor-pointer overflow-hidden rounded-sm z-30 transition-shadow duration-500 hover:shadow-2xl"
                  style={{
                    left:        `calc(50% + ${item.x})`,
                    top:         '0',
                    width:       item.size,
                    height:      'auto',
                    aspectRatio: '3/4',
                    transform:   'translate(-50%, 0)',
                  }}
                >
                  <img
                    src={item.url}
                    alt={`Work ${i + 1}`}
                    className="w-full h-full object-cover scale-[1.1]"
                  />

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white text-[9px] uppercase tracking-[0.4em] font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer — reveals as content slides up */}
          <div className="absolute top-full left-0 w-full h-full flex flex-col items-center justify-center bg-white">
            <p
              className={`text-[8vw] font-normal tracking-tighter text-black/90 select-none leading-none text-center px-10 ${fontClassName}`}

            >
              Animation End
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}