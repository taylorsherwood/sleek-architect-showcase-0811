import { lazy, Suspense, useState, type FormEvent } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { trackLead } from "@/lib/analytics";
import cover from "@/assets/austin-relocation-cover-v2.webp.asset.json";
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
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Please try again later."); }
    finally { setBusy(false); }
  }
  return <><SEOHead title="Austin Relocation Guide" description="The 2026–2027 Austin Relocation Guide from Echelon Property Group: neighborhoods, schools, taxes, employers and your move." noindex /><Navigation />
    <main className="bg-background min-h-screen pt-32 md:pt-40 pb-16">
      {url ? <div className="container mx-auto px-4"><h1 className="font-serif text-2xl md:text-3xl text-center mb-6">Austin Relocation Guide</h1><Suspense fallback={<p role="status" className="text-center py-20">Opening your guide…</p>}><Flipbook url={url} /></Suspense></div> : <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="flex justify-center"><img src={cover.url} alt="Moving to Austin, 2026–2027 relocation guide cover" className="guide-cover" /></div>
        <div><p className="text-gold uppercase text-xs tracking-widest mb-5">2026–2027 Edition</p><h1 className="font-serif text-3xl md:text-4xl mb-5">Moving to Austin</h1><p className="text-muted-foreground mb-8">Neighborhoods, schools, taxes, employers and the move itself, for anyone making Austin home.</p>
          <form onSubmit={unlock} className="space-y-5">
            <div className="space-y-2"><Label htmlFor="guide-name">Name</Label><Input id="guide-name" name="name" autoComplete="name" required maxLength={200} /></div>
            <div className="space-y-2"><Label htmlFor="guide-email">Email</Label><Input id="guide-email" name="email" type="email" autoComplete="email" required maxLength={255} /></div>
            <div className="space-y-2"><Label htmlFor="guide-phone">Phone <span className="text-muted-foreground">(optional)</span></Label><Input id="guide-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={busy} className="w-full h-12 rounded-none">{busy ? "Opening your guide…" : "Open the guide"}</Button>
          </form>
        </div>
      </div>}
    </main><Footer /></>;
}