import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TextBlock } from "../components/ui/TextBlock";
import { Badge } from "../components/ui/Badge";
import { z } from "zod";

export const comcerIntroSchema = z.object({});

const SLIDE_DURATION = 120; // 4 segundos a 30fps

const slides = [
  {
    title: "Comcer",
    subtitle: "Soluciones de aseo profesional",
    color: "#10b981",
    badge: "Chile",
  },
  {
    title: "Productos",
    subtitle: "Biodegradables y de alto rendimiento",
    color: "#059669",
    badge: "Eco-Friendly",
  },
  {
    title: "Para empresas",
    subtitle: "Hoteles, restaurantes y negocios",
    color: "#047857",
    badge: "B2B",
  },
  {
    title: "Despacho a todo Chile",
    subtitle: "Sustentable. Confiable. Profesional",
    color: "#065f46",
    badge: "✓ Premium",
  },
];

export const ComcerIntro: React.FC<z.infer<typeof comcerIntroSchema>> = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#f0fdf4" }}>
      {slides.map((slide, index) => {
        const slideStart = index * SLIDE_DURATION;
        const slideEnd = slideStart + SLIDE_DURATION;

        // Fade in/out
        const opacity = interpolate(
          frame,
          [slideStart, slideStart + 20, slideEnd - 20, slideEnd],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <Sequence key={index} from={slideStart} durationInFrames={SLIDE_DURATION}>
            <AbsoluteFill style={{ opacity }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  backgroundColor: slide.color,
                  color: "white",
                }}
              >
                <TextBlock
                  title={slide.title}
                  subtitle={slide.subtitle}
                  align="center"
                  color="white"
                />
                <div style={{ marginTop: 40 }}>
                  <Badge text={slide.badge} color="green" size="lg" />
                </div>
              </div>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
