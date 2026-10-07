import { useEffect, useRef } from 'react';

export function useCinemaReveal(revision = '') {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.cinemaVisible = 'true';
        observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    root.querySelectorAll('[data-cinema-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [revision]);
  return ref;
}
