"use client";

import { useState, type FormEvent } from "react";
import { Globe, Mail, MapPin, Phone, Printer } from "lucide-react";
import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

const NEEDS = ["Security Service", "Valet Parking", "Security & Valet", "Lainnya"];

const DETAILS = [
  { icon: Phone, label: "Telepon", value: "(021) 384 0960", href: "tel:+62213840960" },
  { icon: MapPin, label: "Alamat Partner", value: "Jl. Suryo Pranoto, Harmoni Plaza II Blok I No.5, Petojo Utara, Jakarta Pusat 10130" },
  { icon: Phone, label: "Telepon Partner", value: "+62 21 632 7390", href: "tel:+62216327390" },
  { icon: Printer, label: "Fax", value: "+62 21 632 7393" },
  { icon: Mail, label: "Email", value: "info@premierutama.co.id", href: "mailto:info@premierutama.co.id" },
  // { icon: Globe, label: "Website", value: "www.premierutama.co.id", href: "https://www.premierutama.co.id" },
];

const inputCls =
  "h-12 w-full rounded-[2px] border border-[var(--line-hairline)] bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-steel/70 focus:border-penjaga focus:ring-2 focus:ring-penjaga/25";
const labelCls =
  "mb-2 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-steel";

export function Contact() {
  const [need, setNeed] = useState(NEEDS[0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nama = String(f.get("nama") || "");
    const perusahaan = String(f.get("perusahaan") || "");
    const kontak = String(f.get("kontak") || "");
    const pesan = String(f.get("pesan") || "");
    const body = [
      `Nama: ${nama}`,
      `Perusahaan: ${perusahaan}`,
      `Kontak: ${kontak}`,
      `Kebutuhan: ${need}`,
      "",
      pesan,
    ].join("\n");
    const subject = `Konsultasi ${need} — ${nama || "Website"}`;
    window.location.href = `mailto:info@premierutama.co.id?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="kontak" className="relative bg-white py-[72px] md:py-[128px]">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[6fr_5fr] lg:gap-20">
          {/* --- form --- */}
          <div>
            <Reveal>
              <Eyebrow>Kontak</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-obsidian sm:text-[38px] md:text-[46px]">
                Konsultasikan kebutuhan Anda.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[460px] text-[16px] leading-[1.62] text-[#3a3a3a]">
                Ceritakan kebutuhan keamanan atau valet Anda. Tim kami akan
                membantu menyusun solusi yang sesuai.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nama" className={labelCls}>Nama</label>
                    <input id="nama" name="nama" required className={inputCls} placeholder="Nama Anda" />
                  </div>
                  <div>
                    <label htmlFor="perusahaan" className={labelCls}>Perusahaan / Organisasi</label>
                    <input id="perusahaan" name="perusahaan" className={inputCls} placeholder="Opsional" />
                  </div>
                </div>
                <div>
                  <label htmlFor="kontak" className={labelCls}>Email / Telepon</label>
                  <input id="kontak" name="kontak" required className={inputCls} placeholder="Email atau nomor telepon" />
                </div>
                <div>
                  <span className={labelCls}>Kebutuhan Layanan</span>
                  <div className="flex flex-wrap gap-2">
                    {NEEDS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNeed(n)}
                        aria-pressed={need === n}
                        className={`rounded-[2px] border px-4 py-2 text-[12.5px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                          need === n
                            ? "border-penjaga bg-penjaga text-white"
                            : "border-[var(--line-hairline)] bg-white text-ink hover:border-steel"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="pesan" className={labelCls}>Pesan</label>
                  <textarea id="pesan" name="pesan" rows={4} className={`${inputCls} h-auto py-3`} placeholder="Ceritakan kebutuhan Anda" />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-[54px] items-center justify-center rounded-[2px] bg-penjaga px-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-[background-color,transform] duration-150 hover:bg-command active:scale-[0.985]"
                >
                  Konsultasikan Kebutuhan
                </button>
                <p className="text-[12px] leading-[1.5] text-steel">
                  Mengirim akan membuka aplikasi email Anda menuju
                  info@premierutama.co.id.
                </p>
              </form>
            </Reveal>
          </div>

          {/* --- details --- */}
          <Reveal delay={0.1}>
            <div className="border border-[var(--line-hairline)] bg-[var(--surface-page)] p-7 md:p-9">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-steel">
                PT Penjaga Utama Indonesia
              </span>
              <p className="mt-2 font-display text-[22px] font-semibold uppercase leading-[1.1] text-obsidian">
                Security &amp; Valet Services
              </p>
              <div className="mt-7 flex flex-col divide-y divide-[var(--line-hairline)]">
                {DETAILS.map((d) => {
                  const Icon = d.icon;
                  const inner = (
                    <div className="flex items-start gap-4 py-4">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--line-hairline)] bg-white text-penjaga">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                          {d.label}
                        </span>
                        <span className="mt-1 block break-words text-[15px] leading-[1.5] text-ink">
                          {d.value}
                        </span>
                      </span>
                    </div>
                  );
                  return d.href ? (
                    <a key={d.label} href={d.href} className="no-underline transition-colors hover:text-penjaga [&_*]:transition-colors hover:[&_.text-ink]:text-penjaga">
                      {inner}
                    </a>
                  ) : (
                    <div key={d.label}>{inner}</div>
                  );
                })}
              </div>
              <p className="mt-6 border-l-[3px] border-penjaga pl-4 text-[12px] leading-[1.55] text-steel">
                Kontak di atas merupakan kontak partner valet, Premier Valet /
                PT. Primer Utama Indonesia.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
