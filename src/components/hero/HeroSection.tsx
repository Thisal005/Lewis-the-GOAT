import { useEffect, useRef } from 'react';
import './Hero.css';
import './Cinema.css';

export function HeroSection() {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)');
    const move = (event: PointerEvent) => {
      if (motionPreference.matches || event.pointerType !== 'mouse') return;
      const bounds = scene.getBoundingClientRect();
      scene.style.setProperty('--scene-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 12}px`);
      scene.style.setProperty('--scene-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 8}px`);
    };
    const reset = () => {
      scene.style.setProperty('--scene-x', '0px');
      scene.style.setProperty('--scene-y', '0px');
    };
    scene.addEventListener('pointermove', move);
    scene.addEventListener('pointerleave', reset);
    motionPreference.addEventListener('change', reset);
    return () => {
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', reset);
      motionPreference.removeEventListener('change', reset);
    };
  }, []);

  return (
    <section id="hero" ref={sceneRef} className="cinema-hero" aria-labelledby="cinema-title">
      <div className="cinema-atmosphere" aria-hidden="true" />
      <div className="cinema-beam cinema-beam-left" aria-hidden="true" />
      <div className="cinema-beam cinema-beam-right" aria-hidden="true" />
      <div className="cinema-topline"><span><i /> THE MAKING OF A LEGEND</span><span>DRIVER. CREATOR. CHANGEMAKER.</span></div>
      <div className="cinema-title-wrap">
        <p className="cinema-kicker" aria-hidden="true"><span className="cinema-sir">Sir</span><span className="cinema-lewis">LEWIS</span></p>
        <h1 id="cinema-title" aria-label="Sir Lewis Hamilton">
          {'HAMILTON'.split('').map((letter, index) => (
            <span key={index} aria-hidden="true" style={{ animationDelay: `${360 + index * 65}ms` }}>{letter}</span>
          ))}
        </h1>
      </div>
      <div className="cinema-art">
        <span className="cinema-race-number" aria-hidden="true">44</span>
        <img className="cinema-car" src="/images/ferrari-44.png" alt="Ferrari Formula 1 car. Hover or focus to bring it into the foreground." tabIndex={0} width="1672" height="941" decoding="async" />
        <img className="cinema-portrait cinema-human" src="/images/hamilton.png" alt="Lewis Hamilton in a Ferrari racing suit" tabIndex={0} width="735" height="835" fetchPriority="high" />
        <img className="cinema-portrait cinema-goat" src="/images/hamilton-goat.png" alt="Hamilton's artistic GOAT counterpart in a Ferrari racing suit" tabIndex={0} width="1176" height="1337" decoding="async" />
      </div>
      <div className="cinema-story">
        <p className="cinema-eyebrow">A LEGACY WITHOUT LIMITS</p>
        <h2>Beyond the limit<span>.</span></h2>
        <p className="cinema-description">Driven by purpose. Defined by legacy.<br />Discover the man beyond the racing line.</p>
        <div className="cinema-actions">
          <a className="cinema-primary" href="#legacy">Explore the legacy <span aria-hidden="true">&#8599;</span></a>
          <a className="cinema-secondary" href="#beyond-racing">Beyond racing <span aria-hidden="true">&#8599;</span></a>
        </div>
      </div>
      <div className="cinema-bottom">
        <div className="cinema-champion"><strong>7&times;</strong><span>WORLD<br />CHAMPION</span></div>
        <a className="cinema-scroll" href="#about"><span aria-hidden="true">&#8595;</span> SCROLL TO DISCOVER</a>
        <p>UNOFFICIAL FAN PORTFOLIO <span>01 / THE LEGEND</span></p>
      </div>
    </section>
  );
}

export default HeroSection;
