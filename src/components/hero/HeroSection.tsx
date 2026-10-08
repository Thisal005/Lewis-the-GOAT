import { useEffect, useRef, useState } from 'react';
import './Hero.css';
import './Cinema.css';

export function HeroSection() {
  const trackRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const selectArtwork = (artwork: string) => setSelectedArtwork((current) => current === artwork ? null : artwork);

  useEffect(() => {
    const scene = sceneRef.current;
    const track = trackRef.current;
    if (!scene || !track) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const car = scene.querySelector<HTMLElement>('.cinema-car-drive');
    const touchControls = scene.querySelector<HTMLElement>('.cinema-touch-controls');
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const smoothstep = (start: number, end: number, value: number) => {
      const t = clamp((value - start) / (end - start));
      return t * t * (3 - 2 * t);
    };
    let frame: number | null = null;
    let previousTime = 0;
    let progress = 0;
    let target = 0;
    let needsScrollRead = true;
    let needsReset = true;
    let sceneHeight = 0;
    let leadIn = 0;
    let distance = 1;
    let mobile = false;
    let offscreen = false;
    const update = (time: number) => {
      frame = null;
      if (needsScrollRead) {
        const bounds = track.getBoundingClientRect();
        target = reducedMotion.matches ? 0 : clamp((-bounds.top - leadIn) / distance);
        offscreen = bounds.bottom <= 0 || bounds.top >= window.innerHeight;
        needsScrollRead = false;
      }
      // Time-based damping feels the same on 60 Hz and high-refresh screens.
      // Only the artwork follows with a little inertia; native scrolling stays immediate.
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 1000 / 60;
      previousTime = time;
      if (needsReset || reducedMotion.matches || offscreen) {
        progress = target;
        needsReset = false;
      } else {
        progress += (target - progress) * (1 - Math.exp(-elapsed / (mobile ? 80 : 110)));
      }
      if (Math.abs(target - progress) < .0001) progress = target;
      const approach = smoothstep(0, 1, progress * progress);
      // A fast swipe or anchor jump must still clear the car before About enters.
      const fade = Math.max(smoothstep(.62, .99, progress), smoothstep(.86, 1, target));
      scene.style.setProperty('--scroll-name-scale', String(1 - progress * (mobile ? .04 : .12)));
      scene.style.setProperty('--scroll-name-opacity', String(1 - progress * .7));
      scene.style.setProperty('--scroll-name-y', `${-progress * (mobile ? 12 : 45)}px`);
      scene.style.setProperty('--scroll-art-y', `${progress * (mobile ? 8 : 34)}px`);
      scene.style.setProperty('--drive-scale', String(1 + approach * (mobile ? 3 : 4)));
      scene.style.setProperty('--drive-y', `${approach * sceneHeight * .12}px`);
      scene.style.setProperty('--drive-opacity', String(1 - fade));
      scene.style.setProperty('--drive-brightness', String(.55 + smoothstep(0, .3, progress) * .6));
      scene.style.setProperty('--drive-image-opacity', String(.8 + smoothstep(0, .2, progress) * .2));
      scene.style.setProperty('--drive-copy-opacity', String(1 - smoothstep(.04, .4, progress)));
      const speed = smoothstep(.08, .42, progress) * (1 - smoothstep(.62, .92, Math.max(progress, target)));
      scene.style.setProperty('--drive-speed', String(reducedMotion.matches ? 0 : speed));
      scene.style.setProperty('--drive-trail-scale', String(1 + approach * 2));
      scene.dataset.driving = String(progress > .005);
      // Don't replay the entrance animation when the user scrolls back to the top.
      if (target > .005) scene.dataset.scrollStarted = 'true';
      if (car) car.inert = fade >= .999;
      if (touchControls) touchControls.inert = progress >= .4;
      if (progress !== target && !document.hidden) {
        frame = requestAnimationFrame(update);
      } else {
        previousTime = 0;
      }
    };
    const schedule = () => {
      needsScrollRead = true;
      if (frame === null && !document.hidden) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      // Cache layout measurements; interpolation frames only write visual properties.
      sceneHeight = scene.offsetHeight;
      mobile = window.matchMedia('(max-width: 700px)').matches;
      leadIn = Math.max(0, sceneHeight - window.innerHeight);
      track.style.setProperty('--hero-scene-height', `${sceneHeight}px`);
      track.style.setProperty('--hero-pin-top', `${-leadIn}px`);
      distance = Math.max(1, track.offsetHeight - sceneHeight);
      needsReset = true;
      schedule();
    };
    const visibilityChanged = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previousTime = 0;
      needsReset = true;
      schedule();
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(scene);
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    reducedMotion.addEventListener('change', measure);
    document.addEventListener('visibilitychange', visibilityChanged);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      reducedMotion.removeEventListener('change', measure);
      document.removeEventListener('visibilitychange', visibilityChanged);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const observer = new IntersectionObserver(([entry]) => {
      scene.dataset.ambientActive = String(entry.isIntersecting && !document.hidden);
    });
    const updateVisibility = () => {
      const bounds = scene.getBoundingClientRect();
      scene.dataset.ambientActive = String(!document.hidden && bounds.bottom > 0 && bounds.top < window.innerHeight);
    };
    observer.observe(scene);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)');
    let frame: number | null = null;
    let activePortrait: HTMLElement | null = null;
    const clearDepth = () => {
      activePortrait?.style.removeProperty('--depth-x');
      activePortrait?.style.removeProperty('--depth-y');
      activePortrait = null;
    };
    const move = (event: PointerEvent) => {
      if (motionPreference.matches || event.pointerType !== 'mouse') return;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = null;
        const bounds = scene.getBoundingClientRect();
        scene.style.setProperty('--scene-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 12}px`);
        scene.style.setProperty('--scene-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 8}px`);
        scene.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
        scene.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
        const portrait = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>('.cinema-portrait') : null;
        if (portrait !== activePortrait) clearDepth();
        activePortrait = portrait;
        if (portrait) {
          const rect = portrait.getBoundingClientRect();
          const x = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
          const y = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
          portrait.style.setProperty('--depth-x', `${x * 5}deg`);
          portrait.style.setProperty('--depth-y', `${-y * 4}deg`);
        }
      });
    };
    const reset = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      clearDepth();
      scene.style.setProperty('--scene-x', '0px');
      scene.style.setProperty('--scene-y', '0px');
    };
    scene.addEventListener('pointermove', move);
    scene.addEventListener('pointerleave', reset);
    motionPreference.addEventListener('change', reset);
    return () => {
      reset();
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', reset);
      motionPreference.removeEventListener('change', reset);
    };
  }, []);

  return (
    <section id="hero" ref={trackRef} className="cinema-scroll-track" aria-labelledby="cinema-title">
      <div ref={sceneRef} className="cinema-hero" data-selected-artwork={selectedArtwork ?? undefined}>
        <div className="cinema-atmosphere" aria-hidden="true" />
        <div className="cinema-grain" aria-hidden="true" />
        <div className="cinema-pointer-light" aria-hidden="true" />
        <div className="cinema-beam cinema-beam-left" aria-hidden="true" />
        <div className="cinema-beam cinema-beam-right" aria-hidden="true" />
        <div className="cinema-speed-trails" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="cinema-drive-glow" aria-hidden="true" />
        <div className="cinema-topline"><span><i /> THE MAKING OF A LEGEND</span><span>DRIVER. CREATOR. CHANGEMAKER.</span></div>
        <div className="cinema-title-wrap">
          <p className="cinema-kicker" aria-hidden="true"><span className="cinema-sir">Sir</span><span className="cinema-lewis">LEWIS</span></p>
          <h1 id="cinema-title" aria-label="Sir Lewis Hamilton">
            {'HAMILTON'.split('').map((letter, index) => (
              <span key={index} aria-hidden="true" style={{ animationDelay: `calc(var(--intro-name) + ${index * 65}ms)` }}>{letter}</span>
            ))}
          </h1>
        </div>
        <div className="cinema-art">
          <span className="cinema-race-number" aria-hidden="true">44</span>
          <div className="cinema-car-drive">
            <img className="cinema-car" src="/images/ferrari-44.png" alt="Ferrari Formula 1 car. Hover or focus to bring it into the foreground." tabIndex={0} width="1672" height="941" decoding="async" onPointerUp={(event) => { if (event.pointerType === 'touch') selectArtwork('car'); }} />
          </div>
          <img className="cinema-portrait cinema-human" src="/images/hamilton.png" alt="Lewis Hamilton in a Ferrari racing suit" tabIndex={0} width="735" height="835" fetchPriority="high" onPointerUp={(event) => { if (event.pointerType === 'touch') selectArtwork('human'); }} />
          <img className="cinema-portrait cinema-goat" src="/images/hamilton-goat.png" alt="Hamilton's artistic GOAT counterpart in a Ferrari racing suit" tabIndex={0} width="1176" height="1337" decoding="async" onPointerUp={(event) => { if (event.pointerType === 'touch') selectArtwork('goat'); }} />
        </div>
        <div className="cinema-touch-controls" role="group" aria-label="Highlight hero artwork">
          <p>Tap to explore</p>
          <div>
            {[['human', 'Hamilton'], ['car', 'Ferrari'], ['goat', 'GOAT']].map(([id, label]) => (
              <button key={id} type="button" aria-pressed={selectedArtwork === id} onClick={() => selectArtwork(id)}>{label}</button>
            ))}
          </div>
        </div>
        <div className="cinema-story">
          <p className="cinema-eyebrow">A LEGACY WITHOUT LIMITS</p>
          <h2>Beyond the limit<span>.</span></h2>
          <p className="cinema-description">Driven by purpose. Defined by legacy.<br />Discover the man beyond the racing line.</p>

        </div>
        <div className="cinema-bottom">
          <div className="cinema-champion"><strong>7&times;</strong><span>WORLD<br />CHAMPION</span></div>
          <a className="cinema-scroll" href="#about"><span aria-hidden="true">&#8595;</span> SCROLL TO DISCOVER</a>
          <p>UNOFFICIAL FAN PORTFOLIO <span>01 / THE LEGEND</span></p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
