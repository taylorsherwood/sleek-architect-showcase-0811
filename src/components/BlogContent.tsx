import { lazy, Suspense, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import InlineEditorialCTA from "@/components/blog/InlineEditorialCTA";
import { pathwayForCategory } from "@/lib/articlePathways";

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
const MortgageCalculator = lazy(
  () => import("@/components/MortgageCalculator"),
);

interface BlogContentProps {
  content: string;
  /** Optional element rendered immediately after the first :::glance block. */
  afterGlance?: ReactNode;
  /** Blog category — drives mid-article CTA selection. */
  category?: string;
  /** Article id — included on every CTA analytics event. */
  articleId?: string;
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
      (_m, label: string, url: string) => {
        const external = /^https?:\/\//i.test(url);
        const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${url}"${attrs} class="text-foreground underline underline-offset-4 decoration-accent-gold/40 hover:decoration-accent-gold transition-colors duration-300">${label}</a>`;
      }
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
  let olBuf: string[] = [];

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
    out.push(`<ul class="list-disc pl-6 mb-6 space-y-1 text-muted-foreground marker:text-[#b9a06c]">${items}</ul>`);
    listBuf = [];
  };

  const flushOl = () => {
    if (!olBuf.length) return;
    const items = olBuf
      .map((l, i) => {
        const num = String(i + 1).padStart(2, "0");
        return `<li class="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-8 items-baseline py-5 border-b border-foreground/10 last:border-b-0"><span class="font-cinzel text-base md:text-lg tracking-[0.18em] leading-none" style="color:#b9a06c">${num}</span><div class="leading-[1.85] text-muted-foreground">${renderInline(l)}</div></li>`;
      })
      .join("");
    out.push(`<ol class="list-none p-0 my-8 border-t border-foreground/10">${items}</ol>`);
    olBuf = [];
  };

  for (const raw of lines) {
    const trimmed = raw.trim();

    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      flushPara();
      flushList();
      olBuf.push(olMatch[2]);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushPara();
      flushOl();
      listBuf.push(trimmed.substring(2));
      continue;
    }

    if (trimmed === "") {
      flushPara();
      flushList();
      flushOl();
      continue;
    }

    if (raw.startsWith("# ") || raw.startsWith("## ") || raw.startsWith("### ")) {
      flushPara();
      flushList();
      flushOl();
      out.push(renderHeading(raw));
      continue;
    }

    flushList();
    flushOl();
    paraBuf.push(trimmed);
  }

  flushPara();
  flushList();
  flushOl();
  return out.join("");
};

interface Block {
  type: "markdown" | "glance" | "compare-table" | "callout" | "best-for" | "watch-out" | "micro-cta" | "cta" | "faq" | "stat-block" | "intel-pulse" | "intel-gauge" | "intel-gauge-austin-metro" | "intel-gauge-lake-austin" | "intel-gauge-lake-travis" | "intel-gauge-austin-15m" | "intel-gauge-tarrytown" | "intel-gauge-westlake" | "intel-gauge-coa-sfr-2m" | "intel-rates" | "intel-luxury-snapshot" | "mortgage-calculator";
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
    const fenceMatch = line.match(/^:::(glance|compare-table|callout|best-for|watch-out|micro-cta|cta|faq|stat-block|intel-pulse|intel-gauge|intel-gauge-austin-metro|intel-gauge-lake-austin|intel-gauge-lake-travis|intel-gauge-austin-15m|intel-gauge-tarrytown|intel-gauge-westlake|intel-gauge-coa-sfr-2m|intel-rates|intel-luxury-snapshot|mortgage-calculator)\s*$/);
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
  const corridorHeaders = header.slice(1);
  const colCount = header.length;
  // Tailwind needs literal class names; enumerate supported column counts.
  const gridColsClass =
    colCount === 6
      ? "lg:grid-cols-[1.4fr_1fr_0.8fr_0.9fr_0.8fr_0.9fr]"
      : colCount === 5
        ? "lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr]"
        : colCount === 4
          ? "lg:grid-cols-[1.1fr_1fr_1fr_1fr]"
          : colCount === 3
            ? "lg:grid-cols-[0.9fr_1.3fr_1.3fr]"
            : "lg:grid-cols-[1.1fr_1fr]";

