import { useState } from "react";
import { Link } from "react-router-dom";

const FAQS = [
  {
    category: "Orders & Delivery",
    items: [
      { q: "How do I place an order?", a: "Browse our shop, add items to your cart, and proceed to checkout. You can pay via card or PayPal. You'll receive a confirmation email once your order is placed." },
      { q: "What are your delivery hours?", a: "We deliver Monday to Saturday, 7am – 9pm. Express delivery is available within 2–4 hours. Standard delivery takes 1–2 business days." },
      { q: "Do you offer free delivery?", a: "Yes! Orders over $99 qualify for free standard delivery. Express delivery has a flat fee of $5.99 regardless of order size." },
      { q: "Can I schedule a delivery time?", a: "Yes, during checkout you can select a preferred delivery window. Available slots are shown in real-time based on your location." },
      { q: "What areas do you deliver to?", a: "We currently deliver to all major cities and surrounding suburbs. Enter your zip code at checkout to confirm availability in your area." },
    ],
  },
  {
    category: "Products & Quality",
    items: [
      { q: "Are all your products organic?", a: "Yes, 100% of our produce is certified organic. We source directly from verified organic farms and conduct regular quality checks." },
      { q: "How fresh are your products?", a: "All products are harvested within 24–48 hours of delivery. We do not use preservatives or artificial ripening agents." },
      { q: "What if a product is out of stock?", a: "If an item is out of stock, you can join our waitlist and we'll notify you when it's available again. You can also find similar alternatives on the product page." },
      { q: "Do you sell imported products?", a: "We primarily source locally, but some exotic fruits and specialty items are imported from certified organic farms internationally." },
    ],
  },
  {
    category: "Payment & Pricing",
    items: [
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are secured with 256-bit SSL encryption." },
      { q: "Can I use multiple promo codes?", a: "Only one promo code can be applied per order. Use codes GROCIFY10, FRESH20, or SAVE15 at checkout for discounts." },
      { q: "Is my payment information secure?", a: "Absolutely. We never store your full card details. All payments are processed through PCI-DSS compliant payment gateways." },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "If you receive damaged, spoiled, or incorrect items, contact us within 24 hours of delivery. We'll issue a full refund or replacement at no extra cost." },
      { q: "How long do refunds take?", a: "Refunds are processed within 3–5 business days and will appear on your original payment method." },
      { q: "Can I cancel my order?", a: "Orders can be cancelled within 1 hour of placement. After that, the order enters our fulfilment process and cannot be cancelled." },
    ],
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? "border-orange-200 bg-orange-50/30" : "border-zinc-100 bg-white"}`}>
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-none outline-none">
        <span className="text-sm font-700 text-zinc-800 leading-snug font-semibold">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${open ? "bg-orange-500 text-white" : "bg-zinc-100 text-zinc-400"}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s" }}>
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-zinc-500 leading-relaxed m-0">{a}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [search, setSearch] = useState("");
  const filtered = FAQS.map(cat => ({
    ...cat,
    items: cat.items.filter(i =>
      i.q.toLowerCase().includes(search.toLowerCase()) ||
      i.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-5">
            Help Center
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-zinc-500 text-base mb-8">Find quick answers to common questions about Grocify.</p>
          <input
            type="text" placeholder="Search questions..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto block border border-zinc-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold text-zinc-600">No results found for "{search}"</p>
          </div>
        ) : (
          filtered.map(cat => (
            <div key={cat.category} className="mb-12">
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-2xl font-bold text-zinc-800 mb-5 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full inline-block"/>
                {cat.category}
              </h2>
              <div className="flex flex-col gap-3">
                {cat.items.map((item, i) => <FAQItem key={i} {...item}/>)}
              </div>
            </div>
          ))
        )}

        {/* Still need help */}
        <div className="mt-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-10 text-center text-white">
          <div className="text-3xl mb-3">💬</div>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="text-orange-100 text-sm mb-6">Our support team is available Mon–Sat, 7am–9pm.</p>
          <Link to="/contact" className="inline-block bg-white text-orange-500 font-bold text-sm px-8 py-3 rounded-full no-underline hover:shadow-lg transition-all hover:-translate-y-0.5">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;