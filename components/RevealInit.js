'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RevealInit() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: 0.12 });
    document.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
