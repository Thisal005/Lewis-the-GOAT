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
    root.querySelectorAll<HTMLElement>('[data-cinema-reveal]').forEach((element, index) => {
      element.style.setProperty('--cinema-stagger', `${(index % 3) * 75}ms`);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [revision]);
  return ref;
}
