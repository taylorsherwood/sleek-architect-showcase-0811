import { useMemo, useState } from "react";

const GOLD = "#b9a06c";

/** Parses "$1,234", "+10.0%", "95.1%", "5.3" into a sortable number. Falls back to the raw string. */
const toSortable = (v: string): number | string => {
  const n = parseFloat(v.replace(/[$,%x+]/g, ""));
  return Number.isNaN(n) || /[a-z]/i.test(v.replace(/x$/, "")) ? v.toLowerCase() : n;
};

const csvEscape = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

interface Props {
  body: string;
  renderInline: (t: string) => string;
}

/**
 * Sortable, filterable data table with CSV export and an optional collapsed
 * methodology note. Body: pipe rows (first row = header), then an optional
 * `---` line followed by methodology paragraphs.
 */
const ZipPriceTable = ({ body, renderInline }: Props) => {
  const [tablePart, notePart = ""] = body.split(/\n---\n/);
  const rows = tablePart
    .split("\n")
    .map((r) => r.split("|").map((c) => c.trim()))
    .filter((r) => r.length > 1);
  const [header, ...data] = rows;

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ col: number; dir: 1 | -1 }>({ col: 0, dir: 1 });

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? data.filter((r) => r.slice(0, 3).some((c) => c.toLowerCase().includes(q)))
      : data;
    return [...filtered].sort((a, b) => {
      const x = toSortable(a[sort.col]);
      const y = toSortable(b[sort.col]);
      if (typeof x === "number" && typeof y === "number") return (x - y) * sort.dir;
      return String(x).localeCompare(String(y)) * sort.dir;
    });
  }, [data, query, sort]);

  const onSort = (col: number) =>
    setSort((s) => (s.col === col ? { col, dir: (s.dir * -1) as 1 | -1 } : { col, dir: 1 }));

  const downloadCsv = () => {
    const csv = [header, ...data].map((r) => r.map(csvEscape).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "austin-home-prices-by-zip-code-2026-10.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Sticky column: the ZIP column (index 1 when a Rank column leads, else 0).
  const stickyCol = header[0]?.toLowerCase() === "rank" ? 1 : 0;

  return (
    <div className="my-12 not-prose" id="download">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-6">
        <label className="flex-1 max-w-sm">
          <span className="block text-[10.5px] uppercase tracking-[0.18em] mb-2" style={{ color: GOLD }}>
            Find a ZIP or neighborhood
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="78746, Tarrytown, Circle C"
            className="w-full bg-transparent border-0 border-b border-foreground/25 focus:border-foreground/60 focus:outline-none py-2 text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-colors duration-300"
          />
        </label>
        <button
          type="button"
          onClick={downloadCsv}
          className="self-start sm:self-auto text-[11px] uppercase tracking-[0.18em] text-foreground border-b border-foreground/30 hover:border-foreground pb-1 transition-colors duration-300"
        >
          Download CSV
        </button>
      </div>

      <div className="-mx-6 md:mx-0 overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr className="border-b border-foreground/20">
              {header.map((h, i) => {
                const active = sort.col === i;
                return (
                  <th
                    key={i}
                    scope="col"
                    aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
                    className={`text-left align-bottom py-4 px-4 font-normal ${i === stickyCol ? "sticky left-0 z-10 bg-background" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => onSort(i)}
                      className="text-[10.5px] uppercase tracking-[0.1em] leading-[1.4] whitespace-nowrap hover:opacity-70 transition-opacity duration-300"
                      style={{ color: i === 0 || i === stickyCol ? undefined : GOLD }}
                    >
                      {h}
                      <span className="ml-1 inline-block w-2" aria-hidden>
                        {active ? (sort.dir === 1 ? "↑" : "↓") : ""}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.join("|")} className="border-b border-foreground/10 last:border-b-0">
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`py-3.5 px-4 text-[14px] leading-[1.5] ${
                      cIdx === stickyCol
                        ? "sticky left-0 z-10 bg-background text-foreground tracking-[0.06em]"
                        : cIdx === stickyCol + 1
                          ? "text-muted-foreground min-w-[220px]"
                          : "text-muted-foreground whitespace-nowrap tabular-nums"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            {!visible.length && (
              <tr>
                <td colSpan={header.length} className="py-8 px-4 text-[14px] text-muted-foreground">
                  No ZIP or neighborhood matches "{query}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {notePart.trim() && (
        <details id="methodology-and-data-notes" className="group mt-8 border-t border-foreground/15 pt-5 scroll-mt-32">
          <summary className="cursor-pointer list-none flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-foreground">
            Methodology and data notes
            <span className="transition-transform duration-300 group-open:rotate-45" style={{ color: GOLD }} aria-hidden>
              +
            </span>
          </summary>
          <div className="mt-5 space-y-4">
            {notePart
              .trim()
              .split(/\n\s*\n/)
              .map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-[1.85] text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: renderInline(para) }}
                />
              ))}
          </div>
        </details>
      )}
    </div>
  );
};

export default ZipPriceTable;
