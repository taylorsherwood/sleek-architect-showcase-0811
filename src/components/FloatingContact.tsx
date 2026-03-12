import { useState } from "react";
import { X, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const HEADSHOT = "/lovable-uploads/taylor-headshot-widget.jpg";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Launcher — dark concierge bar */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-7 right-7 z-40 flex items-center gap-3 bg-background text-[hsl(var(--gold))] rounded-full pl-1.5 pr-7 py-1.5 shadow-[0_6px_24px_-2px_hsl(var(--foreground)/0.12)] hover:bg-[hsl(var(--gold))] hover:text-background transition-all duration-500 group cursor-pointer border border-[hsl(var(--gold)/0.3)] hover:border-[hsl(var(--gold))]"
        aria-label="Connect with Taylor Sherwood"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden ring-[1.5px] ring-[hsl(var(--gold)/0.45)] shadow-[0_0_0_2px_hsl(var(--primary))]">
          <img
            src={HEADSHOT}
            alt="Taylor Sherwood"
            className="w-full h-full object-cover object-[50%_25%] scale-[1.15]"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[11.5px] font-light tracking-[0.22em] uppercase text-[hsl(var(--gold))] group-hover:text-background transition-colors duration-500 leading-tight">
            Connect
          </span>
          <span className="text-[8.5px] tracking-[0.15em] uppercase text-[hsl(var(--gold)/0.7)] group-hover:text-background/80 font-light leading-tight mt-0.5">
            Private Client
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
            aria-label="Close"
          >
            <X className="w-4 h-4" strokeWidth={1.25} />
          </button>

          {/* Avatar — large, prominent, luxury portrait */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.3)] ring-1 ring-[hsl(var(--gold)/0.3)] border-[3.5px] border-background">
              <img
                src={HEADSHOT}
                alt="Taylor Sherwood"
                className="w-full h-full object-cover object-[50%_22%] scale-[1.1]"
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
            <p className="text-[9.5px] tracking-[0.25em] uppercase text-[hsl(var(--gold))] mt-2 mb-6 font-normal">
              Austin Luxury Real Estate
            </p>
            <p className="text-muted-foreground text-sm leading-[1.75] mb-9 max-w-[270px] mx-auto font-light">
              Buying, selling, investing, or exploring off-market opportunities — I'd welcome the conversation.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="tel:5126613843"
                className="flex items-center justify-center gap-3 w-full py-3.5 bg-primary text-primary-foreground text-[10.5px] tracking-[0.2em] uppercase font-light hover:bg-primary/85 transition-all duration-300 rounded-[2px]"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                Call or Text
              </a>
              <a
                href="mailto:taylor@echelonpropertygroup.com"
                className="flex items-center justify-center gap-3 w-full py-3.5 border border-[hsl(var(--gold)/0.3)] text-foreground text-[10.5px] tracking-[0.2em] uppercase font-light hover:border-[hsl(var(--gold)/0.6)] hover:bg-[hsl(var(--gold)/0.04)] transition-all duration-300 rounded-[2px]"
              >
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
