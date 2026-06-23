"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ---------- data ---------- */
const BYTY = [
  { id: "3+1b", label: "3+1", mesto: "Bílina", lokalita: "Alšova, Bílina", plocha: "82,3 m²", patro: "4. patro", cena: 2850000, najem: 12974, vynos: "5,46 %", slug: "alsova-bilina-bez-zadveri", img: "/images/alsova-bilina-3-1-bez-zadveri/IMG_6878.jpeg" },
  { id: "3+1z", label: "3+1", mesto: "Bílina", lokalita: "Alšova, Bílina", plocha: "87,2 m²", patro: "3. patro", cena: 2990000, najem: 13370, vynos: "5,37 %", slug: "alsova-bilina", img: "/images/alsova-bilina-3-1-zadveri/IMG_4967.jpeg" },
  { id: "os1+1", label: "1+1", mesto: "Duchcov", lokalita: "Osecká, Duchcov", plocha: "38 m²", patro: "1. patro", cena: 2190000, najem: 9490, vynos: "5,20 %", slug: "duchcov-osecka-1-1", img: "/images/duchcov-osecka-1-1/IMG_9339.jpeg" },
  { id: "os2+1", label: "2+1", mesto: "Duchcov", lokalita: "Osecká, Duchcov", plocha: "62 m²", patro: "2. patro", cena: 2990000, najem: 13181, vynos: "5,29 %", slug: "duchcov-osecka-2-1", img: "/images/duchcov-osecka-2-1/IMG_0901.jpeg" },
  { id: "os3+1", label: "3+1", mesto: "Duchcov", lokalita: "Osecká, Duchcov", plocha: "67 m²", patro: "3. patro", cena: 3190000, najem: 13611, vynos: "5,12 %", slug: "duchcov-osecka-3-1", img: "/images/duchcov-osecka-3-1/IMG_0815.jpeg" },
];

/* ---------- count-up hook ---------- */
function useCounter(target: number, duration = 1600, run = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, run]);
  return val;
}

const fmt = (n: number) => Math.round(n).toLocaleString("cs-CZ");

