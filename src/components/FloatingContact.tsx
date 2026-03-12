import { useState } from "react";
import { X, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const HEADSHOT = "/lovable-uploads/537facb0-1fbc-450c-8c4a-c1d06c4aa924.jpg";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-primary text-primary-foreground rounded-none pl-2 pr-6 py-2 shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.2)] hover:shadow-[0_6px_28px_-4px_hsl(var(--foreground)/0.3)] transition-all duration-500 group cursor-pointer"
        aria-label="Connect with Taylor Sherwood"
      >
        <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-[hsl(var(--gold)/0.5)]">
          <img
            src={HEADSHOT}
            alt="Taylor Sherwood"
            className="w-full h-full object-cover object-[50%_35%] scale-[1.3]"
          />
        </div>
        <span className="text-[11px] font-light tracking-[0.2em] uppercase text-primary-foreground/90 group-hover:text-[hsl(var(--gold-light))] transition-colors duration-300">
          Private Consultation
        </span>
      </button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[360px] p-0 pt-16 border border-border/40 rounded-none overflow-visible bg-background shadow-[0_20px_50px_-12px_hsl(var(--foreground)/0.18)] [&>button]:hidden">
          <DialogTitle className="sr-only">Contact Taylor Sherwood</DialogTitle>

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 text-muted-foreground/60 hover:text-foreground transition-colors duration-300 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>

          {/* Avatar */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2">
            <div className="w-[104px] h-[104px] rounded-full overflow-hidden border-[3px] border-background shadow-[0_4px_16px_-4px_hsl(var(--foreground)/0.15)] ring-1 ring-[hsl(var(--gold)/0.35)]">
              <img
                src={HEADSHOT}
                alt="Taylor Sherwood"
                className="w-full h-full object-cover object-[50%_34%] scale-[1.22]"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center px-10 pb-10 pt-1">
            <h3 className="font-display text-[22px] font-light text-foreground tracking-[0.02em] mb-1">
              Taylor Sherwood
            </h3>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[hsl(var(--gold))] mb-5">
              Luxury Real Estate Advisor
            </p>
            <p className="text-muted-foreground text-[13px] leading-[1.7] mb-8 max-w-[260px] mx-auto">
              Questions about buying, selling, investing, or off-market opportunities? Let's connect.
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href="tel:5126613843"
                className="flex items-center justify-center gap-2.5 w-full py-3 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-light hover:bg-primary/90 transition-colors duration-300"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                Call or Text
              </a>
              <a
                href="mailto:taylor@echelonpropertygroup.com"
                className="flex items-center justify-center gap-2.5 w-full py-3 border border-foreground/20 text-foreground text-[10px] tracking-[0.2em] uppercase font-light hover:border-foreground/40 hover:bg-muted/30 transition-all duration-300"
              >
                <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                Email Me
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingContact;
