import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Listing, StorySection, ListingMedia } from "@/types/listing";

export function useListing(slug: string | undefined) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [sections, setSections] = useState<StorySection[]>([]);
  const [media, setMedia] = useState<ListingMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    setNotFound(false);

    (async () => {
      const { data: l } = await supabase
        .from("listings")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (!active) return;
      if (!l) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setListing(l as Listing);

      const [secRes, medRes] = await Promise.all([
        supabase
          .from("story_sections")
          .select("*")
          .eq("listing_id", l.id)
          .eq("is_visible", true)
          .order("display_order", { ascending: true }),
        supabase
          .from("listing_media")
          .select("*")
          .eq("listing_id", l.id)
          .order("display_order", { ascending: true }),
      ]);
      if (!active) return;
      setSections((secRes.data as StorySection[]) || []);
      setMedia((medRes.data as ListingMedia[]) || []);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [slug]);

  return { listing, sections, media, loading, notFound };
}
