"use client";
import { useState, useEffect } from "react";

type Petal = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  color: string;
  opacity: number;
};

/**
 * CSS Floating Petals — Creates random rose petals that drift across the screen.
 * This is globally fixed to span the entire height and width of the window
 * so that petals rain down across all sections.
 */
export default function GlobalPetals({ count = 30 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const colors = [
      "#FFB4C2",
      "#FF8FA3",
      "#FDA4AF",
      "#FFC2D1",
      "#E11D48",
      "#FB7185",
    ];
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${10 + Math.random() * 12}s`,
      size: `${8 + Math.random() * 12}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setPetals(generated);
  }, [count]);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[40]">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
