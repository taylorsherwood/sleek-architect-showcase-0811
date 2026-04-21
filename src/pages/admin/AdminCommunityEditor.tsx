import { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CommunityRecord } from "@/types/community";
import { toCommunityRecord } from "@/lib/communityCoerce";
import Navigation from "@/components/Navigation";

type FormData = Omit<CommunityRecord, "id">;

const emptyForm: FormData = {
  slug: "",
  name: "",
  city: "Austin",
  county: null,
  hero_image_url: null,
  hero_overlay_opacity: 0.45,
  tagline: null,
  teaser_summary: null,
  full_overview: null,
  highlights: [],
  our_take: null,
  demographics: {},
  schools: [],
  transit: {},
  market_stats: {},
  realscout_reference: null,
  related_communities: [],
  faqs: [],
  local_highlights: [],
  seo_title: null,
  meta_description: null,
  canonical_url: null,
  gate_enabled: true,
  gate_headline: null,
  gate_subheadline: null,
  thank_you_message: null,
  published: false,
  sort_order: 0,
};

const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
  <div className="mb-4">
    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
    {children}
    {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
  </div>
);

const inputClass =
  "w-full px-3 py-2 bg-background border border-border text-foreground focus:outline-none focus:border-gold transition-colors";

const AdminCommunityEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, isAdmin, loading } = useAuth();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !isAdmin) return;
    supabase
      .from("communities")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          const rec = toCommunityRecord(data);
          setId(rec.id);
          setForm({
            ...emptyForm,
            ...rec,
            highlights: rec.highlights || [],
            demographics: rec.demographics || {},
            schools: rec.schools || [],
            transit: rec.transit || {},
            market_stats: rec.market_stats || {},
            related_communities: rec.related_communities || [],
            faqs: rec.faqs || [],
            local_highlights: rec.local_highlights || [],
          });
        }
        setLoadingData(false);
      });
  }, [slug, isAdmin]);

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const updateJsonField = (
    field: "demographics" | "transit" | "market_stats",
    key: string,
    raw: string,
  ) => {
    const num = raw === "" ? null : Number(raw);
    setForm((f) => ({ ...f, [field]: { ...f[field], [key]: Number.isFinite(num) ? num : null } }));
  };

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    // The form fields mirror the table columns; cast through unknown to satisfy
    // the generated `RejectExcessProperties` constraint on the update builder.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("communities").update as any)(form).eq("id", id);
    setSaving(false);
    if (error) {
      alert(error.message);
      return;
    }
    setSavedAt(new Date().toLocaleTimeString());
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 text-center text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block">
                  ← Dashboard
                </Link>
                <h1 className="text-3xl font-display text-architectural">Edit: {form.name || form.slug}</h1>
                <Link
                  to={`/communities/${form.slug}/report`}
                  target="_blank"
                  className="text-sm text-gold hover:underline"
                >
                  View live page →
                </Link>
              </div>
              <div className="flex items-center gap-4">
                {savedAt && <span className="text-xs text-muted-foreground">Saved {savedAt}</span>}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-foreground px-6 py-3 transition-colors disabled:opacity-50"
                >
                  {saving ? "SAVING..." : "SAVE"}
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {/* Basic */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">Basic</h2>
                <Field label="Name">
                  <input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} />
                </Field>
                <Field label="Slug">
                  <input className={inputClass} value={form.slug} onChange={(e) => update("slug", e.target.value)} />
                </Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="City">
                    <input className={inputClass} value={form.city} onChange={(e) => update("city", e.target.value)} />
                  </Field>
                  <Field label="County">
                    <input className={inputClass} value={form.county || ""} onChange={(e) => update("county", e.target.value || null)} />
                  </Field>
                </div>
                <Field label="Tagline">
                  <input className={inputClass} value={form.tagline || ""} onChange={(e) => update("tagline", e.target.value || null)} />
                </Field>
              </section>

              {/* Hero */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">Hero</h2>
                <Field label="Hero image URL" hint="Use a wide WebP image. Leave blank for solid hero.">
                  <input className={inputClass} value={form.hero_image_url || ""} onChange={(e) => update("hero_image_url", e.target.value || null)} />
                </Field>
                <Field label="Hero overlay opacity (0–1)">
                  <input
                    type="number"
                    step="0.05"
                    min={0}
                    max={1}
                    className={inputClass}
                    value={form.hero_overlay_opacity}
                    onChange={(e) => update("hero_overlay_opacity", Number(e.target.value))}
                  />
                </Field>
              </section>

              {/* Content */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">Content</h2>
                <Field label="Teaser summary (public)">
                  <textarea className={inputClass} rows={4} value={form.teaser_summary || ""} onChange={(e) => update("teaser_summary", e.target.value || null)} />
                </Field>
                <Field label="Full overview (gated)" hint="Use blank lines between paragraphs.">
                  <textarea className={inputClass} rows={8} value={form.full_overview || ""} onChange={(e) => update("full_overview", e.target.value || null)} />
                </Field>
                <Field label="Our Take (gated, editorial)">
                  <textarea className={inputClass} rows={6} value={form.our_take || ""} onChange={(e) => update("our_take", e.target.value || null)} />
                </Field>
              </section>

              {/* Highlights */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-2">Highlights</h2>
                <p className="text-xs text-muted-foreground mb-6">2–4 items shown on the public teaser.</p>
                {form.highlights.map((h, i) => (
                  <div key={i} className="border-l-2 border-border pl-4 mb-4">
                    <Field label={`Highlight ${i + 1} title`}>
                      <input
                        className={inputClass}
                        value={h.title}
                        onChange={(e) => {
                          const next = [...form.highlights];
                          next[i] = { ...next[i], title: e.target.value };
                          update("highlights", next);
                        }}
                      />
                    </Field>
                    <Field label="Description">
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={h.description}
                        onChange={(e) => {
                          const next = [...form.highlights];
                          next[i] = { ...next[i], description: e.target.value };
                          update("highlights", next);
                        }}
                      />
                    </Field>
                    <button
                      onClick={() => update("highlights", form.highlights.filter((_, idx) => idx !== i))}
                      className="text-xs text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => update("highlights", [...form.highlights, { title: "", description: "" }])}
                  className="text-sm text-gold hover:underline"
                >
                  + Add highlight
                </button>
              </section>

              {/* Market stats */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-2">Market Snapshot</h2>
                <p className="text-xs text-muted-foreground mb-6">
                  Aggregated area figures only. Leave blank to hide a metric.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ["median_active_price", "Median active price ($)"],
                    ["average_active_price", "Average active price ($)"],
                    ["median_sold_price_area", "Median sold price area ($)"],
                    ["average_sold_price_area", "Average sold price area ($)"],
                    ["active_inventory_count", "Active inventory count"],
                    ["sold_count_last_90_days", "Sold count (last 90 days)"],
                    ["average_dom", "Average days on market"],
                    ["median_price_per_sqft", "Median price / sqft ($)"],
                  ].map(([key, label]) => (
                    <Field key={key} label={label}>
                      <input
                        type="number"
                        className={inputClass}
                        value={(form.market_stats as Record<string, unknown>)[key] as number | undefined ?? ""}
                        onChange={(e) => updateJsonField("market_stats", key, e.target.value)}
                      />
                    </Field>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Inventory trend" hint="Short qualitative read, e.g. “Tightening”, “Stable”, “Softening”.">
                    <input
                      className={inputClass}
                      value={form.market_stats.inventory_trend || ""}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          market_stats: { ...f.market_stats, inventory_trend: e.target.value || null },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Buyer demand signal" hint="Short qualitative read, e.g. “Multiple-offer activity returning under $3.5M”.">
                    <input
                      className={inputClass}
                      value={form.market_stats.buyer_demand || ""}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          market_stats: { ...f.market_stats, buyer_demand: e.target.value || null },
                        }))
                      }
                    />
                  </Field>
                </div>
                <Field label="As-of date" hint="Free-form, e.g. “Q1 2026” or “April 2026”.">
                  <input
                    className={inputClass}
                    value={form.market_stats.as_of_date || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, market_stats: { ...f.market_stats, as_of_date: e.target.value || null } }))
                    }
                  />
                </Field>
              </section>

              {/* Demographics */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">Demographics</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ["population", "Population"],
                    ["median_household_income", "Median household income ($)"],
                    ["median_age", "Median age"],
                    ["homeownership_rate", "Homeownership rate (%)"],
                    ["education_bachelors_or_higher", "Bachelor's or higher (%)"],
                    ["average_household_size", "Average household size"],
                  ].map(([key, label]) => (
                    <Field key={key} label={label}>
                      <input
                        type="number"
                        step="any"
                        className={inputClass}
                        value={(form.demographics as Record<string, unknown>)[key] as number | undefined ?? ""}
                        onChange={(e) => updateJsonField("demographics", key, e.target.value)}
                      />
                    </Field>
                  ))}
                </div>
              </section>

              {/* Transit */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">Transit</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    ["walk_score", "Walk Score"],
                    ["bike_score", "Bike Score"],
                    ["transit_score", "Transit Score"],
                  ].map(([key, label]) => (
                    <Field key={key} label={label}>
                      <input
                        type="number"
                        className={inputClass}
                        value={(form.transit as Record<string, unknown>)[key] as number | undefined ?? ""}
                        onChange={(e) => updateJsonField("transit", key, e.target.value)}
                      />
                    </Field>
                  ))}
                </div>
                <Field label="Summary">
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={form.transit.summary || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, transit: { ...f.transit, summary: e.target.value || null } }))
                    }
                  />
                </Field>
              </section>

              {/* Schools */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">Schools</h2>
                {form.schools.map((s, i) => (
                  <div key={i} className="border-l-2 border-border pl-4 mb-4 grid sm:grid-cols-2 gap-3">
                    <input className={inputClass} placeholder="Name" value={s.name} onChange={(e) => {
                      const next = [...form.schools];
                      next[i] = { ...next[i], name: e.target.value };
                      update("schools", next);
                    }} />
                    <input className={inputClass} placeholder="District" value={s.district || ""} onChange={(e) => {
                      const next = [...form.schools];
                      next[i] = { ...next[i], district: e.target.value };
                      update("schools", next);
                    }} />
                    <input className={inputClass} placeholder="Grades" value={s.grades || ""} onChange={(e) => {
                      const next = [...form.schools];
                      next[i] = { ...next[i], grades: e.target.value };
                      update("schools", next);
                    }} />
                    <button
                      onClick={() => update("schools", form.schools.filter((_, idx) => idx !== i))}
                      className="text-xs text-destructive hover:underline justify-self-start"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => update("schools", [...form.schools, { name: "", grades: "", district: "" }])}
                  className="text-sm text-gold hover:underline"
                >
                  + Add school
                </button>
              </section>

              {/* Local Highlights (POI categories) */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-2">Local Highlights</h2>
                <p className="text-xs text-muted-foreground mb-6">
                  Curated nearby places by category (e.g. Parks, Restaurants, Trails). Categories with no items are hidden on the live report.
                </p>
                {form.local_highlights.map((cat, ci) => (
                  <div key={ci} className="border-l-2 border-border pl-4 mb-6">
                    <div className="grid sm:grid-cols-3 gap-3 mb-3">
                      <input
                        className={inputClass}
                        placeholder="Category (e.g. Parks)"
                        value={cat.category}
                        onChange={(e) => {
                          const next = [...form.local_highlights];
                          next[ci] = { ...next[ci], category: e.target.value };
                          update("local_highlights", next);
                        }}
                      />
                      <input
                        className={inputClass}
                        placeholder="Icon (emoji, optional) — e.g. 🌳"
                        value={cat.icon || ""}
                        onChange={(e) => {
                          const next = [...form.local_highlights];
                          next[ci] = { ...next[ci], icon: e.target.value || null };
                          update("local_highlights", next);
                        }}
                      />
                      <button
                        onClick={() =>
                          update(
                            "local_highlights",
                            form.local_highlights.filter((_, idx) => idx !== ci),
                          )
                        }
                        className="text-xs text-destructive hover:underline justify-self-start self-center"
                      >
                        Remove category
                      </button>
                    </div>

                    {cat.items.map((item, ii) => (
                      <div key={ii} className="grid sm:grid-cols-[1fr_2fr_auto] gap-2 mb-2">
                        <input
                          className={inputClass}
                          placeholder="Place name"
                          value={item.name}
                          onChange={(e) => {
                            const next = [...form.local_highlights];
                            const items = [...next[ci].items];
                            items[ii] = { ...items[ii], name: e.target.value };
                            next[ci] = { ...next[ci], items };
                            update("local_highlights", next);
                          }}
                        />
                        <input
                          className={inputClass}
                          placeholder="Detail (optional) — short note, address, etc."
                          value={item.detail || ""}
                          onChange={(e) => {
                            const next = [...form.local_highlights];
                            const items = [...next[ci].items];
                            items[ii] = { ...items[ii], detail: e.target.value || null };
                            next[ci] = { ...next[ci], items };
                            update("local_highlights", next);
                          }}
                        />
                        <button
                          onClick={() => {
                            const next = [...form.local_highlights];
                            next[ci] = {
                              ...next[ci],
                              items: next[ci].items.filter((_, idx) => idx !== ii),
                            };
                            update("local_highlights", next);
                          }}
                          className="text-xs text-destructive hover:underline self-center"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const next = [...form.local_highlights];
                        next[ci] = {
                          ...next[ci],
                          items: [...next[ci].items, { name: "", detail: "" }],
                        };
                        update("local_highlights", next);
                      }}
                      className="text-xs text-gold hover:underline mt-2"
                    >
                      + Add place
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    update("local_highlights", [
                      ...form.local_highlights,
                      { category: "", icon: "", items: [] },
                    ])
                  }
                  className="text-sm text-gold hover:underline"
                >
                  + Add category
                </button>
              </section>

              {/* Related */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">Related Communities</h2>
                <Field label="Slugs (comma separated)">
                  <input
                    className={inputClass}
                    value={form.related_communities.join(", ")}
                    onChange={(e) =>
                      update(
                        "related_communities",
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      )
                    }
                  />
                </Field>
              </section>

              {/* FAQs */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">FAQs</h2>
                {form.faqs.map((faq, i) => (
                  <div key={i} className="border-l-2 border-border pl-4 mb-4">
                    <Field label="Question">
                      <input className={inputClass} value={faq.question} onChange={(e) => {
                        const next = [...form.faqs];
                        next[i] = { ...next[i], question: e.target.value };
                        update("faqs", next);
                      }} />
                    </Field>
                    <Field label="Answer">
                      <textarea className={inputClass} rows={3} value={faq.answer} onChange={(e) => {
                        const next = [...form.faqs];
                        next[i] = { ...next[i], answer: e.target.value };
                        update("faqs", next);
                      }} />
                    </Field>
                    <button
                      onClick={() => update("faqs", form.faqs.filter((_, idx) => idx !== i))}
                      className="text-xs text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => update("faqs", [...form.faqs, { question: "", answer: "" }])}
                  className="text-sm text-gold hover:underline"
                >
                  + Add FAQ
                </button>
              </section>

              {/* Gate */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">Lead Gate</h2>
                <Field label="Gate enabled">
                  <select
                    className={inputClass}
                    value={form.gate_enabled ? "true" : "false"}
                    onChange={(e) => update("gate_enabled", e.target.value === "true")}
                  >
                    <option value="true">On — visitors must submit form to see full report</option>
                    <option value="false">Off — full report public</option>
                  </select>
                </Field>
                <Field label="Gate headline">
                  <input className={inputClass} value={form.gate_headline || ""} onChange={(e) => update("gate_headline", e.target.value || null)} />
                </Field>
                <Field label="Gate subheadline">
                  <textarea className={inputClass} rows={2} value={form.gate_subheadline || ""} onChange={(e) => update("gate_subheadline", e.target.value || null)} />
                </Field>
                <Field label="Thank you message">
                  <input className={inputClass} value={form.thank_you_message || ""} onChange={(e) => update("thank_you_message", e.target.value || null)} />
                </Field>
              </section>

              {/* SEO */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">SEO</h2>
                <Field label="SEO title">
                  <input className={inputClass} value={form.seo_title || ""} onChange={(e) => update("seo_title", e.target.value || null)} />
                </Field>
                <Field label="Meta description">
                  <textarea className={inputClass} rows={2} value={form.meta_description || ""} onChange={(e) => update("meta_description", e.target.value || null)} />
                </Field>
                <Field label="Canonical URL">
                  <input className={inputClass} value={form.canonical_url || ""} onChange={(e) => update("canonical_url", e.target.value || null)} />
                </Field>
              </section>

              {/* Publish */}
              <section className="border border-border p-6">
                <h2 className="text-xl font-display text-architectural mb-6">Publish</h2>
                <Field label="Status">
                  <select
                    className={inputClass}
                    value={form.published ? "true" : "false"}
                    onChange={(e) => update("published", e.target.value === "true")}
                  >
                    <option value="false">Draft (hidden)</option>
                    <option value="true">Published (live)</option>
                  </select>
                </Field>
                <Field label="Sort order">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.sort_order}
                    onChange={(e) => update("sort_order", Number(e.target.value))}
                  />
                </Field>
              </section>

              <div className="flex items-center gap-4 sticky bottom-4 bg-background border border-border p-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-foreground px-6 py-3 transition-colors disabled:opacity-50"
                >
                  {saving ? "SAVING..." : "SAVE CHANGES"}
                </button>
                {savedAt && <span className="text-xs text-muted-foreground">Saved {savedAt}</span>}
                <Link to="/admin" className="ml-auto text-sm text-muted-foreground hover:text-foreground">
                  Back to dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCommunityEditor;
