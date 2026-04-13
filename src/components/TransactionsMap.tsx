import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidHNoZXJ3b29kIiwiYSI6ImNtbmY4aHgxODA2N3cycHEyMjdkdHNlbmQifQ.hx2cAV-r1oFxK03uouKCJQ";
const MAPBOX_STYLE = "mapbox://styles/tsherwood/cmnmnxfa5004c01s51d1h1rws";

const TransactionsMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      center: [-97.7431, 30.2672],
      zoom: 9,
      minZoom: 8,
      maxZoom: 16,
      projection: "mercator" as any,
      interactive: true,
      scrollZoom: false,
      attributionControl: false,
    });

    map.current.setProjection("mercator" as any);

    const m = map.current;

    // Minimal controls
    m.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    // Enable scroll zoom on click
    m.on("click", () => {
      m.scrollZoom.enable();
    });

    // Disable scroll zoom when mouse leaves
    mapContainer.current.addEventListener("mouseleave", () => {
      m.scrollZoom.disable();
    });

    m.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      m.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="relative w-full rounded-[22px] overflow-hidden border border-[rgba(0,0,0,0.06)] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.10)]">
      {/* Top fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10"
        style={{
          height: 100,
          background: "linear-gradient(to bottom, hsl(var(--secondary) / 0.55), transparent)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: 60,
          background: "linear-gradient(to top, hsl(var(--secondary) / 0.35), transparent)",
        }}
      />
      <div
        ref={mapContainer}
        className="w-full h-[440px] sm:h-[520px] md:h-[620px] lg:h-[660px]"
      />
    </div>
  );
};

export default TransactionsMap;
