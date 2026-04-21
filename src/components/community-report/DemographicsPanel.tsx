import { CommunityDemographics } from "@/types/community";

interface Props {
  demographics: CommunityDemographics;
}

const DemographicsPanel = ({ demographics }: Props) => {
  const items = [
    {
      label: "Total Population",
      value: demographics.population?.toLocaleString(),
      sub: "Residents",
    },
    {
      label: "Median Household Income",
      value:
        demographics.median_household_income != null
          ? `$${demographics.median_household_income.toLocaleString()}`
          : undefined,
      sub: "Per year",
    },
    {
      label: "Median Age",
      value: demographics.median_age?.toString(),
      sub: "Years old",
    },
    {
      label: "Homeownership",
      value:
        demographics.homeownership_rate != null
          ? `${demographics.homeownership_rate}%`
          : undefined,
      sub: "Owner-occupied homes",
    },
    {
      label: "Education Level",
      value:
        demographics.education_bachelors_or_higher != null
          ? `${demographics.education_bachelors_or_higher}%`
          : undefined,
      sub: "Bachelor's or higher",
    },
    {
      label: "Average Household Size",
      value: demographics.average_household_size?.toString(),
      sub: "Persons per household",
    },
  ];

  const hasData = items.some((i) => i.value);

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-2">
        Demographics
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        {hasData
          ? "Key demographic metrics for the area, based on the latest available US Census data."
          : "Demographic metrics — populate via admin. Showing placeholder layout."}
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
        {items.map((item) => (
          <div key={item.label} className="bg-background p-6">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
              {item.label}
            </p>
            <p
              className={`text-3xl font-display mb-1 ${
                item.value ? "text-architectural" : "text-muted-foreground/40"
              }`}
            >
              {item.value || "—"}
            </p>
            <p className="text-xs text-muted-foreground">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DemographicsPanel;
