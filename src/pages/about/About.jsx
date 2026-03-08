import { useEffect, useRef, useState } from "react";
import basketImg from "../../assets/basket-full-vegetables.png";
import freshFruitsImg from "../../assets/fresh-fruits.png";
import fruitsVeggiesImg from "../../assets/fruits-and-veggies.png";
import dairyImg from "../../assets/dairy-and-eggs.png";

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

/* ── Counter component ────────────────────────────────────── */
const Counter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, visible]    = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ── Fade-in section ──────────────────────────────────────── */
const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const [ref, visible] = useInView();
  const transforms = { up:"translateY(40px)", left:"translateX(-40px)", right:"translateX(40px)", none:"none" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

/* ── About Page ───────────────────────────────────────────── */
const About = () => {
  const VALUES = [
    { icon:"🌱", title:"100% Organic",    desc:"Every product is certified organic, sourced from farms that never use harmful pesticides or chemicals." },
    { icon:"🤝", title:"Farm Partnerships", desc:"We work directly with 120+ family farms, ensuring fair wages and sustainable growing practices." },
    { icon:"🚚", title:"Daily Fresh",      desc:"Our cold-chain logistics delivers produce within 24 hours of harvest — freshness you can taste." },
    { icon:"♻️", title:"Zero Waste",       desc:"Biodegradable packaging, composting programs, and zero-landfill warehouses — we mean it." },
  ];

  const TEAM = [
    { name:"Sarah Chen",      role:"Founder & CEO",       emoji:"👩‍🌾", bg:"#fff7ed" },
    { name:"Marcus Williams", role:"Head of Sourcing",     emoji:"👨‍🍳", bg:"#f0fdf4" },
    { name:"Priya Sharma",    role:"Sustainability Lead",  emoji:"👩‍🔬", bg:"#eff6ff" },
    { name:"James O'Brien",   role:"Logistics Director",   emoji:"👨‍💼", bg:"#fdf4ff" },
  ];

  const MILESTONES = [
    { year:"2018", event:"Founded in a Brooklyn farmers market stall" },
    { year:"2019", event:"Partnered with first 10 organic farms"      },
    { year:"2021", event:"Launched same-day delivery in NYC"          },
    { year:"2023", event:"Expanded to 15 cities across the US"        },
    { year:"2025", event:"500+ farm partners, 1M+ happy customers"    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .ab-root * { box-sizing: border-box; }
        .ab-root { font-family: 'DM Sans', sans-serif; background: #fafafa; }
        .ab-value-card { background: #fff; border: 1.5px solid #f4f4f5; border-radius: 20px; padding: 32px 28px; transition: transform .28s, box-shadow .28s; cursor: default; }
        .ab-value-card:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(0,0,0,0.09); }
        .ab-team-card { border-radius: 20px; overflow: hidden; transition: transform .28s, box-shadow .28s; cursor: default; }
        .ab-team-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.10); }
        .ab-milestone-dot { width: 14px; height: 14px; border-radius: 50%; background: #f97316; flex-shrink: 0; box-shadow: 0 0 0 4px rgba(249,115,22,0.18); }
        .ab-stat-card { background: #fff; border: 1.5px solid #f4f4f5; border-radius: 20px; padding: 32px 24px; text-align: center; transition: transform .25s, box-shadow .25s; }
        .ab-stat-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
        .ab-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.20); border-radius: 999px; padding: 5px 16px; font-size: 11px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: #f97316; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
        .ab-hero-img { animation: float 5s ease-in-out infinite; }
        @media (max-width: 768px) {
          .ab-hero-grid { flex-direction: column !important; }
          .ab-values-grid { grid-template-columns: 1fr !important; }
          .ab-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .ab-team-grid { grid-template-columns: 1fr 1fr !important; }
          .ab-story-grid { flex-direction: column !important; }
        }
        @media (max-width: 480px) {
          .ab-stats-grid { grid-template-columns: 1fr !important; }
          .ab-team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="ab-root">

        {/* ── HERO ──────────────────────────────────────────── */}
        <section style={{ background:"linear-gradient(135deg,#fffbf7 0%,#fff 55%,#fff7ed 100%)", padding:"80px 24px 0", overflow:"hidden", position:"relative" }}>
          {/* Decorative blob */}
          <div style={{ position:"absolute", top:-60, right:-60, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(249,115,22,0.06) 0%,transparent 70%)", pointerEvents:"none" }}/>

          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            {/* Breadcrumb */}
            <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#a3a3a3", fontWeight:500, marginBottom:48, animation:"fadeUp .6s ease both" }}>
              <a href="/" style={{ color:"#a3a3a3", textDecoration:"none" }}
                onMouseOver={e => e.currentTarget.style.color="#f97316"}
                onMouseOut={e => e.currentTarget.style.color="#a3a3a3"}>Home</a>
              <span>›</span>
              <span style={{ color:"#18181b", fontWeight:600 }}>About Us</span>
            </div>

            <div className="ab-hero-grid" style={{ display:"flex", alignItems:"center", gap:64, paddingBottom:80 }}>
              {/* Text */}
              <div style={{ flex:1 }}>
                <div className="ab-pill" style={{ marginBottom:24, animation:"fadeUp .6s .1s ease both", opacity:0, animationFillMode:"forwards" }}>
                  🌿 Our Story
                </div>
                <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(42px,6vw,72px)", fontWeight:700, color:"#18181b", margin:"0 0 24px", lineHeight:1.05, letterSpacing:"-0.03em", animation:"fadeUp .6s .2s ease both", opacity:0, animationFillMode:"forwards" }}>
                  Bringing the Farm<br/>
                  <em style={{ color:"#f97316", fontStyle:"italic" }}>to Your Table</em>
                </h1>
                <p style={{ fontSize:16, color:"#71717a", lineHeight:1.85, maxWidth:480, margin:"0 0 36px", animation:"fadeUp .6s .3s ease both", opacity:0, animationFillMode:"forwards" }}>
                  Grocify was born from a simple belief: everyone deserves access to fresh, honest food. We connect urban families directly with the farmers who grow their food — cutting out the middleman, preserving nutrients, and building a food system that works for people and the planet.
                </p>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap", animation:"fadeUp .6s .4s ease both", opacity:0, animationFillMode:"forwards" }}>
                  <a href="/shop"
                    style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#f97316", color:"#fff", textDecoration:"none", borderRadius:14, padding:"14px 28px", fontSize:14, fontWeight:700, transition:"all .2s" }}
                    onMouseOver={e => { e.currentTarget.style.background="#ea580c"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)"; }}
                    onMouseOut={e => { e.currentTarget.style.background="#f97316"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                    Shop Fresh Now →
                  </a>
                  <a href="/process"
                    style={{ display:"inline-flex", alignItems:"center", gap:8, background:"transparent", color:"#18181b", textDecoration:"none", borderRadius:14, padding:"14px 28px", fontSize:14, fontWeight:700, border:"1.5px solid #e5e5e5", transition:"all .2s" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.color="#f97316"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor="#e5e5e5"; e.currentTarget.style.color="#18181b"; }}>
                    Our Process
                  </a>
                </div>
              </div>

              {/* Image stack */}
              <div style={{ flex:1, position:"relative", display:"flex", justifyContent:"center", alignItems:"center", minHeight:420 }}>
                <div style={{ position:"relative", width:320, height:380 }}>
                  {/* Back card */}
                  <div style={{ position:"absolute", top:20, right:-20, width:260, height:300, borderRadius:24, overflow:"hidden", background:"#fff7ed", border:"1.5px solid #fed7aa" }}>
                    <img src={freshFruitsImg} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.85 }}/>
                  </div>
                  {/* Main card */}
                  <div className="ab-hero-img" style={{ position:"absolute", top:0, left:0, width:280, height:340, borderRadius:24, overflow:"hidden", background:"#fff", boxShadow:"0 32px 80px rgba(0,0,0,0.15)", border:"1.5px solid #f4f4f5" }}>
                    <img src={basketImg} alt="Fresh basket" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  </div>
                  {/* Floating badge */}
                  <div style={{ position:"absolute", bottom:-16, right:10, background:"#fff", borderRadius:16, padding:"12px 18px", boxShadow:"0 12px 32px rgba(0,0,0,0.12)", border:"1px solid #f4f4f5", display:"flex", alignItems:"center", gap:10, animation:"float 4s 1s ease-in-out infinite" }}>
                    <span style={{ fontSize:24 }}>🌾</span>
                    <div>
                      <div style={{ fontSize:12, fontWeight:800, color:"#18181b" }}>120+ Farms</div>
                      <div style={{ fontSize:10, color:"#a3a3a3" }}>Trusted Partners</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────── */}
        <section style={{ padding:"72px 24px", background:"#fff", borderTop:"1px solid #f4f4f5", borderBottom:"1px solid #f4f4f5" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <div className="ab-stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
              {[
                { value:1,    suffix:"M+",  label:"Happy Customers",  icon:"😊", color:"#f97316" },
                { value:120,  suffix:"+",   label:"Farm Partners",     icon:"🌾", color:"#16a34a" },
                { value:500,  suffix:"+",   label:"Fresh Products",    icon:"🥦", color:"#2563eb" },
                { value:99,   suffix:"%",   label:"Organic Certified", icon:"✅", color:"#9333ea" },
              ].map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.1}>
                  <div className="ab-stat-card">
                    <div style={{ fontSize:32, marginBottom:8 }}>{stat.icon}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, fontWeight:700, color:stat.color, lineHeight:1, marginBottom:8 }}>
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div style={{ fontSize:13, color:"#71717a", fontWeight:500 }}>{stat.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR STORY ─────────────────────────────────────── */}
        <section style={{ padding:"96px 24px", background:"#fafafa" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <div className="ab-story-grid" style={{ display:"flex", gap:80, alignItems:"center" }}>
              {/* Images */}
              <FadeIn direction="left" delay={0}>
                <div style={{ flex:1, position:"relative", minHeight:420 }}>
                  <div style={{ borderRadius:24, overflow:"hidden", background:"#f0fdf4", aspectRatio:"4/3" }}>
                    <img src={fruitsVeggiesImg} alt="Our story" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  </div>
                  <div style={{ position:"absolute", bottom:-24, right:-24, background:"#18181b", borderRadius:20, padding:"20px 24px", color:"#fff", boxShadow:"0 16px 48px rgba(0,0,0,0.20)" }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:700, color:"#f97316", lineHeight:1 }}>2018</div>
                    <div style={{ fontSize:12, color:"#a3a3a3", marginTop:4 }}>Founded with love</div>
                  </div>
                </div>
              </FadeIn>

              {/* Timeline */}
              <div style={{ flex:1 }}>
                <FadeIn direction="right" delay={0.1}>
                  <div className="ab-pill" style={{ marginBottom:20 }}>📖 Our Journey</div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:700, color:"#18181b", margin:"0 0 16px", lineHeight:1.15, letterSpacing:"-0.02em" }}>
                    From a Market Stall<br/><span style={{ color:"#f97316" }}>to 15 Cities</span>
                  </h2>
                  <p style={{ fontSize:14, color:"#71717a", lineHeight:1.85, margin:"0 0 36px" }}>
                    It started with a folding table, a cooler of vegetables, and an unshakeable belief that food should taste like something. Today Grocify reaches over a million households — but the mission hasn't changed a bit.
                  </p>
                </FadeIn>

                <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                  {MILESTONES.map((m, i) => (
                    <FadeIn key={m.year} delay={0.15 + i * 0.08}>
                      <div style={{ display:"flex", gap:20, paddingBottom: i < MILESTONES.length - 1 ? 24 : 0, position:"relative" }}>
                        {/* Line */}
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>
                          <div className="ab-milestone-dot"/>
                          {i < MILESTONES.length - 1 && (
                            <div style={{ width:2, flex:1, background:"linear-gradient(#f97316,rgba(249,115,22,0.15))", marginTop:4 }}/>
                          )}
                        </div>
                        <div style={{ paddingBottom: i < MILESTONES.length - 1 ? 8 : 0 }}>
                          <div style={{ fontSize:12, fontWeight:800, color:"#f97316", letterSpacing:"0.08em", marginBottom:4 }}>{m.year}</div>
                          <div style={{ fontSize:14, color:"#52525b", lineHeight:1.6 }}>{m.event}</div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR VALUES ────────────────────────────────────── */}
        <section style={{ padding:"96px 24px", background:"#fff" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <FadeIn>
              <div style={{ textAlign:"center", marginBottom:56 }}>
                <div className="ab-pill" style={{ marginBottom:20, display:"inline-flex" }}>💚 What We Stand For</div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:700, color:"#18181b", margin:"0 0 16px", letterSpacing:"-0.02em" }}>
                  Our Core <span style={{ color:"#f97316" }}>Values</span>
                </h2>
                <p style={{ fontSize:15, color:"#71717a", maxWidth:520, margin:"0 auto", lineHeight:1.8 }}>
                  These aren't buzzwords — they're the principles every decision at Grocify is measured against.
                </p>
              </div>
            </FadeIn>

            <div className="ab-values-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
              {VALUES.map((v, i) => (
                <FadeIn key={v.title} delay={i * 0.1}>
                  <div className="ab-value-card">
                    <div style={{ fontSize:36, marginBottom:18 }}>{v.icon}</div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#18181b", margin:"0 0 12px" }}>{v.title}</h3>
                    <p style={{ fontSize:13, color:"#71717a", lineHeight:1.8, margin:0 }}>{v.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ──────────────────────────────────────────── */}
        <section style={{ padding:"96px 24px", background:"linear-gradient(180deg,#fafafa,#fff7ed 100%)" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>
            <FadeIn>
              <div style={{ textAlign:"center", marginBottom:56 }}>
                <div className="ab-pill" style={{ marginBottom:20, display:"inline-flex" }}>👥 The People</div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:700, color:"#18181b", margin:"0 0 16px", letterSpacing:"-0.02em" }}>
                  Meet the <span style={{ color:"#f97316" }}>Team</span>
                </h2>
                <p style={{ fontSize:15, color:"#71717a", maxWidth:480, margin:"0 auto", lineHeight:1.8 }}>
                  Passionate people who believe great food changes lives.
                </p>
              </div>
            </FadeIn>

            <div className="ab-team-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
              {TEAM.map((member, i) => (
                <FadeIn key={member.name} delay={i * 0.1}>
                  <div className="ab-team-card">
                    <div style={{ background:member.bg, height:180, display:"flex", alignItems:"center", justifyContent:"center", fontSize:72 }}>
                      {member.emoji}
                    </div>
                    <div style={{ background:"#fff", padding:"20px 22px", borderTop:"1.5px solid #f4f4f5" }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:"#18181b", marginBottom:4 }}>{member.name}</div>
                      <div style={{ fontSize:12, color:"#f97316", fontWeight:600, letterSpacing:"0.04em" }}>{member.role}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ────────────────────────────────────── */}
        <section style={{ padding:"96px 24px", background:"#18181b", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 50%,rgba(249,115,22,0.12),transparent 60%)", pointerEvents:"none" }}/>
          <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center", position:"relative" }}>
            <FadeIn>
              <div style={{ fontSize:48, marginBottom:24 }}>🌿</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,5vw,60px)", fontWeight:700, color:"#fff", margin:"0 0 20px", letterSpacing:"-0.03em", lineHeight:1.1 }}>
                Ready to Eat <span style={{ color:"#f97316" }}>Better?</span>
              </h2>
              <p style={{ fontSize:15, color:"#71717a", lineHeight:1.85, margin:"0 auto 36px", maxWidth:480 }}>
                Join over a million families who've switched to farm-fresh. Your first order ships free.
              </p>
              <a href="/shop"
                style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#f97316", color:"#fff", textDecoration:"none", borderRadius:16, padding:"16px 36px", fontSize:15, fontWeight:700, transition:"all .2s", boxShadow:"0 8px 32px rgba(249,115,22,0.35)" }}
                onMouseOver={e => { e.currentTarget.style.background="#ea580c"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(249,115,22,0.45)"; }}
                onMouseOut={e => { e.currentTarget.style.background="#f97316"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 8px 32px rgba(249,115,22,0.35)"; }}>
                Start Shopping Fresh →
              </a>
            </FadeIn>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;