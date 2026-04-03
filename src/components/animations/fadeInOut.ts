import { MotionStyle } from "framer-motion";

export const fadeInOut = (frame: number, duration: number = 30): MotionStyle => ({
  opacity: frame < duration ? frame / duration : frame > duration * 2 ? (1 - (frame - duration * 2) / duration) : 1,
});

export const slideIn = (frame: number, duration: number = 30, direction: "left" | "right" = "left"): MotionStyle => {
  const progress = Math.min(frame / duration, 1);
  const offset = direction === "left" ? (1 - progress) * -100 : (1 - progress) * 100;
  return { x: `${offset}%`, opacity: progress };
};

export const scaleIn = (frame: number, duration: number = 30): MotionStyle => ({
  scale: Math.min(frame / duration, 1),
  opacity: Math.min(frame / duration, 1),
});
