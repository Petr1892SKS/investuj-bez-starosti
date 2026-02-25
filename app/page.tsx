<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>investujbezstarosti.cz</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --blue:#366dff;--blue-dark:#1a4fd6;--blue-light:#eef2ff;
  --gold:#f59e0b;--bg:#f7f7fb;--text:#0f172a;--text2:#475569;--border:#e2e8f0;
  --radius:16px;--shadow:0 4px 24px rgba(54,109,255,0.08);--shadow-hover:0 12px 40px rgba(54,109,255,0.16);
}
body{font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;}

/* REVEAL */
.reveal{opacity:0;transform:translateY(28px);transition:opacity 0.65s ease,transform 0.65s ease;}
.reveal.revealed{opacity:1;transform:translateY(0);}
.d1{transition-delay:0.1s;}.d2{transition-delay:0.2s;}.d3{transition-delay:0.3s;}.d4{transition-delay:0.4s;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
@keyframes pop{from{transform:scale(0);opacity:0;}to{transform:scale(1);opacity:1;}}

/* NAVBAR */
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(247,247,251,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 6%;height:68px;display:flex;align-items:center;justify-content:space-between;}
.navbar-logo{font-size:1.05rem;font-weight:800;color:var(--text);cursor:pointer;text-decoration:none;}
.navbar-logo span{color:var(--blue);}
.navbar-links{display:flex;gap:2rem;list-style:none;}
.navbar-links a{color:var(--text2);text-decoration:none;font-size:0.875rem;font-weight:500;transition:color 0.2s;}
.navbar-links a:hover{color:var(--blue);}
.btn-primary{background:var(--blue);color:#fff;border:none;border-radius:50px;padding:10px 22px;font-size:0.875rem;font-weight:700;font-family:inherit;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;}
.btn-primary:hover{background:var(--blue-dark);transform:translateY(-1px);box-shadow:0 6px 20px rgba(54,109,255,0.35);}
.btn-secondary{background:transparent;color:var(--blue);border:2px solid var(--blue);border-radius:50px;padding:10px 22px;font-size:0.875rem;font-weight:700;font-family:inherit;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;}
.btn-secondary:hover{background:var(--blue-light);transform:translateY(-1px);}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;padding:110px 6% 70px;position:relative;overflow:hidden;background:linear-gradient(135deg,#f7f7fb 0%,#eef2ff 60%,#f0f7ff 100%);}
.hero-shape{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.3;pointer-events:none;}
.hero-shape-1{width:700px;height:700px;background:radial-gradient(circle,#366dff44,transparent);top:-150px;right:-150px;}
.hero-shape-2{width:500px;height:500px;background:radial-gradient(circle,#f59e0b22,transparent);bottom:-50px;left:5%;}
.hero-inner{display:grid;grid-template-columns:1.1fr 0.9fr;gap:60px;align-items:center;max-width:1200px;width:100%;position:relative;z-index:2;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:white;color:var(--blue);font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:7px 16px;border-radius:50px;margin-bottom:1.5rem;border:1px solid rgba(54,109,255,0.2);box-shadow:0 2px 8px rgba(54,109,255,0.1);}
.hero-dot{width:6px;height:6px;background:var(--blue);border-radius:50%;animation:blink 2s infinite;flex-shrink:0;}
.hero h1{font-size:clamp(2.2rem,4vw,3.6rem);font-weight:800;line-height:1.1;letter-spacing:-1.5px;margin-bottom:1.5rem;color:var(--text);}
.hero h1 .accent{color:var(--blue);}
.hero-points{display:flex;flex-direction:column;gap:10px;margin-bottom:2rem;}
.hero-point{display:flex;align-items:center;gap:10px;font-size:1rem;color:var(--text2);font-weight:500;}
.hero-point-dot{width:6px;height:6px;background:var(--blue);border-radius:50%;flex-shrink:0;}
.hero-badges{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:2rem;}
.hero-badge{display:flex;align-items:center;gap:7px;background:white;border:1px solid var(--border);border-radius:50px;padding:7px 14px;font-size:0.78rem;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.badge-check{width:17px;height:17px;background:var(--blue-light);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.hero-ctas{display:flex;gap:10px;flex-wrap:wrap;}
.hero-card{background:white;border-radius:22px;padding:32px;box-shadow:0 20px 60px rgba(54,109,255,0.12);border:1px solid rgba(54,109,255,0.08);}
.hero-card-label{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text2);margin-bottom:1rem;}
.hero-card-cta{width:100%;margin-top:1.25rem;padding:12px;font-size:0.9rem;font-weight:700;background:var(--blue);color:white;border:none;border-radius:12px;font-family:inherit;cursor:pointer;transition:all 0.2s;}
.hero-card-cta:hover{background:var(--blue-dark);}
.hero-card-note{font-size:0.7rem;color:var(--text2);text-align:center;margin-top:8px;line-height:1.5;}
.calc-slider{width:100%;height:5px;border-radius:3px;background:var(--border);outline:none;cursor:pointer;-webkit-appearance:none;margin-bottom:6px;}
.calc-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--blue);cursor:pointer;box-shadow:0 2px 8px rgba(54,109,255,0.4);}

/* STATS */
.stats-section{background:white;padding:56px 6%;border-bottom:1px solid var(--border);}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;max-width:860px;margin:0 auto;text-align:center;}
.stat-num{font-size:2.2rem;font-weight:800;color:var(--blue);letter-spacing:-1.5px;line-height:1;}
.stat-label{font-size:0.8rem;color:var(--text2);margin-top:6px;font-weight:500;}

/* SECTIONS */
.section{padding:90px 6%;}
.section-label{font-size:0.72rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--blue);margin-bottom:0.75rem;}
.section-title{font-size:clamp(1.7rem,3vw,2.5rem);font-weight:800;letter-spacing:-1px;color:var(--text);margin-bottom:1rem;line-height:1.15;}
.section-sub{font-size:1rem;color:var(--text2);line-height:1.75;max-width:540px;}
.section-header{margin-bottom:3.5rem;}

/* FOR WHOM */
.forwhom-section{background:white;}
.forwhom-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;max-width:1080px;margin:0 auto;}
.forwhom-list{display:flex;flex-direction:column;gap:14px;margin-top:1.5rem;}
.forwhom-item{display:flex;align-items:flex-start;gap:12px;padding:16px 20px;background:var(--bg);border:1.5px solid var(--border);border-radius:13px;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s;}
.forwhom-item:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(54,109,255,0.13);border-color:rgba(54,109,255,0.25);background:white;}
.forwhom-icon{width:30px;height:30px;background:#dcfce7;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.forwhom-text{font-size:0.9rem;color:var(--text);font-weight:500;line-height:1.5;}
.forwhom-highlight{background:linear-gradient(135deg,var(--blue-light),#dbeafe);border-radius:20px;padding:36px;text-align:center;}
.forwhom-highlight-num{font-size:3.5rem;font-weight:800;color:var(--blue);letter-spacing:-2px;line-height:1;margin-bottom:8px;}
.forwhom-highlight-label{font-size:0.9rem;color:var(--text2);line-height:1.6;}

/* PROJECTS */
.projects-section{background:var(--bg);}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:20px;}
.project-card{background:white;border:1.5px solid var(--border);border-radius:var(--radius);padding:26px;cursor:pointer;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s;position:relative;overflow:hidden;}
.project-card::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--blue),#6b8eff);transform:scaleX(0);transition:transform 0.3s;transform-origin:left;}
.project-card:hover{transform:translateY(-5px);box-shadow:var(--shadow-hover);border-color:rgba(54,109,255,0.25);}
.project-card:hover::after{transform:scaleX(1);}
.project-card-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;}
.project-name{font-size:1.05rem;font-weight:700;color:var(--text);}
.project-status{font-size:0.7rem;font-weight:700;padding:4px 10px;border-radius:50px;}
.status-green{background:#dcfce7;color:#15803d;}
.status-blue{background:#dbeafe;color:#1d4ed8;}
.project-meta{display:flex;gap:14px;font-size:0.8rem;color:var(--text2);margin-bottom:18px;flex-wrap:wrap;}
.project-meta-item{display:flex;align-items:center;gap:5px;}
.project-cta{display:flex;align-items:center;gap:5px;color:var(--blue);font-size:0.83rem;font-weight:700;text-decoration:none;transition:gap 0.2s;}
.project-card:hover .project-cta{gap:9px;}

/* WHY */
.why-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:20px;}
.why-card{background:white;border:1.5px solid var(--border);border-radius:var(--radius);padding:30px 26px;transition:transform 0.25s,box-shadow 0.25s;}
.why-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-hover);}
.why-icon{width:50px;height:50px;background:var(--blue-light);border-radius:13px;display:flex;align-items:center;justify-content:center;margin-bottom:1.1rem;}
.why-title{font-size:0.95rem;font-weight:700;color:var(--text);margin-bottom:0.5rem;}
.why-text{font-size:0.83rem;color:var(--text2);line-height:1.7;}

/* STEPS */
.steps-section{background:white;}
.steps-wrap{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;max-width:1080px;margin:0 auto;}
.steps-sticky{position:sticky;top:100px;}
.steps-photo{width:100%;aspect-ratio:3/4;border-radius:24px;overflow:hidden;background:linear-gradient(160deg,#e0e7ff 0%,#dbeafe 100%);display:flex;align-items:center;justify-content:center;margin-top:2rem;}
.steps-photo-inner{text-align:center;padding:40px;}
.steps-photo-big{font-size:6rem;font-weight:800;color:var(--blue);opacity:0.12;line-height:1;letter-spacing:-4px;}
.steps-photo-label{font-size:0.85rem;color:var(--text2);font-weight:600;margin-top:8px;}
.steps-right{position:relative;padding-left:20px;}
.steps-line{position:absolute;left:19px;top:20px;bottom:20px;width:2px;background:var(--border);}
.step-item{padding:0 0 40px 52px;position:relative;cursor:default;}
.step-item:last-child{padding-bottom:0;}
.step-num{position:absolute;left:0;top:0;width:40px;height:40px;border-radius:50%;background:#f1f5f9;color:#94a3b8;font-weight:800;font-size:0.85rem;display:flex;align-items:center;justify-content:center;border:2px solid var(--border);transition:all 0.35s;}
.step-item.active .step-num{background:var(--blue);color:white;border-color:var(--blue);box-shadow:0 4px 16px rgba(54,109,255,0.35);}
.step-title{font-size:1.1rem;font-weight:800;color:#94a3b8;margin-bottom:8px;padding-top:8px;transition:color 0.3s;}
.step-item.active .step-title{color:var(--text);}
.step-text{font-size:0.87rem;color:var(--text2);line-height:1.7;opacity:0.4;transition:opacity 0.3s;}
.step-item.active .step-text{opacity:1;}

/* CALCULATOR */
.calc-section{background:linear-gradient(135deg,#0f172a,#1e3a8a);padding:90px 24px;}
.calc-wrap{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;max-width:1080px;margin:0 auto;}
.calc-box{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:36px;}
.calc-label-dark{font-size:0.82rem;font-weight:600;color:#94a3b8;margin-bottom:10px;}
.calc-amount-display{font-size:2.2rem;font-weight:800;color:white;margin-bottom:16px;letter-spacing:-1px;}
.calc-slider-dark{width:100%;height:6px;border-radius:3px;background:rgba(255,255,255,0.15);outline:none;cursor:pointer;-webkit-appearance:none;margin-bottom:8px;}
.calc-slider-dark::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--blue);cursor:pointer;}
.calc-range-labels{display:flex;justify-content:space-between;font-size:0.72rem;color:#64748b;margin-bottom:24px;}
.calc-note{font-size:0.72rem;color:#475569;margin-top:12px;line-height:1.5;}

/* TEAM */
.team-section{background:var(--bg);}
.team-intro{background:white;border:1.5px solid var(--border);border-radius:20px;padding:36px;margin-bottom:2rem;}
.team-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;}
.team-card{background:white;border:1.5px solid var(--border);border-radius:var(--radius);padding:28px;text-align:center;transition:transform 0.25s,box-shadow 0.25s;}
.team-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-hover);}
.team-avatar{width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,var(--blue-light),#dbeafe);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem;font-weight:800;color:var(--blue);}
.team-name{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:4px;}
.team-role{font-size:0.75rem;font-weight:700;color:var(--blue);margin-bottom:0.75rem;text-transform:uppercase;letter-spacing:0.05em;}
.team-desc{font-size:0.82rem;color:var(--text2);line-height:1.65;}

/* GUARANTEE */
.guarantee-section{background:white;}
.guarantee-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.guarantee-bullets{display:flex;flex-direction:column;gap:16px;margin-top:2rem;}
.g-bullet{display:flex;align-items:flex-start;gap:14px;background:var(--bg);border:1.5px solid var(--border);border-radius:13px;padding:18px;}
.g-bullet-icon{width:38px;height:38px;background:var(--blue-light);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.g-bullet-title{font-size:0.9rem;font-weight:700;color:var(--text);margin-bottom:3px;}
.g-bullet-text{font-size:0.8rem;color:var(--text2);line-height:1.55;}
.guarantee-card{background:linear-gradient(135deg,var(--blue),#1a4fd6);border-radius:22px;padding:44px;text-align:center;}
.guarantee-card-num{font-size:4.5rem;font-weight:800;color:white;letter-spacing:-3px;line-height:1;margin-bottom:8px;}
.guarantee-card-label{font-size:0.95rem;color:rgba(255,255,255,0.85);font-weight:500;}
.guarantee-card-sub{font-size:0.8rem;color:rgba(255,255,255,0.55);line-height:1.6;margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,0.2);}

/* TESTIMONIALS */
.testimonials-section{background:var(--bg);}
.t-card{background:white;border:1.5px solid var(--border);border-radius:20px;padding:40px;max-width:680px;margin:0 auto;}
.t-stars{color:var(--gold);font-size:1rem;letter-spacing:2px;margin-bottom:1.25rem;}
.t-text{font-size:1rem;color:var(--text);line-height:1.75;font-style:italic;margin-bottom:1.5rem;}
.t-author{font-weight:700;color:var(--text);font-size:0.9rem;}
.t-role{font-size:0.8rem;color:var(--text2);margin-top:2px;}
.t-dots{display:flex;justify-content:center;gap:8px;margin-top:1.5rem;}
.t-dot{width:7px;height:7px;border-radius:50%;background:var(--border);border:none;cursor:pointer;transition:all 0.2s;}
.t-dot.active{background:var(--blue);transform:scale(1.4);}

/* FAQ */
.faq-section{background:white;}
.faq-list{max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;}
.faq-item{background:var(--bg);border:1.5px solid var(--border);border-radius:13px;overflow:hidden;transition:border-color 0.2s;}
.faq-item.open{border-color:rgba(54,109,255,0.3);}
.faq-q{width:100%;text-align:left;padding:18px 22px;font-family:inherit;font-size:0.9rem;font-weight:700;color:var(--text);background:none;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;}
.faq-icon{width:26px;height:26px;background:var(--blue-light);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform 0.3s,background 0.2s;}
.faq-item.open .faq-icon{transform:rotate(45deg);background:var(--blue);}
.faq-item.open .faq-icon svg{stroke:white;}
.faq-a{font-size:0.87rem;color:var(--text2);line-height:1.7;padding:14px 22px 18px;border-top:1px solid var(--border);}

/* FORM */
.form-section{background:var(--bg);}
.form-wrap{max-width:660px;margin:0 auto;background:white;border-radius:24px;padding:48px;box-shadow:0 8px 48px rgba(54,109,255,0.09);border:1.5px solid var(--border);}
.form-head{text-align:center;margin-bottom:2rem;}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.fg{display:flex;flex-direction:column;gap:5px;}
.fg.full{grid-column:1/-1;}
.f-label{font-size:0.78rem;font-weight:600;color:var(--text);}
.f-input,.f-select,.f-textarea{font-family:inherit;font-size:0.875rem;color:var(--text);border:1.5px solid var(--border);border-radius:10px;padding:11px 14px;background:var(--bg);outline:none;transition:border-color 0.2s;}
.f-input:focus,.f-select:focus,.f-textarea:focus{border-color:var(--blue);background:white;}
.f-textarea{resize:vertical;min-height:90px;}
.f-check{display:flex;gap:9px;align-items:flex-start;}
.f-check-label{font-size:0.8rem;color:var(--text2);line-height:1.55;}
.f-submit{width:100%;padding:14px;font-size:0.95rem;font-weight:700;background:var(--blue);color:white;border:none;border-radius:12px;font-family:inherit;cursor:pointer;margin-top:1.25rem;transition:all 0.2s;}
.f-submit:hover{background:var(--blue-dark);transform:translateY(-1px);}

/* MINI CTA */
.mini-cta{background:var(--blue-light);border:1px solid rgba(54,109,255,0.15);border-radius:16px;padding:26px 30px;display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:2.5rem;}
.mini-cta-title{font-size:0.95rem;font-weight:700;color:var(--text);}
.mini-cta-sub{font-size:0.8rem;color:var(--text2);margin-top:3px;}

/* FOOTER */
.footer{background:var(--text);color:#94a3b8;padding:60px 6% 28px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px;margin-bottom:44px;}
.footer-logo{font-size:1rem;font-weight:800;color:white;margin-bottom:0.6rem;}
.footer-logo span{color:var(--blue);}
.footer-motto{font-size:0.83rem;line-height:1.65;max-width:260px;}
.footer-col-title{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:white;margin-bottom:1rem;}
.footer-links{display:flex;flex-direction:column;gap:8px;}
.footer-links a{color:#94a3b8;text-decoration:none;font-size:0.83rem;transition:color 0.2s;}
.footer-links a:hover{color:white;}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.07);padding-top:22px;display:flex;justify-content:space-between;font-size:0.77rem;gap:20px;flex-wrap:wrap;}

/* RESPONSIVE */
@media(max-width:1024px){.hero-inner,.calc-wrap,.guarantee-grid,.forwhom-grid{grid-template-columns:1fr;}}
@media(max-width:900px){.navbar-links{display:none;}.steps-wrap{grid-template-columns:1fr;}.footer-grid{grid-template-columns:1fr 1fr;}.stats-grid{grid-template-columns:repeat(2,1fr);}.mini-cta{flex-direction:column;text-align:center;}}
@media(max-width:600px){.hero h1{font-size:2rem;}.hero-ctas{flex-direction:column;}.footer-grid{grid-template-columns:1fr;}.form-wrap{padding:26px 18px;}.form-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar">
  <a class="navbar-logo" href="#">investuj<span>bezstarosti</span>.cz</a>
  <ul class="navbar-links">
    <li><a href="#projekty">Projekty</a></li>
    <li><a href="#kroky">Jak to funguje</a></li>
    <li><a href="#prokoho">Pro koho</a></li>
    <li><a href="#tym">Tým</a></li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#kontakt">Kontakt</a></li>
  </ul>
  <button class="btn-primary" onclick="go('kontakt')">Nezávazná konzultace</button>
</nav>

<!-- HERO -->
<section id="hero" class="hero">
  <div class="hero-shape hero-shape-1"></div>
  <div class="hero-shape hero-shape-2"></div>
  <div class="hero-inner">
    <div>
      <div class="hero-eyebrow"><div class="hero-dot"></div>Investiční platforma</div>
      <h1>Investujte do nemovitostí.<br/><span class="accent">Bez starostí.</span></h1>
      <div class="hero-points">
        <div class="hero-point"><div class="hero-point-dot"></div>Vlastníte konkrétní byt.</div>
        <div class="hero-point"><div class="hero-point-dot"></div>Máte předem stanovený měsíční příjem.</div>
        <div class="hero-point"><div class="hero-point-dot"></div>O správu se staráme my.</div>
      </div>
      <div class="hero-badges">
        <div class="hero-badge"><div class="badge-check"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>All-in správa</div>
        <div class="hero-badge"><div class="badge-check"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>Garantovaná výše příjmu</div>
        <div class="hero-badge"><div class="badge-check"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>Reálné vlastnictví</div>
      </div>
      <div class="hero-ctas">
        <button class="btn-primary" onclick="go('projekty')">Zjistit dostupné projekty</button>
        <button class="btn-secondary" onclick="go('kontakt')">Nezávazná konzultace</button>
      </div>
    </div>
    <div class="hero-card">
      <div class="hero-card-label">Orientační výpočet při investici <span id="heroAmountLabel">3,0</span> mil. Kč</div>
      <input type="range" class="calc-slider" min="500000" max="10000000" step="100000" value="3000000" oninput="updateHeroCalc(this.value)"/>
      <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--text2);margin-bottom:1.25rem;"><span>500 tis.</span><span>10 mil.</span></div>
      <div style="background:var(--blue-light);border:1px solid rgba(54,109,255,0.15);border-radius:12px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:0.7rem;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Garantovaný měsíční příjem</div>
        <div id="heroMonthly" style="font-size:1.9rem;font-weight:800;color:var(--blue);letter-spacing:-1px;line-height:1;">12 500 Kč</div>
        <div id="heroYearly" style="font-size:0.72rem;color:var(--text2);margin-top:3px;">vypláceno každý měsíc · 150 000 Kč ročně</div>
      </div>
      <div style="background:#fefce8;border:1px solid rgba(245,158,11,0.2);border-radius:12px;padding:14px 16px;">
        <div style="font-size:0.7rem;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Možné kapitálové zhodnocení</div>
        <div id="heroGrowth" style="font-size:1.9rem;font-weight:800;color:#d97706;letter-spacing:-1px;line-height:1;">+90 000 Kč</div>
        <div style="font-size:0.72rem;color:#92400e;margin-top:3px;">ročně · konzervativní scénář 3 % p.a.</div>
      </div>
      <button class="hero-card-cta" onclick="go('kontakt')">Chci konzultaci →</button>
      <div class="hero-card-note">Výpočet je orientační. Konkrétní podmínky jsou vždy sjednány individuálně smluvně.</div>
    </div>
  </div>
</section>

<!-- STATS -->
<div class="stats-section">
  <div class="stats-grid reveal">
    <div><div class="stat-num" id="s1">247+</div><div class="stat-label">investorů</div></div>
    <div><div class="stat-num" id="s2">300+</div><div class="stat-label">nemovitostí ve správě</div></div>
    <div><div class="stat-num" id="s3">8+</div><div class="stat-label">let zkušeností</div></div>
    <div><div class="stat-num" id="s4">350M Kč</div><div class="stat-label">hodnota portfolia</div></div>
  </div>
</div>

<!-- PRO KOHO -->
<section id="prokoho" class="section forwhom-section">
  <div class="forwhom-grid">
    <div class="reveal">
      <div class="section-label">Pro koho</div>
      <h2 class="section-title">Pro koho je tato investice vhodná?</h2>
      <p class="section-sub">Tento model dává smysl investorům, kteří chtějí jistotu, přehlednost a reálné vlastnictví.</p>
      <div class="forwhom-list">
        <div class="forwhom-item"><div class="forwhom-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div><div class="forwhom-text">Pro investory, kteří dnes kupují fondy nebo dluhopisy a chtějí vlastnit konkrétní nemovitost.</div></div>
        <div class="forwhom-item"><div class="forwhom-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div><div class="forwhom-text">Pro ty, kteří chtějí reálné aktivum – ne jen podíl ve fondu.</div></div>
        <div class="forwhom-item"><div class="forwhom-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div><div class="forwhom-text">Pro investory, kteří nechtějí řešit nájemníky, opravy ani provoz.</div></div>
        <div class="forwhom-item"><div class="forwhom-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div><div class="forwhom-text">Pro ty, kteří ocení předem stanovenou výši měsíčního příjmu.</div></div>
        <div class="forwhom-item"><div class="forwhom-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div><div class="forwhom-text">Pro investory, kteří preferují menší, přehledné projekty a osobní přístup.</div></div>
      </div>
    </div>
    <div class="reveal d2">
      <div class="forwhom-highlight">
        <div class="forwhom-highlight-num">300+</div>
        <div class="forwhom-highlight-label">nemovitostí v aktivní správě z existujícího portfolia nakoupeného jako celek</div>
        <div style="margin-top:2rem;padding-top:2rem;border-top:1px solid rgba(54,109,255,0.15);font-size:0.85rem;color:var(--text2);line-height:1.7;">Neprodáváme jednotlivé byty na realitním trhu. Odprodáváme část prověřeného portfolia investorům s garantovanou správou.</div>
      </div>
      <div style="margin-top:1.25rem;"><button class="btn-primary" style="width:100%;justify-content:center;" onclick="go('kontakt')">Zjistit více na konzultaci</button></div>
    </div>
  </div>
</section>

<!-- PROJEKTY -->
<section id="projekty" class="section projects-section">
  <div class="section-header reveal">
    <div class="section-label">Projekty</div>
    <h2 class="section-title">Aktuální investiční projekty</h2>
    <p class="section-sub">Vyberte si projekt. Pokud si nejste jistí, rádi poradíme nebo sestavíme portfolio.</p>
  </div>
  <div class="projects-grid">
    <div class="project-card reveal d1"><div class="project-card-header"><div class="project-name">Projekt Vinohrady</div><div class="project-status status-green">Obsazený</div></div><div class="project-meta"><div class="project-meta-item">📍 Praha 2 – Vinohrady</div><div class="project-meta-item">🏠 Byt 2+kk</div></div><a href="#" class="project-cta">Detail projektu →</a></div>
    <div class="project-card reveal d2"><div class="project-card-header"><div class="project-name">Projekt Holešovice</div><div class="project-status status-blue">Připravený</div></div><div class="project-meta"><div class="project-meta-item">📍 Praha 7 – Holešovice</div><div class="project-meta-item">🏠 Byt 1+kk</div></div><a href="#" class="project-cta">Detail projektu →</a></div>
    <div class="project-card reveal d3"><div class="project-card-header"><div class="project-name">Projekt Žižkov</div><div class="project-status status-blue">Připravený</div></div><div class="project-meta"><div class="project-meta-item">📍 Praha 3 – Žižkov</div><div class="project-meta-item">🏠 Byt 2+1</div></div><a href="#" class="project-cta">Detail projektu →</a></div>
    <div class="project-card reveal d1"><div class="project-card-header"><div class="project-name">Projekt Smíchov</div><div class="project-status status-green">Obsazený</div></div><div class="project-meta"><div class="project-meta-item">📍 Praha 5 – Smíchov</div><div class="project-meta-item">🏠 Byt 3+kk</div></div><a href="#" class="project-cta">Detail projektu →</a></div>
    <div class="project-card reveal d2"><div class="project-card-header"><div class="project-name">Projekt Nusle</div><div class="project-status status-blue">Připravený</div></div><div class="project-meta"><div class="project-meta-item">📍 Praha 4 – Nusle</div><div class="project-meta-item">🏠 Byt 2+kk</div></div><a href="#" class="project-cta">Detail projektu →</a></div>
    <div class="project-card reveal d3"><div class="project-card-header"><div class="project-name">Projekt Dejvice</div><div class="project-status status-green">Obsazený</div></div><div class="project-meta"><div class="project-meta-item">📍 Praha 6 – Dejvice</div><div class="project-meta-item">🏠 Byt 1+kk</div></div><a href="#" class="project-cta">Detail projektu →</a></div>
  </div>
  <div class="mini-cta reveal">
    <div><div class="mini-cta-title">Nevíte, který projekt vybrat?</div><div class="mini-cta-sub">Rádi sestavíme portfolio na míru vašim cílům.</div></div>
    <button class="btn-primary" onclick="go('kontakt')">Nezávazná konzultace</button>
  </div>
</section>

<!-- KALKULAČKA -->
<section class="calc-section">
  <div class="calc-wrap reveal">
    <div>
      <div class="section-label" style="color:#93c5fd;">Kalkulačka příjmu</div>
      <h2 class="section-title" style="color:white;">Orientační výpočet měsíčního příjmu</h2>
      <p class="section-sub" style="color:#94a3b8;">Zadejte výši investice a uvidíte orientační výši měsíčního příjmu.</p>
    </div>
    <div class="calc-box">
      <div style="display:flex;margin-bottom:20px;background:rgba(255,255,255,0.07);border-radius:10px;padding:3px;">
        <button id="modeNajem" onclick="setCalcMode('najem')" style="flex:1;padding:9px;border:none;border-radius:8px;font-family:inherit;font-size:0.8rem;font-weight:700;cursor:pointer;background:white;color:#0f172a;transition:all 0.2s;">Nájemní výnos</button>
        <button id="modeRust" onclick="setCalcMode('rust')" style="flex:1;padding:9px;border:none;border-radius:8px;font-family:inherit;font-size:0.8rem;font-weight:700;cursor:pointer;background:transparent;color:#94a3b8;transition:all 0.2s;">+ Růst hodnoty</button>
      </div>
      <div class="calc-label-dark">Výše investice</div>
      <div id="calcDisplay" class="calc-amount-display">3,00 mil. Kč</div>
      <input type="range" class="calc-slider-dark" min="500000" max="10000000" step="100000" value="3000000" oninput="updateCalc(this.value)"/>
      <div class="calc-range-labels"><span>500 tis. Kč</span><span>10 mil. Kč</span></div>
      <div style="background:rgba(54,109,255,0.15);border:1px solid rgba(54,109,255,0.3);border-radius:12px;padding:16px 18px;margin-bottom:10px;">
        <div style="font-size:0.68rem;font-weight:700;color:#93c5fd;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">Garantovaný měsíční příjem</div>
        <div id="calcMonthly" style="font-size:2rem;font-weight:800;color:#366dff;letter-spacing:-1px;line-height:1;">12 500 Kč</div>
        <div id="calcYearly" style="font-size:0.73rem;color:#64748b;margin-top:4px;">vypláceno každý měsíc · 150 000 Kč ročně</div>
      </div>
      <div id="rustBlock" style="display:none;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:16px 18px;margin-bottom:10px;">
        <div style="font-size:0.68rem;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">Možné kapitálové zhodnocení</div>
        <div id="calcGrowth" style="font-size:2rem;font-weight:800;color:#fbbf24;letter-spacing:-1px;line-height:1;">+90 000 Kč</div>
        <div style="font-size:0.73rem;color:#78716c;margin-top:4px;">ročně · konzervativní scénář 3 % p.a.</div>
      </div>
      <div class="calc-note">* Výpočet je orientační. Konkrétní podmínky jsou vždy sjednány individuálně smluvně.</div>
    </div>
  </div>
  <div style="text-align:center;margin-top:2.5rem;">
    <p style="color:#94a3b8;font-size:0.95rem;margin-bottom:1rem;">Chcete konkrétní nabídku pro vaše možnosti?</p>
    <button class="btn-primary" style="font-size:1rem;padding:13px 32px;" onclick="go('kontakt')">Získat nezávaznou kalkulaci</button>
  </div>
</section>

<!-- JAK TO FUNGUJE -->
<section id="kroky" class="section steps-section">
  <div class="steps-wrap">
    <div class="steps-sticky reveal">
      <div class="section-label">Jak to funguje</div>
      <h2 class="section-title">Čtyři kroky k pravidelnému příjmu</h2>
      <p class="section-sub">Jednoduchý proces. Žádná složitost. Vše vyřešíme s vámi.</p>
      <div class="steps-photo"><div class="steps-photo-inner"><div class="steps-photo-big" id="activeStepNum">01</div><div class="steps-photo-label">z celkem 4 kroků</div></div></div>
    </div>
    <div class="steps-right">
      <div class="steps-line"></div>
      <div class="step-item active" onmouseenter="setStep(0)"><div class="step-num">1</div><div class="step-content"><div class="step-title">Vyberete projekt</div><div class="step-text">Prozkoumáte dostupné projekty nebo nám sdělíte vaše investiční cíle.</div></div></div>
      <div class="step-item" onmouseenter="setStep(1)"><div class="step-num">2</div><div class="step-content"><div class="step-title">Stanovíme podmínky</div><div class="step-text">Probereme vše na konzultaci – jasně a bez skrytých informací.</div></div></div>
      <div class="step-item" onmouseenter="setStep(2)"><div class="step-num">3</div><div class="step-content"><div class="step-title">Nabudete vlastnictví</div><div class="step-text">Nemovitost přejde do vašeho vlastnictví. Vše administrativní vyřešíme s vámi.</div></div></div>
      <div class="step-item" onmouseenter="setStep(3)"><div class="step-num">4</div><div class="step-content"><div class="step-title">Získáváte předem stanovený příjem</div><div class="step-text">Od prvního dne se staráme o vše. Vy přijímáte pravidelný měsíční příjem.</div></div></div>
    </div>
  </div>
</section>

<!-- PROČ -->
<section class="section" style="background:var(--bg);">
  <div class="section-header reveal">
    <div class="section-label">Proč investujbezstarosti</div>
    <h2 class="section-title">Jednoduchost. Předvídatelnost. Klid.</h2>
  </div>
  <div class="why-grid">
    <div class="why-card reveal d1"><div class="why-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></div><div class="why-title">Garantovaná výše měsíčního příjmu</div><div class="why-text">Smluvně stanovená výše příjmu z nájmu odpovídající 5 % ročně. Víte přesně, kolik dostanete – bez překvapení.</div></div>
    <div class="why-card reveal d2"><div class="why-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></div><div class="why-title">All-in správa bez operativy</div><div class="why-text">Nájemníci, opravy, provoz – vše řešíme za vás. Vy se staráte jen o to, co vás baví.</div></div>
    <div class="why-card reveal d3"><div class="why-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></div><div class="why-title">Prověřený systém výběru nájemníků</div><div class="why-text">Nájemníky vybíráme systematicky a zodpovědně. Váš byt je v dobrých rukou.</div></div>
    <div class="why-card reveal d4"><div class="why-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div><div class="why-title">Servisní a technický tým</div><div class="why-text">Technické záležitosti zařídíme. Máme vlastní tým, který se stará o vše potřebné.</div></div>
  </div>
</section>

<!-- TÝM -->
<section id="tym" class="section team-section">
  <div class="section-header reveal" style="text-align:center;">
    <div class="section-label">Za projektem stojí</div>
    <h2 class="section-title">Tým s historií a portfoliem</h2>
  </div>
  <div class="team-intro reveal">
    <div style="font-size:1rem;color:var(--text2);line-height:1.75;">Nejsme nová platforma. Stojí za námi reálné portfolio nemovitostí nakoupených jako celek, s existujícími nájemníky a provozní historií. Odprodáváme část tohoto portfolia investorům s garancí správy a příjmu. Každý projekt má za sebou tým lidí, kteří za výsledky ručí osobně.</div>
  </div>
  <div class="team-grid">
    <div class="team-card reveal d1"><div class="team-avatar">J</div><div class="team-name">Jan Novák</div><div class="team-role">Zakladatel & CEO</div><div class="team-desc">15 let zkušeností v realitním investování. Vybudoval portfolio přes 200 nemovitostí.</div></div>
    <div class="team-card reveal d2"><div class="team-avatar">P</div><div class="team-name">Petra Svobodová</div><div class="team-role">Ředitelka správy</div><div class="team-desc">Expertka na správu nemovitostí. Garantuje hladký provoz každého projektu.</div></div>
    <div class="team-card reveal d3"><div class="team-avatar">M</div><div class="team-name">Michal Dvořák</div><div class="team-role">Investiční poradce</div><div class="team-desc">Pomáhá investorům najít správné řešení. Přes 150 spokojených klientů.</div></div>
  </div>
  <div class="mini-cta reveal">
    <div><div class="mini-cta-title">Chcete nás poznat osobně?</div><div class="mini-cta-sub">Rádi se setkáme a probereme vaše investiční cíle.</div></div>
    <button class="btn-primary" onclick="go('kontakt')">Domluvit schůzku</button>
  </div>
</section>

<!-- GARANCE -->
<section id="garance" class="section guarantee-section">
  <div class="guarantee-grid">
    <div class="reveal">
      <div class="section-label">Garance a správa</div>
      <h2 class="section-title">Garantovaná výše příjmu a bezstarostná správa</h2>
      <p class="section-sub">Vlastníte nemovitost, dostáváte smluvně stanovenou výši měsíčního příjmu z nájmu – a my se staráme o vše ostatní.</p>
      <div class="guarantee-bullets">
        <div class="g-bullet"><div class="g-bullet-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div><div class="g-bullet-title">Správu řešíme za vás</div><div class="g-bullet-text">Kompletní provoz nemovitosti je v našich rukou.</div></div></div>
        <div class="g-bullet"><div class="g-bullet-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><div><div class="g-bullet-title">Nájemníky vybíráme systémově</div><div class="g-bullet-text">Propracovaný proces výběru nájemníků chrání vaši investici.</div></div></div>
        <div class="g-bullet"><div class="g-bullet-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#366dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div><div><div class="g-bullet-title">Technické věci zařídíme</div><div class="g-bullet-text">Náš technický tým se postará o vše bez vašeho zapojení.</div></div></div>
      </div>
      <div style="margin-top:2rem;"><button class="btn-primary" onclick="go('kontakt')">Získat konzultaci</button></div>
    </div>
    <div class="reveal d2">
      <div class="guarantee-card">
        <div class="guarantee-card-num">5 %</div>
        <div class="guarantee-card-label">garantovaná výše ročního příjmu z nájmu</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.7);margin-top:0.5rem;">(odpovídající garantované výši měsíčního příjmu)</div>
        <div class="guarantee-card-sub">Fixní měsíční příjem. Předem stanovená částka. Žádná překvapení.</div>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="section testimonials-section">
  <div class="section-header reveal" style="text-align:center;">
    <div class="section-label">Co říkají investoři</div>
    <h2 class="section-title">Zkušenosti našich klientů</h2>
  </div>
  <div class="reveal">
    <div class="t-card">
      <div class="t-stars">★★★★★</div>
      <div id="tText" class="t-text">„Oceňuji, že vím dopředu přesně, kolik každý měsíc dostanu. Žádná překvapení, žádné starosti s nájemníky."</div>
      <div id="tAuthor" class="t-author">Martin K.</div>
      <div id="tRole" class="t-role">Investor, Praha</div>
    </div>
    <div class="t-dots">
      <button class="t-dot active" onclick="setTestimonial(0)"></button>
      <button class="t-dot" onclick="setTestimonial(1)"></button>
      <button class="t-dot" onclick="setTestimonial(2)"></button>
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" class="section faq-section">
  <div class="section-header reveal" style="text-align:center;max-width:600px;margin:0 auto 3rem;">
    <div class="section-label">FAQ</div>
    <h2 class="section-title">Časté otázky</h2>
  </div>
  <div class="faq-list" id="faqList"></div>
  <div class="mini-cta reveal" style="max-width:700px;margin:2rem auto 0;">
    <div><div class="mini-cta-title">Máte další otázky?</div><div class="mini-cta-sub">Rádi odpovíme na vše při nezávazné konzultaci.</div></div>
    <button class="btn-primary" onclick="go('kontakt')">Konzultace zdarma</button>
  </div>
</section>

<!-- FORM -->
<section id="kontakt" class="section form-section">
  <div class="form-wrap reveal">
    <div id="formSuccess" style="display:none;text-align:center;padding:32px 0;">
      <div style="width:68px;height:68px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;animation:pop 0.5s cubic-bezier(0.34,1.56,0.64,1);">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div style="font-size:1.3rem;font-weight:800;margin-bottom:0.5rem;">Odesláno! Brzy se ozveme.</div>
      <div style="color:var(--text2);font-size:0.87rem;margin-bottom:1.5rem;line-height:1.6;">Vaši žádost jsme přijali. Ozveme se vám co nejdříve a doporučíme vhodné řešení.</div>
    </div>
    <div id="contactForm">
      <div class="form-head">
        <div class="section-label" style="display:flex;justify-content:center;">Kontakt</div>
        <h2 class="section-title">Nezávazná konzultace</h2>
        <p class="section-sub" style="margin:0 auto;">Ozveme se a doporučíme vhodné řešení nebo projekty.</p>
      </div>
      <div class="form-grid">
        <div class="fg full"><label class="f-label">Jméno a příjmení / Firma</label><input class="f-input" placeholder="Jan Novák"/></div>
        <div class="fg"><label class="f-label">Email</label><input class="f-input" type="email" placeholder="jan@email.cz"/></div>
        <div class="fg"><label class="f-label">Telefon</label><input class="f-input" type="tel" placeholder="+420 777 000 000"/></div>
        <div class="fg full"><label class="f-label">Zájem</label><select class="f-select"><option value="">Vyberte...</option><option>1 investiční byt</option><option>Více bytů</option><option>Chci poradit s portfoliem</option><option>Jiné</option></select></div>
        <div class="fg full"><label class="f-label">Zpráva (volitelné)</label><textarea class="f-textarea" placeholder="Napište nám cokoli..."></textarea></div>
        <div class="fg full"><div class="f-check"><input type="checkbox" id="gdpr"/><label class="f-check-label" for="gdpr">Souhlasím se zpracováním osobních údajů v souladu s <a href="#" style="color:var(--blue);">GDPR</a>.</label></div></div>
      </div>
      <button class="f-submit" onclick="submitForm()">Odeslat a získat konzultaci →</button>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="footer-grid">
    <div>
      <div class="footer-logo">investuj<span>bezstarosti</span>.cz</div>
      <div class="footer-motto">Vlastníte nemovitost. Dostáváte předem stanovený měsíční příjem. O vše ostatní se staráme my.</div>
    </div>
    <div>
      <div class="footer-col-title">Navigace</div>
      <div class="footer-links"><a href="#projekty">Projekty</a><a href="#kroky">Jak to funguje</a><a href="#prokoho">Pro koho</a><a href="#faq">FAQ</a></div>
    </div>
    <div>
      <div class="footer-col-title">Kontakt</div>
      <div class="footer-links"><a href="mailto:info@investujbezstarosti.cz">info@investujbezstarosti.cz</a><a href="#">+420 000 000 000</a><a href="#">GDPR</a><a href="#">Všeobecné podmínky</a></div>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 investujbezstarosti.cz. Všechna práva vyhrazena.</span>
    <span style="font-size:0.72rem;color:#475569;">Podmínky investice jsou vždy individuálně sjednány smluvně.</span>
  </div>
</footer>

<script>
// SMOOTH SCROLL
function go(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth'});}
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{e.preventDefault();const id=a.getAttribute('href').slice(1);if(id)go(id);});
});

// REVEAL ON SCROLL
const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('revealed');});},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// STATS COUNTER
function animCount(el,target,suffix,dur=1600){
  let s=null;
  const fn=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.floor(e*target)+suffix;if(p<1)requestAnimationFrame(fn);};
  requestAnimationFrame(fn);
}
const so=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){
    animCount(document.getElementById('s1'),247,'+');
    animCount(document.getElementById('s2'),300,'+');
    animCount(document.getElementById('s3'),8,'+');
    animCount(document.getElementById('s4'),350,'M Kč');
    so.disconnect();
  }});
},{threshold:0.1});
so.observe(document.querySelector('.stats-grid'));

