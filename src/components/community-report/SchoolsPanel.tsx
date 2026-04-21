import { CommunitySchool } from "@/types/community";

interface Props {
  schools: CommunitySchool[];
}

const SchoolsPanel = ({ schools }: Props) => {
  if (!schools || schools.length === 0) return null;
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
        Nearby Schools
      </h2>
      <div className="space-y-px bg-border">
        {schools.map((school, i) => (
          <div key={i} className="bg-background p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-lg font-display text-architectural">{school.name}</p>
              {school.district && (
                <p className="text-sm text-muted-foreground">{school.district}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
              {school.grades && <span>Grades {school.grades}</span>}
              {school.enrollment != null && <span>{school.enrollment.toLocaleString()} students</span>}
              {school.ratio && <span>Ratio {school.ratio}</span>}
              {school.rating && <span className="text-gold">{school.rating}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SchoolsPanel;
