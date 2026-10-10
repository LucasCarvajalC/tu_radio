import { useEffect, useRef } from "react";

// Canvas ornamental de cumpleaños: motas a la deriva + estallidos pequeños
// y espaciados en laterales. Un solo rAF, limpieza total al desmontar.
// No lee el audio real ni toca la lógica de reproducción.
const COLORS = ["#f8c8e8", "#f4a8d4", "#c9b8ff", "#ffe0a3", "#fff5fb"];
const MAX_MOTES = 26;
const MAX_SPARKS = 90;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pickSide(width) {
  // Laterales y esquinas; el centro es de la radio.
  const left = Math.random() < 0.5;
  const x = left ? rand(width * 0.04, width * 0.28) : rand(width * 0.72, width * 0.96);
  const y = rand(0, Math.max(120, window.innerHeight * 0.45));
  return { x, y };
}

export default function BirthdayFireworks({ finale = false }) {
  const canvasRef = useRef(null);
  const finaleRef = useRef(finale);
  useEffect(() => {
    finaleRef.current = finale;
  }, [finale]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const smallScreen = window.innerWidth < 600;
    const motes = Array.from({ length: smallScreen ? 12 : MAX_MOTES }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: rand(0.8, 2.4),
      vy: rand(4, 14),
      vx: rand(-6, 6),
      alpha: rand(0.15, 0.5),
      fade: rand(0.05, 0.2),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      phase: Math.random() * Math.PI * 2,
    }));
    const sparks = [];
    let raf = 0;
    let last = performance.now();
    let nextBurst = last + rand(2500, 5000);
    let finaleDone = false;

    const burst = (big) => {
      if (sparks.length > MAX_SPARKS) return;
      const { x, y } = pickSide(window.innerWidth);
      const count = big ? 42 : 22;
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(30, big ? 150 : 110);
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: rand(0.35, 0.7),
          r: rand(1, 2.6),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const m of motes) {
        m.phase += dt;
        m.y -= m.vy * dt;
        m.x += (m.vx + Math.sin(m.phase) * 6) * dt;
        if (m.y < -8) {
          m.y = window.innerHeight + 8;
          m.x = Math.random() * window.innerWidth;
        }
        const twinkle = 0.6 + 0.4 * Math.sin(m.phase * 2);
        ctx.globalAlpha = m.alpha * twinkle;
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (now >= nextBurst) {
        burst(false);
        nextBurst = now + (smallScreen ? rand(6000, 11000) : rand(4000, 8000));
      }
      if (finaleRef.current && !finaleDone) {
        finaleDone = true;
        burst(true);
        setTimeout(() => burst(true), 700);
      }

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.life -= s.decay * dt;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 40 * dt;
        ctx.globalAlpha = Math.max(0, s.life) * 0.9;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.life + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="birthday-canvas" aria-hidden="true" />;
}
