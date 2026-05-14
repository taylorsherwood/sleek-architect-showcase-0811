import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Listing, StorySection, ListingMedia } from "@/types/listing";
import { Sparkles, X, Wand2, Shuffle, Smartphone, Presentation, RefreshCw } from "lucide-react";

interface Props {
  listing: Listing;
  sections: StorySection[];
  media: ListingMedia[];
  onApply: (result: GeneratedResult, mode: ApplyMode) => Promise<void>;
  onClose: () => void;
}

export type ApplyMode = "replace" | "append" | "single";

export interface GeneratedSection {
  section_type: string;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  media_url: string | null;
  secondary_media_url: string | null;
  video_url: string | null;
  button_label: string | null;
  button_url: string | null;
  background_style: string;
  animation_style: string;
  is_visible: boolean;
}

export interface GeneratedResult {
  hero_eyebrow: string | null;
  short_intro: string | null;
  full_description: string | null;
  recommended_meta_title: string | null;
  recommended_meta_description: string | null;
  sections: GeneratedSection[];
}

type Mode = "full_story" | "regenerate_section" | "shuffle_layout" | "improve_mobile_flow" | "presentation_mode";

const inputCls =
  "w-full bg-background border border-foreground/15 px-3 py-2 text-sm text-architectural focus:border-gold outline-none transition-colors font-body";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-1.5">{label}</span>
    {children}
  </label>
);

