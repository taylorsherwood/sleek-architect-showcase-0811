import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";

interface EditionRow {
  id: string;
  slug: string;
  title: string;
  market: string;
  edition_label: string;
  issue_number: string;
  active: boolean;
  is_featured: boolean;
  sort_order: number;
  published_at: string;
  updated_at: string;
}

const AdminPrivateDistributionList = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<EditionRow[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from("private_editions")
      .select("id, slug, title, market, edition_label, issue_number, active, is_featured, sort_order, published_at, updated_at")
      .order("sort_order", { ascending: true })
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setRows((data as EditionRow[]) || []);
        setLoadingData(false);
      });
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin" replace />;

  const createNew = async () => {
    const slug = prompt("New edition slug (e.g. austin-vol-02):");
    if (!slug) return;
    const title = prompt("Title:") || "Untitled";
    const { data, error } = await supabase
      .from("private_editions")
      .insert({
        slug,
        title,
        subtitle: "",
        dek: "",
        market: "Austin",
        edition_label: "Private Brief",
        issue_number: "Vol. 01",
        active: false,
        sections: [],
      })
      .select("slug")
      .single();
    if (error) return alert(error.message);
    if (data) navigate(`/admin/private-distribution/${data.slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-minimal text-gold mb-2 tracking-[0.2em]">ECHELON ADMIN</p>
              <h1 className="text-4xl font-display font-normal text-architectural">Private Distribution</h1>
            </div>
            <div className="flex gap-3">
              <Link to="/admin" className="text-minimal border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors">
                ← DASHBOARD
              </Link>
              <button onClick={createNew} className="text-minimal bg-foreground text-background px-6 py-3 hover:opacity-90">
                + NEW EDITION
              </button>
            </div>
          </div>

          {loadingData ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <div className="space-y-px bg-border">
              {rows.map((r) => (
                <Link
                  key={r.id}
                  to={`/admin/private-distribution/${r.slug}`}
                  className="bg-background p-5 flex items-center justify-between hover:bg-secondary transition-colors"
                >
                  <div>
                    <p className="font-display text-lg text-architectural">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      /{r.slug} · {r.issue_number} · {r.market} · {r.edition_label}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {r.is_featured && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 border border-gold text-gold">Featured</span>
                    )}
                    <span className={`text-xs px-3 py-1 ${r.active ? "bg-gold text-foreground" : "border border-border text-muted-foreground"}`}>
                      {r.active ? "ACTIVE" : "DRAFT"}
                    </span>
                  </div>
                </Link>
              ))}
              {rows.length === 0 && <p className="bg-background p-4 text-muted-foreground">No editions yet.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface EditionDraft {
  slug: string;
  title: string;
  subtitle: string;
  dek: string;
  market: string;
  edition_label: string;
  issue_number: string;
  volume: string | null;
  from_the_desk: string | null;
  hero_image_url: string | null;
  pdf_url: string | null;
  watermark: string | null;
  how_this_works: string | null;
  closing_note: string | null;
  published_at: string;
  active: boolean;
  is_featured: boolean;
  sort_order: number;
  sections: unknown;
  sign_off: unknown;
}

const TEXT_FIELDS: Array<[keyof EditionDraft, string, "text" | "textarea"]> = [
  ["slug", "Slug", "text"],
  ["title", "Title", "text"],
  ["subtitle", "Subtitle", "text"],
  ["dek", "Dek (public summary)", "textarea"],
  ["market", "Market", "text"],
  ["edition_label", "Edition Label", "text"],
  ["issue_number", "Issue Number", "text"],
  ["volume", "Volume", "text"],
  ["from_the_desk", "From The Desk", "textarea"],
  ["hero_image_url", "Hero Image URL", "text"],
  ["pdf_url", "PDF URL", "text"],
  ["watermark", "Watermark", "text"],
  ["how_this_works", "How This Works", "textarea"],
  ["closing_note", "Closing Note", "textarea"],
  ["published_at", "Published At (YYYY-MM-DD)", "text"],
];

const AdminPrivateDistributionEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<EditionDraft | null>(null);
  const [sectionsJson, setSectionsJson] = useState("");
  const [signOffJson, setSignOffJson] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin || !slug) return;
    supabase
      .from("private_editions")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data, error: e }) => {
        if (e || !data) {
          setError(e?.message || "Edition not found");
          return;
        }
        const d = data as unknown as EditionDraft & { sections: unknown; sign_off: unknown };
        setDraft(d);
        setSectionsJson(JSON.stringify(d.sections ?? [], null, 2));
        setSignOffJson(JSON.stringify(d.sign_off ?? null, null, 2));
      });
  }, [isAdmin, slug]);

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/admin" replace />;

  const update = <K extends keyof EditionDraft>(key: K, value: EditionDraft[K]) => {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
  };

  const save = async () => {
    if (!draft) return;
    setError(null);
    let sections: unknown;
    let signOff: unknown;
    try {
      sections = JSON.parse(sectionsJson || "[]");
      if (!Array.isArray(sections)) throw new Error("Sections must be an array");
    } catch (e) {
      setError(`Sections JSON invalid: ${e instanceof Error ? e.message : "parse error"}`);
      return;
    }
    try {
      signOff = signOffJson.trim() ? JSON.parse(signOffJson) : null;
    } catch (e) {
      setError(`Sign-off JSON invalid: ${e instanceof Error ? e.message : "parse error"}`);
      return;
    }

    setSaving(true);
    const { error: upErr } = await supabase
      .from("private_editions")
      .update({
        slug: draft.slug,
        title: draft.title,
        subtitle: draft.subtitle,
        dek: draft.dek,
        market: draft.market,
        edition_label: draft.edition_label,
        issue_number: draft.issue_number,
        volume: draft.volume,
        from_the_desk: draft.from_the_desk,
        hero_image_url: draft.hero_image_url,
        pdf_url: draft.pdf_url,
        watermark: draft.watermark,
        how_this_works: draft.how_this_works,
        closing_note: draft.closing_note,
        published_at: draft.published_at,
        active: draft.active,
        is_featured: draft.is_featured,
        sort_order: draft.sort_order,
        sections: sections as never,
        sign_off: signOff as never,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug!);
    setSaving(false);
    if (upErr) {
      setError(upErr.message);
      return;
    }
    setSavedAt(new Date().toLocaleTimeString());
    if (draft.slug !== slug) {
      navigate(`/admin/private-distribution/${draft.slug}`, { replace: true });
    }
  };

  const remove = async () => {
    if (!slug) return;
    if (!confirm(`Delete edition "${slug}"? This cannot be undone.`)) return;
    const { error: e } = await supabase.from("private_editions").delete().eq("slug", slug);
    if (e) return alert(e.message);
    navigate("/admin/private-distribution");
  };

  if (error && !draft) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-40 text-center">
          <p className="text-muted-foreground">{error}</p>
          <Link to="/admin/private-distribution" className="text-gold hover:underline mt-4 inline-block">
            ← Back
          </Link>
        </div>
      </div>
    );
  }
  if (!draft) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-minimal text-gold mb-2 tracking-[0.2em]">EDITION</p>
              <h1 className="text-3xl font-display font-normal text-architectural">{draft.title || draft.slug}</h1>
            </div>
            <div className="flex gap-3">
              <Link to="/admin/private-distribution" className="text-minimal border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors">
                ← BACK
              </Link>
              <button onClick={remove} className="text-minimal border border-border text-muted-foreground px-5 py-2.5 hover:border-foreground hover:text-foreground transition-colors">
                DELETE
              </button>
              <button onClick={save} disabled={saving} className="text-minimal bg-foreground text-background px-6 py-2.5 hover:opacity-90 disabled:opacity-50">
                {saving ? "SAVING…" : "SAVE"}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-foreground border border-foreground/30 px-4 py-3 mb-6">⚠ {error}</p>}
          {savedAt && !error && <p className="text-sm text-gold mb-6">Saved at {savedAt}.</p>}

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={draft.active} onChange={(e) => update("active", e.target.checked)} />
              Active (visible publicly)
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={draft.is_featured} onChange={(e) => update("is_featured", e.target.checked)} />
              Featured
            </label>
            <label className="flex items-center gap-3 text-sm">
              Sort order
              <input
                type="number"
                value={draft.sort_order}
                onChange={(e) => update("sort_order", Number(e.target.value))}
                className="ml-2 w-20 border border-border px-2 py-1 bg-background"
              />
            </label>
          </div>

          <div className="space-y-5">
            {TEXT_FIELDS.map(([key, label, kind]) => (
              <div key={key as string}>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
                {kind === "textarea" ? (
                  <textarea
                    value={(draft[key] as string) ?? ""}
                    onChange={(e) => update(key, e.target.value as never)}
                    rows={3}
                    className="w-full border border-border bg-background px-3 py-2 text-sm font-sans"
                  />
                ) : (
                  <input
                    type="text"
                    value={(draft[key] as string) ?? ""}
                    onChange={(e) => update(key, e.target.value as never)}
                    className="w-full border border-border bg-background px-3 py-2 text-sm"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Sign-off (JSON object or null)
              </label>
              <textarea
                value={signOffJson}
                onChange={(e) => setSignOffJson(e.target.value)}
                rows={8}
                spellCheck={false}
                className="w-full border border-border bg-background px-3 py-2 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Sections (JSON array — gated content)
              </label>
              <p className="text-xs text-muted-foreground mb-2">
                Each section: <code>{`{ id, type, chapter?, eyebrow?, title?, body?, bullets?, properties?, watching?, trades?, feature?, attribution? }`}</code>
              </p>
              <textarea
                value={sectionsJson}
                onChange={(e) => setSectionsJson(e.target.value)}
                rows={28}
                spellCheck={false}
                className="w-full border border-border bg-background px-3 py-2 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPrivateDistribution = () => {
  const { slug } = useParams<{ slug: string }>();
  return slug ? <AdminPrivateDistributionEditor /> : <AdminPrivateDistributionList />;
};

export default AdminPrivateDistribution;
