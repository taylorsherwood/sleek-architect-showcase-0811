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
      interactive: true,
      scrollZoom: false,
      attributionControl: false,
    });

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

      // Query all rendered layers for clickable points
      m.on("click", (e) => {
        const features = m.queryRenderedFeatures(e.point);
        if (!features.length) return;

        // Find a point feature with properties
        const feature = features.find(
          (f) =>
            f.geometry.type === "Point" &&
            f.properties &&
            Object.keys(f.properties).length > 0
        );
        if (!feature || feature.geometry.type !== "Point") return;

        const props = feature.properties || {};
        const title = props.title || props.name || props.address || props.Address || "";
        const price = props.price || props.Price || "";
        const neighborhood = props.neighborhood || props.Neighborhood || props.area || "";
        const description = props.description || "";

        // Only show popup if there's meaningful content
        if (!title && !price && !description) return;

        let html = `<div class="epg-popup">`;
        if (title) html += `<div class="epg-popup-title">${title}</div>`;
        if (price) html += `<div class="epg-popup-price">${price}</div>`;
        if (neighborhood) html += `<div class="epg-popup-neighborhood">${neighborhood}</div>`;
        if (description && !title) html += `<div class="epg-popup-desc">${description}</div>`;
        html += `</div>`;

        const coords = (feature.geometry as GeoJSON.Point).coordinates.slice() as [number, number];

        new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: true,
          maxWidth: "280px",
          className: "epg-mapbox-popup",
          offset: 12,
        })
          .setLngLat(coords)
          .setHTML(html)
          .addTo(m);
      });

      // Change cursor on hoverable points
      m.on("mousemove", (e) => {
        const features = m.queryRenderedFeatures(e.point);
        const hasPoint = features.some(
          (f) =>
            f.geometry.type === "Point" &&
            f.properties &&
            Object.keys(f.properties).length > 0
        );
        m.getCanvas().style.cursor = hasPoint ? "pointer" : "";
      });
    });

    return () => {
      m.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={mapContainer}
        className="w-full h-[420px] sm:h-[500px] md:h-[600px] lg:h-[650px]"
      />
    </div>
  );
};

export default TransactionsMap;
