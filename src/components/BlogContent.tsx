import { lazy, Suspense, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AgentIntelMarketSnapshot = lazy(
  () => import("@/components/market-intel/AgentIntelMarketSnapshot"),
);
const MarketBalanceGauge = lazy(
  () => import("@/components/market-intel/MarketBalanceGauge"),
);
const RatesAffordability = lazy(
  () => import("@/components/market-intel/RatesAffordability"),
);
const BlogMarketSnapshot = lazy(
  () => import("@/components/market-intel/BlogMarketSnapshot"),
);

interface BlogContentProps {
  content: string;
  /** Optional element rendered immediately after the first :::glance block. */
  afterGlance?: ReactNode;
}

/**
 * Editorial markdown renderer for blog posts.
 *
 * Standard markdown supported:
 *   # / ## / ###          headings
 *   - item                bullets (supports **bold** inline)
 *   **bold**              inline bold
 *   [text](url)           links
 *
 * Custom editorial blocks (each on its own lines):
 *
 *   :::glance
 *   Area | Price Range | Best For | Tradeoff
 *   Bee Cave | $700K–$1.5M+ | Newer construction | Less character
 *   ...
 *   :::
 *
 *   :::best-for
 *   Buyers who want move-in ready newer construction near the Galleria.
 *   :::
 *
 *   :::watch-out
 *   HOA fees and proximity to 71 traffic during peak hours.
 *   :::
 *
 *   :::micro-cta
 *   This is where most buyers either find value or overpay. Worth getting right.
 *   :::
 *
 *   :::cta
 *   heading: Get a clear read on where to focus
 *   button: Request Area Guide
 *   href: /contact
 *   :::
 *
 *   :::faq
 *   Q: Is Bee Cave or Lakeway better?
 *   A: Depends on whether you prioritize newer construction or established character...
 *
 *   Q: Is Dripping Springs a good investment?
 *   A: ...
 *   :::
 */

const renderInline = (text: string) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-foreground underline underline-offset-4 decoration-accent-gold/40 hover:decoration-accent-gold transition-colors duration-300">$1</a>'
    );

const renderHeading = (line: string): string => {
  if (line.startsWith("# ")) {
    return `<h2 class="text-3xl md:text-4xl font-light text-architectural mb-6 mt-12 whitespace-pre-wrap">${line.substring(2)}</h2>`;
  }
  if (line.startsWith("## ")) {
    return `<h2 class="text-2xl md:text-3xl font-light text-architectural mb-5 mt-12">${line.substring(3)}</h2>`;
  }
  if (line.startsWith("### ")) {
    return `<h3 class="text-xl md:text-2xl font-medium text-foreground mb-3 mt-8">${line.substring(4)}</h3>`;
  }
  return "";
};

/**
 * Render markdown body, grouping consecutive non-blank text lines into
 * a single paragraph. Blank lines separate paragraphs. This prevents
 * the "one-sentence-per-paragraph" gigantic spacing when source content
 * is written line-per-sentence.
 */
const renderMarkdownBody = (body: string): string => {
  const lines = body.split("\n");
  const out: string[] = [];
  let paraBuf: string[] = [];
  let listBuf: string[] = [];

  const flushPara = () => {
    if (!paraBuf.length) return;
    const text = paraBuf.join(" ").trim();
    paraBuf = [];
    if (!text) return;
    if (text.startsWith("**") && text.endsWith("**") && text.indexOf("**", 2) === text.length - 2) {
      out.push(`<p class="mb-5 leading-[1.85]"><strong class="text-foreground">${text.substring(2, text.length - 2)}</strong></p>`);
    } else {
      out.push(`<p class="mb-5 leading-[1.85]">${renderInline(text)}</p>`);
    }
  };

  const flushList = () => {
    if (!listBuf.length) return;
    const items = listBuf.map((l) => `<li class="mb-2 leading-[1.85]">${renderInline(l)}</li>`).join("");
    out.push(`<ul class="list-disc pl-6 mb-6 space-y-1 text-muted-foreground">${items}</ul>`);
    listBuf = [];
  };

  for (const raw of lines) {
    const trimmed = raw.trim();

    if (trimmed.startsWith("- ")) {
      flushPara();
      listBuf.push(trimmed.substring(2));
      continue;
    }

    if (trimmed === "") {
      flushPara();
      flushList();
      continue;
    }

    if (raw.startsWith("# ") || raw.startsWith("## ") || raw.startsWith("### ")) {
      flushPara();
      flushList();
      out.push(renderHeading(raw));
      continue;
    }

    flushList();
    paraBuf.push(trimmed);
  }

  flushPara();
  flushList();
  return out.join("");
};

interface Block {
  type: "markdown" | "glance" | "best-for" | "watch-out" | "micro-cta" | "cta" | "faq" | "stat-block" | "intel-pulse" | "intel-gauge" | "intel-rates" | "intel-luxury-snapshot";
  body: string;
}

