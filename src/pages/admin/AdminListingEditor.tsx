import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { SECTION_TYPES, type Listing, type StorySection, type ListingMedia, type SectionType } from "@/types/listing";
import { ChevronUp, ChevronDown, Trash2, Eye, EyeOff, Upload, Sparkles } from "lucide-react";
import AiStudio, { type GeneratedResult, type ApplyMode } from "@/components/admin/AiStudio";

const Field = ({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) => (
  <label className={`block ${full ? "col-span-2" : ""}`}>
    <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-1.5">{label}</span>
    {children}
  </label>
);

const inputCls =
  "w-full bg-background border border-foreground/15 px-3 py-2 text-sm text-architectural focus:border-gold outline-none transition-colors font-body";

const AdminListingEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, isAdmin, loading } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [sections, setSections] = useState<StorySection[]>([]);
  const [media, setMedia] = useState<ListingMedia[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin || !slug) return;
    (async () => {
      const { data: l } = await supabase.from("listings").select("*").eq("slug", slug).maybeSingle();
      if (!l) return;
      setListing(l as Listing);
      const [{ data: s }, { data: m }] = await Promise.all([
        supabase.from("story_sections").select("*").eq("listing_id", l.id).order("display_order"),
        supabase.from("listing_media").select("*").eq("listing_id", l.id).order("display_order"),
      ]);
      setSections((s as StorySection[]) || []);
      setMedia((m as ListingMedia[]) || []);
    })();
  }, [isAdmin, slug]);

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin" replace />;
  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 text-center text-muted-foreground">Loading…</div>
      </div>
    );
  }

  const update = (patch: Partial<Listing>) => setListing((l) => (l ? { ...l, ...patch } : l));

  const save = async () => {
    if (!listing) return;
    setSaving(true);
    const { error } = await supabase.from("listings").update(listing).eq("id", listing.id);
    setSaving(false);
    if (error) return alert(error.message);
    setSavedAt(new Date().toLocaleTimeString());
  };

  // Section operations
  const addSection = async (type: SectionType) => {
    const { data, error } = await supabase
      .from("story_sections")
      .insert({
        listing_id: listing.id,
        section_type: type,
        display_order: sections.length,
        is_visible: true,
        background_style: "ivory",
      })
      .select()
      .single();
    if (error) return alert(error.message);
    setSections([...sections, data as StorySection]);
  };

  const updateSection = (id: string, patch: Partial<StorySection>) => {
    setSections((arr) => arr.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const saveSection = async (s: StorySection) => {
    const { error } = await supabase.from("story_sections").update(s).eq("id", s.id);
    if (error) alert(error.message);
  };

  const deleteSection = async (id: string) => {
    if (!confirm("Delete this section?")) return;
    await supabase.from("story_sections").delete().eq("id", id);
    setSections((a) => a.filter((s) => s.id !== id));
  };

  const moveSection = async (id: string, dir: -1 | 1) => {
    const idx = sections.findIndex((s) => s.id === id);
    const j = idx + dir;
    if (idx < 0 || j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[idx], next[j]] = [next[j], next[idx]];
    next.forEach((s, i) => (s.display_order = i));
    setSections(next);
    await Promise.all(
      next.map((s) => supabase.from("story_sections").update({ display_order: s.display_order }).eq("id", s.id))
    );
  };

  // Media upload
  const uploadFile = async (file: File, target: "hero" | "gallery" | string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${listing.id}/${target}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("listing-media").upload(path, file, { upsert: true });
    if (error) {
      alert(error.message);
      return null;
    }
    const { data } = supabase.storage.from("listing-media").getPublicUrl(path);
    return data.publicUrl;
  };

  const onHeroUpload = async (file: File) => {
    setUploading(true);
    const url = await uploadFile(file, "hero");
    setUploading(false);
    if (url) {
      update({ hero_image_url: url });
      await supabase.from("listings").update({ hero_image_url: url }).eq("id", listing.id);
    }
  };

  const onGalleryUpload = async (files: FileList) => {
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const url = await uploadFile(files[i], "gallery");
      if (url) {
        const { data } = await supabase
          .from("listing_media")
          .insert({
            listing_id: listing.id,
            media_url: url,
            media_type: "gallery",
            display_order: media.length + i,
          })
          .select()
          .single();
        if (data) setMedia((m) => [...m, data as ListingMedia]);
      }
    }
    setUploading(false);
  };

  const removeMedia = async (id: string) => {
    await supabase.from("listing_media").delete().eq("id", id);
    setMedia((m) => m.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navigation />
      <div className="pt-28 pb-32">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div>
              <Link to="/admin/listing-stories" className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-gold">
                ← All Listings
              </Link>
              <h1 className="font-display text-2xl md:text-3xl text-architectural mt-2">{listing.title}</h1>
              <p className="text-xs text-muted-foreground mt-1">/listing/{listing.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              {savedAt && <span className="text-xs text-muted-foreground">Saved {savedAt}</span>}
              <Link
                to={`/listing/${listing.slug}`}
                target="_blank"
                className="text-xs tracking-[0.25em] uppercase border border-foreground/20 px-4 py-2 hover:border-gold hover:text-gold"
              >
                Preview
              </Link>
              <button
                onClick={async () => {
                  update({ is_published: !listing.is_published });
                  await supabase.from("listings").update({ is_published: !listing.is_published }).eq("id", listing.id);
                }}
                className={`text-xs tracking-[0.25em] uppercase px-4 py-2 transition-colors ${
                  listing.is_published ? "bg-gold text-foreground" : "border border-foreground/20 text-muted-foreground"
                }`}
              >
                {listing.is_published ? "Live" : "Publish"}
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="text-xs tracking-[0.3em] uppercase bg-foreground text-background px-5 py-2 hover:bg-gold hover:text-foreground transition-colors disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>

          {/* CORE FIELDS */}
          <Card title="Listing Details">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Title" full>
                <input className={inputCls} value={listing.title || ""} onChange={(e) => update({ title: e.target.value })} />
              </Field>
              <Field label="Slug">
                <input className={inputCls} value={listing.slug || ""} onChange={(e) => update({ slug: e.target.value })} />
              </Field>
              <Field label="Status">
                <input className={inputCls} value={listing.status || ""} onChange={(e) => update({ status: e.target.value })} placeholder="Active / Pending / Coming Soon" />
              </Field>
              <Field label="Address" full>
                <input className={inputCls} value={listing.address || ""} onChange={(e) => update({ address: e.target.value })} />
              </Field>
              <Field label="Neighborhood">
                <input className={inputCls} value={listing.neighborhood || ""} onChange={(e) => update({ neighborhood: e.target.value })} />
              </Field>
              <Field label="City">
                <input className={inputCls} value={listing.city || ""} onChange={(e) => update({ city: e.target.value })} />
              </Field>
              <Field label="State">
                <input className={inputCls} value={listing.state || ""} onChange={(e) => update({ state: e.target.value })} />
              </Field>
              <Field label="Zip">
                <input className={inputCls} value={listing.zip || ""} onChange={(e) => update({ zip: e.target.value })} />
              </Field>
              <Field label="Price (USD)">
                <input
                  className={inputCls}
                  type="number"
                  value={listing.price ?? ""}
                  onChange={(e) => update({ price: e.target.value ? Number(e.target.value) : null })}
                />
              </Field>
              <Field label="MLS #">
                <input className={inputCls} value={listing.mls_number || ""} onChange={(e) => update({ mls_number: e.target.value })} />
              </Field>
              <Field label="Property Type">
                <input className={inputCls} value={listing.property_type || ""} onChange={(e) => update({ property_type: e.target.value })} />
              </Field>
              <Field label="Beds">
                <input className={inputCls} type="number" value={listing.beds ?? ""} onChange={(e) => update({ beds: e.target.value ? Number(e.target.value) : null })} />
              </Field>
              <Field label="Baths">
                <input className={inputCls} type="number" step="0.5" value={listing.baths ?? ""} onChange={(e) => update({ baths: e.target.value ? Number(e.target.value) : null })} />
              </Field>
              <Field label="Sqft">
                <input className={inputCls} type="number" value={listing.sqft ?? ""} onChange={(e) => update({ sqft: e.target.value ? Number(e.target.value) : null })} />
              </Field>
              <Field label="Acres">
                <input className={inputCls} type="number" step="0.01" value={listing.acres ?? ""} onChange={(e) => update({ acres: e.target.value ? Number(e.target.value) : null })} />
              </Field>
              <Field label="Year Built">
                <input className={inputCls} type="number" value={listing.year_built ?? ""} onChange={(e) => update({ year_built: e.target.value ? Number(e.target.value) : null })} />
              </Field>
            </div>
          </Card>

          {/* HERO MEDIA */}
          <Card title="Hero Media">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Hero Image URL" full>
                <input className={inputCls} value={listing.hero_image_url || ""} onChange={(e) => update({ hero_image_url: e.target.value })} />
              </Field>
              <Field label="Or upload hero image" full>
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs tracking-[0.25em] uppercase border border-foreground/20 px-4 py-2 hover:border-gold">
                  <Upload className="w-3.5 h-3.5" /> {uploading ? "Uploading…" : "Choose File"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && onHeroUpload(e.target.files[0])}
                  />
                </label>
              </Field>
              <Field label="Hero Video URL (optional)" full>
                <input className={inputCls} value={listing.hero_video_url || ""} onChange={(e) => update({ hero_video_url: e.target.value })} />
              </Field>
              {listing.hero_image_url && (
                <div className="col-span-2">
                  <img src={listing.hero_image_url} alt="" className="w-full aspect-video object-cover" />
                </div>
              )}
            </div>
          </Card>

          {/* COPY */}
          <Card title="Editorial Copy">
            <div className="grid grid-cols-1 gap-4">
              <Field label="Short Intro (large headline under stats)">
                <textarea
                  className={`${inputCls} min-h-[80px] resize-y`}
                  value={listing.short_intro || ""}
                  onChange={(e) => update({ short_intro: e.target.value })}
                />
              </Field>
              <Field label="Full Description">
                <textarea
                  className={`${inputCls} min-h-[160px] resize-y`}
                  value={listing.full_description || ""}
                  onChange={(e) => update({ full_description: e.target.value })}
                />
              </Field>
            </div>
          </Card>

          {/* AGENT */}
          <Card title="Listing Agent">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name">
                <input className={inputCls} value={listing.agent_name || ""} onChange={(e) => update({ agent_name: e.target.value })} />
              </Field>
              <Field label="Phone">
                <input className={inputCls} value={listing.agent_phone || ""} onChange={(e) => update({ agent_phone: e.target.value })} />
              </Field>
              <Field label="Email">
                <input className={inputCls} value={listing.agent_email || ""} onChange={(e) => update({ agent_email: e.target.value })} />
              </Field>
              <Field label="Headshot URL">
                <input className={inputCls} value={listing.agent_headshot_url || ""} onChange={(e) => update({ agent_headshot_url: e.target.value })} />
              </Field>
            </div>
          </Card>

          {/* SEO */}
          <Card title="SEO">
            <div className="grid grid-cols-1 gap-4">
              <Field label="Meta Title">
                <input className={inputCls} value={listing.meta_title || ""} onChange={(e) => update({ meta_title: e.target.value })} />
              </Field>
              <Field label="Meta Description">
                <textarea className={`${inputCls} min-h-[80px] resize-y`} value={listing.meta_description || ""} onChange={(e) => update({ meta_description: e.target.value })} />
              </Field>
              <Field label="OG Image URL">
                <input className={inputCls} value={listing.og_image_url || ""} onChange={(e) => update({ og_image_url: e.target.value })} />
              </Field>
            </div>
          </Card>

          {/* MEDIA LIBRARY */}
          <Card title={`Gallery & Media (${media.length})`}>
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs tracking-[0.25em] uppercase border border-foreground/20 px-4 py-2 mb-4 hover:border-gold">
              <Upload className="w-3.5 h-3.5" /> {uploading ? "Uploading…" : "Upload Images"}
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && onGalleryUpload(e.target.files)} />
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {media.map((m) => (
                <div key={m.id} className="relative group aspect-square">
                  <img src={m.media_url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeMedia(m.id)}
                    className="absolute top-1 right-1 bg-foreground/90 text-background p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* STORY SECTIONS */}
          <Card title={`Story Sections (${sections.length})`}>
            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-foreground/10">
              {SECTION_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => addSection(t.value)}
                  className="text-[10px] tracking-[0.25em] uppercase border border-foreground/15 px-3 py-2 hover:border-gold hover:text-gold transition-colors"
                >
                  + {t.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {sections.map((s, i) => (
                <div key={s.id} className="border border-foreground/10 bg-background">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10 bg-[#FAFAF8]">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-gold">
                        {SECTION_TYPES.find((t) => t.value === s.section_type)?.label || s.section_type}
                      </span>
                      <span className="text-xs text-muted-foreground">#{i + 1}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => moveSection(s.id, -1)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Move up">
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button onClick={() => moveSection(s.id, 1)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Move down">
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          updateSection(s.id, { is_visible: !s.is_visible });
                          saveSection({ ...s, is_visible: !s.is_visible });
                        }}
                        className="p-2 text-muted-foreground hover:text-foreground"
                        aria-label="Toggle visibility"
                      >
                        {s.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => deleteSection(s.id)} className="p-2 text-muted-foreground hover:text-destructive" aria-label="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-3">
                    <Field label="Eyebrow">
                      <input className={inputCls} value={s.eyebrow || ""} onChange={(e) => updateSection(s.id, { eyebrow: e.target.value })} />
                    </Field>
                    <Field label="Title">
                      <input className={inputCls} value={s.title || ""} onChange={(e) => updateSection(s.id, { title: e.target.value })} />
                    </Field>
                    <Field label="Body" full>
                      <textarea className={`${inputCls} min-h-[100px] resize-y`} value={s.body || ""} onChange={(e) => updateSection(s.id, { body: e.target.value })} />
                    </Field>
                    <Field label="Media URL (image/floorplan/map)">
                      <input className={inputCls} value={s.media_url || ""} onChange={(e) => updateSection(s.id, { media_url: e.target.value })} />
                    </Field>
                    <Field label="Secondary Media (after image)">
                      <input className={inputCls} value={s.secondary_media_url || ""} onChange={(e) => updateSection(s.id, { secondary_media_url: e.target.value })} />
                    </Field>
                    <Field label="Video URL (matterport/youtube/mp4)" full>
                      <input className={inputCls} value={s.video_url || ""} onChange={(e) => updateSection(s.id, { video_url: e.target.value })} />
                    </Field>
                    <Field label="Button Label">
                      <input className={inputCls} value={s.button_label || ""} onChange={(e) => updateSection(s.id, { button_label: e.target.value })} />
                    </Field>
                    <Field label="Button URL">
                      <input className={inputCls} value={s.button_url || ""} onChange={(e) => updateSection(s.id, { button_url: e.target.value })} />
                    </Field>
                    <Field label="Background">
                      <select
                        className={inputCls}
                        value={s.background_style || "ivory"}
                        onChange={(e) => updateSection(s.id, { background_style: e.target.value })}
                      >
                        <option value="ivory">Ivory</option>
                        <option value="warm">Warm White</option>
                        <option value="navy">Navy (dark)</option>
                        <option value="gold">Gold</option>
                      </select>
                    </Field>
                    <div className="col-span-2 flex justify-end pt-2">
                      <button
                        onClick={() => saveSection(s)}
                        className="text-xs tracking-[0.3em] uppercase bg-foreground text-background px-5 py-2 hover:bg-gold hover:text-foreground transition-colors"
                      >
                        Save Section
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {sections.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Add story sections above to build the cinematic page.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-background border border-foreground/10 p-6 md:p-8 mb-6">
    <h2 className="font-display text-xl text-architectural mb-6 pb-4 border-b border-foreground/10">{title}</h2>
    {children}
  </section>
);

export default AdminListingEditor;
