// Supabase Edge Function: generate-listing-story
// AI creative director for luxury listing presentations.
// Accepts a brief + media inventory and returns a structured story plan.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

type Mode =
  | "full_story"
  | "regenerate_section"
  | "shuffle_layout"
  | "improve_mobile_flow"
  | "presentation_mode";

interface Brief {
  mode: Mode;
  // Property facts
  title?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  price?: number | null;
  beds?: number | null;
  baths?: number | null;
  sqft?: number | null;
  acres?: number | null;
  year_built?: number | null;
  // Source content
  mls_remarks?: string;
  property_description?: string;
  selling_points?: string;
  renovation_details?: string;
  target_buyer?: string;
  neighborhood_positioning?: string;
  // Media
  matterport_url?: string;
  video_url?: string;
  video_urls?: string[];
  floorplan_urls?: string[];
  image_urls?: string[];
  // Tone
  tone?: string;
  // For regenerate_section
  current_section?: {
    section_type: string;
    eyebrow?: string;
    title?: string;
    body?: string;
  };
  // For shuffle/improve modes
  current_sections?: Array<{
    section_type: string;
    eyebrow?: string;
    title?: string;
    body?: string;
    media_url?: string;
    secondary_media_url?: string;
    video_url?: string;
    background_style?: string;
  }>;
}

const SECTION_TYPES = [
  "editorial_text",
  "full_bleed_image",
  "image_text_split",
  "quote",
  "gallery",
  "video",
  "floorplan",
  "matterport",
  "map",
  "neighborhood",
  "renovation_highlights",
  "lifestyle",
  "cta",
];

const SYSTEM_PROMPT = `You are the creative director for Echelon Property Group — an Austin luxury real-estate brand whose listing presentations sit at the level of Aman Resorts, Architectural Digest, and Sotheby's editorial.

Your job: take the agent's raw brief and turn it into a cinematic, mobile-first listing story.

Rules of the house:
- Editorial restraint. No template real-estate clichés. No "luxury" as filler. No "nestled," "boasts," "stunning," "must-see," "dream home," "pristine," exclamation points.
- Headlines are confident and specific. Eyebrows are 2–4 words, all-caps in CSS (you write them in normal case, e.g. "The Residence", "By the Creek", "An Architect's Hand").
- Body copy is 2–4 short paragraphs maximum per section, sentence-led, present tense, sensory and architectural.
- Vary section types. Do NOT stack two of the same kind in a row. Pace: editorial → image → editorial → quote → gallery → split → full-bleed → map → neighborhood → CTA. Always end on a CTA.
- Choose media intentionally. Hero-class wide exteriors → full_bleed_image. Architectural details → image_text_split. Many uniform interiors → gallery. Renovations → renovation_highlights (use floorplan/before-after if provided).
- Background rhythm: alternate ivory/warm with one or two navy moments for drama. Quote sections often feel best on warm or navy.
- Mobile flow: keep early sections (first 3) tight, image-led, and emotionally anchored. Don't open with a wall of text.
- One quote section per story, max. One renovation_highlights section, max. One map section.
- For media references, use media_index = the position in the provided image_urls array, or -1 for none.
- If a Matterport URL is provided, include exactly one matterport section (mid-story). If a video URL is provided, include exactly one video section.
- Always end with a cta section on navy background.

Output format: call the compose_story tool with structured sections.`;

