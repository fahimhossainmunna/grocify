import { useState, useRef, useEffect } from "react";
import Container from "../ui/Container";

import customer1 from "../../assets/customer1.jpg";
import customer2 from "../../assets/customer2.jpg";
import customer3 from "../../assets/customer3.jpg";
import customer4 from "../../assets/customer4.jpg";
import customer5 from "../../assets/customer5.jpg";

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

const StarIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#f97316" : "none"} stroke="#f97316" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(249,115,22,0.12)">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
  </svg>
);

const TESTIMONIALS = [
  {
    img: customer1,
    name: "Sarah Mitchell",
    role: "Home Cook",
    rating: 5,
    review: "Grocify has completely changed how I shop for groceries. The produce is incredibly fresh — I can taste the difference compared to supermarket vegetables. Delivery is always on time!",
  },
  {
    img: customer2,
    name: "James Thornton",
    role: "Fitness Enthusiast",
    rating: 5,
    review: "As someone who's very particular about what I eat, Grocify has been a game changer. Everything is 100% organic and the quality is consistently top-notch. Highly recommend!",
  },
  {
    img: customer3,
    name: "Priya Sharma",
    role: "Working Mom",
    rating: 5,
    review: "I love that I can trust every single item I order. The fruits and veggies are always fresh, the packaging is eco-friendly, and customer support is genuinely helpful.",
  },
  {
    img: customer4,
    name: "Daniel Carter",
    role: "Chef & Food Blogger",
    rating: 5,
    review: "I use Grocify for my restaurant sourcing and the quality matches what I'd find at specialty markets — at a fraction of the hassle. Farm-direct freshness every single time.",
  },
  {
    img: customer5,
    name: "Emily Watson",
    role: "Health Coach",
    rating: 5,
    review: "My clients ask what my secret is — it's Grocify! Clean, organic, and delivered fresh. The FRESH20 discount on my first order was the cherry on top. Never looked back!",
  },
];

const TestimonialCard = ({ t, delay }) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "28px 28px 24px",
        border: "1.5px solid #f4f4f5",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Quote icon bg */}
      <div style={{ position: "absolute", top: 16, right: 20 }}>
        <QuoteIcon />
      </div>

      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < t.rating} />)}
      </div>

      {/* Review text */}
      <p style={{
        fontSize: 13.5,
        color: "#52525b",
        lineHeight: 1.8,
        margin: "0 0 24px",
        fontFamily: "'DM Sans', sans-serif",
        flex: 1,
      }}>
        "{t.review}"
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: "#f4f4f5", marginBottom: 20 }} />

      {/* Customer info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src={t.img}
          alt={t.name}
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2.5px solid #fed7aa",
          }}
        />
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 800, color: "#18181b", marginBottom: 2 }}>
            {t.name}
          </div>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#f97316", letterSpacing: "0.04em" }}>
            {t.role}
          </div>
        </div>
        {/* Verified badge */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 999, padding: "3px 10px" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#16a34a", letterSpacing: "0.08em", textTransform: "uppercase" }}>Verified</span>
        </div>
      </div>
    </div>
  );
};

const CustomerSaying = () => {
  const [titleRef, titleVisible] = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .cs-root * { box-sizing: border-box; }
        .cs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .cs-grid-bottom { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 66.66%; margin: 0 auto; }
        @media (max-width: 1024px) { .cs-grid { grid-template-columns: repeat(2, 1fr) !important; } .cs-grid-bottom { grid-template-columns: repeat(2,1fr) !important; max-width: 100% !important; } }
        @media (max-width: 640px)  { .cs-grid { grid-template-columns: 1fr !important; } .cs-grid-bottom { grid-template-columns: 1fr !important; } }
      `}</style>

      <section className="cs-root" style={{ padding: "96px 24px", background: "#fafafa" }}>
        <Container>

          {/* Title */}
          <div
            ref={titleRef}
            style={{
              textAlign: "center",
              marginBottom: 64,
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.20)", borderRadius: 999, padding: "5px 16px", marginBottom: 18 }}>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f97316" }}>⭐ Testimonials</span>
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px,5vw,54px)", fontWeight: 700, color: "#18181b", margin: "0 0 4px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              What Our <span style={{ color: "#f97316" }}>Customers</span> Say
            </h2>
            <p style={{ fontSize: 14, color: "#71717a", marginTop: 14, maxWidth: 460, margin: "14px auto 0", lineHeight: 1.75 }}>
              Real people, real freshness. See why thousands trust Grocify for their daily grocery needs.
            </p>
            {/* Underline */}
            <div style={{ width: 56, height: 3, background: "linear-gradient(90deg,#f97316,#fbbf24)", borderRadius: 2, margin: "20px auto 0" }} />
          </div>

          {/* Top row — 3 cards */}
          <div className="cs-grid" style={{ marginBottom: 24 }}>
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={i * 0.1} />
            ))}
          </div>

          {/* Bottom row — 2 cards centered */}
          <div className="cs-grid-bottom">
            {TESTIMONIALS.slice(3).map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={(i + 3) * 0.1} />
            ))}
          </div>

          {/* Bottom stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 56, flexWrap: "wrap" }}>
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "4.9★", label: "Average Rating" },
              { value: "98%", label: "Would Recommend" },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: "#f97316", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "#71717a", fontWeight: 600, marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>

        </Container>
      </section>
    </>
  );
};

export default CustomerSaying;