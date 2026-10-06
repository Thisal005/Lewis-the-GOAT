import React from 'react';

interface HeroContentProps {
  parallaxX?: number;
  parallaxY?: number;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  parallaxX = 0,
  parallaxY = 0,
}) => {
  return (
    <div className="hero-content-layer">
      {/* Layer 3: Oversized Name Typography below the paired portraits */}
      <div
        className="hero-title-stage"
        style={{
          transform: `translate3d(${parallaxX * 0.25}px, ${parallaxY * 0.2}px, 0)`,
        }}
      >
        <h1 className="hero-name-heading" aria-label="Sir Lewis Hamilton">
          {/* Top lockup: LEWIS */}
          <span className="hero-name-top-lockup">
            <span className="hero-title-sir">Sir</span>
            <span className="hero-title-lewis">LEWIS</span>
          </span>

          {/* Massive HAMILTON display */}
          <span className="hero-title-hamilton">
            HAMILTON
          </span>
        </h1>
      </div>

      {/* Layer 6: Dark Localized Readability Gradient behind central corridor */}
      <div className="hero-readability-scrim" aria-hidden="true" />

      {/* Layer 7: Central Corridor Editorial Copy & Interactive CTA */}
      <div
        className="hero-corridor-stage"
        style={{
          transform: `translate3d(${parallaxX * 0.3}px, ${parallaxY * 0.25}px, 0)`,
        }}
      >
        <div className="corridor-copy-group">
          {/* Editorial Headline */}
          <h2 className="corridor-headline">
            BEYOND THE LIMIT<span className="headline-period" aria-hidden="true">.</span>
          </h2>

          {/* Supporting Tagline */}
          <p className="corridor-tagline">
            DRIVEN BY PURPOSE. DEFINED BY LEGACY.
          </p>
        </div>



        {/* Scroll Cue & Fan Disclaimer */}
        <div className="corridor-footer-group">
          <a
            href="#about"
            className="hero-scroll-cue"
            aria-label="Scroll to about section"
          >
            <span className="mouse-icon" aria-hidden="true">
              <span className="mouse-wheel" />
            </span>
          </a>
          <span className="hero-fan-portfolio-tag">
            UNOFFICIAL FAN PORTFOLIO
          </span>
        </div>
      </div>
    </div>
  );
};
