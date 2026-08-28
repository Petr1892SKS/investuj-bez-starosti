import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  zapisLeadDoSheetu,
  zalozKontaktVBrevu,
  jenCislice,
  ted,
} from "@/app/lib/leads";

// googleapis potřebuje Node.js API (crypto, stream) — na Edge runtime nepoběží.
export const runtime = "nodejs";

const META_PIXEL_ID = "1648437119511238";

/** Pole, která robot vyplní a člověk ne. Přijde-li v nich cokoli, jde o spam. */
const HONEYPOT_POLE = ["website", "company"] as const;

/**
 * Dokud běží starý scénář v Make, posíláme lead oběma cestami najednou —
 * je to kontrola, že nový zápis do sheetu dává stejný výsledek. Vypnutím
 * LEAD_SINK_MAKE=false volání Make ustane a zůstane jen zápis odsud.
 */
const POSILAT_DO_MAKE = process.env.LEAD_SINK_MAKE !== "false";

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
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný JSON" }, { status: 400 });
  }

  // Spam se tváří jako úspěch — robot se nemá dozvědět, že neprošel.
  if (HONEYPOT_POLE.some((p) => String(body[p] ?? "").trim() !== "")) {
    return NextResponse.json({ ok: true });
  }

  const {
    name, email, phone, interest, message, zdroj, kontext,
    cil, vek, pocet_bytu, horizont_let, event_id, event_source_url,
  } = body as Record<string, string | number | undefined>;

  const datum = ted();
  const telefon = jenCislice(phone);
  const zdrojLeadu = (zdroj as string) || "web-formular";

  const lead = {
    datum,
    name: name as string,
    email: (email as string) || "",
    phone: telefon,
    interest: (interest as string) || "",
    message: (message as string) || "",
    zdroj: zdrojLeadu,
    kontext: (kontext as string) || "",
    // vyplněné jen u leadů z kalkulaček, jinak prázdné
    cil: cil ?? "",
    vek: vek ?? "",
    pocet_bytu: pocet_bytu ?? "",
    horizont_let: horizont_let ?? "",
  };

  // 1) Make jde první, dokud je zapnutý.
  //
  //    Pořadí je záměr: kdyby se volal až po sheetu, znamenalo by selhání
  //    zápisu (chybějící práva, překlep v názvu listu) návrat 500 dřív, než
  //    se Make vůbec zavolá — a lead by propadl i přesto, že starý scénář
  //    funguje. Takhle je po dobu souběhu vždy zachycený aspoň jednou.
  if (POSILAT_DO_MAKE) {
    try {
      const r = await fetch(
        "https://hook.eu1.make.com/egu3z1a2w6dy57upf4x15ozg7ias5kk4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        }
      );
      if (!r.ok) console.error("Make:", r.status, await r.text());
    } catch (e) {
      console.error("Make selhalo:", e);
    }
  }

  // 2) Sheet je povinný. Když selže, formulář musí uživateli říct "zkuste to
  //    znovu" — jinak by se lead tiše ztratil.
  try {
    await zapisLeadDoSheetu(lead);
  } catch (e) {
    console.error("Zápis do Sheetu selhal:", e);
    return NextResponse.json(
      { ok: false, error: "Zápis se nepodařil" },
      { status: 500 }
    );
  }

  // 3) Brevo je doplňkové. Lead je v tuhle chvíli uložený, takže jeho selhání
  //    nesmí shodit požadavek — jen se zaloguje.
  try {
    await zalozKontaktVBrevu(lead.email, lead.name || "");
  } catch (e) {
    console.error("Brevo selhalo:", e);
  }

  try {
    await posliDoMety(req, {
      eventId: event_id as string,
      sourceUrl: event_source_url as string,
      email: email as string,
      telefon,
      jmeno: name as string,
      zdroj: zdrojLeadu,
    });
  } catch (e) {
    console.error("Meta CAPI selhalo:", e);
  }

  return NextResponse.json({ ok: true });
}
