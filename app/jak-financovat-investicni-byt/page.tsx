import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jak financovat investiční byt — a nezablokovat si ten další | Investuj bez starostí",
  description:
    "Nová pravidla ČNB pro investiční hypotéky, nezajištěný úvěr na družstevní byt a proč záleží na pořadí bank, když chcete postupně poskládat dva nebo tři byty.",
  openGraph: {
    title: "Jak financovat investiční byt — a nezablokovat si ten další",
    description:
      "Pravidla ČNB od dubna 2026, nezajištěný úvěr na družstevní byt a pořadí bank při skládání portfolia.",
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="cl">
      <header className="cl-top">
        <Link href="/" className="cl-logo">Investuj<span> bez starostí</span></Link>
        <Link href="/#kontakt" className="cl-topcta">Nezávazný hovor</Link>
      </header>

      <article className="cl-body">
        <p className="cl-kicker">Financování · 5 minut čtení</p>
        <h1>Jak financovat investiční byt — a nezablokovat si ten další</h1>
        <p className="cl-lead">
          Většina lidí řeší, jak dosáhnout na první byt. Kdo to myslí s nemovitostmi vážně, řeší ještě
          jednu věc: aby si první úvěr nezavřel cestu ke druhému a třetímu. Tady je, co se od dubna
          2026 změnilo, jak jde začít i bez velkých úspor a proč záleží na pořadí bank.
        </p>

        <h2>1. Co od dubna 2026 platí pro investiční hypotéky</h2>
        <p>
          Česká národní banka od 1. dubna 2026 doporučuje bankám přísnější limity u takzvaných
          investičních hypoték. Za investiční se považuje úvěr na byt, který chcete
          <strong> pronajímat</strong>, nebo na <strong>třetí a každou další</strong> nemovitost.
        </p>
        <div className="cl-box">
          <div><b>LTV nejvýš 70 %</b><span>banka půjčí nejvýš 70 % hodnoty bytu, zbytek dáváte ze svého</span></div>
          <div><b>DTI nejvýš 7</b><span>všechny vaše dluhy dohromady nejvýš sedminásobek ročního příjmu</span></div>
        </div>
        <p>
          Jde o doporučení, ne o zákon, ale banky se jím v praxi řídí. Prakticky to znamená, že na
          investiční byt s klasickou hypotékou potřebujete zhruba <strong>30 % vlastních peněz</strong>.
          U bytu za 2,5 milionu je to kolem 750 tisíc. A právě tady se spousta lidí zasekne.
        </p>

        <h2>2. Cesta, jak začít i bez velkých úspor</h2>
        <p>
          Existuje postup, o kterém se moc nemluví. Martin Vohralík, spoluzakladatel Investuj bez starostí,
          ho popsal v Nemovitostním podcastu:
        </p>
        <blockquote>
          „Když máš možnost na začátku takovýhle produkt najít, získáš levné financování, získáš prvních
          100 %, převedeš si to do osobního vlastnictví — a najednou máš dalších 80 % volné zástavy
          na té nemovitosti. Rozinvestoval ses i bez vlastních peněz.“
          <cite>— Martin Vohralík, Nemovitostní podcast</cite>
        </blockquote>
        <p>Jak to funguje, krok za krokem:</p>
        <ol className="cl-steps">
          <li><b>Družstevní byt na nezajištěný úvěr.</b> Stavební spořitelny mají na družstevní bydlení
            lepší podmínky než na byt v osobním vlastnictví — podle Martina vyšší limit, sazbu nižší
            o 0,2–0,5 procentního bodu a splatnost až 25 let místo 20.</li>
          <li><b>Okamžitý převod do osobního vlastnictví.</b> Byt se po koupi převede do vašeho
            osobního vlastnictví. Protože úvěr nebyl zajištěný, byt nemá zástavu.</li>
          <li><b>Byt jako zajištění dalšího kroku.</b> Nezastavený byt můžete později refinancovat
            klasickou hypotékou, nebo ho použít jako zástavu při koupi dalšího bytu.</li>
        </ol>
        <div className="cl-warn">
          <b>Na co si dát pozor</b>
          <ul>
            <li><b>Nezajištěný úvěr stojí jen na vaší bonitě.</b> Banka nemá zástavu, takže se dívá
              hlavně na příjmy a další dluhy. Sazba bývá vyšší než u hypotéky.</li>
            <li><b>Účel úvěru vždy uvádějte pravdivě.</b> Úvěr ze stavebního spoření je určený na bytové
              potřeby a na pronájem se každá spořitelna dívá jinak. Nic nezamlčujte — při porušení
              účelu může spořitelna chtít úvěr zpátky.</li>
            <li><b>Převod do osobního vlastnictví musí být smluvně zaručený</b>, s jasným termínem — ne
              jen slíbený ústně.</li>
          </ul>
        </div>

        <h2>3. Pořadí bank: proč na něm záleží</h2>
        <p>
          Když plánujete víc bytů — třeba dva tři postupně, pro sebe nebo jako zabezpečení pro děti —
          první úvěr nemá být jen ten nejlevnější. Má vám nechat prostor pro další. Banky totiž počítají
          bonitu každá jinak:
        </p>
        <ul className="cl-list">
          <li>některé půjčí podle výpisů z účtu, ale chtějí hodně vlastních peněz,</li>
          <li>některé financují jen první tři nebo čtyři nemovitosti,</li>
          <li>jiné umí pracovat s obraty na účtu nebo s příjmy z vaší firmy.</li>
        </ul>
        <blockquote>
          „Když si na začátku zarejzuješ všechno z jedné banky, protože ti dá nějaký obratový limit,
          tak se zasekneš a už nevyužiješ podmínky těch ostatních.“
          <cite>— Martin Vohralík, Nemovitostní podcast</cite>
        </blockquote>
        <p>
          Bonita funguje jako sklenice: plníte ji, až se zavře, a pak ji musíte zvětšit — vyššími příjmy,
          příjmem z nájmů nebo firmou. Proto se vyplatí plán na dva až tři byty dopředu, ještě před tím
          prvním. Pořadí bank, kdy zapojit spolužadatele z rodiny a kdy si založit s.r.o., se dá rozvrhnout
          předem — ne až ve chvíli, kdy vám jedna banka řekne ne.
        </p>

        <h2>4. Šetřit, nebo začít dřív?</h2>
        <p>
          Častá úvaha: „Nejdřív si našetřím.“ Jenže zatímco šetříte, ceny bytů rostou a na spořicím účtu
          vám roste jen to, co jste odložili. S hypotékou se vám zhodnocuje celá hodnota bytu.
        </p>
        <p className="cl-fair">
          Férově ale i druhá strana: páka funguje oběma směry. Čím menší rezervu máte, tím víc vás rozhodí
          prázdný měsíc bez nájemníka nebo nečekaná oprava. Proto má smysl začít dřív, ale ne za cenu
          toho, že vám nezbude žádný polštář.
        </p>

        <section className="cl-cta">
          <h2>Chcete si to rozkreslit pro svou situaci?</h2>
          <p>
            Probereme, kolik potřebujete vlastních peněz, která cesta financování dává smysl právě vám
            a jak poskládat pořadí bank, když plánujete víc bytů. Nezávazně a bez tlaku — řekneme vám
            i to, kdy se to nevyplatí.
          </p>
          <Link href="/#kontakt" className="cl-btn">Domluvit nezávazný hovor</Link>
        </section>

        <p className="cl-legal">
          Článek je obecná informace, ne finanční ani úvěrové poradenství. Podmínky bank a stavebních
          spořitelen se mění a posuzují se individuálně. Limity ČNB: doporučení k investičním hypotékám
          účinné od 1. 4. 2026.
        </p>
      </article>

      <style>{`
.cl{--blue:#366dff;--ink:#0f172a;--ink2:#475569;--ink3:#64748b;--line:#e2e8f0;--bg:#f7f7fb;
  background:var(--bg);color:var(--ink);min-height:100vh;font-family:var(--font-plus-jakarta),'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;}
.cl-top{max-width:760px;margin:0 auto;padding:20px 20px 0;display:flex;justify-content:space-between;align-items:center;}
.cl-logo{font-weight:800;font-size:1.02rem;color:var(--ink);text-decoration:none;}
.cl-logo span{color:var(--blue);}
.cl-topcta{font-weight:700;font-size:.9rem;color:var(--blue);text-decoration:none;border:1.5px solid var(--blue);border-radius:999px;padding:8px 16px;}
.cl-body{max-width:760px;margin:0 auto;padding:36px 20px 64px;line-height:1.7;font-size:1.04rem;}
.cl-kicker{color:var(--blue);font-weight:700;font-size:.82rem;text-transform:uppercase;letter-spacing:.06em;margin:0 0 10px;}
.cl h1{font-size:clamp(1.8rem,4.6vw,2.6rem);line-height:1.15;font-weight:800;letter-spacing:-.02em;margin:0 0 18px;}
.cl h2{font-size:1.4rem;font-weight:800;margin:44px 0 12px;letter-spacing:-.01em;}
.cl p{color:var(--ink2);margin:0 0 16px;}
.cl p strong,.cl li b,.cl p b{color:var(--ink);}
.cl-lead{font-size:1.15rem;color:var(--ink)!important;}
.cl-box{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:8px 0 20px;}
.cl-box div{background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px 18px;}
.cl-box b{display:block;font-size:1.25rem;color:var(--blue);}
.cl-box span{font-size:.92rem;color:var(--ink3);line-height:1.5;display:block;margin-top:4px;}
.cl blockquote{margin:20px 0;padding:18px 22px;background:#eef2ff;border-left:4px solid var(--blue);border-radius:0 14px 14px 0;font-size:1.05rem;color:var(--ink);font-style:italic;}
.cl cite{display:block;margin-top:10px;font-style:normal;font-size:.88rem;color:var(--ink3);font-weight:600;}
.cl-steps,.cl-list{color:var(--ink2);padding-left:22px;margin:0 0 18px;}
.cl-steps li,.cl-list li{margin-bottom:10px;}
.cl-warn{background:#fffbeb;border:1px solid #fde68a;border-radius:14px;padding:16px 20px;margin:12px 0 8px;}
.cl-warn>b{color:#92400e;}
.cl-warn ul{margin:8px 0 0;padding-left:20px;color:var(--ink2);}
.cl-warn li{margin-bottom:8px;}
.cl-fair{border-left:3px solid var(--line);padding-left:14px;}
.cl-cta{background:var(--ink);color:#fff;border-radius:20px;padding:28px 26px;margin:48px 0 24px;}
.cl-cta h2{color:#fff;margin-top:0;}
.cl-cta p{color:#cbd5e1;}
.cl-btn{display:inline-block;background:var(--blue);color:#fff;font-weight:700;text-decoration:none;border-radius:999px;padding:14px 26px;margin-top:6px;}
.cl-legal{font-size:.82rem!important;color:#94a3b8!important;}
@media(max-width:560px){.cl-box{grid-template-columns:1fr;}.cl-body{font-size:1rem;}}
      `}</style>
    </main>
  );
}
