'use client';

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { components, ComponentData } from "@/lib/gallery";

const TAGS = [
  "RECENT",
  "button",
  "gsap",
  "three.js",
  "misc",
  "page reveal",
];

function GalleryCard({ component }: { component: ComponentData }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideoByDefault = !component.image;

  useEffect(() => {
    if (!videoRef.current) return;

    if (showVideoByDefault || isHovered) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, showVideoByDefault]);

  return (
    <Link
      href={`/components/${component.category}/${component.id}`}
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[1.6/1] overflow-hidden rounded-xl bg-white/5 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-blue-500/10 border border-white/10">
        {component.image && (
          <Image
            src={component.image}
            alt={component.name}
            fill
            className={`object-cover transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"
              }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {component.video && (
          <video
            ref={videoRef}
            src={component.video}
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${showVideoByDefault || isHovered ? "opacity-100" : "opacity-0"
              }`}
          />
        )}
      </div>

      <div className="mt-6 flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
            {component.name}
          </h2>
          <span className="shrink-0 rounded-md bg-white/5 border border-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/40 backdrop-blur-md group-hover:border-blue-500/30 group-hover:text-blue-300 transition-all">
            {component.category}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/50 group-hover:text-white/70 transition-colors">
          {component.shortDescription}
        </p>
      </div>
    </Link>
  );
}

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState("RECENT");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = components.filter(c => {
    const matchesTag = activeTag === "RECENT" ||
      c.category.toLowerCase() === activeTag.toLowerCase() ||
      c.tags.some(t => t.toLowerCase() === activeTag.toLowerCase());

    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen hero-bg-surface bg-fixed">
      <div className="min-h-screen bg-black/40 backdrop-blur-[2px]">
        <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-12 sm:py-20">
          <div className="mb-12 flex items-center">
            <div className="flex flex-col">
              <h1 className="text-5xl font-normal tracking-tight text-white/90 sm:text-7xl font-serif">
                All components
              </h1>
            </div>
          </div>

          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide lg:pb-0">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`shrink-0 rounded-md border px-5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${activeTag === tag
                    ? "bg-white border-white text-black shadow-lg"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/30 hover:bg-white/10 hover:text-white backdrop-blur-md"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tags or components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-md"
              />
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {filteredComponents.length > 0 ? (
              filteredComponents.map((component) => (
                <GalleryCard key={component.id} component={component} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center">
                <p className="text-white/30 italic text-lg">No components matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
