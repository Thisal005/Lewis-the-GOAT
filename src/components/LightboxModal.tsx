import React, { useEffect, useRef } from 'react';
import type { GalleryItem } from '../types';

interface LightboxModalProps {
  item: GalleryItem;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus close button on open
    closeBtnRef.current?.focus();

    // Prevent background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-describedby="lightbox-caption"
    >
      <div className="lightbox-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="lightbox-content">
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close image modal (Press Escape)"
        >
          &times;
        </button>

        {/* Navigation Previous Button */}
        {hasPrev && (
          <button
            type="button"
            className="lightbox-nav-btn prev"
            onClick={onPrev}
            aria-label="Previous image (Left arrow)"
          >
            &#8249;
          </button>
        )}

        {/* Navigation Next Button */}
        {hasNext && (
          <button
            type="button"
            className="lightbox-nav-btn next"
            onClick={onNext}
            aria-label="Next image (Right arrow)"
          >
            &#8250;
          </button>
        )}

        {/* Main Image Frame */}
        <div className="lightbox-figure-container">
          <picture>
            <source srcSet={item.webpSrc} type="image/webp" />
            <img
              src={item.imageSrc}
              alt={item.altText}
              className="lightbox-img"
            />
          </picture>

          <div className="lightbox-caption-card">
            <div className="flex-between-wrap mb-1">
              <span className="section-badge red">{item.categoryLabel}</span>
              <span className="lightbox-date font-mono">{item.dateOrYear}</span>
            </div>
            <h3 id="lightbox-title" className="lightbox-title">
              {item.title}
            </h3>
            <p id="lightbox-caption" className="lightbox-desc">
              {item.caption}
            </p>
            <p className="lightbox-credit">
              Credit / Source: <span>{item.credit}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
