"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const VIDEO_ID = "soRMc8LHS0c";

type Variant = "inline" | "compact";

export default function VideoIntroButton({ variant = "inline" }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const modal = open && (
    <div className="vib-modal" role="dialog" aria-modal="true" aria-label="Úvodní video" onClick={() => setOpen(false)}>
      <div className="vib-modal-inner" onClick={e => e.stopPropagation()}>
        <button type="button" className="vib-close" onClick={() => setOpen(false)} aria-label="Zavřít video">×</button>
        <div className="vib-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`}
            title="InvestujBezStarostí.cz – jak to funguje"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <style>{`
        .vib-modal{position:fixed;inset:0;background:rgba(15,23,42,0.82);display:flex;align-items:center;justify-content:center;padding:24px;z-index:2147483647;animation:vib-fade 0.18s ease-out;}
        .vib-modal-inner{position:relative;width:100%;max-width:960px;}
        .vib-close{position:absolute;top:-42px;right:0;background:transparent;border:none;color:#fff;font-size:2rem;line-height:1;cursor:pointer;padding:4px 10px;font-family:inherit;}
        .vib-close:hover{opacity:0.7;}
        .vib-video{position:relative;width:100%;padding-top:56.25%;background:#000;border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);}
        .vib-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}
        @keyframes vib-fade{from{opacity:0;}to{opacity:1;}}
        @media (max-width:520px){.vib-close{top:-38px;}}
      `}</style>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={`vib-btn vib-${variant}`}
        onClick={() => setOpen(true)}
        aria-label="Přehrát úvodní video – Jak to funguje"
      >
        <span className="vib-play" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 1.5v11l9-5.5-9-5.5z" fill="currentColor"/>
          </svg>
        </span>
        <span className="vib-text">
          <span className="vib-lead">Investujete poprvé do nemovitostí?</span>
          <span className="vib-sub">Podívejte se, jak to funguje · video 7 min</span>
        </span>
        <span className="vib-arrow" aria-hidden="true">→</span>
      </button>

      {mounted && modal && createPortal(modal, document.body)}

      <style jsx>{`
        .vib-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          border: 1px solid rgba(217,119,6,0.4);
          border-radius: 14px;
          padding: 12px 18px 12px 14px;
          font-family: inherit;
          color: #ffffff;
          text-align: left;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
          box-shadow: 0 6px 20px rgba(217,119,6,0.28);
          max-width: 100%;
        }
        .vib-btn:hover {
          box-shadow: 0 10px 28px rgba(217,119,6,0.42);
          transform: translateY(-1px);
        }
        .vib-play {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ffffff;
          color: #d97706;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding-left: 2px;
          box-shadow: 0 0 0 0 rgba(255,255,255,0.6);
          animation: vibPulse 2.2s ease-out infinite;
        }
        .vib-text { display: flex; flex-direction: column; line-height: 1.25; }
        .vib-lead { font-size: 0.92rem; font-weight: 700; color: #ffffff; }
        .vib-sub { font-size: 0.78rem; color: rgba(255,255,255,0.9); margin-top: 2px; }
        .vib-arrow { color: #ffffff; font-weight: 700; margin-left: 4px; }

        @keyframes vibPulse {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.55); }
          70%  { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }

        .vib-compact { padding: 10px 14px 10px 12px; gap: 10px; }
        .vib-compact .vib-play { width: 26px; height: 26px; }
        .vib-compact .vib-lead { font-size: 0.82rem; }
        .vib-compact .vib-sub { font-size: 0.72rem; }

        @media (max-width: 520px) {
          .vib-btn { padding: 10px 14px 10px 12px; gap: 10px; }
          .vib-lead { font-size: 0.85rem; }
          .vib-sub { font-size: 0.72rem; }
          .vib-arrow { display: none; }
        }
      `}</style>
    </>
  );
}
