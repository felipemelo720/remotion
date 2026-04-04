import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import comcerLogo from "../../public/logos/comcer-logo.png";

export const comcerReelsSchema = z.object({});

const COLORS = {
  darkBg: "#0E252C",
  lightBg: "#F3F9F5",
  accent: "#98CC3F",
  text: "#1A1A1A",
  lightText: "#FFFFFF",
  gray: "#8B8B8B",
  lightGray: "#E5E5E5",
};

const SLIDE_DURATION = 120; // 4 segundos

interface SlideContent {
  type: "brand" | "stat" | "benefit" | "feature" | "coverage" | "cta";
  bgColor: string;
  textColor: string;
  headline: string;
  stat?: string;
  description: string;
  icon?: string;
  accentBg?: boolean;
}

const slides: SlideContent[] = [
  {
    type: "brand",
    bgColor: COLORS.darkBg,
    textColor: COLORS.lightText,
    headline: "COMCER",
    description: "Limpieza sostenible para tu negocio",
  },
  {
    type: "stat",
    bgColor: COLORS.lightBg,
    textColor: COLORS.text,
    headline: "Reduce costos",
    stat: "30%",
    description: "Sin comprometer calidad ni sustentabilidad",
    accentBg: true,
  },
  {
    type: "benefit",
    bgColor: COLORS.darkBg,
    textColor: COLORS.lightText,
    headline: "100% Biodegradable",
    description: "Certificado ISO • Productos de alto rendimiento",
  },
  {
    type: "feature",
    bgColor: COLORS.lightBg,
    textColor: COLORS.text,
    headline: "Despacho rápido",
    stat: "24-48h",
    description: "Express a todo Chile",
  },
  {
    type: "coverage",
    bgColor: COLORS.darkBg,
    textColor: COLORS.lightText,
    headline: "Presencia nacional",
    description: "Disponible en toda Chile para tu comodidad",
  },
  {
    type: "cta",
    bgColor: COLORS.darkBg,
    textColor: COLORS.lightText,
    headline: "Cotiza ahora",
    description: "comcer.cl",
  },
];

// Animated counter component
const AnimatedNumber: React.FC<{ value: number; frame: number; duration: number }> = ({
  value,
  frame,
  duration,
}) => {
  const progress = interpolate(
    frame,
    [0, duration * 0.6],
    [0, value],
    { extrapolateRight: "clamp" }
  );
  return <span>{Math.floor(progress)}</span>;
};

// Progress bar component
const ProgressBar: React.FC<{ progress: number; color: string }> = ({ progress, color }) => (
  <div
    style={{
      height: 6,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: 3,
      overflow: "hidden",
      marginTop: 20,
      width: "100%",
      maxWidth: 300,
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${progress * 100}%`,
        backgroundColor: color,
        borderRadius: 3,
      }}
    />
  </div>
);

const SlideComponent: React.FC<{
  content: SlideContent;
  frame: number;
  slideIndex: number;
  duration: number;
}> = ({ content, frame, slideIndex, duration }) => {
  const slideStart = slideIndex * duration;
  const localFrame = frame - slideStart;

  // Fade in/out con transición suave
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(localFrame, [duration - 20, duration], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  // Staggered element animations
  const titleY = interpolate(localFrame, [0, 30], [40, 0], {
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const descY = interpolate(localFrame, [20, 50], [40, 0], {
    extrapolateRight: "clamp",
  });
  const descOpacity = interpolate(localFrame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const accentY = interpolate(localFrame, [40, 70], [20, 0], {
    extrapolateRight: "clamp",
  });
  const accentOpacity = interpolate(localFrame, [40, 70], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Scale animation para elementos
  const scale = interpolate(localFrame, [0, 30], [0.95, 1], {
    extrapolateRight: "clamp",
  });

  const progressWidth = interpolate(
    localFrame,
    [30, 80],
    [0, 0.8],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: content.bgColor,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "100px 80px",
      }}
    >
      {/* Logo centered at top */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 40,
          transform: `scale(${scale})`,
        }}
      >
        <img
          src={comcerLogo}
          style={{
            height: 90,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Top decorative line */}
      <div
        style={{
          height: 4,
          width: 100,
          backgroundColor: COLORS.accent,
          marginBottom: 60,
          borderRadius: 2,
        }}
      />

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Headline */}
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: content.stat ? 110 : 95,
            fontWeight: 700,
            margin: 0,
            color: content.textColor,
            letterSpacing: "-2px",
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          {content.headline}
        </h1>

        {/* Stat with animation */}
        {content.stat && (
          <div
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: 140,
              fontWeight: 700,
              color: COLORS.accent,
              margin: "20px 0 0 0",
              letterSpacing: "-3px",
              transform: `translateY(${descY}px)`,
              opacity: descOpacity,
            }}
          >
            <AnimatedNumber
              value={parseInt(content.stat)}
              frame={localFrame}
              duration={duration}
            />
            <span style={{ fontSize: 100 }}>%</span>
          </div>
        )}

        {/* Description — oculta en CTA, el botón cumple ese rol */}
        {content.type !== "cta" && (
          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: 38,
              fontWeight: 400,
              margin: content.stat ? "30px 0 0 0" : "25px 0 0 0",
              color: content.textColor,
              opacity: 0.9,
              maxWidth: 900,
              lineHeight: 1.6,
              transform: `translateY(${descY}px)`,
              transitionDuration: "0s",
            }}
          >
            {content.description}
          </p>
        )}

        {/* Progress bar for coverage slide */}
        {content.type === "coverage" && (
          <ProgressBar progress={progressWidth} color={COLORS.accent} />
        )}

        {/* CTA button — solo para el slide de tipo cta */}
        {content.type === "cta" && (
          <div
            style={{
              marginTop: 50,
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              transform: `translateY(${accentY}px)`,
              opacity: accentOpacity,
            }}
          >
            <div
              style={{
                backgroundColor: COLORS.accent,
                color: COLORS.darkBg,
                fontFamily: "Montserrat, sans-serif",
                fontSize: 34,
                fontWeight: 700,
                padding: "22px 52px",
                borderRadius: 8,
                letterSpacing: "0.5px",
              }}
            >
              comcer.cl
            </div>
          </div>
        )}

        {/* Bottom accent element */}
        {content.accentBg && (
          <div
            style={{
              marginTop: 40,
              paddingTop: 30,
              borderTop: `3px solid ${COLORS.accent}`,
              fontFamily: "Montserrat, sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.accent,
              letterSpacing: "1px",
              transform: `translateY(${accentY}px)`,
              opacity: accentOpacity,
            }}
          >
            ✓ ISO CERTIFIED
          </div>
        )}
      </div>

      {/* Bottom decorative elements */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 60,
          alignItems: "center",
        }}
      >
        <div style={{ height: 3, flex: 1, backgroundColor: COLORS.accent, opacity: 0.2 }} />
        <div
          style={{
            height: 8,
            width: 8,
            backgroundColor: COLORS.accent,
            borderRadius: "50%",
          }}
        />
        <div style={{ height: 3, width: 80, backgroundColor: COLORS.accent }} />
      </div>
    </AbsoluteFill>
  );
};

export const ComcerReels: React.FC<z.infer<typeof comcerReelsSchema>> = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.lightBg }}>
      {slides.map((slide, index) => (
        <Sequence
          key={index}
          from={index * SLIDE_DURATION}
          durationInFrames={SLIDE_DURATION}
        >
          <SlideComponent
            content={slide}
            frame={frame}
            slideIndex={index}
            duration={SLIDE_DURATION}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