// HERO CALC
function updateHeroCalc(val){
  val=parseInt(val);
  const m=Math.round((val*0.05)/12),y=Math.round(val*0.05),g=Math.round(val*0.03);
  document.getElementById('heroAmountLabel').textContent=(val/1e6).toFixed(1).replace('.',',');
  document.getElementById('heroMonthly').textContent=m.toLocaleString('cs-CZ')+' Kč';
  document.getElementById('heroYearly').textContent='vypláceno každý měsíc · '+y.toLocaleString('cs-CZ')+' Kč ročně';
  document.getElementById('heroGrowth').textContent='+'+g.toLocaleString('cs-CZ')+' Kč';
}

// FULL CALC
let cMode='najem';
function setCalcMode(m){
  cMode=m;
  document.getElementById('modeNajem').style.cssText='flex:1;padding:9px;border:none;border-radius:8px;font-family:inherit;font-size:0.8rem;font-weight:700;cursor:pointer;background:'+(m==='najem'?'white':'transparent')+';color:'+(m==='najem'?'#0f172a':'#94a3b8')+';transition:all 0.2s;';
  document.getElementById('modeRust').style.cssText='flex:1;padding:9px;border:none;border-radius:8px;font-family:inherit;font-size:0.8rem;font-weight:700;cursor:pointer;background:'+(m==='rust'?'white':'transparent')+';color:'+(m==='rust'?'#0f172a':'#94a3b8')+';transition:all 0.2s;';
  document.getElementById('rustBlock').style.display=m==='rust'?'block':'none';
}
function updateCalc(val){
  val=parseInt(val);
  const m=Math.round((val*0.05)/12),y=Math.round(val*0.05),g=Math.round(val*0.03);
  document.getElementById('calcDisplay').textContent=(val/1e6).toFixed(2).replace('.',',')+' mil. Kč';
  document.getElementById('calcMonthly').textContent=m.toLocaleString('cs-CZ')+' Kč';
  document.getElementById('calcYearly').textContent='vypláceno každý měsíc · '+y.toLocaleString('cs-CZ')+' Kč ročně';
  document.getElementById('calcGrowth').textContent='+'+g.toLocaleString('cs-CZ')+' Kč';
}

