"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const projects = [
  { name: "Projekt Vinohrady", location: "Praha 2 – Vinohrady", type: "Byt 2+kk", status: "Obsazený", slug: "vinohrady", statusColor: "green" },
  { name: "Projekt Holešovice", location: "Praha 7 – Holešovice", type: "Byt 1+kk", status: "Připravený", statusColor: "blue" },
  { name: "Projekt Žižkov", location: "Praha 3 – Žižkov", type: "Byt 2+1", status: "Připravený", statusColor: "blue" },
  { name: "Projekt Smíchov", location: "Praha 5 – Smíchov", type: "Byt 3+kk", status: "Obsazený", statusColor: "green" },
  { name: "Projekt Nusle", location: "Praha 4 – Nusle", type: "Byt 2+kk", status: "Připravený", statusColor: "blue" },
  { name: "Projekt Dejvice", location: "Praha 6 – Dejvice", type: "Byt 1+kk", status: "Obsazený", statusColor: "green" },
];

const faqs = [
  { q: "Co přesně znamená garantovaná výše měsíčního příjmu?", a: "Garantovaná výše nájemního příjmu je smluvně sjednána před převodem vlastnictví. Výplata probíhá pravidelně každý měsíc bez ohledu na aktuální obsazenost nemovitosti. Konkrétní podmínky jsou vždy upraveny individuální smlouvou." },
  { q: "Co když je byt dočasně neobsazený?", a: "Obsazenost řešíme my. Investor pobírá sjednaný měsíční příjem podle smluvních podmínek. Veškerá správa nájemníků, výběr, komunikace i řešení provozu je součástí služby." },
  { q: "Musím se starat o nájemníky, opravy nebo administrativu?", a: "Ne. Zajišťujeme kompletní správu nemovitosti včetně výběru nájemníků, smluv, vyúčtování, oprav i komunikace. Investor vlastní nemovitost, ale provoz řešíme my." },
  { q: "Jak je řešeno financování nemovitosti?", a: "Pomůžeme vám nastavit optimální kombinaci vlastních zdrojů a bankovního financování. Cílem je nastavit strukturu investice tak, aby odpovídala vaší finanční situaci a investičním cílům." },
  { q: "Je možné nemovitost v budoucnu prodat?", a: "Ano. Nemovitost je ve vašem osobním vlastnictví a můžete ji kdykoliv prodat podle podmínek smlouvy. Možné kapitálové zhodnocení se realizuje při prodeji." },
  { q: "Je tato investice vhodná i pro začínající investory?", a: "Ano, pokud hledáte stabilní měsíční příjem a nechcete řešit provoz nemovitosti. Před každou investicí společně posoudíme, zda projekt odpovídá vaší situaci." },
];

const testimonials = [
  { name: "Martin K.", role: "Investor, Praha", text: "Oceňuji, že vím dopředu přesně, kolik každý měsíc dostanu. Žádná překvapení, žádné starosti s nájemníky.", stars: 5 },
  { name: "Jana H.", role: "Podnikatelka, Brno", text: "Hledala jsem alternativu k fondům a dluhopisům. Tohle mi dává reálné aktivum i pravidelný příjem zároveň.", stars: 5 },
  { name: "Tomáš V.", role: "Lékař, Olomouc", text: "Nemám čas řešit nemovitosti sám. Tady mi opravdu vše zařídí – a já jen přijímám příjem.", stars: 5 },
];

const team = [
  { name: "Jan Novák", role: "Zakladatel & CEO", desc: "15 let zkušeností v realitním investování. Vybudoval portfolio přes 200 nemovitostí." },
  { name: "Petra Svobodová", role: "Ředitelka správy", desc: "Expertka na správu nemovitostí. Garantuje hladký provoz každého projektu." },
  { name: "Michal Dvořák", role: "Investiční poradce", desc: "Pomáhá investorům najít správné řešení. Přes 150 spokojených klientů." },
];

