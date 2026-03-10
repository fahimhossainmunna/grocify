import { Link } from "react-router-dom";

const DELIVERY_OPTIONS = [
  {
    icon: "⚡",
    title: "Express Delivery",
    time: "2–4 Hours",
    price: "$5.99",
    desc: "Get your groceries delivered within 2–4 hours of placing your order. Available 7am–7pm, Mon–Sat.",
    badge: "Most Popular",
    badgeColor: "bg-orange-500",
  },
  {
    icon: "🚚",
    title: "Standard Delivery",
    time: "Next Day",
    price: "Free over $99",
    desc: "Next-day delivery for orders placed before 9pm. Free for orders above $99, otherwise $3.99.",
    badge: "Best Value",
    badgeColor: "bg-green-500",
  },
  {
    icon: "📅",
    title: "Scheduled Delivery",
    time: "Choose Your Slot",
    price: "$2.99",
    desc: "Pick your preferred delivery date and time window at checkout. Available up to 7 days in advance.",
    badge: "Flexible",
    badgeColor: "bg-blue-500",
  },
];

const ZONES = [
  { zone: "Zone 1 — City Center",    time: "2–4 hrs",  fee: "Free over $99" },
  { zone: "Zone 2 — Inner Suburbs",  time: "3–5 hrs",  fee: "Free over $99" },
  { zone: "Zone 3 — Outer Suburbs",  time: "Next Day", fee: "$3.99 flat"     },
  { zone: "Zone 4 — Rural Areas",    time: "1–2 Days", fee: "$5.99 flat"     },
];

const STEPS = [
  { num: "01", title: "Place Your Order", desc: "Browse and add items to cart. Checkout with your preferred delivery option." },
  { num: "02", title: "Order Confirmed",  desc: "You'll receive an email confirmation with your order details and tracking link." },
  { num: "03", title: "Packed Fresh",     desc: "Our team carefully picks and packs your order in temperature-controlled bags." },
  { num: "04", title: "Out for Delivery", desc: "Your order is on its way! Track in real-time via the link in your email." },
  { num: "05", title: "Delivered! 🎉",    desc: "Your fresh groceries arrive at your door. Enjoy the freshness!" },
];

const DeliveryInfo = () => (
  <div className="min-h-screen bg-zinc-50">
    {/* Hero */}
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-5">
          🚚 Delivery
        </div>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
          Delivery Information
        </h1>
        <p className="text-zinc-500 text-base max-w-xl mx-auto">
          Fast, fresh, and reliable delivery right to your doorstep. Here's everything you need to know.
        </p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-14">

      {/* Delivery Options */}
      <section className="mb-16">
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-3xl font-bold text-zinc-800 mb-8">Delivery Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DELIVERY_OPTIONS.map(opt => (
            <div key={opt.title} className="bg-white rounded-3xl border border-zinc-100 p-7 hover:border-orange-200 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
              <span className={`absolute top-4 right-4 text-white text-[10px] font-bold px-3 py-1 rounded-full ${opt.badgeColor}`}>{opt.badge}</span>
              <div className="text-4xl mb-4">{opt.icon}</div>
              <h3 className="font-bold text-zinc-800 text-base mb-1">{opt.title}</h3>
              <div className="text-orange-500 font-bold text-lg mb-1">{opt.time}</div>
              <div className="text-xs font-semibold text-zinc-400 mb-3">{opt.price}</div>
              <p className="text-sm text-zinc-500 leading-relaxed">{opt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="mb-16">
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-3xl font-bold text-zinc-800 mb-8">Delivery Zones & Fees</h2>
        <div className="bg-white rounded-3xl border border-zinc-100 overflow-hidden">
          <div className="grid grid-cols-3 bg-zinc-50 border-b border-zinc-100 px-6 py-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Zone</span>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Estimated Time</span>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Delivery Fee</span>
          </div>
          {ZONES.map((z, i) => (
            <div key={z.zone} className={`grid grid-cols-3 px-6 py-4 border-b border-zinc-50 ${i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}`}>
              <span className="text-sm font-semibold text-zinc-700">{z.zone}</span>
              <span className="text-sm text-zinc-500">{z.time}</span>
              <span className="text-sm font-semibold text-orange-500">{z.fee}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-3xl font-bold text-zinc-800 mb-8">How Delivery Works</h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-orange-100 hidden md:block"/>
          <div className="flex flex-col gap-5">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-sm font-black flex-shrink-0 relative z-10">
                  {step.num}
                </div>
                <div className="bg-white rounded-2xl border border-zinc-100 p-5 flex-1 hover:border-orange-100 transition-colors">
                  <div className="font-bold text-zinc-800 mb-1">{step.title}</div>
                  <div className="text-sm text-zinc-500">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="bg-amber-50 border border-amber-100 rounded-3xl p-8">
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-2xl font-bold text-zinc-800 mb-5">📋 Important Notes</h3>
        <ul className="space-y-3 list-none p-0 m-0">
          {[
            "Orders placed after 9pm will be processed the next morning.",
            "We deliver in temperature-controlled bags to keep produce fresh.",
            "Someone must be available to receive the delivery.",
            "If no one is home, we'll leave the package in a safe spot and notify you.",
            "Delivery times may vary during public holidays.",
          ].map((note, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
              <span className="text-orange-500 mt-0.5 flex-shrink-0">✓</span>
              {note}
            </li>
          ))}
        </ul>
      </section>

    </div>
  </div>
);

export default DeliveryInfo;