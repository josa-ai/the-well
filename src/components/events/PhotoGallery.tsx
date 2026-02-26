"use client";

import { useState, useEffect, useCallback } from "react";

type Photo = {
  url: string;
  alt: string;
  isPrimary: boolean;
};

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % photos.length : null
      ),
    [photos.length]
  );
  const goPrev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + photos.length) % photos.length : null
      ),
    [photos.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  if (photos.length <= 1) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {photos.map((photo, index) => (
          <button
            key={photo.url}
            onClick={() => setLightboxIndex(index)}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            <img
              src={photo.url}
              alt={photo.alt || `Photo ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Previous"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Next"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          <img
            src={photos[lightboxIndex].url}
            alt={photos[lightboxIndex].alt || ""}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
