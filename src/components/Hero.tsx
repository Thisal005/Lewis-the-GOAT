import React from 'react';
import { QUICK_STATS, STATS_VERIFICATION_DATE } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-heading">
      {/* Background Watermark & Glow */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-number-watermark" aria-hidden="true">
        44
      </div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Hero Left Column: Editorial & Identity */}
          <div className="hero-content">
            <div className="hero-badges">
              <span className="section-badge red">
                <span className="live-indicator-dot" aria-hidden="true" />
                Scuderia Ferrari &middot; #44
              </span>
              <span className="section-badge gold">
                7&times; World Champion
              </span>
            </div>

            <h1 id="hero-heading" className="hero-title">
              SIR LEWIS <br />
              <span className="text-gradient-cyan">HAMILTON</span>
            </h1>

            <p className="hero-lead">
              The winningest driver in Formula 1 history. Seven World Drivers’ Championships, 
              105 Grand Prix victories, and 104 pole positions — now entering motorsport’s most 
              mythic chapter in the scarlet red of <strong>Scuderia Ferrari</strong>.
            </p>

            <div className="hero-actions">
              <a href="#career-stats" className="btn btn-primary">
                <span>Explore Career Telemetry</span>
                <span className="arrow-down" aria-hidden="true">&darr;</span>
              </a>
              <a href="#milestones" className="btn btn-secondary">
                <span>Career Eras (2007–2025)</span>
              </a>
            </div>

            {/* Verification Date Note */}
            <div className="hero-verification-tag">
              <span className="verify-icon" aria-hidden="true">✓</span>
              <span>Official FIA telemetry verified: <strong>{STATS_VERIFICATION_DATE}</strong></span>
            </div>
          </div>

          {/* Hero Right Column: High-Res Visual Frame */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="image-aura-glow" aria-hidden="true" />
              <picture>
                <source srcSet="/assets/hamilton-ferrari-portrait.webp" type="image/webp" />
                <img
                  src="/assets/hamilton-ferrari-portrait.png"
                  alt="Sir Lewis Hamilton in official Scuderia Ferrari team red gear"
                  className="hero-portrait"
                  width="580"
                  height="660"
                  fetchPriority="high"
                />
              </picture>
              
              {/* Overlay Stat Capsule */}
              <div className="hero-floating-capsule">
                <div className="capsule-icon" aria-hidden="true">🏆</div>
                <div>
                  <span className="capsule-stat">105 GP Wins</span>
                  <span className="capsule-label">All-Time Formula 1 Record</span>
                </div>
              </div>

              {/* Monogram Stamp */}
              <div className="hero-floating-capsule bottom-capsule">
                <div className="capsule-icon cyan" aria-hidden="true">🏁</div>
                <div>
                  <span className="capsule-stat">Still I Rise</span>
                  <span className="capsule-label">Stevenage to Maranello</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Quick Telemetry Strip */}
        <div className="hero-stats-strip" aria-label="Career Key Milestones">
          <div className="stats-strip-header">
            <span className="stats-strip-title">All-Time Formula 1 Records</span>
            <span className="stats-strip-note">Verified official records</span>
          </div>

          <div className="quick-stats-grid">
            {QUICK_STATS.map((stat) => (
              <div key={stat.label} className="quick-stat-card">
                <span className="quick-stat-value">{stat.value}</span>
                <span className="quick-stat-label">{stat.label}</span>
                <span className="quick-stat-rank">{stat.rank}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
