import React from 'react';
import { VERIFIED_QUOTES } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge rose">Driver Profile & Legacy</span>
          <h2 id="about-heading" className="section-title">
            The Stevenage Prodigy to Global Sporting Icon
          </h2>
          <p className="section-subtitle mx-auto">
            From humble beginnings in Stevenage to becoming Formula 1’s most decorated competitor,
            Lewis Hamilton has reshaped the motorsport landscape through unprecedented track speed,
            tire sensitivity, and fearless cultural leadership.
          </p>
        </div>

        <div className="about-grid">
          {/* Biography Cards */}
          <div className="glass-card bio-card">
            <div className="bio-card-header">
              <span className="bio-icon" aria-hidden="true">🏁</span>
              <h3>Mastery on the Edge of Adhesion</h3>
            </div>
            <p>
              Born 7 January 1985 in Stevenage, Hertfordshire, Lewis began karting at age eight.
              Backed by his father Anthony working multiple jobs to support his early racing,
              Hamilton stormed through the junior formulas with British Formula Renault, Formula 3
              Euro Series, and GP2 championships.
            </p>
            <p className="mt-3">
              His signature driving style is distinguished by extraordinarily late, smooth trail-braking,
              virtuosic balance in changing wet weather, and an instinctive ability to extend tire life
              without compromising lap time.
            </p>

            <div className="driver-specs-grid">
              <div className="spec-item">
                <span className="spec-label">First F1 Grand Prix</span>
                <span className="spec-value">2007 Australian GP (Podium)</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">First F1 Win</span>
                <span className="spec-value">2007 Canadian GP (Montreal)</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Career Teams</span>
                <span className="spec-value">McLaren, Mercedes, Ferrari</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Honours</span>
                <span className="spec-value">Knighted (Sir), MBE</span>
              </div>
            </div>
          </div>

          {/* Core Racing Disciplines */}
          <div className="glass-card strengths-card">
            <div className="bio-card-header">
              <span className="bio-icon rose" aria-hidden="true">⚡</span>
              <h3>Technical Competence & Racecraft</h3>
            </div>
            
            <ul className="strengths-list">
              <li className="strength-item">
                <div className="strength-badge">Wet Weather Master</div>
                <p>
                  Renowned for historic rain drives, including Silverstone 2008 (winning by 68 seconds) 
                  and Istanbul 2020 (slick-surface tyre whispering from 6th to 1st).
                </p>
              </li>
              <li className="strength-item">
                <div className="strength-badge">Qualifying One-Lap Precision</div>
                <p>
                  Holds the all-time record with 104 pole positions across 32 different circuits, 
                  including Singapore 2018—widely heralded as the greatest qualifying lap in F1 history.
                </p>
              </li>
              <li className="strength-item">
                <div className="strength-badge">Strategic Tire Management</div>
                <p>
                  Consistently extracts maximum stint lengths on Pirelli compounds, enabling undercut 
                  and overcut strategic masterclasses like Hungary 2019 and Monaco 2019.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Verified Quotes Showcase */}
        <div className="quotes-container">
          <div className="quotes-header">
            <span className="quotes-badge">Authentic Words & Philosophy</span>
            <p className="quotes-subtext">Verified verbatim quotations from official broadcasts, FIA press conferences, and published interviews.</p>
          </div>

          <div className="quotes-grid">
            {VERIFIED_QUOTES.map((item, idx) => (
              <blockquote key={idx} className="quote-card glass-card">
                <div className="quote-mark" aria-hidden="true">&ldquo;</div>
                <p className="quote-text">{item.quote}</p>
                <footer className="quote-footer">
                  <cite className="quote-context">{item.context}</cite>
                  <span className="quote-source">Source: {item.source} ({item.year})</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
