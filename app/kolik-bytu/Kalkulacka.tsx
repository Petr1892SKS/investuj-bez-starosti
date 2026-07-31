"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ---------- parametry výpočtu (dle Františka) ---------- */
const PER_FLAT = 8800;  // Kč čistého měsíčně z jednoho bytu do BASE_AGE let věku
const BASE_AGE = 35;    // do tohoto věku lze využít plnou splatnost úvěru
const DECAY = 0.88;     // o kolik klesne čistý tok...
const DECAY_YEARS = 2;  // ...za každé dva roky věku nad BASE_AGE
const HORIZON = 7;      // let, než první byt začne nést
const STEP = 0.25;      // prodleva na každý další byt (roky)

function fmtKc(n: number) {
  return n.toLocaleString("cs-CZ").replace(/ /g, " ") + " Kč";
}
function sklonujByty(n: number) {
  if (n === 1) return "byt";
  if (n < 5) return "byty";
  return "bytů";
}

/* ---------- aktuální nabídka (důkaz, že byty reálně existují) ---------- */
const BYTY = [
  {
    name: "Byt 1+1 · 41 m²",
    loc: "Duchcov – Osecká",
    price: "2 190 000 Kč",
    income: "9 490 Kč / měs.",
    yield: "5,20 % p.a.",
    slug: "duchcov-osecka-1-1",
    thumb: "/images/duchcov-osecka-1-1/IMG_9339.jpeg",
  },
  {
    name: "Byt 3+1 · 82,3 m²",
    loc: "Bílina – Alšova",
    price: "2 850 000 Kč",
    income: "12 974 Kč / měs.",
    yield: "5,46 % p.a.",
    slug: "alsova-bilina-bez-zadveri",
    thumb: "/images/alsova-bilina-3-1-bez-zadveri/IMG_6878.jpeg",
  },
];

