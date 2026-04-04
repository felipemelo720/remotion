/**
 * ComcerReels — Composición profesional para redes sociales.
 *
 * Componentes usados:
 *   - SlideTemplate   → layout base con logo, glow, footer y dots
 *   - Badge           → etiquetas de categoría por slide
 *   - TextBlock       → subtítulos y descripciones
 *   - slideAnimations → fadeIn, fadeOut, slideUp, scaleIn, springIn,
 *                       stagger, animatedCount, progressBar
 *
 * Reglas de diseño (ver CLAUDE.md):
 *   - Fondos permitidos: #0E252C (dark) y #F3F9F5 (light) únicamente
 *   - El verde lima #98CC3F solo se usa como acento, NUNCA como fondo
 */

import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { SlideTemplate, BRAND } from "../components/layouts/SlideTemplate";
import { Badge } from "../components/ui/Badge";
import { TextBlock } from "../components/ui/TextBlock";
import {
  fadeIn,
  slideUp,
  scaleIn,
  springIn,
  stagger,
  animatedCount,
  progressBar,
} from "../components/animations/slideAnimations";

export const comcerReelsSchema = z.object({});

const SLIDE_DURATION = 120; // 4 s a 30 fps
const TOTAL_SLIDES   = 6;

// ─────────────────────────────────────────────────────────────────────────────
// Slide 1 · Brand intro (dark)
// ─────────────────────────────────────────────────────────────────────────────
const BrandSlide: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  const badgeOp    = fadeIn(localFrame, { startAt: 0,  duration: 20 });
  const badgeY     = slideUp(localFrame, fps, { delay: 0,  distance: 30, preset: "natural" });
  const titleScale = scaleIn(localFrame, fps, { delay: 10, from: 0.88,  preset: "snappy" });
  const titleOp    = fadeIn(localFrame,  { startAt: 10, duration: 18 });
  const subY       = slideUp(localFrame, fps, { delay: 25, distance: 40 });
  const subOp      = fadeIn(localFrame,  { startAt: 25, duration: 20 });
  const lineW      = fadeIn(localFrame,  { startAt: 45, duration: 35 }) * 280;

  return (
    <SlideTemplate
      variant="dark"
      localFrame={localFrame}
      duration={SLIDE_DURATION}
      totalSlides={TOTAL_SLIDES}
      currentSlide={0}
    >
      {/* Categoría */}
      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, marginBottom: 32 }}>
        <Badge text="LIMPIEZA PROFESIONAL" color="green" size="lg" />
      </div>

      {/* Headline principal */}
      <div
        style={{
          opacity: titleOp,
          transform: `scale(${titleScale})`,
          transformOrigin: "left center",
        }}
      >
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 130,
            fontWeight: 800,
            margin: 0,
            color: BRAND.lightText,
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          COMCER
        </h1>
      </div>

      {/* Subtítulo via TextBlock */}
      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, marginTop: 28 }}>
        <TextBlock
          subtitle="Limpieza sostenible para tu negocio"
          align="left"
          color={BRAND.lightText}
        />
      </div>

      {/* Línea de acento animada */}
      <div
        style={{
          marginTop: 48,
          height: 4,
          width: lineW,
          backgroundColor: BRAND.accent,
          borderRadius: 2,
        }}
      />
    </SlideTemplate>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Slide 2 · Stat — Reduce costos 30 % (light)
