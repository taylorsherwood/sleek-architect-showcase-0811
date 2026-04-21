import type { CommunityRecord } from "@/types/community";

/**
 * Coerce a raw row from the `communities` table (with JSONB fields typed as `Json`)
 * into our typed `CommunityRecord`. The `unknown` step is required because the
 * generated Database types model JSONB as a union, and the editor inputs are
 * controlled so runtime shape is guaranteed by the writer.
 */
export function toCommunityRecord(row: unknown): CommunityRecord {
  return row as unknown as CommunityRecord;
}
