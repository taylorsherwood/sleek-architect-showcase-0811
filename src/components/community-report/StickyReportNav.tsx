import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface StickyReportNavProps {
  items: NavItem[];
}

const SCROLL_OFFSET = 140;

const StickyReportNav = ({ items }: StickyReportNavProps) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const handleScroll = () => {
      const y = window.scrollY + SCROLL_OFFSET + 1;
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= y) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET + 1;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  if (items.length === 0) return null;

  return (
    <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <nav
          aria-label="Report sections"
          className="flex md:justify-center gap-x-8 overflow-x-auto scrollbar-none py-4 -mx-6 px-6"
        >
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`relative shrink-0 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 pb-1 ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-px h-px bg-gold transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default StickyReportNav;
