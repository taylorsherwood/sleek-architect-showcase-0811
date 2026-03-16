import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
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
  email: z.string().trim().email("Please enter a valid email").max(255)
});

const HIDDEN_ROUTES = ["/contact", "/austin-multifamily-report-2026"];

const AdvisoryBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const isHiddenRoute = HIDDEN_ROUTES.includes(location.pathname);

  const dismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && window.scrollY / docHeight >= SCROLL_THRESHOLD) {
        setVisible(true);
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
        body: JSON.stringify({
          access_key: "5728f4e2-7269-4f9f-8a06-62557292e699",
          subject: "New Private List Request — Advisory Bar",
          from_name: "Echelon Property Group Website",
          to: "taylor@echelonpropertygroup.com,echelonpropertygroup@followupboss.me",
          name: form.name,
          email: form.email,
          source: "Homepage Advisory Bar"
        })
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

  if (isHiddenRoute || dismissed || !visible) return null;

  return (
    <>
      {/* Advisory bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
        style={{
          animation: "slideUp 300ms ease forwards"
        }}>
        
        {/* Gold divider */}
        <div className="h-[2px] bg-[hsl(var(--gold))]" />

        <div className="bg-primary h-20 flex items-center">
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-primary-foreground font-semibold text-sm md:text-base leading-tight truncate">
                Access Private Austin Opportunities
              </p>
              <p className="text-primary-foreground/70 text-xs md:text-sm leading-tight mt-0.5 hidden sm:block truncate">Become an Echelon Insider to join our private list for off-market homes, development sites, and investment opportunities across Austin.

              </p>
            </div>

            {/* CTA + close */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className="px-5 py-2 text-sm font-medium text-primary-foreground border border-primary-foreground rounded transition-all duration-200 hover:bg-primary-foreground hover:text-primary hover:font-bold">
                
                BECOME AN INSIDER
              </button>
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
        <DialogContent className="sm:max-w-md bg-primary border-[hsl(var(--gold)/0.3)]">
          <DialogHeader>
            <DialogTitle className="text-primary-foreground text-xl">
              Request Private Access
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/70">
              Get exclusive access to off-market listings and investment opportunities in Austin.
            </DialogDescription>
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

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <input
                type="text"
                placeholder="Full Name"
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
              <button
              type="submit"
              disabled={submitting}
              className="w-full px-5 py-3 text-sm font-medium text-primary-foreground border border-primary-foreground rounded transition-all duration-200 hover:bg-primary-foreground hover:text-primary hover:font-bold disabled:opacity-50">
              
                {submitting ? "Submitting…" : "Request Access"}
              </button>
            </form>
          }
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>);

};

export default AdvisoryBar;