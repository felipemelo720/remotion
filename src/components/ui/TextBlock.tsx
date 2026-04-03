import { CSSProperties } from "react";

interface TextBlockProps {
  title?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  color?: string;
}

export const TextBlock = ({
  title,
  subtitle,
  align = "center",
  color = "#000",
}: TextBlockProps) => {
  const containerStyle: CSSProperties = {
    textAlign: align,
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={containerStyle}>
      {title && (
        <h1
          style={{
            fontSize: 48,
            fontWeight: "bold",
            margin: "0 0 16px 0",
            color,
          }}
        >
          {title}
        </h1>
      )}
      {subtitle && (
        <p
          style={{
            fontSize: 24,
            margin: 0,
            color: color,
            opacity: 0.8,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
