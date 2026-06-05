import { useEffect } from "react";

const HomeValuationInline = () => {
  // Lazy-load RealScout web component script when near viewport
  useEffect(() => {
    const target = document.getElementById("home-valuation");
    if (!target) return;
    const load = () => {
      if (document.querySelector('script[data-rs-hv="1"]')) return;
      const s = document.createElement("script");
      s.src = "https://em.realscout.com/widgets/realscout-web-components.umd.js";
      s.type = "module";
      s.async = true;
      s.setAttribute("data-rs-hv", "1");
      document.head.appendChild(s);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="home-valuation"
      className="py-20 md:py-24"
      style={{ background: "#f6f4f0", scrollMarginTop: "6rem" }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: "980px" }}>
        {/* Ornamental gold divider */}
        <div className="flex items-center justify-center gap-3 mb-9 md:mb-10" aria-hidden="true">
          <span className="block h-px w-16 md:w-20" style={{ background: "linear-gradient(to right, transparent, #b9a06c)" }} />
          <span className="block h-1.5 w-1.5 rotate-45" style={{ background: "#b9a06c" }} />
          <span className="block h-px w-6" style={{ background: "#b9a06c" }} />
          <span className="block h-2 w-2 rotate-45 border" style={{ borderColor: "#b9a06c" }} />
          <span className="block h-px w-6" style={{ background: "#b9a06c" }} />
          <span className="block h-1.5 w-1.5 rotate-45" style={{ background: "#b9a06c" }} />
          <span className="block h-px w-16 md:w-20" style={{ background: "linear-gradient(to left, transparent, #b9a06c)" }} />
        </div>

        <div className="max-w-[780px] mx-auto text-center mb-8 md:mb-10">
          <p className="text-minimal text-gold mb-4">COMPLIMENTARY VALUATION</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-primary leading-[1.1] mb-4 text-balance">
            What's Your Austin Property Worth?
          </h2>
          <p className="text-foreground/65 leading-relaxed max-w-2xl mx-auto text-base md:text-lg text-balance">
            A discreet, data-backed estimate informed by recent comparable sales and our private transaction insights.
          </p>
        </div>

        <style>{`
          #home-valuation realscout-home-value {
            --rs-hvw-background-color: hsl(var(--background));
            --rs-hvw-title-color: hsl(var(--foreground));
            --rs-hvw-subtitle-color: hsl(var(--muted-foreground));
            --rs-hvw-primary-button-text-color: hsl(var(--primary-foreground));
            --rs-hvw-primary-button-color: hsl(var(--primary));
            --rs-hvw-secondary-button-text-color: hsl(var(--primary));
            --rs-hvw-secondary-button-color: transparent;
            --rs-hvw-widget-width: min(100%, 940px);
            display: block;
            width: 100%;
            margin-left: auto !important;
            margin-right: auto !important;
            background: transparent;
          }
          #home-valuation .rs-widget-wrap {
            width: 100%;
            max-width: 940px;
            margin-left: auto;
            margin-right: auto;
          }
          #home-valuation realscout-home-value .wmhw-card {
            width: 100% !important;
            margin-inline: 0 !important;
            padding: 1.5rem !important;
            background: hsl(var(--background)) !important;
            border: 1px solid hsl(var(--border)) !important;
            border-radius: 6px !important;
            box-shadow: 0 10px 24px -24px hsl(var(--foreground) / 0.18) !important;
          }
          #home-valuation realscout-home-value .MuiInputBase-root,
          #home-valuation realscout-home-value .react-tel-input .form-control,
          #home-valuation realscout-home-value .react-select__control {
            min-height: 58px !important;
          }
          #home-valuation realscout-home-value .wmhw-primary-button {
            font-size: 14px !important;
          }
          @media (max-width: 768px) {
            #home-valuation .rs-widget-wrap {
              max-width: 100%;
            }
            #home-valuation realscout-home-value .wmhw-card {
              padding: 1.125rem !important;
            }
          }
        `}</style>
        <div
          id="home-valuation-widget"
          className="rs-widget-wrap"
          dangerouslySetInnerHTML={{
            __html:
              '<realscout-home-value disable-shadow-dom agent-encoded-id="QWdlbnQtMjg5NDU2" include-name include-phone remove-title remove-subtitle></realscout-home-value>',
          }}
        />

        <p className="text-center text-[11px] tracking-wide text-foreground/40 mt-4 max-w-md mx-auto">
          Your information is kept strictly confidential.
        </p>
      </div>
    </section>
  );
};

export default HomeValuationInline;
