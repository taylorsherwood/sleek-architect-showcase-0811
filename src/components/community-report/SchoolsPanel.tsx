import { useMemo, useState } from "react";
import { CommunitySchool } from "@/types/community";

interface Props {
  schools: CommunitySchool[];
}

type Filter = "All" | "Elementary" | "Middle" | "High" | "Private";

const matchFilter = (school: CommunitySchool, filter: Filter): boolean => {
  if (filter === "All") return true;
  const grades = (school.grades || "").toUpperCase();
  const district = (school.district || "").toLowerCase();
  if (filter === "Private") return district.includes("private");
  if (filter === "Elementary") {
    return /\b(PK|K|EL|ELEM)\b/.test(grades) || /^(PK|K|[1-5])/.test(grades);
  }
  if (filter === "Middle") {
    return /\b(MS|MIDDLE)\b/.test(grades) || /[6-8]/.test(grades);
  }
  if (filter === "High") {
    return /\b(HS|HIGH)\b/.test(grades) || /9-?12|10|11|12/.test(grades);
  }
  return true;
};

const PLACEHOLDER_SCHOOLS: { name: string; district: string; grades: string }[] = [
  { name: "Add an elementary school", district: "Local ISD", grades: "PK-5" },
  { name: "Add a middle school", district: "Local ISD", grades: "6-8" },
  { name: "Add a high school", district: "Local ISD", grades: "9-12" },
];

const SchoolsPanel = ({ schools }: Props) => {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = useMemo(
    () => (schools || []).filter((s) => matchFilter(s, filter)),
    [schools, filter]
  );

  const hasData = schools && schools.length > 0;
  const filters: Filter[] = ["All", "Elementary", "Middle", "High", "Private"];

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-2">
        Schools
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {hasData
          ? "Schools serving the community. Filter by level to narrow results."
          : "Schools — populate via admin. Showing placeholder layout."}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[11px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {!hasData ? (
        <div className="space-y-px bg-border">
          {PLACEHOLDER_SCHOOLS.map((school, i) => (
            <div
              key={i}
              className="bg-background p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <p className="text-lg font-display text-muted-foreground/40 italic">{school.name}</p>
                <p className="text-sm text-muted-foreground/60 mt-1">{school.district}</p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground/60">
                <span>Grades {school.grades}</span>
              </div>
            </div>
          ))}
        </div>
      ) : visible.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">
          No {filter.toLowerCase()} schools currently listed for this community.
        </p>
      ) : (
        <div className="space-y-px bg-border">
          {visible.map((school, i) => (
            <div
              key={i}
              className="bg-background p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <p className="text-lg font-display text-architectural">{school.name}</p>
                {school.district && (
                  <p className="text-sm text-muted-foreground mt-1">{school.district}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                {school.grades && <span>Grades {school.grades}</span>}
                {school.enrollment != null && (
                  <span>{school.enrollment.toLocaleString()} students</span>
                )}
                {school.ratio && <span>Ratio {school.ratio}</span>}
                {school.rating && <span className="text-gold">{school.rating}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SchoolsPanel;
