import Image from "next/image";

import { Container } from "@/components/kit";

const NAV: { href: string; label: string }[] = [
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#security", label: "Security Services" },
  { href: "#valet", label: "Valet Parking" },
  { href: "#smart", label: "Smart Security" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#kontak", label: "Kontak" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.1] bg-obsidian pt-[64px] pb-8 md:pt-[88px]">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[5fr_3fr_4fr] md:gap-12">
          {/* brand */}
          <div>
            <div className="relative w-[230px] sm:w-[270px]">
              <Image
                src="/assets/logo-penjaga-no-label.svg"
                alt="PT Penjaga Utama Indonesia"
                width={706}
                height={159}
                className="block h-auto w-full"
              />
              <Image
                src="/assets/logo-penjaga-no-label.svg"
                alt=""
                width={706}
                height={159}
                aria-hidden
                className="pointer-events-none absolute inset-0 block h-auto w-full brightness-0 invert"
                style={{ clipPath: "inset(0 0 0 22%)" }}
              />
            </div>
            <p className="mt-5 max-w-[320px] text-[14.5px] leading-[1.6] text-white/55">
              Layanan keamanan dan valet parking profesional untuk gedung,
              perusahaan, properti, hospitality, dan acara.
            </p>
            <span className="mt-6 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              <span className="h-[3px] w-4 bg-penjaga" />
              Security &amp; Valet Services
            </span>
          </div>

          {/* nav */}
          <nav className="flex flex-col gap-3">
            <span className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">
              Navigasi
            </span>
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="w-fit text-[14.5px] text-white/70 no-underline transition-colors hover:text-penjaga"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* partner contact */}
          <div>
            <span className="mb-3 block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">
              Kontak Partner
            </span>
            <address className="not-italic text-[14.5px] leading-[1.7] text-white/65">
              Jl. Suryo Pranoto, Harmoni Plaza II Blok I No.5, Petojo Utara,
              Jakarta Pusat 10130
              <br />
              <a href="tel:+62216327390" className="text-white/80 no-underline transition-colors hover:text-penjaga">
                +62 21 632 7390
              </a>
              <br />
              <a href="mailto:info@penjagaindonesia.com" className="text-white/80 no-underline transition-colors hover:text-penjaga">
                info@penjagaindonesia.com
              </a>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.1] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
            © 2026 PT. Penjaga Utama Indonesia. All Rights Reserved.
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/30">
            Jakarta, Indonesia
          </span>
        </div>
      </Container>
    </footer>
  );
}
