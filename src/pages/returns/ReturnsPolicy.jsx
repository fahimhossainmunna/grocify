import { Link } from "react-router-dom";

const SCENARIOS = [
  { icon: "🥬", title: "Damaged Produce",    eligible: true,  desc: "Bruised, wilted, or visibly damaged items qualify for full refund or replacement." },
  { icon: "🔄", title: "Wrong Item",         eligible: true,  desc: "If we delivered an incorrect item, we'll replace it or issue a full refund immediately." },
  { icon: "📦", title: "Missing Items",      eligible: true,  desc: "If any items are missing from your order, we'll resend them or refund the missing amount." },
  { icon: "🧊", title: "Not Fresh",          eligible: true,  desc: "Products that don't meet our freshness standards will be replaced free of charge." },
  { icon: "😊", title: "Changed Mind",       eligible: false, desc: "We're unable to accept returns for perishable goods if you simply changed your mind." },
  { icon: "⏰", title: "After 24 Hours",     eligible: false, desc: "Claims made more than 24 hours after delivery cannot be processed for perishable goods." },
];

const STEPS = [
  { num: "1", title: "Contact Us Within 24hrs", desc: "Email us at returns@grocify.fresh or use the Contact page. Include your order number and a photo of the issue." },
  { num: "2", title: "We Review Your Claim",    desc: "Our team reviews your claim within 2–4 hours. We may ask for additional information." },
  { num: "3", title: "Choose Resolution",       desc: "Once approved, choose between a full refund to your original payment or a free replacement delivery." },
  { num: "4", title: "Receive Resolution",      desc: "Replacements are delivered within 24 hours. Refunds appear in 3–5 business days." },
];

const ReturnsPolicy = () => (
  <div className="min-h-screen bg-zinc-50">
    {/* Hero */}
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-5">
          🔄 Returns
        </div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
          Returns & Refunds Policy
        </h1>
        <p className="text-zinc-500 text-base max-w-xl mx-auto">
          Your satisfaction is our top priority. If something's not right, we'll make it right — fast.
        </p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-14">

      {/* Promise Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white text-center mb-14">
        <div className="text-4xl mb-3">💚</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-3xl font-bold mb-2">Our Freshness Guarantee</h2>
        <p className="text-green-100 max-w-lg mx-auto text-sm leading-relaxed">
          If any product doesn't meet our premium freshness standard, we'll replace it or give you a full refund — no questions asked. Report within 24 hours of delivery.
        </p>
      </div>

      {/* What's Eligible */}
      <section className="mb-16">
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-3xl font-bold text-zinc-800 mb-8">What's Eligible for Return?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCENARIOS.map(s => (
            <div key={s.title} className={`bg-white rounded-2xl border p-6 transition-all hover:shadow-md ${s.eligible ? "border-green-100 hover:border-green-200" : "border-red-100 hover:border-red-200"}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.eligible ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                  {s.eligible ? "✓ Eligible" : "✗ Not Eligible"}
                </span>
              </div>
              <h3 className="font-bold text-zinc-800 text-sm mb-2">{s.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Return */}
      <section className="mb-16">
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-3xl font-bold text-zinc-800 mb-8">How to Request a Return</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(step => (
            <div key={step.num} className="bg-white rounded-2xl border border-zinc-100 p-6 text-center hover:border-orange-200 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-black text-lg flex items-center justify-center mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-bold text-zinc-800 text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Refund timeline */}
      <section className="mb-16">
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-3xl font-bold text-zinc-800 mb-6">Refund Timeline</h2>
        <div className="bg-white rounded-3xl border border-zinc-100 overflow-hidden">
          {[
            { method: "Credit / Debit Card", time: "3–5 Business Days" },
            { method: "PayPal",               time: "1–3 Business Days" },
            { method: "Apple Pay",            time: "2–5 Business Days" },
            { method: "Store Credit",         time: "Instant"           },
          ].map((r, i) => (
            <div key={r.method} className={`flex items-center justify-between px-6 py-4 border-b border-zinc-50 ${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}`}>
              <span className="text-sm font-semibold text-zinc-700">{r.method}</span>
              <span className="text-sm font-bold text-orange-500">{r.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 text-center">
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-2xl font-bold text-zinc-800 mb-2">Need to make a claim?</h3>
        <p className="text-sm text-zinc-500 mb-6">Contact our support team and we'll resolve it within hours.</p>
        <Link to="/contact" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-3 rounded-full no-underline transition-all hover:shadow-lg hover:-translate-y-0.5">
          Contact Support
        </Link>
      </div>

    </div>
  </div>
);

export default ReturnsPolicy;