const reels = [
  {
    title: "Reel: Jak přemýšlím o realitách",
    embedUrl: "https://www.instagram.com/reel/DVL1JL0iAqS/embed",
    postUrl: "https://www.instagram.com/reel/DVL1JL0iAqS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    title: "Reel: Další pohled na realitní byznys",
    embedUrl: "https://www.instagram.com/reel/DVAlZrgCPe5/embed",
    postUrl: "https://www.instagram.com/reel/DVAlZrgCPe5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];


const chatMessages = [
  { from: "investor", text: "Dobrý den, zajímá mě investice do nemovitosti. Jak to u vás funguje?", delay: 400 },
  { from: "agent", text: "Dobrý den! Těší nás váš zájem. U nás funguje model jednoduše: koupíte konkrétní byt, který přechází do vašeho vlastnictví. My se postaráme o veškerou správu a vy dostáváte předem stanovenou výši měsíčního příjmu.", delay: 1200 },
  { from: "investor", text: "A kolik přibližně mohu každý měsíc dostávat?", delay: 2400 },
  { from: "agent", text: "Záleží na výši investice. Například při investici 3 mil. Kč odpovídá garantovaná výše příjmu přibližně 12 500 Kč měsíčně. Přesné podmínky vždy sjednáváme individuálně smluvně.", delay: 3400 },
  { from: "investor", text: "Musím se starat o nájemníky nebo opravy?", delay: 4800 },
  { from: "agent", text: "Vůbec ne. O výběr nájemníků, komunikaci i technické věci se stará náš tým. Vy jen přijímáte pravidelný příjem – bez operativy.", delay: 5800 },
  { from: "investor", text: "To zní dobře. Jak mohu začít?", delay: 7200 },
  { from: "agent", text: "Stačí si domluvit nezávaznou konzultaci. Probereme vaše možnosti a doporučíme vhodný projekt. Hodí se vám zavolat tento týden?", delay: 8200 },
];

function ChatModal({ onClose, onCTA }: { onClose: () => void; onCTA: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (visibleCount >= chatMessages.length) return;
    const msg = chatMessages[visibleCount];
    const typingDelay = msg.from === "agent" ? 600 : 0;
    const timer = setTimeout(() => {
      if (msg.from === "agent") setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setVisibleCount(v => v + 1);
      }, typingDelay);
    }, visibleCount === 0 ? msg.delay : chatMessages[visibleCount - 1] ? msg.delay - chatMessages[visibleCount - 1].delay : 1000);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount, isTyping]);

  const done = visibleCount >= chatMessages.length;

  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{position:"absolute",inset:0,background:"rgba(15,23,42,0.6)",backdropFilter:"blur(4px)"}} onClick={onClose}/>
      <div style={{position:"relative",background:"white",borderRadius:"24px",width:"100%",maxWidth:"480px",maxHeight:"85vh",display:"flex",flexDirection:"column",boxShadow:"0 24px 80px rgba(0,0,0,0.25)",overflow:"hidden"}}>
        {/* Header */}
        <div style={{padding:"20px 24px",borderBottom:"1px solid #e2e8f0",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#f7f7fb"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{width:"40px",height:"40px",background:"linear-gradient(135deg,#366dff,#1a4fd6)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:800,fontSize:"0.9rem"}}>IB</div>
            <div>
              <div style={{fontWeight:700,fontSize:"0.9rem",color:"#0f172a"}}>investujbezstarosti.cz</div>
              <div style={{fontSize:"0.72rem",color:"#22c55e",fontWeight:600,display:"flex",alignItems:"center",gap:"4px"}}>
                <span style={{width:"6px",height:"6px",background:"#22c55e",borderRadius:"50%",display:"inline-block"}}/>online
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:"1.4rem",lineHeight:1,padding:"4px"}}>×</button>
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:"20px 16px",display:"flex",flexDirection:"column",gap:"12px",background:"#f8fafc"}}>
          {chatMessages.slice(0, visibleCount).map((msg, i) => (
            <div key={i} style={{display:"flex",justifyContent:msg.from==="investor"?"flex-end":"flex-start",animation:"msgIn 0.3s ease"}}>
              {msg.from === "agent" && (
                <div style={{width:"28px",height:"28px",background:"linear-gradient(135deg,#366dff,#1a4fd6)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:800,fontSize:"0.65rem",marginRight:"8px",flexShrink:0,marginTop:"2px"}}>IB</div>
              )}
              <div style={{
                maxWidth:"75%",
                padding:"11px 15px",
                borderRadius:msg.from==="investor"?"18px 18px 4px 18px":"18px 18px 18px 4px",
                background:msg.from==="investor"?"#366dff":"white",
                color:msg.from==="investor"?"white":"#0f172a",
                fontSize:"0.875rem",
                lineHeight:"1.55",
                fontWeight:400,
                boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
                border:msg.from==="agent"?"1px solid #e2e8f0":"none",
              }}>{msg.text}</div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{width:"28px",height:"28px",background:"linear-gradient(135deg,#366dff,#1a4fd6)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:800,fontSize:"0.65rem",flexShrink:0}}>IB</div>
              <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:"18px 18px 18px 4px",padding:"12px 16px",display:"flex",gap:"4px",alignItems:"center"}}>
                <span style={{width:"7px",height:"7px",background:"#94a3b8",borderRadius:"50%",animation:"typingDot 1.2s infinite",animationDelay:"0s",display:"inline-block"}}/>
                <span style={{width:"7px",height:"7px",background:"#94a3b8",borderRadius:"50%",animation:"typingDot 1.2s infinite",animationDelay:"0.2s",display:"inline-block"}}/>
                <span style={{width:"7px",height:"7px",background:"#94a3b8",borderRadius:"50%",animation:"typingDot 1.2s infinite",animationDelay:"0.4s",display:"inline-block"}}/>
              </div>
            </div>
          )}

          {/* Final CTA */}
          {done && (
            <div style={{background:"#eef2ff",border:"1px solid rgba(54,109,255,0.2)",borderRadius:"16px",padding:"18px",marginTop:"8px",animation:"msgIn 0.4s ease"}}>
              <div style={{fontSize:"0.85rem",fontWeight:700,color:"#0f172a",marginBottom:"10px"}}>Domluvte si nezávaznou konzultaci</div>
              <button onClick={onCTA} style={{width:"100%",padding:"11px",background:"#366dff",color:"white",border:"none",borderRadius:"10px",fontFamily:"inherit",fontSize:"0.875rem",fontWeight:700,cursor:"pointer"}}>
                Chci konzultaci →
              </button>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
      </div>
      <style>{`
        @keyframes msgIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes typingDot { 0%,60%,100% { opacity:0.3; transform:translateY(0); } 30% { opacity:1; transform:translateY(-3px); } }
      `}</style>
    </div>
  );
}

function HeroSkyline() {
  return (
    <div style={{position:"absolute",bottom:0,left:0,right:0,
      height:"340px",pointerEvents:"none",zIndex:1,overflow:"hidden"}}>
      <style>{`
        @keyframes houseRise {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes winLight {
          0%,100% { opacity:0.7; }
          50%     { opacity:0.2; }
        }
        @keyframes floatDot {
          0%,100% { transform:translateY(0); opacity:0.5; }
          50%     { transform:translateY(-12px); opacity:0.9; }
        }
        .hs-far   { animation: houseRise 2s ease-out both; }
        .hs-mid   { animation: houseRise 1.6s ease-out both; }
        .hs-front { animation: houseRise 1.1s ease-out both; }
      `}</style>
      <svg viewBox="0 0 1400 340" preserveAspectRatio="xMidYMax meet"
           style={{width:"100%",height:"100%"}}>
        <defs>
          <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8d8ff"/>
            <stop offset="100%" stopColor="#e8eeff"/>
          </linearGradient>
          <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b5c8ff"/>
            <stop offset="100%" stopColor="#d8e4ff"/>
          </linearGradient>
          <linearGradient id="hg3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dce8ff"/>
            <stop offset="100%" stopColor="#f0f5ff"/>
          </linearGradient>
          <linearGradient id="roof1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a0b8f0"/>
            <stop offset="100%" stopColor="#c0d0ff"/>
          </linearGradient>
        </defs>

        {/* ===== FAR BACKGROUND – malé domky ===== */}
        <g className="hs-far" opacity="0.3">
          {/* domek 1 */}
          <rect x="10"  y="240" width="50" height="100" fill="url(#hg3)"/>
          <polygon points="10,240 35,215 60,240" fill="url(#roof1)" opacity="0.6"/>
          <rect x="25"  y="260" width="10" height="10" fill="#366dff" opacity="0.3" rx="1"/>
          <rect x="40"  y="260" width="10" height="10" fill="#366dff" opacity="0.15" rx="1"/>
          <rect x="25"  y="278" width="10" height="10" fill="#366dff" opacity="0.15" rx="1"/>
          <rect x="40"  y="278" width="10" height="10" fill="#366dff" opacity="0.3" rx="1"/>
          <rect x="29"  y="295" width="12" height="45" fill="#a0b8f0" opacity="0.5" rx="2"/>

          {/* domek 2 */}
          <rect x="70"  y="225" width="55" height="115" fill="url(#hg3)"/>
          <polygon points="70,225 97,198 125,225" fill="url(#roof1)" opacity="0.6"/>
          <rect x="80"  y="245" width="12" height="12" fill="#366dff" opacity="0.25" rx="1"/>
          <rect x="100" y="245" width="12" height="12" fill="#366dff" opacity="0.1"  rx="1"/>
          <rect x="80"  y="265" width="12" height="12" fill="#366dff" opacity="0.1"  rx="1"/>
          <rect x="100" y="265" width="12" height="12" fill="#366dff" opacity="0.25" rx="1"/>
          <rect x="85"  y="282" width="14" height="58" fill="#a0b8f0" opacity="0.5" rx="2"/>

          {/* věžák vlevo */}
          <rect x="135" y="180" width="40" height="160" fill="url(#hg3)"/>
          <rect x="153" y="172" width="4"  height="10"  fill="#93b0f8" opacity="0.7"/>
          {[0,1,2,3,4].map(r => [0,1].map(c => (
            <rect key={`ff1-${r}-${c}`} x={141+c*18} y={190+r*22}
              width="9" height="11" fill="#366dff" opacity="0.2" rx="1"/>
          )))}

          <rect x="185" y="205" width="45" height="135" fill="url(#hg3)"/>
          <polygon points="185,205 207,182 230,205" fill="url(#roof1)" opacity="0.5"/>
          <rect x="195" y="220" width="11" height="11" fill="#366dff" opacity="0.2" rx="1"/>
          <rect x="212" y="220" width="11" height="11" fill="#366dff" opacity="0.1" rx="1"/>
          <rect x="195" y="238" width="11" height="11" fill="#366dff" opacity="0.1" rx="1"/>
          <rect x="212" y="238" width="11" height="11" fill="#366dff" opacity="0.2" rx="1"/>

          {/* right side far */}
          <rect x="1165" y="195" width="40" height="145" fill="url(#hg3)"/>
          <rect x="1183" y="187" width="4"  height="10"  fill="#93b0f8" opacity="0.7"/>
          {[0,1,2,3].map(r => [0,1].map(c => (
            <rect key={`ff2-${r}-${c}`} x={1171+c*18} y={205+r*22}
              width="9" height="11" fill="#366dff" opacity="0.2" rx="1"/>
          )))}
          <rect x="1215" y="215" width="50" height="125" fill="url(#hg3)"/>
          <polygon points="1215,215 1240,190 1265,215" fill="url(#roof1)" opacity="0.5"/>
          <rect x="1225" y="232" width="12" height="12" fill="#366dff" opacity="0.2" rx="1"/>
          <rect x="1243" y="232" width="12" height="12" fill="#366dff" opacity="0.1" rx="1"/>

          <rect x="1275" y="200" width="45" height="140" fill="url(#hg3)"/>
          <polygon points="1275,200 1297,174 1320,200" fill="url(#roof1)" opacity="0.5"/>
          <rect x="1320" y="220" width="55" height="120" fill="url(#hg3)"/>
          <rect x="1338" y="212" width="4"  height="10"  fill="#93b0f8" opacity="0.7"/>
          <rect x="1375" y="230" width="25" height="110" fill="url(#hg3)"/>
        </g>

        {/* ===== MID LAYER ===== */}
        <g className="hs-mid" opacity="0.55">
          {/* věžák vlevo tall */}
          <rect x="0"   y="140" width="58" height="200" fill="url(#hg2)"/>
          <rect x="27"  y="128" width="5"  height="14"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5].map(r => [0,1,2].map(c => (
            <rect key={`ml1-${r}-${c}`} x={6+c*17} y={150+r*22}
              width="10" height="13" fill="#366dff"
              opacity={((r+c)%2===0)?0.22:0.09} rx="1"/>
          )))}

          {/* řadový dům */}
          <rect x="55"  y="165" width="62" height="175" fill="url(#hg1)"/>
          <polygon points="55,165 86,138 117,165" fill="url(#roof1)" opacity="0.7"/>
          {[0,1,2,3].map(r => [0,1,2].map(c => (
            <rect key={`ml2-${r}-${c}`} x={62+c*17} y={175+r*24}
              width="11" height="14" fill="#366dff"
              opacity={((r*c)%3===0)?0.25:0.1} rx="1"/>
          )))}
          <rect x="77"  y="282" width="14" height="58" fill="#93b0f8" opacity="0.6" rx="2"/>

          <rect x="112" y="150" width="52" height="190" fill="url(#hg2)"/>
          <rect x="136" y="138" width="5"  height="14"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5].map(r => [0,1].map(c => (
            <rect key={`ml3-${r}-${c}`} x={119+c*19} y={162+r*22}
              width="12" height="14" fill="#366dff"
              opacity={r===2&&c===0?0.05:0.18} rx="1"
              style={r===1&&c===1?{animation:"winLight 3s 1s infinite"}:{}}/>
          )))}

          <rect x="160" y="170" width="55" height="170" fill="url(#hg1)"/>
          <polygon points="160,170 187,144 215,170" fill="url(#roof1)" opacity="0.7"/>
          {[0,1,2,3].map(r => [0,1,2].map(c => (
            <rect key={`ml4-${r}-${c}`} x={167+c*16} y={180+r*24}
              width="10" height="13" fill="#366dff"
              opacity={0.15} rx="1"/>
          )))}
          <rect x="178" y="285" width="14" height="55" fill="#93b0f8" opacity="0.6" rx="2"/>

          <rect x="210" y="158" width="48" height="182" fill="url(#hg2)"/>
          <rect x="233" y="146" width="4"  height="14"  fill="#7a9ef5"/>
          {[0,1,2,3,4].map(r => [0,1].map(c => (
            <rect key={`ml5-${r}-${c}`} x={217+c*19} y={168+r*24}
              width="12" height="15" fill="#366dff"
              opacity={0.18} rx="1"
              style={r===3&&c===0?{animation:"winLight 4s 0.5s infinite"}:{}}/>
          )))}

          <rect x="254" y="175" width="52" height="165" fill="url(#hg1)"/>
          <polygon points="254,175 280,150 306,175" fill="url(#roof1)" opacity="0.65"/>
          <rect x="280" y="290" width="14" height="50" fill="#93b0f8" opacity="0.6" rx="2"/>

          {/* right mid */}
          <rect x="1090" y="162" width="56" height="178" fill="url(#hg2)"/>
          <rect x="1116" y="150" width="5"  height="14"  fill="#7a9ef5"/>
          {[0,1,2,3,4].map(r => [0,1,2].map(c => (
            <rect key={`mr1-${r}-${c}`} x={1097+c*17} y={172+r*22}
              width="11" height="13" fill="#366dff" opacity={0.18} rx="1"/>
          )))}

          <rect x="1142" y="145" width="60" height="195" fill="url(#hg1)"/>
          <polygon points="1142,145 1172,118 1202,145" fill="url(#roof1)" opacity="0.7"/>
          {[0,1,2,3,4].map(r => [0,1,2].map(c => (
            <rect key={`mr2-${r}-${c}`} x={1149+c*17} y={158+r*24}
              width="11" height="14" fill="#366dff"
              opacity={((r+c)%2===0)?0.22:0.09} rx="1"
              style={r===2&&c===1?{animation:"winLight 3.5s 0.8s infinite"}:{}}/>
          )))}
          <rect x="1165" y="290" width="14" height="50" fill="#93b0f8" opacity="0.6" rx="2"/>

          <rect x="1198" y="155" width="54" height="185" fill="url(#hg2)"/>
          <rect x="1223" y="143" width="5"  height="14"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5].map(r => [0,1].map(c => (
            <rect key={`mr3-${r}-${c}`} x={1205+c*20} y={167+r*22}
              width="13" height="14" fill="#366dff" opacity={0.18} rx="1"/>
          )))}

          <rect x="1248" y="168" width="58" height="172" fill="url(#hg1)"/>
          <polygon points="1248,168 1277,142 1306,168" fill="url(#roof1)" opacity="0.7"/>
          <rect x="1272" y="286" width="14" height="54" fill="#93b0f8" opacity="0.6" rx="2"/>

          <rect x="1302" y="152" width="52" height="188" fill="url(#hg2)"/>
          <rect x="1326" y="140" width="5"  height="14"  fill="#7a9ef5"/>
          {[0,1,2,3,4].map(r => [0,1].map(c => (
            <rect key={`mr4-${r}-${c}`} x={1309+c*20} y={163+r*24}
              width="12" height="15" fill="#366dff" opacity={0.18} rx="1"
              style={r===1&&c===0?{animation:"winLight 4.5s 1.2s infinite"}:{}}/>
          )))}
          <rect x="1350" y="165" width="50" height="175" fill="url(#hg1)"/>
          <polygon points="1350,165 1375,140 1400,165" fill="url(#roof1)" opacity="0.65"/>
        </g>

        {/* ===== FRONT LAYER – nejdetailnější ===== */}
        <g className="hs-front">
          {/* VLEVO */}
          {/* velký věžák */}
          <rect x="-8"  y="85"  width="72" height="255" fill="url(#hg1)"/>
          <rect x="27"  y="72"  width="6"  height="15"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5,6,7].map(r => [0,1,2].map(c => (
            <rect key={`fl1-${r}-${c}`} x={0+c*20} y={97+r*22}
              width="13" height="15" fill="#366dff"
              opacity={((r+c)%3===0)?0.06:((r+c)%2===0)?0.22:0.14}
              rx="1"
              style={(r===3&&c===1)||(r===6&&c===2)?{animation:"winLight 3s "+((r+c)*0.3)+"s infinite"}:{}}/>
          )))}

          {/* řadový dům s vikýřem */}
          <rect x="60"  y="100" width="68" height="240" fill="url(#hg2)"/>
          <polygon points="60,100 94,70 128,100" fill="url(#roof1)" opacity="0.8"/>
          {/* vikýř */}
          <rect x="80"  y="78"  width="28" height="24"  fill="url(#hg1)" opacity="0.9"/>
          <polygon points="80,78 94,64 108,78" fill="url(#roof1)" opacity="0.7"/>
          <rect x="86"  y="82"  width="16" height="12"  fill="#366dff" opacity="0.35" rx="1"/>
          {[0,1,2,3,4,5].map(r => [0,1,2].map(c => (
            <rect key={`fl2-${r}-${c}`} x={67+c*18} y={114+r*25}
              width="12" height="15" fill="#366dff"
              opacity={r===2&&c===0?0.06:0.2} rx="1"
              style={r===4&&c===1?{animation:"winLight 4s 0.4s infinite"}:{}}/>
          )))}
          <rect x="87"  y="298" width="16" height="42"  fill="#93b0f8" opacity="0.7" rx="3"/>

          <rect x="124" y="88"  width="58" height="252" fill="url(#hg1)"/>
          <rect x="151" y="75"  width="6"  height="15"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5,6].map(r => [0,1].map(c => (
            <rect key={`fl3-${r}-${c}`} x={131+c*22} y={100+r*24}
              width="14" height="16" fill="#366dff"
              opacity={r===1&&c===0?0.06:0.2} rx="1"
              style={r===5&&c===0?{animation:"winLight 3.8s 0.9s infinite"}:{}}/>
          )))}

          <rect x="178" y="105" width="62" height="235" fill="url(#hg2)"/>
          <polygon points="178,105 209,75 240,105" fill="url(#roof1)" opacity="0.8"/>
          <rect x="202" y="81"  width="30" height="26"  fill="url(#hg1)" opacity="0.9"/>
          <polygon points="202,81 217,65 232,81" fill="url(#roof1)" opacity="0.7"/>
          <rect x="208" y="85"  width="18" height="13"  fill="#366dff" opacity="0.3" rx="1"/>
          {[0,1,2,3,4,5].map(r => [0,1,2].map(c => (
            <rect key={`fl4-${r}-${c}`} x={185+c*18} y={118+r*25}
              width="12" height="15" fill="#366dff"
              opacity={0.18} rx="1"
              style={r===2&&c===2?{animation:"winLight 5s 1.1s infinite"}:{}}/>
          )))}
          <rect x="206" y="298" width="16" height="42"  fill="#93b0f8" opacity="0.7" rx="3"/>

          <rect x="236" y="92"  width="55" height="248" fill="url(#hg1)"/>
          <rect x="261" y="79"  width="6"  height="15"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5,6].map(r => [0,1].map(c => (
            <rect key={`fl5-${r}-${c}`} x={243+c*22} y={103+r*24}
              width="14" height="16" fill="#366dff"
              opacity={0.18} rx="1"/>
          )))}

          <rect x="287" y="108" width="60" height="232" fill="url(#hg2)"/>
          <polygon points="287,108 317,78 347,108" fill="url(#roof1)" opacity="0.8"/>
          {[0,1,2,3,4].map(r => [0,1,2].map(c => (
            <rect key={`fl6-${r}-${c}`} x={294+c*18} y={122+r*26}
              width="12" height="16" fill="#366dff"
              opacity={r===3&&c===1?0.06:0.18} rx="1"
              style={r===0&&c===2?{animation:"winLight 3.2s 0.6s infinite"}:{}}/>
          )))}
          <rect x="314" y="298" width="16" height="42"  fill="#93b0f8" opacity="0.7" rx="3"/>

          <rect x="343" y="95"  width="52" height="245" fill="url(#hg1)"/>
          <rect x="367" y="82"  width="5"  height="15"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5,6].map(r => [0,1].map(c => (
            <rect key={`fl7-${r}-${c}`} x={350+c*22} y={106+r*24}
              width="14" height="16" fill="#366dff"
              opacity={0.16} rx="1"/>
          )))}

          {/* VPRAVO */}
          <rect x="990"  y="90"  width="65" height="250" fill="url(#hg2)"/>
          <rect x="1020" y="77"  width="6"  height="15"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5,6].map(r => [0,1,2].map(c => (
            <rect key={`fr1-${r}-${c}`} x={997+c*19} y={102+r*23}
              width="12" height="15" fill="#366dff"
              opacity={((r+c)%2===0)?0.22:0.11} rx="1"
              style={r===4&&c===0?{animation:"winLight 3.6s 0.7s infinite"}:{}}/>
          )))}

          <rect x="1050" y="100" width="68" height="240" fill="url(#hg1)"/>
          <polygon points="1050,100 1084,70 1118,100" fill="url(#roof1)" opacity="0.8"/>
          <rect x="1072" y="78"  width="28" height="24"  fill="url(#hg1)" opacity="0.9"/>
          <polygon points="1072,78 1086,64 1100,78" fill="url(#roof1)" opacity="0.7"/>
          <rect x="1078" y="82"  width="16" height="12"  fill="#366dff" opacity="0.35" rx="1"/>
          {[0,1,2,3,4,5].map(r => [0,1,2].map(c => (
            <rect key={`fr2-${r}-${c}`} x={1057+c*18} y={114+r*25}
              width="12" height="15" fill="#366dff"
              opacity={0.19} rx="1"
              style={r===3&&c===1?{animation:"winLight 4.2s 0.3s infinite"}:{}}/>
          )))}
          <rect x="1079" y="298" width="16" height="42"  fill="#93b0f8" opacity="0.7" rx="3"/>

          <rect x="1114" y="88"  width="58" height="252" fill="url(#hg2)"/>
          <rect x="1141" y="75"  width="6"  height="15"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5,6].map(r => [0,1].map(c => (
            <rect key={`fr3-${r}-${c}`} x={1121+c*22} y={100+r*24}
              width="14" height="16" fill="#366dff"
              opacity={0.19} rx="1"/>
          )))}

          <rect x="1168" y="102" width="62" height="238" fill="url(#hg1)"/>
          <polygon points="1168,102 1199,72 1230,102" fill="url(#roof1)" opacity="0.8"/>
          <rect x="1192" y="78"  width="30" height="26"  fill="url(#hg1)" opacity="0.9"/>
          <polygon points="1192,78 1207,62 1222,78" fill="url(#roof1)" opacity="0.7"/>
          <rect x="1198" y="82"  width="18" height="13"  fill="#366dff" opacity="0.3" rx="1"/>
          {[0,1,2,3,4,5].map(r => [0,1,2].map(c => (
            <rect key={`fr4-${r}-${c}`} x={1175+c*18} y={116+r*25}
              width="12" height="15" fill="#366dff"
              opacity={0.18} rx="1"
              style={r===1&&c===2?{animation:"winLight 3.9s 1.4s infinite"}:{}}/>
          )))}
          <rect x="1196" y="298" width="16" height="42"  fill="#93b0f8" opacity="0.7" rx="3"/>

          <rect x="1226" y="90"  width="56" height="250" fill="url(#hg2)"/>
          <rect x="1252" y="77"  width="6"  height="15"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5,6].map(r => [0,1].map(c => (
            <rect key={`fr5-${r}-${c}`} x={1233+c*22} y={102+r*24}
              width="14" height="16" fill="#366dff"
              opacity={0.17} rx="1"/>
          )))}

          <rect x="1278" y="105" width="60" height="235" fill="url(#hg1)"/>
          <polygon points="1278,105 1308,75 1338,105" fill="url(#roof1)" opacity="0.8"/>
          {[0,1,2,3,4].map(r => [0,1,2].map(c => (
            <rect key={`fr6-${r}-${c}`} x={1285+c*18} y={119+r*26}
              width="12" height="16" fill="#366dff"
              opacity={0.18} rx="1"
              style={r===2&&c===0?{animation:"winLight 4.8s 0.5s infinite"}:{}}/>
          )))}
          <rect x="1305" y="298" width="16" height="42"  fill="#93b0f8" opacity="0.7" rx="3"/>

          <rect x="1334" y="92"  width="66" height="248" fill="url(#hg2)"/>
          <rect x="1364" y="79"  width="6"  height="15"  fill="#7a9ef5"/>
          {[0,1,2,3,4,5,6,7].map(r => [0,1,2].map(c => (
            <rect key={`fr7-${r}-${c}`} x={1341+c*19} y={104+r*22}
              width="12" height="14" fill="#366dff"
              opacity={((r*c)%2===0)?0.22:0.1} rx="1"
              style={r===5&&c===2?{animation:"winLight 3.3s 0.8s infinite"}:{}}/>
          )))}
        </g>

        {/* Ground */}
        <rect x="0" y="336" width="1400" height="4" fill="#b8ccff" opacity="0.5"/>

        {/* Floating particles */}
        {([
          {cx:400,cy:200,r:2,  d:"0s",  dur:"4s"},
          {cx:530,cy:165,r:1.5,d:"0.6s",dur:"4.5s"},
          {cx:640,cy:205,r:2,  d:"1.2s",dur:"3.8s"},
          {cx:700,cy:175,r:1.5,d:"0.3s",dur:"4.2s"},
          {cx:760,cy:200,r:2,  d:"0.9s",dur:"4.8s"},
          {cx:870,cy:168,r:1.5,d:"0.5s",dur:"3.9s"},
          {cx:470,cy:225,r:1,  d:"1.7s",dur:"5s"},
          {cx:620,cy:215,r:1,  d:"1.4s",dur:"4.6s"},
          {cx:820,cy:185,r:1,  d:"0.8s",dur:"4.3s"},
        ] as {cx:number;cy:number;r:number;d:string;dur:string}[]).map((p,i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#366dff" opacity="0.45"
            style={{animation:`floatDot ${p.dur} ease-in-out infinite`,animationDelay:p.d}}/>
        ))}
      </svg>
    </div>
  );
}

