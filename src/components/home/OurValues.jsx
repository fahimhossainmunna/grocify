import { useRef, useEffect, useState } from "react";
import basketImg from "../../assets/basket-full-vegetables.png";

const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const TrustIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="#f97316" opacity="0.15"/>
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="#f97316" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FreshIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#16a34a" opacity="0.12"/>
    <path d="M12 8v4l3 3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="9" stroke="#16a34a" strokeWidth="1.8"/>
    <path d="M12 3v1M12 20v1M3 12H2M22 12h-1M5.6 5.6l-.7-.7M19.1 19.1l-.7-.7M18.4 5.6l.7-.7M4.9 19.1l.7-.7" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SafetyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="#2563eb" opacity="0.12"/>
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="#2563eb" strokeWidth="1.8" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2.5" fill="#2563eb"/>
    <path d="M12 9v-1M12 15v1" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const OrganicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22C12 22 4 16 4 9a8 8 0 0116 0c0 7-8 13-8 13z" fill="#9333ea" opacity="0.12"/>
    <path d="M12 22C12 22 4 16 4 9a8 8 0 0116 0c0 7-8 13-8 13z" stroke="#9333ea" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M12 12c0-3 2-5 4-6" stroke="#9333ea" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M12 12c0-2-1.5-4-4-5" stroke="#9333ea" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const LEFT_VALUES = [
  {
    icon: <TrustIcon />,
    title: "Trust",
    desc: "We build lasting relationships with our farm partners and customers through radical transparency and honest sourcing.",
    color: "#f97316",
    bg: "#fff7ed",
  },
  {
    icon: <FreshIcon />,
    title: "Always Fresh",
    desc: "From harvest to your door in under 24 hours. Our cold-chain logistics guarantees peak freshness every single time.",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
];

const RIGHT_VALUES = [
  {
    icon: <SafetyIcon />,
    title: "Food Safety",
    desc: "Every product is tested for pesticide residue and meets the highest safety standards before it ever reaches your home.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: <OrganicIcon />,
    title: "100% Organic",
    desc: "We partner exclusively with USDA-certified organic farms — no synthetic fertilizers, no GMOs, ever.",
    color: "#9333ea",
    bg: "#fdf4ff",
  },
];

const ValueCard = ({ item, align, delay }) => {
  const [ref, visible] = useInView();
  const isLeft = align === "left";

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isLeft ? "flex-end" : "flex-start",
        textAlign: isLeft ? "right" : "left",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateX(${isLeft ? -30 : 30}px)`,
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {/* Title row: icon beside heading */}
      <div style={{
        display: "flex",
        flexDirection: isLeft ? "row-reverse" : "row",
        alignItems: "center",
        gap: 14,
        marginBottom: 12,
      }}>
        {/* Icon circle */}
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: item.color,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 6px 20px ${item.color}40`,
          flexShrink: 0,
        }}>
          {/* Recolor icon white */}
          <div style={{ filter: "brightness(0) invert(1)" }}>
            {item.icon}
          </div>
        </div>

        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 26, fontWeight: 800,
          color: "#18181b", margin: 0,
          letterSpacing: "-0.02em",
        }}>
          {item.title}
        </h3>
      </div>

      {/* Accent line */}
      <div style={{
        width: 36, height: 2.5,
        background: item.color,
        borderRadius: 2,
        marginBottom: 12,
        alignSelf: isLeft ? "flex-end" : "flex-start",
      }} />

      {/* Description */}
      <p style={{
        fontSize: 13, color: "#71717a",
        lineHeight: 1.8, margin: 0,
        maxWidth: 230,
      }}>
        {item.desc}
      </p>
    </div>
  );
};

const OurValues = () => {
  const [titleRef, titleVisible] = useInView(0.2);
  const [imgRef, imgVisible]     = useInView(0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .ov-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        @keyframes floatImg { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .ov-img-wrap { animation: floatImg 5s ease-in-out infinite; }
        .ov-main { display: flex; align-items: center; justify-content: center; gap: 0; }
        .ov-side { flex: 1; display: flex; flex-direction: column; gap: 64px; }
        .ov-center { width: 340px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 24px; }
        @media (max-width: 900px) {
          .ov-main { flex-direction: column; }
          .ov-center { width: 260px; order: -1; }
        }
      `}</style>

      <section className="ov-root" style={{ padding: "100px 48px", background: "#fff", position: "relative", overflow: "hidden" }}>

        {/* Background decorations */}
        <div style={{ position: "absolute", top: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,0.05),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(22,163,74,0.05),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* ── Title ── */}
          <div
            ref={titleRef}
            style={{
              textAlign: "center", marginBottom: 72,
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "none" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.20)",
              borderRadius: 999, padding: "5px 16px", marginBottom: 18,
              fontSize: 11, fontWeight: 700, letterSpacing: "0.10em",
              textTransform: "uppercase", color: "#f97316",
            }}>
              💚 What We Stand For
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: 700, margin: "0 0 4px",
              letterSpacing: "-0.03em", lineHeight: 1.1,
              color: "#18181b",
            }}>
              <span style={{ color: "#f97316" }}>Our</span> Values
            </h2>
            {/* Underline */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
              <div style={{ width: 60, height: 3, borderRadius: 2, background: "linear-gradient(90deg,#f97316,#fbbf24)" }} />
            </div>
          </div>

          {/* ── Main Row ── */}
          <div className="ov-main">

            {/* Left values */}
            <div className="ov-side" style={{ paddingRight: 60 }}>
              {LEFT_VALUES.map((item, i) => (
                <ValueCard key={item.title} item={item} align="left" delay={i * 0.15} />
              ))}
            </div>

            {/* Center image */}
            <div className="ov-center">
              <div
                ref={imgRef}
                style={{
                  opacity: imgVisible ? 1 : 0,
                  transform: imgVisible ? "none" : "scale(0.9)",
                  transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
                }}
              >
                <div style={{ position: "relative", display: "inline-block" }}>
                  <div style={{ position: "absolute", inset: -20, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,0.10),transparent 70%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: -12, borderRadius: "50%", border: "1.5px dashed rgba(249,115,22,0.20)", pointerEvents: "none" }} />
                  <div className="ov-img-wrap">
                    <img src={basketImg} alt="Fresh produce basket" style={{ width: 280, height: 280, objectFit: "contain", display: "block", filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.12))" }} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                  {["🌾 Farm Direct", "✅ Lab Tested", "♻️ Eco Packed"].map(b => (
                    <div key={b} style={{ background: "#fafafa", border: "1.5px solid #f4f4f5", borderRadius: 999, padding: "5px 12px", fontSize: 11, fontWeight: 600, color: "#52525b" }}>{b}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right values */}
            <div className="ov-side" style={{ paddingLeft: 60 }}>
              {RIGHT_VALUES.map((item, i) => (
                <ValueCard key={item.title} item={item} align="right" delay={i * 0.15 + 0.1} />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default OurValues;