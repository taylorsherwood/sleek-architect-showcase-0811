import { Award } from "lucide-react";

const CredibilityStrip = () => {
  return (
    <div className="bg-muted/50 border-y border-border/30 py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <Award className="w-4 h-4 text-gold shrink-0" />
          <p className="text-xs tracking-[0.15em] uppercase font-light">
            Member of the eXp Luxury Division
            <span className="mx-2 text-border">|</span>
            Global Network of Top-Producing Agents
          </p>
        </div>
      </div>
    </div>
  );
};

export default CredibilityStrip;
