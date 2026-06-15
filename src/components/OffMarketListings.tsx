import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import falconheadAsset from "@/assets/falconhead.jpg.asset.json";
import ScrollReveal from "@/components/ScrollReveal";
import overlookPassAsset from "@/assets/overlook-pass.jpg.asset.json";
import horseshoeBayAsset from "@/assets/horseshoe-bay.avif.asset.json";
import { formatPhoneNumber, submitLeadToZapier } from "@/lib/formUtils";

type OffMarketProperty = {
  image?: string;
  badge: string;
  name: string;
  subtitle: string;
  link: string;
};

const properties: OffMarketProperty[] = [
  {
    image: overlookPassAsset.url,
    badge: "COMING SOON",
    name: "Overlook Pass",
    subtitle: "7.9 acres · 9,800 SF · $9,800,000",
    link: "/contact",
  },
  {
    image: horseshoeBayAsset.url,
    badge: "UNDER CONTRACT",
    name: "Horseshoe Bay",
    subtitle: "5,755 SF · $5,750,000",
    link: "/contact",
  },
  {
    image: falconheadAsset.url,
    badge: "COMING SOON",
    name: "Falconhead",
    subtitle: "3,500 SF · $1,100,000",
    link: "/contact",
  },
];

const UNLOCK_KEY = "offmarket-unlocked-v1";

const PadlockIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#b9a06c"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="10.5" width="16" height="11" rx="1.5" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </svg>
);

