import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MovingToAustinGuideCTA() {
  return (
    <Button asChild variant="link" className="h-auto max-w-full p-0 text-left text-foreground hover:text-gold whitespace-normal rounded-none">
      <Link to="/austin-relocation-guide" className="inline-flex items-center gap-3 leading-relaxed">
        <span>Get the full 2026 Moving to Austin Guide</span>
        <ArrowRight className="shrink-0" aria-hidden="true" />
      </Link>
    </Button>
  );
}