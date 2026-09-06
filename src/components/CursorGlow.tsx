"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -250, y: -250 });
  const targetRef = useRef({ x: -250, y: -250 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let animationFrameId: number;

    const updatePosition = () => {
      // Smooth spring lag interpolation
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.14;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.14;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${posRef.current.x - 225}px, ${posRef.current.y - 225}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none z-30 transition-opacity duration-300"
      style={{
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.13) 0%, rgba(96, 165, 250, 0.07) 40%, rgba(147, 197, 253, 0.02) 70%, transparent 80%)",
        filter: "blur(24px)",
        willChange: "transform",
      }}
    />
  );
}
