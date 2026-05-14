import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ListingMedia } from "@/types/listing";

interface LightboxProps {
  media: ListingMedia[];
  startIndex: number;
  onClose: () => void;
}

const Lightbox = ({ media, startIndex, onClose }: LightboxProps) => {
  const [idx, setIdx] = useState(startIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prev = () => setIdx((i) => (i - 1 + media.length) % media.length);
  const next = () => setIdx((i) => (i + 1) % media.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const item = media[idx];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0C0F24] flex flex-col"
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart === null) return;
        const dx = e.changedTouches[0].clientX - touchStart;
        if (dx > 50) prev();
        else if (dx < -50) next();
        setTouchStart(null);
      }}
    >
      {/* Hairline top chrome */}
      <div className="flex items-center justify-between px-5 md:px-8 py-5 md:py-6 text-background">
        <span className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase opacity-55">
          {String(idx + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          className="p-2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div key={idx} className="flex-1 flex items-center justify-center px-4 pb-4 relative ls-slide-in">
        <button
          onClick={prev}
          className="hidden md:flex absolute left-6 z-10 p-3 text-background/55 hover:text-gold transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-7 h-7" strokeWidth={1.25} />
        </button>

        <img
          src={item.media_url}
          alt={item.alt_text || item.caption || ""}
          className="max-h-full max-w-full object-contain select-none"
          draggable={false}
        />

        <button
          onClick={next}
          className="hidden md:flex absolute right-6 z-10 p-3 text-background/55 hover:text-gold transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-7 h-7" strokeWidth={1.25} />
        </button>
      </div>

      {item.caption && (
        <div className="text-center pb-8 px-6">
          <p className="text-background/65 text-[10px] tracking-[0.4em] uppercase font-body">
            {item.caption}
          </p>
        </div>
      )}
    </div>
  );
};

export default Lightbox;