const IconPin = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#366dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
const IconHome = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#366dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>;
const IconArrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
const IconShield = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#366dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
const IconSettings = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#366dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
const IconUsers = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#366dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IconTool = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#366dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
const IconCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#366dff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>;
const IconCheckGreen = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>;
const IconPlus = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>;

function useCounter(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [triggered, target, duration]);
  return count;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", interest: "", message: "", gdpr: false });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [calcAmount, setCalcAmount] = useState(3000000);
  const [calcMode, setCalcMode] = useState<"najem"|"rust">("najem");
  const statsRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);

  const investors = useCounter(247, 1800, statsTriggered);
  const properties = useCounter(300, 1800, statsTriggered);
  const years = useCounter(8, 1200, statsTriggered);
  const portfolio = useCounter(350, 1800, statsTriggered);

  const monthlyIncome = Math.round((calcAmount * 0.05) / 12);
  const yearlyIncome = Math.round(calcAmount * 0.05);
  const yearlyGrowth = Math.round(calcAmount * 0.03);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const stepObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveStep(parseInt(e.target.getAttribute("data-step") || "0")); }),
      { threshold: 0.75, rootMargin: "0px 0px -30% 0px" }
    );
    document.querySelectorAll(".step-item").forEach((el) => stepObserver.observe(el));

    const statsObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setStatsTriggered(true); }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);

    const interval = setInterval(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), 4500);
    return () => { observer.disconnect(); stepObserver.disconnect(); statsObserver.disconnect(); clearInterval(interval); };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const scrollReels = (dir: "left" | "right") => {
    if (!reelsRef.current) return;
    reelsRef.current.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formState.name) errors.name = "Vyplňte jméno";
    if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) errors.email = "Zadejte platný email";
    if (!formState.phone) errors.phone = "Vyplňte telefon";
    if (!formState.interest) errors.interest = "Vyberte zájem";
    if (!formState.gdpr) errors.gdpr = "Souhlas je povinný";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setFormLoading(false);
    setFormSubmitted(true);
  };

  return (
    <div className="ibz-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --blue:#366dff;--blue-dark:#1a4fd6;--blue-light:#eef2ff;
          --gold:#f59e0b;--bg:#f7f7fb;--text:#0f172a;--text2:#475569;--border:#e2e8f0;
          --radius:16px;--shadow:0 4px 24px rgba(54,109,255,0.08);--shadow-hover:0 12px 40px rgba(54,109,255,0.16);
        }
        .ibz-root{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;}

        /* NAVBAR */
        .navbar{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(247,247,251,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:0 6%;height:68px;display:flex;align-items:center;justify-content:space-between;}
        .navbar-logo{font-size:1.05rem;font-weight:800;color:var(--text);cursor:pointer;}
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
        .hero-three-wrap{position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden;}
        .hero-three-canvas{position:absolute;inset:0;opacity:0.44;}
        .hero::before{content:"";position:absolute;inset:0;z-index:1;background:radial-gradient(circle at 70% 45%,rgba(54,109,255,0.08),transparent 52%);}
        .hero::after{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(247,247,251,0.98) 0%,rgba(247,247,251,0.84) 42%,rgba(247,247,251,0.48) 100%);}
        .hero-inner{display:grid;grid-template-columns:1.1fr 0.9fr;gap:60px;align-items:center;max-width:1200px;width:100%;position:relative;z-index:3;}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:white;color:var(--blue);font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:7px 16px;border-radius:50px;margin-bottom:1.5rem;border:1px solid rgba(54,109,255,0.2);box-shadow:0 2px 8px rgba(54,109,255,0.1);}
        .hero-dot{width:6px;height:6px;background:var(--blue);border-radius:50%;animation:blink 2s infinite;}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
        .hero h1{font-size:clamp(2.2rem,4vw,3.6rem);font-weight:800;line-height:1.1;letter-spacing:-1.5px;margin-bottom:1.5rem;color:var(--text);}
        .hero h1 .accent{color:var(--blue);}
        .hero-points{display:flex;flex-direction:column;gap:10px;margin-bottom:2rem;}
        .hero-point{display:flex;align-items:center;gap:10px;font-size:1rem;color:var(--text2);font-weight:500;}
        .hero-point-dot{width:6px;height:6px;background:var(--blue);border-radius:50%;flex-shrink:0;}
        .hero-badges{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:2rem;}
        .hero-badge{display:flex;align-items:center;gap:7px;background:white;border:1px solid var(--border);border-radius:50px;padding:7px 14px;font-size:0.78rem;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
        .badge-check{width:17px;height:17px;background:var(--blue-light);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .hero-ctas{display:flex;gap:10px;flex-wrap:wrap;}

        /* HERO CALCULATOR CARD */
        .hero-card{background:white;border-radius:22px;padding:32px;box-shadow:0 20px 60px rgba(54,109,255,0.12);border:1px solid rgba(54,109,255,0.08);}
        .hero-card-label{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--text2);margin-bottom:1rem;}
        .hero-card-big{font-size:2.8rem;font-weight:800;color:var(--blue);letter-spacing:-2px;line-height:1;}
        .hero-card-sub{font-size:0.82rem;color:var(--text2);margin-top:4px;margin-bottom:1.25rem;}
        .hero-card-divider{border:none;border-top:1px solid var(--border);margin:1.25rem 0;}
        .hero-card-row{display:flex;justify-content:space-between;align-items:center;font-size:0.82rem;margin-top:8px;}
        .hero-card-row-label{color:var(--text2);}
        .hero-card-row-value{font-weight:700;color:var(--text);}
        .hero-card-cta{width:100%;margin-top:1.25rem;padding:12px;font-size:0.9rem;font-weight:700;background:var(--blue);color:white;border:none;border-radius:12px;font-family:inherit;cursor:pointer;transition:all 0.2s;}
        .hero-card-cta:hover{background:var(--blue-dark);}
        .hero-card-note{font-size:0.7rem;color:var(--text2);text-align:center;margin-top:8px;line-height:1.5;}
        .calc-slider{width:100%;height:5px;border-radius:3px;background:var(--border);outline:none;cursor:pointer;-webkit-appearance:none;margin-bottom:6px;}
        .calc-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--blue);cursor:pointer;box-shadow:0 2px 8px rgba(54,109,255,0.4);}

        /* STATS */
        .stats-section{background:white;padding:56px 6%;border-bottom:1px solid var(--border);}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;max-width:860px;margin:0 auto;text-align:center;}
        .stat-num{font-size:2.2rem;font-weight:800;color:var(--blue);letter-spacing:-1.5px;line-height:1;white-space:nowrap;}
        .stat-label{font-size:0.8rem;color:var(--text2);margin-top:6px;font-weight:500;}

        /* SECTIONS */
        .section{padding:90px 6%;}
        .section-label{font-size:0.72rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--blue);margin-bottom:0.75rem;}
        .section-title{font-size:clamp(1.7rem,3vw,2.5rem);font-weight:800;letter-spacing:-1px;color:var(--text);margin-bottom:1rem;line-height:1.15;}
        .section-sub{font-size:1rem;color:var(--text2);line-height:1.75;max-width:540px;}
        .section-header{margin-bottom:3.5rem;}

        /* REVEAL */
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.65s ease,transform 0.65s ease;}
        .reveal.revealed{opacity:1;transform:translateY(0);}
        .d1{transition-delay:0.1s;}.d2{transition-delay:0.2s;}.d3{transition-delay:0.3s;}.d4{transition-delay:0.4s;}

        /* FOR WHOM */
        .forwhom-section{background:white;}
        .forwhom-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;max-width:1080px;margin:0 auto;}
        .forwhom-list{display:flex;flex-direction:column;gap:14px;margin-top:0.5rem;}
        .forwhom-item{display:flex;align-items:flex-start;gap:12px;padding:16px 20px;background:var(--bg);border:1.5px solid var(--border);border-radius:13px;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s;cursor:default;} .forwhom-item:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(54,109,255,0.13);border-color:rgba(54,109,255,0.25);background:white;}
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
        .project-cta{display:flex;align-items:center;gap:5px;color:var(--blue);font-size:0.83rem;font-weight:700;transition:gap 0.2s;}
        .project-card:hover .project-cta{gap:9px;}

        /* REELS */
        .reels-section{background:#f3f4f6;}
        .reels-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:1.8rem;}
        .reels-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;line-height:1.15;letter-spacing:-1px;color:#0f1a4d;}
        .reels-sub{font-size:1.05rem;color:#334155;line-height:1.7;max-width:700px;margin-top:0.8rem;}
        .reels-nav{display:flex;gap:10px;flex-shrink:0;}
        .reels-nav-btn{width:56px;height:56px;border-radius:50%;border:1px solid #c9d2e3;background:white;color:#0f1a4d;font-size:1.6rem;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
        .reels-nav-btn:hover{border-color:#366dff;color:#366dff;transform:translateY(-1px);}
        .reels-track{display:flex;justify-content:center;gap:22px;overflow-x:auto;padding-bottom:10px;scroll-snap-type:x mandatory;}
        .reels-track::-webkit-scrollbar{height:8px;}
        .reels-track::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:999px;}
        .reel-card{background:#0f172a;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(15,23,42,0.18);scroll-snap-align:start;min-height:520px;display:flex;flex-direction:column;flex:0 0 min(320px, 88vw);}
        .reel-embed{width:100%;aspect-ratio:9/16;border:0;background:#0b1220;}
        .reel-footer{padding:10px 12px;background:#0f172a;display:flex;justify-content:space-between;align-items:center;gap:10px;}
        .reel-name{color:#cbd5e1;font-size:0.82rem;font-weight:600;}
        .reel-open{background:#366dff;color:white;border:none;border-radius:999px;padding:8px 12px;font-size:0.78rem;font-weight:700;cursor:pointer;white-space:nowrap;}
        .reel-open:hover{background:#1a4fd6;}

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
        .steps-line-fill{position:absolute;left:19px;top:20px;width:2px;background:var(--blue);transition:height 0.4s ease;}
        .step-item{padding:0 0 40px 52px;position:relative;display:block;}
        .step-item:last-child{padding-bottom:0;}
        .step-num{position:absolute;left:0;top:0;width:40px;height:40px;border-radius:50%;background:#f1f5f9;color:#94a3b8;font-weight:800;font-size:0.85rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.35s;border:2px solid var(--border);z-index:1;}
        .step-item.active .step-num{background:var(--blue);color:white;box-shadow:0 4px 16px rgba(54,109,255,0.35);border-color:var(--blue);}
        .step-content{padding-top:8px;}
        .step-title{font-size:1.1rem;font-weight:800;color:#94a3b8;margin-bottom:8px;letter-spacing:-0.3px;transition:color 0.3s;}
        .step-item.active .step-title{color:var(--text);}
        .step-text{font-size:0.87rem;color:var(--text2);line-height:1.7;opacity:0.5;transition:opacity 0.3s;}
        .step-item.active .step-text{opacity:1;}
        .step-item:hover .step-num{background:var(--blue-light);border-color:rgba(54,109,255,0.4);color:var(--blue);}
        .step-item:hover .step-title{color:var(--text);}
        .step-item:hover .step-text{opacity:0.8;}

        /* CALCULATOR FULL */
        .calc-section{background:linear-gradient(135deg,#0f172a,#1e3a8a);padding:90px 24px;}
        .calc-section .section-label{color:#93c5fd;}
        .calc-wrap{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;max-width:1080px;margin:0 auto;}
        .calc-box{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:36px;}
        .calc-label{font-size:0.82rem;font-weight:600;color:#94a3b8;margin-bottom:10px;}
        .calc-amount-display{font-size:2.2rem;font-weight:800;color:white;margin-bottom:16px;letter-spacing:-1px;}
        .calc-slider-dark{width:100%;height:6px;border-radius:3px;background:rgba(255,255,255,0.15);outline:none;cursor:pointer;-webkit-appearance:none;margin-bottom:8px;}
        .calc-slider-dark::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--blue);cursor:pointer;box-shadow:0 2px 8px rgba(54,109,255,0.5);}
        .calc-range-labels{display:flex;justify-content:space-between;font-size:0.72rem;color:#64748b;margin-bottom:24px;}
        .calc-results{display:flex;flex-direction:column;gap:12px;}
        .calc-result-row{display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.05);border-radius:12px;padding:14px 18px;}
        .calc-result-label{font-size:0.82rem;color:#94a3b8;}
        .calc-result-value{font-size:1.1rem;font-weight:800;color:white;}
        .calc-result-value.big{font-size:1.5rem;color:var(--blue);}
        .calc-note{font-size:0.72rem;color:#475569;margin-top:12px;line-height:1.5;}

        /* TEAM */
        .team-section{background:var(--bg);}
        .team-intro{background:white;border:1.5px solid var(--border);border-radius:20px;padding:36px;margin-bottom:2rem;}
        .team-intro-text{font-size:1rem;color:var(--text2);line-height:1.75;}
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
        .guarantee-card-label{font-size:0.95rem;color:rgba(255,255,255,0.85);font-weight:500;margin-bottom:6px;}
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
        .faq-item{background:var(--bg);border:1.5px solid var(--border);border-radius:13px;overflow:hidden;transition:box-shadow 0.2s,border-color 0.2s;}
        .faq-item:hover{box-shadow:var(--shadow);}
        .faq-item.open{border-color:rgba(54,109,255,0.3);}
        .faq-q{width:100%;text-align:left;padding:18px 22px;font-family:inherit;font-size:0.9rem;font-weight:700;color:var(--text);background:none;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;}
        .faq-icon{width:26px;height:26px;background:var(--blue-light);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform 0.3s,background 0.2s;}
        .faq-item.open .faq-icon{transform:rotate(45deg);background:var(--blue);color:white;}
        .faq-a{font-size:0.87rem;color:var(--text2);line-height:1.7;padding:14px 22px 18px;border-top:1px solid var(--border);}

        /* FORM */
        .form-section{background:var(--bg);}
        .form-wrap{max-width:660px;margin:0 auto;background:white;border-radius:24px;padding:48px;box-shadow:0 8px 48px rgba(54,109,255,0.09);border:1.5px solid var(--border);}
        .form-head{text-align:center;margin-bottom:2rem;}
        .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .fg{display:flex;flex-direction:column;gap:5px;}
        .fg.full{grid-column:1/-1;}
        .f-label{font-size:0.78rem;font-weight:600;color:var(--text);}
        .f-input,.f-select,.f-textarea{font-family:inherit;font-size:0.875rem;color:var(--text);border:1.5px solid var(--border);border-radius:10px;padding:11px 14px;background:var(--bg);outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
        .f-input:focus,.f-select:focus,.f-textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(54,109,255,0.1);background:white;}
        .f-textarea{resize:vertical;min-height:90px;}
        .f-error{font-size:0.72rem;color:#ef4444;}
        .f-check{display:flex;gap:9px;align-items:flex-start;}
        .f-check input{margin-top:3px;accent-color:var(--blue);}
        .f-check-label{font-size:0.8rem;color:var(--text2);line-height:1.55;}
        .f-submit{width:100%;padding:14px;font-size:0.95rem;font-weight:700;background:var(--blue);color:white;border:none;border-radius:12px;font-family:inherit;cursor:pointer;transition:all 0.2s;margin-top:1.25rem;}
        .f-submit:hover:not(:disabled){background:var(--blue-dark);transform:translateY(-1px);box-shadow:0 6px 20px rgba(54,109,255,0.35);}
        .f-submit:disabled{opacity:0.65;cursor:not-allowed;}
        .success{text-align:center;padding:32px 0;}
        .success-icon{width:68px;height:68px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;animation:pop 0.5s cubic-bezier(0.34,1.56,0.64,1);}
        @keyframes pop{from{transform:scale(0);opacity:0;}to{transform:scale(1);opacity:1;}}
        .success-icon svg{stroke:#15803d;width:32px;height:32px;}
        .success-title{font-size:1.3rem;font-weight:800;margin-bottom:0.5rem;}
        .success-text{color:var(--text2);font-size:0.87rem;margin-bottom:1.5rem;line-height:1.6;}
        .success-link{display:inline-flex;align-items:center;gap:7px;color:var(--blue);font-weight:700;text-decoration:none;font-size:0.87rem;border:2px solid var(--blue);border-radius:50px;padding:10px 20px;transition:background 0.2s;}
        .success-link:hover{background:var(--blue-light);}

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
        .footer-disclaimer{font-size:0.72rem;color:#475569;margin-top:0;line-height:1.5;}

        /* RESPONSIVE */
        @media(max-width:1024px){
          .hero-inner{grid-template-columns:1fr;}
          .hero-card{display:block;}
          .calc-wrap{grid-template-columns:1fr;}
          .guarantee-grid{grid-template-columns:1fr;}
          .forwhom-grid{grid-template-columns:1fr;}
        }
        @media(max-width:900px){
          .navbar-links{display:none;}
          .hero-three-canvas{opacity:0.3;}
          .hero::after{background:linear-gradient(180deg,rgba(247,247,251,0.96) 0%,rgba(247,247,251,0.72) 55%,rgba(247,247,251,0.52) 100%);}
          .reels-head{flex-direction:column;}
          .reels-nav{align-self:flex-end;}
          .reels-track{justify-content:flex-start;}
          .steps-wrap{grid-template-columns:1fr;}
          .steps-sticky{position:relative;top:0;}
          .steps-photo{aspect-ratio:16/7;margin-bottom:0;}
          .footer-grid{grid-template-columns:1fr 1fr;}
          .form-grid{grid-template-columns:1fr;}
          .stats-grid{grid-template-columns:repeat(2,1fr);}
          .mini-cta{flex-direction:column;text-align:center;}
        }
        @media(max-width:600px){
          .hero h1{font-size:2rem;}
          .hero-ctas{flex-direction:column;}
          .footer-grid{grid-template-columns:1fr;}
          .form-wrap{padding:26px 18px;}
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => scrollTo("hero")}>investuj<span>bezstarosti</span>.cz</div>
        <ul className="navbar-links">
          {[["Projekty","projekty"],["Jak to funguje","kroky"],["Pro koho","prokoho"],["Tým","tym"],["FAQ","faq"],["Kontakt","kontakt"]].map(([label,id]) => (
            <li key={id}><a href="#" onClick={e=>{e.preventDefault();scrollTo(id);}}>{label}</a></li>
          ))}
        </ul>
        <button className="btn-primary" onClick={() => scrollTo("kontakt")}>Nezávazná konzultace</button>
      </nav>

      {/* HERO – nová silná message */}
      <section id="hero" className="hero">
        <HeroSkyline />
        <div className="hero-shape hero-shape-1"/>
        <div className="hero-shape hero-shape-2"/>
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow"><div className="hero-dot"/>Investiční platforma</div>
            <h1>Investujte do nemovitostí.<br/><span className="accent">Bez starostí.</span></h1>
            <div className="hero-points">
              <div className="hero-point"><div className="hero-point-dot"/>Vlastníte konkrétní byt.</div>
              <div className="hero-point"><div className="hero-point-dot"/>Máte předem stanovený měsíční příjem.</div>
              <div className="hero-point"><div className="hero-point-dot"/>O správu se staráme my.</div>
            </div>
            <div className="hero-badges">
              {["All-in správa","Garantovaná výše příjmu","Reálné vlastnictví"].map(label => (
                <div key={label} className="hero-badge">
                  <div className="badge-check"><IconCheck/></div>{label}
                </div>
              ))}
            </div>
            <div className="hero-ctas">
              <button className="btn-primary" onClick={() => scrollTo("projekty")}>Zjistit dostupné projekty</button>
              <button className="btn-secondary" onClick={() => scrollTo("kontakt")}>Nezávazná konzultace</button>
            </div>
          </div>
          {/* Hero kalkulačka */}
          <div className="hero-card">
            <div className="hero-card-label">Orientační výpočet při investici {(calcAmount/1000000).toFixed(1).replace(".",",")} mil. Kč</div>
            <input type="range" className="calc-slider" min={500000} max={10000000} step={100000} value={calcAmount} onChange={e=>setCalcAmount(Number(e.target.value))}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"var(--text2)",marginBottom:"1.25rem"}}>
              <span>500 tis.</span><span>10 mil.</span>
            </div>
            {/* Blok 1 – garantovaný příjem */}
            <div style={{background:"var(--blue-light)",border:"1px solid rgba(54,109,255,0.15)",borderRadius:"12px",padding:"14px 16px",marginBottom:"10px"}}>
              <div style={{fontSize:"0.7rem",fontWeight:700,color:"var(--blue)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"4px"}}>Garantovaný měsíční příjem</div>
              <div style={{fontSize:"1.9rem",fontWeight:800,color:"var(--blue)",letterSpacing:"-1px",lineHeight:1}}>{monthlyIncome.toLocaleString("cs-CZ")} Kč</div>
              <div style={{fontSize:"0.72rem",color:"var(--text2)",marginTop:"3px"}}>vypláceno každý měsíc · {yearlyIncome.toLocaleString("cs-CZ")} Kč ročně</div>
            </div>
            {/* Blok 2 – možný růst hodnoty */}
            <div style={{background:"#fefce8",border:"1px solid rgba(245,158,11,0.2)",borderRadius:"12px",padding:"14px 16px"}}>
              <div style={{fontSize:"0.7rem",fontWeight:700,color:"#92400e",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"4px"}}>Možné kapitálové zhodnocení</div>
              <div style={{fontSize:"1.9rem",fontWeight:800,color:"#d97706",letterSpacing:"-1px",lineHeight:1}}>+{yearlyGrowth.toLocaleString("cs-CZ")} Kč</div>
              <div style={{fontSize:"0.72rem",color:"#92400e",marginTop:"3px"}}>ročně · konzervativní scénář 3 % p.a. · realizuje se při prodeji</div>
            </div>
            <button className="hero-card-cta" onClick={() => scrollTo("kontakt")}>Chci konzultaci →</button>
            <div className="hero-card-note">Výpočet je orientační. Konkrétní podmínky jsou vždy sjednány individuálně smluvně.</div>
          </div>
        </div>
      </section>

      {/* STATS POČÍTADLA */}
      <div className="stats-section" ref={statsRef}>
        <div className="stats-grid reveal">
          <div><div className="stat-num">{investors}+</div><div className="stat-label">investorů</div></div>
          <div><div className="stat-num">{properties}+</div><div className="stat-label">nemovitostí ve správě</div></div>
          <div><div className="stat-num">{years}+</div><div className="stat-label">let zkušeností</div></div>
          <div><div className="stat-num">{portfolio}M Kč</div><div className="stat-label">hodnota portfolia</div></div>
        </div>
      </div>

      {/* PRO KOHO */}
      <section id="prokoho" className="section forwhom-section">
        <div className="forwhom-grid">
          <div className="reveal">
            <div className="section-label">Pro koho</div>
            <h2 className="section-title">Pro koho je tato investice vhodná?</h2>
            <p className="section-sub">Tento model dává smysl investorům, kteří chtějí jistotu, přehlednost a reálné vlastnictví.</p>
            <div className="forwhom-list" style={{marginTop:"1.5rem"}}>
              {[
                "Pro investory, kteří dnes kupují fondy nebo dluhopisy a chtějí vlastnit konkrétní nemovitost.",
                "Pro ty, kteří chtějí reálné aktivum – ne jen podíl ve fondu.",
                "Pro investory, kteří nechtějí řešit nájemníky, opravy ani provoz.",
                "Pro ty, kteří ocení předem stanovenou výši měsíčního příjmu.",
                "Pro investory, kteří preferují menší, přehledné projekty a osobní přístup.",
              ].map((text, i) => (
                <div key={i} className="forwhom-item">
                  <div className="forwhom-icon"><IconCheckGreen/></div>
                  <div className="forwhom-text">{text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal d2">
            <div className="forwhom-highlight">
              <div className="forwhom-highlight-num">{properties}+</div>
              <div className="forwhom-highlight-label">nemovitostí v aktivní správě z existujícího portfolia nakoupeného jako celek</div>
              <div style={{marginTop:"2rem",paddingTop:"2rem",borderTop:"1px solid rgba(54,109,255,0.15)"}}>
                <div style={{fontSize:"0.85rem",color:"var(--text2)",lineHeight:1.7}}>
                  Neprodáváme jednotlivé byty na realitním trhu. Odprodáváme část prověřeného portfolia investorům s garantovanou správou.
                </div>
              </div>
            </div>
            <div style={{marginTop:"1.25rem"}}>
              <button className="btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={() => scrollTo("kontakt")}>Zjistit více na konzultaci</button>
            </div>
          </div>
        </div>
      </section>

      {/* PROJEKTY */}
      <section id="projekty" className="section projects-section">
        <div className="section-header reveal">
          <div className="section-label">Projekty</div>
          <h2 className="section-title">Aktuální investiční projekty</h2>
          <p className="section-sub">Vyberte si projekt. Pokud si nejste jistí, rádi poradíme nebo sestavíme portfolio.</p>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className={`project-card reveal d${(i%3)+1}`}>
              <div className="project-card-header">
                <div className="project-name">{p.name}</div>
                <div className={`project-status status-${p.statusColor}`}>{p.status}</div>
              </div>
              <div className="project-meta">
                <div className="project-meta-item"><IconPin/>{p.location}</div>
                <div className="project-meta-item"><IconHome/>{p.type}</div>
              </div>
              <Link href={`/projekty/${p.slug || "vinohrady"}`} className="project-cta" style={{textDecoration:"none"}}>Detail projektu<IconArrow/></Link>
            </div>
          ))}
        </div>
        <div className="mini-cta reveal">
          <div><div className="mini-cta-title">Nevíte, který projekt vybrat?</div><div className="mini-cta-sub">Rádi sestavíme portfolio na míru vašim cílům.</div></div>
          <button className="btn-primary" onClick={() => scrollTo("kontakt")}>Nezávazná konzultace</button>
        </div>
      </section>

      {/* REELS */}
      <section className="section reels-section">
        <div className="reels-head reveal">
          <div>
            <h2 className="reels-title">Podívejte se, jak přemýšlíme o realitách</h2>
            <p className="reels-sub">Krátká videa, kde ukazujeme přístup k investicím, správě a rozhodování v praxi.</p>
          </div>
          <div className="reels-nav">
            <button className="reels-nav-btn" onClick={() => scrollReels("left")} aria-label="Předchozí">‹</button>
            <button className="reels-nav-btn" onClick={() => scrollReels("right")} aria-label="Další">›</button>
          </div>
        </div>
        <div className="reels-track reveal d1" ref={reelsRef}>
          {reels.map((reel, i) => (
            <div key={i} className="reel-card">
              <iframe
                className="reel-embed"
                src={reel.embedUrl}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                title={reel.title}
              />
              <div className="reel-footer">
                <div className="reel-name">Instagram Reel</div>
                <button className="reel-open" onClick={() => window.open(reel.postUrl, "_blank", "noopener,noreferrer")}>
                  Otevřít
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KALKULAČKA */}
      <section className="calc-section">
        <div className="calc-wrap reveal">
          <div>
            <div className="section-label">Kalkulačka příjmu</div>
            <h2 className="section-title" style={{color:"white"}}>Orientační výpočet měsíčního příjmu</h2>
            <p className="section-sub">Zadejte výši investice a uvidíte orientační výši měsíčního příjmu odpovídající garantované výši nájmu.</p>

          </div>
          <div className="calc-box">
            {/* Přepínač */}
            <div style={{display:"flex",marginBottom:"20px",background:"rgba(255,255,255,0.07)",borderRadius:"10px",padding:"3px"}}>
              <button onClick={()=>setCalcMode("najem")} style={{flex:1,padding:"9px 10px",border:"none",borderRadius:"8px",fontFamily:"inherit",fontSize:"0.8rem",fontWeight:700,cursor:"pointer",transition:"all 0.2s",background:calcMode==="najem"?"white":"transparent",color:calcMode==="najem"?"#0f172a":"#94a3b8"}}>
                Nájemní výnos
              </button>
              <button onClick={()=>setCalcMode("rust")} style={{flex:1,padding:"9px 10px",border:"none",borderRadius:"8px",fontFamily:"inherit",fontSize:"0.8rem",fontWeight:700,cursor:"pointer",transition:"all 0.2s",background:calcMode==="rust"?"white":"transparent",color:calcMode==="rust"?"#0f172a":"#94a3b8"}}>
                + Růst hodnoty
              </button>
            </div>

            <div className="calc-label">Výše investice</div>
            <div className="calc-amount-display">{(calcAmount/1000000).toFixed(2).replace(".",",")} mil. Kč</div>
            <input type="range" className="calc-slider-dark" min={500000} max={10000000} step={100000} value={calcAmount} onChange={e=>setCalcAmount(Number(e.target.value))}/>
            <div className="calc-range-labels"><span>500 tis. Kč</span><span>10 mil. Kč</span></div>

            {/* Blok 1 – garantovaný příjem – vždy viditelný */}
            <div style={{background:"rgba(54,109,255,0.24)",border:"1px solid rgba(147,197,253,0.42)",borderRadius:"12px",padding:"16px 18px",marginBottom:"10px"}}>
              <div style={{fontSize:"0.68rem",fontWeight:700,color:"#dbeafe",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"5px"}}>Garantovaný měsíční příjem</div>
              <div style={{fontSize:"2rem",fontWeight:800,color:"#60a5fa",letterSpacing:"-1px",lineHeight:1}}>{monthlyIncome.toLocaleString("cs-CZ")} Kč</div>
              <div style={{fontSize:"0.73rem",color:"#cbd5e1",marginTop:"4px"}}>vypláceno každý měsíc · {yearlyIncome.toLocaleString("cs-CZ")} Kč ročně</div>
            </div>

            {/* Blok 2 – růst hodnoty – jen při přepnutí */}
            {calcMode==="rust" && (
              <div style={{background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.3)",borderRadius:"12px",padding:"16px 18px",marginBottom:"10px"}}>
                <div style={{fontSize:"0.68rem",fontWeight:700,color:"#fbbf24",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"5px"}}>Možné kapitálové zhodnocení</div>
                <div style={{fontSize:"2rem",fontWeight:800,color:"#fbbf24",letterSpacing:"-1px",lineHeight:1}}>+{yearlyGrowth.toLocaleString("cs-CZ")} Kč</div>
                <div style={{fontSize:"0.73rem",color:"#78716c",marginTop:"4px"}}>ročně · konzervativní scénář 3 % p.a. · realizuje se až při prodeji</div>
              </div>
            )}

            <div className="calc-note">* Výpočet je orientační. Konkrétní podmínky jsou vždy sjednány individuálně smluvně.</div>
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:"2.5rem"}}>
          <p style={{color:"#94a3b8",fontSize:"0.95rem",marginBottom:"1rem",fontWeight:500}}>Chcete konkrétní nabídku pro vaše možnosti?</p>
          <button className="btn-primary" style={{fontSize:"1rem",padding:"13px 32px"}} onClick={() => scrollTo("kontakt")}>Získat nezávaznou kalkulaci</button>
        </div>
      </section>

      {/* JAK TO FUNGUJE */}
      <section id="kroky" className="section steps-section">
        <div className="steps-wrap">
          <div className="steps-sticky reveal">
            <div className="section-label">Jak to funguje</div>
            <h2 className="section-title">Čtyři kroky k pravidelnému příjmu</h2>
            <p className="section-sub">Jednoduchý proces. Žádná složitost. Vše vyřešíme s vámi.</p>
            <div className="steps-photo">
              <div className="steps-photo-inner">
                <div className="steps-photo-big">0{activeStep+1}</div>
                <div className="steps-photo-label">z celkem 4 kroků</div>
              </div>
            </div>
          </div>
          <div className="steps-right">
            <div className="steps-line"/>
            <div className="steps-line-fill" style={{height: `${(activeStep / 3) * 100}%`}}/>
            {[
              ["Vyberete projekt","Prozkoumáte dostupné projekty nebo nám sdělíte vaše investiční cíle."],
              ["Stanovíme podmínky","Probereme vše na konzultaci – jasně a bez skrytých informací."],
              ["Nabudete vlastnictví","Nemovitost přejde do vašeho vlastnictví. Vše administrativní vyřešíme s vámi."],
              ["Získáváte předem stanovený příjem","Od prvního dne se staráme o vše. Vy přijímáte pravidelný měsíční příjem."],
            ].map(([title,text],i) => (
              <div key={i} className={`step-item${activeStep===i?" active":""}`} data-step={i} onMouseEnter={() => setActiveStep(i)}>
                <div className="step-num">{i+1}</div>
                <div className="step-content">
                  <div className="step-title">{title}</div>
                  <div className="step-text">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROČ */}
      <section className="section" style={{background:"var(--bg)"}}>
        <div className="section-header reveal">
          <div className="section-label">Proč investujbezstarosti</div>
          <h2 className="section-title">Jednoduchost. Předvídatelnost. Klid.</h2>
        </div>
        <div className="why-grid">
          {[
            [<IconShield/>,"Garantovaná výše měsíčního příjmu","Smluvně stanovená výše příjmu z nájmu odpovídající 5 % ročně. Víte přesně, kolik dostanete – bez překvapení."],
            [<IconSettings/>,"All-in správa bez operativy","Nájemníci, opravy, provoz – vše řešíme za vás. Vy se staráte jen o to, co vás baví."],
            [<IconUsers/>,"Prověřený systém výběru nájemníků","Nájemníky vybíráme systematicky a zodpovědně. Váš byt je v dobrých rukou."],
            [<IconTool/>,"Servisní a technický tým","Technické záležitosti zařídíme. Máme vlastní tým, který se stará o vše potřebné."],
          ].map(([icon,title,text],i) => (
            <div key={i} className={`why-card reveal d${i+1}`}>
              <div className="why-icon">{icon as React.ReactNode}</div>
              <div className="why-title">{title as string}</div>
              <div className="why-text">{text as string}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TÝM */}
      <section id="tym" className="section team-section">
        <div className="section-inner">
          <div className="section-header reveal" style={{textAlign:"center"}}>
            <div className="section-label">Za projektem stojí</div>
            <h2 className="section-title">Tým s historií a portfoliem</h2>
          </div>
          <div className="team-intro reveal">
            <div className="team-intro-text">
              Nejsme nová platforma. Stojí za námi reálné portfolio nemovitostí nakoupených jako celek, s existujícími nájemníky a provozní historií. Odprodáváme část tohoto portfolia investorům s garancí správy a příjmu. Každý projekt má za sebou tým lidí, kteří za výsledky ručí osobně.
            </div>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className={`team-card reveal d${i+1}`}>
                <div className="team-avatar">{member.name.charAt(0)}</div>
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
                <div className="team-desc">{member.desc}</div>
              </div>
            ))}
          </div>
          <div className="mini-cta reveal">
            <div><div className="mini-cta-title">Chcete nás poznat osobně?</div><div className="mini-cta-sub">Rádi se setkáme a probereme vaše investiční cíle.</div></div>
            <button className="btn-primary" onClick={() => scrollTo("kontakt")}>Domluvit schůzku</button>
          </div>
        </div>
      </section>

      {/* GARANCE */}
      <section id="garance" className="section guarantee-section">
        <div className="guarantee-grid">
          <div className="reveal">
            <div className="section-label">Garance a správa</div>
            <h2 className="section-title">Garantovaná výše příjmu a bezstarostná správa</h2>
            <p className="section-sub">Vlastníte nemovitost, dostáváte smluvně stanovenou výši měsíčního příjmu z nájmu – a my se staráme o vše ostatní.</p>
            <div className="guarantee-bullets">
              {[
                [<IconShield/>,"Správu řešíme za vás","Kompletní provoz nemovitosti je v našich rukou."],
                [<IconUsers/>,"Nájemníky vybíráme systémově","Propracovaný proces výběru nájemníků chrání vaši investici."],
                [<IconTool/>,"Technické věci zařídíme","Náš technický tým se postará o vše bez vašeho zapojení."],
              ].map(([icon,title,text],i) => (
                <div key={i} className="g-bullet">
                  <div className="g-bullet-icon">{icon as React.ReactNode}</div>
                  <div><div className="g-bullet-title">{title as string}</div><div className="g-bullet-text">{text as string}</div></div>
                </div>
              ))}
            </div>
            <div style={{marginTop:"2rem"}}>
              <button className="btn-primary" onClick={() => scrollTo("kontakt")}>Získat konzultaci</button>
            </div>
          </div>
          <div className="reveal d2">
            <div className="guarantee-card">
              <div className="guarantee-card-num">5 %</div>
              <div className="guarantee-card-label">garantovaná výše ročního příjmu z nájmu</div>
              <div style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.7)",marginTop:"0.5rem"}}>(odpovídající garantované výši měsíčního příjmu)</div>
              <div className="guarantee-card-sub">Fixní měsíční příjem. Předem stanovená částka. Žádná překvapení.</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="section-header reveal" style={{textAlign:"center"}}>
          <div className="section-label">Co říkají investoři</div>
          <h2 className="section-title">Zkušenosti našich klientů</h2>
        </div>
        <div className="reveal">
          <div className="t-card">
            <div className="t-stars">{"★".repeat(testimonials[testimonialIdx].stars)}</div>
            <div className="t-text">„{testimonials[testimonialIdx].text}"</div>
            <div className="t-author">{testimonials[testimonialIdx].name}</div>
            <div className="t-role">{testimonials[testimonialIdx].role}</div>
          </div>
          <div className="t-dots">
            {testimonials.map((_,i) => <button key={i} className={`t-dot${i===testimonialIdx?" active":""}`} onClick={() => setTestimonialIdx(i)}/>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faq-section">
        <div className="section-header reveal" style={{textAlign:"center",maxWidth:"600px",margin:"0 auto 3rem"}}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Časté otázky</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq,i) => (
            <div key={i} className={`faq-item${openFaq===i?" open":""}`}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                {faq.q}<div className="faq-icon"><IconPlus/></div>
              </button>
              {openFaq===i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
        <div className="mini-cta reveal" style={{maxWidth:"700px",margin:"2rem auto 0"}}>
          <div><div className="mini-cta-title">Máte další otázky?</div><div className="mini-cta-sub">Rádi odpovíme na vše při nezávazné konzultaci.</div></div>
          <button className="btn-primary" onClick={() => scrollTo("kontakt")}>Konzultace zdarma</button>
        </div>
      </section>

      {/* FORM */}
      <section id="kontakt" className="section form-section">
        <div className="form-wrap reveal">
          {formSubmitted ? (
            <div className="success">
              <div className="success-icon"><svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
              <div className="success-title">Odesláno! Brzy se ozveme.</div>
              <div className="success-text">Vaši žádost jsme přijali. Ozveme se vám co nejdříve a doporučíme vhodné řešení.</div>
              <a href="#" className="success-link">Stáhnout: Jak investovat bez starostí (PDF)</a>
            </div>
          ) : (
            <>
              <div className="form-head">
                <div className="section-label" style={{justifyContent:"center",display:"flex"}}>Kontakt</div>
                <h2 className="section-title">Nezávazná konzultace</h2>
                <p className="section-sub" style={{margin:"0 auto"}}>Ozveme se a doporučíme vhodné řešení nebo projekty.</p>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <input type="text" name="_honey" style={{display:"none"}}/>
                <input type="hidden" name="form-name" value="konzultace"/>
                <div className="form-grid">
                  <div className="fg full"><label className="f-label">Jméno a příjmení / Firma</label><input className="f-input" value={formState.name} onChange={e=>setFormState(s=>({...s,name:e.target.value}))} placeholder="Jan Novák"/>{formErrors.name&&<span className="f-error">{formErrors.name}</span>}</div>
                  <div className="fg"><label className="f-label">Email</label><input className="f-input" type="email" value={formState.email} onChange={e=>setFormState(s=>({...s,email:e.target.value}))} placeholder="jan@email.cz"/>{formErrors.email&&<span className="f-error">{formErrors.email}</span>}</div>
                  <div className="fg"><label className="f-label">Telefon</label><input className="f-input" type="tel" value={formState.phone} onChange={e=>setFormState(s=>({...s,phone:e.target.value}))} placeholder="+420 777 000 000"/>{formErrors.phone&&<span className="f-error">{formErrors.phone}</span>}</div>
                  <div className="fg full"><label className="f-label">Zájem</label><select className="f-select" value={formState.interest} onChange={e=>setFormState(s=>({...s,interest:e.target.value}))}><option value="">Vyberte...</option><option value="1">1 investiční byt</option><option value="vice">Více bytů</option><option value="portfolio">Chci poradit s portfoliem</option><option value="jine">Jiné</option></select>{formErrors.interest&&<span className="f-error">{formErrors.interest}</span>}</div>
                  <div className="fg full"><label className="f-label">Zpráva (volitelné)</label><textarea className="f-textarea" value={formState.message} onChange={e=>setFormState(s=>({...s,message:e.target.value}))} placeholder="Napište nám cokoli..."/></div>
                  <div className="fg full"><div className="f-check"><input type="checkbox" id="gdpr" checked={formState.gdpr} onChange={e=>setFormState(s=>({...s,gdpr:e.target.checked}))}/><label className="f-check-label" htmlFor="gdpr">Souhlasím se zpracováním osobních údajů v souladu s <a href="#" style={{color:"var(--blue)"}}>GDPR</a>.</label></div>{formErrors.gdpr&&<span className="f-error">{formErrors.gdpr}</span>}</div>
                </div>
                <button type="submit" className="f-submit" disabled={formLoading}>{formLoading?"Odesílám...":"Odeslat a získat konzultaci →"}</button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* CHAT MODAL */}
      {chatOpen && <ChatModal onClose={() => setChatOpen(false)} onCTA={() => { setChatOpen(false); scrollTo("kontakt"); }} />}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">investuj<span>bezstarosti</span>.cz</div>
            <div className="footer-motto">Vlastníte nemovitost. Dostáváte předem stanovený měsíční příjem. O vše ostatní se staráme my.</div>
          </div>
          <div>
            <div className="footer-col-title">Navigace</div>
            <div className="footer-links">
              {[["Projekty","projekty"],["Jak to funguje","kroky"],["Pro koho","prokoho"],["FAQ","faq"]].map(([label,id]) => (
                <a key={id} href="#" onClick={e=>{e.preventDefault();scrollTo(id);}}>{label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Kontakt</div>
            <div className="footer-links">
              <a href="mailto:info@investujbezstarosti.cz">info@investujbezstarosti.cz</a>
              <a href="tel:+420000000000">+420 000 000 000</a>
              <a href="#">GDPR</a>
              <a href="#">Všeobecné podmínky</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 investujbezstarosti.cz. Všechna práva vyhrazena.</span>
          <span className="footer-disclaimer">Podmínky investice jsou vždy individuálně sjednány smluvně.</span>
        </div>
      </footer>
    </div>
  );
}
