import { useEffect, useRef } from 'react';
import type { GalleryItem } from '../types';

interface LightboxModalProps { item: GalleryItem; onClose: () => void; onNext: () => void; onPrev: () => void; hasPrev: boolean; hasNext: boolean; }
export function LightboxModal({ item, onClose, onNext, onPrev, hasPrev, hasNext }: LightboxModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return <dialog ref={dialogRef} className="cinema-lightbox" aria-labelledby="lightbox-title" aria-describedby="lightbox-caption" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => { if (event.key === 'ArrowRight' && hasNext) { event.preventDefault(); onNext(); } else if (event.key === 'ArrowLeft' && hasPrev) { event.preventDefault(); onPrev(); } }}>
    <div className="cinema-lightbox-inner">
      <div className="cinema-lightbox-top"><span className="archive-micro">THE COLLECTION / {item.categoryLabel}</span><button type="button" onClick={onClose} aria-label="Close image viewer">CLOSE <span aria-hidden="true">×</span></button></div>
      <div className="cinema-lightbox-stage" data-image={item.id}><img key={item.id} src={item.imageSrc} alt={item.altText} decoding="async" /></div>
      <div className="cinema-lightbox-bottom"><div><p className="archive-micro">{item.dateOrYear}</p><h3 id="lightbox-title">{item.title}</h3><p id="lightbox-caption">{item.caption}</p><p className="cinema-lightbox-credit">{item.credit}</p></div><div className="cinema-lightbox-controls"><button type="button" disabled={!hasPrev} onClick={onPrev} aria-label="Previous image">←</button><button type="button" disabled={!hasNext} onClick={onNext} aria-label="Next image">→</button></div></div>
    </div>
  </dialog>;
}
