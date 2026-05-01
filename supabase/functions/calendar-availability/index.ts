// Returns busy slots for Taylor's primary Google Calendar over the next 45 days.
// Uses the Google Calendar connector via the Lovable connector gateway so the
// upstream OAuth token is refreshed automatically.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";
const ICS_FALLBACK_URL =
  "https://calendar.google.com/calendar/ical/taylor%40echelonpropertygroup.com/public/basic.ics";

interface BusySlot {
  start: string;
  end: string;
}

async function fetchFreeBusy(): Promise<BusySlot[]> {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const calendarKey = Deno.env.get("GOOGLE_CALENDAR_API_KEY");
  if (!lovableKey || !calendarKey) {
    throw new Error("Calendar connector not configured");
  }

  const now = new Date();
  const maxDate = new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000);

  const res = await fetch(`${GATEWAY_URL}/freeBusy`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": calendarKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: now.toISOString(),
      timeMax: maxDate.toISOString(),
      items: [{ id: "primary" }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`freeBusy ${res.status}: ${detail}`);
  }

  const data = await res.json();
  const busy = data?.calendars?.primary?.busy || [];
  return busy.map((b: BusySlot) => ({ start: b.start, end: b.end }));
}

// Fallback to public ICS if the connector call fails for any reason.
async function fetchIcsFallback(): Promise<BusySlot[]> {
  const res = await fetch(ICS_FALLBACK_URL);
  if (!res.ok) return [];
  const text = await res.text();
  const events: BusySlot[] = [];
  const lines = text.replace(/\r\n /g, "").replace(/\r/g, "").split("\n");
  let inEvent = false;
  let start = "";
  let end = "";
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") { inEvent = true; start = ""; end = ""; }
    else if (line === "END:VEVENT") {
      if (inEvent && start) events.push({ start, end: end || start });
      inEvent = false;
    } else if (inEvent) {
      if (line.startsWith("DTSTART")) start = parseICSDate(line);
      else if (line.startsWith("DTEND")) end = parseICSDate(line);
    }
  }
  const now = new Date();
  const maxDate = new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000);
  return events.filter((e) => new Date(e.end) > now && new Date(e.start) < maxDate);
}

function parseICSDate(line: string): string {
  const colonIdx = line.indexOf(":");
  if (colonIdx === -1) return "";
  const value = line.substring(colonIdx + 1).trim();
  if (value.endsWith("Z")) {
    return `${value.slice(0,4)}-${value.slice(4,6)}-${value.slice(6,8)}T${value.slice(9,11)}:${value.slice(11,13)}:${value.slice(13,15)}Z`;
  }
  const y = value.slice(0,4), mo = value.slice(4,6), da = value.slice(6,8);
  const h = value.slice(9,11), min = value.slice(11,13), s = value.slice(13,15) || "00";
  const month = parseInt(mo);
  const offset = (month >= 3 && month <= 10) ? 5 : 6;
  const date = new Date(`${y}-${mo}-${da}T${h}:${min}:${s}Z`);
  return new Date(date.getTime() + offset * 60 * 60 * 1000).toISOString();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    let busy: BusySlot[] = [];
    try {
      busy = await fetchFreeBusy();
    } catch (e) {
      console.warn("[calendar-availability] freeBusy failed, falling back to ICS:", e);
      busy = await fetchIcsFallback();
    }
    return new Response(JSON.stringify({ busy }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Calendar availability error:", message);
    return new Response(JSON.stringify({ error: message, busy: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200, // never block UI
    });
  }
});
