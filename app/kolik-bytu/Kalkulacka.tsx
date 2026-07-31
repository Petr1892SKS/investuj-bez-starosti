"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

/* ---------- parametry výpočtu (dle Františka) ---------- */
const PER_FLAT = 8000; // Kč čistého měsíčně z jednoho bytu po horizontu
const HORIZON = 7;     // let, než první byt začne nést
const STEP = 0.25;     // prodleva na každý další byt (roky)

function fmtKc(n: number) {
  return n.toLocaleString("cs-CZ").replace(/ /g, " ") + " Kč";
}
function sklonujByty(n: number) {
  if (n === 1) return "byt";
  if (n < 5) return "byty";
  return "bytů";
}

export default function Kalkulacka() {
  const [cil, setCil] = useState(40000);
  const [vek, setVek] = useState(35);

  const v = useMemo(() => {
    // čím mladší, tím delší splatnost → nižší splátka → vyšší čistý tok
    const bonus = vek <= 35 ? 1.1 : vek <= 45 ? 1.0 : 0.88;
    const perFlat = Math.round((PER_FLAT * bonus) / 500) * 500;
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
          <Link className="btn" href="/#kontakt">
            Chci vědět, jak na to →
          </Link>
        </div>

        <p className="disc">
          Orientační propočet: přibližně 8 000 Kč čistého měsíčně z jednoho bytu po zhruba
          sedmi letech (při využití prodloužení fixace a splatnosti). Skutečný výsledek
          závisí na lokalitě, ceně, financování a obsazenosti. Investice do nemovitostí
          nese rizika, minulé výnosy nezaručují budoucí.
        </p>
      </div>

      <style>{styles}</style>
    </main>
  );
}

const styles = `
.kalk{background:#f5f5f7;color:#1d1d1f;min-height:100vh;padding:40px 20px 80px;
  -webkit-font-smoothing:antialiased}
.kalk *{box-sizing:border-box}
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
@media(max-width:640px){
  .kalk h1{font-size:38px}
  .kalk .sub{font-size:18px}
  .kalk .big{font-size:62px}
  .kalk .grid{grid-template-columns:1fr}
}
`;
