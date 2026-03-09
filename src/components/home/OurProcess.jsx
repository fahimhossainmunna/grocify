import { useRef, useEffect, useState } from "react";
import Container from "../ui/Container";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const STEPS = [
  {
    number: "1",
    title: "Sourcing",
    desc: "We personally visit and vet every organic farm partner before they join the Grocify network.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C12 22 4 16 4 9a8 8 0 0116 0c0 7-8 13-8 13z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    position: "bottom", // card below the number
  },
  {
    number: "2",
    title: "Manufacturing",
    desc: "Produce is carefully sorted, cleaned and packed in our state-of-the-art eco facilities.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    position: "top",
  },
  {
    number: "3",
    title: "Quality Control",
    desc: "Every batch is lab-tested for pesticide residue and inspected for freshness before dispatch.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 6.5 7 1-5 5 1.2 7L12 18l-6.2 3.5L7 14.5 2 9.5l7-1z"/>
      </svg>
    ),
    position: "bottom",
  },
  {
    number: "4",
    title: "Logistics",
    desc: "Our refrigerated fleet delivers within 24 hours of harvest — tracked live from farm to door.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 5v4h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    position: "top",
  },
];

const StepItem = ({ step, index }) => {
  const [ref, visible] = useInView();
  const isTop = step.position === "top";
  const delay = index * 0.12;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {/* TOP CARD (only if position === "top") */}
      {isTop && (
        <div style={{ marginBottom: 24, textAlign: "left", width: "100%", maxWidth: 200 }}>
          {/* Icon circle */}
          <div className="op-icon-circle" style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "#f97316",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", marginBottom: 12,
            boxShadow: "0 6px 20px rgba(249,115,22,0.35)",
          }}>
            {step.icon}
          </div>
          <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 800, color: "#18181b", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            {step.title}
          </h4>
          <p style={{ fontSize: 12, color: "#71717a", lineHeight: 1.75, margin: 0 }}>
            {step.desc}
          </p>
        </div>
      )}

      {/* NUMBER CIRCLE */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="op-num-circle" style={{
          width: 72, height: 72, borderRadius: "50%",
          border: "2px dashed rgba(249,115,22,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: isTop ? "#fff" : "#fff7ed",
            border: `2px solid ${isTop ? "#e5e5e5" : "#fed7aa"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 22, fontWeight: 900,
              color: isTop ? "#a3a3a3" : "#f97316",
              lineHeight: 1,
            }}>
              {step.number}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM CARD (only if position === "bottom") */}
      {!isTop && (
        <div style={{ marginTop: 24, textAlign: "left", width: "100%", maxWidth: 200 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "#f97316",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", marginBottom: 12,
            boxShadow: "0 6px 20px rgba(249,115,22,0.35)",
          }}>
            {step.icon}
          </div>
          <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 800, color: "#18181b", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            {step.title}
          </h4>
          <p style={{ fontSize: 12, color: "#71717a", lineHeight: 1.75, margin: 0 }}>
            {step.desc}
          </p>
        </div>
      )}

      {/* Spacer for the side that has no card (to keep number row aligned) */}
      {isTop && (
        <div style={{ marginTop: 24, height: 110 }} />
      )}
      {!isTop && (
        <div style={{ marginBottom: 24, height: 110, order: -1 }} />
      )}
    </div>
  );
};

const OurProcess = () => {
  const [titleRef, titleVisible] = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;700;800;900&display=swap');
        .op-root * { box-sizing: border-box; }
        .op-steps-row { display: flex; align-items: center; gap: 0; position: relative; z-index: 2; }
        .op-line { position: absolute; left: 8%; right: 8%; top: 50%; height: 2px; background: linear-gradient(90deg,#f97316,rgba(249,115,22,0.15),#f97316,rgba(249,115,22,0.15)); z-index: 1; transform: translateY(-50%); }
        .op-mobile-list { display: none; flex-direction: column; gap: 20px; }
        .op-num-circle { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease; }
        .op-num-circle:hover { transform: scale(1.12); box-shadow: 0 8px 28px rgba(249,115,22,0.25) !important; }
        .op-icon-circle { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease; }
        .op-icon-circle:hover { transform: translateY(-5px); box-shadow: 0 14px 30px rgba(249,115,22,0.40) !important; }
        .op-step-card { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease; }
        .op-step-card:hover { transform: translateX(7px); box-shadow: 0 8px 28px rgba(249,115,22,0.13) !important; border-color: #fed7aa !important; }
        .op-step-card:hover .op-step-icon { background: #f97316 !important; border-color: #f97316 !important; color: #fff !important; }
        .op-step-icon { transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease !important; }
        @media (max-width: 700px) {
          .op-steps-row { display: none !important; }
          .op-line { display: none !important; }
          .op-mobile-list { display: flex !important; }
        }
      `}</style>

      <section className="op-root" style={{ padding: "96px 24px", background: "#fff" }}>
        <Container>

          {/* Title */}
          <div
            ref={titleRef}
            style={{
              marginBottom: 72,
              textAlign: "center",
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,5vw,54px)", fontWeight: 700, color: "#18181b", margin: "0 0 4px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              <span style={{ color: "#f97316" }}>Our</span> Process
            </h2>
            <div style={{ width: 56, height: 3, background: "linear-gradient(90deg,#f97316,#fbbf24)", borderRadius: 2, marginTop: 14, margin: "14px auto 0" }} />
          </div>

          {/* Zigzag steps — desktop */}
          <div style={{ position: "relative" }}>
            <div className="op-line" />
            <div className="op-steps-row">
              {STEPS.map((step, i) => (
                <StepItem key={step.number} step={step} index={i} />
              ))}
            </div>
          </div>

          {/* Mobile — premium vertical stepper */}
          <div className="op-mobile-list">
            {STEPS.map((step, i) => (
              <div key={step.number}>
                {/* Step card */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  {/* Left: number + arrow line */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    {/* Number circle */}
                    <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px dashed rgba(249,115,22,0.40)", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", boxShadow: "0 4px 16px rgba(249,115,22,0.12)" }}>
                      <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(249,115,22,0.35)" }}>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 900, color: "#fff" }}>{step.number}</span>
                      </div>
                    </div>
                    {/* Arrow line — only between steps, not after last */}
                    {i < STEPS.length - 1 && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4 }}>
                        <div style={{ width: 2, height: 28, background: "linear-gradient(to bottom, #f97316, rgba(249,115,22,0.3))" }} />
                        {/* Arrowhead */}
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1L6 7L11 1" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Right: content card */}
                  <div className="op-step-card" style={{ flex: 1, background: "#fff", borderRadius: 16, border: "1.5px solid #f4f4f5", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div className="op-step-icon" style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff7ed", border: "1.5px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center", color: "#f97316", flexShrink: 0 }}>
                        {step.icon}
                      </div>
                      <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 800, color: "#18181b", margin: 0, letterSpacing: "-0.01em" }}>{step.title}</h4>
                    </div>
                    <p style={{ fontSize: 12.5, color: "#71717a", lineHeight: 1.8, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </Container>
      </section>
    </>
  );
};

export default OurProcess;