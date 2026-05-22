import almarionImg from "@/assets/private-distribution/almarion-drive.jpg";
import flintridgeImg from "@/assets/private-distribution/flintridge-road.jpg";
import mistywoodImg from "@/assets/private-distribution/mistywood-drive.jpg";
import westlakeModernImg from "@/assets/private-distribution/mistywood-drive-interior.png";
import windsorRoadImg from "@/assets/private-distribution/windsor-road.jpg";
import greenleeDriveImg from "@/assets/private-distribution/greenlee-drive.jpg";
import mcculloughStreetImg from "@/assets/private-distribution/mccullough-street.jpg";
import bowieStreetImg from "@/assets/private-distribution/bowie-street.jpg";

/**
 * Maps image_key (kebab-case asset name stored in the database)
 * to the bundled asset URL. Adding new images means adding a new
 * import + entry here, then referencing the key from the admin
 * editor.
 */
export const PRIVATE_DISTRIBUTION_IMAGES: Record<string, string> = {
  "almarion-drive": almarionImg,
  "flintridge-road": flintridgeImg,
  "mistywood-drive": mistywoodImg,
  "mistywood-drive-interior": westlakeModernImg,
  "windsor-road": windsorRoadImg,
  "greenlee-drive": greenleeDriveImg,
  "mccullough-street": mcculloughStreetImg,
  "bowie-street": bowieStreetImg,
};

export const resolvePrivateImage = (key?: string | null): string | undefined => {
  if (!key) return undefined;
  // Allow direct URLs to pass through
  if (key.startsWith("http") || key.startsWith("/")) return key;
  return PRIVATE_DISTRIBUTION_IMAGES[key];
};
