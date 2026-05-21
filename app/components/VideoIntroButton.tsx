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
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 12px 18px 12px 14px;
          font-family: inherit;
          color: #0f172a;
          text-align: left;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          box-shadow: 0 1px 2px rgba(15,23,42,0.04);
          max-width: 100%;
        }
        .vib-btn:hover {
          border-color: #366dff;
          box-shadow: 0 6px 20px rgba(54,109,255,0.12);
          transform: translateY(-1px);
        }
        .vib-play {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #366dff;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding-left: 2px;
        }
        .vib-text { display: flex; flex-direction: column; line-height: 1.25; }
        .vib-lead { font-size: 0.92rem; font-weight: 700; color: #0f172a; }
        .vib-sub { font-size: 0.78rem; color: #64748b; margin-top: 2px; }
        .vib-arrow { color: #366dff; font-weight: 700; margin-left: 4px; }

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
