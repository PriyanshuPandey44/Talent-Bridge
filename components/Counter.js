'use client';
import { useEffect, useRef, useState } from 'react';

export default function Counter({ to, suffix = '' }) {
  const [n, setN] = useState(to);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      let s = null; setN(0);
      const step = (t) => { s ??= t; const p = Math.min((t - s) / 1200, 1); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}
