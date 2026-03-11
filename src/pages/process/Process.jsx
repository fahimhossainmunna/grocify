import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import Flex from "../../components/ui/Flex";

/* ── useInView hook ───────────────────────────────────────── */
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

const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const [ref, visible] = useInView();
  const transforms = { up: "translateY(36px)", left: "translateX(-36px)", right: "translateX(36px)", none: "none" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

/* ── Data ─────────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    icon: "🌾",
    title: "Farm Selection",
    subtitle: "Only the Best Farms",
    desc: "We personally visit and vet every farm partner. Each must meet our strict organic certification standards, fair labor practices, and sustainable farming criteria before joining the Grocify network.",
    tags: ["Organic Certified", "Soil Testing", "Fair Trade"],
    color: "#f97316",
    bg: "#fff7ed",
  },
  {
    number: "02",
    icon: "🌱",
    title: "Seasonal Harvesting",
    subtitle: "Picked at Peak Ripeness",
    desc: "Our farm partners harvest produce only when it's at peak nutritional value and flavor. No artificial ripening agents — just patience, timing, and respect for natural growing cycles.",
    tags: ["Seasonal Picks", "No Artificial Ripening", "Peak Nutrition"],
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    number: "03",
    icon: "❄️",
    title: "Cold-Chain Logistics",
    subtitle: "Fresh From Field to Van",
    desc: "Within hours of harvest, produce enters our temperature-controlled logistics network. Our refrigerated fleet maintains optimal conditions throughout every mile of transit.",
    tags: ["2–4°C Transit", "GPS Tracked", "Same-Day Pickup"],
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    number: "04",
    icon: "🔍",
    title: "Quality Inspection",
    subtitle: "Zero Compromise Standards",
    desc: "Every batch is inspected by our quality team at our sorting hubs. We check for freshness, size consistency, and zero pesticide residue before anything gets packed.",
    tags: ["Pesticide Testing", "Visual Grading", "Batch Logging"],
    color: "#9333ea",
    bg: "#fdf4ff",
  },
  {
    number: "05",
    icon: "📦",
    title: "Eco Packaging",
    subtitle: "Good for Food, Good for Earth",
    desc: "Produce is packed in biodegradable, compostable packaging designed to maintain freshness for up to 5 days. No single-use plastics — ever.",
    tags: ["100% Biodegradable", "Compostable", "Plastic-Free"],
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    number: "06",
    icon: "🚚",
    title: "Doorstep Delivery",
    subtitle: "Within 24 Hours of Harvest",
    desc: "Our delivery partners bring your order straight to your door — often within 24 hours of the produce being harvested. Track your order live from farm to doorstep.",
    tags: ["24hr Delivery", "Live Tracking", "Contactless Drop"],
    color: "#e11d48",
    bg: "#fff1f2",
  },
];

const CERTIFICATIONS = [
  { icon: "🏅", label: "USDA Organic Certified"     },
  { icon: "🌍", label: "Fair Trade Partner"          },
  { icon: "♻️", label: "Zero Waste Certified"       },
  { icon: "🧪", label: "Pesticide-Free Verified"    },
  { icon: "🚜", label: "Regenerative Ag Supporter"  },
  { icon: "💧", label: "Water Stewardship Award"    },
];

/* ── Process Page ─────────────────────────────────────────── */
const Process = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .pr-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        .pr-tag { display: inline-flex; align-items: center; background: rgba(0,0,0,0.05); border-radius: 999px; padding: 3px 10px; font-size: 11px; font-weight: 600; color: #52525b; }
        .pr-step-card { background: #fff; border: 1.5px solid #f4f4f5; border-radius: 24px; padding: 36px 32px; transition: transform .28s, box-shadow .28s; position: relative; overflow: hidden; }
        .pr-step-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.09); }
        .pr-cert-card { background: #fff; border: 1.5px solid #f4f4f5; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; gap: 14px; transition: transform .22s, box-shadow .22s; }
        .pr-cert-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .pr-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.20); border-radius: 999px; padding: 5px 16px; font-size: 11px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: #f97316; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .pr-hero-float { animation: float 4s ease-in-out infinite; }
        @media (max-width: 768px) {
          .pr-steps-grid { grid-template-columns: 1fr !important; }
          .pr-cert-grid { grid-template-columns: 1fr 1fr !important; }
          .pr-hero-inner { flex-direction: column !important; }
        }
        @media (max-width: 480px) {
          .pr-cert-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="pr-root" style={{ background: "#fafafa" }}>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(135deg,#fffbf7 0%,#fff 60%,#f0fdf4 100%)", padding: "80px 24px 72px", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,0.07),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, right: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(22,163,74,0.06),transparent 70%)", pointerEvents: "none" }} />

          <Container>
            {/* Breadcrumb */}
            <Flex className="gap-2 mb-12" style={{ fontSize: 12, color: "#a3a3a3", fontWeight: 500, animation: "fadeUp .5s ease both" }}>
              <Link to="/" style={{ color: "#a3a3a3", textDecoration: "none" }}
                onMouseOver={e => e.currentTarget.style.color = "#f97316"}
                onMouseOut={e => e.currentTarget.style.color = "#a3a3a3"}>Home</Link>
              <span>›</span>
              <span style={{ color: "#18181b", fontWeight: 600 }}>Our Process</span>
            </Flex>

            <div className="pr-hero-inner" style={{ display: "flex", alignItems: "center", gap: 64 }}>
              <div style={{ flex: 1 }}>
                <div className="pr-pill" style={{ marginBottom: 24, animation: "fadeUp .5s .1s ease both", opacity: 0, animationFillMode: "forwards" }}>
                  🔬 How It Works
                </div>
                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,6vw,68px)", fontWeight: 700, color: "#18181b", margin: "0 0 20px", lineHeight: 1.07, letterSpacing: "-0.03em", animation: "fadeUp .6s .15s ease both", opacity: 0, animationFillMode: "forwards" }}>
                  From Soil to<br /><em style={{ color: "#f97316", fontStyle: "italic" }}>Your Doorstep</em>
                </h1>
                <p style={{ fontSize: 15, color: "#71717a", lineHeight: 1.85, maxWidth: 460, margin: "0 0 32px", animation: "fadeUp .6s .25s ease both", opacity: 0, animationFillMode: "forwards" }}>
                  We obsess over every step of the journey — so you don't have to. Here's exactly how fresh, organic produce goes from a family farm to your kitchen table.
                </p>
                <Flex className="gap-4 flex-wrap" style={{ animation: "fadeUp .6s .35s ease both", opacity: 0, animationFillMode: "forwards" }}>
                  {["6-Step Process", "24hr Harvest-to-Door", "100% Traceable"].map(badge => (
                    <div key={badge} style={{ background: "#fff", border: "1.5px solid #f4f4f5", borderRadius: 999, padding: "7px 16px", fontSize: 12, fontWeight: 600, color: "#52525b", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                      ✓ {badge}
                    </div>
                  ))}
                </Flex>
              </div>

              {/* Visual */}
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <div className="pr-hero-float" style={{ position: "relative", width: 300, height: 300 }}>
                  <div style={{ width: 300, height: 300, borderRadius: "50%", background: "linear-gradient(135deg,#fff7ed,#f0fdf4)", border: "2px dashed rgba(249,115,22,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100 }}>
                    🌿
                  </div>
                  {[
                    { emoji: "🌾", label: "Farm",     angle: -60  },
                    { emoji: "❄️", label: "Cold",     angle: 0    },
                    { emoji: "📦", label: "Pack",     angle: 60   },
                    { emoji: "🚚", label: "Deliver",  angle: 120  },
                    { emoji: "🔍", label: "Inspect",  angle: 180  },
                    { emoji: "🌱", label: "Harvest",  angle: 240  },
                  ].map(({ emoji, label, angle }) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = 150 + 148 * Math.cos(rad) - 28;
                    const y = 150 + 148 * Math.sin(rad) - 28;
                    return (
                      <div key={label} style={{ position: "absolute", top: y, left: x, width: 56, height: 56, background: "#fff", borderRadius: "50%", border: "1.5px solid #f4f4f5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", fontSize: 18 }}>
                        {emoji}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── STEPS ─────────────────────────────────────────── */}
        <section style={{ padding: "96px 24px", background: "#fff" }}>
          <Container>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div className="pr-pill" style={{ marginBottom: 20, display: "inline-flex" }}>📋 Step by Step</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,4vw,50px)", fontWeight: 700, color: "#18181b", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
                  The Grocify <span style={{ color: "#f97316" }}>6-Step Promise</span>
                </h2>
                <p style={{ fontSize: 14, color: "#71717a", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
                  Every order follows the same rigorous journey. No shortcuts, no compromises.
                </p>
              </div>
            </FadeIn>

            <div className="pr-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {STEPS.map((step, i) => (
                <FadeIn key={step.number} delay={i * 0.08}>
                  <div className="pr-step-card">
                    <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Cormorant Garamond',serif", fontSize: 72, fontWeight: 700, color: step.color, opacity: 0.07, lineHeight: 1, userSelect: "none" }}>
                      {step.number}
                    </div>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: step.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>
                      {step.icon}
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", background: step.bg, borderRadius: 999, padding: "2px 10px", marginBottom: 10 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.10em", color: step.color }}>STEP {step.number}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "#18181b", margin: "0 0 4px" }}>{step.title}</h3>
                    <p style={{ fontSize: 11, fontWeight: 600, color: step.color, margin: "0 0 14px", letterSpacing: "0.03em" }}>{step.subtitle}</p>
                    <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.8, margin: "0 0 20px" }}>{step.desc}</p>
                    <Flex className="gap-2 flex-wrap">
                      {step.tags.map(tag => (
                        <div key={tag} className="pr-tag" style={{ background: step.bg, color: step.color }}>{tag}</div>
                      ))}
                    </Flex>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* ── FLOW DIAGRAM ──────────────────────────────────── */}
        <section style={{ padding: "80px 24px", background: "#18181b", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(249,115,22,0.08),transparent 60%)", pointerEvents: "none" }} />
          <Container>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                  The Full <span style={{ color: "#f97316" }}>Journey</span>
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap", rowGap: 20 }}>
                {STEPS.map((step, i) => (
                  <div key={step.number} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 56, height: 56, borderRadius: "50%", background: step.bg, border: `2px solid ${step.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                        {step.icon}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#a3a3a3", textAlign: "center", maxWidth: 70 }}>{step.title}</div>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: 40, height: 2, background: "linear-gradient(90deg,rgba(249,115,22,0.6),rgba(249,115,22,0.2))", margin: "0 4px", marginBottom: 28, flexShrink: 0 }} />
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* ── CERTIFICATIONS ────────────────────────────────── */}
        <section style={{ padding: "96px 24px", background: "#fafafa" }}>
          <Container>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <div className="pr-pill" style={{ marginBottom: 20, display: "inline-flex" }}>🏅 Trust & Compliance</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#18181b", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                  Our <span style={{ color: "#f97316" }}>Certifications</span>
                </h2>
                <p style={{ fontSize: 14, color: "#71717a", maxWidth: 440, margin: "0 auto", lineHeight: 1.8 }}>
                  Every claim we make is backed by third-party verification and industry-leading certifications.
                </p>
              </div>
            </FadeIn>
            <div className="pr-cert-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {CERTIFICATIONS.map((cert, i) => (
                <FadeIn key={cert.label} delay={i * 0.07}>
                  <div className="pr-cert-card">
                    <span style={{ fontSize: 28 }}>{cert.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#18181b" }}>{cert.label}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section style={{ padding: "80px 24px", background: "#fff", borderTop: "1px solid #f4f4f5" }}>
          <Container>
            <FadeIn>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>🛒</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#18181b", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                  Ready to Taste the <span style={{ color: "#f97316" }}>Difference?</span>
                </h2>
                <p style={{ fontSize: 14, color: "#71717a", margin: "0 auto 32px", maxWidth: 440, lineHeight: 1.8 }}>
                  Now that you know the process, taste it for yourself. Your first delivery ships free.
                </p>
                {/* Link to /shop */}
                <Link to="/shop"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f97316", color: "#fff", textDecoration: "none", borderRadius: 14, padding: "14px 32px", fontSize: 14, fontWeight: 700, transition: "all .2s", boxShadow: "0 8px 24px rgba(249,115,22,0.30)" }}
                  onMouseOver={e => { e.currentTarget.style.background = "#ea580c"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "#f97316"; e.currentTarget.style.transform = "none"; }}>
                  Shop Fresh Now →
                </Link>
              </div>
            </FadeIn>
          </Container>
        </section>

      </div>
    </>
  );
};

export default Process;