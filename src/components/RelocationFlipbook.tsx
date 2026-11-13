import { forwardRef, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { ArrowLeft, ArrowRight, Maximize, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./relocation-guide.css";

GlobalWorkerOptions.workerSrc = workerUrl;
const PDFPage = forwardRef<HTMLDivElement, { pdf: PDFDocumentProxy; number: number; active: boolean }>(({ pdf, number, active }, ref) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let render: ReturnType<Awaited<ReturnType<PDFDocumentProxy["getPage"]>>["render"]> | undefined;
    pdf.getPage(number).then(page => {
      if (cancelled || !canvas.current) return;
      const viewport = page.getViewport({ scale: Math.min(2, Math.max(1.2, window.devicePixelRatio || 1)) });
      const context = canvas.current.getContext("2d");
      if (!context) return;
      canvas.current.width = viewport.width; canvas.current.height = viewport.height;
      render = page.render({ canvasContext: context, viewport });
      return render.promise;
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; render?.cancel(); };
  }, [pdf, number, active]);
  return <div ref={ref} className="guide-page" aria-label={`Guide page ${number}`}>
    {failed ? <p>Page unavailable.</p> : <canvas ref={canvas} role="img" aria-label={`Austin Relocation Guide, page ${number}`} />}
  </div>;
});
PDFPage.displayName = "PDFPage";

let audio: AudioContext | undefined;
function playPageTurn() {
  try {
    audio ??= new AudioContext();
    const ctx = audio, length = Math.floor(ctx.sampleRate * 0.35);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate), data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) { const t = i / length; data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) ** 2 * (1 - t * 0.6); }
    const source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
    filter.type = "bandpass"; filter.frequency.setValueAtTime(2400, ctx.currentTime); filter.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.35); filter.Q.value = 0.7;
    gain.gain.value = 0.18; source.buffer = buffer;
    source.connect(filter).connect(gain).connect(ctx.destination); source.start();
  } catch { /* sound is optional */ }
}

type BookHandle = { pageFlip: () => { flipNext: () => void; flipPrev: () => void; turnToPage: (page: number) => void } };
export default function RelocationFlipbook({ url }: { url: string }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy>();
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const book = useRef<BookHandle>(null);
  const reader = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    let cancelled = false;
    const task = getDocument({ url, disableAutoFetch: true, rangeChunkSize: 262144 });
    task.promise.then(document => {
      if (!cancelled) { setError(""); setPdf(document); }
    }).catch(() => {
      if (!cancelled) setError("The guide could not load. Please refresh to request access again.");
    });
    return () => { cancelled = true; void task.destroy(); };
  }, [url]);
  useEffect(() => {
    if (!pdf) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) return;
      const flip = book.current?.pageFlip();
      if (!flip) return;
      if (e.key === "ArrowRight") { e.preventDefault(); reduced ? flip.turnToPage(Math.min(pdf.numPages - 1, page + 1)) : flip.flipNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); reduced ? flip.turnToPage(Math.max(0, page - 1)) : flip.flipPrev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pdf, page, reduced]);
  if (error) return <p role="alert" className="py-16 text-center">{error}</p>;
  if (!pdf) return <div role="status" className="flex items-center justify-center gap-3 py-24"><Loader2 className="animate-spin" /> Opening your guide…</div>;
  return <div ref={reader} className="guide-reader">
    <div className="flex flex-wrap items-center justify-center gap-3 py-5">
      <Button variant="outline" size="icon" title="Previous page" aria-label="Previous page" disabled={page === 0} onClick={() => reduced ? book.current?.pageFlip().turnToPage(Math.max(0, page - 1)) : book.current?.pageFlip().flipPrev()}><ArrowLeft /></Button>
      <label className="flex items-center gap-2 text-sm">Page <select aria-label="Go to page" value={page} className="bg-background border border-input p-2" onChange={e => book.current?.pageFlip().turnToPage(Number(e.target.value))}>{Array.from({ length: pdf.numPages }, (_, i) => <option key={i} value={i}>{i + 1}</option>)}</select> / {pdf.numPages}</label>
      <Button variant="outline" size="icon" title="Next page" aria-label="Next page" disabled={page === pdf.numPages - 1} onClick={() => reduced ? book.current?.pageFlip().turnToPage(Math.min(pdf.numPages - 1, page + 1)) : book.current?.pageFlip().flipNext()}><ArrowRight /></Button>
      <Button variant="ghost" size="icon" title={zoom ? "Zoom out" : "Zoom in"} aria-label={zoom ? "Zoom out" : "Zoom in"} onClick={() => setZoom(!zoom)}>{zoom ? <ZoomOut /> : <ZoomIn />}</Button>
      <Button variant="ghost" size="icon" title="Fullscreen" aria-label="Fullscreen" onClick={() => { if (document.fullscreenElement) void document.exitFullscreen(); else void reader.current?.requestFullscreen?.().catch(() => undefined); }}><Maximize /></Button>
    </div>
    {zoom ? <div className="guide-zoom"><PDFPage pdf={pdf} number={page + 1} active /></div> : <div className="guide-book-shell"><HTMLFlipBook ref={book} width={460} height={595} size="stretch" minWidth={260} maxWidth={560} minHeight={337} maxHeight={725} startPage={page} drawShadow={false} flippingTime={reduced ? 1 : 650} usePortrait startZIndex={0} autoSize maxShadowOpacity={0} showCover mobileScrollSupport clickEventForward useMouseEvents swipeDistance={30} showPageCorners={!reduced} disableFlipByClick={false} className="guide-book" style={{}} onFlip={e => { setPage(e.data); playPageTurn(); }}>
      {Array.from({ length: pdf.numPages }, (_, i) => <PDFPage key={i} pdf={pdf} number={i + 1} active={i - page <= 3 && page - i <= 1} />)}
    </HTMLFlipBook></div>}
  </div>;
}