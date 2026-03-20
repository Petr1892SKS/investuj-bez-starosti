"use client";
import { useState } from "react";
import Link from "next/link";

export default function PravniDokumenty() {
  const [activeTab, setActiveTab] = useState<"gdpr" | "podminky">("gdpr");
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["gdpr-1", "gdpr-2", "vop-1", "vop-2"])
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openSection = (id: string) => {
    setOpenSections((prev) => new Set([...prev, id]));
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50
    );
  };

  const isOpen = (id: string) => openSections.has(id);

  function DocSection({ id, num, title, children }: { id: string; num: number; title: string; children: React.ReactNode }) {
    return (
      <div className={`doc-section${isOpen(id) ? " open" : ""}`} id={id}>
        <div className="doc-section-header" onClick={() => toggleSection(id)}>
          <div className="section-number">{num}</div>
          <div className="section-title-doc">{title}</div>
          <div className="section-toggle">▼</div>
        </div>
        <div className="doc-section-body">{children}</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        :root {
          --brand: #366DFF;
          --brand-dark: #1e4fd6;
          --brand-light: #e8effe;
          --text: #1a1a2e;
          --text-muted: #6b7280;
          --text-light: #9ca3af;
          --bg: #ffffff;
          --bg-soft: #f8f9ff;
          --bg-section: #f1f5fe;
          --border: #e5e9f5;
          --border-strong: #d0d8f0;
          --radius: 12px;
          --radius-sm: 8px;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; line-height: 1.75; color: var(--text); background: var(--bg-soft); }

        .site-header { background: var(--bg); border-bottom: 1px solid var(--border); padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
        .site-logo { font-size: 15px; font-weight: 600; color: var(--brand); text-decoration: none; letter-spacing: -0.3px; }
        .site-logo span { color: var(--text); }

        .page-hero { background: linear-gradient(135deg, #0a1628 0%, #1a2d5a 60%, #1e3d7a 100%); padding: 4rem 2rem 3.5rem; text-align: center; position: relative; overflow: hidden; }
        .page-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 60% at 50% 120%, rgba(54,109,255,0.35) 0%, transparent 70%); }
        .page-hero .badge { display: inline-block; background: rgba(54,109,255,0.2); border: 1px solid rgba(54,109,255,0.4); color: #93b4ff; font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 1.2rem; position: relative; }
        .page-hero h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; color: #ffffff; letter-spacing: -0.8px; margin-bottom: 0.75rem; position: relative; }
        .page-hero p { color: rgba(255,255,255,0.6); font-size: 15px; max-width: 500px; margin: 0 auto 1.5rem; position: relative; }

        .tab-switcher { display: inline-flex; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 100px; padding: 4px; gap: 2px; position: relative; }
        .tab-btn { padding: 9px 24px; border-radius: 100px; font-size: 13px; font-weight: 500; font-family: 'Plus Jakarta Sans', sans-serif; border: none; cursor: pointer; transition: all 0.2s ease; color: rgba(255,255,255,0.7); background: transparent; letter-spacing: 0.1px; }
        .tab-btn.active { background: var(--brand); color: #fff; }

        .page-layout { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; display: grid; grid-template-columns: 220px 1fr; gap: 2rem; align-items: start; }

        .sidebar-nav { position: sticky; top: 72px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem 0; overflow: hidden; }
        .sidebar-nav .nav-title { font-size: 10px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: var(--text-light); padding: 0 1.25rem 0.75rem; }
        .sidebar-nav a { display: block; padding: 7px 1.25rem; font-size: 13px; color: var(--text-muted); text-decoration: none; border-left: 2px solid transparent; transition: all 0.15s; line-height: 1.4; cursor: pointer; }
        .sidebar-nav a:hover { color: var(--brand); background: var(--brand-light); border-left-color: var(--brand); }

        .doc-meta { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; display: flex; gap: 2rem; flex-wrap: wrap; }
        .doc-meta-item { display: flex; flex-direction: column; gap: 2px; }
        .doc-meta-item label { font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text-light); }
        .doc-meta-item span { font-size: 13px; font-weight: 500; color: var(--text); }

        .doc-section { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 1rem; overflow: hidden; }
        .doc-section-header { padding: 1.2rem 1.5rem; display: flex; align-items: center; gap: 1rem; cursor: pointer; user-select: none; transition: background 0.15s; }
        .doc-section-header:hover { background: var(--bg-soft); }
        .section-number { width: 30px; height: 30px; background: var(--brand-light); color: var(--brand); border-radius: 8px; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .section-title-doc { font-size: 15px; font-weight: 600; color: var(--text); flex: 1; }
        .section-toggle { width: 20px; height: 20px; border-radius: 50%; background: var(--bg-section); display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--text-muted); flex-shrink: 0; transition: transform 0.2s; }
        .doc-section.open .section-toggle { transform: rotate(180deg); }
        .doc-section-body { display: none; padding: 0 1.5rem 1.5rem; border-top: 1px solid var(--border); }
        .doc-section.open .doc-section-body { display: block; }
        .doc-section-body h4 { font-size: 13px; font-weight: 600; color: var(--brand); margin: 1rem 0 0.4rem; text-transform: uppercase; letter-spacing: 0.5px; }
        .doc-section-body p { font-size: 14px; color: var(--text); line-height: 1.75; margin-bottom: 0.6rem; }
        .doc-section-body ul { padding-left: 1.25rem; margin-bottom: 0.6rem; }
        .doc-section-body li { font-size: 14px; color: var(--text); line-height: 1.75; margin-bottom: 3px; }
        .doc-section-body strong { font-weight: 600; }
        .doc-section-body a { color: var(--brand); }

        .highlight-box { background: var(--bg-section); border: 1px solid var(--border-strong); border-left: 3px solid var(--brand); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 0.85rem 1.1rem; margin: 0.8rem 0; }
        .highlight-box p { margin: 0; font-size: 13.5px; color: var(--text); }

        .contact-card { background: linear-gradient(135deg, var(--brand) 0%, var(--brand-dark) 100%); border-radius: var(--radius); padding: 1.75rem; color: white; margin-top: 1.5rem; }
        .contact-card h3 { font-size: 17px; font-weight: 700; margin-bottom: 1rem; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
        .contact-item { display: flex; flex-direction: column; gap: 2px; }
        .contact-item label { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.65; font-weight: 600; }
        .contact-item span { font-size: 13.5px; font-weight: 500; }

        .doc-actions { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; }
        .action-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all 0.15s; text-decoration: none; border: 1px solid var(--border-strong); background: var(--bg); color: var(--text-muted); }
        .action-btn:hover { background: var(--bg-section); color: var(--brand); border-color: var(--brand); }
        .action-btn svg { width: 14px; height: 14px; }

        .footer-note { text-align: center; padding: 2rem; font-size: 12px; color: var(--text-light); border-top: 1px solid var(--border); background: var(--bg); margin-top: 3rem; }

        @media (max-width: 700px) {
          .page-layout { grid-template-columns: 1fr; }
          .sidebar-nav { display: none; }
          .contact-grid { grid-template-columns: 1fr; }
        }
        @media print {
          .site-header, .sidebar-nav, .tab-switcher, .doc-actions, .page-hero .badge { display: none; }
          .page-hero { background: white; color: black; padding: 1rem; }
          .page-hero h1 { color: black; }
          .doc-section-body { display: block !important; }
          .doc-section-header { cursor: default; }
        }
      `}</style>

      <header className="site-header">
        <Link href="/" className="site-logo">investuj<span>bezstarosti</span>.cz</Link>
        <span style={{ fontSize: "12px", color: "var(--text-light)" }}>Právní dokumenty</span>
      </header>

      <div className="page-hero">
        <div className="badge">Právní dokumenty</div>
        <h1>Ochrana osobních údajů &amp; Podmínky</h1>
        <p>Transparentní podmínky spolupráce. Vaše data jsou u nás v bezpečí.</p>
        <div className="tab-switcher">
          <button className={`tab-btn${activeTab === "gdpr" ? " active" : ""}`} onClick={() => setActiveTab("gdpr")}>
            Ochrana osobních údajů (GDPR)
          </button>
          <button className={`tab-btn${activeTab === "podminky" ? " active" : ""}`} onClick={() => setActiveTab("podminky")}>
            Všeobecné obchodní podmínky
          </button>
        </div>
      </div>

      <div className="page-layout">

        {/* SIDEBAR GDPR */}
        {activeTab === "gdpr" && (
          <nav className="sidebar-nav">
            <div className="nav-title">Obsah</div>
            {[
              ["gdpr-1", "1. Správce osobních údajů"],
              ["gdpr-2", "2. Jaké údaje zpracováváme"],
              ["gdpr-3", "3. Účely zpracování"],
              ["gdpr-4", "4. Právní základ"],
              ["gdpr-5", "5. Příjemci údajů"],
              ["gdpr-6", "6. Doba uchovávání"],
              ["gdpr-7", "7. Vaše práva"],
              ["gdpr-8", "8. Cookies"],
              ["gdpr-9", "9. Kontakt na DPO"],
            ].map(([id, label]) => (
              <a key={id} onClick={() => openSection(id)}>{label}</a>
            ))}
          </nav>
        )}

        {/* SIDEBAR VOP */}
        {activeTab === "podminky" && (
          <nav className="sidebar-nav">
            <div className="nav-title">Obsah</div>
            {[
              ["vop-1", "1. Úvodní ustanovení"],
              ["vop-2", "2. Předmět služby"],
              ["vop-3", "3. Konzultace a nabídka"],
              ["vop-4", "4. Investiční proces"],
              ["vop-5", "5. Garantovaný příjem"],
              ["vop-6", "6. Správa nemovitosti"],
              ["vop-7", "7. Odpovědnost a rizika"],
              ["vop-8", "8. Ceny a platby"],
              ["vop-9", "9. Závěrečná ustanovení"],
            ].map(([id, label]) => (
              <a key={id} onClick={() => openSection(id)}>{label}</a>
            ))}
          </nav>
        )}

        {/* GDPR PANEL */}
        {activeTab === "gdpr" && (
          <div>
            <div className="doc-meta">
              <div className="doc-meta-item"><label>Verze dokumentu</label><span>1.0</span></div>
              <div className="doc-meta-item"><label>Platnost od</label><span>20. 3. 2026</span></div>
              <div className="doc-meta-item"><label>Správce údajů</label><span>1. Mistři financování s.r.o.</span></div>
              <div className="doc-meta-item"><label>IČO</label><span>23419105</span></div>
            </div>

            <div className="doc-actions">
              <button className="action-btn" onClick={() => window.print()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/></svg>
                Tisknout
              </button>
            </div>

            <DocSection id="gdpr-1" num={1} title="Správce osobních údajů">
              <p>Správcem vašich osobních údajů ve smyslu nařízení Evropského parlamentu a Rady (EU) 2016/679 (dále jen „GDPR") je:</p>
              <div className="highlight-box">
                <p><strong>1. Mistři financování s.r.o.</strong><br/>
                Žitná 657/13, Praha, CZ, 11000<br/>
                IČO: 23419105<br/>
                E-mail: <a href="mailto:info@investujbezstarosti.cz">info@investujbezstarosti.cz</a><br/>
                Web: investujbezstarosti.cz</p>
              </div>
              <p>Provozujeme investiční platformu zaměřenou na zprostředkování a správu nemovitostí s garantovaným nájemním výnosem pro soukromé investory. Zpracování osobních údajů provádíme pouze v rozsahu nezbytném pro poskytování našich služeb a v souladu s platnou legislativou.</p>
            </DocSection>

            <DocSection id="gdpr-2" num={2} title="Jaké osobní údaje zpracováváme">
              <h4>Identifikační a kontaktní údaje</h4>
              <ul>
                <li>Jméno a příjmení / obchodní firma</li>
                <li>E-mailová adresa</li>
                <li>Telefonní číslo</li>
                <li>Adresa bydliště nebo sídla</li>
              </ul>
              <h4>Investiční a smluvní údaje</h4>
              <ul>
                <li>Výše investičního záměru a preference</li>
                <li>Smluvní dokumentace vztahující se k nákupu nemovitosti</li>
                <li>Informace o vlastnictví nemovitosti (po uzavření smlouvy)</li>
                <li>Bankovní spojení pro výplatu nájemního příjmu</li>
              </ul>
              <h4>Technické a analytické údaje</h4>
              <ul>
                <li>IP adresa, typ prohlížeče, čas návštěvy webu</li>
                <li>Informace o pohybu na webových stránkách (cookies – viz čl. 8)</li>
                <li>Data z analytických nástrojů (Google Analytics, Meta Pixel)</li>
              </ul>
              <p>Nezpracováváme zvláštní kategorie osobních údajů (citlivé údaje) ve smyslu čl. 9 GDPR.</p>
            </DocSection>

            <DocSection id="gdpr-3" num={3} title="Účely zpracování osobních údajů">
              <h4>Poskytování investičních a správcovských služeb</h4>
              <p>Zpracování je nezbytné pro přípravu a plnění smlouvy o nákupu nemovitosti a zajištění garantované správy. Zahrnuje komunikaci s investory, přípravu smluvní dokumentace, správu plateb nájemního výnosu a technickou správu nemovitostí.</p>
              <h4>Komunikace a zákaznická podpora</h4>
              <p>Odpovídáme na dotazy z kontaktního formuláře, e-mailu nebo telefonu. Toto zpracování je nezbytné pro splnění požadavků zájemců o investici.</p>
              <h4>Plnění zákonných povinností</h4>
              <p>Jsme povinni uchovávat určité dokumenty v souladu s daňovými, účetními a realitními právními předpisy (zákon č. 563/1991 Sb., zákon č. 235/2004 Sb., AML zákon č. 253/2008 Sb.).</p>
              <h4>Přímý marketing a informování o projektech</h4>
              <p>Pokud nám udělíte souhlas nebo jste naším stávajícím klientem, můžeme vám zasílat informace o nových investičních projektech a nabídkách. Souhlas lze kdykoliv odvolat.</p>
              <h4>Analytika a optimalizace webu</h4>
              <p>Na základě vašeho souhlasu s cookies analyzujeme návštěvnost a chování na webu za účelem zlepšení uživatelského zážitku.</p>
            </DocSection>

            <DocSection id="gdpr-4" num={4} title="Právní základ zpracování">
              <ul>
                <li><strong>Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)</strong> – zpracování nezbytné pro přípravu a plnění smlouvy o nákupu nemovitosti a zajištění správy.</li>
                <li><strong>Plnění právní povinnosti (čl. 6 odst. 1 písm. c) GDPR)</strong> – účetní, daňové, AML povinnosti.</li>
                <li><strong>Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)</strong> – přímý marketing vůči stávajícím klientům, ochrana před podvody, vedení interních statistik.</li>
                <li><strong>Souhlas (čl. 6 odst. 1 písm. a) GDPR)</strong> – zasílání obchodních sdělení novým zájemcům, analytické a marketingové cookies.</li>
              </ul>
            </DocSection>

            <DocSection id="gdpr-5" num={5} title="Příjemci a předávání údajů">
              <p>Vaše osobní údaje předáváme pouze v nezbytném rozsahu a jen tehdy, je-li to nezbytné pro poskytování našich služeb nebo plnění zákonných povinností. Příjemci mohou být:</p>
              <ul>
                <li><strong>Notáři a advokáti</strong> – při přípravě kupních smluv a vkladů do katastru nemovitostí</li>
                <li><strong>Katastr nemovitostí ČR</strong> – při zápisu vlastnického práva</li>
                <li><strong>Finanční úřad a účetní firma</strong> – plnění daňových a účetních povinností</li>
                <li><strong>Banka</strong> – při výplatě nájemního výnosu</li>
                <li><strong>Poskytovatelé IT a CRM systémů</strong> – správa dat na základě zpracovatelských smluv</li>
                <li><strong>Google LLC, Meta Platforms Inc.</strong> – analytické a marketingové nástroje (pouze na základě vašeho souhlasu s cookies; data mohou být předávána do USA dle Rámce ochrany dat EU–USA)</li>
              </ul>
              <div className="highlight-box">
                <p>Vaše osobní údaje <strong>neprodáváme</strong> třetím stranám a <strong>nepředáváme</strong> je subjektům mimo EU/EEA bez odpovídajících záruk (standardní smluvní doložky EU nebo adekvátní rozhodnutí).</p>
              </div>
            </DocSection>

            <DocSection id="gdpr-6" num={6} title="Doba uchovávání osobních údajů">
              <ul>
                <li><strong>Smluvní dokumentace a investiční záznamy</strong> – po dobu trvání smluvního vztahu a dále 10 let po jeho ukončení (archivační povinnosti)</li>
                <li><strong>Účetní doklady</strong> – 5 let od skončení účetního období</li>
                <li><strong>Daňové doklady</strong> – 10 let od skončení zdaňovacího období</li>
                <li><strong>AML záznamy</strong> – 10 let od uskutečnění transakce</li>
                <li><strong>Kontaktní formuláře (nezávazná poptávka)</strong> – max. 2 roky, pokud nedojde k uzavření smlouvy</li>
                <li><strong>Marketingové souhlasy</strong> – po dobu platnosti souhlasu nebo do odvolání</li>
                <li><strong>Cookies a analytická data</strong> – dle nastavení jednotlivých nástrojů, zpravidla 13–26 měsíců</li>
              </ul>
            </DocSection>

            <DocSection id="gdpr-7" num={7} title="Vaše práva jako subjektu údajů">
              <p>V souladu s GDPR máte tato práva, která můžete uplatnit písemně na e-mailu <a href="mailto:info@investujbezstarosti.cz">info@investujbezstarosti.cz</a>:</p>
              <h4>Přístup k údajům (čl. 15)</h4>
              <p>Máte právo získat potvrzení, zda zpracováváme vaše osobní údaje, a přístup k nim včetně informací o účelech a době zpracování.</p>
              <h4>Oprava nepřesných údajů (čl. 16)</h4>
              <p>Máte právo požadovat opravu nesprávných nebo neúplných osobních údajů.</p>
              <h4>Výmaz („právo být zapomenut") (čl. 17)</h4>
              <p>Za určitých podmínek máte právo požadovat výmaz svých osobních údajů. Toto právo nelze uplatnit, pokud zpracování vyžaduje zákon.</p>
              <h4>Omezení zpracování (čl. 18)</h4>
              <p>Máte právo požádat o omezení zpracování v případech stanovených GDPR.</p>
              <h4>Přenositelnost údajů (čl. 20)</h4>
              <p>Máte právo obdržet své osobní údaje ve strukturovaném, strojově čitelném formátu.</p>
              <h4>Námitka proti zpracování (čl. 21)</h4>
              <p>Máte právo vznést námitku proti zpracování na základě oprávněného zájmu nebo pro účely přímého marketingu.</p>
              <h4>Odvolání souhlasu</h4>
              <p>Pokud je zpracování založeno na souhlasu, máte právo jej kdykoli odvolat, aniž by tím byla dotčena zákonnost zpracování před odvoláním.</p>
              <div className="highlight-box">
                <p>Máte také právo podat stížnost u <strong>Úřadu pro ochranu osobních údajů</strong> (ÚOOÚ), Pplk. Sochora 27, 170 00 Praha 7, <a href="https://www.uoou.cz">www.uoou.cz</a>.</p>
              </div>
            </DocSection>

            <DocSection id="gdpr-8" num={8} title="Cookies a sledovací technologie">
              <p>Naše webové stránky používají cookies a obdobné technologie. Cookies jsou malé textové soubory ukládané do vašeho zařízení.</p>
              <h4>Nezbytné cookies</h4>
              <p>Zajišťují základní funkčnost webu. Lze je nastavit bez souhlasu.</p>
              <h4>Analytické cookies</h4>
              <p>Google Analytics – anonymizovaná data o návštěvnosti a chování na webu. Vyžadují váš souhlas.</p>
              <h4>Marketingové cookies</h4>
              <p>Meta Pixel (Facebook) – sledování konverzí a tvorba remarketing publika pro cílené reklamy. Vyžadují váš souhlas.</p>
              <p>Svůj souhlas s nepovinných cookies můžete kdykoli odvolat v nastavení prohlížeče nebo prostřednictvím cookies banneru na našem webu.</p>
            </DocSection>

            <DocSection id="gdpr-9" num={9} title="Kontakt pro uplatnění práv">
              <p>Veškeré žádosti týkající se vašich osobních údajů, otázky nebo stížnosti zasílejte na:</p>
            </DocSection>

            <div className="contact-card">
              <h3>Kontakt správce osobních údajů</h3>
              <div className="contact-grid">
                <div className="contact-item"><label>Společnost</label><span>1. Mistři financování s.r.o.</span></div>
                <div className="contact-item"><label>IČO</label><span>23419105</span></div>
                <div className="contact-item"><label>Adresa</label><span>Žitná 657/13, Praha 1, 11000</span></div>
                <div className="contact-item"><label>E-mail</label><span>info@investujbezstarosti.cz</span></div>
              </div>
            </div>
          </div>
        )}

        {/* VOP PANEL */}
        {activeTab === "podminky" && (
          <div>
            <div className="doc-meta">
              <div className="doc-meta-item"><label>Verze dokumentu</label><span>1.0</span></div>
              <div className="doc-meta-item"><label>Platnost od</label><span>20. 3. 2026</span></div>
              <div className="doc-meta-item"><label>Provozovatel</label><span>1. Mistři financování s.r.o.</span></div>
              <div className="doc-meta-item"><label>IČO</label><span>23419105</span></div>
            </div>

            <div className="doc-actions">
              <button className="action-btn" onClick={() => window.print()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/></svg>
                Tisknout
              </button>
            </div>

            <DocSection id="vop-1" num={1} title="Úvodní ustanovení">
              <p>Tyto všeobecné obchodní podmínky (dále jen „VOP") upravují vztahy mezi společností <strong>1. Mistři financování s.r.o.</strong>, IČO: 23419105, se sídlem Žitná 657/13, Praha 1, 11000 (dále jen „Provozovatel" nebo „my"), a fyzickými či právnickými osobami (dále jen „Investor" nebo „vy"), které využívají služby nabízené prostřednictvím webové platformy <strong>investujbezstarosti.cz</strong>.</p>
              <p>Tyto VOP jsou vydány v souladu s ustanoveními zákona č. 89/2012 Sb., občanský zákoník, a souvisejících právních předpisů. Odesláním poptávkového formuláře nebo uzavřením smlouvy Investor potvrzuje, že se s těmito VOP seznámil a souhlasí s nimi.</p>
              <p>Provozovatel si vyhrazuje právo VOP aktualizovat. O změnách budou stávající Investoři informováni e-mailem nejméně 30 dní před nabytím účinnosti změn.</p>
            </DocSection>

            <DocSection id="vop-2" num={2} title="Předmět a rozsah poskytovaných služeb">
              <p>Provozovatel prostřednictvím platformy investujbezstarosti.cz nabízí:</p>
              <h4>Zprostředkování koupě nemovitosti</h4>
              <p>Provozovatel Investorovi umožňuje nabýt vlastnictví konkrétní rezidenční nemovitosti (bytu) z portfolia Provozovatele. Nemovitosti jsou před zařazením do portfolia prověřeny z technického, právního a ekonomického hlediska.</p>
              <h4>Garantovaná správa nemovitosti</h4>
              <p>Na základě smlouvy o správě nemovitosti Provozovatel zajišťuje kompletní správu zakoupené nemovitosti: výběr nájemníků, uzavírání nájemních smluv, technický servis, řešení pojistných událostí, vyúčtování provozních nákladů a pravidelnou reportingovou komunikaci s Investorem.</p>
              <h4>Garantovaný nájemní příjem</h4>
              <p>Provozovatel smluvně garantuje výplatu předem stanoveného měsíčního příjmu Investorovi, a to bez ohledu na okamžitou obsazenost nemovitosti (viz čl. 5).</p>
              <div className="highlight-box">
                <p>Provozovatel <strong>neposkytuje</strong> investiční poradenství ve smyslu zákona č. 256/2004 Sb. (ZPKT). Veškeré informace a kalkulace na webu jsou orientační a nejsou investičním doporučením.</p>
              </div>
            </DocSection>

            <DocSection id="vop-3" num={3} title="Nezávazná konzultace a nabídkový proces">
              <h4>Nezávazná poptávka</h4>
              <p>Odesláním kontaktního formuláře na webu Investor vyjadřuje zájem o konzultaci. Odeslání formuláře není uzavřením smlouvy ani závazným objednáním služeb a nezakládá žádné finanční závazky.</p>
              <h4>Konzultace</h4>
              <p>Provozovatel do 2 pracovních dní od obdržení poptávky kontaktuje Investora za účelem úvodní konzultace. Konzultace je bezplatná a nezávazná. Na základě investičních cílů Investora Provozovatel doporučí vhodné projekty.</p>
              <h4>Individuální nabídka</h4>
              <p>Po projevení zájmu Provozovatel připraví individuální nabídku obsahující: specifikaci nemovitosti, kupní cenu, výši garantovaného měsíčního příjmu, roční výnos, podmínky správy a orientační kapitálové zhodnocení. Nabídka je platná 14 dní od doručení.</p>
              <p>Orientační kalkulace na webu (5 % p.a. garantovaný příjem) jsou ilustrativní. Přesné podmínky jsou vždy stanoveny individuálně ve smlouvě.</p>
            </DocSection>

            <DocSection id="vop-4" num={4} title="Investiční proces a uzavření smlouvy">
              <h4>Rezervace nemovitosti</h4>
              <p>Po odsouhlasení nabídky Investor uhradí rezervační zálohu ve výši dohodnuté v individuální nabídce (zpravidla 1–3 % kupní ceny). Rezervační záloha je po podpisu kupní smlouvy započtena do kupní ceny. V případě, že k uzavření smlouvy nedojde z důvodu na straně Provozovatele, záloha se vrací v plné výši.</p>
              <h4>Due diligence a smluvní dokumentace</h4>
              <p>Provozovatel poskytne Investorovi veškerou dokumentaci k nemovitosti (výpis z katastru, energetický průkaz, stavební dokumentaci, nájemní historii). Investor má právo provést vlastní právní a technické due diligence.</p>
              <h4>Kupní smlouva</h4>
              <p>Kupní smlouva se uzavírá formou notářského zápisu nebo s ověřenými podpisy. Součástí smluvní dokumentace je vždy smlouva o správě nemovitosti a dokumentace garantovaného příjmu.</p>
              <h4>Převod vlastnictví</h4>
              <p>Vlastnictví přechází na Investora vkladem do katastru nemovitostí. Kupní cena je hrazena prostřednictvím notářské nebo advokátní úschovy. Provozovatel zajistí veškerou administrativu spojenou s převodem.</p>
              <h4>AML povinnosti</h4>
              <p>V souladu se zákonem č. 253/2008 Sb. je Provozovatel povinen identifikovat Investora a ověřit zdroj prostředků. Investor je povinen poskytnout potřebnou součinnost.</p>
            </DocSection>

            <DocSection id="vop-5" num={5} title="Garantovaný nájemní příjem">
              <div className="highlight-box">
                <p>Klíčový závazek Provozovatele: <strong>výplata smluvně stanovené výše měsíčního příjmu Investorovi bez ohledu na momentální obsazenost nemovitosti.</strong></p>
              </div>
              <h4>Výše garantovaného příjmu</h4>
              <p>Výše garantovaného měsíčního příjmu je sjednána individuálně ve smlouvě o správě nemovitosti. Orientačně odpovídá výnosu 5 % p.a. z kupní ceny nemovitosti.</p>
              <h4>Výplata příjmu</h4>
              <p>Garantovaný příjem je vyplácen měsíčně, vždy do 15. dne následujícího měsíce, převodem na bankovní účet Investora uvedený ve smlouvě.</p>
              <h4>Trvání garance</h4>
              <p>Garance příjmu trvá po dobu stanovenou ve smlouvě o správě nemovitosti, zpravidla 3–5 let s možností prodloužení. Po uplynutí doby garance lze podmínky správy opětovně sjednat.</p>
              <h4>Podmínky garance</h4>
              <p>Garance platí za předpokladu, že Investor plní povinnosti vyplývající ze smlouvy (např. povolení nezbytných oprav). Garance se nevztahuje na výpadky způsobené prokazatelně výlučně jednáním Investora.</p>
              <h4>Kapitálové zhodnocení</h4>
              <p>Předpokládané kapitálové zhodnocení (orientačně 7 % p.a.) je ilustrativní projekcí tržního vývoje a <strong>není smluvně garantováno</strong>. Realizuje se až prodejem nemovitosti a závisí na tržních podmínkách v době prodeje.</p>
            </DocSection>

            <DocSection id="vop-6" num={6} title="Správa nemovitosti – rozsah a povinnosti">
              <h4>Provozovatel v rámci správy zajišťuje</h4>
              <ul>
                <li>Systematický výběr a prověřování nájemníků</li>
                <li>Uzavírání, prodloužení a ukončení nájemních smluv</li>
                <li>Vymáhání nájemného a řešení platební nekázně</li>
                <li>Běžnou údržbu a opravy (do výše dohodnutého limitu bez souhlasu Investora)</li>
                <li>Větší opravy a rekonstrukce (nad limit – se souhlasem Investora)</li>
                <li>Technický dohled a servisní zásahy</li>
                <li>Správu fondů oprav (SVJ/BD)</li>
                <li>Pojistné záležitosti a řešení škodních událostí</li>
                <li>Vyúčtování provozních nákladů</li>
                <li>Pravidelné reporting Investorovi (min. 1× ročně, popř. dle smlouvy)</li>
              </ul>
              <h4>Povinnosti Investora</h4>
              <ul>
                <li>Poskytnout součinnost při nezbytných opravách</li>
                <li>Informovat Provozovatele o změnách vlastnictví</li>
                <li>Udržovat pojištění nemovitosti (nebo pověřit Provozovatele)</li>
                <li>Hradit správní poplatky dle smlouvy o správě</li>
              </ul>
            </DocSection>

            <DocSection id="vop-7" num={7} title="Odpovědnost, rizika a omezení">
              <div className="highlight-box">
                <p>Investice do nemovitostí jsou spojeny s riziky. Před uzavřením smlouvy doporučujeme konzultaci s nezávislým právním a daňovým poradcem.</p>
              </div>
              <h4>Rizika na straně Investora</h4>
              <ul>
                <li>Tržní riziko – hodnota nemovitosti může klesat i stoupat</li>
                <li>Riziko likvidity – nemovitost nelze prodat okamžitě jako finanční instrument</li>
                <li>Daňové riziko – Investor je povinen sám splnit daňové povinnosti vyplývající z vlastnictví a příjmů z nemovitosti</li>
              </ul>
              <h4>Odpovědnost Provozovatele</h4>
              <p>Provozovatel odpovídá za škody způsobené prokazatelně porušením svých smluvních povinností, maximálně do výše ročního garantovaného příjmu Investora. Provozovatel neodpovídá za nepřímé škody, ušlý zisk nebo škody způsobené vis maior.</p>
              <h4>Upozornění k marketingovým materiálům</h4>
              <p>Veškeré kalkulace, prognózy, ilustrace a výpočty na webu i v prezentacích jsou orientační a nezakládají smluvní závazek. Skutečné výsledky se mohou lišit od ilustrativních projekcí.</p>
            </DocSection>

            <DocSection id="vop-8" num={8} title="Ceny, poplatky a platební podmínky">
              <h4>Kupní cena nemovitosti</h4>
              <p>Kupní cena je vždy sjednána individuálně. Webové kalkulačky uvádějí orientační hodnoty. Cena je splatná dle podmínek kupní smlouvy, zpravidla prostřednictvím notářské nebo advokátní úschovy.</p>
              <h4>Poplatky za správu</h4>
              <p>Výše poplatku za správu nemovitosti je součástí smlouvy o správě. V modelu s garantovaným příjmem je poplatek za správu zpravidla zahrnut v rozdílu mezi tržním nájemným a garantovanou výší příjmu vyplácené Investorovi.</p>
              <h4>Daně a poplatky</h4>
              <p>Daň z příjmů plynoucích z nájmu hradí Investor sám jako vlastník nemovitosti v souladu se zákonem č. 586/1992 Sb. Provozovatel poskytne roční přehled příjmů pro daňové účely. Katastralní poplatek za vklad vlastnictví hradí kupující (Investor) dle platných sazeb katastrálního zákona.</p>
              <h4>Prodlení s platbou</h4>
              <p>V případě prodlení Provozovatele s výplatou garantovaného příjmu má Investor právo na zákonný úrok z prodlení dle § 1970 OZ.</p>
            </DocSection>

            <DocSection id="vop-9" num={9} title="Závěrečná ustanovení">
              <h4>Rozhodné právo</h4>
              <p>Smluvní vztahy se řídí právem České republiky, zejm. zákonem č. 89/2012 Sb. (OZ) a zákonem č. 256/2013 Sb. (katastrální zákon).</p>
              <h4>Řešení sporů</h4>
              <p>Strany se zavazují řešit spory přednostně smírnou cestou. Nedojde-li k dohodě, jsou k rozhodování příslušné obecné soudy České republiky, a to věcně a místně příslušné soudy v místě sídla Provozovatele.</p>
              <h4>Oddělitelnost ustanovení</h4>
              <p>Je-li nebo stane-li se některé ustanovení těchto VOP neplatným nebo neúčinným, nedotýká se tato skutečnost platnosti ostatních ustanovení.</p>
              <h4>Kontakt</h4>
              <p>V případě dotazů k těmto VOP nás kontaktujte na <a href="mailto:info@investujbezstarosti.cz">info@investujbezstarosti.cz</a>.</p>
              <p>Tyto VOP jsou platné a účinné od <strong>20. 3. 2026</strong>.</p>
            </DocSection>

            <div className="contact-card">
              <h3>1. Mistři financování s.r.o.</h3>
              <div className="contact-grid">
                <div className="contact-item"><label>Sídlo</label><span>Žitná 657/13, Praha 1, 11000</span></div>
                <div className="contact-item"><label>IČO</label><span>23419105</span></div>
                <div className="contact-item"><label>E-mail</label><span>info@investujbezstarosti.cz</span></div>
                <div className="contact-item"><label>Web</label><span>investujbezstarosti.cz</span></div>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="footer-note">
        © 2026 1. Mistři financování s.r.o. – investujbezstarosti.cz &nbsp;·&nbsp; Verze 1.0, platnost od 20. 3. 2026
      </div>
    </>
  );
}