// STEPS
function setStep(i){
  document.querySelectorAll('.step-item').forEach((el,j)=>el.classList.toggle('active',j===i));
  document.getElementById('activeStepNum').textContent='0'+(i+1);
}

// TESTIMONIALS
const T=[
  {text:'Oceňuji, že vím dopředu přesně, kolik každý měsíc dostanu. Žádná překvapení, žádné starosti s nájemníky.',name:'Martin K.',role:'Investor, Praha'},
  {text:'Hledala jsem alternativu k fondům a dluhopisům. Tohle mi dává reálné aktivum i pravidelný příjem zároveň.',name:'Jana H.',role:'Podnikatelka, Brno'},
  {text:'Nemám čas řešit nemovitosti sám. Tady mi opravdu vše zařídí – a já jen přijímám příjem.',name:'Tomáš V.',role:'Lékař, Olomouc'},
];
let ti=0;
function setTestimonial(i){
  ti=i;
  document.getElementById('tText').textContent='„'+T[i].text+'"';
  document.getElementById('tAuthor').textContent=T[i].name;
  document.getElementById('tRole').textContent=T[i].role;
  document.querySelectorAll('.t-dot').forEach((d,j)=>d.classList.toggle('active',j===i));
}
setInterval(()=>setTestimonial((ti+1)%3),4500);

