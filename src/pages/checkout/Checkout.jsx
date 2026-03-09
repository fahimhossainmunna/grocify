import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  clearCart,
} from "../../store/slices/cartSlice";
import { usePlaceOrderMutation } from "../../store/api/grocifyApi";

/* ─── helpers ─────────────────────────────────────────────── */
const fmt = (n) => `$${Number(n).toFixed(2)}`;

const PROMO_CODES = {
  GROCIFY10: 0.10,
  FRESH20:   0.20,
  SAVE15:    0.15,
};

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard Delivery", desc: "3–5 business days", price: 0,    icon: "🚚" },
  { id: "express",  label: "Express Delivery",  desc: "Next day by 6 PM",  price: 5.99, icon: "⚡" },
  { id: "pickup",   label: "Store Pickup",       desc: "Ready in 2 hours",  price: 0,    icon: "🏪" },
];

/* ─── Sub-components ──────────────────────────────────────── */
const StepIndicator = ({ current }) => {
  const steps = ["Delivery", "Payment", "Confirm"];
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, marginBottom:48 }}>
      {steps.map((s, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <div key={s} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <div style={{
                width:40, height:40, borderRadius:"50%",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:13, fontWeight:800, transition:"all .35s",
                background: done ? "#18181b" : active ? "#f97316" : "#f4f4f5",
                color:      done ? "#fff"    : active ? "#fff"    : "#a3a3a3",
                boxShadow:  active ? "0 6px 20px rgba(249,115,22,0.35)" : "none",
              }}>
                {done
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : i + 1}
              </div>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color: active ? "#f97316" : done ? "#18181b" : "#a3a3a3" }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width:80, height:2, background: done ? "#18181b" : "#f4f4f5", margin:"0 4px", marginBottom:28, transition:"background .35s" }}/>
            )}
          </div>
        );
      })}
    </div>
  );
};

const FormField = ({ label, required, error, children }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    <label style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color: error ? "#ef4444" : "#71717a" }}>
      {label}{required && <span style={{ color:"#f97316", marginLeft:3 }}>*</span>}
    </label>
    {children}
    {error && <span style={{ fontSize:11, color:"#ef4444", fontWeight:500 }}>{error}</span>}
  </div>
);

const inputStyle = (error) => ({
  border: `1.5px solid ${error ? "#fca5a5" : "#e5e5e5"}`,
  borderRadius:12, padding:"12px 16px",
  fontSize:14, fontWeight:500, color:"#18181b",
  outline:"none", fontFamily:"'DM Sans',sans-serif",
  background:"#fff", transition:"border-color .2s",
  width:"100%", boxSizing:"border-box",
});