export default function Kalkulacka() {
  const [cil, setCil] = useState(40000);
  const [vek, setVek] = useState(35);

  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", gdpr: false });
  const [err, setErr] = useState<Record<string, string>>({});
  const [stav, setStav] = useState<"idle" | "odesila" | "hotovo" | "chyba">("idle");

  function naFormular(e: React.MouseEvent) {
    e.preventDefault();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function odeslat(e: React.FormEvent) {
    e.preventDefault();
    const chyby: Record<string, string> = {};
    if (!form.name.trim()) chyby.name = "Vyplňte prosím jméno.";
    if (!/^[+\d][\d\s]{7,}$/.test(form.phone.trim())) chyby.phone = "Zadejte prosím platné telefonní číslo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      chyby.email = "Zadejte prosím e-mail — bez něj vás nemáme jak zavést do systému.";
    if (!form.gdpr) chyby.gdpr = "Bez souhlasu vás bohužel nemůžeme kontaktovat.";
    setErr(chyby);
    if (Object.keys(chyby).length) return;

    setStav("odesila");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          // stejné hodnoty jako select ve formuláři na hlavní stránce,
          // ať se v Make.com nerozbije mapování
          interest: v.pocet === 1 ? "1" : "vice",
          zdroj: "kalkulacka-kolik-bytu",
          // jen to, co není v číselných polích níž — ať se vejde do buňky
          kontext: `za ${v.roky} let · ve věku ${v.kdy}`,
          // totéž po jednotlivých polích, ať jde v Make mapovat do sloupců
          cil,
          vek,
          pocet_bytu: v.pocet,
          horizont_let: v.roky,
        }),
      });
      setStav(r.ok ? "hotovo" : "chyba");
    } catch {
      setStav("chyba");
    }
  }

  const v = useMemo(() => {
    // Čím starší, tím kratší dostupná splatnost úvěru → vyšší splátka → nižší
    // čistý tok z bytu. Nad 35 let proto tok klesá o 12 % za každé dva roky.
    const factor = Math.pow(DECAY, Math.max(0, vek - BASE_AGE) / DECAY_YEARS);
    const perFlat = Math.max(500, Math.round((PER_FLAT * factor) / 50) * 50);
    const pocet = Math.max(1, Math.ceil(cil / perFlat));
    const roky = Math.round(HORIZON + Math.max(0, pocet - 1) * STEP);
    return { perFlat, pocet, roky, mesicne: pocet * perFlat, kdy: vek + roky };
  }, [cil, vek]);

  return (
    <main className="kalk">
      <div className="wrap">
        <Link href="/" className="brand">
          <b>investujbezstarosti</b>
          <span className="cz">.cz</span>
        </Link>

        <h1>
          Kolik bytů
          <br />= <span className="b">vaše výplata</span>?
        </h1>
        <p className="sub">
          Nastavte dvě čísla a zjistěte, kolik nájemních bytů potřebujete — a kdy vám
          příjem naskočí.
        </p>

        <div className="card">
          <div className="q">Kolik chcete měsíčně navíc?</div>
          <div className="hint">Částka, se kterou byste mohli přestat řešit výplatu.</div>
          <div className="val">{fmtKc(cil)}</div>
          <input
            type="range"
            min={8000}
            max={120000}
            step={4000}
            value={cil}
            onChange={(e) => setCil(+e.target.value)}
            aria-label="Cílový měsíční příjem"
          />
          <div className="ends">
            <span>8 000 Kč</span>
            <span>120 000 Kč</span>
          </div>
        </div>

        <div className="card">
          <div className="q">Kolik vám je let?</div>
          <div className="hint">Čím dřív začnete, tím delší splatnost — a tím nižší splátka.</div>
          <div className="val">{vek} let</div>
          <input
            type="range"
            min={25}
            max={60}
            step={1}
            value={vek}
            onChange={(e) => setVek(+e.target.value)}
            aria-label="Věk"
          />
          <div className="ends">
            <span>25</span>
            <span>60</span>
          </div>
        </div>

        <div className="res">
          <div className="lbl">Vaše číslo</div>
          <div className="big">
            {v.pocet} <small>{sklonujByty(v.pocet)}</small>
          </div>

          <div className="flats">
            {Array.from({ length: Math.min(v.pocet, 14) }).map((_, i) => (
              <div className="flat on" key={i}>
                🏠
              </div>
            ))}
            {v.pocet > 14 && <div className="flat">+{v.pocet - 14}</div>}
          </div>

          <p className="resline">
            Při <b>{fmtKc(v.perFlat)}</b> čistého měsíčně z jednoho bytu potřebujete{" "}
            <b>
              {v.pocet} {sklonujByty(v.pocet)}
            </b>
            . Naskakovat vám to začne zhruba <b>za {v.roky} let</b>.
          </p>

          <div className="grid">
            <div className="mini">
              <div className="k">Bude vám</div>
              <div className="v">{v.kdy} let</div>
            </div>
            <div className="mini">
              <div className="k">Měsíčně pak</div>
              <div className="v">{fmtKc(v.mesicne)}</div>
            </div>
          </div>
        </div>

        <div className="cta">
          <a className="btn" href="#konzultace" onClick={naFormular}>
            Chci vědět, jak na to →
          </a>
        </div>

        {/* ---------- formulář ---------- */}
        <div className="form-box" id="konzultace" ref={formRef}>
          {stav === "hotovo" ? (
            <div className="done">
              <div className="done-ico">✓</div>
              <h2>Máme to. Ozveme se vám.</h2>
              <p>
                Obvykle voláme do jednoho pracovního dne. Projdeme spolu vaše číslo —{" "}
                <b>
                  {v.pocet} {sklonujByty(v.pocet)}
                </b>{" "}
                — a co by pro vás reálně znamenalo první z nich.
              </p>
              <Link className="done-link" href="/">
                Zatím se podívejte na aktuální nabídku →
              </Link>
            </div>
          ) : (
            <>
              <h2>Projdeme to s vámi</h2>
              <p className="form-sub">
                Nezávazně a bez prezentací. Řekneme vám, jak se k prvnímu bytu dostat
                a co to obnáší — ať už se nakonec rozhodnete jakkoli.
              </p>

              <form onSubmit={odeslat} noValidate>
                <label className="fl">
                  Jméno a příjmení
                  <input
                    className="fi"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Jan Novák"
                    autoComplete="name"
                  />
                  {err.name && <span className="fe">{err.name}</span>}
                </label>

                <label className="fl">
                  Telefon
                  <input
                    className="fi"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    placeholder="+420 777 000 000"
                    autoComplete="tel"
                  />
                  {err.phone && <span className="fe">{err.phone}</span>}
                </label>

                <label className="fl">
                  E-mail
                  <input
                    className="fi"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    placeholder="jan@email.cz"
                    autoComplete="email"
                  />
                  {err.email && <span className="fe">{err.email}</span>}
                </label>

                <label className="fc">
                  <input
                    type="checkbox"
                    checked={form.gdpr}
                    onChange={(e) => setForm((s) => ({ ...s, gdpr: e.target.checked }))}
                  />
                  <span>
                    Souhlasím se zpracováním osobních údajů v souladu s{" "}
                    <Link href="/pravni-dokumenty">GDPR</Link>.
                  </span>
                </label>
                {err.gdpr && <span className="fe">{err.gdpr}</span>}

                <button className="fbtn" type="submit" disabled={stav === "odesila"}>
                  {stav === "odesila" ? "Odesílám…" : "Chci se poradit"}
                </button>

                {stav === "chyba" && (
                  <p className="fe center">
                    Odeslání se nepovedlo. Zkuste to prosím znovu, nebo volejte{" "}
                    <a href="tel:+420725027957">+420 725 027 957</a>.
                  </p>
                )}

                <p className="fnote">
                  Voláme jednou. Když to nebude pro vás, tím to končí.
                </p>
              </form>
            </>
          )}
        </div>

        {/* ---------- důkaz: konkrétní byty ---------- */}
        <section className="proof">
          <h2>Byty, o kterých se bavíme</h2>
          <p className="proof-sub">
            Nejsou to modely v tabulce. Tohle je část aktuální nabídky — konkrétní
            jednotky se smluvně stanoveným nájemním příjmem.
          </p>

          <div className="byty">
            {BYTY.map((b) => (
              <Link className="byt" key={b.slug} href={`/projekty/${b.slug}`}>
                <Image
                  src={b.thumb}
                  alt={`${b.name}, ${b.loc}`}
                  width={420}
                  height={220}
                  className="byt-img"
                />
                <div className="byt-body">
                  <div className="byt-loc">{b.loc}</div>
                  <div className="byt-name">{b.name}</div>
                  <div className="byt-rows">
                    <div>
                      <span>Cena</span>
                      <b>{b.price}</b>
                    </div>
                    <div>
                      <span>Nájemní příjem</span>
                      <b>{b.income}</b>
                    </div>
                    <div>
                      <span>Garantovaný výnos</span>
                      <b className="acc">{b.yield}</b>
                    </div>
                  </div>
                  <span className="byt-more">Detail bytu →</span>
                </div>
              </Link>
            ))}
          </div>

          <Link className="proof-all" href="/">
            Zobrazit celou nabídku →
          </Link>
        </section>

        {/* ---------- důkaz: kdo za tím stojí ---------- */}
        <section className="kdo">
          <Image
            src="/images/team/frantisek-petrous.jpg"
            alt="Ing. František Petrouš"
            width={96}
            height={96}
            className="kdo-foto"
          />
          <div>
            <div className="kdo-jmeno">Ing. František Petrouš</div>
            <div className="kdo-role">spoluzakladatel</div>
            <p className="kdo-text">
              V oboru od roku 2014. Sám vlastní portfolio 81 nemovitostí v hodnotě
              285 milionů korun — tentýž model, o kterém je tahle kalkulačka.
              Byty vybírá, kupuje a spravuje stejně pro sebe i pro klienty.
            </p>
          </div>
        </section>

        <p className="disc">
          Orientační propočet: přibližně 8 800 Kč čistého měsíčně z jednoho bytu po zhruba
          sedmi letech, pokud vstupujete do 35 let věku a využijete plnou splatnost úvěru.
          S vyšším věkem se dostupná splatnost zkracuje, splátka roste a čistý výnos z bytu
          klesá — proto je potřeba bytů více. Skutečný výsledek závisí na lokalitě, ceně,
          financování a obsazenosti. Investice do nemovitostí nese rizika, minulé výnosy
          nezaručují budoucí.
        </p>
      </div>

      <style>{styles}</style>
    </main>
  );
}

