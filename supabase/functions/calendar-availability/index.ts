import { corsHeaders } from "@supabase/supabase-js/cors";

const ICS_URL =
  "https://calendar.google.com/calendar/ical/taylor%40echelonpropertygroup.com/public/basic.ics";

interface BusySlot {
  start: string; // ISO
  end: string;   // ISO
}

function parseICS(icsText: string): BusySlot[] {
  const events: BusySlot[] = [];
  const lines = icsText.replace(/\r\n /g, "").replace(/\r/g, "").split("\n");

  let inEvent = false;
  let start = "";
  let end = "";

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true;
      start = "";
      end = "";
    } else if (line === "END:VEVENT") {
      if (inEvent && start) {
        events.push({ start, end: end || start });
      }
      inEvent = false;
    } else if (inEvent) {
      if (line.startsWith("DTSTART")) {
        start = parseICSDate(line);
      } else if (line.startsWith("DTEND")) {
        end = parseICSDate(line);
      }
    }
  }

  return events;
}

function parseICSDate(line: string): string {
  // Formats: DTSTART:20260414T143000Z  or  DTSTART;TZID=America/Chicago:20260414T093000
  const colonIdx = line.indexOf(":");
  if (colonIdx === -1) return "";
  const value = line.substring(colonIdx + 1).trim();

  // UTC format (ends with Z)
  if (value.endsWith("Z")) {
    const y = value.slice(0, 4);
    const m = value.slice(4, 6);
    const d = value.slice(6, 8);
    const h = value.slice(9, 11);
    const min = value.slice(11, 13);
    const s = value.slice(13, 15);
    return `${y}-${m}-${d}T${h}:${min}:${s}Z`;
  }

  // Local time with TZID — treat as America/Chicago (CST/CDT)
  // For simplicity, convert assuming CDT (-05:00) during most booking window
  const y = value.slice(0, 4);
  const mo = value.slice(4, 6);
  const da = value.slice(6, 8);
  const h = value.slice(9, 11);
  const min = value.slice(11, 13);
  const s = value.slice(13, 15) || "00";

  // Check if TZID is present and determine offset
  const tzMatch = line.match(/TZID=([^:;]+)/);
  const tz = tzMatch?.[1] || "America/Chicago";

  // Use Date to convert properly
  try {
    const dateStr = `${y}-${mo}-${da}T${h}:${min}:${s}`;
    // Create date in the specified timezone using Intl
    const date = new Date(dateStr);
    // If it's Chicago timezone, apply CDT offset as approximation
    if (tz.includes("Chicago") || tz.includes("Central")) {
      // CDT = UTC-5, CST = UTC-6. Use month to guess.
      const month = parseInt(mo);
      const offset = (month >= 3 && month <= 10) ? 5 : 6;
      const utcDate = new Date(date.getTime() + offset * 60 * 60 * 1000);
      return utcDate.toISOString();
    }
    return date.toISOString();
  } catch {
    return `${y}-${mo}-${da}T${h}:${min}:${s}Z`;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Fetch the public ICS feed
    const res = await fetch(ICS_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch calendar: ${res.status}`);
    }

    const icsText = await res.text();
    const allEvents = parseICS(icsText);

    // Filter to only future events within the next 45 days
    const now = new Date();
    const maxDate = new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000);

    const busySlots = allEvents.filter((e) => {
      const end = new Date(e.end);
      const start = new Date(e.start);
      return end > now && start < maxDate;
    });

    return new Response(JSON.stringify({ busy: busySlots }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Calendar availability error:", message);
    return new Response(JSON.stringify({ error: message, busy: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