// ─────────────────────────────────────────────────────────────────────────────
const StatSlide: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  const badgeOp  = fadeIn(localFrame, { startAt: 0,  duration: 18 });
  const titleY   = slideUp(localFrame, fps, { delay: 8,  preset: "snappy" });
  const titleOp  = fadeIn(localFrame,  { startAt: 8,  duration: 16 });
  const statOp   = fadeIn(localFrame,  { startAt: 18, duration: 20 });
  const count    = animatedCount(localFrame, 30, SLIDE_DURATION);
  const descY    = slideUp(localFrame, fps, { delay: 32, distance: 35 });
  const descOp   = fadeIn(localFrame,  { startAt: 32, duration: 20 });
  const certOp   = fadeIn(localFrame,  { startAt: 52, duration: 18 });
  const certY    = slideUp(localFrame, fps, { delay: 52, distance: 25, preset: "snappy" });

  return (
    <SlideTemplate
      variant="light"
      localFrame={localFrame}
      duration={SLIDE_DURATION}
      totalSlides={TOTAL_SLIDES}
      currentSlide={1}
    >
      {/* Etiqueta */}
      <div style={{ opacity: badgeOp, marginBottom: 28 }}>
        <Badge text="AHORRO COMPROBADO" color="green" size="lg" />
      </div>

      {/* Título */}
      <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)` }}>
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 80,
            fontWeight: 700,
            margin: 0,
            color: BRAND.text,
            letterSpacing: "-1px",
          }}
        >
          Reduce costos
        </h2>
      </div>

      {/* Contador animado */}
      <div
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: 180,
          fontWeight: 800,
          color: BRAND.accent,
          lineHeight: 1,
          margin: "12px 0",
          opacity: statOp,
          letterSpacing: "-5px",
        }}
      >
        {count}
        <span style={{ fontSize: 110 }}>%</span>
      </div>

      {/* Descripción via TextBlock */}
      <div style={{ opacity: descOp, transform: `translateY(${descY}px)` }}>
        <TextBlock
          subtitle="Sin comprometer calidad ni sustentabilidad"
          align="left"
          color={BRAND.text}
        />
      </div>

      {/* Certificación */}
      <div style={{ opacity: certOp, transform: `translateY(${certY}px)`, marginTop: 36 }}>
        <Badge text="✓ ISO CERTIFIED" color="green" size="md" />
      </div>
    </SlideTemplate>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Slide 3 · Benefit — 100 % Biodegradable (dark)
// ─────────────────────────────────────────────────────────────────────────────
const BenefitSlide: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  const badgeOp = fadeIn(localFrame, { startAt: 0,  duration: 18 });
  const titleY  = slideUp(localFrame, fps, { delay: 10, preset: "natural" });
  const titleOp = fadeIn(localFrame,  { startAt: 10, duration: 18 });
  const descY   = slideUp(localFrame, fps, { delay: 26, distance: 35 });
  const descOp  = fadeIn(localFrame,  { startAt: 26, duration: 20 });

  const pills = ["Alto Rendimiento", "Bajo Consumo", "Sin Tóxicos"];

  return (
    <SlideTemplate
      variant="dark"
      localFrame={localFrame}
      duration={SLIDE_DURATION}
      totalSlides={TOTAL_SLIDES}
      currentSlide={2}
    >
      {/* Etiqueta */}
      <div style={{ opacity: badgeOp, marginBottom: 28 }}>
        <Badge text="ECO FRIENDLY" color="green" size="lg" />
      </div>

      {/* Headline */}
      <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)` }}>
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 100,
            fontWeight: 800,
            margin: 0,
            color: BRAND.lightText,
            letterSpacing: "-2px",
          }}
        >
          100% Biodegradable
        </h2>
      </div>

      {/* Descripción */}
      <div style={{ opacity: descOp, transform: `translateY(${descY}px)`, marginTop: 22 }}>
        <TextBlock
          subtitle="Certificado ISO · Productos de alto rendimiento"
          align="left"
          color={BRAND.lightText}
        />
      </div>

      {/* Pills con stagger */}
      <div style={{ display: "flex", gap: 16, marginTop: 44, flexWrap: "wrap" }}>
        {pills.map((pill, i) => {
          const pillOp = fadeIn(localFrame, { startAt: 42 + stagger(i, 12), duration: 16 });
          const pillY  = slideUp(localFrame, fps, { delay: 42 + stagger(i, 12), distance: 22, preset: "snappy" });
          return (
            <div
              key={pill}
              style={{
                opacity: pillOp,
                transform: `translateY(${pillY}px)`,
                backgroundColor: "rgba(152,204,63,0.12)",
                border: `1.5px solid ${BRAND.accent}`,
                color: BRAND.accent,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: 28,
                padding: "14px 30px",
                borderRadius: 8,
                letterSpacing: "0.3px",
              }}
            >
              {pill}
            </div>
          );
        })}
      </div>
    </SlideTemplate>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Slide 4 · Feature — Despacho 24-48 h (light)
