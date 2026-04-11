import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Product: [
    { name: "Animations", href: "/gallery" },
    { name: "Scroll Effects", href: "/gallery" },
    { name: "UI Elements", href: "/gallery" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "Gallery", href: "/gallery" },
    { name: "Customize Blocks", href: "https://demo.t7blocks.xyz/" },
  ],
  Company: [
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "License", href: "#" },
  ],
  Support: [
    { name: "Contact Us", href: "#" },
    { name: "Contribute", href: "https://github.com/Ethan4582/t7block" },
    { name: "FAQs", href: "#" },
  ],
};

function MarqueeStrip() {
  const text = "Build. Preview. Deploy. ";
  const repeated = text.repeat(12);

  return (
    <div className="overflow-hidden py-14 md:py-20 relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#151313] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#151313] to-transparent pointer-events-none" />

      <div className="animate-marquee">
        <span
          className="text-[clamp(48px,8vw,96px)] font-normal text-white/[0.06] select-none whitespace-nowrap pr-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {repeated}
        </span>
        <span
          className="text-[clamp(48px,8vw,96px)] font-normal text-white/[0.06] select-none whitespace-nowrap pr-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative">
      {/* Gradient background for the entire footer area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(21,19,19,0.4) 20%, #151313 45%)",
        }}
      />

      {/* Marquee — sits above the card */}
      <div className="relative z-10">
        <MarqueeStrip />
      </div>

      {/* Footer card with rounded top */}
      <div className="relative z-10 bg-[#1a1818] rounded-t-[2rem] md:rounded-t-[3rem]">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-8 pt-14 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-4 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/logo.png"
                  alt="T7block logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-lg font-semibold tracking-tight text-white">
                  T7block
                </span>
              </div>
              <p className="type-body-xs text-[#9a9a9a] max-w-[280px] leading-relaxed">
                Copy-paste UI components that just work — responsive, animated,
                and beautifully styled.
              </p>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href="https://github.com/Ethan4582/t7block"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-md bg-white/[0.06] flex items-center justify-center text-[#9a9a9a] hover:text-white hover:bg-white/[0.1] transition-colors"
                >
                  <Image
                    src="/SVG/Twitter-X--Streamline-Bootstrap.svg"
                    alt="X (Twitter)"
                    width={13}
                    height={13}
                    className="invert"
                  />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-md bg-white/[0.06] flex items-center justify-center text-[#9a9a9a] hover:text-white hover:bg-white/[0.1] transition-colors"
                >
                  <Image
                    src="/SVG/insta.svg"
                    alt="Instagram"
                    width={15}
                    height={15}
                    className="invert"
                  />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-md bg-white/[0.06] flex items-center justify-center text-[#9a9a9a] hover:text-white hover:bg-white/[0.1] transition-colors"
                >
                  <Image
                    src="/SVG/linkedin-app-icon.svg"
                    alt="LinkedIn"
                    width={15}
                    height={15}
                    className="rounded-sm"
                  />
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div
                key={category}
                className="col-span-1 md:col-span-2 flex flex-col gap-4"
              >
                <h4 className="text-sm font-semibold text-white">
                  {category}
                </h4>
                <nav className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-sm text-[#9a9a9a] hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#9a9a9a]">
              © {new Date().getFullYear()}{" "}
              <span className="text-accent font-semibold">T7block</span>. All
              rights reserved.
            </p>
            <p className="text-xs text-[#9a9a9a]">
              Building in public at{" "}
              <a
                href="https://github.com/Ethan4582/t7block"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline font-semibold"
              >
                t7labs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
