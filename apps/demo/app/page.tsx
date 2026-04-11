import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-white font-sans">
      <div className="absolute inset-0 z-0 hero-bg-surface" />
      <div className="absolute inset-0 z-10 bg-black/40" />
      
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <div className="mb-8 flex items-center gap-1">
           <div className="relative h-18 w-18 overflow-hidden shadow-2xl">
              <Image
                src="/assets/logo.png"
                alt="T7 Labs Logo"
                fill
                className="object-contain rounded-xl"
              />
           </div>
           <h2 className="text-6xl font-normal tracking-tight font-serif leading-none sm:text-7xl">
              Blocks
           </h2>
        </div>

        <div className="mb-10 flex flex-col items-center">
            <h1 className="max-w-4xl text-5xl font-normal leading-[1.1] tracking-tight sm:text-7xl font-serif text-white/90">
                Premium components,
            </h1>
            <h1 className="text-5xl font-normal leading-[1.1] tracking-tight sm:text-7xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] via-[#acf048] to-[#4ade80] drop-shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                ready to ship.
            </h1>
        </div>

        <p className="mb-12 max-w-xl text-sm leading-relaxed font-mono text-[#8BA7C9] sm:text-base opacity-80 uppercase tracking-wide">
           A curated collection of handcrafted, high-performance UI components and interactive demos.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/gallery"
            className="rounded-xl bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:bg-white/90 hover:scale-105 active:scale-95 shadow-xl"
          >
            Explore Gallery
          </Link>
          <a
            href="https://github.com/Ethan4582/T7blocks"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-48 bg-gradient-to-t from-black/80 to-transparent" />
    </main>
  );
}
