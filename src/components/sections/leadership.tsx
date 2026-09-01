"use client";

import Image from "next/image";

import { Container, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion/reveal";

type Person = {
  no: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

const PEOPLE: Person[] = [
  {
    no: "01",
    name: "Dr. Enrico Mulawarman",
    role: "Founder — PT. Primer Utama Indonesia & Diva Valet",
    bio: "Founder PT. Primer Utama Indonesia dan Diva Valet (PT. Jumadi). Meraih gelar Ph.D. di bidang Anthropology dari University of Indonesia, tercatat sebagai Faculty Member di Binus University, dan menjabat sebagai President Director di perusahaan.",
    photo: "/assets/mentor/enrico.webp",
  },
  {
    no: "02",
    name: "Nius Maapanawang",
    role: "Leadership & Operational Expertise",
    bio: "Purnawirawan Indonesian Special Force Army (KOPASSUS) yang bergabung untuk berkontribusi sebagai pemimpin dan mendukung pengembangan tim. Latar belakang struktur serta praktik militer menjadi aset dalam industri Physical Security dan Manned Guarding.",
    photo: "/assets/mentor/nius.webp",
  },
];

export function Leadership() {
  return (
    <section className="relative overflow-hidden bg-obsidian py-[72px] md:py-[128px]">
      <Container>
        <div className="max-w-[720px]">
          <Reveal>
            <Eyebrow onDark>Who Behind Us</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-display text-[32px] font-bold uppercase leading-[0.98] text-white sm:text-[38px] md:text-[46px]">
              People behind the experience.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.62] text-white/60">
              Figur yang berada di balik pengalaman dan kapabilitas partner
              Premier Valet.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-2 lg:gap-8">
          {PEOPLE.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.1}
              className="group flex flex-col border border-white/[0.12] bg-charcoal sm:flex-row"
            >
              <div className="relative h-[240px] w-full shrink-0 overflow-hidden sm:h-auto sm:min-h-[300px] sm:w-[38%]">
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 639px) 100vw, 38vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <span className="font-mono text-[12px] tracking-[0.14em] text-penjaga">
                  {p.no}
                </span>
                <h3 className="mt-4 font-display text-[24px] font-bold uppercase leading-[1] text-white md:text-[27px]">
                  {p.name}
                </h3>
                <span className="mt-2 block h-[2px] w-10 bg-penjaga" />
                <p className="mt-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-white/70">
                  {p.role}
                </p>
                <p className="mt-4 text-[14.5px] leading-[1.62] text-white/55">
                  {p.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* <Reveal delay={0.1}>
          <p className="mt-8 border-l-[3px] border-white/20 pl-4 font-mono text-[11px] uppercase leading-[1.6] tracking-[0.1em] text-white/40">
            Sumber: company profile Premier Valet / PT. Primer Utama Indonesia.
          </p>
        </Reveal> */}
      </Container>
    </section>
  );
}
