const items = [
  "Member of the eXp Luxury Division",
  "Global Network of Top-Producing Agents",
  "Data-Driven Market Intelligence",
];

const CredibilityStrip = () => {
  return (
    <div className="hidden md:block bg-muted/50 border-y border-border/30 py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-6">
              <span
                className="text-xs uppercase"
                style={{ letterSpacing: "0.14em", fontWeight: 400 }}
              >
                {item}
              </span>
              {i < items.length - 1 && (
                <span className="text-border/60 text-[0.5rem]">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CredibilityStrip;
