import { useState } from "react";
import { X, Phone, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const HEADSHOT = "/lovable-uploads/537facb0-1fbc-450c-8c4a-c1d06c4aa924.jpg";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-background border border-border rounded-full pl-1.5 pr-5 py-1.5 shadow-[0_8px_30px_-8px_hsl(var(--foreground)/0.15)] hover:shadow-[0_12px_40px_-8px_hsl(var(--foreground)/0.25)] transition-all duration-500 group cursor-pointer"
        aria-label="Connect with Taylor Sherwood"
      >
        <img
          src={HEADSHOT}
          alt="Taylor Sherwood"
          className="w-10 h-10 rounded-full object-cover border-2 border-[hsl(var(--gold))]"
        />
        <span className="text-minimal text-foreground group-hover:text-[hsl(var(--gold))] transition-colors duration-300 tracking-[0.15em]">
          Connect With Me
        </span>
      </button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm p-0 pt-14 border-none rounded-lg overflow-visible bg-background shadow-[0_30px_60px_-15px_hsl(var(--foreground)/0.25)] [&>button]:hidden">
          <DialogTitle className="sr-only">Contact Taylor Sherwood</DialogTitle>

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 z-10 rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Overlapping headshot */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <img
              src={HEADSHOT}
              alt="Taylor Sherwood"
              className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-[0_8px_24px_-6px_hsl(var(--foreground)/0.2)] ring-2 ring-[hsl(var(--gold)/0.4)]"
            />
          </div>

          {/* Content */}
          <div className="text-center px-8 pb-8 pt-2">
            <h3 className="font-display text-2xl text-architectural mb-2">
              Taylor Sherwood
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-[260px] mx-auto">
              I love talking home goals! Feel free to connect with me below.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="tel:5126613843"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-primary text-primary-foreground text-minimal tracking-[0.15em] hover:bg-primary/90 transition-colors duration-300 rounded-sm"
              >
                <Phone className="w-4 h-4" />
                Call or Text
              </a>
              <a
                href="mailto:taylor@echelonpropertygroup.com"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 border border-[hsl(var(--gold))] text-foreground text-minimal tracking-[0.15em] hover:bg-[hsl(var(--gold)/0.08)] transition-colors duration-300 rounded-sm"
              >
                <Mail className="w-4 h-4" />
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
