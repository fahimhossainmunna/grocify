import { useState } from "react";
import { Link } from "react-router";

/* ── Social Icons ─── */
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12z" />
  </svg>
);

/* ── Leaf decoration SVG ─── */
const LeafDeco = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    opacity="0.06"
  >
    <path
      d="M10 110 C10 110 20 20 110 10 C110 10 60 40 50 110 Z"
      fill="#f97316"
    />
    <path d="M10 110 L50 110 L110 10" stroke="#f97316" strokeWidth="1.5" />
  </svg>
);

const FOOTER_LINKS = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Contact Us", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", to: "/faq" },
    { label: "Delivery Info", to: "/delivery-info" },
    { label: "Returns Policy", to: "/returns" },
    { label: "Track Order", to: "/track-order" },
    { label: "Privacy Policy", to: "/privacy" },
  ],
};

const SOCIALS = [
  { icon: <FacebookIcon />, label: "Facebook", href: "#" },
  { icon: <InstagramIcon />, label: "Instagram", href: "#" },
  { icon: <TwitterIcon />, label: "Twitter", href: "#" },
  { icon: <YoutubeIcon />, label: "YouTube", href: "#" },
];

const BADGES = [
  "🌿 100% Organic",
  "🚚 Free Delivery $99+",
  "♻️ Eco Packaging",
  "⭐ 4.9 Rated",
];

