"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
// Smoothstep — matches the prototype's easing between two scroll thresholds.
const step = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const SCRUB_EASE = 0.14;

/** Owns the hero's scroll-scrubbed video: pulls the clip into memory as a
    seekable blob, drives `currentTime` from scroll via a rAF lerp, and moves the
    two content stages + watermark. Returns the refs the Hero markup wires up.
    Lifted out of the component so Hero stays a focused view. */
export function useHeroScrub() {
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
    let armTimer: number | undefined;
    // Cancels the in-flight clip fetch when the effect tears down, so its
    // continuation never creates an orphaned object URL or touches an unmounted
    // video (and, in StrictMode, the discarded first run does no extra work).
    const ac = new AbortController();
    // Handler for the no-source fallback path; kept in this scope so the cleanup
    // can detach it if the clip never fires "loadeddata".
    let onArmLoaded: (() => void) | null = null;
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
        fetch(source, { signal: ac.signal })
          .then((r) => {
            // fetch resolves even on HTTP 4xx/5xx — guard before reading the
            // body so an error page is never turned into a bogus video blob.
            if (!r.ok) throw new Error(`Video fetch failed: ${r.status}`);
            return r.blob();
          })
          .then((b) => {
            // The clip must stay seekable for the element's whole life (seeks
            // may re-read byte ranges from the source), so the object URL is
            // revoked in the effect cleanup on unmount — never on a timer that
            // could pull it out from under an in-progress seek. React Doctor's
            // no-create-object-url-without-revoke can't trace a revoke that far
            // from the create; this is a known false positive, not a leak.
            blobUrl = URL.createObjectURL(b);
            return new Promise<void>((resolve) => {
              video.addEventListener("loadeddata", () => resolve(), {
                once: true,
              });
              video.src = blobUrl as string;
              video.load();
            });
          })
          .then(arm)
          .catch((err) => {
            // Abort is our own teardown — only fall back on real load failures.
            if ((err as { name?: string })?.name !== "AbortError") arm();
          });
      } else {
        // Sources not resolved yet — seek directly (Next serves /public with Range).
        onArmLoaded = arm;
        video.addEventListener("loadeddata", onArmLoaded, { once: true });
        arm();
      }
      armTimer = window.setTimeout(arm, 4000);
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
      ac.abort();
      if (armTimer) window.clearTimeout(armTimer);
      if (video) {
        video.removeEventListener("seeked", onSeeked);
        if (onArmLoaded) video.removeEventListener("loadeddata", onArmLoaded);
      }
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return { sectionRef, videoRef, stageARef, stageBRef, dipRef, watermarkRef };
}
