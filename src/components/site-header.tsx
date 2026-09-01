"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#layanan", label: "Layanan" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#kontak", label: "Kontak" },
];

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const solidRef = useRef(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const next = y > 60;
      if (next !== solidRef.current) {
        solidRef.current = next;
        setSolid(next);
      }

      // Progress bar tracks scroll through the pinned hero section.
      const hero = document.getElementById("hero");
      let p = 0;
      if (hero) {
        const r = hero.getBoundingClientRect();
        const span = hero.offsetHeight - window.innerHeight;
        p = span > 0 ? clamp(-r.top / span) : 0;
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[60] flex h-[68px] items-center border-b backdrop-blur-[6px] transition-[background-color,border-color] duration-300 ease-[var(--ease-standard)] md:h-[84px]"
      style={{
        background: solid ? "var(--operational-white)" : "rgba(5,5,5,.30)",
        borderColor: solid ? "var(--silver-300)" : "rgba(255,255,255,.14)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center gap-3 px-4 sm:gap-6 sm:px-6 md:gap-12 md:px-10">
        <a
          href="#hero"
          aria-label="PT Penjaga Utama Indonesia"
          className="relative block h-[30px] min-w-0 flex-1 sm:flex-none md:h-[38px]"
        >
          <Image
            src="/assets/logo-penjaga-no-label.svg"
            alt="PT Penjaga Utama Indonesia"
            width={706}
            height={159}
            className="block h-[30px] w-auto max-w-full transition-[filter] duration-300 md:h-[38px]"
            style={{ filter: solid ? "none" : "brightness(0) invert(1)" }}
          />
        </a>

        <nav className="ml-auto hidden items-center gap-[34px] lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative block whitespace-nowrap py-1.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] no-underline transition-colors duration-300 hover:text-penjaga"
              style={{ color: solid ? "var(--obsidian-black)" : "#ffffff" }}
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-penjaga transition-transform duration-300 ease-[var(--ease-standard)] group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href="#kontak"
          className="ml-auto inline-flex h-10 flex-none items-center rounded-[2px] bg-penjaga px-4 text-[10px] font-semibold uppercase tracking-[0.08em] text-white no-underline transition-[background-color,transform] duration-150 hover:bg-command active:scale-[0.985] active:bg-[#8e0e14] sm:h-[44px] sm:px-[26px] sm:text-[12.5px] sm:tracking-[0.14em] lg:ml-0"
        >
          <span className="sm:hidden">Konsultasi</span>
          <span className="hidden sm:inline">Konsultasikan Kebutuhan</span>
        </a>
      </div>

      <div
        ref={progressRef}
        className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-penjaga"
      />
    </header>
  );
}
