import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interest, message, zdroj, kontext, cil, vek, pocet_bytu, horizont_let } = body;

    const datum = new Date().toLocaleString("cs-CZ", {
      timeZone: "Europe/Prague",
    });

    await fetch("https://hook.eu1.make.com/egu3z1a2w6dy57upf4x15ozg7ias5kk4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        datum,
        name,
        email: email || "",
        phone,
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ ok: false, error: "Chyba serveru" }, { status: 500 });
  }
}
