"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { novyEventId, trackLead } from "../lib/lead";
import Honeypot from "../components/Honeypot";

/* ---------- data ---------- */
const BYTY = [
  { id: "os1+1", label: "1+1", mesto: "Duchcov", lokalita: "Osecká, Duchcov", plocha: "41 m²", patro: "1. patro", cena: 2190000, najem: 9490, vynos: "5,20 %", slug: "duchcov-osecka-1-1", img: "/images/duchcov-osecka-1-1/IMG_9339.jpeg" },
  { id: "os2+1", label: "2+1", mesto: "Duchcov", lokalita: "Osecká, Duchcov", plocha: "67 m²", patro: "2. patro", cena: 2990000, najem: 13181, vynos: "5,29 %", slug: "duchcov-osecka-2-1", img: "/images/duchcov-osecka-2-1/IMG_0901.jpeg" },
  { id: "os3+1", label: "3+1", mesto: "Duchcov", lokalita: "Osecká, Duchcov", plocha: "73 m²", patro: "3. patro", cena: 3190000, najem: 13611, vynos: "5,12 %", slug: "duchcov-osecka-3-1", img: "/images/duchcov-osecka-3-1/IMG_0815.jpeg" },
];

const KROKY = [
  {
    rok: "Rok 0",
    t: "Koupíte dostupný byt mimo Prahu",
    d: <>Vlastní byt v Praze je pro většinu nedosažitelný. Místo toho koupíte <strong>konkrétní byt z portfolia</strong> už od ~2,3 mil. Kč — v ceně, na kterou dosáhnete i s běžnými úsporami.</>,
  },
  {
    rok: "Průběžně",
    t: "Nájem pokrývá financování",
    d: <>Byt je hned pronajatý a <strong>garantovaný nájem z velké části pokrývá splátku</strong>. O správu, nájemníky i údržbu se staráme my — vás to měsíčně stojí jen málo.</>,
  },
  {
    rok: "Roky 1–3",
    t: "Roste hodnota i vaše bonita",
    d: <>Splácíte jistinu a hodnota bytu <strong>předpokládaně roste</strong> (modelově 7 % p.a., negarantováno). Roste tím váš vlastní kapitál — a s ním i to, na co u banky dosáhnete.</>,
  },
  {
    rok: "Rok 3+",
    t: "Ručíte bytem a bydlíte v Praze",
    d: <>Máte zhodnocenou, zastavitelnou nemovitost a lepší bonitu. <strong>Tím bytem můžete ručit</strong> a financovat vlastní byt nebo dům, kde chcete bydlet vy.</>,
  },
];

/* ---------- count-up ---------- */
function useCounter(target: number, duration = 1500, run = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, run]);
  return val;
}

const fmt = (n: number) => Math.round(n).toLocaleString("cs-CZ");

