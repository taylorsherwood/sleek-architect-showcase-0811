import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import echelonLogo from "@/assets/echelon-logo-gold.png";

const SellPrivateThankYou = () => {
  return (
    <div className="min-h-screen bg-[hsl(220,15%,8%)] flex flex-col">
      <SEOHead
        title="Thank You | Private Sale Inquiry"
        description="Your private sale inquiry has been received. We'll be in touch shortly with a confidential strategy for your Austin home."
        canonical="/sell-private/thank-you"
        noindex
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,15%,8%)]/60 backdrop-blur-[6px] border-b border-white/[0.03]">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="text-white/[0.85] hover:text-[hsl(var(--gold))] transition-colors tracking-[0.18em] uppercase font-sans"
            style={{ fontSize: "0.8rem" }}
          >
            Echelon Property Group
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pt-14">
        <div className="max-w-xl text-center py-20">
          <img
            src={echelonLogo}
            alt="Echelon Property Group"
            className="h-24 md:h-28 mx-auto mb-8"
            loading="eager"
          />
          <p
            className="text-[hsl(var(--gold))] mb-5 font-bold"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: '"Jost", sans-serif',
            }}
          >
            Inquiry Received
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            Thank You
          </h1>
          <p className="text-white/70 text-base md:text-lg font-light leading-relaxed mb-4">
            Your request has been received. A member of our team will reach out within 24 hours to begin a quiet, confidential conversation about your home.
          </p>
          <p className="text-white/50 text-sm md:text-base font-light leading-relaxed mb-10">
            All information shared remains private and is reviewed only by our advisory team.
          </p>
          <Link
            to="/"
            className="inline-block tracking-[0.2em] uppercase font-sans text-[hsl(var(--gold))] hover:text-white transition-colors border-b border-[hsl(var(--gold))]/40 hover:border-white/60 pb-1"
            style={{ fontSize: "0.7rem" }}
          >
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SellPrivateThankYou;
