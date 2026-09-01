"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
// Smoothstep — matches the prototype's easing between two scroll thresholds.
const step = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// How many extra viewport-heights the hero is pinned for (300vh total = 2).
const PIN_SCREENS = 2;
const SCRUB_EASE = 0.14;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageARef = useRef<HTMLDivElement>(null);
  const stageBRef = useRef<HTMLDivElement>(null);
  const dipRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;

    const target = { p: 0 };
    const state = {
      current: 0,
      scrubReady: false,
      seeking: false,
      lastT: -1,
      raf: 0,
    };

    // --- video scrubbing setup ------------------------------------------
    let blobUrl: string | null = null;
    // Clear the in-flight seek flag once the decoder finishes a seek. Gating on
    // this (one seek at a time) is what stops seek requests from piling up and
    // stuttering the scrub.
    const onSeeked = () => {
      state.seeking = false;
    };

    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.pause();
      video.addEventListener("seeked", onSeeked);

      const canSeek = () =>
        !!video.seekable &&
        video.seekable.length > 0 &&
        video.seekable.end(0) > 0.1;
      const arm = () => {
        state.scrubReady = canSeek();
        if (!state.scrubReady) video.loop = true;
      };

      // Pull the whole clip into memory and re-point at a blob URL. In-memory
      // ranges are always seekable and seek far faster than ranged network
      // reads — that speed is what keeps the scroll-scrub smooth. Falls back to
      // play-while-scrolling if the clip still can't be seeked.
      const source = video.currentSrc || video.src;
      if (source) {
        fetch(source)
          .then((r) => r.blob())
          .then(
            (b) =>
              new Promise<void>((resolve) => {
                blobUrl = URL.createObjectURL(b);
                video.addEventListener("loadeddata", () => resolve(), {
                  once: true,
                });
                video.src = blobUrl;
                video.load();
              }),
          )
          .then(arm)
          .catch(arm);
      } else {
        // Sources not resolved yet — seek directly (Next serves /public with Range).
        video.addEventListener("loadeddata", arm, { once: true });
        arm();
      }
      window.setTimeout(arm, 4000);
    }

    // --- scroll → progress ----------------------------------------------
    const onScroll = () => {
      const r = section.getBoundingClientRect();
      const span = section.offsetHeight - window.innerHeight;
      const p = span > 0 ? clamp(-r.top / span) : 0;
      target.p = p;

      const outA = step(0.26, 0.44, p);
      if (stageARef.current) {
        stageARef.current.style.opacity = String(1 - outA);
        stageARef.current.style.transform = `translateY(${(-70 * outA).toFixed(1)}px)`;
        stageARef.current.style.pointerEvents = outA > 0.6 ? "none" : "auto";
      }

      const inB = step(0.52, 0.68, p);
      if (stageBRef.current) {
        stageBRef.current.style.opacity = String(inB);
        stageBRef.current.style.transform = `translateY(${(44 * (1 - inB)).toFixed(1)}px)`;
        stageBRef.current.style.pointerEvents = inB > 0.6 ? "auto" : "none";
      }

      if (dipRef.current) {
        dipRef.current.style.opacity = String(
          0.55 * step(0.4, 0.5, p) * (1 - step(0.5, 0.6, p)),
        );
      }
      if (watermarkRef.current) {
        watermarkRef.current.style.transform = `translateY(-50%) translateX(${(-90 * p).toFixed(1)}px)`;
      }
    };

    // --- rAF loop: lerp scrub position toward scroll target -------------
    const tick = () => {
      state.raf = requestAnimationFrame(tick);
      const v = video;
      if (!v || !v.duration || isNaN(v.duration)) return;
      state.current += (target.p - state.current) * SCRUB_EASE;
      if (Math.abs(target.p - state.current) < 0.0004) state.current = target.p;

      if (state.scrubReady) {
        // Only issue a new seek when the previous one has finished.
        if (!state.seeking) {
          const t = state.current * (v.duration - 0.05);
          if (Math.abs(v.currentTime - t) > 0.033) {
            state.seeking = true;
            try {
              v.currentTime = t;
            } catch {
              state.seeking = false;
            }
          }
        }
      } else {
        const moving =
          Math.abs(target.p - state.current) > 0.0006 ||
          (target.p > 0 && target.p < 1 && target.p !== state.lastT);
        state.lastT = target.p;
        if (moving && v.paused) {
          const play = v.play();
          if (play && play.catch) play.catch(() => {});
        } else if (!moving && !v.paused) {
          v.pause();
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    state.raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(state.raf);
      if (video) video.removeEventListener("seeked", onSeeked);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-obsidian"
      style={{ height: `${100 + PIN_SCREENS * 100}vh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-obsidian md:h-screen">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:translate-x-[250px] md:object-center"
        >
          {/* All-intra MP4 (every frame a keyframe) — each scrub seek decodes a
              single frame, so the scroll-scrub stays smooth. WebM is a fallback. */}
          <source src="/assets/hiro-penjaga-seek.mp4" type="video/mp4" />
          <source src="/assets/hero.webm" type="video/webm" />
        </video>
        {/* Keep the protective scrim on tablet and desktop only. */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,5,5,1) 0%, rgba(5,5,5,1) 34%, rgba(5,5,5,.66) 62%, rgba(5,5,5,.28) 100%)",
          }}
        />
        {/* transient black dip between the two stages */}
        <div
          ref={dipRef}
          className="pointer-events-none absolute inset-0 bg-obsidian opacity-0"
        />
        <div className="absolute inset-0 grid items-center pt-[68px] md:pt-[84px]">
          <div className="mx-auto grid w-full max-w-[1240px] px-4 sm:px-6 md:px-10">
            {/* --- Stage A: hero headline --- */}
            <div
              ref={stageARef}
              className="col-start-1 row-start-1 max-w-[800px] self-center [will-change:transform,opacity]"
            >
              <div className="mb-4 flex items-center gap-3 sm:mb-[26px] sm:gap-[14px]">
                <span className="block h-4 w-[3px] bg-penjaga sm:h-[18px]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[12.5px] sm:tracking-[0.16em]">
                  Security &amp; Valet Services
                </span>
              </div>
              <h1 className="m-0 font-display text-[clamp(2.25rem,10.5vw,2.875rem)] font-bold uppercase leading-[0.95] tracking-[0.005em] text-white sm:text-[54px] md:text-[78px] md:leading-[0.98]">
                Keamanan Terjaga.
                <br />
                Setiap Kedatangan
                <br />
                <span className="text-penjaga">Lebih Berkelas.</span>
              </h1>
              <p className="mt-5 max-w-[560px] text-[14px] leading-[1.55] text-white/85 sm:mt-7 sm:text-[17px] sm:leading-[1.62] sm:text-white/[0.78]">
                PT Penjaga Utama Indonesia menghadirkan layanan keamanan dan
                valet parking profesional untuk gedung, perusahaan, properti,
                hospitality, dan acara—disesuaikan dengan kebutuhan operasional
                setiap lokasi.
              </p>
              <div className="mt-6 grid max-w-[560px] grid-cols-1 gap-3 sm:mt-[38px] sm:flex sm:flex-wrap sm:gap-4">
                <a
                  href="#kontak"
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-[2px] bg-penjaga px-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white no-underline transition-[background-color,transform] duration-150 hover:bg-command active:scale-[0.985] active:bg-[#8e0e14] sm:h-[54px] sm:gap-[14px] sm:px-[30px] sm:text-[13px] sm:tracking-[0.14em]"
                >
                  Konsultasikan Kebutuhan <span className="text-[15px]">→</span>
                </a>
                <a
                  href="#layanan"
                  className="inline-flex h-12 items-center justify-center rounded-[2px] border border-white/[0.42] px-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white no-underline transition-colors duration-150 hover:border-white hover:bg-white hover:text-obsidian sm:h-[54px] sm:px-[30px] sm:text-[13px] sm:tracking-[0.14em]"
                >
                  Lihat Layanan
                </a>
              </div>
            </div>

            {/* --- Stage B: two services --- */}
            <div
              ref={stageBRef}
              className="pointer-events-none col-start-1 row-start-1 max-w-[900px] self-center opacity-0 [transform:translateY(44px)] [will-change:transform,opacity]"
            >
              <div className="mb-4 flex items-center gap-3 sm:mb-[26px] sm:gap-[14px]">
                <span className="block h-4 w-[3px] bg-penjaga sm:h-[18px]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[12.5px] sm:tracking-[0.16em]">
                  Layanan Kami
                </span>
              </div>
              <h2 className="m-0 max-w-[820px] font-display text-[clamp(2rem,9vw,2.5rem)] font-bold uppercase leading-[0.96] text-white sm:text-[48px] md:text-[66px] md:leading-[0.98]">
                Dua layanan.
                <br />
                <span className="text-penjaga">Satu standar profesional.</span>
              </h2>
              <p className="mt-4 max-w-[600px] text-[14px] leading-[1.5] text-white/85 sm:mt-[26px] sm:text-[17px] sm:leading-[1.62] sm:text-white/[0.78]">
                Dari pengamanan area hingga pengelolaan kedatangan kendaraan,
                layanan kami dirancang untuk mendukung keamanan, kelancaran
                operasional, dan pengalaman pengunjung.
              </p>
              <div className="mt-6 grid max-w-[820px] grid-cols-1 border-t border-white/[0.16] sm:mt-12 sm:grid-cols-2">
                <div className="pt-4 sm:border-r sm:border-white/[0.16] sm:pt-[26px] sm:pr-10">
                  <div className="mb-1.5 font-mono text-[11px] tracking-[0.1em] text-penjaga sm:mb-3 sm:text-[12px]">
                    01
                  </div>
                  <div className="mb-1.5 font-display text-[22px] font-semibold uppercase leading-none text-white sm:mb-[10px] sm:text-[28px]">
                    Security Service
                  </div>
                  <p className="text-[13px] leading-[1.45] text-white/75 sm:text-[15.5px] sm:leading-[1.6] sm:text-white/[0.66]">
                    Perlindungan yang disesuaikan dengan risiko dan aktivitas
                    lokasi.
                  </p>
                </div>
                <div className="mt-4 border-t border-white/[0.16] pt-4 sm:mt-0 sm:border-0 sm:pl-10 sm:pt-[26px]">
                  <div className="mb-1.5 font-mono text-[11px] tracking-[0.1em] text-penjaga sm:mb-3 sm:text-[12px]">
                    02
                  </div>
                  <div className="mb-1.5 font-display text-[22px] font-semibold uppercase leading-none text-white sm:mb-[10px] sm:text-[28px]">
                    Valet Parking
                  </div>
                  <p className="text-[13px] leading-[1.45] text-white/75 sm:text-[15.5px] sm:leading-[1.6] sm:text-white/[0.66]">
                    Pengalaman tamu dimulai sejak kendaraan tiba.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
