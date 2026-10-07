import { LEGAL_DISCLAIMER } from '../data/portfolioData';
import { useCinemaReveal } from '../hooks/useCinemaReveal';
import './CinemaArchive.css';

export function Footer() {
  const ref = useCinemaReveal();
  return <footer ref={ref} className="cinema-footer">
    <div className="archive-shell"><div className="footer-epilogue" data-cinema-reveal><div className="footer-finale"><div className="footer-finale-copy"><p className="archive-micro">THE FINISH LINE IS ONLY THE BEGINNING.</p><p className="footer-rising">STILL<br /><span>RISING.</span></p></div><div className="footer-portrait"><img src="/images/ft.png" alt="Lewis Hamilton seen from behind in his Mercedes racing suit and helmet" loading="lazy" decoding="async" /></div></div><div className="footer-signoff"><span>Sir Lewis Hamilton</span><a className="archive-text-link" href="#hero">Back to the beginning <span aria-hidden="true">↑</span></a></div></div>
      <div className="footer-index"><a className="footer-mark" href="#hero" aria-label="Lewis Hamilton, return to top">LH <span>/</span> 44</a><nav aria-label="Footer sections"><a href="#about">About</a><a href="#legacy">Legacy</a><a href="#journey">Journey</a><a href="#gallery">Gallery</a><a href="#ventures">Purpose</a><a href="#sources">Sources</a></nav><a href="https://lewishamilton.com" target="_blank" rel="noopener noreferrer">Official website ↗<span className="sr-only"> (opens in a new tab)</span></a></div>
      <details className="footer-disclaimer"><summary>Independent fan portfolio / attribution & disclaimer <span aria-hidden="true">+</span></summary><p>{LEGAL_DISCLAIMER}</p></details>
      <div className="footer-colophon"><p>© 2026 Independent Fan Archive</p><span>A TRIBUTE TO THE DRIVE.</span></div>
    </div>
  </footer>;
}
