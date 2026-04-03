import { CSSProperties } from "react";

interface BadgeProps {
  text: string;
  color?: "blue" | "green" | "red" | "yellow";
  size?: "sm" | "md" | "lg";
}

export const Badge = ({ text, color = "blue", size = "md" }: BadgeProps) => {
  const colors = {
    blue: "#3b82f6",
    green: "#10b981",
    red: "#ef4444",
    yellow: "#f59e0b",
  };

  const sizes = {
    sm: { padding: "4px 12px", fontSize: 12 },
    md: { padding: "8px 16px", fontSize: 14 },
    lg: { padding: "12px 20px", fontSize: 16 },
  };

  const style: CSSProperties = {
    backgroundColor: colors[color],
    color: "white",
    borderRadius: 20,
    display: "inline-block",
    fontWeight: "bold",
    ...sizes[size],
  };

  return <div style={style}>{text}</div>;
};
