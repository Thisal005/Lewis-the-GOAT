import { useState, useEffect } from 'react';
import './App.css';
import { SiteNavigation } from './components/SiteNavigation';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CareerStatsSection } from './components/CareerStatsSection';
import { MilestonesSection } from './components/MilestonesSection';
import { GallerySection } from './components/GallerySection';
import { VenturesSection } from './components/VenturesSection';
import { SourcesSection } from './components/SourcesSection';
import { Footer } from './components/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section for navbar highlighting
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'career-stats',
      'milestones',
      'gallery',
      'ventures',
      'sources',
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-app">
      {/* Accessible skip link for keyboard users */}
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      <SiteNavigation activeSection={activeSection} />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <CareerStatsSection />
        <MilestonesSection />
        <GallerySection />
        <VenturesSection />
        <SourcesSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