// FAQ
const faqs=[
  {q:'Co přesně znamená garantovaná výše měsíčního příjmu?',a:'Garantovaná výše nájemního příjmu je smluvně sjednána před převodem vlastnictví. Výplata probíhá pravidelně každý měsíc bez ohledu na aktuální obsazenost nemovitosti. Konkrétní podmínky jsou vždy upraveny individuální smlouvou.'},
  {q:'Co když je byt dočasně neobsazený?',a:'Obsazenost řešíme my. Investor pobírá sjednaný měsíční příjem podle smluvních podmínek. Veškerá správa nájemníků, výběr, komunikace i řešení provozu je součástí služby.'},
  {q:'Musím se starat o nájemníky, opravy nebo administrativu?',a:'Ne. Zajišťujeme kompletní správu nemovitosti včetně výběru nájemníků, smluv, vyúčtování, oprav i komunikace. Investor vlastní nemovitost, ale provoz řešíme my.'},
  {q:'Jak je řešeno financování nemovitosti?',a:'Pomůžeme vám nastavit optimální kombinaci vlastních zdrojů a bankovního financování. Cílem je nastavit strukturu investice tak, aby odpovídala vaší finanční situaci a investičním cílům.'},
  {q:'Je možné nemovitost v budoucnu prodat?',a:'Ano. Nemovitost je ve vašem osobním vlastnictví a můžete ji kdykoliv prodat podle podmínek smlouvy. Možné kapitálové zhodnocení se realizuje při prodeji.'},
  {q:'Je tato investice vhodná i pro začínající investory?',a:'Ano, pokud hledáte stabilní měsíční příjem a nechcete řešit provoz nemovitosti. Před každou investicí společně posoudíme, zda projekt odpovídá vaší situaci.'},
];
let oF=null;
const fL=document.getElementById('faqList');
faqs.forEach((f,i)=>{
  const d=document.createElement('div');d.className='faq-item';
  d.innerHTML=`<button class="faq-q" onclick="tFaq(${i})">${f.q}<div class="faq-icon"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></div></button><div class="faq-a" id="fa${i}" style="display:none;">${f.a}</div>`;
  fL.appendChild(d);
});
function tFaq(i){
  const isO=oF===i;
  if(oF!==null){document.getElementById('fa'+oF).style.display='none';fL.children[oF].classList.remove('open');}
  oF=isO?null:i;
  if(!isO){document.getElementById('fa'+i).style.display='block';fL.children[i].classList.add('open');}
}

// FORM
function submitForm(){document.getElementById('contactForm').style.display='none';document.getElementById('formSuccess').style.display='block';}
</script>
</body>
</html>
