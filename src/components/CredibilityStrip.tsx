const items = [
  "Member of the eXp Luxury Division",
  "Global Network of Top-Producing Agents",
  "Data-Driven Market Intelligence",
];

const CredibilityStrip = () => {
  return (
    <div className="hidden md:block bg-secondary border-y border-border/40 py-5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-8 text-muted-foreground" style={{ transform: "translateX(12px)" }}>
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span
                className="text-[11px] uppercase font-medium"
                style={{ letterSpacing: "0.16em" }}
              >
                {item}
              </span>
              {i < items.length - 1 && (
                <span className="text-muted-foreground/40 text-[6px]">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CredibilityStrip;
