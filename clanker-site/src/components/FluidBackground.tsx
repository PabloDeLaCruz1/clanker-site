"use client";

import { useEffect, useRef } from "react";

type Pointer = { x: number; y: number; tx: number; ty: number; vx: number; vy: number };

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer: Pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 };
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      pointer.vx += (pointer.tx - pointer.x) * 0.08;
      pointer.vy += (pointer.ty - pointer.y) * 0.08;
      pointer.vx *= 0.82;
      pointer.vy *= 0.82;
      pointer.x += pointer.vx;
      pointer.y += pointer.vy;

      ctx.clearRect(0, 0, w, h);

      // soft base veil
      const bg = ctx.createRadialGradient(w * 0.2, h * 0.1, 20, w * 0.2, h * 0.1, w * 0.8);
      bg.addColorStop(0, "rgba(244,106,42,0.06)");
      bg.addColorStop(1, "rgba(7,9,13,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // moving “water light” blob
      const px = pointer.x * w;
      const py = pointer.y * h;
      const speed = Math.min(Math.hypot(pointer.vx, pointer.vy) * 22, 1.2);

      const g1 = ctx.createRadialGradient(px, py, 12, px, py, 260 + speed * 120);
      g1.addColorStop(0, "rgba(255,170,120,0.26)");
      g1.addColorStop(0.35, "rgba(244,106,42,0.16)");
      g1.addColorStop(1, "rgba(244,106,42,0)");

      const g2 = ctx.createRadialGradient(
        px * 0.85 + w * 0.08,
        py * 0.92 + h * 0.04,
        8,
        px * 0.85 + w * 0.08,
        py * 0.92 + h * 0.04,
        220 + speed * 80,
      );
      g2.addColorStop(0, "rgba(255,210,180,0.16)");
      g2.addColorStop(1, "rgba(255,147,97,0)");

      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.9 }}
    />
  );
}
