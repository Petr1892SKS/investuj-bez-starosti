// Jednotné měření leadů napříč všemi formuláři na webu.
//
// Každý odeslaný formulář vyvolá:
//   1) Meta Pixel událost Lead (prohlížeč)
//   2) dataLayer událost generate_lead (GTM → GA4)
//   3) stejnou událost pošle server přes Conversions API (viz app/api/contact/route.ts)
//
// Body 1 a 3 sdílí `eventId`, aby je Meta spárovala a nepočítala dvakrát.

export function novyEventId(): string {
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function trackLead(zdroj: string, eventId: string, extra?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  };

  if (w.fbq) {
    w.fbq("track", "Lead", { content_name: zdroj, ...extra }, { eventID: eventId });
  }

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "generate_lead", lead_source: zdroj, event_id: eventId, ...extra });
}
