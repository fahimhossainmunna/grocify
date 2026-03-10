import { useState } from "react";

const MOCK_ORDERS = {
  "GRO-2026-0041": {
    id: "GRO-2026-0041",
    status: "Delivered",
    date: "Mar 08, 2026",
    estimatedDelivery: "Mar 08, 2026",
    address: "42 Green Street, Dhaka 1205",
    items: [
      { name: "Atlantic Salmon", qty: 1, price: 4.60 },
      { name: "Organic Banana",  qty: 2, price: 1.50 },
      { name: "Greek Yogurt",    qty: 3, price: 4.35 },
    ],
    timeline: [
      { status: "Order Placed",   time: "Mar 08, 9:12 AM",  done: true  },
      { status: "Confirmed",      time: "Mar 08, 9:15 AM",  done: true  },
      { status: "Packed",         time: "Mar 08, 10:30 AM", done: true  },
      { status: "Out for Delivery",time: "Mar 08, 12:05 PM",done: true  },
      { status: "Delivered",      time: "Mar 08, 2:48 PM",  done: true  },
    ],
  },
  "GRO-2026-0038": {
    id: "GRO-2026-0038",
    status: "Delivered",
    date: "Mar 03, 2026",
    estimatedDelivery: "Mar 03, 2026",
    address: "42 Green Street, Dhaka 1205",
    items: [
      { name: "Strawberry",      qty: 2, price: 4.60 },
      { name: "Chicken Breast",  qty: 2, price: 5.40 },
    ],
    timeline: [
      { status: "Order Placed",    time: "Mar 03, 11:00 AM", done: true },
      { status: "Confirmed",       time: "Mar 03, 11:03 AM", done: true },
      { status: "Packed",          time: "Mar 03, 12:20 PM", done: true },
      { status: "Out for Delivery",time: "Mar 03, 2:00 PM",  done: true },
      { status: "Delivered",       time: "Mar 03, 4:15 PM",  done: true },
    ],
  },
};

const STATUS_STYLE = {
  Delivered:  { bg: "bg-green-50",  text: "text-green-600",  border: "border-green-200",  dot: "bg-green-500"  },
  Shipped:    { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-200",   dot: "bg-blue-500"   },
  Processing: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", dot: "bg-orange-500" },
  Cancelled:  { bg: "bg-red-50",    text: "text-red-600",    border: "border-red-200",    dot: "bg-red-500"    },
};

const fmt = (n) => `$${Number(n).toFixed(2)}`;

const TrackOrder = () => {
  const [input,  setInput]  = useState("");
  const [order,  setOrder]  = useState(null);
  const [error,  setError]  = useState("");
  const [loading,setLoading]= useState(false);

  const handleTrack = async () => {
    if (!input.trim()) return;
    setError(""); setOrder(null); setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const found = MOCK_ORDERS[input.trim().toUpperCase()];
    if (found) { setOrder(found); }
    else { setError("No order found with that ID. Try GRO-2026-0041 or GRO-2026-0038"); }
    setLoading(false);
  };

  const st = order ? STATUS_STYLE[order.status] || STATUS_STYLE.Processing : null;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-5">
            📦 Track Order
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-zinc-500 text-base mb-10">Enter your order ID to get real-time delivery updates.</p>

          {/* Search */}
          <div className="flex gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="e.g. GRO-2026-0041"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleTrack()}
              className="flex-1 bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 shadow-sm transition-all font-mono"
            />
            <button onClick={handleTrack} disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-sm px-7 py-3.5 rounded-2xl border-none cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"/>Tracking...</>
              ) : "Track →"}
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-5 py-3 text-sm text-red-600 max-w-xl mx-auto">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Result */}
      {order && (
        <div className="max-w-3xl mx-auto px-6 py-12">

          {/* Order Header */}
          <div className="bg-white rounded-3xl border border-zinc-100 p-7 mb-6 shadow-sm">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
              <div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Order ID</div>
                <div className="text-xl font-black text-zinc-800 font-mono">{order.id}</div>
                <div className="text-sm text-zinc-400 mt-1">Placed on {order.date}</div>
              </div>
              <span className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border ${st.bg} ${st.text} ${st.border}`}>
                <span className={`w-2 h-2 rounded-full ${st.dot}`}/>
                {order.status}
              </span>
            </div>

            <div className="flex items-start gap-2 bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-500">
              <span className="mt-0.5">📍</span>
              <span>Delivering to: <span className="font-semibold text-zinc-700">{order.address}</span></span>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-3xl border border-zinc-100 p-7 mb-6 shadow-sm">
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-xl font-bold text-zinc-800 mb-7">Delivery Timeline</h3>
            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-zinc-100"/>
              <div className="flex flex-col gap-6">
                {order.timeline.map((step, i) => (
                  <div key={i} className="flex gap-5 items-start relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all ${step.done ? "bg-orange-500 shadow-lg shadow-orange-200" : "bg-zinc-100"}`}>
                      {step.done
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        : <div className="w-2 h-2 rounded-full bg-zinc-300"/>
                      }
                    </div>
                    <div className="flex-1 pt-1">
                      <div className={`text-sm font-bold ${step.done ? "text-zinc-800" : "text-zinc-400"}`}>{step.status}</div>
                      {step.done && <div className="text-xs text-zinc-400 mt-0.5">{step.time}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-3xl border border-zinc-100 p-7 shadow-sm">
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif" }} className="text-xl font-bold text-zinc-800 mb-5">Order Items</h3>
            <div className="flex flex-col gap-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
                  <span className="text-sm font-semibold text-zinc-700">{item.name} × {item.qty}</span>
                  <span className="text-sm font-bold text-orange-500">{fmt(item.price)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold text-zinc-800">Total</span>
                <span className="text-lg font-black text-orange-500">{fmt(order.items.reduce((s, i) => s + i.price, 0))}</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Empty state */}
      {!order && !loading && !error && (
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-zinc-400 font-medium">Enter your order ID above to track your delivery</p>
          <p className="text-zinc-300 text-sm mt-2">You can find your order ID in your confirmation email</p>
        </div>
      )}

    </div>
  );
};

export default TrackOrder;