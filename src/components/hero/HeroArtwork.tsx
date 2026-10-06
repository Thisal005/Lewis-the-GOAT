import React from 'react';

interface HeroArtworkProps {
  parallaxX?: number;
  parallaxY?: number;
}

export const HeroArtwork: React.FC<HeroArtworkProps> = ({
  parallaxX = 0,
  parallaxY = 0,
}) => {
  return (
    <div className="hero-artwork-stage" aria-hidden="true">
      {/* Layer 4: Car Centered in Midground */}
      <div
        className="artwork-car-anchor"
        style={{
          transform: `translate3d(${parallaxX * 0.4}px, ${parallaxY * 0.35}px, 0)`,
        }}
      >
        <div className="car-reflection-glow" />
        <picture className="car-picture">
          <source srcSet="/images/car.png" type="image/png" />
          <img
            src="/images/ferrari-44.png"
            alt="Scuderia Ferrari Formula 1 race car, front perspective"
            className="artwork-car-img"
            width={1672}
            height={941}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="car-ground-shadow" />
      </div>

      {/* Layer 5: Paired Inward-Facing Portraits */}
      <div className="artwork-portraits-stage">
        {/* Left: Real Lewis Hamilton facing right */}
        <div
          className="portrait-anchor portrait-hamilton"
          style={{
            transform: `translate3d(${parallaxX * 0.75}px, ${parallaxY * 0.7}px, 0)`,
          }}
        >
          <div className="portrait-glow-halo halo-hamilton" />
          <picture className="portrait-picture">
            <source srcSet="/images/lh.png" type="image/png" />
            <img
              src="/images/hamilton.png"
              alt="Sir Lewis Hamilton in Scuderia Ferrari team race suit facing inward"
              className="portrait-img img-hamilton"
              width={735}
              height={835}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>

        {/* Right: GOAT Counterpart facing left */}
        <div
          className="portrait-anchor portrait-goat"
          style={{
            transform: `translate3d(${parallaxX * -0.75}px, ${parallaxY * 0.7}px, 0)`,
          }}
        >
          <div className="portrait-glow-halo halo-goat" />
          <picture className="portrait-picture">
            <source srcSet="/images/goat.png" type="image/png" />
            <img
              src="/images/hamilton-goat.png"
              alt="Artistic GOAT counterpart in Scuderia Ferrari team race suit facing inward"
              className="portrait-img img-goat"
              width={1176}
              height={1337}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};
