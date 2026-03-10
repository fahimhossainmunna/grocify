import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    id: "fruits",
    label: "Fresh Fruits",
    emoji: "🍓",
    desc: "Seasonal & tropical picks",
    count: "120+ items",
    bg: "linear-gradient(135deg,#fff7ed,#ffedd5)",
    border: "#fed7aa",
    accent: "#f97316",
    hoverBg: "#f97316",
    img: "🍊🍇🍋",
  },
  {
    id: "veggies",
    label: "Vegetables",
    emoji: "🥦",
    desc: "Farm-fresh & organic",
    count: "90+ items",
    bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    border: "#bbf7d0",
    accent: "#16a34a",
    hoverBg: "#16a34a",
    img: "🥕🌽🥬",
  },
  {
    id: "dairy",
    label: "Dairy & Eggs",
    emoji: "🥛",
    desc: "Pure & natural dairy",
    count: "60+ items",
    bg: "linear-gradient(135deg,#eff6ff,#dbeafe)",
    border: "#bfdbfe",
    accent: "#2563eb",
    hoverBg: "#2563eb",
    img: "🧀🥚🧈",
  },
  {
    id: "meat",
    label: "Meat & Seafood",
    emoji: "🥩",
    desc: "Premium & sustainable",
    count: "50+ items",
    bg: "linear-gradient(135deg,#fff1f2,#ffe4e6)",
    border: "#fecdd3",
    accent: "#e11d48",
    hoverBg: "#e11d48",
    img: "🐟🍗🦐",
  },
];

const ShopByCategory = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .sbc-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }
        .sbc-card {
          border-radius: 24px;
          padding: 32px 28px;
          border: 1.5px solid;
          cursor: pointer;
          transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .28s ease;
          position: relative;
          overflow: hidden;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0;
          text-decoration: none;
          color: inherit;
        }
        .sbc-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 28px 64px rgba(0,0,0,0.13);
        }
        .sbc-card:hover .sbc-arrow {
          transform: translateX(4px);
          opacity: 1;
        }
        .sbc-card:hover .sbc-emoji-strip {
          transform: scale(1.08);
        }
        .sbc-arrow {
          opacity: 0;
          transition: transform .25s, opacity .25s;
          display: inline-block;
        }
        .sbc-emoji-strip {
          transition: transform .3s ease;
          display: block;
        }
        .sbc-shop-all {
          background: #18181b;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 14px 32px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all .22s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .sbc-shop-all:hover {
          background: #f97316;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(249,115,22,0.35);
        }
        @media (max-width: 900px) {
          .sbc-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .sbc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section className="sbc-root" style={{ padding: "96px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 52, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.20)", borderRadius: 999, padding: "5px 16px", marginBottom: 16, fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#f97316" }}>
                🛒 Browse Categories
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#18181b", margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                Shop by <span style={{ color: "#f97316" }}>Category</span>
              </h2>
              <p style={{ fontSize: 14, color: "#71717a", margin: "12px 0 0", lineHeight: 1.75, maxWidth: 440 }}>
                Handpicked selections from our finest farm partners — organized just for you.
              </p>
            </div>
            {/* Link to /shop instead of button + navigate */}
            <Link to="/shop" className="sbc-shop-all">
              View All Products <span>→</span>
            </Link>
          </div>

          {/* Category Cards — Link to instead of div + onClick navigate */}
          <div className="sbc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="sbc-card"
                style={{ background: cat.bg, borderColor: cat.border }}
              >
                {/* Decorative circle */}
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `${cat.accent}10`, pointerEvents: "none" }} />

                {/* Emoji strip */}
                <div className="sbc-emoji-strip" style={{ fontSize: 28, letterSpacing: 4, marginBottom: 20 }}>
                  {cat.img}
                </div>

                {/* Main emoji */}
                <div style={{ width: 60, height: 60, borderRadius: 18, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: `0 4px 16px ${cat.accent}22`, marginBottom: 18, border: `1.5px solid ${cat.border}` }}>
                  {cat.emoji}
                </div>

                {/* Text */}
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "#18181b", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                  {cat.label}
                </h3>
                <p style={{ fontSize: 12.5, color: "#71717a", margin: "0 0 16px", lineHeight: 1.6 }}>
                  {cat.desc}
                </p>

                {/* Footer row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${cat.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: cat.accent, letterSpacing: "0.06em", background: "#fff", borderRadius: 999, padding: "3px 10px", border: `1px solid ${cat.border}` }}>
                    {cat.count}
                  </span>
                  <span style={{ fontSize: 18, color: cat.accent, fontWeight: 700 }} className="sbc-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom strip */}
          <div style={{ marginTop: 40, borderRadius: 20, background: "linear-gradient(135deg,#18181b,#27272a)", padding: "28px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              {["🌿 100% Organic", "🚚 Free Delivery $99+", "⭐ 4.9 Rating", "🔄 Easy Returns"].map(b => (
                <div key={b} style={{ fontSize: 13, fontWeight: 500, color: "#a3a3a3" }}>{b}</div>
              ))}
            </div>
            {/* Link to /shop instead of button + navigate */}
            <Link to="/shop" className="sbc-shop-all" style={{ background: "#f97316", padding: "11px 24px", fontSize: 13 }}>
              Shop Now →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default ShopByCategory;