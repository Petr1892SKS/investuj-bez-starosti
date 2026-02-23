"use client";
import { useState } from "react";
import Link from "next/link";

// ============================================================
// UPRAVUJ POUZE TUTO SEKCI – DATA PROJEKTU
// ============================================================
const project = {
  name: "Projekt Vinohrady",
  subtitle: "Byt 2+kk · Praha 2 – Vinohrady",
  claim: "Stabilní nájemní výnos s kompletní správou bez starostí.",
  status: "Obsazený", // "Obsazený" | "Připravený"

  // Investiční parametry
  price: 4800000,
  monthlyIncome: 20000,
  yearlyIncome: 240000,
  yieldPercent: 5,
  growthPercent: 3,
  ownershipType: "Osobní vlastnictví",
  condition: "Po rekonstrukci",
  holdingPeriod: "5–10 let",
  area: 52,
  floor: "3. patro / 6",
  yearBuilt: 1935,

  // Proč tento projekt – max 5 bodů
  reasons: [
    { title: "Stabilní lokalita", text: "Vinohrady patří dlouhodobě k nejžádanějším pražským čtvrtím s nízkou prázdnotou." },
    { title: "Ověřený nájemní trh", text: "Lokalita s trvale vysokou poptávkou po nájemním bydlení." },
    { title: "Optimalizovaná dispozice", text: "Dispozice 2+kk odpovídá nejpoptávanějšímu segmentu nájemního trhu." },
    { title: "Provozní historie", text: "Nemovitost pochází z existujícího portfolia s ověřenou provozní historií." },
    { title: "Nízké náklady", text: "Po kompletní rekonstrukci bez investičních závazků v krátkém horizontu." },
  ],

  // Galerie – nahraď src cestami k reálným fotkám v /public/
  gallery: [
    { src: "/images/vinohrady/obyvaci.jpg", label: "Obývací prostor" },
    { src: "/images/vinohrady/loznice.jpg", label: "Ložnice" },
    { src: "/images/vinohrady/kuchyn.jpg", label: "Kuchyňský kout" },
    { src: "/images/vinohrady/koupelna.jpg", label: "Koupelna" },
    { src: "/images/vinohrady/dispozice.jpg", label: "Dispozice" },
    { src: "/images/vinohrady/lokalita.jpg", label: "Lokalita" },
  ],
};
// ============================================================

function fmt(n: number) {
  return n.toLocaleString("cs-CZ");
}

