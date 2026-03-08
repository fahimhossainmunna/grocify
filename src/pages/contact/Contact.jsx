import { useState, useRef, useEffect } from "react";
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

/* ── Contact Page ─────────────────────────────────────────── */
const Contact = () => {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  };

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n; });
  };

  const INFO_CARDS = [
    { icon: "📍", title: "Visit Us",    lines: ["42 Green Market Street", "Farm District, NY 10001"],  color: "#f97316", bg: "#fff7ed" },
    { icon: "📞", title: "Call Us",     lines: ["+1 (800) GROCIFY",  "Mon–Sat, 8am – 8pm EST"],        color: "#16a34a", bg: "#f0fdf4" },
    { icon: "✉️", title: "Email Us",    lines: ["hello@grocify.fresh", "We reply within 24 hours"],    color: "#2563eb", bg: "#eff6ff" },
    { icon: "💬", title: "Live Chat",   lines: ["Available on the app", "Mon–Sun, 7am – 10pm"],        color: "#9333ea", bg: "#fdf4ff" },
  ];

  const FAQS = [
    { q: "How quickly do you deliver?",        a: "Most orders arrive within 24 hours of harvest. Same-day delivery is available in select cities." },
    { q: "Can I change my order after placing?", a: "Yes — you can modify orders up to 2 hours after placing them via the app or by contacting us." },
    { q: "Do you offer subscriptions?",        a: "Absolutely! Our weekly and bi-weekly subscription boxes save you 15% and are fully customizable." },
    { q: "What if produce arrives damaged?",   a: "We offer a 100% freshness guarantee. Just snap a photo and we'll replace or refund immediately." },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .ct-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        .ct-input { width: 100%; background: #f9f9f9; border: 1.5px solid #e5e5e5; border-radius: 12px; padding: 13px 16px; font-size: 14px; color: #18181b; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color .2s, background .2s; resize: none; }
        .ct-input:focus { border-color: #f97316; background: #fff; }
        .ct-input.error { border-color: #ef4444; }
        .ct-label { font-size: 12px; font-weight: 700; color: #52525b; letter-spacing: 0.04em; display: block; margin-bottom: 7px; }
        .ct-submit { width: 100%; background: #f97316; color: #fff; border: none; border-radius: 14px; padding: 15px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; }
        .ct-submit:hover:not(:disabled) { background: #ea580c; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.35); }
        .ct-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .ct-info-card { border-radius: 20px; padding: 28px 24px; transition: transform .25s, box-shadow .25s; cursor: default; }
        .ct-info-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
        .ct-faq-item { border: 1.5px solid #f4f4f5; border-radius: 16px; overflow: hidden; transition: border-color .2s; }
        .ct-faq-item:hover { border-color: #f97316; }
        .ct-faq-btn { width: 100%; background: none; border: none; padding: 18px 22px; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-family: 'DM Sans', sans-serif; }
        .ct-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.20); border-radius: 999px; padding: 5px 16px; font-size: 11px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: #f97316; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .ct-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; display: inline-block; }
        @media (max-width: 768px) {
          .ct-main-grid { grid-template-columns: 1fr !important; }
          .ct-info-grid { grid-template-columns: 1fr 1fr !important; }
          .ct-hero-inner { flex-direction: column !important; }
        }
        @media (max-width: 480px) {
          .ct-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="ct-root" style={{ background: "#fafafa" }}>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section style={{ background: "linear-gradient(135deg,#fffbf7 0%,#fff 55%,#eff6ff 100%)", padding: "80px 24px 72px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,0.07),transparent 70%)", pointerEvents: "none" }} />

          <Container>
            {/* Breadcrumb */}
            <Flex className="gap-2 mb-12" style={{ fontSize: 12, color: "#a3a3a3", fontWeight: 500, animation: "fadeUp .5s ease both" }}>
              <a href="/" style={{ color: "#a3a3a3", textDecoration: "none" }}
                onMouseOver={e => e.currentTarget.style.color = "#f97316"}
                onMouseOut={e => e.currentTarget.style.color = "#a3a3a3"}>Home</a>
              <span>›</span>
              <span style={{ color: "#18181b", fontWeight: 600 }}>Contact Us</span>
            </Flex>

            <div className="ct-hero-inner" style={{ display: "flex", alignItems: "center", gap: 64 }}>
              <div style={{ flex: 1 }}>
                <div className="ct-pill" style={{ marginBottom: 24, animation: "fadeUp .5s .1s ease both", opacity: 0, animationFillMode: "forwards" }}>
                  💬 Get in Touch
                </div>
                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,6vw,68px)", fontWeight: 700, color: "#18181b", margin: "0 0 20px", lineHeight: 1.07, letterSpacing: "-0.03em", animation: "fadeUp .6s .15s ease both", opacity: 0, animationFillMode: "forwards" }}>
                  We'd Love to<br /><em style={{ color: "#f97316", fontStyle: "italic" }}>Hear From You</em>
                </h1>
                <p style={{ fontSize: 15, color: "#71717a", lineHeight: 1.85, maxWidth: 440, margin: "0 0 32px", animation: "fadeUp .6s .25s ease both", opacity: 0, animationFillMode: "forwards" }}>
                  Questions, feedback, or just want to say hi? Our team is here for you. We promise a real human will read every message.
                </p>
                <Flex className="gap-4 flex-wrap" style={{ animation: "fadeUp .6s .35s ease both", opacity: 0, animationFillMode: "forwards" }}>
                  {["24hr Response", "Real Humans", "100% Helpful"].map(b => (
                    <div key={b} style={{ background: "#fff", border: "1.5px solid #f4f4f5", borderRadius: 999, padding: "7px 16px", fontSize: 12, fontWeight: 600, color: "#52525b", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                      ✓ {b}
                    </div>
                  ))}
                </Flex>
              </div>

              {/* Floating cards visual */}
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                {INFO_CARDS.map((card, i) => (
                  <div key={card.title} style={{ background: card.bg, border: `1.5px solid ${card.color}22`, borderRadius: 20, padding: "22px 20px", width: 140, textAlign: "center", animation: `fadeUp .5s ${.1 + i * .08}s ease both`, opacity: 0, animationFillMode: "forwards" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{card.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#18181b" }}>{card.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── INFO CARDS ────────────────────────────────────── */}
        <section style={{ padding: "72px 24px", background: "#fff", borderBottom: "1px solid #f4f4f5" }}>
          <Container>
            <div className="ct-info-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {INFO_CARDS.map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.09}>
                  <div className="ct-info-card" style={{ background: card.bg, border: `1.5px solid ${card.color}20` }}>
                    <div style={{ fontSize: 36, marginBottom: 16 }}>{card.icon}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, color: "#18181b", margin: "0 0 10px" }}>{card.title}</h3>
                    {card.lines.map(line => (
                      <div key={line} style={{ fontSize: 13, color: "#71717a", lineHeight: 1.7 }}>{line}</div>
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* ── FORM + FAQ ────────────────────────────────────── */}
        <section style={{ padding: "96px 24px", background: "#fafafa" }}>
          <Container>
            <div className="ct-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

              {/* Contact Form */}
              <FadeIn direction="left">
                <div style={{ background: "#fff", border: "1.5px solid #f4f4f5", borderRadius: 24, padding: "40px 36px", boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}>
                  <div className="ct-pill" style={{ marginBottom: 20 }}>✍️ Send a Message</div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, color: "#18181b", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                    Drop Us a <span style={{ color: "#f97316" }}>Line</span>
                  </h2>
                  <p style={{ fontSize: 13, color: "#71717a", margin: "0 0 28px", lineHeight: 1.7 }}>
                    Fill in the form and we'll get back to you within 24 hours.
                  </p>

                  {sent ? (
                    <div style={{ textAlign: "center", padding: "48px 24px" }}>
                      <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: "#18181b", margin: "0 0 12px" }}>Message Sent!</h3>
                      <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.8 }}>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                      <button onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
                        style={{ marginTop: 24, background: "#f97316", color: "#fff", border: "none", borderRadius: 12, padding: "11px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                        Send Another
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <Flex className="gap-4">
                        <div style={{ flex: 1 }}>
                          <label className="ct-label">Full Name</label>
                          <input className={`ct-input ${errors.name ? "error" : ""}`} placeholder="John Doe"
                            value={form.name} onChange={e => handleChange("name", e.target.value)} />
                          {errors.name && <p style={{ fontSize: 11, color: "#ef4444", margin: "5px 0 0" }}>{errors.name}</p>}
                        </div>
                        <div style={{ flex: 1 }}>
                          <label className="ct-label">Email Address</label>
                          <input className={`ct-input ${errors.email ? "error" : ""}`} type="email" placeholder="you@email.com"
                            value={form.email} onChange={e => handleChange("email", e.target.value)} />
                          {errors.email && <p style={{ fontSize: 11, color: "#ef4444", margin: "5px 0 0" }}>{errors.email}</p>}
                        </div>
                      </Flex>
                      <div>
                        <label className="ct-label">Subject</label>
                        <input className={`ct-input ${errors.subject ? "error" : ""}`} placeholder="How can we help?"
                          value={form.subject} onChange={e => handleChange("subject", e.target.value)} />
                        {errors.subject && <p style={{ fontSize: 11, color: "#ef4444", margin: "5px 0 0" }}>{errors.subject}</p>}
                      </div>
                      <div>
                        <label className="ct-label">Message</label>
                        <textarea className={`ct-input ${errors.message ? "error" : ""}`} rows={5} placeholder="Tell us what's on your mind..."
                          value={form.message} onChange={e => handleChange("message", e.target.value)} />
                        {errors.message && <p style={{ fontSize: 11, color: "#ef4444", margin: "5px 0 0" }}>{errors.message}</p>}
                      </div>
                      <button className="ct-submit" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                          <Flex className="justify-center gap-2">
                            <span className="ct-spinner" />
                            <span>Sending...</span>
                          </Flex>
                        ) : "Send Message →"}
                      </button>
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* FAQ */}
              <FadeIn direction="right" delay={0.1}>
                <div>
                  <div className="ct-pill" style={{ marginBottom: 20 }}>❓ Quick Answers</div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 700, color: "#18181b", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                    Frequently <span style={{ color: "#f97316" }}>Asked</span>
                  </h2>
                  <p style={{ fontSize: 13, color: "#71717a", margin: "0 0 28px", lineHeight: 1.7 }}>
                    Can't find your answer here? Send us a message!
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {FAQS.map((faq, i) => (
                      <div key={i} className="ct-faq-item">
                        <button className="ct-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: "#18181b" }}>{faq.q}</span>
                          <span style={{ fontSize: 18, color: "#f97316", transition: "transform .2s", transform: openFaq === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
                        </button>
                        {openFaq === i && (
                          <div style={{ padding: "0 22px 18px", fontSize: 13, color: "#71717a", lineHeight: 1.8 }}>
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Map placeholder */}
                  <div style={{ marginTop: 28, borderRadius: 20, overflow: "hidden", border: "1.5px solid #f4f4f5", background: "linear-gradient(135deg,#f0fdf4,#fff7ed)", height: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <div style={{ fontSize: 36 }}>📍</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#18181b" }}>42 Green Market Street</div>
                    <div style={{ fontSize: 12, color: "#71717a" }}>Farm District, NY 10001</div>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                      style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: "#f97316", textDecoration: "none" }}>
                      Open in Maps →
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

      </div>
    </>
  );
};

export default Contact;