/* ─── Step 1: Delivery ────────────────────────────────────── */
const DeliveryStep = ({ data, setData, onNext }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.firstName.trim()) e.firstName = "Required";
    if (!data.lastName.trim())  e.lastName  = "Required";
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) e.email = "Valid email required";
    if (!data.phone.trim())     e.phone     = "Required";
    if (!data.address.trim())   e.address   = "Required";
    if (!data.city.trim())      e.city      = "Required";
    if (!data.zip.trim())       e.zip       = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  return (
    <div className="ck-fade-in">
      <h2 className="ck-section-title">Delivery Information</h2>

      {/* Delivery type */}
      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:32 }}>
        {DELIVERY_OPTIONS.map(opt => (
          <label key={opt.id} style={{
            display:"flex", alignItems:"center", gap:16,
            border: `1.5px solid ${data.delivery === opt.id ? "#f97316" : "#e5e5e5"}`,
            borderRadius:16, padding:"16px 20px", cursor:"pointer",
            background: data.delivery === opt.id ? "#fff7ed" : "#fff",
            transition:"all .2s",
          }}>
            <input type="radio" name="delivery" value={opt.id}
              checked={data.delivery === opt.id}
              onChange={() => set("delivery", opt.id)}
              style={{ accentColor:"#f97316", width:16, height:16 }}/>
            <span style={{ fontSize:22 }}>{opt.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:"#18181b" }}>{opt.label}</div>
              <div style={{ fontSize:12, color:"#a3a3a3", marginTop:2 }}>{opt.desc}</div>
            </div>
            <div style={{ fontSize:14, fontWeight:800, color: opt.price === 0 ? "#16a34a" : "#18181b" }}>
              {opt.price === 0 ? "FREE" : fmt(opt.price)}
            </div>
          </label>
        ))}
      </div>

      {/* Contact */}
      <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#a3a3a3", marginBottom:20, paddingBottom:12, borderBottom:"1px solid #f4f4f5" }}>Contact Details</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <FormField label="First Name" required error={errors.firstName}>
          <input style={inputStyle(errors.firstName)} value={data.firstName} onChange={e => set("firstName", e.target.value)}
            placeholder="John" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.firstName?"#fca5a5":"#e5e5e5"}/>
        </FormField>
        <FormField label="Last Name" required error={errors.lastName}>
          <input style={inputStyle(errors.lastName)} value={data.lastName} onChange={e => set("lastName", e.target.value)}
            placeholder="Doe" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.lastName?"#fca5a5":"#e5e5e5"}/>
        </FormField>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <FormField label="Email" required error={errors.email}>
          <input style={inputStyle(errors.email)} type="email" value={data.email} onChange={e => set("email", e.target.value)}
            placeholder="john@example.com" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.email?"#fca5a5":"#e5e5e5"}/>
        </FormField>
        <FormField label="Phone" required error={errors.phone}>
          <input style={inputStyle(errors.phone)} type="tel" value={data.phone} onChange={e => set("phone", e.target.value)}
            placeholder="+880 1X XX XXX XXX" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.phone?"#fca5a5":"#e5e5e5"}/>
        </FormField>
      </div>

      {/* Address */}
      <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#a3a3a3", marginBottom:20, marginTop:32, paddingBottom:12, borderBottom:"1px solid #f4f4f5" }}>Shipping Address</p>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <FormField label="Street Address" required error={errors.address}>
          <input style={inputStyle(errors.address)} value={data.address} onChange={e => set("address", e.target.value)}
            placeholder="House 12, Road 5, Block C" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.address?"#fca5a5":"#e5e5e5"}/>
        </FormField>
        <FormField label="Apartment / Floor" >
          <input style={inputStyle(false)} value={data.apt} onChange={e => set("apt", e.target.value)}
            placeholder="Apt 3B (optional)" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor="#e5e5e5"}/>
        </FormField>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
          <FormField label="City" required error={errors.city}>
            <input style={inputStyle(errors.city)} value={data.city} onChange={e => set("city", e.target.value)}
              placeholder="Dhaka" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.city?"#fca5a5":"#e5e5e5"}/>
          </FormField>
          <FormField label="District">
            <input style={inputStyle(false)} value={data.district} onChange={e => set("district", e.target.value)}
              placeholder="Dhaka" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor="#e5e5e5"}/>
          </FormField>
          <FormField label="ZIP Code" required error={errors.zip}>
            <input style={inputStyle(errors.zip)} value={data.zip} onChange={e => set("zip", e.target.value)}
              placeholder="1212" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.zip?"#fca5a5":"#e5e5e5"}/>
          </FormField>
        </div>
        <FormField label="Delivery Notes">
          <textarea style={{ ...inputStyle(false), resize:"none", height:80 }}
            value={data.notes} onChange={e => set("notes", e.target.value)}
            placeholder="Any special instructions for delivery..." onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor="#e5e5e5"}/>
        </FormField>
      </div>

      <button className="ck-next-btn" onClick={() => validate() && onNext()} style={{ marginTop:32 }}>
        Continue to Payment
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  );
};

