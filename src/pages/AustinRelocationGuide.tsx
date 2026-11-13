import { lazy, Suspense, useState, type FormEvent } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackLead } from "@/lib/analytics";
import openingLeft from "@/assets/guide-opening-01.webp.asset.json";
import openingRight from "@/assets/guide-opening-02.webp.asset.json";
import "@/components/relocation-guide.css";
const Flipbook = lazy(() => import("@/components/RelocationFlipbook"));
const SESSION_KEY = "austin-relocation-guide-access-v2";
function storedAccess(): string {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    return saved && saved.expiresAt > Date.now() && typeof saved.url === "string" ? saved.url : "";
  } catch { return ""; }
}
export default function AustinRelocationGuide() {
  const [url, setUrl] = useState(storedAccess);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [gateOpen, setGateOpen] = useState(false);
  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim(), email = String(form.get("email") || "").trim(), phone = String(form.get("phone") || "").trim();
    setBusy(true); setError("");
    try {
      const { data, error: failure } = await supabase.functions.invoke("unlock-relocation-guide", { body: { name, email, phone, page_url: window.location.href } });
      if (failure || typeof data?.url !== "string") throw new Error(data?.error || "Your request could not be completed. Please try again later.");
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(data)); } catch { /* access still works without storage */ }
      trackLead({ source: "Austin Relocation Guide", email, phone: phone || undefined });
      setUrl(data.url);
      setGateOpen(false);
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Please try again later."); }
    finally { setBusy(false); }
  }
  return <><SEOHead title="Austin Relocation Guide" description="The 2026–2027 Austin Relocation Guide from Echelon Property Group: neighborhoods, schools, taxes, employers and your move." noindex /><Navigation />
    <main className="relocation-editorial bg-background min-h-screen pb-16">
      <header className="guide-masthead">
        <p className="text-gold text-xs mb-3">The Official Austin Relocation Guide 2026-2027 Edition</p>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground">Moving to Austin</h1>
        <p className="text-muted-foreground text-sm mt-3">A curated introduction to your next chapter in the live music capital.</p>
      </header>
      {url ? <div className="container mx-auto px-4"><Suspense fallback={<p role="status" className="text-center py-20">Opening your guide…</p>}><Flipbook url={url} /></Suspense></div> : <div className="guide-preview">
        <div className="guide-preview-stage" onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); setGateOpen(true); } }}>
          <Button variant="ghost" disabled size="icon" className="guide-preview-prev" aria-label="Previous page"><ArrowLeft /></Button>
          <Button variant="ghost" className="guide-opening-spread" aria-label="Turn the page to continue reading" onClick={() => setGateOpen(true)} onTouchStart={event => { event.currentTarget.dataset.touchX = String(event.touches[0]?.clientX); }} onTouchEnd={event => { const start = Number(event.currentTarget.dataset.touchX); const end = event.changedTouches[0]?.clientX; if (end !== undefined && Math.abs(end - start) > 30) setGateOpen(true); }}>
            <img src={openingLeft.url} alt="Moving to Austin, opening cover, page 1" width={1082} height={1400} fetchPriority="high" />
            <img src={openingRight.url} alt="Welcome to Austin, a letter from Taylor Sherwood, page 2" width={1082} height={1400} fetchPriority="high" />
          </Button>
          <Button variant="ghost" size="icon" className="guide-preview-next" aria-label="Next page" title="Next page" onClick={() => setGateOpen(true)}><ArrowRight /></Button>
        </div>
        <div className="guide-preview-caption"><span className="text-muted-foreground text-xs">01 — 02 <span className="mx-3 text-gold">/</span> 44</span><Button variant="link" className="text-foreground text-xs" onClick={() => setGateOpen(true)}>Read the full edition <ArrowRight /></Button></div>
      </div>}
      <Dialog open={gateOpen} onOpenChange={setGateOpen}>
        <DialogContent className="guide-access-dialog rounded-none sm:rounded-none border-0">
          <p className="text-gold uppercase text-xs mb-2">Your Austin chapter</p>
          <DialogTitle className="font-serif text-2xl md:text-3xl font-normal leading-snug">The full guide,<br />just for you.</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2 mb-4 leading-relaxed">Neighborhoods, schools, property taxes, and the details that make a move feel considered.</DialogDescription>
          <form onSubmit={unlock} className="guide-access-form space-y-5">
            <div className="space-y-2"><Label htmlFor="guide-name">Name</Label><Input id="guide-name" name="name" autoComplete="name" required maxLength={200} /></div>
            <div className="space-y-2"><Label htmlFor="guide-email">Email</Label><Input id="guide-email" name="email" type="email" autoComplete="email" required maxLength={255} /></div>
            <div className="space-y-2"><Label htmlFor="guide-phone">Phone <span className="text-muted-foreground">(optional)</span></Label><Input id="guide-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={busy} className="w-full h-12 rounded-none hover:bg-gold hover:text-primary">{busy ? "Opening your guide…" : "Continue reading"}<ArrowRight /></Button>
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="h-3 w-3" />Your details are kept private.</p>
          </form>
        </DialogContent>
      </Dialog>
    </main><Footer /></>;
}