import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidHNoZXJ3b29kIiwiYSI6ImNtbmY4aHgxODA2N3cycHEyMjdkdHNlbmQifQ.hx2cAV-r1oFxK03uouKCJQ";
const MAPBOX_STYLE = "mapbox://styles/tsherwood/cmnmnxfa5004c01s51d1h1rws";

type Marker = { name: string; coords: [number, number] };

const MARKERS: Marker[] = [
  { name: "Austin", coords: [-97.7431, 30.2672] },
  { name: "Dripping Springs", coords: [-98.0867, 30.1902] },
  { name: "Bee Cave", coords: [-97.9525, 30.3091] },
  { name: "Spicewood", coords: [-98.1622, 30.4691] },
  { name: "Lakeway", coords: [-97.9856, 30.3633] },
  { name: "Marble Falls", coords: [-98.2728, 30.5782] },
  { name: "Johnson City", coords: [-98.4117, 30.2766] },
  { name: "Fredericksburg", coords: [-98.8720, 30.2752] },
  { name: "Wimberley", coords: [-98.0978, 29.9974] },
  { name: "Liberty Hill", coords: [-97.9225, 30.6649] },
  { name: "Georgetown", coords: [-97.6779, 30.6332] },
  { name: "Burnet", coords: [-98.2284, 30.7588] },
  { name: "Blanco", coords: [-98.4225, 30.0982] },
];

const LandRanchMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      center: [-98.25, 30.35],
      zoom: 8.2,
      minZoom: 7,
      maxZoom: 14,
      projection: "mercator" as never,
      interactive: true,
      scrollZoom: false,
      attributionControl: false,
    });

    const m = map.current;
    m.setProjection("mercator" as never);
    m.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    m.on("click", () => m.scrollZoom.enable());
    mapContainer.current.addEventListener("mouseleave", () => m.scrollZoom.disable());

    m.on("load", () => {
      MARKERS.forEach(({ name, coords }) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 12px; height: 12px; border-radius: 50%;
          background: hsl(38 39% 61%); border: 2px solid #FCFBF9;
          box-shadow: 0 2px 6px rgba(12, 15, 36, 0.35);
          cursor: pointer;
        `;
        new mapboxgl.Marker({ element: el })
          .setLngLat(coords)
          .setPopup(
            new mapboxgl.Popup({ offset: 14, closeButton: false }).setHTML(
              `<div style="font-family:'Jost',sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#0C0F24;padding:4px 2px;">${name}</div>`
            )
          )
          .addTo(m);
      });
      setMapLoaded(true);
    });

    return () => {
      m.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden border border-[rgba(12,15,36,0.06)] shadow-[0_12px_40px_-12px_rgba(12,15,36,0.10)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10"
        style={{ height: 80, background: "linear-gradient(to bottom, hsl(var(--secondary) / 0.45), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{ height: 60, background: "linear-gradient(to top, hsl(var(--secondary) / 0.3), transparent)" }}
      />
      <div ref={mapContainer} className="w-full h-[440px] sm:h-[520px] md:h-[600px] lg:h-[660px]" />
    </div>
  );
};

export default LandRanchMap;