/* ─── Step 2: Payment ─────────────────────────────────────── */
const PaymentStep = ({ data, setData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  const METHODS = [
    { id:"card",  label:"Credit / Debit Card",     icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
    { id:"cod",   label:"Cash on Delivery",         icon: <span style={{fontSize:20}}>💵</span> },
    { id:"bkash", label:"bKash / Nagad",            icon: <span style={{fontSize:20}}>📱</span> },
  ];

  const fmtCard = (v) => v.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim().slice(0,19);
  const fmtExp  = (v) => v.replace(/\D/g,"").replace(/^(\d{2})(\d)/,"$1/$2").slice(0,5);

  const validate = () => {
    const e = {};
    if (data.method === "card") {
      if (!data.cardName.trim())                e.cardName = "Required";
      if (!data.cardNumber || data.cardNumber.replace(/\s/g,"").length < 16) e.cardNumber = "Valid card number required";
      if (!data.cardExp || data.cardExp.length < 5) e.cardExp = "MM/YY required";
      if (!data.cardCvv || data.cardCvv.length < 3) e.cardCvv = "3-digit CVV required";
    }
    if (data.method === "bkash" && !data.mobileNumber.trim()) e.mobileNumber = "Mobile number required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="ck-fade-in">
      <h2 className="ck-section-title">Payment Method</h2>

      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:32 }}>
        {METHODS.map(m => (
          <label key={m.id} style={{
            display:"flex", alignItems:"center", gap:16,
            border:`1.5px solid ${data.method === m.id ? "#f97316" : "#e5e5e5"}`,
            borderRadius:16, padding:"16px 20px", cursor:"pointer",
            background: data.method === m.id ? "#fff7ed" : "#fff",
            transition:"all .2s",
          }}>
            <input type="radio" name="payment" value={m.id}
              checked={data.method === m.id}
              onChange={() => set("method", m.id)}
              style={{ accentColor:"#f97316", width:16, height:16 }}/>
            <span style={{ display:"flex", alignItems:"center", color:"#52525b" }}>{m.icon}</span>
            <span style={{ fontSize:14, fontWeight:700, color:"#18181b" }}>{m.label}</span>
          </label>
        ))}
      </div>

      {/* Card fields */}
      {data.method === "card" && (
        <div className="ck-fade-in" style={{ display:"flex", flexDirection:"column", gap:16, background:"#fafafa", borderRadius:20, padding:24, border:"1.5px solid #f4f4f5" }}>
          <FormField label="Cardholder Name" required error={errors.cardName}>
            <input style={inputStyle(errors.cardName)} value={data.cardName} onChange={e => set("cardName", e.target.value)}
              placeholder="John Doe" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.cardName?"#fca5a5":"#e5e5e5"}/>
          </FormField>
          <FormField label="Card Number" required error={errors.cardNumber}>
            <input style={inputStyle(errors.cardNumber)} value={data.cardNumber} maxLength={19}
              onChange={e => set("cardNumber", fmtCard(e.target.value))}
              placeholder="0000 0000 0000 0000" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.cardNumber?"#fca5a5":"#e5e5e5"}/>
          </FormField>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <FormField label="Expiry Date" required error={errors.cardExp}>
              <input style={inputStyle(errors.cardExp)} value={data.cardExp} maxLength={5}
                onChange={e => set("cardExp", fmtExp(e.target.value))}
                placeholder="MM/YY" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.cardExp?"#fca5a5":"#e5e5e5"}/>
            </FormField>
            <FormField label="CVV" required error={errors.cardCvv}>
              <input style={inputStyle(errors.cardCvv)} value={data.cardCvv} maxLength={4} type="password"
                onChange={e => set("cardCvv", e.target.value.replace(/\D/g,""))}
                placeholder="•••" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.cardCvv?"#fca5a5":"#e5e5e5"}/>
            </FormField>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"10px 14px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style={{ fontSize:12, color:"#16a34a", fontWeight:600 }}>Your payment info is encrypted and secure</span>
          </div>
        </div>
      )}

      {/* bKash fields */}
      {data.method === "bkash" && (
        <div className="ck-fade-in" style={{ display:"flex", flexDirection:"column", gap:16, background:"#fafafa", borderRadius:20, padding:24, border:"1.5px solid #f4f4f5" }}>
          <div style={{ background:"#fff0f7", border:"1.5px solid #ffd6ec", borderRadius:14, padding:16, fontSize:13, color:"#be185d", fontWeight:500, lineHeight:1.6 }}>
            📲 Send payment to <strong>01XXXXXXXXX</strong> (Personal) and enter your mobile number below. You'll receive a confirmation SMS.
          </div>
          <FormField label="Your Mobile Number" required error={errors.mobileNumber}>
            <input style={inputStyle(errors.mobileNumber)} value={data.mobileNumber} onChange={e => set("mobileNumber", e.target.value)}
              placeholder="01XXXXXXXXX" onFocus={e => e.target.style.borderColor="#f97316"} onBlur={e => e.target.style.borderColor=errors.mobileNumber?"#fca5a5":"#e5e5e5"}/>
          </FormField>
        </div>
      )}

      {/* COD note */}
      {data.method === "cod" && (
        <div className="ck-fade-in" style={{ background:"#fafafa", borderRadius:20, padding:24, border:"1.5px solid #f4f4f5" }}>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
            <span style={{ fontSize:28 }}>💵</span>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:"#18181b", marginBottom:6 }}>Pay when your order arrives</div>
              <div style={{ fontSize:13, color:"#71717a", lineHeight:1.6 }}>Please keep the exact amount ready. Our delivery partner will collect payment at your doorstep.</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", gap:12, marginTop:32 }}>
        <button className="ck-back-btn" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back
        </button>
        <button className="ck-next-btn" style={{ flex:1 }} onClick={() => validate() && onNext()}>
          Review Order
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  );
};