const styles = `
.kalk{background:#f5f5f7;color:#1d1d1f;min-height:100vh;padding:40px 20px 80px;
  -webkit-font-smoothing:antialiased;overflow-x:hidden}
.kalk *{box-sizing:border-box;min-width:0}
.kalk img{max-width:100%}
.kalk .wrap{max-width:760px;margin:0 auto}
.kalk .brand{display:inline-block;font-size:17px;font-weight:600;color:#6e6e73;
  margin-bottom:28px;text-decoration:none}
.kalk .brand b{color:#1d1d1f;font-weight:700}
.kalk .brand .cz{color:#3f6fff}
.kalk h1{font-size:52px;font-weight:700;letter-spacing:-.035em;line-height:1.03;margin:0 0 14px}
.kalk h1 .b{color:#3f6fff}
.kalk .sub{font-size:21px;font-weight:500;color:#6e6e73;letter-spacing:-.02em;
  margin:0 0 36px;line-height:1.35}
.kalk .card{background:#fff;border-radius:26px;padding:30px 28px;
  box-shadow:0 10px 36px rgba(20,26,44,.07);margin-bottom:18px}
.kalk .q{font-size:19px;font-weight:600;letter-spacing:-.01em;margin-bottom:6px}
.kalk .hint{font-size:14.5px;color:#6e6e73;margin-bottom:16px}
.kalk .val{font-size:42px;font-weight:700;letter-spacing:-.03em;color:#3f6fff;margin-bottom:6px}
.kalk input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:6px;
  border-radius:6px;background:#e6e9f0;outline:none;margin:10px 0 4px}
.kalk input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:30px;height:30px;
  border-radius:50%;background:#fff;border:1px solid #d8dbe3;
  box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer}
.kalk input[type=range]::-moz-range-thumb{width:28px;height:28px;border-radius:50%;
  background:#fff;border:1px solid #d8dbe3;box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer}
.kalk .ends{display:flex;justify-content:space-between;font-size:13px;color:#6e6e73}
.kalk .res{background:linear-gradient(135deg,#0e1626,#22325c);color:#fff;border-radius:26px;
  padding:34px 30px;margin-top:26px}
.kalk .res .lbl{font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9fb4ff}
.kalk .big{font-size:82px;font-weight:700;letter-spacing:-.04em;line-height:1;margin:8px 0 4px}
.kalk .big small{font-size:30px;font-weight:600;color:#b9c4dd;letter-spacing:-.02em}
.kalk .resline{font-size:18px;color:#cdd7ec;margin:12px 0 0;line-height:1.5}
.kalk .resline b{color:#fff}
.kalk .flats{display:flex;flex-wrap:wrap;gap:9px;margin:22px 0 4px}
.kalk .flat{width:42px;height:42px;border-radius:11px;background:rgba(255,255,255,.14);
  display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:700}
.kalk .flat.on{background:#e3a63a}
.kalk .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}
.kalk .mini{background:rgba(255,255,255,.09);border-radius:16px;padding:16px 18px}
.kalk .mini .k{font-size:13px;color:#9fb4ff;font-weight:700;text-transform:uppercase;letter-spacing:.05em}
.kalk .mini .v{font-size:26px;font-weight:700;margin-top:4px}
.kalk .cta{margin-top:26px;display:flex;justify-content:center}
.kalk .btn{background:#1d1d1f;color:#fff;font-size:20px;font-weight:600;letter-spacing:-.01em;
  padding:20px 44px;border-radius:100px;text-decoration:none;display:inline-block}
.kalk .disc{font-size:13px;color:#6e6e73;text-align:center;margin:20px auto 0;line-height:1.55;max-width:620px}

/* ---- formulář ---- */
.kalk .form-box{background:#fff;border-radius:26px;padding:34px 30px;margin-top:26px;
  box-shadow:0 10px 36px rgba(20,26,44,.07);scroll-margin-top:20px}
.kalk .form-box h2{font-size:30px;font-weight:700;letter-spacing:-.03em;margin:0 0 8px}
.kalk .form-sub{font-size:16.5px;color:#6e6e73;line-height:1.5;margin:0 0 24px;max-width:52ch}
.kalk .fl{display:block;font-size:14.5px;font-weight:600;color:#1d1d1f;margin-bottom:16px}
.kalk .opt{font-weight:500;color:#8e8e93}
.kalk .fi{display:block;width:100%;margin-top:7px;padding:15px 16px;font:inherit;font-size:17px;
  background:#f5f5f7;border:1px solid #e3e3e8;border-radius:14px;outline:none;
  transition:border-color .15s,background .15s}
.kalk .fi:focus{border-color:#3f6fff;background:#fff}
.kalk .fe{display:block;font-size:13.5px;font-weight:500;color:#c0392b;margin-top:6px}
.kalk .fe.center{text-align:center;margin-top:14px}
.kalk .fe a{color:#c0392b;font-weight:700}
.kalk .fc{display:flex;gap:11px;align-items:flex-start;font-size:14px;color:#6e6e73;
  line-height:1.5;margin:4px 0 6px}
.kalk .fc input{width:20px;height:20px;margin:1px 0 0;flex-shrink:0;accent-color:#3f6fff}
.kalk .fc a{color:#3f6fff}
.kalk .fbtn{width:100%;margin-top:18px;padding:19px 24px;font:inherit;font-size:19px;
  font-weight:600;letter-spacing:-.01em;color:#fff;background:#1d1d1f;border:none;
  border-radius:100px;cursor:pointer;transition:opacity .15s}
.kalk .fbtn:hover{opacity:.86}
.kalk .fbtn:disabled{opacity:.5;cursor:default}
.kalk .fnote{font-size:13px;color:#8e8e93;text-align:center;margin:14px 0 0}
.kalk .done{text-align:center;padding:10px 0}
.kalk .done-ico{width:56px;height:56px;margin:0 auto 16px;border-radius:50%;background:#e8f5ec;
  color:#1d8a4e;font-size:28px;font-weight:700;display:flex;align-items:center;justify-content:center}
.kalk .done h2{margin-bottom:10px}
.kalk .done p{font-size:16.5px;color:#6e6e73;line-height:1.55;margin:0 auto;max-width:46ch}
.kalk .done b{color:#1d1d1f}
.kalk .done-link{display:inline-block;margin-top:18px;font-size:16px;font-weight:600;color:#3f6fff;
  text-decoration:none}

/* ---- důkaz: byty ---- */
.kalk .proof{margin-top:46px}
.kalk .proof h2{font-size:30px;font-weight:700;letter-spacing:-.03em;margin:0 0 8px}
.kalk .proof-sub{font-size:16.5px;color:#6e6e73;line-height:1.5;margin:0 0 22px;max-width:56ch}
.kalk .byty{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.kalk .byt{background:#fff;border-radius:22px;overflow:hidden;text-decoration:none;color:inherit;
  display:flex;flex-direction:column;box-shadow:0 8px 28px rgba(20,26,44,.07);
  transition:transform .18s,box-shadow .18s}
.kalk .byt:hover{transform:translateY(-3px);box-shadow:0 14px 38px rgba(20,26,44,.12)}
.kalk .byt-img{width:100%;height:172px;object-fit:cover;display:block}
.kalk .byt-body{padding:20px 20px 22px;display:flex;flex-direction:column;flex:1}
.kalk .byt-loc{font-size:12.5px;font-weight:700;color:#8e8e93;text-transform:uppercase;
  letter-spacing:.07em}
.kalk .byt-name{font-size:20px;font-weight:700;letter-spacing:-.02em;margin:4px 0 14px}
.kalk .byt-rows{border-top:1px solid #ececf0}
.kalk .byt-rows>div{display:flex;justify-content:space-between;align-items:baseline;gap:12px;
  padding:9px 0;border-bottom:1px solid #ececf0;font-size:14.5px}
.kalk .byt-rows span{color:#6e6e73}
.kalk .byt-rows b{font-weight:700;white-space:nowrap}
.kalk .byt-rows b.acc{color:#3f6fff}
.kalk .byt-more{margin-top:auto;padding-top:16px;font-size:15px;font-weight:600;color:#3f6fff}
.kalk .proof-all{display:inline-block;margin-top:20px;font-size:16px;font-weight:600;
  color:#3f6fff;text-decoration:none}

/* ---- důkaz: kdo za tím stojí ---- */
.kalk .kdo{display:flex;gap:20px;align-items:flex-start;background:#fff;border-radius:22px;
  padding:26px 28px;margin-top:26px;box-shadow:0 8px 28px rgba(20,26,44,.06)}
.kalk .kdo-foto{width:88px;height:88px;border-radius:50%;object-fit:cover;flex-shrink:0}
.kalk .kdo-jmeno{font-size:19px;font-weight:700;letter-spacing:-.02em}
.kalk .kdo-role{font-size:13.5px;color:#8e8e93;font-weight:600;margin-top:1px}
.kalk .kdo-text{font-size:15.5px;color:#6e6e73;line-height:1.6;margin:11px 0 0}

@media(max-width:640px){
  .kalk h1{font-size:38px}
  .kalk .sub{font-size:18px}
  .kalk .big{font-size:62px}
  .kalk .grid{grid-template-columns:1fr}
  .kalk .byty{grid-template-columns:1fr}
  .kalk .form-box{padding:28px 22px}
  .kalk .form-box h2,.kalk .proof h2{font-size:26px}
  .kalk .kdo{flex-direction:column;gap:14px;align-items:center;text-align:center}
  .kalk .kdo-text{text-align:left}
}
`;