const OffMarketListings = ({ className }: { className?: string }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await submitLeadToZapier({
      name,
      email,
      phone,
      message: "Requested access to off-market Echelon listings",
      source: "Off-Market Listings Gate (/search)",
    });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error || "Something went wrong. Please try again.");
      return;
    }
    try {
      localStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      /* noop */
    }
    setUnlocked(true);
    setOpen(false);
  };

  return (
    <section
      className={`bg-background ${className || ""}`}
      style={{ padding: "clamp(80px, 12vw, 120px) 0" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center" style={{ marginBottom: "clamp(56px, 8vw, 80px)" }}>
              <p
                className="text-gold mb-5"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                }}
              >
                Private Inventory
              </p>
              <h2
                className="font-display font-normal text-architectural"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "0.02em",
                  marginBottom: "1.75rem",
                }}
              >
                Off-Market Echelon Listings
              </h2>
              <div
                aria-hidden="true"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  margin: "0 auto",
                }}
              >
                <span style={{ width: "64px", height: "1px", background: "linear-gradient(to right, transparent, #b9a06c)" }} />
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#b9a06c",
                    transform: "rotate(45deg)",
                    display: "inline-block",
                  }}
                />
                <span style={{ width: "64px", height: "1px", background: "linear-gradient(to left, transparent, #b9a06c)" }} />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px" }}>
            {properties.map((p, index) => {
              const cardInner = (
                <>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={unlocked ? p.name : ""}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), filter 600ms ease",
                        filter: unlocked ? "none" : "blur(22px)",
                        transform: unlocked ? undefined : "scale(1.08)",
                      }}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, #0C0F24 0%, #1a1f3a 50%, #0C0F24 100%)",
                      }}
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,12,0.78) 0%, rgba(10,10,12,0.3) 50%, rgba(10,10,12,0.08) 100%)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="expertise-card__darken absolute inset-0 opacity-0 transition-opacity duration-700"
                    style={{ background: "rgba(10,10,12,0.14)" }}
                  />
                  {!unlocked && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div
                        className="flex items-center justify-center rounded-full"
                        style={{
                          width: "72px",
                          height: "72px",
                          background: "rgba(10,10,12,0.45)",
                          border: "1px solid rgba(185, 160, 108, 0.5)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#b9a06c"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="4" y="10.5" width="16" height="11" rx="1.5" />
                          <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div
                    className="absolute inset-0 flex flex-col justify-end"
                    style={{ padding: "clamp(24px, 3.5vw, 40px)" }}
                  >
                    <p
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "#b9a06c",
                        marginBottom: "0.875rem",
                      }}
                    >
                      {p.badge}
                    </p>
                    <h3
                      style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                        fontWeight: 400,
                        lineHeight: 1.15,
                        letterSpacing: "0.02em",
                        color: "#FAFAF8",
                        marginBottom: "0.875rem",
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "0.95rem",
                        fontWeight: 300,
                        lineHeight: 1.6,
                        color: "rgba(250, 250, 248, 0.9)",
                        maxWidth: "400px",
                        marginBottom: "1.5rem",
                        textAlign: "left",
                      }}
                    >
                      {p.subtitle}
                    </p>
                    <span
                      className="expertise-card__cta inline-flex items-center"
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#b9a06c",
                        position: "relative",
                        paddingBottom: "8px",
                        alignSelf: "flex-start",
                        gap: "8px",
                      }}
                    >
                      
                      <span style={{ position: "relative" }}>
                        {unlocked ? "Inquire →" : "Request access →"}
                        <span
                          aria-hidden="true"
                          className="expertise-card__underline"
                          style={{
                            position: "absolute",
                            left: 0,
                            bottom: "-6px",
                            height: "1px",
                            width: "24px",
                            background: "#b9a06c",
                            transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        />
                      </span>
                    </span>
                  </div>

                </>
              );

              return (
                <ScrollReveal key={index} delay={index * 100}>
                  {unlocked ? (
                    <Link
                      to={p.link}
                      className="expertise-card group relative block w-full overflow-hidden"
                      style={{ aspectRatio: "4 / 5", background: "#0C0F24" }}
                      aria-label={`${p.name}, ${p.subtitle}`}
                    >
                      {cardInner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="expertise-card group relative block w-full overflow-hidden text-left"
                      style={{ aspectRatio: "4 / 5", background: "#0C0F24", cursor: "pointer" }}
                      aria-label="Request access to view this off-market listing"
                    >
                      {cardInner}
                    </button>
                  )}
                </ScrollReveal>
              );
            })}

            {/* Logo card — request access */}
            <ScrollReveal delay={properties.length * 100}>
              <Link
                to="/off-market-real-estate-austin"
                className="expertise-card group relative block w-full overflow-hidden"
                style={{ aspectRatio: "4 / 5", background: "#0C0F24" }}
                aria-label="Request access to more off-market opportunities"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/static-assets/echelon-logo-gold-square.webp"
                    alt="Echelon Property Group"
                    loading="lazy"
                    decoding="async"
                    className="w-[40%] max-w-[280px] h-auto object-contain"
                    style={{ transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,12,0.78) 0%, rgba(10,10,12,0.3) 50%, rgba(10,10,12,0.08) 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="expertise-card__darken absolute inset-0 opacity-0 transition-opacity duration-700"
                  style={{ background: "rgba(10,10,12,0.14)" }}
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end"
                  style={{ padding: "clamp(24px, 3.5vw, 40px)" }}
                >
                  <p
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#b9a06c",
                      marginBottom: "0.875rem",
                    }}
                  >
                    Private Access
                  </p>
                  <h3
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      letterSpacing: "0.02em",
                      color: "#FAFAF8",
                      marginBottom: "0.875rem",
                    }}
                  >
                    More off-market opportunities
                  </h3>
                  <p
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "0.95rem",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      color: "rgba(250, 250, 248, 0.9)",
                      maxWidth: "400px",
                      marginBottom: "1.5rem",
                      textAlign: "left",
                    }}
                  >
                    Exclusive private listings shared only with qualified buyers in our network.
                  </p>
                  <span
                    className="expertise-card__cta inline-flex items-center"
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#b9a06c",
                      position: "relative",
                      paddingBottom: "8px",
                      alignSelf: "flex-start",
                    }}
                  >
                    <span style={{ position: "relative" }}>
                      Request access →
                      <span
                        aria-hidden="true"
                        className="expertise-card__underline"
                        style={{
                          position: "absolute",
                          left: 0,
                          bottom: "-6px",
                          height: "1px",
                          width: "24px",
                          background: "#b9a06c",
                          transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                    </span>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Request access to off-market listings"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(12, 15, 36, 0.72)", backdropFilter: "blur(6px)" }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FAFAF8",
              maxWidth: "440px",
              width: "calc(100% - 32px)",
              padding: "clamp(28px, 5vw, 44px)",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "12px",
                right: "14px",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                lineHeight: 1,
                color: "#0C0F24",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "56px",
                  height: "56px",
                  borderRadius: "999px",
                  border: "1px solid #b9a06c",
                  marginBottom: "1rem",
                }}
              >
                <PadlockIcon />
              </span>
              <p
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#b9a06c",
                  marginBottom: "0.75rem",
                }}
              >
                Private Access
              </p>
              <h3
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: "clamp(1.25rem, 2.6vw, 1.5rem)",
                  color: "#0C0F24",
                  letterSpacing: "0.02em",
                  lineHeight: 1.3,
                  marginBottom: "0.5rem",
                }}
              >
                Unlock Off-Market Echelon Listings
              </h3>
              <p
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.875rem",
                  color: "rgba(12,15,36,0.7)",
                  lineHeight: 1.6,
                }}
              >
                Share a few details and we'll reveal current off-market opportunities.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "12px" }}>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                style={inputStyle}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={inputStyle}
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                placeholder="Phone"
                style={inputStyle}
              />
              {error && (
                <p style={{ color: "#a23a3a", fontSize: "0.8rem", fontFamily: '"Jost", sans-serif' }}>
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  marginTop: "8px",
                  background: "#0C0F24",
                  color: "#FAFAF8",
                  padding: "14px 24px",
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: submitting ? "wait" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Submitting…" : "Unlock Listings"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid rgba(12,15,36,0.2)",
  background: "#fff",
  fontFamily: '"Jost", sans-serif',
  fontSize: "0.9rem",
  color: "#0C0F24",
  outline: "none",
};

export default OffMarketListings;
