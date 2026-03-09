import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';

const ErrorPage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .err-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          padding: 60px 0;
        }

        /* Grain overlay */
        .err-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Floating orbs */
        .err-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .err-orb-1 {
          width: 500px; height: 500px;
          top: -120px; right: -100px;
          background: radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%);
          animation: orbFloat1 12s ease-in-out infinite;
        }
        .err-orb-2 {
          width: 400px; height: 400px;
          bottom: -80px; left: -80px;
          background: radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%);
          animation: orbFloat2 15s ease-in-out infinite;
        }
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-30px, 40px) scale(1.08); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(20px, -30px) scale(1.05); }
        }

        /* Floating emojis */
        .err-floats {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .err-float {
          position: absolute;
          font-size: 32px;
          opacity: 0.12;
          animation: floatAround var(--dur, 8s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          filter: grayscale(0.3);
          user-select: none;
        }
        @keyframes floatAround {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-18px) rotate(6deg); }
          66%      { transform: translateY(10px) rotate(-4deg); }
        }

        /* Main content */
        .err-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 680px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Tag */
        .err-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1.5px solid #f4f4f5;
          border-radius: 999px;
          padding: 6px 18px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a3a3a3;
          margin-bottom: 40px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          animation: fadeDown 0.6s ease both;
        }
        .err-tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f97316;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform: scale(1); }
          50%      { opacity:0.5; transform: scale(1.4); }
        }

        /* 404 */
        .err-404-wrap {
          position: relative;
          margin-bottom: 8px;
          animation: fadeDown 0.6s 0.1s ease both;
        }
        .err-404-bg {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: clamp(160px, 22vw, 280px);
          color: #f4f4f5;
          line-height: 0.85;
          letter-spacing: -0.04em;
          user-select: none;
          display: block;
        }
        .err-404-fg {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 16px;
        }
        .err-404-fg span {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(52px, 7vw, 80px);
          color: #18181b;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .err-404-fg span em {
          color: #f97316;
          font-style: inherit;
        }

        /* Divider */
        .err-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 32px auto;
          max-width: 320px;
          animation: fadeDown 0.6s 0.2s ease both;
        }
        .err-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e5e5, transparent);
        }
        .err-divider-icon {
          font-size: 18px;
          opacity: 0.4;
        }

        /* Description */
        .err-desc {
          font-size: 16px;
          line-height: 1.7;
          color: #71717a;
          font-weight: 400;
          max-width: 440px;
          margin: 0 auto 48px;
          animation: fadeDown 0.6s 0.3s ease both;
        }

        /* CTA Button */
        .err-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #18181b;
          color: #fff;
          text-decoration: none;
          border-radius: 16px;
          padding: 16px 36px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 8px 32px rgba(24,24,27,0.18);
          animation: fadeDown 0.6s 0.4s ease both;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .err-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f97316;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
          z-index: 0;
        }
        .err-btn:hover::before { transform: translateX(0); }
        .err-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 14px 40px rgba(249,115,22,0.30); }
        .err-btn > * { position: relative; z-index: 1; }
        .err-btn-arrow {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          display: flex;
        }
        .err-btn:hover .err-btn-arrow { transform: translateX(-4px); }

        /* Bottom links */
        .err-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 36px;
          font-size: 12px;
          color: #a3a3a3;
          font-weight: 500;
          animation: fadeDown 0.6s 0.5s ease both;
        }
        .err-link {
          color: #71717a;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
          padding: 4px 8px;
          border-radius: 8px;
        }
        .err-link:hover { color: #f97316; background: #fff7ed; }
        .err-sep { color: #d4d4d4; }

        /* Fade animation */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="err-root">
        {/* Orbs */}
        <div className="err-orb err-orb-1"/>
        <div className="err-orb err-orb-2"/>

        {/* Floating produce */}
        <div className="err-floats">
          {[
            { e:"🥦", t:"12%", l:"8%",  dur:"9s",  delay:"0s"    },
            { e:"🍓", t:"20%", l:"88%", dur:"11s", delay:"1.2s"  },
            { e:"🥕", t:"68%", l:"6%",  dur:"8s",  delay:"0.5s"  },
            { e:"🍋", t:"75%", l:"90%", dur:"13s", delay:"2s"    },
            { e:"🫑", t:"40%", l:"4%",  dur:"10s", delay:"1.8s"  },
            { e:"🍇", t:"55%", l:"92%", dur:"7s",  delay:"0.8s"  },
            { e:"🥬", t:"85%", l:"50%", dur:"12s", delay:"3s"    },
            { e:"🍊", t:"8%",  l:"50%", dur:"9s",  delay:"1.5s"  },
          ].map((f, i) => (
            <span key={i} className="err-float"
              style={{ top:f.t, left:f.l, "--dur":f.dur, "--delay":f.delay }}>
              {f.e}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="err-content">

          {/* Tag */}
          <div className="err-tag">
            <span className="err-tag-dot"/>
            Error 404
          </div>

          {/* 404 display */}
          <div className="err-404-wrap">
            <span className="err-404-bg" aria-hidden="true">404</span>
            <div className="err-404-fg">
              <span>Page <em>Not</em> Found</span>
            </div>
          </div>

          {/* Divider */}
          <div className="err-divider">
            <div className="err-divider-line"/>
            <span className="err-divider-icon">🌿</span>
            <div className="err-divider-line"/>
          </div>

          {/* Description */}
          <p className="err-desc">
            Looks like this page wandered off the shelf. The item you're looking for may have been moved, renamed, or is temporarily out of stock.
          </p>

          {/* CTA */}
          <Link to="/" className="err-btn">
            <span className="err-btn-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </span>
            <span>Back to Home</span>
          </Link>

          {/* Secondary links */}
          <div className="err-links">
            <span>Or visit</span>
            <Link to="/shop" className="err-link">Shop</Link>
            <span className="err-sep">·</span>
            <Link to="/about" className="err-link">About</Link>
            <span className="err-sep">·</span>
            <Link to="/contact" className="err-link">Contact</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;