const buildPrompt = (b: Brief): string => {
  const lines: string[] = [];
  lines.push(`MODE: ${b.mode}`);
  lines.push("");
  lines.push("=== PROPERTY ===");
  if (b.title) lines.push(`Title: ${b.title}`);
  if (b.address) lines.push(`Address: ${b.address}`);
  if (b.neighborhood) lines.push(`Neighborhood: ${b.neighborhood}`);
  if (b.city) lines.push(`City: ${b.city}`);
  if (b.price) lines.push(`Price: $${b.price.toLocaleString()}`);
  const stats = [
    b.beds && `${b.beds} bed`,
    b.baths && `${b.baths} bath`,
    b.sqft && `${b.sqft.toLocaleString()} sqft`,
    b.acres && `${b.acres} ac`,
    b.year_built && `built ${b.year_built}`,
  ].filter(Boolean);
  if (stats.length) lines.push(`Stats: ${stats.join(" · ")}`);

  if (b.mls_remarks) {
    lines.push("");
    lines.push("=== MLS REMARKS ===");
    lines.push(b.mls_remarks);
  }
  if (b.property_description) {
    lines.push("");
    lines.push("=== PROPERTY DESCRIPTION ===");
    lines.push(b.property_description);
  }
  if (b.selling_points) {
    lines.push("");
    lines.push("=== KEY SELLING POINTS ===");
    lines.push(b.selling_points);
  }
  if (b.renovation_details) {
    lines.push("");
    lines.push("=== RENOVATION DETAILS ===");
    lines.push(b.renovation_details);
  }
  if (b.target_buyer) {
    lines.push("");
    lines.push("=== TARGET BUYER ===");
    lines.push(b.target_buyer);
  }
  if (b.neighborhood_positioning) {
    lines.push("");
    lines.push("=== NEIGHBORHOOD POSITIONING ===");
    lines.push(b.neighborhood_positioning);
  }
  if (b.tone) {
    lines.push("");
    lines.push("=== TONE / DIRECTION ===");
    lines.push(b.tone);
  }

  lines.push("");
  lines.push("=== AVAILABLE MEDIA ===");
  if (b.image_urls && b.image_urls.length) {
    lines.push(`${b.image_urls.length} gallery images available, indexed 0..${b.image_urls.length - 1}.`);
    lines.push(
      "Refer to images by media_index. Do not invent URLs. The first image is usually the most hero-worthy unless context suggests otherwise."
    );
  } else {
    lines.push("No gallery images uploaded — leave media_index = -1 for image fields.");
  }
  if (b.floorplan_urls && b.floorplan_urls.length) {
    lines.push(`Floorplan available (${b.floorplan_urls.length}). Include a 'floorplan' section.`);
  }
  if (b.matterport_url) lines.push(`Matterport URL provided — include a 'matterport' section.`);
  const videoList = (b.video_urls && b.video_urls.length ? b.video_urls : (b.video_url ? [b.video_url] : []));
  if (videoList.length) {
    lines.push(
      `${videoList.length} video clip(s) available, indexed 0..${videoList.length - 1}. Include up to ${Math.min(videoList.length, 3)} 'video' section(s) — short clips work as motion accents between editorial moments, longer videos as a single anchor moment. Reference clips by video_index. In presentation_mode, weave clips between hero stills for cinematic pacing.`
    );
  }

  if (b.mode === "regenerate_section" && b.current_section) {
    lines.push("");
    lines.push("=== REGENERATE THIS ONE SECTION ===");
    lines.push(`Type: ${b.current_section.section_type}`);
    lines.push(`Current eyebrow: ${b.current_section.eyebrow || "(none)"}`);
    lines.push(`Current title: ${b.current_section.title || "(none)"}`);
    lines.push(`Current body: ${b.current_section.body || "(none)"}`);
    lines.push("Return ONE section in the sections array with fresh copy. Keep section_type unchanged.");
  }

  if (b.mode === "shuffle_layout" || b.mode === "improve_mobile_flow") {
    lines.push("");
    lines.push("=== EXISTING SECTIONS ===");
    (b.current_sections || []).forEach((s, i) => {
      lines.push(`#${i + 1} ${s.section_type} | eyebrow="${s.eyebrow || ""}" | title="${s.title || ""}"`);
    });
    if (b.mode === "shuffle_layout") {
      lines.push(
        "Reorder and re-balance these sections (you may swap section_type for ones that pace better, change backgrounds, swap image_text_split direction, etc.). Keep the same overall content. Return the full new sections array."
      );
    } else {
      lines.push(
        "Optimize for mobile flow: front-load emotional hero imagery, keep first 3 sections short and image-led, push long copy down, ensure no two same-type sections back to back. Return the full new sections array."
      );
    }
  }

  if (b.mode === "presentation_mode") {
    lines.push("");
    lines.push(
      "Build a tight 8–12 slide presentation flow (one section per slide). Favor full_bleed_image, image_text_split, quote, and a final cta. Keep copy short — these are slides."
    );
  }

  return lines.join("\n");
};

