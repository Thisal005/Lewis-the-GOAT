import { useEffect, useRef } from 'react';

export function CinemaNumber({ value }: { value: string | number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    const total = Number(String(value).replaceAll(',', ''));
    if (!element || !Number.isFinite(total)) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame: number | null = null;
    let started = false;
    const finish = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      element.textContent = String(value);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      if (motion.matches || document.hidden) return;
      let start: number | null = null;
      const animate = (time: number) => {
        start ??= time;
        const progress = Math.min(1, (time - start) / 1200);
        element.textContent = String(Math.round(total * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(animate);
        else finish();
      };
      frame = requestAnimationFrame(animate);
    }, { threshold: .65 });
    const preferenceChanged = () => { if (motion.matches) finish(); };
    const visibilityChanged = () => { if (document.hidden) finish(); };
    observer.observe(element);
    motion.addEventListener('change', preferenceChanged);
    document.addEventListener('visibilitychange', visibilityChanged);
    return () => {
      finish();
      observer.disconnect();
      motion.removeEventListener('change', preferenceChanged);
      document.removeEventListener('visibilitychange', visibilityChanged);
    };
  }, [value]);
  return <><span className="sr-only">{value}</span><span ref={ref} aria-hidden="true" className="cinema-number">{value}</span></>;
}