const ActionButton = ({
  icon: Icon,
  label,
  hint,
  onClick,
  loading,
  disabled,
  primary,
}: {
  icon: React.ElementType;
  label: string;
  hint: string;
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  primary?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={loading || disabled}
    className={`group text-left p-5 border transition-all disabled:opacity-50 ${
      primary
        ? "bg-foreground text-background border-foreground hover:bg-gold hover:text-foreground hover:border-gold"
        : "bg-background border-foreground/15 hover:border-gold"
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4" />
      <span className="text-[10px] tracking-[0.3em] uppercase">{label}</span>
    </div>
    <p className={`text-xs leading-relaxed ${primary ? "opacity-80" : "text-muted-foreground"}`}>{hint}</p>
  </button>
);

const AiStudio = ({ listing, sections, media, onApply, onClose }: Props) => {
  // Brief state
  const [mlsRemarks, setMlsRemarks] = useState("");
  const [propertyDesc, setPropertyDesc] = useState(listing.full_description || "");
  const [sellingPoints, setSellingPoints] = useState("");
  const [renovation, setRenovation] = useState("");
  const [targetBuyer, setTargetBuyer] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [matterport, setMatterport] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [floorplanUrl, setFloorplanUrl] = useState("");
  const [tone, setTone] = useState("");

  const [generating, setGenerating] = useState(false);
  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callGenerate = async (mode: Mode, extra: Record<string, unknown> = {}) => {
    setGenerating(true);
    setActiveMode(mode);
    setError(null);
    setResult(null);

    const imageUrls = media.map((m) => m.media_url);
    const floorplanUrls = floorplanUrl ? [floorplanUrl] : [];

    const body = {
      mode,
      title: listing.title,
      address: listing.address,
      neighborhood: listing.neighborhood,
      city: listing.city,
      price: listing.price,
      beds: listing.beds,
      baths: listing.baths,
      sqft: listing.sqft,
      acres: listing.acres,
      year_built: listing.year_built,
      mls_remarks: mlsRemarks,
      property_description: propertyDesc,
      selling_points: sellingPoints,
      renovation_details: renovation,
      target_buyer: targetBuyer,
      neighborhood_positioning: neighborhood,
      matterport_url: matterport,
      video_url: videoUrl,
      floorplan_urls: floorplanUrls,
      image_urls: imageUrls,
      tone,
      ...extra,
    };

    try {
      const { data, error: invokeErr } = await supabase.functions.invoke("generate-listing-story", { body });
      if (invokeErr) throw new Error(invokeErr.message);
      if (data?.error) throw new Error(data.error);
      setResult(data as GeneratedResult);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Generation failed";
      setError(msg);
    } finally {
      setGenerating(false);
    }
  };

  const apply = async (mode: ApplyMode) => {
    if (!result) return;
    await onApply(result, mode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-foreground/55 backdrop-blur-sm flex items-stretch md:items-center justify-center p-0 md:p-6 overflow-y-auto">
      <div className="bg-[#FAFAF8] w-full md:max-w-5xl md:my-8 md:rounded-none border border-foreground/10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-foreground/10 sticky top-0 bg-[#FAFAF8] z-10">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-gold" />
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gold">AI Creative Director</p>
              <h2 className="font-display text-xl md:text-2xl text-architectural">Listing Story Studio</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Brief inputs */}
          <div className="px-6 md:px-8 py-6 grid md:grid-cols-2 gap-5 border-b border-foreground/10">
            <Field label="MLS Remarks">
              <textarea className={`${inputCls} min-h-[90px] resize-y`} value={mlsRemarks} onChange={(e) => setMlsRemarks(e.target.value)} placeholder="Paste raw MLS description…" />
            </Field>
            <Field label="Property Description">
              <textarea className={`${inputCls} min-h-[90px] resize-y`} value={propertyDesc} onChange={(e) => setPropertyDesc(e.target.value)} placeholder="What makes this home special architecturally?" />
            </Field>
            <Field label="Key Selling Points">
              <textarea className={`${inputCls} min-h-[80px] resize-y`} value={sellingPoints} onChange={(e) => setSellingPoints(e.target.value)} placeholder="One per line — e.g. 30-ft glass walls, creek views, designer kitchen…" />
            </Field>
            <Field label="Renovation Details">
              <textarea className={`${inputCls} min-h-[80px] resize-y`} value={renovation} onChange={(e) => setRenovation(e.target.value)} placeholder="What was done, by whom, what year…" />
            </Field>
            <Field label="Target Buyer">
              <textarea className={`${inputCls} min-h-[60px] resize-y`} value={targetBuyer} onChange={(e) => setTargetBuyer(e.target.value)} placeholder="e.g. design-conscious tech founder, weekend host, growing family" />
            </Field>
            <Field label="Neighborhood Positioning">
              <textarea className={`${inputCls} min-h-[60px] resize-y`} value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="Why this block, this street, this enclave?" />
            </Field>
            <Field label="Matterport URL">
              <input className={inputCls} value={matterport} onChange={(e) => setMatterport(e.target.value)} placeholder="https://my.matterport.com/show/?m=…" />
            </Field>
            <Field label="Video URL (YouTube / Vimeo / MP4)">
              <input className={inputCls} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://…" />
            </Field>
            <Field label="Floorplan URL (optional)">
              <input className={inputCls} value={floorplanUrl} onChange={(e) => setFloorplanUrl(e.target.value)} placeholder="https://…" />
            </Field>
            <Field label="Tone / Direction (optional)">
              <input className={inputCls} value={tone} onChange={(e) => setTone(e.target.value)} placeholder="e.g. quiet luxury, architectural, warm and lived-in" />
            </Field>
            <div className="md:col-span-2 text-xs text-muted-foreground">
              {media.length > 0 ? (
                <span>
                  <span className="text-gold">{media.length}</span> gallery image{media.length === 1 ? "" : "s"} available — the AI will choose hero-class shots and pair images with sections automatically.
                </span>
              ) : (
                <span className="text-destructive">No gallery images uploaded yet — sections will generate without imagery. Upload images first for the strongest result.</span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="px-6 md:px-8 py-6 border-b border-foreground/10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">Choose an action</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <ActionButton
                icon={Wand2}
                label="Generate Story"
                hint="Build a complete cinematic story from scratch with section ordering, copy, and image pairings."
                primary
                loading={generating && activeMode === "full_story"}
                onClick={() => callGenerate("full_story")}
              />
              <ActionButton
                icon={Shuffle}
                label="Shuffle Layout"
                hint="Reorder and re-balance the existing sections for better pacing."
                disabled={sections.length === 0}
                loading={generating && activeMode === "shuffle_layout"}
                onClick={() =>
                  callGenerate("shuffle_layout", {
                    current_sections: sections.map((s) => ({
                      section_type: s.section_type,
                      eyebrow: s.eyebrow,
                      title: s.title,
                      body: s.body,
                      media_url: s.media_url,
                      secondary_media_url: s.secondary_media_url,
                      video_url: s.video_url,
                      background_style: s.background_style,
                    })),
                  })
                }
              />
              <ActionButton
                icon={Smartphone}
                label="Improve Mobile Flow"
                hint="Re-pace the story for thumb-driven, image-led mobile reading."
                disabled={sections.length === 0}
                loading={generating && activeMode === "improve_mobile_flow"}
                onClick={() =>
                  callGenerate("improve_mobile_flow", {
                    current_sections: sections.map((s) => ({
                      section_type: s.section_type,
                      eyebrow: s.eyebrow,
                      title: s.title,
                      body: s.body,
                      media_url: s.media_url,
                      secondary_media_url: s.secondary_media_url,
                      video_url: s.video_url,
                      background_style: s.background_style,
                    })),
                  })
                }
              />
              <ActionButton
                icon={Presentation}
                label="Generate Presentation Mode"
                hint="Build a tight 8–12 slide deck flow optimized for full-screen presentation."
                loading={generating && activeMode === "presentation_mode"}
                onClick={() => callGenerate("presentation_mode")}
              />
              <ActionButton
                icon={RefreshCw}
                label="Regenerate Section"
                hint="Regenerate the first section's copy. (Open a section in the editor and use its own AI button for targeted regeneration.)"
                disabled={sections.length === 0}
                loading={generating && activeMode === "regenerate_section"}
                onClick={() => {
                  const s = sections[0];
                  callGenerate("regenerate_section", {
                    current_section: {
                      section_type: s.section_type,
                      eyebrow: s.eyebrow,
                      title: s.title,
                      body: s.body,
                    },
                  });
                }}
              />
            </div>
          </div>

          {/* Errors */}
          {error && (
            <div className="px-6 md:px-8 py-5 bg-destructive/5 border-b border-destructive/20">
              <p className="text-[10px] tracking-[0.3em] uppercase text-destructive mb-1">AI Error</p>
              <p className="text-sm text-foreground/80">{error}</p>
            </div>
          )}

          {/* Generating */}
          {generating && (
            <div className="px-6 md:px-8 py-12 text-center">
              <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-gold">
                <Sparkles className="w-4 h-4 animate-pulse" /> Composing story
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                The creative director is analyzing your brief and pacing the narrative…
              </p>
            </div>
          )}

          {/* Result preview */}
          {result && !generating && (
            <div className="px-6 md:px-8 py-6">
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-gold">Proposed Story</p>
                  <h3 className="font-display text-lg text-architectural mt-1">
                    {result.sections.length} section{result.sections.length === 1 ? "" : "s"}
                  </h3>
                </div>
              </div>

              {(result.short_intro || result.full_description) && (
                <div className="bg-background border border-foreground/10 p-5 mb-4">
                  {result.hero_eyebrow && (
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-2">{result.hero_eyebrow}</p>
                  )}
                  {result.short_intro && (
                    <p className="font-display text-lg md:text-xl text-architectural leading-snug mb-3">
                      {result.short_intro}
                    </p>
                  )}
                  {result.full_description && (
                    <p className="text-sm text-foreground/75 leading-relaxed whitespace-pre-line">
                      {result.full_description}
                    </p>
                  )}
                </div>
              )}

              <ol className="space-y-2 mb-6">
                {result.sections.map((s, i) => (
                  <li key={i} className="bg-background border border-foreground/10 p-4 flex gap-4">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground pt-1 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.media_url && (
                      <img src={s.media_url} alt="" className="w-16 h-16 object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gold">
                          {s.section_type.replace(/_/g, " ")}
                        </span>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                          · {s.background_style}
                        </span>
                      </div>
                      {s.eyebrow && <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{s.eyebrow}</p>}
                      {s.title && <p className="font-display text-base text-architectural leading-snug">{s.title}</p>}
                      {s.body && <p className="text-xs text-foreground/70 mt-1 line-clamp-2">{s.body}</p>}
                    </div>
                  </li>
                ))}
              </ol>

              <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-[#FAFAF8] py-4 border-t border-foreground/10">
                <button
                  onClick={() => apply("replace")}
                  className="flex-1 bg-foreground text-background text-[10px] tracking-[0.4em] uppercase py-3.5 hover:bg-gold hover:text-foreground transition-colors"
                >
                  Replace All Sections
                </button>
                <button
                  onClick={() => apply("append")}
                  className="flex-1 border border-foreground/20 text-[10px] tracking-[0.4em] uppercase py-3.5 hover:border-gold hover:text-gold transition-colors"
                >
                  Append to Existing
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground py-3.5 px-6 hover:text-foreground"
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiStudio;