// ─────────────────────────────────────────────────────────────────────────────
const FeatureSlide: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  const badgeOp   = fadeIn(localFrame, { startAt: 0,  duration: 18 });
  const titleY    = slideUp(localFrame, fps, { delay: 8,  preset: "snappy" });
  const titleOp   = fadeIn(localFrame,  { startAt: 8,  duration: 16 });
  const statScale = scaleIn(localFrame, fps, { delay: 20, from: 0.72, preset: "snappy" });
  const statOp    = fadeIn(localFrame,  { startAt: 20, duration: 18 });
  const descY     = slideUp(localFrame, fps, { delay: 36, distance: 35 });
  const descOp    = fadeIn(localFrame,  { startAt: 36, duration: 20 });
  const extraOp   = fadeIn(localFrame,  { startAt: 55, duration: 18 });
  const extraY    = slideUp(localFrame, fps, { delay: 55, distance: 20, preset: "snappy" });

  return (
    <SlideTemplate
      variant="light"
      localFrame={localFrame}
      duration={SLIDE_DURATION}
      totalSlides={TOTAL_SLIDES}
      currentSlide={3}
    >
      {/* Etiqueta */}
      <div style={{ opacity: badgeOp, marginBottom: 28 }}>
        <Badge text="LOGÍSTICA EXPRESS" color="green" size="lg" />
      </div>

      {/* Título */}
      <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)` }}>
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 80,
            fontWeight: 700,
            margin: 0,
            color: BRAND.text,
            letterSpacing: "-1px",
          }}
        >
          Despacho rápido
        </h2>
      </div>

      {/* Stat grande */}
      <div
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: 155,
          fontWeight: 800,
          color: BRAND.accent,
          lineHeight: 1,
          margin: "16px 0",
          opacity: statOp,
          transform: `scale(${statScale})`,
          transformOrigin: "left center",
          letterSpacing: "-4px",
        }}
      >
        24–48h
      </div>

      {/* Descripción */}
      <div style={{ opacity: descOp, transform: `translateY(${descY}px)` }}>
        <TextBlock subtitle="Express a todo Chile" align="left" color={BRAND.text} />
      </div>

      {/* Badge adicional */}
      <div style={{ opacity: extraOp, transform: `translateY(${extraY}px)`, marginTop: 36 }}>
        <Badge text="Envío gratis en tu primer pedido" color="green" size="md" />
      </div>
    </SlideTemplate>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Slide 5 · Coverage — Presencia nacional (dark)
// ─────────────────────────────────────────────────────────────────────────────
const CoverageSlide: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  const badgeOp  = fadeIn(localFrame, { startAt: 0,  duration: 18 });
  const titleY   = slideUp(localFrame, fps, { delay: 10, preset: "natural" });
  const titleOp  = fadeIn(localFrame,  { startAt: 10, duration: 18 });
  const descY    = slideUp(localFrame, fps, { delay: 26, distance: 35 });
  const descOp   = fadeIn(localFrame,  { startAt: 26, duration: 20 });
  const barProg  = progressBar(localFrame, { from: 32, to: 88, target: 1 });
  const barLabelOp = fadeIn(localFrame, { startAt: 32, duration: 16 });

  const regions = ["Región Metropolitana", "Valparaíso", "Biobío", "Araucanía"];

  return (
    <SlideTemplate
      variant="dark"
      localFrame={localFrame}
      duration={SLIDE_DURATION}
      totalSlides={TOTAL_SLIDES}
      currentSlide={4}
    >
      {/* Etiqueta */}
      <div style={{ opacity: badgeOp, marginBottom: 28 }}>
        <Badge text="COBERTURA NACIONAL" color="green" size="lg" />
      </div>

      {/* Headline */}
      <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)` }}>
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 95,
            fontWeight: 800,
            margin: 0,
            color: BRAND.lightText,
            letterSpacing: "-2px",
          }}
        >
          Presencia nacional
        </h2>
      </div>

      {/* Descripción */}
      <div style={{ opacity: descOp, transform: `translateY(${descY}px)`, marginTop: 20 }}>
        <TextBlock
          subtitle="Disponible en toda Chile para tu comodidad"
          align="left"
          color={BRAND.lightText}
        />
      </div>

      {/* Barra de progreso animada con etiqueta */}
      <div style={{ marginTop: 36, maxWidth: 580 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
            fontFamily: "Montserrat, sans-serif",
            fontSize: 24,
            fontWeight: 600,
            color: BRAND.accent,
            opacity: barLabelOp,
          }}
        >
          <span>Cobertura nacional</span>
          <span>{Math.round(barProg * 100)}%</span>
        </div>
        <div
          style={{
            height: 10,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${barProg * 100}%`,
              backgroundColor: BRAND.accent,
              borderRadius: 5,
            }}
          />
        </div>
      </div>

      {/* Regiones con stagger via Badge */}
      <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
        {regions.map((region, i) => {
          const pillOp = fadeIn(localFrame, { startAt: 55 + stagger(i, 10), duration: 15 });
          const pillY  = slideUp(localFrame, fps, { delay: 55 + stagger(i, 10), distance: 18, preset: "snappy" });
          return (
            <div key={region} style={{ opacity: pillOp, transform: `translateY(${pillY}px)` }}>
              <Badge text={region} color="green" size="sm" />
            </div>
          );
        })}
      </div>
    </SlideTemplate>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Slide 6 · CTA — Cotiza ahora (dark)
// REGLA: fondo oscuro obligatorio. El verde lima solo en el botón CTA.
// ─────────────────────────────────────────────────────────────────────────────
const CtaSlide: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { fps } = useVideoConfig();

  const badgeOp    = fadeIn(localFrame,  { startAt: 0,  duration: 20 });
  const badgeY     = slideUp(localFrame, fps, { delay: 0,  distance: 28, preset: "snappy" });
  const titleScale = scaleIn(localFrame, fps, { delay: 12, from: 0.85, preset: "cta" });
  const titleOp    = fadeIn(localFrame,  { startAt: 12, duration: 18 });
  const subY       = slideUp(localFrame, fps, { delay: 28, distance: 30, preset: "natural" });
  const subOp      = fadeIn(localFrame,  { startAt: 28, duration: 20 });
  const btnScale   = scaleIn(localFrame, fps, { delay: 44, from: 0.78, preset: "cta" });
  const btnOp      = fadeIn(localFrame,  { startAt: 44, duration: 18 });
  const extraOp    = fadeIn(localFrame,  { startAt: 62, duration: 18 });
  const extraY     = slideUp(localFrame, fps, { delay: 62, distance: 20, preset: "snappy" });

  return (
    <SlideTemplate
      variant="dark"
      localFrame={localFrame}
      duration={SLIDE_DURATION}
      totalSlides={TOTAL_SLIDES}
      currentSlide={5}
      footerUrl="comcer.cl"
    >
      {/* Etiqueta de urgencia */}
      <div style={{ opacity: badgeOp, transform: `translateY(${badgeY}px)`, marginBottom: 32 }}>
        <Badge text="SOLICITA TU COTIZACIÓN" color="green" size="lg" />
      </div>

      {/* Headline CTA */}
      <div
        style={{
          opacity: titleOp,
          transform: `scale(${titleScale})`,
          transformOrigin: "left center",
        }}
      >
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: 120,
            fontWeight: 800,
            margin: 0,
            color: BRAND.lightText,
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          Cotiza ahora
        </h1>
      </div>

      {/* Subtítulo via TextBlock */}
      <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, marginTop: 28 }}>
        <TextBlock
          subtitle="Respuesta en menos de 24 h · Envío gratis en tu primer pedido"
          align="left"
          color={BRAND.lightText}
        />
      </div>

      {/* Botón CTA — verde lima SOLO como elemento, no como fondo */}
      <div
        style={{
          marginTop: 56,
          opacity: btnOp,
          transform: `scale(${btnScale})`,
          transformOrigin: "left center",
          display: "inline-flex",
        }}
      >
        <div
          style={{
            backgroundColor: BRAND.accent,
            color: BRAND.darkBg,
            fontFamily: "Montserrat, sans-serif",
            fontSize: 42,
            fontWeight: 800,
            padding: "28px 70px",
            borderRadius: 10,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          comcer.cl
        </div>
      </div>

      {/* Garantía */}
      <div style={{ opacity: extraOp, transform: `translateY(${extraY}px)`, marginTop: 36 }}>
        <Badge text="Sin compromiso · Sin costo" color="green" size="md" />
      </div>
    </SlideTemplate>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Composición principal
// ─────────────────────────────────────────────────────────────────────────────
export const ComcerReels: React.FC<z.infer<typeof comcerReelsSchema>> = () => {
  const frame = useCurrentFrame();

  const slides = [
    BrandSlide,
    StatSlide,
    BenefitSlide,
    FeatureSlide,
    CoverageSlide,
    CtaSlide,
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.darkBg }}>
      {slides.map((SlideComp, index) => (
        <Sequence key={index} from={index * SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
          <SlideComp localFrame={frame - index * SLIDE_DURATION} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