export default function MojeStrategie() {
  const [bytIdx, setBytIdx] = useState(0); // default 3+1 (82,3 m²) – nejdostupnější vstup
  const [vklad, setVklad] = useState(500000);
  const [urok, setUrok] = useState(4.9);
  const [doba, setDoba] = useState(30);
  const [run, setRun] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const byt = BYTY[bytIdx];
  const vkladC = Math.min(vklad, byt.cena);
  const hypoteka = Math.max(0, byt.cena - vkladC);
  const rM = urok / 100 / 12;
  const n = doba * 12;
  const splatka = hypoteka <= 0 ? 0 : Math.round((hypoteka * rM) / (1 - Math.pow(1 + rM, -n)));
  const cashflow = byt.najem - splatka;

  // zhodnocení 7 % p.a. – modelové, NEgarantované
  const hodnota = (y: number) => byt.cena * Math.pow(1.07, y);
  const balance = (months: number) => {
    if (hypoteka <= 0) return 0;
    if (rM === 0) return Math.max(0, hypoteka * (1 - months / n));
    const pn = Math.pow(1 + rM, n), pk = Math.pow(1 + rM, Math.min(months, n));
    return Math.max(0, (hypoteka * (pn - pk)) / (pn - 1));
  };
  const hodnotaZa = (y: number) => Math.round(hodnota(y));
  // čistá hodnota (equity) = předpokládaná hodnota bytu − zůstatek úvěru
  const cistaHodnota = (y: number) => Math.max(0, Math.round(hodnota(y) - balance(y * 12)));
  const horizonty = [3, 5, 10];
  const rokyTxt = (y: number) => (y >= 5 ? "let" : "roky");

  const cista5 = useCounter(cistaHodnota(5), 1600, run);
  const nasobek5 = vkladC > 0 ? cistaHodnota(5) / vkladC : 0;

  // graf hodnoty 0–10 let
  const gW = 320, gH = 120, gPx = 14, gTop = 14, gBot = 16;
  const gMin = byt.cena, gMax = hodnota(10);
  const gx = (y: number) => gPx + (y / 10) * (gW - 2 * gPx);
  const gy = (v: number) => gH - gBot - ((v - gMin) / (gMax - gMin)) * (gH - gTop - gBot);
  const gLine = Array.from({ length: 11 }, (_, y) => `${gx(y).toFixed(1)},${gy(hodnota(y)).toFixed(1)}`).join(" ");
  const gArea = `${gx(0).toFixed(1)},${gH - gBot} ${gLine} ${gx(10).toFixed(1)},${gH - gBot}`;

  useEffect(() => {
    setRun(true);
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => { if (x.isIntersecting) x.target.classList.add("on"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name) err.name = "Vyplňte jméno";
    if (!form.phone) err.phone = "Vyplňte telefon";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) err.email = "Zadejte platný email";
    if (Object.keys(err).length) { setErrors(err); return; }
    setErrors({});
    setLoading(true);
    const eventId = novyEventId();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          interest: "Moje strategie – bydlení v Praze",
          zdroj: "moje-strategie",
          message: `${form.message ? form.message + " | " : ""}Zájem o byt ${byt.label} ${byt.plocha} (${fmt(byt.cena)} Kč), vlastní vklad ${fmt(vkladC)} Kč.`,
          event_id: eventId,
          event_source_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
    } catch { /* neblokujeme UX */ }
    setLoading(false);
    setSent(true);
    trackLead("moje-strategie", eventId);
  };

  return (
    <div className="ms">
      <style>{styles}</style>

      <header className="ms-top">
        <Link href="/" className="ms-logo">Investuj<span> bez starostí</span></Link>
        <div className="ms-top-right">
          <a href="tel:+420725027957" className="ms-phone">+420 725 027 957</a>
          <button className="ms-btn ms-btn-sm" onClick={() => scrollTo("kontakt")}>Mám zájem</button>
        </div>
      </header>

      {/* HERO */}
      <section className="ms-hero">
        <div className="ms-hero-glow ms-hero-glow-1" />
        <div className="ms-hero-glow ms-hero-glow-2" />
        <div className="ms-hero-inner">
          <div className="ms-hero-left">
            <div className="ms-tag"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>Moje strategie</div>
            <h1>Bydlím v Praze v nájmu — a vlastní byt si buduju <span className="hl">jinde</span>.</h1>
            <p className="ms-hero-sub">
              Vlastní bydlení v Praze je dnes skoro nedosažitelné. Tak jsem to otočil: koupil jsem <strong>dostupný investiční byt mimo Prahu</strong>, který se splácí nájmem a roste na hodnotě. Za pár let jím můžu <strong>ručit a pořídit si vlastní bydlení v Praze.</strong>
            </p>
            <div className="ms-hero-ctas">
              <button className="ms-btn ms-btn-lg" onClick={() => scrollTo("priklad")}>Spočítat moji strategii</button>
              <button className="ms-btn-ghost ms-btn-lg" onClick={() => scrollTo("kroky")}>Jak to funguje</button>
            </div>
            <div className="ms-trust">František Petrouš · investiční nemovitosti od roku 2014</div>
          </div>

          {/* fotka – příběh Petra */}
          <div className="ms-hero-photo rv">
            <Image src="/images/petr-strategie.jpg" alt="Petr – příběh klienta" fill sizes="(max-width:900px) 100vw, 480px" style={{ objectFit: "cover" }} priority />
            <div className="ms-photo-chip">Příběh Petra · 34 · Praha</div>
            <div className="ms-photo-quote">„Bydlím v Praze v nájmu — a koupil jsem investiční byt."</div>
          </div>
        </div>
      </section>

      {/* CESTA – pruh pod hero */}
      <section className="ms-path">
        <div className="ms-path-inner">
          {[
            { n: "1", t: "Nájem v Praze", s: "Platíte cizímu" },
            { n: "2", t: "Investiční byt mimo Prahu", s: "Splácí ho nájem" },
            { n: "3", t: "Roste hodnota + bonita", s: "Modelově 7 % p.a." },
            { n: "4", t: "Vlastní bydlení v Praze", s: "Ručíte zhodnoceným bytem" },
          ].map((s, i) => (
            <div className="ms-path-step rv" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="ms-path-num">{s.n}</div>
              <div className="ms-path-txt"><b>{s.t}</b><small>{s.s}</small></div>
            </div>
          ))}
        </div>
      </section>

      {/* NÁMITKA – mini chat */}
      <section className="ms-obj">
        <div className="ms-obj-inner rv">
          <div className="ms-obj-eyebrow">Nejčastější reakce, když to vysvětluju</div>
          <div className="ms-chat">
            <div className="ms-msg ms-msg-in">
              <div className="ms-av ms-av-fam">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <div className="ms-msg-col">
                <span className="ms-msg-name">Rodina</span>
                <div className="ms-bubble ms-bubble-in">Vy nemáte vlastní bydlení, pořád bydlíte v nájmu — a budete si kupovat investiční byt někde na severu Čech? Vy nejste normální.</div>
              </div>
            </div>
            <div className="ms-msg ms-msg-out">
              <div className="ms-msg-col">
                <span className="ms-msg-name">Petr</span>
                <div className="ms-bubble ms-bubble-out">Zní to bláznivě — dokud si to nerozkreslíš. Je to nuda, která dává smysl.</div>
              </div>
              <div className="ms-av ms-av-me"><Image src="/images/petr-avatar.jpg" alt="Petr" fill sizes="38px" style={{ objectFit: "cover" }} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* KROKY */}
      <section className="ms-sec ms-steps" id="kroky">
        <div className="ms-head rv">
          <h2 className="ms-h2">Strategie ve čtyřech krocích</h2>
          <p className="ms-sub">Žádná spekulace ani složitost. Dostupný byt, který se splácí sám, postupně roste na hodnotě — a stane se odrazovým můstkem k vlastnímu bydlení.</p>
        </div>
        <div className="ms-steps-grid">
          {KROKY.map((k, i) => (
            <div className="ms-step rv" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="ms-step-no">{i + 1}</div>
              <div className="ms-step-rok">{k.rok}</div>
              <h3>{k.t}</h3>
              <p>{k.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PŘÍKLAD */}
      <section className="ms-sec ms-demo" id="priklad">
        <div className="ms-head rv">
          <h2 className="ms-h2">Spočítejte si svoji strategii</h2>
          <p className="ms-sub">Vyberte byt a výši vlastního vkladu. Uvidíte měsíční cashflow, předpokládaný růst hodnoty a hlavně — kolik vlastního kapitálu vám v bytě naroste, kterým pak můžete ručit na bydlení v Praze.</p>
        </div>

        <div className="ms-demo-grid">
          <div className="ms-demo-card rv">
            <div className="ms-byt-pick">
              {BYTY.map((b, i) => (
                <button key={b.id} className={`ms-byt-btn${i === bytIdx ? " on" : ""}`} onClick={() => setBytIdx(i)}>
                  <span className="t">{b.label}</span><span className="s">{b.mesto} · {b.plocha}</span>
                </button>
              ))}
            </div>
            <div className="ms-bytcard">
              <div className="ms-bytcard-img">
                <Image src={byt.img} alt={`Byt ${byt.label} ${byt.plocha}`} fill sizes="(max-width:900px) 100vw, 420px" style={{ objectFit: "cover" }} />
                <div className="ms-bytcard-badge">{byt.vynos} p.a. nájem</div>
              </div>
              <div className="ms-bytcard-body">
                <div className="ms-bytcard-title">Byt {byt.label} · {byt.plocha}</div>
                <div className="ms-bytcard-meta">{byt.lokalita} · {byt.patro}</div>
                <div className="ms-bytcard-price">{fmt(byt.cena)} Kč</div>
                <Link href={`/projekty/${byt.slug}`} className="ms-bytcard-link">Zobrazit detail bytu →</Link>
              </div>
            </div>
          </div>

          <div className="ms-calc rv">
            <div className="ms-calc-label">Vlastní vklad</div>
            <div className="ms-calc-big">{fmt(vkladC)} Kč</div>
            <input type="range" className="ms-slider" min={200000} max={byt.cena} step={10000} value={vkladC} onChange={(e) => setVklad(Number(e.target.value))} />
            <div className="ms-calc-scale"><span>200 tis.</span><span>{fmt(byt.cena)} Kč</span></div>

            <div className="ms-calc-inputs">
              <label>Úrok p.a.<div className="ms-inwrap"><input type="number" step={0.1} value={urok} onChange={(e) => setUrok(Number(e.target.value))} /><span>%</span></div></label>
              <label>Doba<div className="ms-inwrap"><input type="number" value={doba} onChange={(e) => setDoba(Number(e.target.value))} /><span>let</span></div></label>
            </div>

            <div className="ms-calc-split">
              <div><small>Hypotéka</small><b>{fmt(hypoteka)} Kč</b></div>
              <div><small>Měsíční splátka</small><b>{fmt(splatka)} Kč</b></div>
            </div>

            <div className="ms-cf">
              <div className="ms-cf-label">Měsíční cashflow</div>
              <div className="ms-cf-num" style={{ color: cashflow >= 0 ? "#34d399" : "#fca5a5" }}>
                {cashflow >= 0 ? "+" : "−"}{fmt(Math.abs(cashflow))} Kč<small> / měs.</small>
              </div>
              <div className="ms-cf-eq">garantovaný nájem {fmt(byt.najem)} Kč − splátka {fmt(splatka)} Kč</div>
            </div>

            {/* hodnota bytu v čase */}
            <div className="ms-eq">
              <div className="ms-eq-title">Předpokládaný vývoj hodnoty <span>7 % p.a., negarantováno</span></div>
              <svg className="ms-graf" viewBox={`0 0 ${gW} ${gH}`} preserveAspectRatio="none">
                <polygon points={gArea} fill="rgba(54,109,255,0.16)" />
                <polyline className="ms-graf-line" points={gLine} pathLength={1} fill="none" stroke="#60a5fa" strokeWidth={2.5} strokeLinejoin="round" />
                {horizonty.map((y) => (<circle key={y} cx={gx(y)} cy={gy(hodnota(y))} r={3.5} fill="#60a5fa" />))}
              </svg>
              <div className="ms-proj">
                {horizonty.map((y) => (
                  <div key={y} className="ms-proj-item">
                    <small>za {y} {rokyTxt(y)}</small>
                    <b>{fmt(hodnotaZa(y))} Kč</b>
                  </div>
                ))}
              </div>
            </div>

            {/* pointa: čistá hodnota (equity), kterou si v bytě vytvoříte */}
            <div className="ms-payoff">
              <div className="ms-payoff-label">Vaše čistá hodnota v bytě</div>
              <div className="ms-payoff-big">Za 5 let ~{fmt(cista5)} Kč</div>
              <div className="ms-payoff-mult">z vkladu {fmt(vkladC)} Kč&nbsp;&nbsp;≈&nbsp;&nbsp;<b>{nasobek5.toFixed(1).replace(".", ",")}×</b></div>
              <div className="ms-payoff-sub">Čistá hodnota = předpokládaná hodnota bytu − zůstatek úvěru. Úvěr postupně splácíte a hodnota bytu předpokládaně roste (7 % p.a., negarantováno).</div>
            </div>

            <div className="ms-calc-note">Orientační výpočet. Splátka je ilustrativní, konkrétní sazba závisí na bance. Garantovaný nájem je smluvní; předpokládané zhodnocení 7 % p.a. není garantováno a je nad rámec příjmu z nájmu. Čistá hodnota je modelový odhad (předpokládaná hodnota bytu mínus zůstatek úvěru) a vychází z negarantovaného zhodnocení.</div>
          </div>
        </div>
      </section>

      {/* PROČ TO FUNGUJE */}
      <section className="ms-sec ms-why">
        <div className="ms-head rv">
          <h2 className="ms-h2">Proč to funguje</h2>
        </div>
        <div className="ms-why-grid">
          {[
            { t: "Garantovaný nájem", d: "Smluvně stanovený příjem, který z velké části pokrývá splátku. Nečekáte, jestli se byt pronajme — je pronajatý." },
            { t: "Zastavitelná nemovitost", d: "Družstevní byt lze dát do zástavy, koupit na hypotéku i kdykoli převést do osobního vlastnictví." },
            { t: "Mimo limit ČNB", d: "Družstevní byt se nepočítá do limitu 2 nemovitostí dle regulace ČNB od 1. 4. 2026 — vaši bonitu na vlastní bydlení neblokuje." },
            { t: "All-in správa", d: "Nájemníci, údržba, papíry i fond oprav jsou na nás. Vy jen vlastníte a sledujete, jak roste hodnota." },
          ].map((w, i) => (
            <div className="ms-why-item rv" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="ms-why-check">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#366dff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section className="ms-sec ms-cta" id="kontakt">
        <div className="ms-cta-inner rv">
          <div className="ms-cta-left">
            <h2>Rozkreslíme to na vás</h2>
            <p>Nechte kontakt a František Petrouš vám zavolá. Projdeme konkrétní byt, vaše úspory i bonitu a spočítáme reálnou cestu od nájmu k vlastnímu bydlení — nezávazně.</p>
            <a href="tel:+420725027957" className="ms-cta-phone">+420 725 027 957</a>
            <div className="ms-cta-points">
              <div>✓ Garantovaný nájemní příjem</div>
              <div>✓ Družstevní vlastnictví — mimo limit ČNB od 4/2026</div>
              <div>✓ All-in správa, žádné starosti</div>
            </div>
          </div>
          <div className="ms-form-wrap">
            {sent ? (
              <div className="ms-form-ok">
                <div className="ms-ok-ic">✓</div>
                <h3>Děkujeme!</h3>
                <p>Ozveme se vám co nejdříve na uvedený kontakt.</p>
              </div>
            ) : (
              <form className="ms-form" onSubmit={submit}>
                <Honeypot value={form.website} onChange={(v) => setForm((s) => ({ ...s, website: v }))} />
                <h3>Chci probrat svoji strategii</h3>
                <div className="ms-field"><input placeholder="Jméno a příjmení" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errors.name && <span className="ms-err">{errors.name}</span>}</div>
                <div className="ms-field"><input placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />{errors.phone && <span className="ms-err">{errors.phone}</span>}</div>
                <div className="ms-field"><input placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />{errors.email && <span className="ms-err">{errors.email}</span>}</div>
                <textarea placeholder="Zpráva (nepovinné)" rows={2} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <button type="submit" className="ms-form-submit" disabled={loading}>{loading ? "Odesílám…" : "Chci nezávaznou konzultaci"}</button>
                <small className="ms-form-gdpr">Odesláním souhlasíte se zpracováním údajů za účelem kontaktování. Vybraný byt: {byt.label} · {byt.plocha}.</small>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="ms-foot">
        <Link href="/">← Zpět na hlavní stránku investujbezstarosti.cz</Link>
        <span>Předpokládané kapitálové zhodnocení nemovitosti 7 % p.a. není garantováno a je nad rámec garantovaného příjmu z nájmu. Možnost financování vlastního bydlení posuzuje banka individuálně podle vaší bonity.</span>
      </footer>
    </div>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.ms *{box-sizing:border-box;margin:0;padding:0;}
.ms{--blue:#366dff;--blue-dark:#1a4fd6;--gold:#d97706;--bg:#f7f7fb;--text:#0f172a;--text2:#475569;--border:#e2e8f0;
  font-family:'Plus Jakarta Sans',sans-serif;color:var(--text);background:var(--bg);overflow-x:hidden;}
.ms a{text-decoration:none;color:inherit;}

.ms-top{position:fixed;top:0;left:0;right:0;z-index:100;height:62px;display:flex;align-items:center;justify-content:space-between;padding:0 6%;background:rgba(247,247,251,0.9);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.ms-logo{font-weight:800;font-size:1.02rem;}
.ms-logo span{color:var(--blue);}
.ms-top-right{display:flex;align-items:center;gap:16px;}
.ms-phone{font-weight:700;font-size:0.9rem;}
.ms-btn{background:var(--blue);color:#fff;border:none;border-radius:50px;font-family:inherit;font-weight:700;cursor:pointer;transition:all .2s;}
.ms-btn:hover{background:var(--blue-dark);transform:translateY(-1px);box-shadow:0 8px 24px rgba(54,109,255,.35);}
.ms-btn-sm{padding:9px 18px;font-size:.82rem;}
.ms-btn-lg{padding:15px 30px;font-size:1rem;}
.ms-btn-ghost{background:#fff;color:var(--blue);border:2px solid var(--blue);border-radius:50px;font-family:inherit;font-weight:700;cursor:pointer;transition:all .2s;}
.ms-btn-ghost:hover{background:#eef2ff;transform:translateY(-1px);}

/* HERO */
.ms-hero{position:relative;padding:120px 6% 70px;overflow:hidden;background:linear-gradient(135deg,#f7f7fb 0%,#eef2ff 55%,#f0f7ff 100%);}
.ms-hero-glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:.35;pointer-events:none;}
.ms-hero-glow-1{width:680px;height:680px;background:radial-gradient(circle,#366dff44,transparent);top:-180px;right:-160px;}
.ms-hero-glow-2{width:520px;height:520px;background:radial-gradient(circle,#f59e0b33,transparent);bottom:-120px;left:-60px;}
.ms-hero-inner{position:relative;z-index:2;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.12fr .88fr;gap:56px;align-items:center;}
.ms-tag{display:inline-flex;align-items:center;gap:8px;background:#0f172a;color:#fff;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:8px 16px;border-radius:50px;margin-bottom:1.4rem;}
.ms-hero h1{font-size:clamp(2.1rem,4vw,3.4rem);font-weight:800;line-height:1.1;letter-spacing:-1.5px;margin-bottom:1.3rem;}
.ms-hero h1 .hl{color:var(--blue);}
.ms-hero-sub{font-size:1.06rem;line-height:1.6;color:var(--text2);max-width:560px;margin-bottom:1.8rem;}
.ms-hero-sub strong{color:var(--text);}
.ms-hero-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:1.2rem;}
.ms-trust{font-size:.82rem;color:var(--text2);font-weight:500;}

/* HERO foto – příběh Petra */
.ms-hero-photo{position:relative;aspect-ratio:4/5;border-radius:22px;overflow:hidden;box-shadow:0 24px 60px rgba(15,23,42,.28);background:#e2e8f0;}
.ms-hero-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,23,42,.3) 0%,transparent 26%,transparent 52%,rgba(15,23,42,.86) 100%);}
.ms-photo-chip{position:absolute;top:16px;left:16px;z-index:2;background:rgba(15,23,42,.62);backdrop-filter:blur(6px);color:#fff;font-size:.76rem;font-weight:700;padding:8px 14px;border-radius:50px;letter-spacing:.01em;}
.ms-photo-quote{position:absolute;left:22px;right:22px;bottom:22px;z-index:2;color:#fff;font-size:1.08rem;font-weight:700;line-height:1.4;letter-spacing:-.3px;}

/* CESTA – pruh */
.ms-path{background:#0f172a;padding:26px 6%;}
.ms-path-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.ms-path-step{display:flex;align-items:center;gap:12px;color:#fff;position:relative;}
.ms-path-step:not(:last-child)::after{content:"→";position:absolute;right:-12px;top:50%;transform:translateY(-50%);color:#475569;font-weight:700;}
.ms-path-num{flex-shrink:0;width:34px;height:34px;border-radius:50%;background:rgba(96,165,250,.18);color:#60a5fa;font-weight:800;display:flex;align-items:center;justify-content:center;}
.ms-path-txt b{display:block;font-size:.92rem;font-weight:700;line-height:1.2;}
.ms-path-txt small{font-size:.74rem;color:#94a3b8;}

/* NÁMITKA – mini chat */
.ms-obj{background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:64px 6%;}
.ms-obj-inner{max-width:620px;margin:0 auto;}
.ms-obj-eyebrow{text-align:center;font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text2);margin-bottom:26px;}
.ms-chat{display:flex;flex-direction:column;gap:16px;}
.ms-msg{display:flex;align-items:flex-end;gap:10px;max-width:88%;}
.ms-msg-in{align-self:flex-start;}
.ms-msg-out{align-self:flex-end;flex-direction:row;}
.ms-msg-col{display:flex;flex-direction:column;gap:5px;min-width:0;}
.ms-msg-out .ms-msg-col{align-items:flex-end;}
.ms-msg-name{font-size:.72rem;font-weight:700;color:var(--text2);padding:0 6px;}
.ms-av{position:relative;flex-shrink:0;width:38px;height:38px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.95rem;}
.ms-av-fam{background:#f1f5f9;border:1px solid var(--border);}
.ms-av-me{background:var(--blue);color:#fff;}
.ms-bubble{font-size:1.02rem;line-height:1.5;padding:13px 17px;border-radius:20px;}
.ms-bubble-in{background:#f1f5f9;color:var(--text);font-weight:600;border-bottom-left-radius:5px;}
.ms-bubble-out{background:var(--blue);color:#fff;font-weight:600;border-bottom-right-radius:5px;box-shadow:0 8px 24px rgba(54,109,255,.28);}

/* sekce */
.ms-sec{padding:80px 6%;}
.ms-h2{font-size:clamp(1.7rem,3vw,2.4rem);font-weight:800;letter-spacing:-1px;line-height:1.15;margin-bottom:.9rem;}
.ms-sub{font-size:1.02rem;color:var(--text2);line-height:1.6;max-width:700px;}
.ms-head{max-width:1120px;margin:0 auto 44px;text-align:center;}
.ms-head .ms-sub{margin:0 auto;}

/* KROKY */
.ms-steps-grid{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.ms-step{background:#fff;border:1px solid var(--border);border-radius:18px;padding:26px 22px;position:relative;transition:transform .25s,box-shadow .25s;}
.ms-step:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(54,109,255,.12);}
.ms-step-no{width:38px;height:38px;border-radius:11px;background:var(--blue);color:#fff;font-weight:800;font-size:1.1rem;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
.ms-step-rok{font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--blue);margin-bottom:6px;}
.ms-step h3{font-size:1.08rem;font-weight:800;margin-bottom:9px;line-height:1.25;}
.ms-step p{font-size:.9rem;color:var(--text2);line-height:1.55;}
.ms-step p strong{color:var(--text);font-weight:700;}

/* DEMO */
.ms-demo-grid{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start;}
.ms-demo-card{background:#fff;border:1px solid var(--border);border-radius:20px;padding:22px;box-shadow:0 4px 24px rgba(54,109,255,.07);}
.ms-byt-pick{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;}
.ms-byt-btn{flex:1 1 84px;padding:11px 6px;border:1px solid var(--border);border-radius:12px;background:var(--bg);cursor:pointer;transition:all .2s;font-family:inherit;text-align:center;}
.ms-byt-btn:hover{border-color:var(--blue);}
.ms-byt-btn.on{border-color:var(--blue);background:#eef2ff;}
.ms-byt-btn .t{display:block;font-size:1.05rem;font-weight:800;}
.ms-byt-btn .s{display:block;font-size:.7rem;color:var(--text2);margin-top:2px;}
.ms-bytcard{border:1px solid var(--border);border-radius:16px;overflow:hidden;}
.ms-bytcard-img{position:relative;width:100%;aspect-ratio:16/10;background:#e2e8f0;}
.ms-bytcard-badge{position:absolute;top:12px;left:12px;background:rgba(15,23,42,.82);color:#fff;font-size:.74rem;font-weight:700;padding:6px 12px;border-radius:50px;backdrop-filter:blur(4px);}
.ms-bytcard-body{padding:18px;}
.ms-bytcard-title{font-size:1.1rem;font-weight:800;}
.ms-bytcard-meta{font-size:.84rem;color:var(--text2);margin-top:3px;}
.ms-bytcard-price{font-size:1.5rem;font-weight:800;color:var(--blue);margin:10px 0 12px;letter-spacing:-1px;}
.ms-bytcard-link{font-size:.86rem;font-weight:700;color:var(--blue);}

.ms-calc{background:#0f172a;color:#fff;border-radius:20px;padding:26px;box-shadow:0 12px 40px rgba(15,23,42,.2);}
.ms-calc-label{font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;}
.ms-calc-big{font-size:2.1rem;font-weight:800;letter-spacing:-1px;margin:4px 0 14px;}
.ms-slider{width:100%;height:6px;border-radius:3px;background:rgba(255,255,255,.15);outline:none;cursor:pointer;-webkit-appearance:none;}
.ms-slider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--blue);cursor:pointer;box-shadow:0 2px 8px rgba(54,109,255,.5);}
.ms-slider::-moz-range-thumb{width:20px;height:20px;border:none;border-radius:50%;background:var(--blue);cursor:pointer;}
.ms-calc-scale{display:flex;justify-content:space-between;font-size:.7rem;color:#64748b;margin-top:6px;}
.ms-calc-inputs{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0;}
.ms-calc-inputs label{font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;}
.ms-inwrap{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:8px 12px;margin-top:6px;}
.ms-inwrap input{width:100%;background:none;border:none;outline:none;color:#fff;font-family:inherit;font-size:1rem;font-weight:700;}
.ms-inwrap span{font-size:.82rem;color:#94a3b8;}
.ms-calc-split{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:14px 0;border-top:1px solid rgba(255,255,255,.1);}
.ms-calc-split small{display:block;font-size:.72rem;color:#94a3b8;}
.ms-calc-split b{font-size:1.05rem;font-weight:800;color:#fff;}
.ms-cf{background:rgba(255,255,255,.05);border-radius:14px;padding:16px;margin-top:6px;}
.ms-cf-label{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#dbeafe;}
.ms-cf-num{font-size:2rem;font-weight:800;letter-spacing:-1px;margin:4px 0 2px;}
.ms-cf-num small{font-size:.9rem;font-weight:600;color:#cbd5e1;}
.ms-cf-eq{font-size:.74rem;color:#94a3b8;}
.ms-eq{margin-top:16px;}
.ms-eq-title{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#93c5fd;}
.ms-eq-title span{font-weight:600;color:#64748b;text-transform:none;letter-spacing:0;}
.ms-payoff{margin-top:12px;background:linear-gradient(135deg,rgba(54,109,255,.22),rgba(96,165,250,.12));border:1px solid rgba(96,165,250,.4);border-radius:14px;padding:16px 18px;}
.ms-payoff-label{font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#93c5fd;}
.ms-payoff-big{font-size:1.45rem;font-weight:800;letter-spacing:-.5px;color:#fff;margin:4px 0 2px;line-height:1.2;}
.ms-payoff-mult{font-size:.92rem;color:#bfdbfe;margin:0 0 8px;}
.ms-payoff-mult b{color:#fff;font-weight:800;font-size:1.05rem;}
.ms-payoff-sub{font-size:.78rem;color:#cbd5e1;line-height:1.55;}
.ms-graf{width:100%;height:auto;margin-top:14px;display:block;}
.ms-graf-line{stroke-dasharray:1;stroke-dashoffset:1;animation:msdraw 1.6s .2s ease forwards;}
@keyframes msdraw{to{stroke-dashoffset:0;}}
.ms-proj{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px;}
.ms-proj-item{background:rgba(54,109,255,.12);border:1px solid rgba(96,165,250,.28);border-radius:11px;padding:10px;text-align:center;}
.ms-proj-item small{display:block;font-size:.7rem;color:#93c5fd;}
.ms-proj-item b{font-size:.92rem;font-weight:800;display:block;margin:2px 0;}
.ms-proj-item span{font-size:.62rem;color:#94a3b8;}
.ms-calc-note{font-size:.7rem;color:#64748b;line-height:1.5;margin-top:16px;}

/* PROČ */
.ms-why{background:#fff;border-top:1px solid var(--border);}
.ms-why-grid{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:22px;}
.ms-why-item{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:24px 20px;}
.ms-why-check{width:40px;height:40px;border-radius:11px;background:#eef2ff;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
.ms-why-item h3{font-size:1.02rem;font-weight:800;margin-bottom:8px;}
.ms-why-item p{font-size:.88rem;color:var(--text2);line-height:1.55;}

/* CTA */
.ms-cta{background:linear-gradient(135deg,#0f172a,#1e293b);color:#fff;}
.ms-cta-inner{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
.ms-cta-left h2{font-size:clamp(1.7rem,3vw,2.3rem);font-weight:800;letter-spacing:-1px;margin-bottom:1rem;}
.ms-cta-left p{font-size:1rem;color:#cbd5e1;line-height:1.6;margin-bottom:1.4rem;}
.ms-cta-phone{display:inline-block;font-size:1.6rem;font-weight:800;color:#60a5fa;margin-bottom:1.4rem;letter-spacing:-.5px;}
.ms-cta-points{display:flex;flex-direction:column;gap:8px;font-size:.92rem;color:#e2e8f0;}
.ms-form-wrap{background:#fff;border-radius:20px;padding:30px;color:var(--text);box-shadow:0 24px 60px rgba(0,0,0,.3);}
.ms-form h3{font-size:1.15rem;font-weight:800;margin-bottom:18px;}
.ms-field{margin-bottom:12px;}
.ms-form input,.ms-form textarea{width:100%;font-family:inherit;font-size:.92rem;color:var(--text);border:1.5px solid var(--border);border-radius:11px;padding:13px 15px;outline:none;transition:border-color .2s,box-shadow .2s;}
.ms-form textarea{margin-bottom:4px;resize:vertical;}
.ms-form input:focus,.ms-form textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(54,109,255,.12);}
.ms-err{display:block;font-size:.75rem;color:#dc2626;margin-top:4px;}
.ms-form-submit{width:100%;padding:15px;font-size:1rem;font-weight:700;background:var(--blue);color:#fff;border:none;border-radius:12px;font-family:inherit;cursor:pointer;transition:all .2s;margin-top:8px;}
.ms-form-submit:hover{background:var(--blue-dark);}
.ms-form-submit:disabled{opacity:.6;cursor:default;}
.ms-form-gdpr{display:block;font-size:.72rem;color:var(--text2);margin-top:12px;line-height:1.5;}
.ms-form-ok{text-align:center;padding:30px 10px;}
.ms-ok-ic{width:56px;height:56px;border-radius:50%;background:#dcfce7;color:#15803d;font-size:1.8rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
.ms-form-ok h3{font-size:1.3rem;font-weight:800;margin-bottom:8px;}
.ms-form-ok p{color:var(--text2);}

.ms-foot{background:#0b1120;color:#64748b;padding:30px 6%;display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;}
.ms-foot a{color:#94a3b8;font-size:.88rem;font-weight:600;}
.ms-foot span{font-size:.72rem;max-width:720px;line-height:1.5;}

.rv{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease;}
.rv.on{opacity:1;transform:none;}

@media(max-width:900px){
  .ms-hero-inner{grid-template-columns:1fr;gap:36px;}
  .ms-demo-grid{grid-template-columns:1fr;}
  .ms-cta-inner{grid-template-columns:1fr;gap:32px;}
  .ms-phone{display:none;}
  .ms-steps-grid{grid-template-columns:1fr 1fr;}
  .ms-why-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:760px){
  .ms-sec{padding:56px 5%;}
  .ms-hero{padding:96px 5% 56px;}
  /* kroky = horizontální swipe */
  .ms-steps-grid{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding:6px 5% 16px;margin:0 -5%;scrollbar-width:none;}
  .ms-steps-grid::-webkit-scrollbar{display:none;}
  .ms-step{flex:0 0 80%;scroll-snap-align:start;}
  .ms-why-grid{grid-template-columns:1fr;}
  .ms-path-inner{grid-template-columns:1fr 1fr;gap:16px 14px;}
  .ms-path-step:not(:last-child)::after{display:none;}
}
`;
