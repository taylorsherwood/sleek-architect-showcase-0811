import { Link } from "react-router-dom";

type MetaPair = { label: string; value: string };

type CommercialListingCardProps = {
  image: string;
  alt: string;
  title: string;
  badge: string;
  badgeVariant?: "gold" | "outline";
  price: string;
  name: string;
  location: string;
  meta: [MetaPair, MetaPair];
  description: string;
  cta:
    | { type: "internal"; to: string; label: string }
    | { type: "external"; href: string; label: string };
};

const labelKicker = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "0.55rem" as const,
  letterSpacing: "0.28em",
  textTransform: "uppercase" as const,
  fontWeight: 600 as const,
};

const locationKicker = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "0.65rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontWeight: 600 as const,
};

const ctaKicker = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "0.65rem" as const,
  letterSpacing: "0.32em",
  textTransform: "uppercase" as const,
  fontWeight: 600 as const,
};

const badgeKicker = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "0.6rem" as const,
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  fontWeight: 700 as const,
};

const priceKicker = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "0.65rem" as const,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  fontWeight: 500 as const,
};

const CommercialListingCard = ({
  image,
  alt,
  title,
  badge,
  badgeVariant = "gold",
  price,
  name,
  location,
  meta,
  description,
  cta,
}: CommercialListingCardProps) => {
  const inner = (
    <article
      className="flex flex-col h-full overflow-hidden transition-all duration-500 group-hover/card:-translate-y-1.5 group-hover/card:shadow-2xl"
      style={{ backgroundColor: "#1B1E24", boxShadow: "0 1px 0 0 rgba(185,160,108,0.12) inset" }}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10]">
        {/* Clipped image wrapper */}
        <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "#0C0F24" }}>
          <img
            src={image}
            alt={alt}
            title={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Image-to-content gradient transition */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1B1E24] via-[#1B1E24]/70 to-transparent pointer-events-none" />

        {/* Category chip */}
        <div
          className="absolute top-0 left-0 px-5 py-1.5"
          style={
            badgeVariant === "gold"
              ? { backgroundColor: "#b9a06c" }
              : { backgroundColor: "#0C0F24", borderRight: "1px solid #b9a06c", borderBottom: "1px solid #b9a06c" }
          }
        >
          <span
            className="block leading-none"
            style={{
              ...badgeKicker,
              color: badgeVariant === "gold" ? "#1B1E24" : "#b9a06c",
            }}
          >
            {badge}
          </span>
        </div>

        {/* Price badge */}
        <div
          className="absolute bottom-0 right-0 z-10 px-4 py-2.5 -translate-y-[25%] transition-transform duration-500 group-hover/card:-translate-y-0.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)]"
          style={{ backgroundColor: "#1B1E24", borderTop: "1px solid rgba(185,160,108,0.35)", borderLeft: "1px solid rgba(185,160,108,0.35)" }}
        >
          <span className="block leading-none text-warm-cream" style={priceKicker}>
            {price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <header className="mb-5">
          <h3
            className="font-display mb-2 leading-tight"
            style={{ color: "#F5F3EF", fontSize: "clamp(1.35rem, 1.7vw, 1.65rem)", letterSpacing: "0.02em", fontWeight: 500 }}
          >
            {name}
          </h3>
          <p style={{ ...locationKicker, color: "#b9a06c" }}>{location}</p>
        </header>

        {/* Meta pairs */}
        <div className="grid grid-cols-2 gap-x-8 mb-5">
          <div className="flex flex-col">
            <span style={{ ...labelKicker, color: "#b9a06c" }} className="mb-2">
              {meta[0].label}
            </span>
            <span className="text-sm font-light leading-snug" style={{ color: "#F5F3EF", fontFamily: '"Jost", sans-serif' }}>
              {meta[0].value}
            </span>
          </div>
          <div className="flex flex-col pl-6" style={{ borderLeft: "1px solid rgba(185,160,108,0.28)" }}>
            <span style={{ ...labelKicker, color: "#b9a06c" }} className="mb-2">
              {meta[1].label}
            </span>
            <span className="text-sm font-light leading-snug" style={{ color: "#F5F3EF", fontFamily: '"Jost", sans-serif' }}>
              {meta[1].value}
            </span>
          </div>
        </div>

        {/* Brass rule */}
        <div className="h-px w-full mb-5" style={{ backgroundColor: "rgba(185,160,108,0.3)" }} />

        {/* Description */}
        <p
          className="text-sm leading-relaxed font-light mb-7 line-clamp-2 min-h-[2.85rem]"
          style={{ color: "rgba(245,243,239,0.65)", fontFamily: '"Jost", sans-serif' }}
        >
          {description}
        </p>

        {/* CTA */}
        <div className="mt-auto">
          {cta.type === "internal" ? (
            <Link
              to={cta.to}
              className="block w-full text-center py-3.5 px-6 transition-colors duration-300"
              style={{ ...ctaKicker, color: "#b9a06c", border: "1px solid #b9a06c" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#b9a06c";
                (e.currentTarget as HTMLElement).style.color = "#1B1E24";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#b9a06c";
              }}
            >
              {cta.label}
            </Link>
          ) : (
            <span
              className="block w-full text-center py-3.5 px-6 transition-colors duration-300"
              style={{ ...ctaKicker, color: "#b9a06c", border: "1px solid #b9a06c" }}
            >
              {cta.label}
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (cta.type === "external") {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full group/card"
      >
        {inner}
      </a>
    );
  }

  return <div className="block h-full group/card">{inner}</div>;
};

export default CommercialListingCard;
