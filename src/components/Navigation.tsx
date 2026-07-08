import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const logo = "/images/echelon-logo.webp";
const logoMobile = "/images/echelon-logo-mobile.png";

const BRONZE = "#b9a06c";
const IVORY = "#FAF7F1";
const CHARCOAL = "#0C0F24";

interface NavChild {
  href: string;
  label: string;
  external?: boolean;
}

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
  children?: NavChild[];
}

const DESKTOP_BP = "min-[1280px]";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNow = (key: string) => {
    cancelClose();
    setOpenDropdown(key);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setOpenDropdown(null);
      closeTimer.current = null;
    }, 200);
  };

  useEffect(() => {
    cancelClose();
    setOpenDropdown(null);
    setIsMenuOpen(false);
  }, [location.pathname]);


  const links: NavLink[] = [
    {
      href: "/search",
      label: "Search",
      children: [
        { href: "/austin-luxury-homes-for-sale", label: "Austin Luxury Homes" },
        { href: "/listings/commercial-investment-austin", label: "Commercial & Investment" },
        { href: "/land-ranch", label: "Land & Ranch" },
        { href: "/land-development", label: "Land Development" },
        { href: "/past-transactions", label: "Past Transactions" },
        { href: "/search", label: "Search All Listings" },
      ],
    },
    { href: "/buy", label: "Buy" },
    { href: "/sell", label: "Sell" },
    { href: "/invest", label: "Invest" },
    { href: "/communities", label: "Communities" },
    { href: "/developments", label: "Developments" },
    { href: "/off-market-real-estate-austin", label: "Private Access" },
    {
      href: "/blog",
      label: "Insights",
      children: [
        { href: "/blog", label: "Blog & Press" },
        { href: "/market-intelligence", label: "Market Intelligence" },
      ],
    },
    { href: "/about", label: "About" },
  ];

  const isActive = (link: NavLink) =>
    location.pathname === link.href ||
    link.children?.some((c) => location.pathname === c.href);

  // Desktop nav item typography
  const desktopLinkStyle: React.CSSProperties = {
    fontFamily: '"Jost", sans-serif',
    fontSize: "13px",
    letterSpacing: "0.04em",
    fontWeight: 500,
    lineHeight: 1,
    color: CHARCOAL,
    whiteSpace: "nowrap",
    textTransform: "none",
    display: "inline-flex",
    alignItems: "center",
  };

  // Mobile keeps prior uppercase styling
  const mobileLinkStyle: React.CSSProperties = {
    fontFamily: '"Jost", sans-serif',
    fontSize: "10px",
    letterSpacing: "0.11em",
    textTransform: "uppercase",
    fontWeight: 400,
    whiteSpace: "nowrap",
    lineHeight: 1,
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-32 md:h-28 lg:h-[6.5rem]"
      style={{
        overflow: "visible",
        borderBottom: "1px solid rgba(12, 15, 36, 0.06)",
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "#FCFBF9" }} />

      <div
        className={`relative w-full h-full flex items-center px-4 md:px-6 min-[1280px]:px-5 justify-center min-[1280px]:justify-between pb-3 min-[1280px]:pb-0 min-[1280px]:max-w-[1288px] min-[1280px]:mx-auto`}
        style={{ overflow: "visible" }}
      >
        {/* Logo - LEFT */}
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center shrink-0"
          style={{ height: "100%" }}
        >
          <img
            src={logoMobile}
            alt="Echelon Property Group"
            title="Echelon Property Group, Austin Luxury Real Estate"
            className={`block min-[1280px]:hidden w-auto max-w-[450px] shrink-0 object-contain`}
            style={{ height: "auto", maxHeight: "128%" }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={400}
            height={218}
          />
          <img
            src={logo}
            alt="Echelon Property Group"
            title="Echelon Property Group, Austin Luxury Real Estate"
            className={`hidden min-[1280px]:block w-auto max-w-none shrink-0 object-contain`}
            style={{ height: "140%", maxHeight: "140%", maxWidth: "310px", aspectRatio: "200 / 80" }}
            loading="eager"
            decoding="async"
            width={200}
            height={80}
          />
        </Link>

        {/* Desktop nav - CENTER */}
        <div
          className="hidden min-[1280px]:flex items-center"
          style={{ overflow: "visible", gap: "36px", marginLeft: "-20px" }}
        >
          <ul
            className="flex items-center list-none p-0 m-0"
            style={{ overflow: "visible", gap: "36px" }}
          >
            {links.map((link) => (
              <li
                key={link.href}
                className="relative flex items-center"
                style={{ overflow: "visible" }}
                onMouseEnter={link.children ? () => openNow(link.href) : undefined}
                onMouseLeave={link.children ? () => scheduleClose() : undefined}
              >
                <DesktopNavAnchor link={link} active={!!isActive(link)} style={desktopLinkStyle} />
                {link.children && openDropdown === link.href && (
                  <DesktopDropdown
                    onMouseEnter={() => openNow(link.href)}
                    onMouseLeave={() => scheduleClose()}
                  >
                    {link.children.map((child) => (
                      <DropdownItem
                        key={child.href}
                        href={child.href}
                        label={child.label}
                        active={location.pathname === child.href}
                      />
                    ))}
                  </DesktopDropdown>
                )}
              </li>
            ))}

          </ul>
        </div>

        {/* Client Portal - RIGHT */}
        <div
          className="hidden min-[1280px]:flex items-center shrink-0"
          style={{ overflow: "visible" }}
        >
          <ClientPortalButton />
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="sm"
          className={`min-[1280px]:hidden absolute right-2 md:right-6`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className={`min-[1280px]:hidden absolute left-0 right-0 top-full z-40 overflow-y-auto`}
          style={{ backgroundColor: CHARCOAL, minHeight: "calc(100vh - 7rem)", WebkitOverflowScrolling: "touch" }}
        >
          <div className="container mx-auto px-6 py-12 space-y-7">
            {links.map((link) =>
              link.children ? (
                <div key={link.href} className="space-y-5">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.href ? null : link.href)}
                    className="block transition-colors duration-300 text-white/80 hover:text-gold"
                    style={mobileLinkStyle}
                  >
                    {link.label}
                    <span className="ml-1.5 text-[7px] opacity-30">
                      {openDropdown === link.href ? "▲" : "▼"}
                    </span>
                  </button>
                  {openDropdown === link.href && (
                    <div className="pl-5 space-y-5" style={{ borderLeft: "1px solid hsl(38 39% 61% / 0.3)" }}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-white/50 hover:text-gold transition-colors duration-300"
                          style={mobileLinkStyle}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  rel="noopener"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white/80 hover:text-gold transition-colors duration-300"
                  style={mobileLinkStyle}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white/80 hover:text-gold transition-colors duration-300"
                  style={mobileLinkStyle}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-8" style={{ borderTop: "1px solid hsl(38 39% 61% / 0.2)" }}>
              <a
                href="https://portal.echelonpropertygroup.com/login"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block px-6 py-3 transition-all duration-300"
                style={{
                  ...mobileLinkStyle,
                  border: `1px solid ${BRONZE}`,
                  color: BRONZE,
                }}
              >
                Client Portal
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

/* --------------------------------------------------------------------------
 * Desktop nav anchor (renders Link or <a>, with text-width active underline)
 * ------------------------------------------------------------------------ */
const DesktopNavAnchor = ({
  link,
  active,
  style,
}: {
  link: NavLink;
  active: boolean;
  style: React.CSSProperties;
}) => {
  const location = useLocation();
  const inner = (
    <>
      <span
        className="relative inline-block"
        style={{
          paddingBottom: "6px",
        }}
      >
        {link.label}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "1.5px",
            background: BRONZE,
            transformOrigin: "center",
            transform: active ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 220ms ease",
          }}
          className="nav-underline"
        />
      </span>
      {link.children && (
        <span
          style={{
            marginLeft: "6px",
            fontSize: "8px",
            opacity: 0.4,
            lineHeight: 1,
          }}
        >
          ▼
        </span>
      )}
    </>
  );

  const commonClass = "group cursor-pointer";
  const onHover = (e: React.MouseEvent<HTMLElement>, hovered: boolean) => {
    const el = e.currentTarget.querySelector<HTMLElement>(".nav-underline");
    if (el && !active) el.style.transform = hovered ? "scaleX(1)" : "scaleX(0)";
    (e.currentTarget as HTMLElement).style.color = hovered ? BRONZE : CHARCOAL;
  };

  if (link.external) {
    return (
      <a
        href={link.href}
        rel="noopener"
        className={commonClass}
        style={style}
        onMouseEnter={(e) => onHover(e, true)}
        onMouseLeave={(e) => onHover(e, false)}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      to={link.href}
      onClick={() => {
        if (link.href === "/" && location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={commonClass}
      style={style}
      onMouseEnter={(e) => onHover(e, true)}
      onMouseLeave={(e) => onHover(e, false)}
    >
      {inner}
    </Link>
  );
};

/* --------------------------------------------------------------------------
 * Shared dropdown item
 * ------------------------------------------------------------------------ */
const DropdownItem = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) => (
  <Link
    to={href}
    className="block transition-colors"
    style={{
      fontFamily: '"Jost", sans-serif',
      fontSize: "15px",
      fontWeight: 500,
      letterSpacing: "0.04em",
      lineHeight: 1.7,
      color: active ? BRONZE : CHARCOAL,
      padding: "6px 12px",
      borderRadius: "8px",
      marginBottom: "2px",
      whiteSpace: "nowrap",
      textTransform: "none",
      transitionDuration: "180ms",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = IVORY;
      e.currentTarget.style.color = BRONZE;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = active ? BRONZE : CHARCOAL;
    }}
  >
    {label}
  </Link>
);

/* --------------------------------------------------------------------------
 * Shared desktop dropdown card
 * Centered under parent; shifts inward on viewport collision only.
 * ------------------------------------------------------------------------ */
const DesktopDropdown = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const adjust = () => {
      el.style.transform = "translateX(0)";
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const margin = 16;
      let delta = 0;
      if (rect.right > vw - margin) delta = vw - margin - rect.right;
      else if (rect.left < margin) delta = margin - rect.left;
      setShift(delta);
    };
    adjust();
    window.addEventListener("resize", adjust);
    return () => window.removeEventListener("resize", adjust);
  }, []);

  return (
    <div
      className="absolute"
      style={{
        top: "calc(100% + 14px)",
        left: 0,
        transform: `translateX(${shift}px)`,
        zIndex: 100,
      }}
    >
      <div
        ref={ref}
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "18px 22px",
          boxShadow:
            "0 1px 2px rgba(12,15,36,0.04), 0 12px 40px -8px rgba(12,15,36,0.18), 0 2px 8px rgba(12,15,36,0.06)",
          border: "1px solid rgba(12,15,36,0.04)",
          minWidth: "260px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
 * Client Portal CTA
 * ------------------------------------------------------------------------ */
const ClientPortalButton = () => (
  <a
    href="https://portal.echelonpropertygroup.com/login"
    target="_blank"
    rel="noopener noreferrer nofollow"
    className="inline-flex items-center justify-center"
    style={{
      height: "40px",
      padding: "0 18px",
      borderRadius: "8px",
      border: `1px solid ${BRONZE}`,
      background: IVORY,
      color: CHARCOAL,
      fontFamily: '"Jost", sans-serif',
      fontSize: "13px",
      fontWeight: 500,
      letterSpacing: "0.04em",
      lineHeight: 1,
      whiteSpace: "nowrap",
      textTransform: "none",
      transition:
        "background 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
      boxShadow: "0 1px 2px rgba(12,15,36,0.04)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = BRONZE;
      e.currentTarget.style.color = "#ffffff";
      e.currentTarget.style.boxShadow = "0 6px 18px -6px rgba(185,160,108,0.55)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = IVORY;
      e.currentTarget.style.color = CHARCOAL;
      e.currentTarget.style.boxShadow = "0 1px 2px rgba(12,15,36,0.04)";
    }}
  >
    Client Portal
  </a>
);

export default Navigation;