export default function ProjectDetail() {
  const [activePhoto, setActivePhoto] = useState(0);
  const growthAmount = Math.round(project.price * (project.growthPercent / 100));

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --blue: #366DFF;
          --blue-light: #EEF2FF;
          --text: #0f172a;
          --text2: #64748b;
          --border: #e2e8f0;
          --bg: #f8fafc;
          --gold: #d97706;
          --gold-light: #fefce8;
          --green: #16a34a;
          --green-light: #dcfce7;
          --radius: 16px;
          --section: 80px;
        }
        body { font-family: "Plus Jakarta Sans", sans-serif; color: var(--text); background: white; }

        /* NAV */
        .nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; max-width: 100%; }
        .nav-logo { font-weight: 800; font-size: 1rem; color: var(--text); text-decoration: none; }
        .nav-logo span { color: var(--blue); }
        .nav-back { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text2); font-weight: 600; text-decoration: none; transition: color 0.2s; }
        .nav-back:hover { color: var(--blue); }
        .nav-cta { background: var(--blue); color: white; border: none; border-radius: 50px; padding: 9px 20px; font-family: inherit; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .nav-cta:hover { opacity: 0.88; }

        /* HERO */
        .hero { background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%); padding: 60px 24px 50px; }
        .hero-inner { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 380px; gap: 60px; align-items: start; }
        .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: white; border: 1px solid var(--border); border-radius: 50px; padding: 5px 14px; font-size: 0.75rem; font-weight: 700; color: var(--text2); margin-bottom: 20px; }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }
        .hero-title { font-size: 2.4rem; font-weight: 800; letter-spacing: -1.5px; line-height: 1.15; margin-bottom: 10px; }
        .hero-subtitle { font-size: 1rem; color: var(--text2); margin-bottom: 6px; font-weight: 500; }
        .hero-claim { font-size: 0.9rem; color: var(--text2); line-height: 1.6; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }

        /* HERO CARD */
        .hero-card { background: white; border-radius: 24px; padding: 28px; box-shadow: 0 4px 40px rgba(0,0,0,0.08); border: 1px solid var(--border); }
        .hero-card-label { font-size: 0.68rem; font-weight: 700; color: var(--text2); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
        .income-block { background: var(--blue-light); border-radius: 14px; padding: 18px 20px; margin-bottom: 10px; }
        .income-tag { font-size: 0.68rem; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
        .income-amount { font-size: 2.2rem; font-weight: 800; color: var(--blue); letter-spacing: -1.5px; line-height: 1; }
        .income-sub { font-size: 0.73rem; color: var(--text2); margin-top: 4px; }
        .growth-block { background: var(--gold-light); border: 1px solid rgba(217,119,6,0.15); border-radius: 14px; padding: 16px 20px; margin-bottom: 16px; }
        .growth-tag { font-size: 0.68rem; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
        .growth-amount { font-size: 1.6rem; font-weight: 800; color: var(--gold); letter-spacing: -1px; line-height: 1; }
        .growth-sub { font-size: 0.7rem; color: #92400e; margin-top: 4px; }
        .hero-card-price { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-top: 1px solid var(--border); font-size: 0.85rem; }
        .hero-card-price-label { color: var(--text2); font-weight: 500; }
        .hero-card-price-value { font-weight: 800; color: var(--text); }
        .btn-primary { width: 100%; padding: 14px; background: var(--blue); color: white; border: none; border-radius: 12px; font-family: inherit; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; margin-top: 14px; }
        .btn-primary:hover { opacity: 0.88; }
        .hero-card-note { font-size: 0.7rem; color: var(--text2); text-align: center; margin-top: 10px; line-height: 1.5; }

        /* SECTION */
        .section { padding: var(--section) 24px; }
        .section-inner { max-width: 1080px; margin: 0 auto; }
        .section-label { font-size: 0.72rem; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
        .section-title { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.8px; margin-bottom: 12px; }
        .section-sub { font-size: 0.9rem; color: var(--text2); line-height: 1.65; max-width: 560px; }

        /* GALLERY */
        .gallery-section { background: var(--bg); }
        .gallery-main { width: 100%; aspect-ratio: 16/9; border-radius: 20px; overflow: hidden; background: #e2e8f0; position: relative; margin-bottom: 12px; }
        .gallery-main img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-main-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px; color: var(--text2); }
        .gallery-label { position: absolute; bottom: 16px; left: 16px; background: rgba(0,0,0,0.55); color: white; font-size: 0.75rem; font-weight: 600; padding: 5px 12px; border-radius: 50px; backdrop-filter: blur(4px); }
        .gallery-thumbs { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
        .gallery-thumb { aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #e2e8f0; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s; }
        .gallery-thumb.active { border-color: var(--blue); }
        .gallery-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-thumb-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: var(--text2); font-weight: 600; text-align: center; padding: 4px; }

        /* PARAMS TABLE */
        .params-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-top: 28px; }
        .param-row { display: contents; }
        .param-cell { padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; flex-direction: column; gap: 3px; }
        .param-cell:nth-child(odd) { border-right: 1px solid var(--border); background: white; }
        .param-cell:nth-child(even) { background: var(--bg); }
        .param-cell:nth-last-child(-n+2) { border-bottom: none; }
        .param-label { font-size: 0.72rem; color: var(--text2); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .param-value { font-size: 1rem; font-weight: 800; color: var(--text); }
        .param-value.blue { color: var(--blue); }
        .param-value.gold { color: var(--gold); }
        .param-note { font-size: 0.68rem; color: var(--text2); }
        .params-divider { grid-column: 1 / -1; padding: 10px 20px; background: #f1f5f9; border-bottom: 1px solid var(--border); font-size: 0.72rem; font-weight: 700; color: var(--text2); text-transform: uppercase; letter-spacing: 0.08em; display: flex; align-items: center; gap: 8px; }

        /* REASONS */
        .reasons-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 28px; }
        .reason-card { padding: 20px 22px; border: 1.5px solid var(--border); border-radius: 14px; background: white; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .reason-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(54,109,255,0.1); border-color: rgba(54,109,255,0.2); }
        .reason-icon { width: 32px; height: 32px; background: var(--blue-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
        .reason-title { font-size: 0.9rem; font-weight: 800; margin-bottom: 5px; }
        .reason-text { font-size: 0.82rem; color: var(--text2); line-height: 1.6; }

        /* PROCESS */
        .process-section { background: var(--bg); }
        .process-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 36px; position: relative; }
        .process-steps::before { content: ""; position: absolute; top: 20px; left: 10%; right: 10%; height: 1px; background: var(--border); z-index: 0; }
        .process-step { text-align: center; padding: 0 16px; position: relative; z-index: 1; }
        .process-num { width: 40px; height: 40px; background: white; border: 2px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; color: var(--text2); margin: 0 auto 14px; }
        .process-step.highlight .process-num { background: var(--blue); border-color: var(--blue); color: white; box-shadow: 0 4px 14px rgba(54,109,255,0.35); }
        .process-step-title { font-size: 0.88rem; font-weight: 800; margin-bottom: 6px; }
        .process-step-text { font-size: 0.78rem; color: var(--text2); line-height: 1.6; }

        /* YIELD MODEL */
        .yield-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 28px; }
        .yield-card { border-radius: 20px; padding: 28px; }
        .yield-card.blue { background: var(--blue-light); border: 1px solid rgba(54,109,255,0.15); }
        .yield-card.gold { background: var(--gold-light); border: 1px solid rgba(217,119,6,0.15); }
        .yield-tag { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
        .yield-tag.blue { color: var(--blue); }
        .yield-tag.gold { color: var(--gold); }
        .yield-amount { font-size: 2.4rem; font-weight: 800; letter-spacing: -1.5px; line-height: 1; margin-bottom: 6px; }
        .yield-amount.blue { color: var(--blue); }
        .yield-amount.gold { color: var(--gold); }
        .yield-desc { font-size: 0.82rem; line-height: 1.6; }
        .yield-desc.blue { color: #1e40af; }
        .yield-desc.gold { color: #92400e; }
        .yield-disclaimer { margin-top: 14px; background: #f1f5f9; border-radius: 12px; padding: 14px 16px; font-size: 0.75rem; color: var(--text2); line-height: 1.6; }

        /* CTA */
        .cta-section { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; text-align: center; padding: 80px 24px; }
        .cta-title { font-size: 2rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 14px; }
        .cta-sub { font-size: 0.95rem; color: #94a3b8; margin-bottom: 32px; line-height: 1.6; max-width: 500px; margin-left: auto; margin-right: auto; }
        .cta-btn { display: inline-block; background: var(--blue); color: white; border: none; border-radius: 50px; padding: 15px 36px; font-family: inherit; font-size: 1rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .cta-btn:hover { opacity: 0.88; }
        .cta-note { font-size: 0.78rem; color: #64748b; margin-top: 14px; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 32px; }
          .params-grid { grid-template-columns: 1fr; }
          .param-cell:nth-child(odd) { border-right: none; }
          .param-cell:nth-last-child(-n+2) { border-bottom: 1px solid var(--border); }
          .param-cell:last-child { border-bottom: none; }
          .reasons-grid { grid-template-columns: 1fr; }
          .process-steps { grid-template-columns: 1fr 1fr; gap: 20px; }
          .process-steps::before { display: none; }
          .yield-grid { grid-template-columns: 1fr; }
          .gallery-thumbs { grid-template-columns: repeat(3, 1fr); }
          .hero-title { font-size: 1.8rem; }
        }
        @media (max-width: 600px) {
          .process-steps { grid-template-columns: 1fr; }
          .cta-title { font-size: 1.5rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Zpět na projekty
        </Link>
        <a href="/" className="nav-logo">investuj<span>bezstarosti</span>.cz</a>
        <button className="nav-cta" onClick={() => document.getElementById("cta")?.scrollIntoView({behavior:"smooth"})}>Nezávazná konzultace</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <span className="status-dot"/>
              {project.status}
            </div>
            <h1 className="hero-title">{project.name}</h1>
            <p className="hero-subtitle">{project.subtitle}</p>
            <p className="hero-claim">{project.claim}</p>
          </div>

          <div className="hero-card">
            <div className="hero-card-label">Investiční přehled</div>

            <div className="income-block">
              <div className="income-tag">Garantovaný měsíční příjem</div>
              <div className="income-amount">{fmt(project.monthlyIncome)} Kč</div>
              <div className="income-sub">vypláceno každý měsíc · {fmt(project.yearlyIncome)} Kč ročně</div>
            </div>

            <div className="growth-block">
              <div className="growth-tag">Možné kapitálové zhodnocení</div>
              <div className="growth-amount">+{fmt(growthAmount)} Kč</div>
              <div className="growth-sub">ročně · konzervativní scénář {project.growthPercent} % p.a. · realizuje se při prodeji</div>
            </div>

            <div className="hero-card-price">
              <span className="hero-card-price-label">Kupní cena nemovitosti</span>
              <span className="hero-card-price-value">{fmt(project.price)} Kč</span>
            </div>

            <button className="btn-primary" onClick={() => document.getElementById("cta")?.scrollIntoView({behavior:"smooth"})}>
              Nezávazná konzultace →
            </button>
            <p className="hero-card-note">Podmínky jsou vždy sjednány individuálně smluvně.</p>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="section gallery-section">
        <div className="section-inner">
          <div className="section-label">Fotodokumentace</div>
          <div className="gallery-main">
            <div className="gallery-main-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
              <span style={{fontSize:"0.8rem"}}>Fotografie budou doplněny</span>
            </div>
            <div className="gallery-label">{project.gallery[activePhoto].label}</div>
          </div>
          <div className="gallery-thumbs">
            {project.gallery.map((photo, i) => (
              <div key={i} className={`gallery-thumb${activePhoto===i?" active":""}`} onClick={() => setActivePhoto(i)}>
                <div className="gallery-thumb-placeholder">{photo.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTIČNÍ PARAMETRY */}
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Parametry investice</div>
          <h2 className="section-title">Investiční parametry</h2>
          <p className="section-sub">Všechny parametry jsou závazně sjednány ve smlouvě před nabytím vlastnictví.</p>

          <div className="params-grid">
            <div className="params-divider">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#366DFF" strokeWidth="1.5"/><path d="M7 4v4M7 10v.5" stroke="#366DFF" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Garantované parametry
            </div>

            <div className="param-cell">
              <span className="param-label">Kupní cena</span>
              <span className="param-value">{fmt(project.price)} Kč</span>
            </div>
            <div className="param-cell">
              <span className="param-label">Garantovaný roční výnos</span>
              <span className="param-value blue">{project.yieldPercent} %</span>
              <span className="param-note">garantovaná výše nájemního příjmu</span>
            </div>
            <div className="param-cell">
              <span className="param-label">Garantovaný měsíční příjem</span>
              <span className="param-value blue">{fmt(project.monthlyIncome)} Kč</span>
              <span className="param-note">vypláceno měsíčně</span>
            </div>
            <div className="param-cell">
              <span className="param-label">Garantovaný roční příjem</span>
              <span className="param-value blue">{fmt(project.yearlyIncome)} Kč</span>
            </div>

            <div className="params-divider">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#d97706" strokeWidth="1.5"/><path d="M4.5 9.5L7 4.5l2.5 5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Modelový scénář
            </div>

            <div className="param-cell">
              <span className="param-label">Možné kapitálové zhodnocení</span>
              <span className="param-value gold">+{fmt(growthAmount)} Kč / rok</span>
              <span className="param-note">{project.growthPercent} % p.a. – konzervativní scénář, není garantováno</span>
            </div>
            <div className="param-cell">
              <span className="param-label">Předpokládaná délka držení</span>
              <span className="param-value">{project.holdingPeriod}</span>
              <span className="param-note">realizace kapitálového zisku při prodeji</span>
            </div>

            <div className="params-divider">Nemovitost</div>

            <div className="param-cell">
              <span className="param-label">Typ vlastnictví</span>
              <span className="param-value">{project.ownershipType}</span>
            </div>
            <div className="param-cell">
              <span className="param-label">Stav nemovitosti</span>
              <span className="param-value">{project.condition}</span>
            </div>
            <div className="param-cell">
              <span className="param-label">Plocha</span>
              <span className="param-value">{project.area} m²</span>
            </div>
            <div className="param-cell">
              <span className="param-label">Podlaží</span>
              <span className="param-value">{project.floor}</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROČ TENTO PROJEKT */}
      <section className="section" style={{background:"var(--bg)"}}>
        <div className="section-inner">
          <div className="section-label">Investiční zdůvodnění</div>
          <h2 className="section-title">Proč tento projekt</h2>
          <p className="section-sub">Klíčové parametry, které ovlivňují výnosnost a stabilitu investice.</p>
          <div className="reasons-grid">
            {project.reasons.map((r, i) => (
              <div key={i} className="reason-card">
                <div className="reason-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4.5" stroke="#366DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="reason-title">{r.title}</div>
                <div className="reason-text">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JAK PROBÍHÁ INVESTICE */}
      <section className="section process-section">
        <div className="section-inner">
          <div className="section-label">Průběh investice</div>
          <h2 className="section-title">Čtyři kroky k pravidelnému příjmu</h2>
          <p className="section-sub">Jednoduchý proces. Vše vyřešíme s vámi.</p>
          <div className="process-steps">
            {[
              { num: 1, title: "Rezervace projektu", text: "Potvrdíte zájem a projekt je rezervován pro vás.", highlight: false },
              { num: 2, title: "Nastavení podmínek", text: "Smluvně sjednáme garantovanou výši příjmu a podmínky správy.", highlight: false },
              { num: 3, title: "Nabytí vlastnictví", text: "Nemovitost přechází do vašeho vlastnictví. Vše administrativní vyřešíme.", highlight: false },
              { num: 4, title: "Správa a výplata", text: "Od prvního dne se staráme o vše. Vy přijímáte garantovaný měsíční příjem.", highlight: true },
            ].map((s) => (
              <div key={s.num} className={`process-step${s.highlight ? " highlight" : ""}`}>
                <div className="process-num">{s.num}</div>
                <div className="process-step-title">{s.title}</div>
                <div className="process-step-text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODEL VÝNOSU */}
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Model výnosu</div>
          <h2 className="section-title">Dva typy výnosu</h2>
          <p className="section-sub">Garantovaný nájemní příjem a možné kapitálové zhodnocení jsou dva odlišné zdroje výnosu. Nikdy je nesčítáme.</p>
          <div className="yield-grid">
            <div className="yield-card blue">
              <div className="yield-tag blue">Garantovaný nájemní příjem</div>
              <div className="yield-amount blue">{fmt(project.monthlyIncome)} Kč</div>
              <div className="yield-desc blue" style={{marginTop:"6px"}}>každý měsíc · {fmt(project.yearlyIncome)} Kč ročně</div>
              <div className="yield-desc blue" style={{marginTop:"12px"}}>Přesná výše je sjednána smluvně před nabytím vlastnictví. Vyplácí se pravidelně bez ohledu na aktuální obsazenost.</div>
            </div>
            <div className="yield-card gold">
              <div className="yield-tag gold">Možné kapitálové zhodnocení</div>
              <div className="yield-amount gold">+{fmt(growthAmount)} Kč</div>
              <div className="yield-desc gold" style={{marginTop:"6px"}}>ročně · konzervativní scénář {project.growthPercent} % p.a.</div>
              <div className="yield-desc gold" style={{marginTop:"12px"}}>Modelový příklad. Není garantováno. Realizuje se pouze při prodeji nemovitosti. Skutečný výsledek závisí na vývoji trhu.</div>
            </div>
          </div>
          <div className="yield-disclaimer">
            * Výpočty jsou orientační. Garantovaná výše příjmu je vždy sjednána individuálně smluvně. Modelový scénář kapitálového zhodnocení není příslibem ani zárukou budoucího výnosu.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <div className="section-label" style={{color:"#475569",marginBottom:"16px"}}>Další krok</div>
        <h2 className="cta-title">Chcete zjistit, zda je tento projekt<br/>vhodný pro vaši situaci?</h2>
        <p className="cta-sub">Probereme vaše investiční možnosti a odpovíme na všechny otázky. Bez závazku.</p>
        <button className="cta-btn" onClick={() => window.location.href="/#kontakt"}>Domluvit konzultaci</button>
        <p className="cta-note">Podmínky investice jsou vždy individuálně sjednány smluvně.</p>
      </section>
    </>
  );
}
