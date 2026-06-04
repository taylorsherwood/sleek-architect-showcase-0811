import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { submitLeadToZapier, formatPhoneNumber, getPhoneDigits } from "@/lib/formUtils";

const OM_URL =
  "https://www.dropbox.com/scl/fi/i8a4ki4kf5u47jc2ts2v5/10811_SanJose_OM.pdf?rlkey=csnzq1z8uc3rt1w091r7k4z7v&dl=0";

const labelStyle: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontFamily: '"Jost", sans-serif',
  fontWeight: 700,
};

const ConfidentialOMGate = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await submitLeadToZapier({
      name,
      email,
      phone: getPhoneDigits(phone),
      message: "Requested confidential OM for 10811 San Jose Ave",
      source: "Confidential OM Request — 10811 San Jose Ave",
      extra: {
        listing: "10811 San Jose Ave, Del Valle TX",
        om_requested: true,
      },
    });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error || "Submission failed. Please try again.");
      return;
    }
    window.open(OM_URL, "_blank", "noopener,noreferrer");
    setOpen(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-foreground gold-underline-hover pb-0.5 hover:text-gold transition-colors"
        style={labelStyle}
      >
        CONFIDENTIAL OM →
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-background border-border/60">
          <DialogHeader>
            <p className="text-gold mb-2" style={labelStyle}>
              Confidential Offering Memorandum
            </p>
            <DialogTitle className="font-display text-2xl md:text-3xl font-normal text-architectural leading-[1.15]">
              10811 San Jose Ave
            </DialogTitle>
            <DialogDescription className="text-muted-foreground leading-relaxed pt-1">
              Please share your details to receive the confidential OM. The document will open immediately after submission.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-muted-foreground mb-1.5" style={labelStyle}>Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-border/60 bg-transparent px-3 py-2.5 text-foreground focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1.5" style={labelStyle}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border/60 bg-transparent px-3 py-2.5 text-foreground focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-muted-foreground mb-1.5" style={labelStyle}>Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                placeholder="(512) 555-0123"
                className="w-full border border-border/60 bg-transparent px-3 py-2.5 text-foreground focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-block border border-gold bg-gold px-7 py-3 text-white hover:bg-primary hover:border-primary transition-all duration-300 ease-out disabled:opacity-60"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: '"Jost", sans-serif',
                fontWeight: 500,
              }}
            >
              {submitting ? "Sending…" : "Submit & Access OM"}
            </button>

            <p className="text-xs text-muted-foreground/80 pt-1">
              Your information is kept confidential and used only to share property materials.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfidentialOMGate;
