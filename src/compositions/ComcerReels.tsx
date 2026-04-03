import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  useEffect,
} from "remotion";
import { z } from "zod";

export const comcerReelsSchema = z.object({});

const COLORS = {
  darkBg: "#0E252C",
  lightBg: "#F3F9F5",
  accent: "#98CC3F",
  text: "#1A1A1A",
  lightText: "#FFFFFF",
};

const SLIDE_DURATION = 90; // 3 segundos a 30fps

// Importar fuentes
const fontsHtml = `
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">
`;

interface Slide {
  title: string;
  subtitle?: string;
  bgColor: string;
  textColor: string;
  badge?: string;
  layout: "centered" | "top" | "bottom";
}

const slides: Slide[] = [
  {
    title: "COMCER",
    subtitle: "Soluciones profesionales",
    bgColor: COLORS.darkBg,
    textColor: COLORS.lightText,
    badge: "DESDE 2010",
    layout: "centered",
  },
  {
    title: "100% Biodegradable",
    subtitle: "Productos de alto rendimiento",
    bgColor: COLORS.lightBg,
    textColor: COLORS.text,
    badge: "Eco-Certified",
    layout: "centered",
  },
  {
    title: "Despacho a todo Chile",
    subtitle: "En 24-48 horas",
    bgColor: COLORS.darkBg,
    textColor: COLORS.lightText,
    badge: "EXPRESS",
    layout: "centered",
  },
  {
    title: "Cotiza ahora",
    subtitle: "comcer.cl | +56 9 XXXX XXXX",
    bgColor: COLORS.accent,
    textColor: COLORS.darkBg,
    layout: "centered",
  },
];

const Slide: React.FC<{
  slide: Slide;
  frame: number;
  slideIndex: number;
  duration: number;
}> = ({ slide, frame, slideIndex, duration }) => {
  const slideStart = slideIndex * duration;
  const localFrame = frame - slideStart;

  // Fade in (primeros 15 frames)
  const fadeInOpacity = interpolate(
    localFrame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Fade out (últimos 15 frames)
  const fadeOutOpacity = interpolate(
    localFrame,
    [duration - 15, duration],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const opacity = Math.min(fadeInOpacity, fadeOutOpacity);

  // Scale animation (subtle zoom)
  const scale = interpolate(
    localFrame,
    [0, duration],
    [0.95, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: slide.bgColor,
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        textAlign: "center",
      }}
    >
      {/* Main Title */}
      <h1
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: 72,
          fontWeight: 700,
          margin: "0 0 20px 0",
          color: slide.textColor,
          letterSpacing: "-1px",
        }}
      >
        {slide.title}
      </h1>

      {/* Subtitle */}
      {slide.subtitle && (
        <p
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: 24,
            fontWeight: 400,
            margin: "0 0 30px 0",
            color: slide.textColor,
            opacity: 0.85,
            maxWidth: 900,
          }}
        >
          {slide.subtitle}
        </p>
      )}

      {/* Badge */}
      {slide.badge && (
        <div
          style={{
            backgroundColor: COLORS.accent,
            color: COLORS.darkBg,
            padding: "8px 20px",
            borderRadius: 20,
            fontFamily: "Montserrat, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            marginTop: 15,
            letterSpacing: "0.5px",
          }}
        >
          {slide.badge}
        </div>
      )}

      {/* Accent line */}
      <div
        style={{
          height: 4,
          width: 60,
          backgroundColor: COLORS.accent,
          marginTop: 40,
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
};

export const ComcerReels: React.FC<z.infer<typeof comcerReelsSchema>> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.lightBg }}>
      {/* Render all slides */}
      {slides.map((slide, index) => (
        <Sequence
          key={index}
          from={index * SLIDE_DURATION}
          durationInFrames={SLIDE_DURATION}
        >
          <Slide
            slide={slide}
            frame={frame}
            slideIndex={index}
            duration={SLIDE_DURATION}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
