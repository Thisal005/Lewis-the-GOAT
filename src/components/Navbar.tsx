import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trap focus and prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#career-stats', label: 'Telemetry & Stats' },
    { href: '#milestones', label: 'Eras & Milestones' },
    { href: '#gallery', label: 'Archive Gallery' },
    { href: '#ventures', label: 'Impact & Ventures' },
    { href: '#sources', label: 'Sources' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}
      role="banner"
    >
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <a href="#hero" className="brand-logo" aria-label="Sir Lewis Hamilton Archive Home">
          <div className="logo-badge" aria-hidden="true">
            <span className="logo-text">LH</span>
            <span className="logo-number">44</span>
          </div>
          <div className="brand-details">
            <span className="brand-name">LEWIS HAMILTON</span>
            <span className="fan-disclaimer-pill">Unofficial Fan Archive</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activeSection === targetId;
              return (
                <li key={link.href} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {link.label}
                    {isActive && <span className="active-dot" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header Action Button (Desktop) */}
        <div className="navbar-actions">
          <a href="#gallery" className="btn btn-ferrari btn-sm">
            <span className="ferrari-shield" aria-hidden="true">SF</span>
            <span>Ferrari Gallery</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden="true">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation-menu"
        className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <span className="fan-badge-mobile">Unofficial Fan Archive</span>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>
          <nav aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer-footer">
            <a
              href="#career-stats"
              className="btn btn-primary w-full"
              onClick={handleLinkClick}
            >
              Explore Career Stats
            </a>
            <p className="mobile-drawer-note">
              Updated through 2024 season &middot; Non-commercial fan tribute
            </p>
          </div>
        </div>
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      </div>
    </header>
  );
};
