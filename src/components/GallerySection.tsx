import { useRef, useState, type MouseEvent } from 'react';
import type { GalleryItem } from '../types';
import { useCinemaReveal } from '../hooks/useCinemaReveal';
import { LightboxModal } from './LightboxModal';
import './CinemaArchive.css';

type GalleryCategory = 'all' | 'ferrari' | 'racing' | 'style';
const collection: GalleryItem[] = [
  { id: 'scarlet', title: 'A new horizon.', category: 'ferrari', categoryLabel: 'Scuderia Ferrari', imageSrc: '/images/frr.png', webpSrc: '/images/frr.png', altText: 'Lewis Hamilton in a red Ferrari racing suit and yellow helmet', caption: 'Scarlet, a yellow helmet and the familiar crossed-arm stance. A new chapter in the same extraordinary story.', dateOrYear: 'THE NEXT CHAPTER', credit: 'Image supplied for this fan portfolio' },
  { id: 'victory', title: 'The moments that stay.', category: 'racing', categoryLabel: 'Victory', imageSrc: '/images/win.png', webpSrc: '/images/win.png', altText: 'Lewis Hamilton kissing a trophy while wrapped in the British flag', caption: 'The emotion beyond the finish line. A trophy, a flag and a moment worth remembering.', dateOrYear: 'BEYOND THE FINISH LINE', credit: 'Image supplied for this fan portfolio' },
  { id: 'mercedes', title: 'Quiet before the storm.', category: 'racing', categoryLabel: 'Mercedes-AMG', imageSrc: '/images/mb.png', webpSrc: '/images/mb.png', altText: 'Lewis Hamilton wearing his Mercedes suit and helmet with his arms crossed', caption: 'Visor down. Focus complete. A portrait of the preparation behind the performance.', dateOrYear: 'THE MERCEDES CHAPTER', credit: 'Image supplied for this fan portfolio' },
  { id: 'mclaren', title: 'Where belief began.', category: 'racing', categoryLabel: 'McLaren', imageSrc: '/images/mcl.png', webpSrc: '/images/mcl.png', altText: 'Lewis Hamilton in his McLaren racing suit and helmet', caption: 'The silver suit and unmistakable helmet of the McLaren chapter.', dateOrYear: 'THE EARLY CHAPTER', credit: 'Image supplied for this fan portfolio' },
  { id: 'identity', title: 'Beyond the racing line.', category: 'style', categoryLabel: 'Portrait', imageSrc: '/images/about.png', webpSrc: '/images/about.png', altText: 'Black and white profile portrait of Lewis Hamilton looking upward', caption: 'A quieter perspective on the person behind the racing legacy.', dateOrYear: 'THE MAN BEHIND THE LEGEND', credit: 'Image supplied for this fan portfolio' },
  { id: 'goat-art', title: 'An icon. Reimagined.', category: 'style', categoryLabel: 'Art & Identity', imageSrc: '/images/hamilton-goat.png', webpSrc: '/images/hamilton-goat.png', altText: 'Artistic GOAT character in a Ferrari suit inspired by the Hamilton hero composition', caption: 'An artistic interpretation of the GOAT motif, created for the visual identity of this fan tribute.', dateOrYear: 'ARTISTIC INTERPRETATION', credit: 'Fan portfolio illustration; not documentary photography' },
];
const categories: { id: GalleryCategory; label: string }[] = [{ id: 'all', label: 'The collection' }, { id: 'ferrari', label: 'Ferrari' }, { id: 'racing', label: 'On track' }, { id: 'style', label: 'Art & identity' }];

export function GallerySection() {
  const [category, setCategory] = useState<GalleryCategory>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sectionRef = useCinemaReveal(category);
  const items = category === 'all' ? collection : collection.filter(item => item.category === category);
  const open = (index: number, event: MouseEvent<HTMLButtonElement>) => { triggerRef.current = event.currentTarget; setActiveIndex(index); };
  const close = () => { setActiveIndex(null); requestAnimationFrame(() => triggerRef.current?.focus()); };
  return (
    <section ref={sectionRef} id="gallery" className="gallery-section cinema-gallery" aria-labelledby="gallery-heading">
      <div className="archive-shell">
        <div className="archive-chapter"><span><i aria-hidden="true" />05 / THE COLLECTION</span><span className="archive-rule" aria-hidden="true" /><span className="archive-motto">A DIFFERENT KIND OF FRAME.</span></div>
        <div className="collection-heading" data-cinema-reveal>
          <h2 id="gallery-heading" className="archive-display">FRAME BY<br /><span>FRAME.</span></h2>
          <div><p className="archive-deck">The speed. The stillness. The soul.</p><p className="archive-copy">A collection of defining portraits, racing identity and artistic interpretations. Look closer at the moments between the headlines.</p><span className="archive-micro">SELECT A FRAME TO EXPLORE</span></div>
        </div>
        <div className="collection-toolbar"><div className="archive-filters" role="group" aria-label="Filter gallery items">{categories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => { setCategory(item.id); setActiveIndex(null); }}>{item.label}</button>)}</div><p className="archive-micro" role="status" aria-live="polite">{String(items.length).padStart(2, '0')} FRAMES</p></div>
        <div className={`collection-grid ${category !== 'all' ? 'is-filtered' : ''}`}>
          {items.map((item, index) => <article key={`${category}-${item.id}`} className="collection-frame" data-image={item.id} data-cinema-reveal>
            <button className="collection-trigger" type="button" onClick={event => open(index, event)} aria-haspopup="dialog" aria-label={`Open image: ${item.title}`}>
              <div className="collection-image"><span className="collection-frame-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><img src={item.imageSrc} alt={item.altText} loading="lazy" decoding="async" /><span className="collection-open" aria-hidden="true">VIEW FRAME ↗</span><span className="collection-bg-word" aria-hidden="true">{item.id === 'scarlet' ? 'SCARLET' : item.id === 'victory' ? 'RISE' : item.id === 'goat-art' ? 'GOAT' : '44'}</span></div>
              <div className="collection-caption"><span className="archive-micro">{item.categoryLabel}</span><h3>{item.title}</h3><span className="archive-micro collection-caption-arrow" aria-hidden="true">↗</span></div>
            </button>
          </article>)}
        </div>
        <p className="collection-note">Portraits and artistic interpretations from the fan portfolio. Original cutouts are preserved in the full-view collection.</p>
      </div>
      {activeIndex !== null && <LightboxModal item={items[activeIndex]} onClose={close} onNext={() => setActiveIndex(index => index === null ? null : Math.min(index + 1, items.length - 1))} onPrev={() => setActiveIndex(index => index === null ? null : Math.max(index - 1, 0))} hasNext={activeIndex < items.length - 1} hasPrev={activeIndex > 0} />}
    </section>
  );
}
