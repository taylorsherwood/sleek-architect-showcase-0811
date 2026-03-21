import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { formatPhoneNumber, buildWeb3Payload } from "@/lib/formUtils";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription } from
"@/components/ui/dialog";

const SESSION_KEY = "echelon_advisory_bar_dismissed";
const SCROLL_THRESHOLD = 0.4;

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
});

const HIDDEN_ROUTES = ["/contact", "/connect", "/austin-multifamily-report-2026"];

const AdvisoryBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", lookingFor: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const dismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    window.dispatchEvent(new CustomEvent("advisory-bar-dismissed"));
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      const hero = document.getElementById("hero") || document.querySelector("section");
      const triggerPoint = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      const pastHero = window.scrollY >= triggerPoint;

      // On homepage: show only when scrolled past hero, hide when back at hero
      if (isHomePage) {
        setVisible(pastHero);
      } else {
        // On other pages, show once past equivalent scroll depth
        if (pastHero) setVisible(true);
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setVisible(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildWeb3Payload({
          accessKey: "5728f4e2-7269-4f9f-8a06-62557292e699",
          subject: "New Private List Request — Advisory Bar",
          name: form.name,
          email: form.email,
          phone: form.phone,
          source: "Homepage Advisory Bar",
          extra: form.lookingFor.trim() ? { looking_for: form.lookingFor.trim() } : {},
        }))
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        dismiss();
      } else {
        toast({
          title: "Submission Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isHiddenRoute = HIDDEN_ROUTES.includes(location.pathname);
  if (isHiddenRoute || dismissed) return null;

  return (
    <>
      {/* Advisory bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          opacity: visible ? 1 : 0,
        }}>
        
        {/* Gold divider */}
        <div className="h-[1.5px] bg-[hsl(var(--gold)/0.7)]" />

        <div className="bg-primary h-20 flex items-center">
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-primary-foreground font-semibold text-sm md:text-base leading-tight truncate">
                See Austin Homes Before They Hit Zillow
              </p>
              <p className="text-primary-foreground/70 text-xs md:text-sm leading-tight mt-0.5 hidden sm:block truncate">
                Private + off-market homes, development sites, and investment opportunities
              </p>
            </div>

            {/* CTA + microcopy + close */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-5 py-2 text-sm font-medium text-primary-foreground border border-primary-foreground rounded transition-all duration-200 hover:bg-[hsl(var(--gold))] hover:border-[hsl(var(--gold))] hover:text-white hover:font-bold hero-cta-btn">
                  GET ACCESS
                </button>
                <span className="text-primary-foreground/60 text-[11px] tracking-wide mt-1 hidden sm:block">
                  Takes 10 seconds · No spam
                </span>
              </div>
              <button
                onClick={dismiss}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Dismiss">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md bg-primary border-[hsl(var(--gold)/0.3)] gap-6">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-primary-foreground text-xl">
              Get Access to Private Listings in Austin
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/70">
              See off-market homes and investment opportunities handpicked for you before they hit Zillow.
            </DialogDescription>
            <p className="text-[hsl(var(--gold))] text-xs tracking-widest uppercase font-medium mt-1">
            </p>
          </DialogHeader>

          {submitted ?
          <div className="py-6 text-center">
              <p className="text-primary-foreground font-semibold text-lg mb-2">
                You're on the list.
              </p>
              <p className="text-primary-foreground/70 text-sm">
                We'll be in touch with exclusive opportunities soon.
              </p>
            </div> :

          <>
            {/* Value bullets */}
            <div className="flex flex-col gap-2.5 mt-2 mb-4">
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <span className="text-[hsl(var(--gold))]">✔</span> Off-market homes
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <span className="text-[hsl(var(--gold))]">✔</span> Development + investment deals
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <span className="text-[hsl(var(--gold))]">✔</span> Sent directly to you
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-primary-foreground/80 text-sm font-medium">
                Where should we send your curated listings?
              </p>
              <div>
                <input
                type="text"
                placeholder="First Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
                {errors.name &&
              <p className="text-destructive text-xs mt-1">{errors.name}</p>
              }
              </div>
              <div>
                <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
                {errors.email &&
              <p className="text-destructive text-xs mt-1">{errors.email}</p>
              }
              </div>
              <div>
                <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
                maxLength={20}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
                {errors.phone &&
              <p className="text-destructive text-xs mt-1">{errors.phone}</p>
              }
              </div>
              <div>
                <input
                type="text"
                placeholder="Budget, areas, property type (optional)"
                value={form.lookingFor}
                onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}
                maxLength={200}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
              </div>
              <div className="pt-2">
                <button
                type="submit"
                disabled={submitting}
                className="w-full px-5 py-3 text-sm font-medium text-primary-foreground border border-primary-foreground rounded transition-all duration-200 hover:bg-[hsl(var(--gold))] hover:border-[hsl(var(--gold))] hover:text-white hover:font-bold disabled:opacity-50 hero-cta-btn">
                  {submitting ? "Submitting…" : "GET ACCESS"}
                </button>
              </div>
              <p className="text-primary-foreground/40 text-xs text-center">
                No spam. Just relevant opportunities.
              </p>
            </form>
          </>
          }
        </DialogContent>
      </Dialog>

    </>);

};

export default AdvisoryBar;