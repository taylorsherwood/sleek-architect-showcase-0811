const items = [
  "Member of the eXp Luxury Division",
  "Global Network of Top-Producing Agents",
  "Data-Driven Market Intelligence",
];

const CredibilityStrip = () => {
  return (
    <div className="hidden md:block bg-muted/30 border-y border-border/20 py-5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-8 text-muted-foreground/70">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span
                className="text-[10px] uppercase font-light"
                style={{ letterSpacing: "0.18em" }}
              >
                {item}
              </span>
              {i < items.length - 1 && (
                <span className="text-border text-[5px]">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CredibilityStrip;
