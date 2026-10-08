import { useEffect } from 'react';

/** Chapter cues run once and never delay native scrolling or hide content. */
export function useChapterMotion() {
  useEffect(() => {
    const chapters = document.querySelectorAll<HTMLElement>('.about-chapter, .legacy-chapter, .journey-chapter, .archive-chapter, .footer-epilogue');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.chapterVisible = 'true';
        observer.unobserve(entry.target);
      });
    }, { threshold: .25 });
    chapters.forEach(chapter => observer.observe(chapter));
    const journey = document.querySelector<HTMLElement>('.cinematic-journey');
    let journeyVisible = false;
    const updateAmbient = () => {
      if (journey) journey.dataset.motionActive = String(journeyVisible && !document.hidden);
    };
    const ambientObserver = new IntersectionObserver(([entry]) => {
      journeyVisible = entry.isIntersecting;
      updateAmbient();
    });
    if (journey) { journey.dataset.motionActive = 'false'; ambientObserver.observe(journey); }
    document.addEventListener('visibilitychange', updateAmbient);
    return () => {
      observer.disconnect();
      ambientObserver.disconnect();
      document.removeEventListener('visibilitychange', updateAmbient);
    };
  }, []);
}
