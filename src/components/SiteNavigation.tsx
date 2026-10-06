import React, { useState, useEffect, useRef } from 'react';

interface SiteNavigationProps {
  activeSection?: string;
}

export const SiteNavigation: React.FC<SiteNavigationProps> = ({ activeSection = 'hero' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
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
          menuBtnRef.current?.focus();
        } else if (e.key === 'Tab' && mobileMenuRef.current) {
          const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
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
    { href: '#about', label: 'ABOUT', targetId: 'about' },
    { href: '#legacy', label: 'LEGACY', targetId: 'legacy' },
    { href: '#journey', label: 'JOURNEY', targetId: 'journey' },
    { href: '#gallery', label: 'GALLERY', targetId: 'gallery' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`site-navigation ${isScrolled ? 'is-scrolled' : ''}`}
      role="banner"
    >
      <div className="site-nav-inner">
        {/* Left: LH / 44 Brandmark */}
        <a
          href="#hero"
          className="nav-brandmark"
          aria-label="Lewis Hamilton 44 — Return to top"
        >
          <span className="brand-lh">LH</span>
          <span className="brand-divider" aria-hidden="true">/</span>
          <span className="brand-number">44</span>
        </a>

        {/* Thin rule separating brand and nav */}
        <div className="nav-accent-rule" aria-hidden="true" />

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-links" aria-label="Primary Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive =
                activeSection === link.targetId ||
                (link.targetId === 'legacy' && activeSection === 'career-stats') ||
                (link.targetId === 'journey' && activeSection === 'milestones');
              return (
                <li key={link.href} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {link.label}
                    {isActive && <span className="nav-active-pip" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          ref={menuBtnRef}
          type="button"
          className="nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-mobile-drawer"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <svg
            className="toggle-svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Accessible Mobile Drawer */}
      <div
        id="site-mobile-drawer"
        ref={mobileMenuRef}
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'is-visible' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className="mobile-nav-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div className="mobile-drawer-sheet">
          <div className="mobile-drawer-top">
            <div className="mobile-drawer-brand">
              <span className="brand-lh">LH</span>
              <span className="brand-divider" aria-hidden="true">/</span>
              <span className="brand-number">44</span>
            </div>
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>

          <nav className="mobile-drawer-nav" aria-label="Mobile Navigation">
            <ul className="mobile-drawer-list">
              {navLinks.map((link) => (
                <li key={link.href} className="mobile-drawer-item">
                  <a
                    href={link.href}
                    className="mobile-drawer-link"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mobile-drawer-item">
                <a
                  href="#beyond-racing"
                  className="mobile-drawer-link secondary"
                  onClick={handleLinkClick}
                >
                  BEYOND RACING
                </a>
              </li>
            </ul>
          </nav>

          <div className="mobile-drawer-bottom">
            <a
              href="#legacy"
              className="mobile-drawer-cta"
              onClick={handleLinkClick}
            >
              <span>EXPLORE THE LEGACY</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
            <p className="mobile-drawer-disclaimer">
              UNOFFICIAL FAN PORTFOLIO &middot; DEDICATED ARCHIVE
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