export default function BytNaHypoteku() {
  const [bytIdx, setBytIdx] = useState(1); // default 3+1 87,2 m²
  const [cmp, setCmp] = useState(0); // mobilní srovnání: 0 akcie, 1 fond, 2 spořicí
  const [vklad, setVklad] = useState(990000);
  const [urok, setUrok] = useState(4.9);
  const [doba, setDoba] = useState(30);
  const [heroRun, setHeroRun] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
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
  const paka = byt.cena / vkladC;

  // zhodnocení 7 % p.a. — předpokládané, NEgarantované
  const zhodnRok = Math.round(byt.cena * 0.07);
  const zhodnVklad = Math.round(vkladC * 0.07);
  const projRoky = [3, 5, 10];
  const rokyTxt = (y: number) => (y >= 5 ? "let" : "roky");
  const hodnotaZa = (y: number) => Math.round(byt.cena * Math.pow(1.07, y));

  // graf 0–10 let
  const gW = 320, gH = 130, gPx = 14, gTop = 14, gBot = 18;
  const gMin = byt.cena, gMax = byt.cena * Math.pow(1.07, 10);
  const gx = (y: number) => gPx + (y / 10) * (gW - 2 * gPx);
  const gy = (v: number) => gH - gBot - ((v - gMin) / (gMax - gMin)) * (gH - gTop - gBot);
  const gLine = Array.from({ length: 11 }, (_, y) => `${gx(y).toFixed(1)},${gy(byt.cena * Math.pow(1.07, y)).toFixed(1)}`).join(" ");
  const gArea = `${gx(0).toFixed(1)},${gH - gBot} ${gLine} ${gx(10).toFixed(1)},${gH - gBot}`;

  const cenaCount = useCounter(byt.cena, 1600, heroRun);
  const vkladCount = useCounter(990000, 1400, heroRun);

  /* reveal + hero trigger */
  useEffect(() => {
    setHeroRun(true);
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
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          interest: "Páka – byt na hypotéku",
          message: `${form.message ? form.message + " | " : ""}Zájem o byt ${byt.label} ${byt.plocha} (${fmt(byt.cena)} Kč), vlastní vklad ${fmt(vkladC)} Kč.`,
        }),
      });
    } catch { /* neblokujeme UX */ }
    setLoading(false);
    setSent(true);
    if (typeof window !== "undefined" && (window as any).fbq) (window as any).fbq("track", "Lead");
  };

  const SROVNANI = [
    { k: "Finanční páka", byt: "Ano – pracuje celá hodnota bytu", b: "good", akcie: "Běžně ne", a: "bad", fond: "Ne", f: "bad", spor: "Ne", s: "bad" },
    { k: "Vlastníte konkrétní aktivum", byt: "Ano, konkrétní byt v katastru", b: "good", akcie: "Podíl ve firmě", a: "mid", fond: "Podílový list", f: "mid", spor: "Ne", s: "bad" },
    { k: "Pravidelný příjem", byt: "Garantovaný nájem (smluvní)", b: "good", akcie: "Nejisté dividendy", a: "mid", fond: "Výnos po poplatcích", f: "mid", spor: "Nízký úrok", s: "mid" },
    { k: "Kolísání hodnoty / emoce", byt: "Nízké, nesledujete denní kurz", b: "good", akcie: "Vysoké, nutný timing", a: "bad", fond: "Střední", f: "mid", spor: "Žádné", s: "good" },
    { k: "Ochrana proti inflaci", byt: "Reálné aktivum, roste s trhem", b: "good", akcie: "Částečná", a: "mid", fond: "Částečná", f: "mid", spor: "Reálně pod inflací", s: "bad" },
    { k: "Průběžné poplatky", byt: "All-in správa, bez starostí", b: "good", akcie: "Poplatky brokera", a: "mid", fond: "1,5–2,5 % p.a.", f: "bad", spor: "Bez poplatků", s: "good" },
  ];

  const tag = (t: string) => (t === "good" ? "ok" : t === "bad" ? "no" : "mid");

  return (
    <div className="lp">
      <style>{styles}</style>

      {/* TOP BAR */}
      <header className="lp-top">
        <Link href="/" className="lp-logo">Investuj<span> bez starostí</span></Link>
        <div className="lp-top-right">
          <a href="tel:+420725027957" className="lp-phone">+420 725 027 957</a>
          <button className="lp-btn lp-btn-sm" onClick={() => scrollTo("kontakt")}>Mám zájem</button>
        </div>
      </header>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-glow lp-hero-glow-1" />
        <div className="lp-hero-glow lp-hero-glow-2" />
        <div className="lp-hero-inner">
          <div className="lp-hero-left">
            <h1>
              S úsporami <span className="hl">do milionu korun</span> můžete vlastnit byt za <span className="hl-gold">{fmt(cenaCount)} Kč</span>.
            </h1>
            <p className="lp-hero-sub">
              Zbytek pokryje hypotéka, kterou z velké části splácí nájemník. Vy vlastníte celý byt v přímém vlastnictví — a zhodnocuje se vám <strong>celá</strong> jeho hodnota, ne jen vložený milion.
            </p>

            {/* leverage bar */}
            <div className="lp-bar">
              <div className="lp-bar-track">
                <div className="lp-bar-vklad"><span>Váš vklad</span></div>
                <div className="lp-bar-hypo"><span>Hypotéka (splácí nájem)</span></div>
              </div>
              <div className="lp-bar-legend">
                <div><b>{fmt(vkladCount)} Kč</b><small>vlastní vklad</small></div>
                <div className="r"><b>{fmt(cenaCount)} Kč</b><small>hodnota bytu, kterou vlastníte</small></div>
              </div>
            </div>

            <div className="lp-hero-ctas">
              <button className="lp-btn lp-btn-lg" onClick={() => scrollTo("priklad")}>Spočítat na konkrétním bytě</button>
              <button className="lp-btn-ghost lp-btn-lg" onClick={() => scrollTo("kontakt")}>Nezávazná konzultace</button>
            </div>
            <div className="lp-trust">František Petrouš · v oboru od roku 2014</div>
          </div>

          <div className="lp-hero-card rv">
            <div className="lp-hc-tag">Princip páky</div>
            <div className="lp-hc-mult">
              <span className="lp-hc-mult-num">{paka.toFixed(1).replace(".", ",")}×</span>
              <span className="lp-hc-mult-lbl">tolik majetku ovládáte<br />oproti samotnému vkladu</span>
            </div>
            <hr />
            <div className="lp-hc-row"><span>Předpokládané zhodnocení 7 % p.a. z celé hodnoty</span><b className="gold">+{fmt(zhodnRok)} Kč/rok</b></div>
            <div className="lp-hc-row dim"><span>Zhodnocení jen z vašeho vkladu</span><b>+{fmt(zhodnVklad)} Kč/rok</b></div>
            <div className="lp-hc-note">Páka znamená, že zhodnocení počítáte z celé nemovitosti, ne jen z toho, co jste vložili. Zhodnocení 7 % p.a. je modelové, není garantováno.</div>
          </div>
        </div>
      </section>

      {/* 3 PILÍŘE */}
      <section className="lp-sec lp-pillars">
        <div className="lp-pillars-grid">
          {[
            { ic: <><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></>, t: "Nájem pracuje za vás", d: <>Garantovaný nájemní příjem je smluvní a z velké části pokrývá <strong>měsíční splátku hypotéky</strong>. Držba bytu vás tak měsíčně <strong>stojí jen málo, nebo dokonce vydělává</strong>.</> },
            { ic: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>, t: "Roste celá nemovitost", d: <>Předpokládané zhodnocení 7 % p.a. (modelově, není garantováno) se počítá z <strong>plné hodnoty bytu</strong> — ne jen z vašeho vkladu. To je <strong>matematické jádro páky</strong>.</> },
            { ic: <><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 0 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="#366dff" stroke="none" /></>, t: "Vlastníte konkrétní byt", d: <><strong>Žádný papírový podíl.</strong> Konkrétní byt v družstevním vlastnictví, který lze <strong>kdykoli převést do osobního vlastnictví</strong>, dát do zástavy nebo prodat.</> },
          ].map((p, i) => (
            <div className="lp-pillar rv" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="lp-pillar-ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#366dff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{p.ic}</svg>
              </div>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERAKTIVNÍ PŘÍKLAD */}
      <section className="lp-sec lp-demo" id="priklad">
        <div className="lp-demo-head rv">
          <h2 className="lp-h2">Spočítejte si to na konkrétním bytě</h2>
          <p className="lp-sub">Vyberte byt z naší nabídky a posuňte výši vlastního vkladu. Uvidíte měsíční cashflow (garantovaný nájem oproti splátce) a odděleně předpokládaný vývoj hodnoty v čase.</p>
        </div>

        <div className="lp-demo-grid">
          {/* ovládání + karta bytu */}
          <div className="lp-demo-card rv">
            <div className="lp-byt-pick">
              {BYTY.map((b, i) => (
                <button key={b.id} className={`lp-byt-btn${i === bytIdx ? " on" : ""}`} onClick={() => setBytIdx(i)}>
                  <span className="t">{b.label}</span>
                  <span className="s">{b.mesto} · {b.plocha}</span>
                </button>
              ))}
            </div>

            <div className="lp-bytcard">
              <div className="lp-bytcard-img">
                <Image src={byt.img} alt={`Byt ${byt.label} ${byt.plocha}`} fill sizes="(max-width:900px) 100vw, 420px" style={{ objectFit: "cover" }} />
                <div className="lp-bytcard-badge">{byt.vynos} p.a. nájem</div>
              </div>
              <div className="lp-bytcard-body">
                <div className="lp-bytcard-title">Byt {byt.label} · {byt.plocha}</div>
                <div className="lp-bytcard-meta">{byt.lokalita} · {byt.patro}</div>
                <div className="lp-bytcard-price">{fmt(byt.cena)} Kč</div>
                <Link href={`/projekty/${byt.slug}`} className="lp-bytcard-link">Zobrazit detail bytu →</Link>
              </div>
            </div>
          </div>

          {/* výpočet */}
          <div className="lp-calc rv">
            <div className="lp-calc-label">Vlastní vklad</div>
            <div className="lp-calc-big">{fmt(vkladC)} Kč</div>
            <input type="range" className="lp-slider" min={200000} max={byt.cena} step={10000} value={vkladC} onChange={(e) => setVklad(Number(e.target.value))} />
            <div className="lp-calc-scale"><span>200 tis.</span><span>{fmt(byt.cena)} Kč</span></div>

            <div className="lp-calc-inputs">
              <label>Úrok p.a.
                <div className="lp-inwrap"><input type="number" step={0.1} value={urok} onChange={(e) => setUrok(Number(e.target.value))} /><span>%</span></div>
              </label>
              <label>Doba
                <div className="lp-inwrap"><input type="number" value={doba} onChange={(e) => setDoba(Number(e.target.value))} /><span>let</span></div>
              </label>
            </div>

            <div className="lp-calc-split">
              <div><small>Hypotéka</small><b>{fmt(hypoteka)} Kč</b></div>
              <div><small>Měsíční splátka</small><b>{fmt(splatka)} Kč</b></div>
            </div>

            {/* cashflow */}
            <div className="lp-cf">
              <div className="lp-cf-label">Měsíční cashflow</div>
              <div className="lp-cf-num" style={{ color: cashflow >= 0 ? "#15803d" : "#dc2626" }}>
                {cashflow >= 0 ? "+" : "−"}{fmt(Math.abs(cashflow))} Kč<small> / měs.</small>
              </div>
              <div className="lp-cf-eq">garantovaný nájem {fmt(byt.najem)} Kč − splátka {fmt(splatka)} Kč</div>
            </div>

            {/* zhodnocení + graf */}
            <div className="lp-zh">
              <div className="lp-zh-label">Předpokládaný vývoj hodnoty <span>7 % p.a., negarantováno</span></div>
              <svg className="lp-graf" viewBox={`0 0 ${gW} ${gH}`} preserveAspectRatio="none">
                <polygon points={gArea} fill="rgba(245,158,11,0.14)" />
                <polyline className="lp-graf-line" points={gLine} pathLength={1} fill="none" stroke="#d97706" strokeWidth={2.5} strokeLinejoin="round" />
                {projRoky.map((y) => (
                  <circle key={y} cx={gx(y)} cy={gy(byt.cena * Math.pow(1.07, y))} r={3.5} fill="#d97706" />
                ))}
              </svg>
              <div className="lp-proj">
                {projRoky.map((y) => (
                  <div key={y} className="lp-proj-item">
                    <small>za {y} {rokyTxt(y)}</small>
                    <b>{fmt(hodnotaZa(y))} Kč</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="lp-calc-note">Výpočet je orientační. Splátka je ilustrativní — konkrétní sazba závisí na bance. Garantovaný nájem je smluvní; předpokládané zhodnocení 7 % p.a. není garantováno a je nad rámec příjmu z nájmu.</div>
          </div>
        </div>
      </section>

      {/* SROVNÁNÍ */}
      <section className="lp-sec lp-cmp">
        <div className="lp-demo-head rv">
          <h2 className="lp-h2">Proč zrovna byt na páku?</h2>
          <p className="lp-sub">Stejné peníze, různé cesty. Tohle je rozdíl mezi bytem s pákou, akciemi, nemovitostními fondy a spořicím účtem.</p>
        </div>

        <div className="lp-table rv">
          <div className="lp-tr lp-thead">
            <div className="lp-th-feat" />
            <div className="lp-th hot">Byt na páku</div>
            <div className="lp-th">Akcie</div>
            <div className="lp-th">Nemovitostní fond</div>
            <div className="lp-th">Spořicí účet</div>
          </div>
          {SROVNANI.map((r, i) => (
            <div className="lp-tr" key={i}>
              <div className="lp-td-feat">{r.k}</div>
              <div className={`lp-td hot ${tag(r.b)}`}><span className="lp-dot" />{r.byt}</div>
              <div className={`lp-td ${tag(r.a)}`}><span className="lp-dot" />{r.akcie}</div>
              <div className={`lp-td ${tag(r.f)}`}><span className="lp-dot" />{r.fond}</div>
              <div className={`lp-td ${tag(r.s)}`}><span className="lp-dot" />{r.spor}</div>
            </div>
          ))}
        </div>

        {/* MOBIL: interaktivní head-to-head */}
        <div className="lp-cmp-m rv">
          <div className="lp-m-seg">
            {["Akcie", "Nem. fond", "Spořicí účet"].map((l, i) => (
              <button key={l} className={`lp-m-seg-btn${i === cmp ? " on" : ""}`} onClick={() => setCmp(i)}>{l}</button>
            ))}
          </div>
          <div className="lp-m-table">
            <div className="lp-m-head">
              <div className="lp-m-h hot">Byt na páku</div>
              <div className="lp-m-h">{["Akcie", "Nemovitostní fond", "Spořicí účet"][cmp]}</div>
            </div>
            {SROVNANI.map((r, i) => {
              const c = cmp === 0 ? { t: r.akcie, g: r.a } : cmp === 1 ? { t: r.fond, g: r.f } : { t: r.spor, g: r.s };
              return (
                <div className="lp-m-row" key={i}>
                  <div className="lp-m-feat">{r.k}</div>
                  <div className="lp-m-cells">
                    <div className={`lp-m-cell hot ${tag(r.b)}`}><span className="lp-dot" />{r.byt}</div>
                    <div className={`lp-m-cell ${tag(c.g)}`}><span className="lp-dot" />{c.t}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="lp-cmp-note rv">Srovnání je ilustrativní a zjednodušené. Každý nástroj má jiný rizikový profil; investice do nemovitosti není bez rizika a kapitálové zhodnocení není garantováno.</p>
      </section>

      {/* KONTAKT */}
      <section className="lp-sec lp-cta" id="kontakt">
        <div className="lp-cta-inner rv">
          <div className="lp-cta-left">
            <h2>Probereme to nezávazně</h2>
            <p>Necháte kontakt a František Petrouš vám zavolá. Projdeme konkrétní byt, vaše možnosti financování a spočítáme reálný scénář na míru — bez závazku.</p>
            <a href="tel:+420725027957" className="lp-cta-phone">+420 725 027 957</a>
            <div className="lp-cta-points">
              <div>✓ Garantovaný nájemní příjem</div>
              <div>✓ Družstevní vlastnictví — mimo limit ČNB od 4/2026</div>
              <div>✓ All-in správa, žádné starosti</div>
            </div>
          </div>

          <div className="lp-form-wrap">
            {sent ? (
              <div className="lp-form-ok">
                <div className="lp-ok-ic">✓</div>
                <h3>Děkujeme!</h3>
                <p>Ozveme se vám co nejdříve na uvedený kontakt.</p>
              </div>
            ) : (
              <form className="lp-form" onSubmit={submit}>
                <h3>Mám zájem o nezávaznou konzultaci</h3>
                <div className="lp-field">
                  <input placeholder="Jméno a příjmení" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <span className="lp-err">{errors.name}</span>}
                </div>
                <div className="lp-field">
                  <input placeholder="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  {errors.phone && <span className="lp-err">{errors.phone}</span>}
                </div>
                <div className="lp-field">
                  <input placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  {errors.email && <span className="lp-err">{errors.email}</span>}
                </div>
                <textarea placeholder="Zpráva (nepovinné)" rows={2} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <button type="submit" className="lp-form-submit" disabled={loading}>{loading ? "Odesílám…" : "Chci nezávaznou konzultaci"}</button>
                <small className="lp-form-gdpr">Odesláním souhlasíte se zpracováním údajů za účelem kontaktování. Vybraný byt: {byt.label} · {byt.plocha}.</small>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="lp-foot">
        <Link href="/">← Zpět na hlavní stránku investujbezstarosti.cz</Link>
        <span>Předpokládané kapitálové zhodnocení nemovitosti 7 % p.a. není garantováno a je nad rámec garantovaného příjmu z nájmu.</span>
      </footer>
    </div>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.lp *{box-sizing:border-box;margin:0;padding:0;}
.lp{--blue:#366dff;--blue-dark:#1a4fd6;--gold:#d97706;--gold-l:#f59e0b;--bg:#f7f7fb;--text:#0f172a;--text2:#475569;--border:#e2e8f0;
  font-family:'Plus Jakarta Sans',sans-serif;color:var(--text);background:var(--bg);overflow-x:hidden;}
.lp a{text-decoration:none;color:inherit;}

/* TOP */
.lp-top{position:fixed;top:0;left:0;right:0;z-index:100;height:62px;display:flex;align-items:center;justify-content:space-between;padding:0 6%;background:rgba(247,247,251,0.9);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
.lp-logo{font-weight:800;font-size:1.02rem;}
.lp-logo span{color:var(--blue);}
.lp-top-right{display:flex;align-items:center;gap:16px;}
.lp-phone{font-weight:700;font-size:0.9rem;color:var(--text);}
.lp-btn{background:var(--blue);color:#fff;border:none;border-radius:50px;font-family:inherit;font-weight:700;cursor:pointer;transition:all .2s;}
.lp-btn:hover{background:var(--blue-dark);transform:translateY(-1px);box-shadow:0 8px 24px rgba(54,109,255,.35);}
.lp-btn-sm{padding:9px 18px;font-size:0.82rem;}
.lp-btn-lg{padding:15px 30px;font-size:1rem;}
.lp-btn-ghost{background:#fff;color:var(--blue);border:2px solid var(--blue);border-radius:50px;font-family:inherit;font-weight:700;cursor:pointer;transition:all .2s;}
.lp-btn-ghost:hover{background:#eef2ff;transform:translateY(-1px);}

/* HERO */
.lp-hero{position:relative;padding:120px 6% 70px;overflow:hidden;background:linear-gradient(135deg,#f7f7fb 0%,#eef2ff 55%,#f0f7ff 100%);}
.lp-hero-glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:.35;pointer-events:none;}
.lp-hero-glow-1{width:680px;height:680px;background:radial-gradient(circle,#366dff44,transparent);top:-180px;right:-160px;}
.lp-hero-glow-2{width:520px;height:520px;background:radial-gradient(circle,#f59e0b33,transparent);bottom:-120px;left:-60px;}
.lp-hero-inner{position:relative;z-index:2;max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center;}
.lp-hero h1{font-size:clamp(2.1rem,4vw,3.5rem);font-weight:800;line-height:1.08;letter-spacing:-1.5px;margin-bottom:1.3rem;}
.lp-hero h1 .hl{color:var(--blue);}
.lp-hero h1 .hl-gold{color:var(--gold);white-space:nowrap;}
.lp-hero-sub{font-size:1.06rem;line-height:1.6;color:var(--text2);max-width:560px;margin-bottom:1.8rem;}
.lp-hero-sub strong{color:var(--text);}

/* leverage bar */
.lp-bar{background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px;margin-bottom:1.8rem;box-shadow:0 4px 24px rgba(54,109,255,.07);max-width:560px;}
.lp-bar-track{display:flex;height:42px;border-radius:10px;overflow:hidden;}
.lp-bar-vklad{flex:0 0 33%;background:linear-gradient(135deg,var(--blue),var(--blue-dark));display:flex;align-items:center;justify-content:center;color:#fff;font-size:.74rem;font-weight:700;transform-origin:left;animation:lpgrow1 1.1s ease both;}
.lp-bar-hypo{flex:1;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.74rem;font-weight:700;transform-origin:left;animation:lpgrow2 1.1s .5s ease both;}
.lp-bar-vklad span,.lp-bar-hypo span{padding:0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
@keyframes lpgrow1{from{transform:scaleX(0);}to{transform:scaleX(1);}}
@keyframes lpgrow2{from{transform:scaleX(0);opacity:0;}to{transform:scaleX(1);opacity:1;}}
.lp-bar-legend{display:flex;justify-content:space-between;margin-top:12px;}
.lp-bar-legend b{display:block;font-size:1.05rem;font-weight:800;}
.lp-bar-legend small{font-size:.72rem;color:var(--text2);}
.lp-bar-legend .r{text-align:right;}
.lp-bar-legend .r b{color:var(--gold);}

.lp-hero-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:1.2rem;}
.lp-trust{font-size:.82rem;color:var(--text2);font-weight:500;}

/* hero card */
.lp-hero-card{background:#0f172a;color:#fff;border-radius:22px;padding:30px;box-shadow:0 24px 60px rgba(15,23,42,.28);}
.lp-hc-tag{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8;margin-bottom:14px;}
.lp-hc-mult{display:flex;align-items:center;gap:16px;}
.lp-hc-mult-num{font-size:3.4rem;font-weight:800;letter-spacing:-2px;color:#60a5fa;line-height:1;}
.lp-hc-mult-lbl{font-size:.86rem;color:#cbd5e1;line-height:1.35;}
.lp-hero-card hr{border:none;border-top:1px solid rgba(255,255,255,.12);margin:20px 0;}
.lp-hc-row{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:.86rem;color:#cbd5e1;margin-bottom:10px;}
.lp-hc-row b{font-weight:800;color:#fff;white-space:nowrap;}
.lp-hc-row b.gold{color:#fbbf24;}
.lp-hc-row.dim{color:#64748b;}
.lp-hc-note{font-size:.72rem;color:#64748b;line-height:1.5;margin-top:14px;}

/* sections */
.lp-sec{padding:80px 6%;}
.lp-h2{font-size:clamp(1.7rem,3vw,2.4rem);font-weight:800;letter-spacing:-1px;line-height:1.15;margin-bottom:.9rem;}
.lp-sub{font-size:1.02rem;color:var(--text2);line-height:1.6;max-width:680px;}
.lp-demo-head{max-width:1120px;margin:0 auto 44px;text-align:center;}
.lp-demo-head .lp-sub{margin:0 auto;}

/* pillars */
.lp-pillars{background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.lp-pillars-grid{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.lp-pillar{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:30px 26px;transition:transform .25s,box-shadow .25s;}
.lp-pillar:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(54,109,255,.12);}
.lp-pillar-ic{width:48px;height:48px;border-radius:13px;background:#eef2ff;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.lp-pillar h3{font-size:1.18rem;font-weight:800;margin-bottom:10px;}
.lp-pillar p{font-size:.93rem;color:var(--text2);line-height:1.6;}
.lp-pillar p strong{color:var(--text);font-weight:700;}

/* demo */
.lp-demo-grid{max-width:1120px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start;}
.lp-demo-card{background:#fff;border:1px solid var(--border);border-radius:20px;padding:22px;box-shadow:0 4px 24px rgba(54,109,255,.07);}
.lp-byt-pick{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;}
.lp-byt-btn{flex:1 1 84px;padding:11px 6px;border:1px solid var(--border);border-radius:12px;background:var(--bg);cursor:pointer;transition:all .2s;font-family:inherit;text-align:center;}
.lp-byt-btn:hover{border-color:var(--blue);}
.lp-byt-btn.on{border-color:var(--blue);background:#eef2ff;}
.lp-byt-btn .t{display:block;font-size:1.05rem;font-weight:800;}
.lp-byt-btn .s{display:block;font-size:.7rem;color:var(--text2);margin-top:2px;}
.lp-bytcard{border:1px solid var(--border);border-radius:16px;overflow:hidden;}
.lp-bytcard-img{position:relative;width:100%;aspect-ratio:16/10;background:#e2e8f0;}
.lp-bytcard-badge{position:absolute;top:12px;left:12px;background:rgba(15,23,42,.82);color:#fff;font-size:.74rem;font-weight:700;padding:6px 12px;border-radius:50px;backdrop-filter:blur(4px);}
.lp-bytcard-body{padding:18px;}
.lp-bytcard-title{font-size:1.1rem;font-weight:800;}
.lp-bytcard-meta{font-size:.84rem;color:var(--text2);margin-top:3px;}
.lp-bytcard-price{font-size:1.5rem;font-weight:800;color:var(--blue);margin:10px 0 12px;letter-spacing:-1px;}
.lp-bytcard-link{font-size:.86rem;font-weight:700;color:var(--blue);}

.lp-calc{background:#0f172a;color:#fff;border-radius:20px;padding:26px;box-shadow:0 12px 40px rgba(15,23,42,.2);}
.lp-calc-label{font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;}
.lp-calc-big{font-size:2.1rem;font-weight:800;letter-spacing:-1px;margin:4px 0 14px;}
.lp-slider{width:100%;height:6px;border-radius:3px;background:rgba(255,255,255,.15);outline:none;cursor:pointer;-webkit-appearance:none;}
.lp-slider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--blue);cursor:pointer;box-shadow:0 2px 8px rgba(54,109,255,.5);}
.lp-slider::-moz-range-thumb{width:20px;height:20px;border:none;border-radius:50%;background:var(--blue);cursor:pointer;}
.lp-calc-scale{display:flex;justify-content:space-between;font-size:.7rem;color:#64748b;margin-top:6px;}
.lp-calc-inputs{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0;}
.lp-calc-inputs label{font-size:.72rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;}
.lp-inwrap{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:8px 12px;margin-top:6px;}
.lp-inwrap input{width:100%;background:none;border:none;outline:none;color:#fff;font-family:inherit;font-size:1rem;font-weight:700;}
.lp-inwrap span{font-size:.82rem;color:#94a3b8;}
.lp-calc-split{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:14px 0;border-top:1px solid rgba(255,255,255,.1);}
.lp-calc-split small{display:block;font-size:.72rem;color:#94a3b8;}
.lp-calc-split b{font-size:1.05rem;font-weight:800;}
.lp-cf{background:rgba(255,255,255,.05);border-radius:14px;padding:16px;margin-top:6px;}
.lp-cf-label{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#dbeafe;}
.lp-cf-num{font-size:2rem;font-weight:800;letter-spacing:-1px;margin:4px 0 2px;}
.lp-cf-num small{font-size:.9rem;font-weight:600;color:#cbd5e1;}
.lp-cf-eq{font-size:.74rem;color:#94a3b8;}
.lp-zh{margin-top:16px;}
.lp-zh-label{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#fbbf24;}
.lp-zh-label span{color:#64748b;font-weight:600;text-transform:none;letter-spacing:0;}
.lp-graf{width:100%;height:auto;margin-top:12px;display:block;}
.lp-graf-line{stroke-dasharray:1;stroke-dashoffset:1;animation:lpdraw 1.6s .2s ease forwards;}
@keyframes lpdraw{to{stroke-dashoffset:0;}}
.lp-proj{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px;}
.lp-proj-item{background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);border-radius:11px;padding:10px;text-align:center;}
.lp-proj-item small{display:block;font-size:.7rem;color:#fbbf24;}
.lp-proj-item b{font-size:.92rem;font-weight:800;}
.lp-calc-note{font-size:.7rem;color:#64748b;line-height:1.5;margin-top:16px;}

/* srovnání */
.lp-cmp{background:#fff;border-top:1px solid var(--border);}
.lp-table{max-width:1120px;margin:0 auto;border:1px solid var(--border);border-radius:18px;overflow:hidden;}
.lp-tr{display:grid;grid-template-columns:1.4fr 1.2fr 1fr 1.1fr 1fr;border-bottom:1px solid var(--border);}
.lp-tr:last-child{border-bottom:none;}
.lp-thead{background:var(--bg);}
.lp-th,.lp-th-feat{padding:16px 14px;font-size:.84rem;font-weight:800;}
.lp-th{text-align:center;color:var(--text2);}
.lp-th.hot{color:var(--blue);background:#eef2ff;}
.lp-td-feat{padding:15px 16px;font-size:.86rem;font-weight:700;background:var(--bg);display:flex;align-items:center;}
.lp-td{padding:15px 14px;font-size:.82rem;color:var(--text2);display:flex;align-items:center;gap:8px;line-height:1.35;}
.lp-td.hot{background:#f5f8ff;font-weight:600;color:var(--text);}
.lp-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.lp-td.ok .lp-dot{background:#22c55e;}
.lp-td.mid .lp-dot{background:#f59e0b;}
.lp-td.no .lp-dot{background:#cbd5e1;}
.lp-cmp-note{max-width:1120px;margin:18px auto 0;font-size:.76rem;color:var(--text2);text-align:center;}

/* srovnání – mobilní head-to-head (skryté na desktopu) */
.lp-cmp-m{display:none;max-width:560px;margin:0 auto;}
.lp-m-seg{display:flex;gap:6px;background:var(--bg);border:1px solid var(--border);border-radius:13px;padding:5px;margin-bottom:18px;}
.lp-m-seg-btn{flex:1;padding:10px 4px;border:none;border-radius:9px;background:none;font-family:inherit;font-size:.78rem;font-weight:700;color:var(--text2);cursor:pointer;transition:all .2s;}
.lp-m-seg-btn.on{background:#fff;color:var(--blue);box-shadow:0 2px 8px rgba(0,0,0,.1);}
.lp-m-table{border:1px solid var(--border);border-radius:16px;overflow:hidden;background:#fff;}
.lp-m-head{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--border);}
.lp-m-h{padding:12px;font-size:.84rem;font-weight:800;text-align:center;color:var(--text2);background:var(--bg);}
.lp-m-h.hot{color:var(--blue);background:#eef2ff;}
.lp-m-row{border-bottom:1px solid var(--border);}
.lp-m-row:last-child{border-bottom:none;}
.lp-m-feat{padding:10px 12px 5px;font-size:.7rem;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:.04em;}
.lp-m-cells{display:grid;grid-template-columns:1fr 1fr;}
.lp-m-cell{padding:4px 12px 12px;font-size:.8rem;color:var(--text2);display:flex;gap:7px;line-height:1.32;align-items:flex-start;}
.lp-m-cell.hot{color:var(--text);font-weight:600;border-right:1px solid var(--border);}
.lp-m-cell .lp-dot{margin-top:5px;}
.lp-m-cell.ok .lp-dot{background:#22c55e;}
.lp-m-cell.mid .lp-dot{background:#f59e0b;}
.lp-m-cell.no .lp-dot{background:#cbd5e1;}

/* cta */
.lp-cta{background:linear-gradient(135deg,#0f172a,#1e293b);color:#fff;}
.lp-cta-inner{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
.lp-cta-left h2{font-size:clamp(1.7rem,3vw,2.3rem);font-weight:800;letter-spacing:-1px;margin-bottom:1rem;}
.lp-cta-left p{font-size:1rem;color:#cbd5e1;line-height:1.6;margin-bottom:1.4rem;}
.lp-cta-phone{display:inline-block;font-size:1.6rem;font-weight:800;color:#60a5fa;margin-bottom:1.4rem;letter-spacing:-.5px;}
.lp-cta-points{display:flex;flex-direction:column;gap:8px;font-size:.92rem;color:#e2e8f0;}
.lp-form-wrap{background:#fff;border-radius:20px;padding:30px;color:var(--text);box-shadow:0 24px 60px rgba(0,0,0,.3);}
.lp-form h3{font-size:1.15rem;font-weight:800;margin-bottom:18px;}
.lp-field{margin-bottom:12px;}
.lp-form input,.lp-form textarea{width:100%;font-family:inherit;font-size:.92rem;color:var(--text);border:1.5px solid var(--border);border-radius:11px;padding:13px 15px;outline:none;transition:border-color .2s,box-shadow .2s;}
.lp-form textarea{margin-bottom:4px;resize:vertical;}
.lp-form input:focus,.lp-form textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(54,109,255,.12);}
.lp-err{display:block;font-size:.75rem;color:#dc2626;margin-top:4px;}
.lp-form-submit{width:100%;padding:15px;font-size:1rem;font-weight:700;background:var(--blue);color:#fff;border:none;border-radius:12px;font-family:inherit;cursor:pointer;transition:all .2s;margin-top:8px;}
.lp-form-submit:hover{background:var(--blue-dark);}
.lp-form-submit:disabled{opacity:.6;cursor:default;}
.lp-form-gdpr{display:block;font-size:.72rem;color:var(--text2);margin-top:12px;line-height:1.5;}
.lp-form-ok{text-align:center;padding:30px 10px;}
.lp-ok-ic{width:56px;height:56px;border-radius:50%;background:#dcfce7;color:#15803d;font-size:1.8rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
.lp-form-ok h3{font-size:1.3rem;font-weight:800;margin-bottom:8px;}
.lp-form-ok p{color:var(--text2);}

/* footer */
.lp-foot{background:#0b1120;color:#64748b;padding:30px 6%;display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;}
.lp-foot a{color:#94a3b8;font-size:.88rem;font-weight:600;}
.lp-foot span{font-size:.72rem;max-width:680px;line-height:1.5;}

/* reveal */
.rv{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease;}
.rv.on{opacity:1;transform:none;}

/* responsive */
@media(max-width:900px){
  .lp-hero-inner{grid-template-columns:1fr;gap:36px;}
  .lp-demo-grid{grid-template-columns:1fr;}
  .lp-cta-inner{grid-template-columns:1fr;gap:32px;}
  .lp-phone{display:none;}
  /* výhody = horizontální swipe karusel */
  .lp-pillars{padding-top:40px;padding-bottom:40px;}
  .lp-pillars-grid{display:flex;grid-template-columns:none;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding:6px 6% 16px;margin:0 -6%;scrollbar-width:none;}
  .lp-pillars-grid::-webkit-scrollbar{display:none;}
  .lp-pillar{flex:0 0 82%;scroll-snap-align:start;}
}
@media(max-width:760px){
  .lp-sec{padding:56px 5%;}
  .lp-hero{padding:96px 5% 56px;}
  /* srovnání: desktop matice pryč, mobilní head-to-head ven */
  .lp-table{display:none;}
  .lp-cmp-m{display:block;}
}
`;
