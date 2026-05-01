// Books a 15-min consultation:
//   1. Creates a Google Calendar event on Taylor's primary calendar with the
//      visitor as an attendee (Google sends the calendar invite automatically).
//   2. Sends a branded confirmation email from Taylor's Gmail to the visitor.
// Both calls go through the Lovable connector gateway.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CALENDAR_GATEWAY = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";
const GMAIL_GATEWAY = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
const HOST_EMAIL = "taylor@echelonpropertygroup.com";
const HOST_NAME = "Taylor Sherwood";
const BRAND = "Echelon Property Group";

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  startISO: string;   // ISO datetime in UTC
  durationMinutes?: number;
  displayDate?: string;
  displayTime?: string;
  notes?: string;
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c] as string));
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

// RFC 2047 encoded-word for headers (Subject, display names) so non-ASCII
// characters like em-dashes render correctly in every mail client.
function encodeHeader(str: string): string {
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]*$/.test(str)) return str;
  return `=?UTF-8?B?${utf8ToBase64(str)}?=`;
}

// Wrap a base64 string at 76 chars per line (RFC 2045).
function wrapBase64(b64: string): string {
  return b64.match(/.{1,76}/g)?.join("\r\n") ?? b64;
}

function buildRawEmail(opts: {
  to: string;
  toName: string;
  subject: string;
  html: string;
  text: string;
}): string {
  const boundary = `b_${crypto.randomUUID().replace(/-/g, "")}`;
  const fromName = encodeHeader(HOST_NAME);
  const toName = encodeHeader(opts.toName);

  const headers = [
    `From: "${fromName}" <${HOST_EMAIL}>`,
    `To: "${toName}" <${opts.to}>`,
    `Reply-To: "${fromName}" <${HOST_EMAIL}>`,
    `Subject: ${encodeHeader(opts.subject)}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n");

  const textB64 = wrapBase64(utf8ToBase64(opts.text));
  const htmlB64 = wrapBase64(utf8ToBase64(opts.html));

  const body = [
    "",
    `--${boundary}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: base64`,
    "",
    textB64,
    "",
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    `Content-Transfer-Encoding: base64`,
    "",
    htmlB64,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");

  const raw = headers + "\r\n" + body;
  // base64url encode the whole MIME message (Gmail API requirement)
  return utf8ToBase64(raw)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const calendarKey = Deno.env.get("GOOGLE_CALENDAR_API_KEY");
  const gmailKey = Deno.env.get("GOOGLE_MAIL_API_KEY");

  if (!lovableKey) return json({ ok: false, error: "LOVABLE_API_KEY missing" }, 500);
  if (!calendarKey) return json({ ok: false, error: "GOOGLE_CALENDAR_API_KEY missing" }, 500);
  if (!gmailKey) return json({ ok: false, error: "GOOGLE_MAIL_API_KEY missing" }, 500);

  let payload: BookingRequest;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const phone = (payload.phone || "").trim();
  const startISO = (payload.startISO || "").trim();
  const duration = Number(payload.durationMinutes) || 15;

  if (!name || !email || !phone || !startISO) {
    return json({ ok: false, error: "Missing required fields" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Invalid email" }, 400);
  }
  const startDate = new Date(startISO);
  if (Number.isNaN(startDate.getTime())) {
    return json({ ok: false, error: "Invalid startISO" }, 400);
  }
  const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

  const displayDate = payload.displayDate || startDate.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago",
  });
  const displayTime = payload.displayTime || startDate.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", timeZone: "America/Chicago",
  });

  // ── 1. Create the calendar event with attendee + send invite ────────────
  const eventBody = {
    summary: `${BRAND} — Consultation with ${name}`,
    description:
      `15-minute introductory phone call.\n\n` +
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n` +
      (payload.notes ? `\nNotes: ${payload.notes}\n` : "") +
      `\nTaylor will call ${phone} at the scheduled time.`,
    start: { dateTime: startDate.toISOString(), timeZone: "America/Chicago" },
    end: { dateTime: endDate.toISOString(), timeZone: "America/Chicago" },
    attendees: [
      { email, displayName: name },
      { email: HOST_EMAIL, displayName: HOST_NAME, organizer: true },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  let eventId: string | null = null;
  let eventLink: string | null = null;
  let calendarError: string | null = null;

  try {
    const calRes = await fetch(
      `${CALENDAR_GATEWAY}/calendars/primary/events?sendUpdates=all`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": calendarKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventBody),
      },
    );

    const calJson = await calRes.json().catch(() => ({}));
    if (!calRes.ok) {
      calendarError = `calendar ${calRes.status}: ${JSON.stringify(calJson)}`;
      console.error("[book-consultation] calendar insert failed:", calendarError);
    } else {
      eventId = calJson.id || null;
      eventLink = calJson.htmlLink || null;
      console.log("[book-consultation] event created:", eventId);
    }
  } catch (e) {
    calendarError = e instanceof Error ? e.message : "calendar dispatch failed";
    console.error("[book-consultation] calendar exception:", calendarError);
  }

  // ── 2. Send branded Gmail confirmation to the visitor ───────────────────
  const subject = `Your call with ${HOST_NAME} — ${displayDate} at ${displayTime} CT`;

  const text = [
    `Hi ${name},`,
    ``,
    `Your 15-minute consultation with ${HOST_NAME} is confirmed.`,
    ``,
    `When: ${displayDate} at ${displayTime} (Central Time)`,
    `Format: Phone call — Taylor will call you at ${phone}`,
    ``,
    `A calendar invitation has also been sent to this email address. If anything changes on your end, simply reply to this message.`,
    ``,
    `Looking forward to speaking,`,
    `${HOST_NAME}`,
    `${BRAND}`,
    `https://www.echelonpropertygroup.com`,
  ].join("\r\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#FAFAF8;font-family:'Helvetica Neue',Arial,sans-serif;color:#0C0F24;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF8;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #ECE7DC;">
        <tr><td style="padding:40px 44px 28px;border-bottom:1px solid #ECE7DC;">
          <div style="font-size:11px;letter-spacing:.22em;color:#b9a06c;text-transform:uppercase;font-weight:600;">${escapeHtml(BRAND)}</div>
          <h1 style="margin:14px 0 0;font-size:22px;font-weight:500;color:#0C0F24;letter-spacing:-.01em;">Your consultation is confirmed</h1>
        </td></tr>
        <tr><td style="padding:32px 44px 8px;">
          <p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:#0C0F24;">Hi ${escapeHtml(name)},</p>
          <p style="margin:0 0 26px;font-size:15px;line-height:1.7;color:#0C0F24;">
            Thank you for scheduling time with me. I'm looking forward to our conversation.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ECE7DC;border-bottom:1px solid #ECE7DC;margin:0 0 26px;">
            <tr><td style="padding:18px 0;">
              <div style="font-size:11px;letter-spacing:.18em;color:#8A8275;text-transform:uppercase;margin-bottom:6px;">When</div>
              <div style="font-size:15px;color:#0C0F24;">${escapeHtml(displayDate)} · ${escapeHtml(displayTime)} CT</div>
            </td></tr>
            <tr><td style="padding:18px 0;border-top:1px solid #ECE7DC;">
              <div style="font-size:11px;letter-spacing:.18em;color:#8A8275;text-transform:uppercase;margin-bottom:6px;">Format</div>
              <div style="font-size:15px;color:#0C0F24;">15-minute phone call — I'll call you at ${escapeHtml(phone)}</div>
            </td></tr>
          </table>
          <p style="margin:0 0 22px;font-size:14px;line-height:1.7;color:#55534B;">
            A calendar invitation has also been sent to this address. If anything changes on your end, simply reply to this message.
          </p>
          <p style="margin:32px 0 0;font-size:15px;line-height:1.6;color:#0C0F24;">
            Looking forward to speaking,<br/>
            <span style="color:#0C0F24;">${escapeHtml(HOST_NAME)}</span>
          </p>
        </td></tr>
        <tr><td style="padding:28px 44px 36px;border-top:1px solid #ECE7DC;">
          <div style="font-size:11px;letter-spacing:.22em;color:#b9a06c;text-transform:uppercase;font-weight:600;">${escapeHtml(BRAND)}</div>
          <div style="font-size:12px;color:#8A8275;margin-top:6px;">Austin, Texas · <a href="https://www.echelonpropertygroup.com" style="color:#8A8275;text-decoration:none;">echelonpropertygroup.com</a></div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const raw = buildRawEmail({
    to: email,
    toName: name,
    subject,
    html,
    text,
  });

  let emailSent = false;
  let emailError: string | null = null;

  try {
    const mailRes = await fetch(`${GMAIL_GATEWAY}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    });

    if (!mailRes.ok) {
      const detail = await mailRes.text();
      emailError = `gmail ${mailRes.status}: ${detail}`;
      console.error("[book-consultation] gmail send failed:", emailError);
    } else {
      emailSent = true;
      console.log("[book-consultation] confirmation email sent to", email);
    }
  } catch (e) {
    emailError = e instanceof Error ? e.message : "gmail dispatch failed";
    console.error("[book-consultation] gmail exception:", emailError);
  }

  return json({
    ok: !!eventId || emailSent,
    eventId,
    eventLink,
    emailSent,
    calendarError,
    emailError,
  });
});