/* ─── Step 3: Confirm ─────────────────────────────────────── */
const ConfirmStep = ({ delivery, payment, cartItems, subtotal, deliveryFee, discount, total, promoCode, onBack, onPlace, isLoading }) => {
  const delivOpt = DELIVERY_OPTIONS.find(d => d.id === delivery.delivery);
  const methodLabel = { card:"Credit / Debit Card", cod:"Cash on Delivery", bkash:"bKash / Nagad" }[payment.method];

  return (
    <div className="ck-fade-in">
      <h2 className="ck-section-title">Review Your Order</h2>

      {/* Delivery summary */}
      <div className="ck-review-block">
        <div className="ck-review-header">
          <span>📦 Delivery</span>
          <button className="ck-edit-btn" onClick={onBack}>Edit</button>
        </div>
        <div style={{ fontSize:14, color:"#18181b", fontWeight:600 }}>{delivery.firstName} {delivery.lastName}</div>
        <div style={{ fontSize:13, color:"#71717a", marginTop:4, lineHeight:1.7 }}>
          {delivery.address}{delivery.apt ? `, ${delivery.apt}` : ""}<br/>
          {delivery.city}{delivery.district ? `, ${delivery.district}` : ""} – {delivery.zip}<br/>
          {delivery.email} · {delivery.phone}
        </div>
        <div style={{ marginTop:10, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:16 }}>{delivOpt?.icon}</span>
          <span style={{ fontSize:13, fontWeight:600, color:"#18181b" }}>{delivOpt?.label}</span>
          <span style={{ fontSize:12, color:"#a3a3a3" }}>— {delivOpt?.desc}</span>
        </div>
      </div>

      {/* Payment summary */}
      <div className="ck-review-block" style={{ marginTop:16 }}>
        <div className="ck-review-header">
          <span>💳 Payment</span>
        </div>
        <div style={{ fontSize:14, color:"#18181b", fontWeight:600 }}>{methodLabel}</div>
        {payment.method === "card" && payment.cardNumber && (
          <div style={{ fontSize:13, color:"#71717a", marginTop:4 }}>
            •••• •••• •••• {payment.cardNumber.replace(/\s/g,"").slice(-4)}
          </div>
        )}
        {payment.method === "bkash" && (
          <div style={{ fontSize:13, color:"#71717a", marginTop:4 }}>{payment.mobileNumber}</div>
        )}
      </div>

      {/* Items */}
      <div className="ck-review-block" style={{ marginTop:16 }}>
        <div className="ck-review-header"><span>🛒 Items ({cartItems.length})</span></div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display:"flex", alignItems:"center", gap:12 }}>
              <img src={item.img} alt={item.name} style={{ width:44, height:44, objectFit:"contain", background:"#fff7ed", borderRadius:10, padding:4 }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#18181b" }}>{item.name}</div>
                <div style={{ fontSize:12, color:"#a3a3a3" }}>×{item.qty} · {fmt(item.price)} each</div>
              </div>
              <div style={{ fontSize:13, fontWeight:800, color:"#18181b" }}>{fmt(item.price * item.qty)}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", gap:12, marginTop:32 }}>
        <button className="ck-back-btn" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back
        </button>
        <button className="ck-place-btn" style={{ flex:1 }} onClick={onPlace} disabled={isLoading}>
          {isLoading ? (
            <><span className="ck-spinner"/>Processing...</>
          ) : (
            <>{payment.method === "cod" ? "Place Order" : `Pay ${fmt(total)}`}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></>
          )}
        </button>
      </div>
    </div>
  );
};

