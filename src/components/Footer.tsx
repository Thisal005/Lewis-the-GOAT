import React from 'react';
import { LEGAL_DISCLAIMER } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" role="contentinfo">
      <div className="container">
        {/* Prominent Legal Disclaimer Box */}
        <div className="legal-disclaimer-box">
          <div className="disclaimer-badge-row">
            <span className="disclaimer-chip">Legal Disclaimer</span>
            <span className="disclaimer-type">Unofficial Fan-Created Portfolio</span>
          </div>
          <p className="disclaimer-body-text">{LEGAL_DISCLAIMER}</p>
        </div>

        {/* Footer Navigation & Credits */}
        <div className="footer-main-grid">
          <div className="footer-brand-col">
            <div className="brand-logo footer-logo">
              <div className="logo-badge" aria-hidden="true">
                <span className="logo-text">LH</span>
                <span className="logo-number">44</span>
              </div>
              <div>
                <span className="brand-name">SIR LEWIS HAMILTON</span>
                <span className="brand-subtitle">Archival Fan Portfolio</span>
              </div>
            </div>
            <p className="footer-tagline">
              Dedicated to celebrating racing excellence, diversity in motorsport, and the relentless drive to rise.
            </p>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Archive Sections</h4>
            <ul className="footer-nav-list">
              <li><a href="#about">Driver Profile</a></li>
              <li><a href="#career-stats">Telemetry &amp; Stats</a></li>
              <li><a href="#milestones">Career Milestones</a></li>
              <li><a href="#gallery">Visual Gallery</a></li>
              <li><a href="#ventures">Impact &amp; Ventures</a></li>
              <li><a href="#sources">Attribution &amp; Sources</a></li>
            </ul>
          </div>

          <div className="footer-external-col">
            <h4 className="footer-nav-title">Official Driver Platforms</h4>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="https://lewishamilton.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>LewisHamilton.com</span>
                  <span className="external-arrow" aria-hidden="true">&#8599;</span>
                </a>
              </li>
              <li>
                <a
                  href="https://mission44.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>Mission 44 Foundation</span>
                  <span className="external-arrow" aria-hidden="true">&#8599;</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.formula1.com/en/drivers/lewis-hamilton.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-ext-link"
                >
                  <span>Formula1.com Driver Profile</span>
                  <span className="external-arrow" aria-hidden="true">&#8599;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; 2025 Independent Fan Archive. Static build optimized for AWS S3 &amp; CloudFront.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Scroll back to top of page"
          >
            <span>Back to Top</span>
            <span className="top-arrow" aria-hidden="true">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
