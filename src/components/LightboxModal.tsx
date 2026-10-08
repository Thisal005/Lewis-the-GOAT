import { useEffect, useRef, useState } from 'react';
import type { GalleryItem } from '../types';

interface LightboxModalProps { item: GalleryItem; onClose: () => void; onNext: () => void; onPrev: () => void; hasPrev: boolean; hasNext: boolean; }
export function LightboxModal({ item, onClose, onNext, onPrev, hasPrev, hasNext }: LightboxModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);
  const exitRef = useRef<Animation | null>(null);
  const [direction, setDirection] = useState('next');
  const close = () => {
    if (closingRef.current) return;
    const dialog = dialogRef.current;
    if (!dialog || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }
    closingRef.current = true;
    const animation = dialog.animate([{ opacity: 1, translate: '0 0' }, { opacity: 0, translate: '0 12px' }], { duration: 180, easing: 'ease-in', fill: 'forwards' });
    exitRef.current = animation;
    animation.finished.then(onClose).catch(() => {});
  };
  const next = () => { if (!closingRef.current) { setDirection('next'); onNext(); } };
  const prev = () => { if (!closingRef.current) { setDirection('prev'); onPrev(); } };
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { exitRef.current?.cancel(); dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return <dialog ref={dialogRef} className="cinema-lightbox" data-direction={direction} aria-labelledby="lightbox-title" aria-describedby="lightbox-caption" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => { if (event.key === 'ArrowRight' && hasNext) { event.preventDefault(); next(); } else if (event.key === 'ArrowLeft' && hasPrev) { event.preventDefault(); prev(); } }}>
    <div className="cinema-lightbox-inner">
      <div className="cinema-lightbox-top"><span className="archive-micro">THE COLLECTION / {item.categoryLabel}</span><button type="button" onClick={close} aria-label="Close image viewer">CLOSE <span aria-hidden="true">×</span></button></div>
      <div className="cinema-lightbox-stage" data-image={item.id}><img key={item.id} src={item.imageSrc} alt={item.altText} decoding="async" /></div>
      <div className="cinema-lightbox-bottom"><div key={item.id} className="cinema-lightbox-caption"><p className="archive-micro">{item.dateOrYear}</p><h3 id="lightbox-title">{item.title}</h3><p id="lightbox-caption">{item.caption}</p><p className="cinema-lightbox-credit">{item.credit}</p></div><div className="cinema-lightbox-controls"><button type="button" disabled={!hasPrev} onClick={prev} aria-label="Previous image">←</button><button type="button" disabled={!hasNext} onClick={next} aria-label="Next image">→</button></div></div>
    </div>
  </dialog>;
}