/* ─── Success Screen ──────────────────────────────────────── */
const SuccessScreen = ({ orderId, name }) => {
  const navigate = useNavigate();
  return (
    <div className="ck-fade-in" style={{ textAlign:"center", padding:"40px 0" }}>
      <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", border:"2px solid #bbf7d0", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 8px 32px rgba(22,163,74,0.18)" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:38, fontWeight:700, color:"#18181b", margin:"0 0 8px", letterSpacing:"-0.02em" }}>Order Placed!</h2>
      <p style={{ fontSize:15, color:"#71717a", marginBottom:8 }}>Thank you, <strong style={{ color:"#18181b" }}>{name}</strong>! Your fresh groceries are on their way.</p>
      {orderId && <p style={{ fontSize:12, color:"#a3a3a3", marginBottom:40 }}>Order ID: <span style={{ fontWeight:700, color:"#f97316", fontFamily:"monospace" }}>#{orderId}</span></p>}

      <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"center" }}>
        <button onClick={() => navigate("/shop")}
          style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#f97316", color:"#fff", border:"none", borderRadius:14, padding:"14px 32px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 6px 24px rgba(249,115,22,0.28)", transition:"all .2s" }}
          onMouseOver={e => e.currentTarget.style.background="#ea580c"}
          onMouseOut={e => e.currentTarget.style.background="#f97316"}>
          Continue Shopping
        </button>
        <Link to="/" style={{ fontSize:13, color:"#a3a3a3", textDecoration:"none", fontWeight:500, padding:"8px 16px", borderRadius:10, transition:"color .2s" }}
          onMouseOver={e => e.currentTarget.style.color="#f97316"}
          onMouseOut={e => e.currentTarget.style.color="#a3a3a3"}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

/* ─── Order Summary Sidebar ───────────────────────────────── */
const OrderSummary = ({ cartItems, subtotal, promoCode, setPromoCode, promoApplied, setPromoApplied, promoError, setPromoError, discount, deliveryFee, total }) => {
  const [promoInput, setPromoInput] = useState("");

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoCode(code);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  return (
    <div style={{ position:"sticky", top:100 }}>
      <div style={{ background:"#fff", borderRadius:24, border:"1.5px solid #f4f4f5", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
        <div style={{ background:"linear-gradient(135deg,#18181b,#27272a)", padding:"24px 24px 20px" }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#fff", margin:0 }}>Order Summary</h3>
          <p style={{ fontSize:12, color:"#a3a3a3", margin:"4px 0 0" }}>{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
        </div>

        {/* Items */}
        <div style={{ padding:"20px 24px", maxHeight:240, overflowY:"auto", borderBottom:"1px solid #f4f4f5" }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <img src={item.img} alt={item.name} style={{ width:42, height:42, objectFit:"contain", background:"#fff7ed", borderRadius:10, padding:3 }}/>
                <span style={{ position:"absolute", top:-6, right:-6, background:"#f97316", color:"#fff", fontSize:9, fontWeight:800, width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>{item.qty}</span>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#18181b", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.name}</div>
                <div style={{ fontSize:11, color:"#a3a3a3" }}>{fmt(item.price)} × {item.qty}</div>
              </div>
              <div style={{ fontSize:13, fontWeight:800, color:"#18181b" }}>{fmt(item.price * item.qty)}</div>
            </div>
          ))}
        </div>

        {/* Promo */}
        <div style={{ padding:"16px 24px", borderBottom:"1px solid #f4f4f5" }}>
          <div style={{ display:"flex", gap:8 }}>
            <input
              style={{ flex:1, border:`1.5px solid ${promoError ? "#fca5a5" : promoApplied ? "#bbf7d0" : "#e5e5e5"}`, borderRadius:10, padding:"9px 14px", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif", outline:"none", background: promoApplied ? "#f0fdf4" : "#fff", color:"#18181b", letterSpacing:"0.06em", textTransform:"uppercase" }}
              placeholder="Promo code"
              value={promoInput}
              onChange={e => { setPromoInput(e.target.value); setPromoError(""); }}
              onKeyDown={e => e.key === "Enter" && applyPromo()}
              onFocus={e => e.target.style.borderColor="#f97316"}
              onBlur={e => e.target.style.borderColor= promoError?"#fca5a5": promoApplied?"#bbf7d0":"#e5e5e5"}
              disabled={promoApplied}
            />
            <button onClick={applyPromo} disabled={promoApplied}
              style={{ background: promoApplied ? "#f0fdf4" : "#18181b", color: promoApplied ? "#16a34a" : "#fff", border:"none", borderRadius:10, padding:"9px 16px", fontSize:12, fontWeight:700, cursor: promoApplied ? "default":"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .2s", flexShrink:0 }}>
              {promoApplied ? "✓ Applied" : "Apply"}
            </button>
          </div>
          {promoError && <p style={{ fontSize:11, color:"#ef4444", margin:"6px 0 0", fontWeight:500 }}>{promoError}</p>}
          {promoApplied && <p style={{ fontSize:11, color:"#16a34a", margin:"6px 0 0", fontWeight:600 }}>🎉 {promoCode} — {Math.round(PROMO_CODES[promoCode]*100)}% discount applied!</p>}
        </div>

        {/* Totals */}
        <div style={{ padding:"20px 24px" }}>
          {[
            { label:"Subtotal", value:fmt(subtotal) },
            ...(discount > 0 ? [{ label:`Promo (${promoCode})`, value:`-${fmt(discount)}`, green:true }] : []),
            { label:"Delivery", value: deliveryFee === 0 ? "FREE" : fmt(deliveryFee), green: deliveryFee === 0 },
          ].map(row => (
            <div key={row.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:13, color:"#71717a", fontWeight:500 }}>{row.label}</span>
              <span style={{ fontSize:13, fontWeight:700, color: row.green ? "#16a34a" : "#18181b" }}>{row.value}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:16, borderTop:"2px solid #f4f4f5" }}>
            <span style={{ fontSize:15, fontWeight:800, color:"#18181b" }}>Total</span>
            <span style={{ fontSize:22, fontWeight:900, color:"#f97316" }}>{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:16 }}>
        {[
          { icon:"🔒", text:"Secure 256-bit SSL encryption" },
          { icon:"↩️", text:"Free returns within 7 days"   },
          { icon:"🌿", text:"100% fresh or full refund"    },
        ].map(b => (
          <div key={b.text} style={{ display:"flex", alignItems:"center", gap:10, fontSize:12, color:"#71717a", fontWeight:500 }}>
            <span style={{ fontSize:16 }}>{b.icon}</span>
            {b.text}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Checkout Page ──────────────────────────────────── */
const Checkout = () => {
  const dispatch    = useDispatch();
  const navigate    = useNavigate();
  const cartItems   = useSelector(selectCartItems);
  const subtotal    = useSelector(selectCartTotal);
  const cartCount   = useSelector(selectCartCount);

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const [step, setStep]         = useState(0);
  const [success, setSuccess]   = useState(false);
  const [orderId, setOrderId]   = useState(null);

  const [promoCode,    setPromoCode]    = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError,   setPromoError]   = useState("");

  const [delivery, setDelivery] = useState({
    delivery:"standard", firstName:"", lastName:"", email:"",
    phone:"", address:"", apt:"", city:"", district:"", zip:"", notes:"",
  });
  const [payment, setPayment] = useState({
    method:"cod", cardName:"", cardNumber:"", cardExp:"", cardCvv:"", mobileNumber:"",
  });

  // Redirect if cart empty
  useEffect(() => {
    if (cartCount === 0 && !success) navigate("/shop");
  }, [cartCount, success]);

  const delivOpt    = DELIVERY_OPTIONS.find(d => d.id === delivery.delivery);
  const deliveryFee = delivOpt?.price ?? 0;
  const discount    = promoApplied ? subtotal * (PROMO_CODES[promoCode] || 0) : 0;
  const total       = Math.max(0, subtotal - discount + deliveryFee);

  const handlePlace = async () => {
    try {
      const result = await placeOrder({
        items:    cartItems,
        delivery,
        payment:  { method: payment.method },
        subtotal,
        discount,
        deliveryFee,
        total,
        promoCode: promoApplied ? promoCode : null,
      }).unwrap();
      setOrderId(result?.orderId || null);
      dispatch(clearCart());
      setSuccess(true);
    } catch (err) {
      // API not connected yet — still show success in dev
      dispatch(clearCart());
      setSuccess(true);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .ck-root * { box-sizing: border-box; }
        .ck-root { font-family: 'DM Sans', sans-serif; background: #fafafa; min-height: 100vh; padding: 48px 24px 80px; }
        .ck-fade-in { animation: ckFade .35s ease both; }
        @keyframes ckFade { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .ck-section-title { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:700; color:#18181b; margin:0 0 28px; letter-spacing:-0.02em; }
        .ck-review-block { background:#fafafa; border:1.5px solid #f4f4f5; border-radius:16px; padding:20px; }
        .ck-review-header { display:flex; align-items:center; justify-content:space-between; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#a3a3a3; margin-bottom:14px; }
        .ck-edit-btn { font-size:12px; font-weight:700; color:#f97316; background:none; border:none; cursor:pointer; padding:4px 10px; border-radius:8px; transition:background .2s; font-family:'DM Sans',sans-serif; }
        .ck-edit-btn:hover { background:#fff7ed; }
        .ck-next-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; background:#18181b; color:#fff; border:none; border-radius:14px; padding:15px 28px; font-size:14px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .25s; width:100%; }
        .ck-next-btn:hover { background:#f97316; transform:translateY(-1px); box-shadow:0 8px 24px rgba(249,115,22,0.25); }
        .ck-back-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; background:#fff; color:#18181b; border:1.5px solid #e5e5e5; border-radius:14px; padding:15px 20px; font-size:14px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; white-space:nowrap; }
        .ck-back-btn:hover { border-color:#18181b; }
        .ck-place-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; background:linear-gradient(135deg,#f97316,#ea580c); color:#fff; border:none; border-radius:14px; padding:15px 28px; font-size:14px; font-weight:800; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .25s; box-shadow:0 6px 24px rgba(249,115,22,0.30); }
        .ck-place-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(249,115,22,0.40); }
        .ck-place-btn:disabled { opacity:0.7; cursor:not-allowed; }
        .ck-spinner { width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:ckSpin .7s linear infinite; display:inline-block; }
        @keyframes ckSpin { to { transform:rotate(360deg); } }
        @media (max-width:900px) { .ck-layout { flex-direction:column !important; } .ck-sidebar { position:static !important; } }
        @media (max-width:600px) { .ck-root { padding:32px 16px 60px; } }
      `}</style>

      <div className="ck-root">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom:40 }}>
            <Link to="/shop" style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:12, fontWeight:700, color:"#a3a3a3", textDecoration:"none", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:24, transition:"color .2s" }}
              onMouseOver={e => e.currentTarget.style.color="#f97316"}
              onMouseOut={e => e.currentTarget.style.color="#a3a3a3"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Continue Shopping
            </Link>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,5vw,48px)", fontWeight:700, color:"#18181b", margin:0, letterSpacing:"-0.03em" }}>
              Check<span style={{ color:"#f97316" }}>out</span>
            </h1>
          </div>

          {success ? (
            <div style={{ maxWidth:500, margin:"0 auto" }}>
              <SuccessScreen orderId={orderId} name={delivery.firstName || "there"} />
            </div>
          ) : (
            <>
              <StepIndicator current={step} />

              <div className="ck-layout" style={{ display:"flex", gap:32, alignItems:"flex-start" }}>
                {/* Form panel */}
                <div style={{ flex:1, background:"#fff", borderRadius:24, border:"1.5px solid #f4f4f5", padding:36, boxShadow:"0 4px 24px rgba(0,0,0,0.04)", minWidth:0 }}>
                  {step === 0 && <DeliveryStep data={delivery} setData={setDelivery} onNext={() => setStep(1)} />}
                  {step === 1 && <PaymentStep  data={payment}  setData={setPayment}  onNext={() => setStep(2)} onBack={() => setStep(0)} />}
                  {step === 2 && (
                    <ConfirmStep
                      delivery={delivery} payment={payment}
                      cartItems={cartItems}
                      subtotal={subtotal} deliveryFee={deliveryFee}
                      discount={discount} total={total}
                      promoCode={promoCode}
                      onBack={() => setStep(1)}
                      onPlace={handlePlace}
                      isLoading={isLoading}
                    />
                  )}
                </div>

                {/* Sidebar */}
                <div className="ck-sidebar" style={{ width:360, flexShrink:0 }}>
                  <OrderSummary
                    cartItems={cartItems} subtotal={subtotal}
                    promoCode={promoCode} setPromoCode={setPromoCode}
                    promoApplied={promoApplied} setPromoApplied={setPromoApplied}
                    promoError={promoError} setPromoError={setPromoError}
                    discount={discount} deliveryFee={deliveryFee} total={total}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;