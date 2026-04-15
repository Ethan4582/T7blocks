export const installCommand = `pnpm add @t7blocks/ui gsap`;


export const componentCode =`'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { url: 'https://picsum.photos/id/1069/900/1200',    x: '0%',   size: '360px' },
  { url: 'https://picsum.photos/id/1071/900/1200',       x: '35%',  size: '360px' },
  { url: 'https://picsum.photos/id/1076/900/1200', x: '-32%', size: '360px' },
  { url: 'https://picsum.photos/id/1079/900/1200',     x: '18%',  size: '360px' },
  { url: 'https://picsum.photos/id/1068/900/1200',     x: '-20%', size: '360px' },
  { url: 'https://picsum.photos/id/1067/900/1200',    x: '21%',  size: '360px' },
];

const STAGGER_TIME = 0.6;
const CARD_SCROLL_PX = 600;

interface ScrollimagePassProps {
  passDuration?: number;
  fontClassName?: string;
}

export function ScrollimagePass({
  passDuration = 2.5,
  fontClassName = instrumentSerif.className,
}: ScrollimagePassProps) {
  const sectionRef        = useRef<HTMLDivElement>(null);
  const titleRef          = useRef<HTMLHeadingElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs         = useRef<(HTMLDivElement | null)[]>([]);

  const mobileWrapRef  = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(max-width: 768px)', () => {
      setIsMobile(true);
      return () => setIsMobile(false);
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentWrapperRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2500',
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(titleRef.current, { opacity: 1, scale: 1, y: 0 });

      imageRefs.current.forEach((img, index) => {
        if (!img || index === IMAGES.length - 1) return;
        tl.fromTo(
          img,
          { y: '120vh' },
          { y: '-120vh', duration: passDuration, ease: 'none' },
          index * STAGGER_TIME
        );
      });

      const lastIndex = IMAGES.length - 1;
      const lastImg   = imageRefs.current[lastIndex];
      const lastStart = lastIndex * STAGGER_TIME;

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

      tl.to(
        titleRef.current,
        { scale: 8 / 14, duration: tl.duration(), ease: 'none' },
        0
      );
    });

    return () => mm.revert();
  }, [passDuration]);

  useEffect(() => {
    if (!mobileWrapRef.current) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 768px)', () => {
      const cards = mobileCardRefs.current.filter(Boolean) as HTMLDivElement[];
      const totalDuration = CARD_SCROLL_PX * (cards.length + 1);

      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;

        if (!isLast) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
           end: () => \`+=\${totalDuration}\`,
            pin: true,
            pinSpacing: false,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          gsap.fromTo(
            card.querySelector('.mobile-card-inner'),
            { scale: 1, borderRadius: '12px' },
            {
              scale: 0.88,
              borderRadius: '22px',
              ease: 'none',
              scrollTrigger: {
                trigger: cards[index + 1],
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, [isMobile]);

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
      <div className="h-screen w-full flex flex-col items-center justify-center relative z-[60] bg-white overflow-hidden">
        <h1 className={\`text-[8vw] font-normal tracking-tighter text-black select-none leading-none text-center px-10 $\{fontClassName}\`}>
          Scroll &bull; Explore
        </h1>
      </div>

      <div
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-white hidden md:block"
      >
        <div ref={contentWrapperRef} className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full flex items-center justify-center">
            <h2
              ref={titleRef}
              className={\`text-[14vw] font-normal tracking-tighter text-black select-none z-10 leading-none $\{fontClassName}\`}
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
                    left:        \`calc(50% + $\{item.x})\`,
                    top:         '0',
                    width:       item.size,
                    height:      'auto',
                    aspectRatio: '3/4',
                    transform:   'translate(-50%, 0)',
                  }}
                >
                  <img
                    src={item.url}
                    alt={\`Work $\{i + 1}\`}
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

          <div className="absolute top-full left-0 w-full h-full flex flex-col items-center justify-center bg-white">
            <p className={\`text-[8vw] font-normal tracking-tighter text-black/90 select-none leading-none text-center px-10 $\{fontClassName}\`}>
              Animation End
            </p>
          </div>
        </div>
      </div>

      <div
        ref={mobileWrapRef}
        className="block md:hidden w-full bg-white"
      >
        <div
          className="flex items-center justify-center bg-white"
          style={{ height: '30vw' }}
        >
          <h2 className={\`text-[18vw] font-normal tracking-tighter text-black select-none leading-none $\{fontClassName}\`}>
            Works
          </h2>
        </div>

        {IMAGES.map((item, i) => (
          <div
            key={i}
            ref={(el) => { mobileCardRefs.current[i] = el; }}
            className="relative w-full flex items-center justify-center"
            style={{
              height: '100svh',
              zIndex: 10 + i,
            }}
          >
            <div
              className="mobile-card-inner relative overflow-hidden shadow-xl"
              style={{
                width:        '82vw',
                aspectRatio:  '3/4',
                borderRadius: '12px',
                willChange:   'transform',
              }}
            >
              <img
                src={item.url}
                alt={\`Work $\{i + 1}\`}
                className="w-full h-full object-cover"
                style={{ display: 'block' }}
              />

              <div className="absolute bottom-5 left-5">
                <span
                  className={\`text-white/70 uppercase tracking-[0.3em] $\{fontClassName}\`}
                  style={{ fontSize: '10px', letterSpacing: '0.25em' }}
                >
                  {String(i + 1).padStart(2, '0')} / {String(IMAGES.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center h-svh bg-white relative z-[100]">
          <p className={\`text-[12vw] font-normal tracking-tighter text-black/90 select-none leading-none text-center px-10 $\{fontClassName}\`}>
            Animation End
          </p>
        </div>
      </div>
    </div>
  );
}
`
export const propsTable = [
  {
    name: "passDuration",
    type: "number",
    default: "2.5",
    description: "Duration of the image pass animation",
  },
  {
    name: "fontClassName",
    type: "string",
    default: "Instrument_Serif  ",
    description: "Custom font class name",
  },
];

export const codeBlock = componentCode;

