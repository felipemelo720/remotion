/**
 * SlideTemplate — Layout base para TODOS los reels de Comcer.
 *
 * Provee:
 * - Logo animado (spring) centrado al inicio
 * - Línea accent que crece al entrar
 * - Área de contenido (children)
 * - Footer con URL + indicadores de slide
 * - Radial glow de fondo sutil
 * - Fade in/out sincronizado con el slide
 *
 * Uso:
 *   <SlideTemplate localFrame={localFrame} duration={SLIDE_DURATION}
 *                  variant="dark" totalSlides={6} currentSlide={0}>
 *     <h1>Contenido</h1>
 *   </SlideTemplate>
 */

import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import comcerLogo from "../../../public/logos/comcer-logo.png";
import { fadeIn, fadeOut } from "../animations/slideAnimations";

export const BRAND = {
  darkBg:    "#0E252C",
  lightBg:   "#F3F9F5",
  accent:    "#98CC3F",
  text:      "#1A1A1A",
  lightText: "#FFFFFF",
  gray:      "#8B8B8B",
  lightGray: "#E5E5E5",
} as const;

export type SlideVariant = "dark" | "light" | "accent";

function variantDefaults(variant: SlideVariant) {
  if (variant === "dark")   return { bg: BRAND.darkBg,  text: BRAND.lightText };
  if (variant === "light")  return { bg: BRAND.lightBg, text: BRAND.text };
  return                           { bg: BRAND.accent,  text: BRAND.darkBg };
}

interface SlideTemplateProps {
  /** Variante de color — controla fondo y texto predeterminado */
  variant?: SlideVariant;
  /** Override manual del color de fondo */
  bgColor?: string;
  /** Override manual del color de texto */
  textColor?: string;
  /** Frame relativo al inicio de ESTE slide (0 … duration) */
  localFrame: number;
  /** Duración en frames del slide */
  duration: number;
  /** Total de slides en la composición (para los dots) */
  totalSlides?: number;
  /** Índice 0-based del slide actual (para los dots) */
  currentSlide?: number;
  /** Mostrar logo Comcer */
  showLogo?: boolean;
  /** URL mostrada en el footer */
  footerUrl?: string;
  children: React.ReactNode;
}

export const SlideTemplate: React.FC<SlideTemplateProps> = ({
  variant = "dark",
  bgColor,
  textColor,
  localFrame,
  duration,
  totalSlides,
  currentSlide,
  showLogo = true,
  footerUrl = "comcer.cl",
  children,
}) => {
  const { fps } = useVideoConfig();
  const defaults = variantDefaults(variant);
  const bg   = bgColor   ?? defaults.bg;
  const text = textColor ?? defaults.text;
  const isDark = variant === "dark";

  // ── Opacidad global del slide ──────────────────────────────────────────────
  const slideOpacity = Math.min(
    fadeIn(localFrame,  { duration: 18 }),
    fadeOut(localFrame, duration, { duration: 14 })
  );

  // ── Logo ───────────────────────────────────────────────────────────────────
  const logoScale = spring({ frame: localFrame, fps, config: { damping: 14, mass: 1, stiffness: 200 } });
  const logoOpacity = fadeIn(localFrame, { duration: 22 });

  // ── Línea accent ───────────────────────────────────────────────────────────
  const lineW = interpolate(localFrame, [8, 38], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Footer URL ─────────────────────────────────────────────────────────────
  const footerOpacity = fadeIn(localFrame, { startAt: 30, duration: 20 });

  // ── Dots ───────────────────────────────────────────────────────────────────
  const dotsOpacity = fadeIn(localFrame, { startAt: 25, duration: 20 });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        opacity: slideOpacity,
        display: "flex",
        flexDirection: "column",
        padding: "88px 80px 68px",
        overflow: "hidden",
      }}
    >
      {/* Radial glow sutil — le da profundidad al fondo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 70% 50% at 90% 10%, ${BRAND.accent}, transparent)`,
          opacity: isDark ? 0.12 : 0.06,
          pointerEvents: "none",
        }}
      />

      {/* Second glow — esquina opuesta para balance */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 50% 40% at 10% 90%, ${BRAND.accent}, transparent)`,
          opacity: isDark ? 0.07 : 0.04,
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      {showLogo && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 28,
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            position: "relative",
            zIndex: 1,
          }}
        >
          <img src={comcerLogo} style={{ height: 86, objectFit: "contain" }} alt="Comcer" />
        </div>
      )}

      {/* Línea accent animada */}
      <div
        style={{
          height: 4,
          width: lineW,
          backgroundColor: BRAND.accent,
          borderRadius: 2,
          marginBottom: 48,
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Área de contenido */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 36,
          paddingTop: 18,
          borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)"}`,
          position: "relative",
          zIndex: 1,
          opacity: footerOpacity,
        }}
      >
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 22,
            fontWeight: 600,
            color: text,
            opacity: 0.45,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {footerUrl}
        </span>

        {/* Slide indicator dots */}
        {totalSlides !== undefined && currentSlide !== undefined && (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              opacity: dotsOpacity,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: i === currentSlide ? 8 : 6,
                  width: i === currentSlide ? 26 : 6,
                  backgroundColor: i === currentSlide ? BRAND.accent : text,
                  borderRadius: 4,
                  opacity: i === currentSlide ? 1 : 0.28,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
