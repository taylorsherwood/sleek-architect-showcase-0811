import { CommunityDemographics } from "@/types/community";

interface Props {
  demographics: CommunityDemographics;
}

const DemographicsPanel = ({ demographics }: Props) => {
  const items = [
    { label: "Population", value: demographics.population?.toLocaleString() },
    {
      label: "Median Household Income",
      value: demographics.median_household_income != null
        ? `$${demographics.median_household_income.toLocaleString()}`
        : undefined,
    },
    { label: "Median Age", value: demographics.median_age?.toString() },
    {
      label: "Homeownership",
      value: demographics.homeownership_rate != null ? `${demographics.homeownership_rate}%` : undefined,
    },
    {
      label: "Bachelor's or Higher",
      value: demographics.education_bachelors_or_higher != null
        ? `${demographics.education_bachelors_or_higher}%`
        : undefined,
    },
    {
      label: "Avg. Household Size",
      value: demographics.average_household_size?.toString(),
    },
  ].filter((i) => i.value);

  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
        Demographics
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              {item.label}
            </p>
            <p className="text-2xl font-display text-architectural">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DemographicsPanel;
