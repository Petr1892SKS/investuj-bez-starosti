import { google } from "googleapis";

/**
 * Ukládání leadů — Google Sheet (povinné) a Brevo (doplňkové).
 *
 * Volá se z `app/api/contact/route.ts`. Rozhodnutí, co je při chybě fatální,
 * zůstává na volajícím: zápis do sheetu musí projít, ostatní kanály ne.
 */

export type Lead = {
  datum?: string;
  name?: string;
  email?: string;
  /** Očekává se už jen v číslicích — viz `jenCislice()`. */
  phone?: string;
  interest?: string;
  message?: string;
  zdroj?: string;
  kontext?: string;
  cil?: string | number;
  vek?: string | number;
  pocet_bytu?: string | number;
  horizont_let?: string | number;
};

const BREVO_LIST_ID = 11;

const txt = (v: unknown) => (v === undefined || v === null ? "" : String(v));

/**
 * Sheets bere "+" na začátku buňky jako vzorec a zapíše #ERROR!.
 * Ukládáme proto jen číslice: "+420 777 000 000" → "420777000000".
 */
export const jenCislice = (v: unknown) => txt(v).replace(/\D/g, "");

/** Čas v Praze ve tvaru, jaký v tabulce používají ostatní řádky. */
export const ted = () =>
  new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" });

function autorizace() {
  // Přihlašovací údaje jsou na Vercelu historicky pod dvěma jmény.
  //
  // `.trim()` není kosmetika: hodnoty vložené do Vercelu přes webový formulář
  // mívají na konci nový řádek a e-mail s "\n" na konci rozbije podpis JWT
  // chybou, ze které příčina není poznat.
  const email = (
    process.env.GOOGLE_CLIENT_EMAIL ||
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    ""
  ).trim();
  const klic = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !klic) {
    throw new Error(
      "Chybí přihlašovací údaje k Sheets (GOOGLE_CLIENT_EMAIL / GOOGLE_SERVICE_ACCOUNT_EMAIL a GOOGLE_PRIVATE_KEY)"
    );
  }

  return new google.auth.JWT({
    email,
    // V JSON souboru servisního účtu jsou konce řádků zapsané jako "\n".
    // Bez převodu na skutečné konce řádků selže podpis na nesrozumitelné chybě.
    key: klic.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

/**
 * Připojí řádek na konec listu.
 *
 * Na SHEET_ID se schválně nepoužívá záložní GOOGLE_SHEET_ID — ta proměnná
 * v projektu už existuje a může mířit na jinou tabulku. Tichý zápis do cizího
 * sheetu je horší než pád, tak radši spadneme.
 *
 * `valueInputOption: RAW` je taky záměr: s USER_ENTERED by Sheets parsoval
 * vstup od návštěvníka, takže zpráva začínající "=" by se stala vzorcem.
 */
export async function zapisLeadDoSheetu(lead: Lead) {
  const sheetId = (process.env.SHEET_ID || "").trim();
  if (!sheetId) {
    throw new Error(
      "Chybí SHEET_ID — bez něj nevíme, do které tabulky zapisovat (GOOGLE_SHEET_ID se záměrně nepoužívá)"
    );
  }
  const tab = (process.env.SHEET_TAB || "").trim() || "Web formulář";

  // Pořadí musí odpovídat hlavičkám A–L. Sloupce M–V si vyplňují obchodníci ručně.
  const radek = [
    lead.datum || ted(), // A  Datum
    txt(lead.name), // B  Jméno
    txt(lead.email), // C  Email
    txt(lead.phone), // D  Telefon
    txt(lead.interest), // E  Zájem
    txt(lead.message), // F  Zpráva
    txt(lead.zdroj) || "web-formular", // G  Zdroj
    txt(lead.kontext), // H  co mu vyšlo
    txt(lead.cil), // I  Cíl (Kč/měs)
    txt(lead.vek), // J  Věk
    txt(lead.pocet_bytu), // K  bytů potřeba
    txt(lead.horizont_let), // L  Horizont (let)
  ];

  const sheets = google.sheets({ version: "v4", auth: autorizace() });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    // Apostrofy kolem názvu listu — obsahuje mezeru i diakritiku.
    range: `'${tab}'!A:L`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [radek] },
  });
}