const parseBlocks = (content: string): Block[] => {
  const blocks: Block[] = [];
  const lines = content.split("\n");
  let mdBuf: string[] = [];
  let i = 0;

  const flushMd = () => {
    if (mdBuf.length) {
      blocks.push({ type: "markdown", body: mdBuf.join("\n") });
      mdBuf = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const fenceMatch = line.match(/^:::(glance|best-for|watch-out|micro-cta|cta|faq|stat-block|intel-pulse|intel-gauge|intel-rates|intel-luxury-snapshot)\s*$/);
    if (fenceMatch) {
      flushMd();
      const type = fenceMatch[1] as Block["type"];
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        inner.push(lines[i]);
        i++;
      }
      blocks.push({ type, body: inner.join("\n").trim() });
      i++; // skip closing :::
      continue;
    }
    mdBuf.push(line);
    i++;
  }
  flushMd();
  return blocks;
};

const GlanceTable = ({ body }: { body: string }) => {
  const rows = body.split("\n").map((r) => r.split("|").map((c) => c.trim())).filter((r) => r.length > 1);
  if (!rows.length) return null;
  const [header, ...data] = rows;
  return (
    <div className="my-10 -mx-2 sm:mx-0 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-foreground/15">
            {header.map((h, idx) => (
              <th
                key={idx}
                className="text-minimal text-foreground/70 uppercase tracking-wider py-3 pr-4 font-normal text-xs"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr key={rIdx} className="border-b border-foreground/10 last:border-0">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`py-4 pr-4 text-sm md:text-base leading-relaxed ${
                    cIdx === 0 ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const HighlightLine = ({
  label,
  body,
  tone,
}: {
  label: string;
  body: string;
  tone: "best" | "watch";
}) => {
  const accent = tone === "best" ? "border-accent-gold" : "border-foreground/30";
  return (
    <div className={`my-5 border-l-2 ${accent} pl-4`}>
      <p className="text-sm md:text-base leading-[1.8] text-foreground/85">
        <span className="text-minimal uppercase tracking-wider text-xs text-foreground/60 mr-2">
          {label}
        </span>
        <span dangerouslySetInnerHTML={{ __html: renderInline(body) }} />
      </p>
    </div>
  );
};

const MicroCTA = ({ body }: { body: string }) => (
  <p className="my-8 text-center italic text-foreground/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
    {body}
  </p>
);

const StatBlock = ({ body }: { body: string }) => {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  let title = "";
  const bullets: string[] = [];
  let footer = "";
  for (const l of lines) {
    if (l.toLowerCase().startsWith("title:")) {
      title = l.substring(6).trim();
    } else if (l.startsWith("•") || l.startsWith("- ")) {
      bullets.push(l.replace(/^•\s?|-\s/, "").trim());
    } else {
      footer = footer ? `${footer} ${l}` : l;
    }
  }
  return (
    <aside className="my-12 border border-foreground/15 bg-foreground/[0.025] px-6 py-8 md:px-10 md:py-10">
      {title && (
        <p className="text-minimal uppercase tracking-[0.18em] text-xs text-foreground/60 mb-5">
          {title}
        </p>
      )}
      <ul className="space-y-3 mb-5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-4 text-foreground/85 leading-[1.75] text-base">
            <span className="h-px w-4 shrink-0 bg-[#b9a06c] mt-[0.7em]" aria-hidden />
            <span dangerouslySetInnerHTML={{ __html: renderInline(b) }} />
          </li>
        ))}
      </ul>
      {footer && (
        <p
          className="text-sm md:text-base text-muted-foreground leading-[1.8] border-t border-foreground/10 pt-5"
          dangerouslySetInnerHTML={{ __html: renderInline(footer) }}
        />
      )}
    </aside>
  );
};

const SoftCTA = ({ body }: { body: string }) => {
  const lines = body.split("\n");
  const get = (key: string) =>
    lines.find((l) => l.toLowerCase().startsWith(`${key}:`))?.split(":").slice(1).join(":").trim() || "";
  const heading = get("heading") || "Get a clear read on where to focus";
  const buttonLabel = get("button") || "Request Area Guide";
  const href = get("href") || "/contact";
  return (
    <div className="my-14 py-10 px-6 md:px-10 border-t border-b border-foreground/15 text-center">
      <p className="text-xl md:text-2xl font-light text-architectural mb-6 leading-snug">
        {heading}
      </p>
      <Button asChild variant="outline" className="rounded-none border-[#b9a06c] text-[#b9a06c] bg-transparent hover:bg-[#b9a06c] hover:text-white hover:border-[#b9a06c] uppercase tracking-wider text-xs px-8 py-5 transition-colors">
        <Link to={href}>{buttonLabel}</Link>
      </Button>
    </div>
  );
};

const FAQBlock = ({ body }: { body: string }) => {
  const items: { q: string; a: string }[] = [];
  const chunks = body.split(/\n\s*\n/);
  chunks.forEach((chunk) => {
    const qMatch = chunk.match(/^Q:\s*(.+)/);
    const aMatch = chunk.match(/A:\s*([\s\S]+)/);
    if (qMatch && aMatch) {
      items.push({ q: qMatch[1].trim(), a: aMatch[1].trim() });
    }
  });
  if (!items.length) return null;
  return (
    <div className="mt-16 pt-10 border-t border-foreground/15">
      <h2 className="text-2xl md:text-3xl font-light text-architectural mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {items.map((item, idx) => (
          <div key={idx}>
            <h3 className="text-lg md:text-xl font-medium text-foreground mb-3">{item.q}</h3>
            <p
              className="text-muted-foreground leading-[1.85]"
              dangerouslySetInnerHTML={{ __html: renderInline(item.a) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const MarkdownChunk = ({ body }: { body: string }) => {
  const html = renderMarkdownBody(body);
  return (
    <div
      className="text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * Editorial sleeve for inline intelligence modules. A subtle gold hairline
 * top + bottom signals a deliberate publication insert rather than a widget.
 */
const IntelInsert = ({ children }: { children: ReactNode }) => (
  <aside
    className="my-14 md:my-20 -mx-6 md:mx-0"
    role="complementary"
    aria-label="Austin luxury market intelligence"
  >
    <Suspense fallback={<div className="min-h-[260px]" />}>{children}</Suspense>
  </aside>
);

const BlogContent = ({ content, afterGlance }: BlogContentProps) => {
  const blocks = parseBlocks(content);
  let glanceRendered = false;
  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "glance": {
            const isFirstGlance = !glanceRendered;
            glanceRendered = true;
            return (
              <div key={idx}>
                <GlanceTable body={block.body} />
                {isFirstGlance && afterGlance}
              </div>
            );
          }
          case "best-for":
            return <HighlightLine key={idx} label="Best For" body={block.body} tone="best" />;
          case "watch-out":
            return <HighlightLine key={idx} label="Watch Out For" body={block.body} tone="watch" />;
          case "micro-cta":
            return <MicroCTA key={idx} body={block.body} />;
          case "cta":
            return <SoftCTA key={idx} body={block.body} />;
          case "stat-block":
            return <StatBlock key={idx} body={block.body} />;
          case "faq":
            return <FAQBlock key={idx} body={block.body} />;
          case "intel-pulse":
            return (
              <IntelInsert key={idx}>
                <AgentIntelMarketSnapshot
                  marketName="West Austin"
                  fallbackMarketName="Austin Metro"
                  eyebrow="Austin Luxury Market Pulse"
                  title="Austin Luxury · Market Pulse"
                  heroMetric="median_sales_price"
                  supportingMetrics={[
                    "months_of_inventory",
                    "median_days_on_market",
                    "sales_to_list_ratio",
                  ]}
                  duration="1_month"
                  dataNote="Figures reflect the West Austin regional dataset, the closest public proxy for Austin's $2M+ luxury submarkets. Off-market and pocket-listing volume, disproportionately concentrated above $2M, is tracked separately within our private network."
                  commentary="Above $2M, inventory remains structurally thin and absorption is paced by a narrow buyer pool. Pricing has held firm at the upper tier, where well-prepared properties continue to trade with limited concession, while overpriced positions sit and re-cut. The headline metric to watch is months of supply at the trophy band, not the citywide median."
                />
              </IntelInsert>
            );
          case "intel-gauge":
            return (
              <IntelInsert key={idx}>
                <MarketBalanceGauge
                  communityName="Austin Metro Residential $2M+"
                  marketName="Austin Metro"
                  fallbackMarketName="West Austin"
                  eyebrow={"\n\nAUSTIN METRO RESIDENTIAL · $2M+ · BUYER / SELLER BALANCE"}
                />
              </IntelInsert>
            );
          case "intel-rates":
            return (
              <IntelInsert key={idx}>
                <RatesAffordability
                  commentary="Above $2M, financing is a posture rather than a constraint. Most transactions clear with significant cash or asset-backed structures, so the real signal in mortgage rates at this tier is psychological. When rates ease, the move-up pool widens and pent-up Westlake-to-Lake Austin trade-ups reactivate. When rates stay elevated, sellers must rely on presentation discipline and private exposure rather than rate-driven urgency to close."
                />
              </IntelInsert>
            );
          case "intel-luxury-snapshot":
            return (
              <IntelInsert key={idx}>
                <BlogMarketSnapshot />
              </IntelInsert>
            );
          default:
            return <MarkdownChunk key={idx} body={block.body} />;
        }
      })}
    </div>
  );
};

/** Extracts FAQs from a `:::faq` block for JSON-LD schema generation. */
export const extractFAQsFromContent = (content: string): { question: string; answer: string }[] => {
  const blocks = parseBlocks(content);
  const faqBlock = blocks.find((b) => b.type === "faq");
  if (!faqBlock) return [];
  const items: { question: string; answer: string }[] = [];
  faqBlock.body.split(/\n\s*\n/).forEach((chunk) => {
    const qMatch = chunk.match(/^Q:\s*(.+)/);
    const aMatch = chunk.match(/A:\s*([\s\S]+)/);
    if (qMatch && aMatch) {
      const q = qMatch[1].trim();
      const a = aMatch[1].trim().replace(/\s+/g, " ");
      if (q && a.length >= 20) items.push({ question: q, answer: a });
    }
  });
  return items;
};

export default BlogContent;
