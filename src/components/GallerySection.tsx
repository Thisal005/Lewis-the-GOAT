import React, { useState, useRef } from 'react';
import { GALLERY_ITEMS } from '../data/portfolioData';
import { LightboxModal } from './LightboxModal';

type GalleryCategory = 'all' | 'ferrari' | 'racing' | 'style';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const triggerElementRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const categories: { id: GalleryCategory; label: string }[] = [
    { id: 'all', label: 'All Media' },
    { id: 'ferrari', label: 'Scuderia Ferrari' },
    { id: 'racing', label: 'On Track Action' },
    { id: 'style', label: 'Style & Culture' },
  ];

  const handleOpenLightbox = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerElementRef.current = e.currentTarget;
    setActiveItemIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveItemIndex(null);
    triggerElementRef.current?.focus();
  };

  const handleNext = () => {
    if (activeItemIndex !== null && activeItemIndex < filteredItems.length - 1) {
      setActiveItemIndex(activeItemIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeItemIndex !== null && activeItemIndex > 0) {
      setActiveItemIndex(activeItemIndex - 1);
    }
  };

  return (
    <section id="gallery" className="gallery-section" aria-labelledby="gallery-heading">
      <div className="container">
        <div className="section-header">
          <div className="flex-between-wrap">
            <div>
              <span className="section-badge red">Visual Telemetry Archive</span>
              <h2 id="gallery-heading" className="section-title">
                Curated Photographic Archive
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="gallery-filters" role="group" aria-label="Filter gallery items">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={selectedCategory === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <p className="section-subtitle">
            From the cockpit intensity of championship battles to his red dawn at Scuderia Ferrari
            and global fashion appearances, explore high-fidelity archival imagery. Click any image to view in full detail.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <article key={item.id} className="gallery-card glass-card">
              <button
                type="button"
                className="gallery-card-trigger"
                onClick={(e) => handleOpenLightbox(index, e)}
                aria-haspopup="dialog"
                aria-label={`View full size: ${item.title}`}
              >
                <div className="gallery-image-frame">
                  <picture>
                    <source srcSet={item.webpSrc} type="image/webp" />
                    <img
                      src={item.imageSrc}
                      alt={item.altText}
                      loading="lazy"
                      className="gallery-thumbnail"
                      width="600"
                      height="400"
                    />
                  </picture>
                  <div className="gallery-zoom-badge" aria-hidden="true">
                    <span>🔍 Enlarge</span>
                  </div>
                </div>

                <div className="gallery-card-body">
                  <div className="flex-between-wrap mb-1">
                    <span className="gallery-tag">{item.categoryLabel}</span>
                    <span className="gallery-date font-mono">{item.dateOrYear}</span>
                  </div>
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <p className="gallery-item-caption">{item.caption}</p>
                </div>
              </button>
            </article>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItemIndex !== null && (
          <LightboxModal
            item={filteredItems[activeItemIndex]}
            onClose={handleCloseLightbox}
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={activeItemIndex < filteredItems.length - 1}
            hasPrev={activeItemIndex > 0}
          />
        )}
      </div>
    </section>
  );
};