const NAZEV_ZDROJE: Record<string, string> = {
  "kalkulacka-kolik-bytu": "kalkulačka Kolik bytů",
  "moje-strategie": "Moje strategie",
  "byt-na-hypoteku": "Byt na hypotéku",
  "web-formular": "kontaktní formulář",
};

/**
 * Kopie leadu do listu, ze kterého čte CRM obchodníků („FB formulář").
 *
 * CRM vidí jen tenhle list, takže bez kopie by leady z webu obchodník nikdy
 * neviděl. Sloupce musí sedět s tím, co sem zapisuje Make z Facebooku:
 * datum v ISO (CRM z něj počítá termín prvního hovoru), I = zdroj, K = odkud
 * přišel (CRM ho ukazuje jako kreativu). Do M–AN se nesahá — patří obchodníkům a CRM.
 */
export async function zapisLeadDoCRM(lead: Lead) {
  const sheetId = (process.env.SHEET_ID || "").trim();
  if (!sheetId) return;

  const zdroj = txt(lead.zdroj) || "web-formular";
  const kalkulacka = [
    lead.kontext && `vyšlo mu: ${txt(lead.kontext)}`,
    lead.cil && `cíl ${txt(lead.cil)} Kč/měs`,
    lead.vek && `věk ${txt(lead.vek)}`,
    lead.pocet_bytu && `bytů potřeba ${txt(lead.pocet_bytu)}`,
  ].filter(Boolean).join(", ");
  const poznamka = [
    lead.interest && `zájem: ${txt(lead.interest)}`,
    lead.message && `zpráva: ${txt(lead.message)}`,
    kalkulacka && `kalkulačka: ${kalkulacka}`,
  ].filter(Boolean).join(" · ");

  const radek: string[] = new Array(24).fill("");
  radek[0] = new Date().toISOString(); //  A  Datum
  radek[1] = txt(lead.name); //            B  Jméno
  radek[2] = txt(lead.phone); //           C  Telefon
  radek[3] = txt(lead.email); //           D  Email
  radek[8] = "web"; //                     I  Zdroj
  radek[9] = "web"; //                     J  Kampaň
  radek[10] = NAZEV_ZDROJE[zdroj] || zdroj; // K  Kreativa → v CRM „odkud přišel"
  radek[14] = poznamka ? `z webu — ${poznamka}` : ""; // O  Poznámka
  radek[22] = lead.horizont_let ? `za ${txt(lead.horizont_let)} let` : ""; // W  Horizont
  radek[23] = "web"; //                    X  Vlna

  // Ne `append`: ten si v tomhle listu sám hledá „tabulku" a zapsal řádek
  // o 12 sloupců doprava, do sloupců obchodníků. Proto přesná adresa
  // na první řádek za posledním vyplněným datem ve sloupci A.
  const sheets = google.sheets({ version: "v4", auth: autorizace() });
  const sloupecA = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "'FB formulář'!A:A",
  });
  const radekCislo = (sloupecA.data.values?.length || 1) + 1;
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `'FB formulář'!A${radekCislo}:X${radekCislo}`,
    valueInputOption: "RAW",
    requestBody: { values: [radek] },
  });
}

/**
 * Založí nebo aktualizuje kontakt v Brevu.
 *
 * Bez e-mailu není koho zakládat, bez klíče se nikam nevolá — v obou případech
 * se tiše přeskočí.
 */
export async function zalozKontaktVBrevu(email: string, jmeno: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey || !email) return;

  const r = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email,
      attributes: { JMENO: jmeno },
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    }),
  });

  if (!r.ok) {
    console.error("Brevo:", r.status, await r.text());
  }
}