/* ── Footer Component ── */
const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .gr-footer * { box-sizing: border-box; }
        .gr-footer { font-family: 'DM Sans', sans-serif; }
        .gr-footer-link { color: #a3a3a3; text-decoration: none; font-size: 13px; font-weight: 500; transition: color .2s, transform .2s; display: inline-block; }
        .gr-footer-link:hover { color: #f97316; transform: translateX(4px); }
        .gr-social-btn { width: 40px; height: 40px; border-radius: 12px; border: 1.5px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: center; color: #a3a3a3; cursor: pointer; transition: all .25s; text-decoration: none; }
        .gr-social-btn:hover { background: #f97316; border-color: #f97316; color: #fff; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(249,115,22,0.35); }
        .gr-badge { display: flex; align-items: center; gap: 6px; background: rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.10); border-radius: 999px; padding: 6px 14px; font-size: 12px; font-weight: 500; color: #3f3f46; white-space: nowrap; }
        .gr-newsletter-input { flex: 1; background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.10); border-radius: 12px; padding: 12px 18px; font-size: 13px; color: #fff; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color .2s; }
        .gr-newsletter-input::placeholder { color: #52525b; }
        .gr-newsletter-input:focus { border-color: #f97316; }
        .gr-sub-btn { background: #f97316; color: #fff; border: none; border-radius: 12px; padding: 12px 22px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; white-space: nowrap; }
        .gr-sub-btn:hover { background: #ea580c; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(249,115,22,0.4); }
        .gr-divider { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 0; }
        .gr-bottom-link { color: #52525b; text-decoration: none; font-size: 12px; font-weight: 500; transition: color .2s; }
        .gr-bottom-link:hover { color: #f97316; }
        @media (max-width: 768px) {
          .gr-footer-top { flex-direction: column !important; }
          .gr-footer-grid { grid-template-columns: 1fr 1fr !important; }
          .gr-badges-row { display: none !important; }
          .gr-bottom-row { flex-direction: column !important; gap: 12px !important; text-align: center; }
        }
        @media (max-width: 480px) {
          .gr-footer-grid { grid-template-columns: 1fr !important; }
          .gr-newsletter-wrap { flex-direction: column !important; }
        }
      `}</style>

      <footer
        className="gr-footer"
        style={{
          background: "#0f0f0f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Decorative leaves ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            pointerEvents: "none",
          }}
        >
          <LeafDeco />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: -20,
            pointerEvents: "none",
            transform: "rotate(180deg)",
          }}
        >
          <LeafDeco />
        </div>

        {/* ── Trust Badges Strip ── */}
        <div
          className="gr-badges-row"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 24px",
            background: "#e4e4e7",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {BADGES.map((b) => (
              <div key={b} className="gr-badge">
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* ── Main Footer ── */}
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "40px 24px 32px",
          }}
        >
          {/* Top Row: Brand | Links Grid | Newsletter */}
          <div
            className="gr-footer-top"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 48,
              marginBottom: 56,
            }}
          >
            {/* Brand */}
            <div style={{ maxWidth: 320 }}>
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontWeight: 700,
                    fontSize: 34,
                    color: "#fff",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  Gr<span style={{ color: "#f97316" }}>O</span>cify
                  <sup
                    style={{
                      fontSize: "10px",
                      fontFamily: "'DM Sans',sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      color: "#52525b",
                      marginLeft: "3px",
                    }}
                  >
                    FRESH
                  </sup>
                </div>
              </a>
              <p
                style={{
                  fontSize: 13,
                  color: "#71717a",
                  lineHeight: 1.8,
                  margin: "0 0 28px",
                }}
              >
                Farm-to-table freshness delivered to your door. We source
                directly from organic farms to bring you the finest produce
                every day.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="gr-social-btn"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 gap-30">
              {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                <div key={title}>
                  <h4
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    className="text-lg font-bold text-white mb-5 tracking-tight"
                  >
                    {title}
                  </h4>
                  <ul className="list-none m-0 p-0 flex flex-col gap-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-zinc-500 text-sm font-medium no-underline transition-all duration-200 hover:text-orange-500 hover:translate-x-1 inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ maxWidth: 400, flex: 1 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(249,115,22,0.10)",
                  border: "1px solid rgba(249,115,22,0.20)",
                  borderRadius: 999,
                  padding: "4px 14px",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#f97316",
                  }}
                >
                  Newsletter
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 8px",
                  lineHeight: 1.2,
                }}
              >
                Get Fresh Deals
                <br />
                <span style={{ color: "#f97316" }}>Every Week</span>
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "#71717a",
                  margin: "0 0 20px",
                  lineHeight: 1.7,
                }}
              >
                Subscribe for exclusive offers, seasonal picks, and farm-fresh
                updates.
              </p>
              {subscribed ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "rgba(22,163,74,0.10)",
                    border: "1px solid rgba(22,163,74,0.25)",
                    borderRadius: 12,
                    padding: "14px 18px",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span
                    style={{ fontSize: 13, color: "#16a34a", fontWeight: 600 }}
                  >
                    You're subscribed! Welcome to the Grocify family 🌿
                  </span>
                </div>
              ) : (
                <div
                  className="gr-newsletter-wrap"
                  style={{ display: "flex", gap: 10 }}
                >
                  <input
                    className="gr-newsletter-input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  />
                  <button className="gr-sub-btn" onClick={handleSubscribe}>
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div
            style={{
              display: "flex",
              gap: 32,
              flexWrap: "wrap",
              marginBottom: 48,
              padding: "28px 32px",
              background: "rgba(255,255,255,0.025)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[
              {
                icon: "📍",
                label: "Address",
                value: "42 Green Market Street, Farm District, NY 10001",
              },
              { icon: "📞", label: "Phone", value: "+1 (800) GROCIFY" },
              { icon: "✉️", label: "Email", value: "hello@grocify.fresh" },
              { icon: "🕐", label: "Hours", value: "Mon–Sat: 7am – 9pm" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  flex: "1 1 200px",
                }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      color: "#52525b",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#a3a3a3", lineHeight: 1.5 }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="gr-divider" style={{ marginBottom: 28 }} />

          {/* Bottom Bar */}
          <div
            className="gr-bottom-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <p style={{ fontSize: 12, color: "#3f3f46", margin: 0 }}>
              © 2026 <span style={{ color: "#f97316" }}>Grocify Fresh</span>.
              All rights reserved. Made with 🌿 for fresh food lovers.
            </p>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                (link) => (
                  <a key={link} href="#" className="gr-bottom-link">
                    {link}
                  </a>
                ),
              )}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {["VISA", "MC", "AMEX", "PayPal"].map((p) => (
                <div
                  key={p}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    color: "#71717a",
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