const TOOL = {
  type: "function" as const,
  function: {
    name: "compose_story",
    description: "Compose a luxury listing story with structured sections.",
    parameters: {
      type: "object",
      properties: {
        hero_eyebrow: { type: "string", description: "Short eyebrow above hero (e.g. 'Active', 'Coming Soon', neighborhood name)." },
        short_intro: { type: "string", description: "One-line editorial headline used under the hero (1 sentence, max ~120 chars)." },
        full_description: { type: "string", description: "2–3 short paragraphs of editorial intro copy." },
        recommended_meta_title: { type: "string" },
        recommended_meta_description: { type: "string", description: "<160 chars" },
        sections: {
          type: "array",
          items: {
            type: "object",
            properties: {
              section_type: { type: "string", enum: SECTION_TYPES },
              eyebrow: { type: "string" },
              title: { type: "string" },
              body: { type: "string" },
              media_index: {
                type: "integer",
                description: "Index into the provided image_urls array, or -1 for none.",
              },
              secondary_media_index: {
                type: "integer",
                description: "For renovation_highlights 'after' image, or -1.",
              },
              video_url: { type: "string", description: "Empty string if not used. Prefer video_index when picking from provided clips." },
              video_index: {
                type: "integer",
                description: "Index into the provided video_urls array, or -1 for none. Use this for 'video' section type when clips are available.",
              },
              button_label: { type: "string" },
              button_url: { type: "string" },
              background_style: { type: "string", enum: ["ivory", "warm", "navy", "gold"] },
            },
            required: ["section_type", "media_index", "secondary_media_index", "background_style"],
            additionalProperties: false,
          },
        },
      },
      required: ["sections"],
      additionalProperties: false,
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const brief = (await req.json()) as Brief;
    if (!brief?.mode) {
      return new Response(JSON.stringify({ error: "mode is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userPrompt = buildPrompt(brief);

    const aiResp = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "compose_story" } },
      }),
    });

    if (aiResp.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit reached. Please wait a moment and try again." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (aiResp.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI gateway error", aiResp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error", detail: t }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiJson = await aiResp.json();
    const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("No tool call in AI response", JSON.stringify(aiJson).slice(0, 1000));
      return new Response(JSON.stringify({ error: "AI did not return structured output" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let parsed: any;
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON from AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Resolve media_index → media_url, inject matterport/video URLs, sanitize
    const images = brief.image_urls || [];
    const floorplan = brief.floorplan_urls?.[0] || "";
    const sections = (parsed.sections || []).map((s: any) => {
      const idx = typeof s.media_index === "number" ? s.media_index : -1;
      const idx2 = typeof s.secondary_media_index === "number" ? s.secondary_media_index : -1;
      let media_url = idx >= 0 && idx < images.length ? images[idx] : "";
      const secondary_media_url = idx2 >= 0 && idx2 < images.length ? images[idx2] : "";
      let video_url = s.video_url || "";

      // Type-specific media resolution
      if (s.section_type === "matterport" && brief.matterport_url) video_url = brief.matterport_url;
      if (s.section_type === "video" && brief.video_url) video_url = brief.video_url;
      if (s.section_type === "floorplan" && floorplan) media_url = floorplan;

      return {
        section_type: s.section_type,
        eyebrow: s.eyebrow || null,
        title: s.title || null,
        body: s.body || null,
        media_url: media_url || null,
        secondary_media_url: secondary_media_url || null,
        video_url: video_url || null,
        button_label: s.button_label || null,
        button_url: s.button_url || null,
        background_style: s.background_style || "ivory",
        animation_style: "fade",
        is_visible: true,
      };
    });

    return new Response(
      JSON.stringify({
        ok: true,
        hero_eyebrow: parsed.hero_eyebrow || null,
        short_intro: parsed.short_intro || null,
        full_description: parsed.full_description || null,
        recommended_meta_title: parsed.recommended_meta_title || null,
        recommended_meta_description: parsed.recommended_meta_description || null,
        sections,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e: unknown) {
    console.error("generate-listing-story error", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
