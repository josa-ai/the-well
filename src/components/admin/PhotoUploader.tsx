"use client";

import { useState, useCallback } from "react";
import { upload } from "@vercel/blob/client";

type Photo = {
  id?: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
};

type Props = {
  eventId?: string;
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  maxPhotos?: number;
};

export default function PhotoUploader({
  eventId,
  photos,
  onChange,
  maxPhotos = 4,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    async (files: FileList) => {
      if (photos.length + files.length > maxPhotos) {
        alert(`Maximum ${maxPhotos} photos allowed`);
        return;
      }

      setUploading(true);
      try {
        const newPhotos: Photo[] = [];

        for (const file of Array.from(files)) {
          if (!file.type.startsWith("image/")) continue;
          if (file.size > 5 * 1024 * 1024) {
            alert(`${file.name} is too large (max 5MB)`);
            continue;
          }

          const blob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/upload",
          });

          const photo: Photo = {
            url: blob.url,
            alt: "",
            isPrimary: photos.length === 0 && newPhotos.length === 0,
            order: photos.length + newPhotos.length,
          };

          // If editing an existing event, save to DB immediately
          if (eventId) {
            const res = await fetch(`/api/events/${eventId}/photos`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(photo),
            });
            const saved = await res.json();
            newPhotos.push({ ...photo, id: saved.id });
          } else {
            newPhotos.push(photo);
          }
        }

        onChange([...photos, ...newPhotos]);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Failed to upload photos");
      } finally {
        setUploading(false);
      }
    },
    [photos, onChange, eventId, maxPhotos]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleSetPrimary(index: number) {
    const updated = photos.map((p, i) => ({
      ...p,
      isPrimary: i === index,
    }));
    onChange(updated);
  }

  async function handleRemove(index: number) {
    const photo = photos[index];

    // Delete from DB if it has an ID
    if (photo.id && eventId) {
      await fetch(`/api/events/${eventId}/photos?photoId=${photo.id}`, {
        method: "DELETE",
      });
    }

    const updated = photos.filter((_, i) => i !== index);
    // If we removed the primary, make the first one primary
    if (photo.isPrimary && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    onChange(updated);
  }

  return (
    <div>
      {/* Drop zone */}
      {photos.length < maxPhotos && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragOver
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
              : "border-[var(--color-border)] hover:border-[var(--color-primary)]/40"
          }`}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.accept = "image/jpeg,image/png,image/webp,image/avif";
            input.onchange = (e) => {
              const files = (e.target as HTMLInputElement).files;
              if (files) handleFiles(files);
            };
            input.click();
          }}
        >
          {uploading ? (
            <div className="flex items-center justify-center gap-2 text-[var(--color-text-muted)]">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Uploading...
            </div>
          ) : (
            <>
              <svg className="w-8 h-8 mx-auto text-[var(--color-text-muted)]/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-sm text-[var(--color-text-muted)]">
                Drop images here or click to browse
              </p>
              <p className="text-xs text-[var(--color-text-muted)]/60 mt-1">
                JPEG, PNG, WebP, AVIF — max 5MB each — {maxPhotos - photos.length} remaining
              </p>
            </>
          )}
        </div>
      )}

      {/* Photo thumbnails */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {photos.map((photo, index) => (
            <div
              key={photo.url}
              className={`relative group rounded-lg overflow-hidden border-2 transition-colors ${
                photo.isPrimary
                  ? "border-[var(--color-secondary)]"
                  : "border-[var(--color-border)]"
              }`}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full aspect-square object-cover"
              />

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSetPrimary(index)}
                  className={`p-1.5 rounded-full ${
                    photo.isPrimary
                      ? "bg-[var(--color-secondary)] text-white"
                      : "bg-white/90 text-[var(--color-text)] hover:bg-[var(--color-secondary)] hover:text-white"
                  } transition-colors`}
                  title={photo.isPrimary ? "Primary photo" : "Set as primary"}
                >
                  <svg className="w-4 h-4" fill={photo.isPrimary ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-1.5 rounded-full bg-white/90 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  title="Remove photo"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Primary badge */}
              {photo.isPrimary && (
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[var(--color-secondary)] text-white text-[10px] font-medium rounded">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
