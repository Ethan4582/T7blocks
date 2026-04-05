"use client";

import "./Navbar.css";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────
   Inline SVGs for social icons
───────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-3a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L2.25 2.25h6.98l4.259 5.473L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

/* ─────────────────────────────────────────
   Marquee ticker content
───────────────────────────────────────── */
const TICKER_ITEMS = [
  "NEW: PAGE TRANSITION COURSE",
  "NEW: PAGE TRANSITION COURSE",
  "NEW: PAGE TRANSITION COURSE",
  "NEW: PAGE TRANSITION COURSE",
  "NEW: PAGE TRANSITION COURSE",
  "NEW: PAGE TRANSITION COURSE",
];

/* ─────────────────────────────────────────
   Navigation data
───────────────────────────────────────── */
const PRODUCTS = [
  { label: "The Vault", badge: null },
  { label: "Page Transition Course", badge: "NEW" },
  { label: "Icon Library", badge: null },
  { label: "Community", badge: null },
  { label: "Easings", badge: "NTP", isBottom: true },
];

const EXPLORE = [
  { label: "T7Block Showcase", superscript: null },
  { label: "Collection", superscript: "156" },
  { label: "Pricing", superscript: null },
];

/* ─────────────────────────────────────────
   Navbar Component
───────────────────────────────────────── */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* ── Backdrop ─────────────────────────── */}
      <div
        className={`t7-nav-backdrop ${menuOpen ? "t7-nav-backdrop--visible" : ""}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Main wrapper ─────────────────────── */}
      <header className="t7-nav-wrapper" ref={menuRef}>
        {/* ── Top bar ─────────────────────────── */}
        <nav className="t7-nav-bar" aria-label="Main navigation">
          {/* Left: hamburger + label */}
          <button
            id="t7-menu-toggle"
            className="t7-nav-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="t7-nav-panel"
          >
            <span className="t7-nav-menu-icon" aria-hidden="true">
              {menuOpen ? (
                /* X */
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                /* Hamburger */
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <line x1="3" y1="6.5" x2="17" y2="6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="3" y1="13.5" x2="17" y2="13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span className="t7-nav-menu-label">Menu</span>
          </button>

          {/* Center: logo asterisk */}
          <Link href="/" className="t7-nav-logo" aria-label="T7Block Home">
            <span className="t7-nav-logo-icon">✦</span>
            <span className="t7-nav-logo-text">T7BLOCK</span>
          </Link>

          {/* Right: CTA buttons */}
          <div className="t7-nav-actions">
            <button className="t7-nav-btn-login">
              Login
            </button>
            <button className="t7-nav-btn-join">
              Join
            </button>
          </div>
        </nav>

        {/* ── Expanded mega-menu panel ─────────── */}
        <div
          id="t7-nav-panel"
          className={`t7-nav-panel ${menuOpen ? "t7-nav-panel--open" : ""}`}
          aria-hidden={!menuOpen}
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="t7-nav-panel-inner">
            {/* Column 1 – Products */}
            <div className="t7-nav-col t7-nav-col--products">
              <p className="t7-nav-col-label">OUR BLOCKS</p>
              <ul className="t7-nav-col-list">
                {PRODUCTS.filter((p) => !p.isBottom).map((item, i) => (
                  <li key={i} className="t7-nav-col-item">
                    <a href="#" className="t7-nav-col-link">
                      {item.label}
                      {item.badge && (
                        <span
                          className={`t7-nav-badge ${
                            item.badge === "NEW"
                              ? "t7-nav-badge--new"
                              : "t7-nav-badge--ntp"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
              {/* Bottom pinned items */}
              <div className="t7-nav-col-bottom">
                {PRODUCTS.filter((p) => p.isBottom).map((item, i) => (
                  <a key={i} href="#" className="t7-nav-col-link">
                    {item.label}
                    {item.badge && (
                      <span className="t7-nav-badge t7-nav-badge--ntp">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="t7-nav-divider" aria-hidden="true" />

            {/* Column 2 – Explore */}
            <div className="t7-nav-col t7-nav-col--explore">
              <p className="t7-nav-col-label">EXPLORE</p>
              <ul className="t7-nav-col-list">
                {EXPLORE.map((item, i) => (
                  <li key={i} className="t7-nav-col-item">
                    <a href="#" className="t7-nav-col-link">
                      {item.label}
                      {item.superscript && (
                        <sup className="t7-nav-sup">{item.superscript}</sup>
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social icons */}
              <div className="t7-nav-social">
                <a href="#" className="t7-nav-social-btn" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="#" className="t7-nav-social-btn" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="t7-nav-social-btn" aria-label="X (Twitter)">
                  <XIcon />
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="t7-nav-divider" aria-hidden="true" />

            {/* Column 3 – Featured */}
            <div className="t7-nav-col t7-nav-col--featured">
              <div className="t7-nav-featured-card">
                <div className="t7-nav-featured-meta">
                  <span className="t7-nav-featured-avail">AVAILABLE</span>
                  <span className="t7-nav-badge t7-nav-badge--today">TODAY</span>
                </div>
                <h3 className="t7-nav-featured-title">
                  Scroll Transition<br />Components
                </h3>
                <div className="t7-nav-featured-img-wrap">
                  <div className="t7-nav-featured-img-bg">
                    <Image
                      src="/assets/logo.png"
                      alt="Featured component"
                      width={120}
                      height={80}
                      className="t7-nav-featured-img"
                    />
                  </div>
                </div>
                <a href="/gallery" className="t7-nav-featured-btn">
                  View Gallery
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Marquee ticker ───────────────────── */}
        <div className="t7-nav-ticker" aria-label="Announcements">
          <div className="t7-nav-ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((text, i) => (
              <span key={i} className="t7-nav-ticker-item">
                {text}
                <span className="t7-nav-ticker-sep" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Spacer so content doesn't hide behind navbar ── */}
      <div className="t7-nav-spacer" aria-hidden="true" />
    </>
  );
}
