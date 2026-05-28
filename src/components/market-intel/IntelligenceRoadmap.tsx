// Intelligence Roadmap
// -----------------------------------------------------------------------------
// Editorial preview of planned AgentIntel modules. Each entry is restrained:
// folio numeral, eyebrow, single-line summary, "In Development" stamp. No
// charts, no figures. Reads as a publisher's forthcoming masthead — not a
// product roadmap card grid.

const NAVY = "#0C0F24";
const GOLD = "#b9a06c";

interface PlannedModule {
  folio: string;
  eyebrow: string;
  title: string;
  summary: string;
}

const MODULES: PlannedModule[] = [
  {
    folio: "No. III",
    eyebrow: "Appreciation Index",
    title: "Long-Cycle Price Behavior",
    summary:
      "Multi-year HPI movement across Austin sub-markets, framed against national and metro peers to distinguish durable appreciation from cyclical noise.",
  },
  {
    folio: "No. IV",
    eyebrow: "Supply Pipeline",
    title: "What Is Coming to Market",
    summary:
      "Permits, starts, and project-level visibility on new construction and resale supply expected to enter Austin's luxury corridors over the next four to eight quarters.",
  },
  {
    folio: "No. V",
    eyebrow: "Jobs &amp; Migration",
    title: "Capital Following Capital",
    summary:
      "Employer expansion, executive relocations, and inbound household formation read as forward indicators of demand at the upper tier.",
  },
  {
    folio: "No. VI",
    eyebrow: "Gated PDF Briefings",
    title: "The Quarterly Market Letter",
    summary:
      "A private, sourced PDF briefing distributed to qualified subscribers each quarter, with submarket commentary, transaction notes, and advisory framing.",
  },
];

export const IntelligenceRoadmap = () => {
  return (
    <section
      className="relative pt-10 md:pt-14 pb-12 md:pb-16"
      aria-label="Intelligence roadmap"
    >
      <div className="max-w-5xl mx-auto px-2 md:px-0">
        {/* Masthead */}
        <div className="text-center mb-8 md:mb-10">
          <p
            className="text-[0.6rem] tracking-[0.46em] uppercase"
            style={{ color: GOLD }}
          >
            Intelligence Roadmap
          </p>
          <h2
            className="mt-5 font-display font-light leading-[1.06] tracking-tight max-w-2xl mx-auto"
            style={{ color: NAVY, fontSize: "clamp(1.5rem, 2.6vw, 2rem)" }}
          >
            Forthcoming Editions
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm md:text-[0.95rem] text-foreground/70 leading-relaxed">
            Modules planned for release across the coming quarters. Each is being
            developed to support advisory interpretation, not dashboard consumption.
          </p>
        </div>


        <ol className="max-w-3xl mx-auto">
          {MODULES.map((m, i) => (
            <li
              key={m.folio}
              className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 py-8 md:py-10"
              style={{
                borderTop: i === 0 ? `1px solid ${NAVY}14` : undefined,
                borderBottom: `1px solid ${NAVY}14`,
              }}
            >
              <span
                className="font-display italic text-[0.95rem] md:text-base pt-1 whitespace-nowrap"
                style={{ color: GOLD }}
              >
                {m.folio}
              </span>
              <div>
                <p
                  className="text-[0.6rem] tracking-[0.36em] uppercase mb-2"
                  style={{ color: GOLD }}
                  dangerouslySetInnerHTML={{ __html: m.eyebrow }}
                />
                <h3
                  className="font-display font-light leading-[1.15] mb-3"
                  style={{ color: NAVY, fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)" }}
                >
                  {m.title}
                </h3>
                <p className="text-sm md:text-[0.95rem] text-foreground/75 leading-relaxed max-w-2xl">
                  {m.summary}
                </p>
                <p
                  className="mt-4 text-[0.55rem] tracking-[0.36em] uppercase text-muted-foreground/70"
                >
                  In Development
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default IntelligenceRoadmap;