  return (
    <div className="my-12">
      {/* Corridor headers - desktop only */}
      <div className={`hidden lg:grid ${gridColsClass} gap-x-10 pb-5 border-b border-foreground/20`}>
        <div className="text-minimal uppercase tracking-[0.15em] text-xs whitespace-nowrap" style={{ color: "#b9a06c" }}>
          {header[0]}
        </div>
        {corridorHeaders.map((h, idx) => (
          <div key={idx} className="text-minimal uppercase tracking-[0.15em] text-xs leading-tight" style={{ color: "#b9a06c" }}>
            {h}
          </div>
        ))}
      </div>

      {data.map((row, rIdx) => (
        <div
          key={rIdx}
          className={`grid grid-cols-1 ${gridColsClass} gap-x-10 gap-y-3 py-6 lg:py-7 border-b border-foreground/10 last:border-b-0 lg:items-start`}
        >
          <div className="text-minimal text-foreground uppercase tracking-[0.15em] text-xs leading-[1.5]">
            {row[0]}
          </div>
          {row.slice(1).map((cell, cIdx) => (
            <div key={cIdx} className="text-[15px] leading-[1.65] text-muted-foreground">
              <div className="lg:hidden text-minimal text-foreground/55 uppercase tracking-[0.14em] text-[10px] mb-1">
                {corridorHeaders[cIdx]}
              </div>
              {cell}
            </div>
          ))}
        </div>
      ))}

    </div>
  );
};

/**
 * Semantic responsive comparison table. First row is the header (column labels).
 * First cell of each subsequent row is the row label (<th scope="row">).
 * Stacks to a definition-list-style layout on mobile.
 */
