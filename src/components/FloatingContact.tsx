import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { X, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import taylorHeadshot from "@/assets/taylor-headshot-widget.jpeg";

const HEADSHOT = taylorHeadshot;
const HEADSHOT_LAUNCHER = taylorHeadshot;

const SESSION_KEY = "echelon_advisory_bar_dismissed";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const isConnectPage = location.pathname === "/connect";

  // The floating widget only appears after the advisory bar has been dismissed
  const [advisoryDismissed, setAdvisoryDismissed] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1"
  );
  // Homepage-specific: hide when Private Opportunities banner is visible
  const [bannerVisible, setBannerVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onDismissed = () => setAdvisoryDismissed(true);
    window.addEventListener("advisory-bar-dismissed", onDismissed);

    let bannerObserver: IntersectionObserver | null = null;
    let heroObserver: IntersectionObserver | null = null;

    if (isHomepage) {
      const banner = document.getElementById("private-opportunities-banner");
      if (banner) {
        bannerObserver = new IntersectionObserver(
          ([entry]) => setBannerVisible(entry.isIntersecting),
          { threshold: 0 }
        );
        bannerObserver.observe(banner);
      }

      const hero = document.getElementById("hero-section");
      if (hero) {
        heroObserver = new IntersectionObserver(
          ([entry]) => setHeroVisible(entry.isIntersecting),
          { threshold: 0 }
        );
        heroObserver.observe(hero);
      }
    }

    // Hide when footer is visible
    const footer = document.querySelector("footer");
    let footerObserver: IntersectionObserver | null = null;
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => setFooterVisible(entry.isIntersecting),
        { threshold: 0 }
      );
      footerObserver.observe(footer);
    }

    return () => {
      window.removeEventListener("advisory-bar-dismissed", onDismissed);
      bannerObserver?.disconnect();
      heroObserver?.disconnect();
      footerObserver?.disconnect();
    };
  }, [isHomepage]);

  // Derive visibility: advisory must be dismissed, and on homepage the banner must not be visible
  useEffect(() => {
    if (delayTimer.current) clearTimeout(delayTimer.current);

    const shouldShow = advisoryDismissed && !isConnectPage && !footerVisible && (!isHomepage || !heroVisible);

    if (shouldShow) {
      delayTimer.current = setTimeout(() => setVisible(true), 1000);
    } else {
      setVisible(false);
    }

    return () => {
      if (delayTimer.current) clearTimeout(delayTimer.current);
    };
  }, [advisoryDismissed, isHomepage, bannerVisible, heroVisible, footerVisible]);

  return (
    <>
      {/* Launcher — dark concierge bar */}
      <button
        onClick={() => setOpen(true)}
        className={`hidden md:flex fixed bottom-8 right-7 z-[60] items-center gap-2.5 bg-background/95 backdrop-blur-sm text-[hsl(var(--gold))] rounded-full pl-1 pr-6 py-1 shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.1),0_1px_3px_hsl(var(--foreground)/0.06)] hover:bg-[hsl(var(--gold))] hover:text-background transition-all duration-500 ease-out group cursor-pointer border border-[hsl(var(--gold)/0.2)] hover:border-[hsl(var(--gold))] ${
          visible ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+2rem)] opacity-0 pointer-events-none"
        }`}
        aria-label="Connect with Taylor Sherwood">
        
        <div className="w-10 h-10 rounded-full overflow-hidden ring-[1.5px] ring-[hsl(var(--gold)/0.5)] group-hover:ring-background/80 transition-all duration-500">
          <img
            src={HEADSHOT_LAUNCHER}
            alt="Taylor Sherwood, Austin luxury real estate advisor"
            title="Contact Taylor Sherwood — Austin luxury real estate advisor"
            className="w-full h-full object-cover object-[50%_15%] scale-[1.35]"
            loading="lazy" decoding="async"
          />
        </div>
        <div className="flex flex-col items-start pl-0.5">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[hsl(var(--gold))] group-hover:text-background transition-colors duration-500 leading-tight" style={{ fontFamily: '"Jost", sans-serif' }}>CONTACT</span>
          <span className="text-[7.5px] tracking-[0.14em] uppercase text-[hsl(var(--gold)/0.6)] group-hover:text-background/70 font-medium leading-tight mt-0.5" style={{ fontFamily: '"Jost", sans-serif' }}>
            PRIVATE ADVISOR
          </span>
        </div>
      </button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[380px] p-0 pt-[72px] border-none rounded-sm overflow-visible bg-background shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.25),0_0_0_1px_hsl(var(--foreground)/0.04)] [&>button]:hidden">
          <DialogTitle className="sr-only">Contact Taylor Sherwood</DialogTitle>

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 text-muted-foreground/40 hover:text-foreground transition-colors duration-300 cursor-pointer"
            aria-label="Close">
            <X className="w-4 h-4" strokeWidth={1.25} />
          </button>

          {/* Avatar */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.3)] ring-1 ring-[hsl(var(--gold)/0.3)] border-[3.5px] border-background">
              <img
                src={HEADSHOT}
                alt="Taylor Sherwood, founder of Echelon Property Group"
                title="Taylor Sherwood — Echelon Property Group"
                className="w-full h-full object-cover object-[50%_15%] scale-[1.35]"
                    loading="lazy" decoding="async"
                    />
            </div>
          </div>

          {/* Thin gold accent line */}
          <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-10 h-px bg-[hsl(var(--gold)/0.35)]" />

          {/* Content */}
          <div className="text-center px-10 pb-10 pt-4">
            <h3 className="font-display text-2xl font-light text-foreground tracking-[0.01em] leading-tight">
              Taylor Sherwood
            </h3>
            <p className="text-[9.5px] tracking-[0.25em] uppercase text-[hsl(var(--gold))] mt-2 mb-6 font-normal">CONNECT WITH AN ADVISOR</p>
            <p className="text-muted-foreground text-sm leading-[1.75] mb-9 max-w-[270px] mx-auto font-light">Buying, selling, investing, or exploring off-market opportunities in Austin— I'd welcome the conversation.</p>

            <div className="flex flex-col gap-3">
              <a
                href="tel:5126613843"
                className="flex items-center justify-center gap-3 w-full py-3.5 bg-primary text-primary-foreground text-[10.5px] tracking-[0.2em] uppercase font-light hover:bg-primary/85 transition-all duration-300 rounded-[2px]">
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                Call or Text
              </a>
              <a
                href="mailto:taylor@echelonpropertygroup.com"
                className="flex items-center justify-center gap-3 w-full py-3.5 border border-[hsl(var(--gold)/0.3)] text-foreground text-[10.5px] tracking-[0.2em] uppercase font-light hover:border-[hsl(var(--gold)/0.6)] hover:bg-[hsl(var(--gold)/0.04)] transition-all duration-300 rounded-[2px]">
                <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                Send an Email
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingContact;
