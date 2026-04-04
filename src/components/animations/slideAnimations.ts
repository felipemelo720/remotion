/**
 * Remotion-native animation helpers para todos los reels de Comcer.
 * Reemplaza el fadeInOut.ts anterior (que usaba tipos de Framer Motion).
 *
 * Uso:
 *   const y    = slideUp(localFrame, fps, { delay: 0 });
 *   const op   = fadeIn(localFrame, { startAt: 10 });
 *   const sc   = springIn(localFrame, fps);
 */

import { interpolate, spring } from "remotion";

// ─── Spring presets ────────────────────────────────────────────────────────────

export const Springs = {
  /** Rebote natural — para entradas de texto y logos */
  natural:  { damping: 12, mass: 1,   stiffness: 180 },
  /** Rápido y definido — para números y stats */
  snappy:   { damping: 16, mass: 0.8, stiffness: 250 },
  /** Suave — para fondos y elementos grandes */
  gentle:   { damping: 22, mass: 1.2, stiffness: 110 },
  /** Overshoot mínimo — para CTAs */
  cta:      { damping: 10, mass: 1,   stiffness: 200 },
} as const;

// ─── Fade ─────────────────────────────────────────────────────────────────────

export const fadeIn = (
  frame: number,
  { startAt = 0, duration = 20 }: { startAt?: number; duration?: number } = {}
) =>
  interpolate(frame, [startAt, startAt + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const fadeOut = (
  frame: number,
  slideDuration: number,
  { duration = 15 }: { duration?: number } = {}
) =>
  interpolate(frame, [slideDuration - duration, slideDuration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Fade in suave al inicio + fade out al final del slide */
export const slideVisibility = (frame: number, duration: number) =>
  Math.min(fadeIn(frame, { duration: 18 }), fadeOut(frame, duration, { duration: 14 }));

// ─── Slide / Spring ───────────────────────────────────────────────────────────

export const springIn = (
  frame: number,
  fps: number,
  {
    delay = 0,
    preset = "natural" as keyof typeof Springs,
  }: { delay?: number; preset?: keyof typeof Springs } = {}
) => spring({ frame: frame - delay, fps, config: Springs[preset] });

/** Retorna translateY en px: entra desde abajo, se asienta en 0 */
export const slideUp = (
  frame: number,
  fps: number,
  {
    delay = 0,
    distance = 55,
    preset = "natural" as keyof typeof Springs,
  }: { delay?: number; distance?: number; preset?: keyof typeof Springs } = {}
) => {
  const progress = springIn(frame, fps, { delay, preset });
  return interpolate(progress, [0, 1], [distance, 0]);
};

/** Retorna scale: desde `from` a 1 */
export const scaleIn = (
  frame: number,
  fps: number,
  {
    delay = 0,
    from = 0.85,
    preset = "natural" as keyof typeof Springs,
  }: { delay?: number; from?: number; preset?: keyof typeof Springs } = {}
) => {
  const progress = springIn(frame, fps, { delay, preset });
  return interpolate(progress, [0, 1], [from, 1]);
};

// ─── Stagger helper ───────────────────────────────────────────────────────────

/** Retorna el delay en frames para el elemento i-ésimo de un grupo */
export const stagger = (index: number, gapFrames = 8) => index * gapFrames;

// ─── Counter animado ──────────────────────────────────────────────────────────

/** Interpolación de 0 → value en los primeros `speed`% de la duración del slide */
export const animatedCount = (
  frame: number,
  value: number,
  duration: number,
  speed = 0.55
) =>
  Math.floor(
    interpolate(frame, [0, duration * speed], [0, value], {
      extrapolateRight: "clamp",
    })
  );

// ─── Progress bar ─────────────────────────────────────────────────────────────

/** Retorna un valor [0–1] para el ancho de una barra de progreso */
export const progressBar = (
  frame: number,
  { from = 30, to = 80, target = 0.8 }: { from?: number; to?: number; target?: number } = {}
) =>
  interpolate(frame, [from, to], [0, target], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