const CompareTable = ({ body }: { body: string }) => {
  const rows = body
    .split("\n")
    .map((r) => r.split("|").map((c) => c.trim()))
    .filter((r) => r.length > 1 && r.some(Boolean));
  if (rows.length < 2) return null;
  const [header, ...data] = rows;
  return (
    <div className="my-12 -mx-6 md:mx-0">
      <table className="w-full hidden md:table border-collapse">
        <thead>
          <tr className="border-b border-foreground/20">
            {header.map((h, i) => (
              <th
                key={i}
                scope="col"
                className={`text-left py-4 px-4 text-minimal uppercase tracking-[0.15em] text-xs ${i === 0 ? "" : ""}`}
                style={{ color: i === 0 ? undefined : "#b9a06c" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr key={rIdx} className="border-b border-foreground/10 last:border-b-0">
              <th
                scope="row"
                className="text-left align-top py-5 px-4 text-minimal text-foreground uppercase tracking-[0.15em] text-xs font-normal w-[28%] whitespace-pre-line"
              >
                {row[0]}
              </th>
              {row.slice(1).map((cell, cIdx) => (
                <td key={cIdx} className="align-top py-5 px-4 text-[15px] leading-[1.65] text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: stacked per-row */}
      <div className="md:hidden px-6 space-y-8">
        {data.map((row, rIdx) => (
          <div key={rIdx} className="border-b border-foreground/10 pb-6 last:border-b-0">
            <p className="text-minimal text-foreground uppercase tracking-[0.15em] text-xs mb-3">
              {row[0]}
            </p>
            <dl className="space-y-2">
              {row.slice(1).map((cell, cIdx) => (
                <div key={cIdx} className="grid grid-cols-[auto_1fr] gap-x-3">
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-foreground/55 pt-[3px]" style={{ color: "#b9a06c" }}>
                    {header[cIdx + 1]}
                  </dt>
                  <dd className="text-[15px] leading-[1.65] text-muted-foreground">
                    {cell}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Quick-answer style callout. First line "label:" becomes the eyebrow.
 * Remaining lines render as a single paragraph. Built for AI-search extraction.
 */
const Callout = ({ body }: { body: string }) => {
  const lines = body.split("\n");
  let label = "";
  let text = body;
  const first = lines[0]?.trim() ?? "";
  const m = first.match(/^label:\s*(.+)$/i);
  if (m) {
    label = m[1].trim();
    text = lines.slice(1).join("\n").trim();
  }

  const textLines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const listItems = textLines.filter((l) => l.startsWith("- "));
  const hasOnlyList = listItems.length > 0 && listItems.length === textLines.length;

  return (
    <aside
      className="my-10 border-l-2 pl-6 md:pl-8 py-2"
      style={{ borderColor: "#b9a06c" }}
      aria-label={label || "Callout"}
    >
      {label && (
        <p className="text-minimal uppercase tracking-[0.18em] text-xs mb-4" style={{ color: "#b9a06c" }}>
          {label}
        </p>
      )}
      {hasOnlyList ? (
        <ul className="space-y-3">
          {listItems.map((item, i) => (
            <li
              key={i}
              className="text-base md:text-lg leading-[1.85] text-foreground/90 flex gap-3"
            >
              <span className="shrink-0 mt-[0.55em] w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#b9a06c" }} aria-hidden />
              <span dangerouslySetInnerHTML={{ __html: renderInline(item.substring(2)) }} />
            </li>
          ))}
        </ul>
      ) : (
        <p
          className="text-base md:text-lg leading-[1.85] text-foreground/90"
          dangerouslySetInnerHTML={{ __html: renderInline(text.replace(/\n+/g, " ")) }}
        />
      )}
    </aside>
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
        <p className="text-minimal uppercase tracking-[0.18em] text-xs mb-5" style={{ color: "#b9a06c" }}>
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
  const eyebrow = get("eyebrow");
  const heading = get("heading") || "Get a clear read on where to focus";
  const subheading = get("subheading");
  const buttonLabel = get("button") || "Request Area Guide";
  const href = get("href") || "/contact";
  if (eyebrow) {
    return (
      <aside className="mt-14 md:mt-16 mb-20 md:mb-28 pt-10 md:pt-12 border-t border-foreground/15">
        <div className="max-w-2xl mx-auto text-center px-2">
          <p className="text-minimal text-gold mb-4 tracking-[0.22em] text-xs uppercase">
            {eyebrow}
          </p>
          <p className="text-xl md:text-2xl font-light text-architectural mb-4 leading-snug">
            {heading}
          </p>
          {subheading && (
            <p className="text-sm md:text-base text-muted-foreground font-light mb-7 max-w-xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
          <Link
            to={href}
            className="inline-block border border-[#b9a06c] text-[#b9a06c] bg-transparent hover:bg-[#b9a06c] hover:text-white uppercase tracking-[0.18em] text-xs px-8 py-4 transition-colors"
          >
            {buttonLabel}
          </Link>
        </div>
      </aside>
    );
  }
  return (
    <div className="my-14 pt-10 px-6 md:px-10 border-t border-foreground/15 text-center">
      <p className="text-xl md:text-2xl font-light text-architectural mb-3 leading-snug">
        {heading}
      </p>
      {subheading && (
        <p className="text-sm md:text-base text-muted-foreground font-light mb-6 max-w-xl mx-auto leading-relaxed">
          {subheading}
        </p>
      )}
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
const IntelInsert = ({ children, tight = false }: { children: ReactNode; tight?: boolean }) => (
  <aside
    className={tight ? "my-1 md:my-2 -mx-6 md:mx-0" : "my-10 md:my-14 -mx-6 md:mx-0"}
    role="complementary"
    aria-label="Austin luxury market intelligence"
  >
    <Suspense fallback={<div className="min-h-[260px]" />}>{children}</Suspense>
  </aside>
);


const BlogContent = ({ content, afterGlance, category, articleId }: BlogContentProps) => {
  const blocks = parseBlocks(content);
  let glanceRendered = false;

  // ── Mid-article CTA insertion ──────────────────────────────────────
  // Pick two markdown blocks (skip glance/intel/cta/faq/stat-block) whose
  // cumulative text length crosses ~30% and ~70% of total prose. Skip
  // entirely if content is short or if the author already placed `:::cta`
  // blocks (those win — don't double up).
  const pathway = pathwayForCategory(category);
  const authorPlacedCTA = blocks.some((b) => b.type === "cta");
  // Mid-article CTAs are inserted after substantial markdown blocks at natural
  // breaks — never between a heading and its content, and never before an FAQ
  // or author-placed CTA block. A block is eligible when it is a substantial
  // prose block and does not end with a section heading.
  const isSubstantialProse = (body: string) => {
    const text = body.trim();
    if (text.length < 600) return false;
    const nonHeading = text.replace(/^#{1,6}\s.*$/gm, "").trim();
    return nonHeading.length >= 500;
  };
  const endsWithHeading = (body: string) => {
    const lines = body.trim().split("\n");
    const lastNonEmpty = [...lines].reverse().find((l) => l.trim().length > 0);
    return !!lastNonEmpty && /^#{1,6}\s/.test(lastNonEmpty.trim());
  };
  const nextIsProblematic = (type: string | undefined) =>
    type === "faq" || type === "cta" || type === "micro-cta";
  const eligibleIdx = new Set<number>();
  blocks.forEach((b, i) => {
    if (b.type !== "markdown") return;
    if (!isSubstantialProse(b.body)) return;
    if (endsWithHeading(b.body)) return;
    const next = blocks[i + 1];
    if (nextIsProblematic(next?.type)) return;
    eligibleIdx.add(i);
  });
  const totalLen = blocks.reduce(
    (sum, b) => (b.body && b.body.trim().length > 0 ? sum + b.body.length : sum),
    0,
  );
  let midOneAfter = -1;
  let midTwoAfter = -1;
  if (!authorPlacedCTA && totalLen >= 3500 && eligibleIdx.size >= 2) {
    const eligibleSorted = Array.from(eligibleIdx).sort((a, b) => a - b);
    let cumulative = 0;
    const pctAt: Record<number, number> = {};
    blocks.forEach((b, i) => {
      if (b.body && b.body.trim().length > 0) cumulative += b.body.length;
      pctAt[i] = cumulative / totalLen;
    });
    // Pick the eligible break closest to 30% and to 70%.
    const closestTo = (target: number, exclude: number) =>
      eligibleSorted
        .filter((i) => i !== exclude)
        .reduce<{ i: number; d: number } | null>((best, i) => {
          const d = Math.abs(pctAt[i] - target);
          if (!best || d < best.d) return { i, d };
          return best;
        }, null);
    const first = closestTo(0.33, -1);
    if (first) midOneAfter = first.i;
    const second = closestTo(0.7, midOneAfter);
    if (second && Math.abs(pctAt[second.i] - pctAt[midOneAfter]) > 0.15)
      midTwoAfter = second.i;
    // Never insert at the very last block — ContinueExploring sits there.
    const lastEligible = eligibleSorted[eligibleSorted.length - 1];
    if (midTwoAfter === lastEligible && eligibleSorted.length > 1) midTwoAfter = -1;
  }



  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, idx) => {
        const rendered = (() => {
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
          case "compare-table":
            return <CompareTable key={idx} body={block.body} />;
          case "callout":
            return <Callout key={idx} body={block.body} />;
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
                  eyebrow={"\n\nAUSTIN METRO RESIDENTIAL · $2M+ · BUYER / SELLER BALANCE IN REAL TIME"}
                />
              </IntelInsert>
            );
          case "intel-gauge-austin-metro":
            return (
              <IntelInsert key={idx} tight>
                <MarketBalanceGauge
                  communityName="Greater Austin · All Price Points · All Property Types"
                  marketName="Austin Metro"
                  eyebrow={"\n\nGREATER AUSTIN · ALL PRICE POINTS · ALL PROPERTY TYPES · BUYER / SELLER BALANCE IN REAL TIME"}
                />
              </IntelInsert>
            );
          case "intel-gauge-lake-austin":
            return (
              <IntelInsert key={idx} tight>
                <MarketBalanceGauge
                  communityName="Lake Austin Waterfront · $2M+"
                  marketName="West Austin"
                  fallbackMarketName="Austin Metro"
                  eyebrow={"LAKE AUSTIN WATERFRONT · $2M+ · BUYER / SELLER BALANCE IN REAL TIME"}
                />
              </IntelInsert>
            );
          case "intel-gauge-austin-15m":
            return (
              <IntelInsert key={idx}>
                <MarketBalanceGauge
                  communityName="Austin Metro Residential $1.5M+"
                  marketName="Austin Metro"
                  fallbackMarketName="West Austin"
                  eyebrow={"AUSTIN METRO RESIDENTIAL · $1.5M+ · BUYER / SELLER BALANCE IN REAL TIME"}
                />
              </IntelInsert>
            );
          case "intel-gauge-lake-travis":
            return (
              <IntelInsert key={idx} tight>
                <MarketBalanceGauge
                  communityName="Lake Travis Waterfront · $2M+"
                  marketName="Lake Travis"
                  fallbackMarketName="Austin Metro"
                  eyebrow={"LAKE TRAVIS WATERFRONT · $2M+ · BUYER / SELLER BALANCE IN REAL TIME"}
                />
              </IntelInsert>
            );
          case "intel-gauge-tarrytown":
            return (
              <IntelInsert key={idx} tight>
                <MarketBalanceGauge
                  communityName="Tarrytown · 78703"
                  marketName="West Austin"
                  fallbackMarketName="Austin Metro"
                  eyebrow={"TARRYTOWN · 78703 · BUYER / SELLER BALANCE IN REAL TIME"}
                />
              </IntelInsert>
            );
          case "intel-gauge-westlake":
            return (
              <IntelInsert key={idx} tight>
                <MarketBalanceGauge
                  communityName="Westlake · 78746"
                  marketName="West Austin"
                  fallbackMarketName="Austin Metro"
                  eyebrow={"WESTLAKE · 78746 · BUYER / SELLER BALANCE IN REAL TIME"}
                />
              </IntelInsert>
            );
          case "intel-gauge-coa-sfr-2m":
            return (
              <IntelInsert key={idx} tight>
                <MarketBalanceGauge
                  communityName="City of Austin · Single Family · $2M+"
                  marketName="Central Austin"
                  fallbackMarketName="Austin Metro"
                  eyebrow={"CITY OF AUSTIN · SINGLE FAMILY · $2M+ · BUYER / SELLER BALANCE IN REAL TIME"}
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
        })();
        const insertMidOne = idx === midOneAfter;
        const insertMidTwo = idx === midTwoAfter;
        if (!insertMidOne && !insertMidTwo) return rendered;
        return (
          <div key={`wrap-${idx}`}>
            {rendered}
            {insertMidOne && (
              <InlineEditorialCTA
                cta={pathway.mid[0]}
                position="mid_1"
                category={category || ""}
                articleId={articleId}
              />
            )}
            {insertMidTwo && (
              <InlineEditorialCTA
                cta={pathway.mid[1]}
                position="mid_2"
                category={category || ""}
                articleId={articleId}
              />
            )}
          </div>
        );
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
