import React from 'react';

interface HeroBackdropProps {
  parallaxY?: number;
}

export const HeroBackdrop: React.FC<HeroBackdropProps> = ({ parallaxY = 0 }) => {
  return (
    <div
      className="hero-backdrop-layer"
      aria-hidden="true"
      style={{
        transform: `translate3d(0, ${parallaxY * 0.25}px, 0)`,
      }}
    >
      {/* Layer 0: Near-black solid foundation */}
      <div className="backdrop-base" />

      {/* Layer 1: Burgundy texture with aspect-aware crop & radial glows */}
      <div className="backdrop-texture-wrap">
        <img
          src="/images/burgundy-backdrop.png"
          alt=""
          className="backdrop-texture-img"
          fetchPriority="high"
          decoding="async"
        />
        <div className="backdrop-texture-overlay" />
      </div>

      {/* Radial red atmosphere glow & edge vignette */}
      <div className="backdrop-radial-glows" />

      {/* Layer 2: Atmospheric light beams (vertical red light pillars) */}
      <div className="backdrop-light-pillar pillar-left" />
      <div className="backdrop-light-pillar pillar-right" />
      <div className="backdrop-ground-glow" />

      {/* Restrained procedural grain */}
      <div className="backdrop-grain" />

      {/* Soft dark vignette */}
      <div className="backdrop-vignette" />
    </div>
  );
};
