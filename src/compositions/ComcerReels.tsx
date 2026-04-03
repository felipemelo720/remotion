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
};

const SLIDE_DURATION = 105; // 3.5 segundos

interface SlideContent {
  layout: "brand" | "stat" | "benefit" | "cta";
  bgColor: string;
  textColor: string;
  headline: string;
  stat?: string;
  description: string;
  accent?: string;
}

const slides: SlideContent[] = [
  {
    layout: "brand",
    bgColor: COLORS.darkBg,
    textColor: COLORS.lightText,
    headline: "COMCER",
    description: "Limpieza sostenible para tu negocio",
    accent: "DESDE 2010",
  },
  {
    layout: "stat",
    bgColor: COLORS.lightBg,
    textColor: COLORS.text,
    headline: "Reduce costos de limpieza",
    stat: "hasta 30%",
    description: "Sin comprometer calidad ni sustentabilidad",
  },
  {
    layout: "benefit",
    bgColor: COLORS.darkBg,
    textColor: COLORS.lightText,
    headline: "Certificado ISO",
    description: "100% Biodegradable • Despacho 24-48h • Todo Chile",
    accent: "+2000 empresas confían",
  },
  {
    layout: "cta",
    bgColor: COLORS.accent,
    textColor: COLORS.darkBg,
    headline: "Cotiza ahora",
    description: "comcer.cl | Llámanos +56 9 XXXX XXXX",
  },
];

const SlideComponent: React.FC<{
  content: SlideContent;
  frame: number;
  slideIndex: number;
  duration: number;
}> = ({ content, frame, slideIndex, duration }) => {
  const slideStart = slideIndex * duration;
  const localFrame = frame - slideStart;

  // Fade in/out
  const fadeIn = interpolate(
    localFrame,
    [0, 20],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const fadeOut = interpolate(
    localFrame,
    [duration - 20, duration],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  // Staggered animations for elements
  const titleY = interpolate(
    localFrame,
    [0, 25],
    [30, 0],
    { extrapolateRight: "clamp" }
  );
  const titleOpacity = interpolate(
    localFrame,
    [0, 25],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const descY = interpolate(
    localFrame,
    [15, 40],
    [30, 0],
    { extrapolateRight: "clamp" }
  );
  const descOpacity = interpolate(
    localFrame,
    [15, 40],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const accentY = interpolate(
    localFrame,
    [30, 55],
    [20, 0],
    { extrapolateRight: "clamp" }
  );
  const accentOpacity = interpolate(
    localFrame,
    [30, 55],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: content.bgColor,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: "80px 60px",
      }}
    >
      {/* Logo centered at top */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <img
          src={comcerLogo}
          style={{
            height: 100,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Top decorative line */}
      <div
        style={{
          height: 3,
          width: 80,
          backgroundColor: COLORS.accent,
          marginBottom: 60,
        }}
      />

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Headline */}
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: content.layout === "stat" ? 120 : 100,
            fontWeight: 700,
            margin: 0,
            color: content.textColor,
            letterSpacing: "-2px",
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            transitionDuration: "0s",
          }}
        >
          {content.headline}
        </h1>

        {/* Stat (if applicable) */}
        {content.stat && (
          <div
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: 96,
              fontWeight: 700,
              color: COLORS.accent,
              margin: "30px 0 0 0",
              letterSpacing: "-2px",
              transform: `translateY(${descY}px)`,
              opacity: descOpacity,
            }}
          >
            {content.stat}
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: 36,
            fontWeight: 400,
            margin: content.stat ? "40px 0 0 0" : "30px 0 0 0",
            color: content.textColor,
            opacity: 0.9,
            maxWidth: 900,
            lineHeight: 1.6,
            transform: `translateY(${descY}px)`,
            transitionDuration: "0s",
            opacity: descOpacity,
          }}
        >
          {content.description}
        </p>

        {/* Accent/Trust metric */}
        {content.accent && (
          <div
            style={{
              marginTop: 40,
              paddingTop: 30,
              borderTop: `2px solid ${COLORS.accent}`,
              fontFamily: "Open Sans, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: COLORS.accent,
              letterSpacing: "0.5px",
              transform: `translateY(${accentY}px)`,
              opacity: accentOpacity,
              transitionDuration: "0s",
            }}
          >
            {content.accent}
          </div>
        )}
      </div>

      {/* Bottom decorative elements */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 60,
        }}
      >
        <div style={{ height: 3, flex: 1, backgroundColor: COLORS.accent, opacity: 0.3 }} />
        <div style={{ height: 3, width: 60, backgroundColor: COLORS.accent }} />
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
