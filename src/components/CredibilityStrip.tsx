const CredibilityStrip = () => {
  return (
    <div className="hidden md:block bg-secondary border-y border-border/40 py-5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 items-center text-muted-foreground">
          <span
            className="text-[11px] uppercase font-medium text-center"
            style={{ letterSpacing: "0.16em" }}
          >
            eXp Luxury Division
          </span>
          <span
            className="text-[11px] uppercase font-medium text-center"
            style={{ letterSpacing: "0.16em" }}
          >
            CCIM Candidate
          </span>
          <span
            className="text-[11px] uppercase font-medium text-center"
            style={{ letterSpacing: "0.16em" }}
          >
            $125M+ Career Sales Volume
          </span>
        </div>
      </div>
    </div>
  );
};

export default CredibilityStrip;
