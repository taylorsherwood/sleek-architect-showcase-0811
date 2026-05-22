import { supabase } from "@/integrations/supabase/client";
import type {
  BriefEdition,
  BriefEditionTeaser,
  BriefSection,
  SignOff,
} from "@/data/privateDistribution";

const tokenStorageKey = (slug: string) => `echelon_pd_token_${slug}`;

export const getStoredPdToken = (slug: string): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(tokenStorageKey(slug));
  } catch {
    return null;
  }
};

export const setStoredPdToken = (slug: string, token: string) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(tokenStorageKey(slug), token);
  } catch {
    /* ignore */
  }
};

export const clearStoredPdToken = (slug: string) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(tokenStorageKey(slug));
  } catch {
    /* ignore */
  }
};

const mapTeaser = (row: any): BriefEditionTeaser => ({
  slug: row.slug,
  volume: row.volume,
  issueNumber: row.issue_number,
  market: row.market,
  edition: row.edition_label,
  publishedAt: row.published_at,
  title: row.title,
  subtitle: row.subtitle,
  dek: row.dek,
  fromTheDesk: row.from_the_desk,
  heroImageUrl: row.hero_image_url,
  isFeatured: row.is_featured,
  active: row.active,
});

const mapFull = (row: any): BriefEdition => ({
  ...mapTeaser(row),
  watermark: row.watermark,
  sections: (row.sections as BriefSection[]) || [],
  howThisWorks: row.how_this_works,
  signOff: (row.sign_off as SignOff | null) || null,
  closingNote: row.closing_note,
  pdfUrl: row.pdf_url,
});

export const fetchEditionTeasers = async (): Promise<BriefEditionTeaser[]> => {
  const { data, error } = await supabase
    .from("private_editions_public" as any)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapTeaser);
};

export const fetchEditionTeaser = async (
  slug: string,
): Promise<BriefEditionTeaser | null> => {
  const { data, error } = await supabase
    .from("private_editions_public" as any)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? mapTeaser(data) : null;
};

interface UnlockArgs {
  slug: string;
  title: string;
  name: string;
  email: string;
  phone?: string;
}

export const requestPrivateDistributionAccess = async (
  args: UnlockArgs,
): Promise<{ ok: true; token: string } | { ok: false; error: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke(
      "private-distribution-unlock",
      {
        body: {
          edition_slug: args.slug,
          edition_title: args.title,
          name: args.name,
          email: args.email,
          phone: args.phone,
          page_url: typeof window !== "undefined" ? window.location.href : null,
          referrer: typeof document !== "undefined" ? document.referrer : null,
        },
      },
    );
    if (error) return { ok: false, error: error.message };
    if (!data?.ok || !data.token) {
      return { ok: false, error: data?.error || "Could not issue access" };
    }
    setStoredPdToken(args.slug, data.token);
    return { ok: true, token: data.token };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
};

export const fetchFullEdition = async (
  slug: string,
  token: string,
): Promise<BriefEdition | null> => {
  const { data, error } = await supabase.functions.invoke(
    "private-distribution-edition",
    {
      body: { slug },
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (error) return null;
  if (!data?.ok || !data.edition) return null;
  return mapFull(data.edition);
};
