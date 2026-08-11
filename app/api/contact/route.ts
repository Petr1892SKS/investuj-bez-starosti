import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const META_PIXEL_ID = "1648437119511238";

const hash = (v?: string) =>
  v ? crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex") : undefined;

/**
 * Pošle událost Lead do Meta Conversions API (server-side).
 *
 * Prohlížečový pixel zachytí jen část lidí — blokují ho adblocky, ITP v Safari
 * i odmítnutý souhlas s cookies. Server tuhle událost pošle vždy; Meta ji
 * s pixelovou spáruje přes `event_id` a nezapočítá dvakrát.
 *
 * Běží jen když je v prostředí nastaven META_CAPI_TOKEN.
 */
async function posliDoMety(
  req: NextRequest,
  data: {
    eventId?: string;
    sourceUrl?: string;
    email?: string;
    telefon?: string;
    jmeno?: string;
    zdroj?: string;
  }
) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token || !data.eventId) return;

  const fbp = req.cookies.get("_fbp")?.value;
  const fbc = req.cookies.get("_fbc")?.value;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ua = req.headers.get("user-agent") || undefined;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: data.eventId,
        event_source_url: data.sourceUrl,
        action_source: "website",
        user_data: {
          em: hash(data.email),
          ph: hash(data.telefon),
          fn: hash(data.jmeno?.split(" ")[0]),
          fbp,
          fbc,
          client_ip_address: ip,
          client_user_agent: ua,
        },
        custom_data: { content_name: data.zdroj },
      },
    ],
  };

  try {
    const r = await fetch(
      `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!r.ok) console.error("Meta CAPI:", r.status, await r.text());
  } catch (e) {
    console.error("Meta CAPI error:", e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, email, phone, interest, message, zdroj, kontext,
      cil, vek, pocet_bytu, horizont_let, event_id, event_source_url,
    } = body;

    const datum = new Date().toLocaleString("cs-CZ", {
      timeZone: "Europe/Prague",
    });

    // Google Sheets bere "+" na začátku jako vzorec a zapíše #ERROR!.
    // Ukládáme proto jen číslice: "+420 777 000 000" → "420777000000".
    const telefon = typeof phone === "string" ? phone.replace(/\D/g, "") : phone;

    await fetch("https://hook.eu1.make.com/egu3z1a2w6dy57upf4x15ozg7ias5kk4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datum,
        name,
        email: email || "",
        phone: telefon,
        interest: interest || "",
        message: message || "",
        zdroj: zdroj || "web-formular",
        kontext: kontext || "",
        // vyplněné jen u leadů z kalkulačky, jinak prázdné
        cil: cil ?? "",
        vek: vek ?? "",
        pocet_bytu: pocet_bytu ?? "",
        horizont_let: horizont_let ?? "",
      }),
    });

    await posliDoMety(req, {
      eventId: event_id,
      sourceUrl: event_source_url,
      email,
      telefon,
      jmeno: name,
      zdroj: zdroj || "web-formular",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ ok: false, error: "Chyba serveru" }, { status: 500 });
  }
}
