import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interest, message } = body;

    const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_B64;
    const sheetId = process.env.GOOGLE_SHEET_ID;
    console.log("SHEET_ID:", sheetId);
    console.log("B64 present:", !!b64, "length:", b64?.length);

    const credentials = JSON.parse(
      Buffer.from(b64!, "base64").toString("utf-8")
    );
    console.log("credentials email:", credentials.client_email);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const datum = new Date().toLocaleString("cs-CZ", {
      timeZone: "Europe/Prague",
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[datum, name, email, phone, interest, message || "", "web-formular"]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ ok: false, error: "Chyba serveru" }, { status: 500 });
  }
}
