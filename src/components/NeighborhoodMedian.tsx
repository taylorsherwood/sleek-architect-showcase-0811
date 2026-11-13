import { formatNeighborhoodMedian, neighborhoodSourceNote } from "@/data/neighborhoodStats";

export default function NeighborhoodMedian({ area, className = "text-minimal text-gold mb-2" }: { area: string; className?: string }) {
  const value = formatNeighborhoodMedian(area);
  if (!value) return null;
  return <>
    <p className={className}>{value}</p>
  </>;
}