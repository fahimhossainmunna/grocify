import groceryImg from "../../assets/grocery.png";
import useCountUp from "../../hooks/useCountUp";

const Hero = () => {
  const customers = useCountUp(10, 2000); 
  const products  = useCountUp(500, 2200); 
  const organic   = useCountUp(99, 1800);   

  const stats = [
    { hookData: customers, value: customers.count, suffix: "K+", label: "Happy Customers" },
    { hookData: products,  value: products.count,  suffix: "+",  label: "Fresh Products"  },
    { hookData: organic,   value: organic.count,   suffix: "%",  label: "Organic Certified" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .hero-root { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes floatImg {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.7) rotate(-6deg); }
          70%  { transform: scale(1.08) rotate(1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.35); }
          50%       { box-shadow: 0 0 0 8px rgba(249,115,22,0); }
        }

        .hero-badge   { animation: popIn  0.7s cubic-bezier(.4,0,.2,1) 0.10s both; }
        .hero-title   { animation: fadeUp 0.7s cubic-bezier(.4,0,.2,1) 0.25s both; }
        .hero-sub     { animation: fadeUp 0.7s cubic-bezier(.4,0,.2,1) 0.42s both; }
        .hero-actions { animation: fadeUp 0.7s cubic-bezier(.4,0,.2,1) 0.58s both; }
        .hero-stats   { animation: fadeUp 0.7s cubic-bezier(.4,0,.2,1) 0.72s both; }
        .hero-img-wrap{ animation: fadeIn 0.9s cubic-bezier(.4,0,.2,1) 0.30s both; }
        .hero-img     { animation: floatImg 5s ease-in-out infinite; }

        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #f97316; color: #fff;
          font-weight: 700; font-size: 14px; letter-spacing: 0.04em;
          padding: 15px 34px; border-radius: 999px; border: none;
          cursor: pointer; text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 6px 24px rgba(249,115,22,0.28);
          transition: background .22s, transform .18s, box-shadow .22s;
        }
        .hero-btn-primary:hover {
          background: #ea580c;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(249,115,22,0.38);
        }

        .hero-btn-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: #18181b;
          font-weight: 600; font-size: 14px;
          padding: 15px 28px; border-radius: 999px;
          border: 2px solid #e5e5e5; cursor: pointer;
          text-decoration: none; font-family: 'DM Sans', sans-serif;
          transition: border-color .2s, color .2s, transform .18s;
        }
        .hero-btn-secondary:hover {
          border-color: #f97316; color: #f97316;
          transform: translateY(-2px);
        }

        .stat-divider { width: 1px; height: 36px; background: #e5e5e5; }

        .badge-dot {
          width: 8px; height: 8px; background: #f97316;
          border-radius: 50%; flex-shrink: 0;
          animation: badgePulse 2s ease infinite;
        }

        .hero-blob {
          position: absolute; border-radius: 50%;
          filter: blur(60px); pointer-events: none; z-index: 0;
        }

        .img-tag {
          position: absolute; background: #fff;
          border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          padding: 10px 16px; display: flex; align-items: center; gap: 10px;
          animation: popIn 0.8s cubic-bezier(.4,0,.2,1) 0.9s both;
        }

        @media (max-width: 1024px) {
          .hero-grid    { flex-direction: column !important; text-align: center; }
          .hero-actions { justify-content: center !important; }
          .hero-stats   { justify-content: center !important; }
          .hero-badge   { margin: 0 auto; }
          .hero-img-wrap{ margin-top: 32px; }
          .img-tag-left { left: 0 !important; }
          .img-tag-right{ right: 0 !important; }
        }
        @media (max-width: 640px) {
          .hero-section { padding: 48px 20px 56px !important; }
          .img-tag      { display: none !important; }
        }
      `}</style>

      <section
        className="hero-root hero-section"
        style={{
          position: "relative", overflow: "hidden",
          padding: "72px 24px 80px",
          background: "linear-gradient(135deg, #fffbf7 0%, #fff 60%, #fff7ed 100%)",
          minHeight: "88vh", display: "flex", alignItems: "center",
        }}
      >
        {/* Blobs */}
        <div className="hero-blob" style={{ width: 480, height: 480, background: "rgba(249,115,22,0.07)", top: -120, right: -80 }} />
        <div className="hero-blob" style={{ width: 320, height: 320, background: "rgba(249,115,22,0.05)", bottom: -60, left: -80 }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48 }}>

            {/* ── Left ── */}
            <div style={{ flex: "0 0 auto", maxWidth: 560, width: "100%" }}>

              {/* Badge */}
              <div
                className="hero-badge"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff7ed", border: "1.5px solid #fed7aa", borderRadius: 999, padding: "7px 16px", marginBottom: 28 }}
              >
                <span className="badge-dot" />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#ea580c", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Export Best Quality
                </span>
              </div>

              {/* Headline */}
              <h1
                className="hero-title"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(40px, 5.5vw, 68px)", fontWeight: 700, lineHeight: 1.1, color: "#18181b", margin: "0 0 24px", letterSpacing: "-0.02em" }}
              >
                Tasty Organic<br />
                <span style={{ color: "#f97316" }}>Fruits</span>{" "}&amp;{" "}
                <span style={{ color: "#f97316" }}>Veggies</span><br />
                In Your City
              </h1>

              {/* Subtext */}
              <p
                className="hero-sub"
                style={{ fontSize: 16, fontWeight: 400, color: "#71717a", lineHeight: 1.75, maxWidth: 440, margin: "0 0 40px" }}
              >
                Bred for a high content of beneficial substances. Our products are all fresh, healthy, and delivered straight to your door.
              </p>

              {/* CTA Buttons */}
              <div className="hero-actions" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <a href="shop" className="hero-btn-primary">
                  Shop Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a href="process" className="hero-btn-secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Watch Process
                </a>
              </div>

              {/* ── Stats with Count-Up ── */}
              <div
                className="hero-stats"
                style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 52, flexWrap: "wrap" }}
              >
                {stats.map((stat, i) => (
                  <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 28 }}>
                    {i > 0 && <div className="stat-divider" />}
                    <div ref={stat.hookData.ref}>
                      <div style={{ fontSize: 26, fontWeight: 800, color: "#18181b", lineHeight: 1, letterSpacing: "-0.02em" }}>
                        {stat.value}
                        <span style={{ color: "#f97316" }}>{stat.suffix}</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "#a3a3a3", marginTop: 4, letterSpacing: "0.04em" }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* ── Right Image ── */}
            <div
              className="hero-img-wrap"
              style={{ flex: "0 0 auto", position: "relative", maxWidth: 520, width: "100%" }}
            >
              <div style={{ position: "absolute", inset: "5%", background: "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 75%)", borderRadius: "50%", zIndex: 0 }} />

              <img
                src={groceryImg}
                alt="Fresh organic vegetables and fruits basket"
                className="hero-img"
                style={{ width: "100%", maxWidth: 500, objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.12))" }}
              />

              {/* Floating tag — Organic */}
              <div className="img-tag img-tag-left" style={{ bottom: "18%", left: "-28px" }}>
                <div style={{ width: 36, height: 36, background: "#fff7ed", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🥦</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#18181b" }}>100% Organic</div>
                  <div style={{ fontSize: 11, color: "#a3a3a3", marginTop: 1 }}>Farm fresh daily</div>
                </div>
              </div>

              {/* Floating tag — Delivery */}
              <div className="img-tag img-tag-right" style={{ top: "12%", right: "-20px" }}>
                <div style={{ width: 36, height: 36, background: "#fff7ed", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🚚</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#18181b" }}>Free Delivery</div>
                  <div style={{ fontSize: 11, color: "#a3a3a3", marginTop: 1 }}>Orders over ৳999</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;