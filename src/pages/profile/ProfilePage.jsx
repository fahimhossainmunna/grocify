import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser, selectIsAuthenticated, logout,
} from "../../store/slices/authSlice";

/* ── Mock order data ──────────────────────────────────────── */
const MOCK_ORDERS = [
  {
    id: "GRO-2026-0041",
    date: "Mar 08, 2026",
    status: "Delivered",
    total: 24.85,
    items: [
      { name:"Atlantic Salmon",  qty:1, price:4.60, img:"🐟" },
      { name:"Organic Banana",   qty:2, price:0.75, img:"🍌" },
      { name:"Greek Yogurt",     qty:3, price:1.45, img:"🥛" },
      { name:"Farm Eggs",        qty:1, price:1.30, img:"🥚" },
    ],
    address: "42 Green Street, Dhaka 1205",
    delivery: "Express",
  },
  {
    id: "GRO-2026-0038",
    date: "Mar 03, 2026",
    status: "Delivered",
    total: 18.40,
    items: [
      { name:"Strawberry",       qty:2, price:2.30, img:"🍓" },
      { name:"Chicken Breast",   qty:2, price:2.70, img:"🍗" },
      { name:"Fresh Milk",       qty:4, price:0.65, img:"🥛" },
    ],
    address: "42 Green Street, Dhaka 1205",
    delivery: "Standard",
  },
  {
    id: "GRO-2026-0031",
    date: "Feb 24, 2026",
    status: "Delivered",
    total: 31.20,
    items: [
      { name:"Beef Steak",       qty:1, price:5.00, img:"🥩" },
      { name:"Red Capsicum",     qty:3, price:0.85, img:"🫑" },
      { name:"Cheddar Cheese",   qty:2, price:1.55, img:"🧀" },
      { name:"Black Grapes",     qty:2, price:1.90, img:"🍇" },
    ],
    address: "42 Green Street, Dhaka 1205",
    delivery: "Express",
  },
  {
    id: "GRO-2026-0027",
    date: "Feb 15, 2026",
    status: "Cancelled",
    total: 12.50,
    items: [
      { name:"Tiger Shrimp",     qty:1, price:3.45, img:"🦐" },
      { name:"Sweet Pineapple",  qty:2, price:1.45, img:"🍍" },
    ],
    address: "42 Green Street, Dhaka 1205",
    delivery: "Standard",
  },
];

const STATUS_STYLE = {
  Delivered: { bg:"#f0fdf4", color:"#16a34a", border:"#bbf7d0", dot:"#16a34a" },
  Processing:{ bg:"#fff7ed", color:"#ea580c", border:"#fed7aa", dot:"#f97316" },
  Shipped:   { bg:"#eff6ff", color:"#2563eb", border:"#bfdbfe", dot:"#3b82f6" },
  Cancelled: { bg:"#fef2f2", color:"#ef4444", border:"#fecaca", dot:"#ef4444" },
};

const fmt = (n) => `$${Number(n).toFixed(2)}`;

/* ── Icons ────────────────────────────────────────────────── */
const UserIcon    = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const OrderIcon   = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>);
const HeartIcon   = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>);
const LockIcon    = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>);
const LogoutIcon  = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>);
const EditIcon    = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const ChevronIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>);
const MapPinIcon  = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>);

/* ── Order Card ───────────────────────────────────────────── */
const OrderCard = ({ order, index }) => {
  const [expanded, setExpanded] = useState(false);
  const st = STATUS_STYLE[order.status] || STATUS_STYLE.Processing;

  return (
    <div className="pr-order-card" style={{ animationDelay:`${index * 0.08}s` }}>
      {/* Header row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ display:"flex", flexDirection:"column" }}>
            <span style={{ fontSize:13, fontWeight:800, color:"#18181b", letterSpacing:"0.02em" }}>
              {order.id}
            </span>
            <span style={{ fontSize:11, color:"#a3a3a3", marginTop:2 }}>{order.date}</span>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ background:st.bg, color:st.color, border:`1px solid ${st.border}`, borderRadius:999, fontSize:11, fontWeight:700, padding:"4px 12px", display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:st.dot, display:"inline-block" }}/>
            {order.status}
          </span>
          <span style={{ fontSize:15, fontWeight:800, color:"#18181b" }}>{fmt(order.total)}</span>
          <button onClick={() => setExpanded(v => !v)}
            style={{ background:"none", border:"1.5px solid #e5e5e5", borderRadius:8, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#a3a3a3", transition:"all .2s" }}
            onMouseOver={e=>{ e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.color="#f97316"; }}
            onMouseOut={e=>{ e.currentTarget.style.borderColor="#e5e5e5"; e.currentTarget.style.color="#a3a3a3"; }}>
            <span style={{ display:"flex", transition:"transform .25s", transform: expanded ? "rotate(90deg)" : "rotate(0)" }}>
              <ChevronIcon/>
            </span>
          </button>
        </div>
      </div>

      {/* Items preview */}
      <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
        {order.items.map((item, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:6, background:"#fafafa", border:"1px solid #f4f4f5", borderRadius:8, padding:"5px 10px", fontSize:12 }}>
            <span style={{ fontSize:16 }}>{item.img}</span>
            <span style={{ fontWeight:600, color:"#52525b" }}>{item.name}</span>
            <span style={{ color:"#a3a3a3" }}>×{item.qty}</span>
          </div>
        ))}
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f4f4f5", animation:"prFade .25s ease both" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:14 }}>
            <div style={{ background:"#fafafa", borderRadius:12, padding:"14px 16px", border:"1px solid #f4f4f5" }}>
              <div style={{ fontSize:10, fontWeight:700, color:"#a3a3a3", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Delivery Address</div>
              <div style={{ display:"flex", alignItems:"flex-start", gap:6 }}>
                <span style={{ color:"#f97316", marginTop:1, flexShrink:0 }}><MapPinIcon/></span>
                <span style={{ fontSize:13, color:"#52525b", lineHeight:1.5 }}>{order.address}</span>
              </div>
            </div>
            <div style={{ background:"#fafafa", borderRadius:12, padding:"14px 16px", border:"1px solid #f4f4f5" }}>
              <div style={{ fontSize:10, fontWeight:700, color:"#a3a3a3", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Delivery Type</div>
              <span style={{ fontSize:13, fontWeight:700, color:"#18181b" }}>{order.delivery} Delivery</span>
            </div>
          </div>

          {/* Item breakdown */}
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:13 }}>
                <span style={{ color:"#52525b" }}>{item.img} {item.name} × {item.qty}</span>
                <span style={{ fontWeight:700, color:"#18181b" }}>{fmt(item.price * item.qty)}</span>
              </div>
            ))}
            <div style={{ height:1, background:"#f4f4f5", margin:"4px 0" }}/>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:13, fontWeight:700, color:"#18181b" }}>Total</span>
              <span style={{ fontSize:16, fontWeight:900, color:"#f97316" }}>{fmt(order.total)}</span>
            </div>
          </div>

          {order.status === "Delivered" && (
            <button style={{ background:"#f9fafb", border:"1.5px solid #e5e5e5", borderRadius:10, padding:"9px 18px", fontSize:12, fontWeight:700, color:"#52525b", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .2s" }}
              onMouseOver={e=>{ e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.color="#f97316"; }}
              onMouseOut={e=>{ e.currentTarget.style.borderColor="#e5e5e5"; e.currentTarget.style.color="#52525b"; }}>
              🔄 Reorder
            </button>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Profile Tab ──────────────────────────────────────────── */
const ProfileTab = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [form,    setForm]    = useState({
    name:  user?.name  || "Riya Ahmed",
    email: user?.email || "riya@example.com",
    phone: user?.phone || "01712345678",
    address: "42 Green Street, Dhaka 1205",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Field = ({ label, value, field, type="text" }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#a3a3a3" }}>{label}</label>
      {editing ? (
        <input type={type} value={form[field]} onChange={e => setForm(f => ({...f, [field]:e.target.value}))}
          style={{ border:"1.5px solid #f97316", borderRadius:10, padding:"11px 14px", fontSize:14, fontWeight:500, color:"#18181b", outline:"none", fontFamily:"'DM Sans',sans-serif", background:"#fffbf7", boxShadow:"0 0 0 3px rgba(249,115,22,0.08)", transition:"all .2s" }}/>
      ) : (
        <div style={{ fontSize:14, fontWeight:600, color:"#18181b", padding:"11px 14px", background:"#fafafa", border:"1.5px solid #f4f4f5", borderRadius:10 }}>{form[field] || "—"}</div>
      )}
    </div>
  );

  return (
    <div style={{ animation:"prFade .3s ease both" }}>
      {/* Avatar hero */}
      <div style={{ background:"linear-gradient(135deg,#fff7ed,#fffbf7)", border:"1.5px solid #f4f4f5", borderRadius:20, padding:"28px 32px", marginBottom:24, display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" }}>
        <div style={{ position:"relative" }}>
          <div style={{ width:76, height:76, borderRadius:"50%", background:"linear-gradient(135deg,#f97316,#ea580c)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:30, fontWeight:800, boxShadow:"0 4px 20px rgba(249,115,22,0.30)" }}>
            {form.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div style={{ position:"absolute", bottom:0, right:0, width:22, height:22, borderRadius:"50%", background:"#f97316", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
        </div>
        <div>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"#18181b", margin:"0 0 4px", letterSpacing:"-0.02em" }}>{form.name}</h3>
          <p style={{ fontSize:13, color:"#a3a3a3", margin:"0 0 10px" }}>{form.email}</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <span style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", color:"#16a34a", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:999 }}>✓ Verified</span>
            <span style={{ background:"#fff7ed", border:"1px solid #fed7aa", color:"#ea580c", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:999 }}>🌿 Organic Member</span>
          </div>
        </div>
        <div style={{ marginLeft:"auto" }}>
          {!editing ? (
            <button onClick={() => setEditing(true)}
              style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 18px", borderRadius:12, border:"1.5px solid #e5e5e5", background:"#fff", color:"#52525b", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .2s" }}
              onMouseOver={e=>{ e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.color="#f97316"; }}
              onMouseOut={e=>{ e.currentTarget.style.borderColor="#e5e5e5"; e.currentTarget.style.color="#52525b"; }}>
              <EditIcon/> Edit Profile
            </button>
          ) : (
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={handleSave}
                style={{ padding:"10px 18px", borderRadius:12, border:"none", background:"#f97316", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 14px rgba(249,115,22,0.28)" }}>
                Save Changes
              </button>
              <button onClick={() => setEditing(false)}
                style={{ padding:"10px 14px", borderRadius:12, border:"1.5px solid #e5e5e5", background:"#fff", color:"#a3a3a3", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {saved && (
        <div style={{ background:"#f0fdf4", border:"1.5px solid #bbf7d0", borderRadius:12, padding:"12px 18px", fontSize:13, color:"#16a34a", fontWeight:600, marginBottom:20, display:"flex", alignItems:"center", gap:8, animation:"prFade .25s ease both" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          Profile updated successfully!
        </div>
      )}

      {/* Fields */}
      <div style={{ background:"#fff", border:"1.5px solid #f4f4f5", borderRadius:20, padding:"28px 32px", marginBottom:20 }}>
        <h4 style={{ fontSize:14, fontWeight:800, color:"#18181b", margin:"0 0 20px", letterSpacing:"0.02em" }}>Personal Information</h4>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <Field label="Full Name"     field="name"    value={form.name}    />
          <Field label="Phone Number"  field="phone"   value={form.phone}   />
          <Field label="Email Address" field="email"   value={form.email}   type="email"/>
          <Field label="Address"       field="address" value={form.address} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
        {[
          { icon:"📦", label:"Total Orders",  value:MOCK_ORDERS.length },
          { icon:"💰", label:"Total Spent",   value:fmt(MOCK_ORDERS.reduce((s,o) => s+o.total, 0)) },
          { icon:"⭐", label:"Loyalty Points", value:"480 pts" },
        ].map(s => (
          <div key={s.label} style={{ background:"#fff", border:"1.5px solid #f4f4f5", borderRadius:16, padding:"18px 20px", textAlign:"center", transition:"border-color .2s" }}
            onMouseOver={e=>e.currentTarget.style.borderColor="#fed7aa"}
            onMouseOut={e=>e.currentTarget.style.borderColor="#f4f4f5"}>
            <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontSize:20, fontWeight:900, color:"#18181b", letterSpacing:"-0.02em" }}>{s.value}</div>
            <div style={{ fontSize:11, color:"#a3a3a3", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Orders Tab ───────────────────────────────────────────── */
const OrdersTab = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Delivered", "Processing", "Cancelled"];

  const filtered = filter === "All"
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter(o => o.status === filter);

  return (
    <div style={{ animation:"prFade .3s ease both" }}>
      {/* Filter tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
        {filters.map(f => {
          const active = filter === f;
          const st = f !== "All" ? STATUS_STYLE[f] : null;
          return (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding:"8px 18px", borderRadius:999, border:`1.5px solid ${active ? (st?.border || "#18181b") : "#e5e5e5"}`, background: active ? (st?.bg || "#18181b") : "#fff", color: active ? (st?.color || "#fff") : "#71717a", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .2s" }}>
              {f}
              <span style={{ marginLeft:6, fontSize:11, background: active ? "rgba(0,0,0,0.08)" : "#f4f4f5", borderRadius:999, padding:"1px 7px" }}>
                {f === "All" ? MOCK_ORDERS.length : MOCK_ORDERS.filter(o=>o.status===f).length}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0", color:"#a3a3a3" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
          <div style={{ fontWeight:600, fontSize:15, color:"#18181b" }}>No {filter} orders</div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {filtered.map((order, i) => <OrderCard key={order.id} order={order} index={i}/>)}
        </div>
      )}
    </div>
  );
};

/* ── Security Tab ─────────────────────────────────────────── */
const SecurityTab = () => {
  const [form, setForm] = useState({ current:"", newPw:"", confirm:"" });
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ animation:"prFade .3s ease both" }}>
      <div style={{ background:"#fff", border:"1.5px solid #f4f4f5", borderRadius:20, padding:"28px 32px", maxWidth:480 }}>
        <h4 style={{ fontSize:14, fontWeight:800, color:"#18181b", margin:"0 0 6px" }}>Change Password</h4>
        <p style={{ fontSize:13, color:"#a3a3a3", margin:"0 0 24px" }}>Keep your account safe with a strong password</p>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { label:"Current Password", field:"current" },
            { label:"New Password",     field:"newPw"   },
            { label:"Confirm Password", field:"confirm" },
          ].map(f => (
            <div key={f.field} style={{ display:"flex", flexDirection:"column", gap:5 }}>
              <label style={{ fontSize:10, fontWeight:700, color:"#a3a3a3", textTransform:"uppercase", letterSpacing:"0.1em" }}>{f.label}</label>
              <input type="password" value={form[f.field]} onChange={e => setForm(p => ({...p, [f.field]:e.target.value}))}
                placeholder="••••••••"
                style={{ border:"1.5px solid #e5e5e5", borderRadius:10, padding:"11px 14px", fontSize:14, outline:"none", fontFamily:"'DM Sans',sans-serif", background:"#fafafa", transition:"all .2s" }}
                onFocus={e=>{ e.target.style.borderColor="#f97316"; e.target.style.background="#fff"; e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,0.08)"; }}
                onBlur={e=>{ e.target.style.borderColor="#e5e5e5"; e.target.style.background="#fafafa"; e.target.style.boxShadow="none"; }}/>
            </div>
          ))}
        </div>
        {saved && (
          <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#16a34a", fontWeight:600, marginTop:16, display:"flex", alignItems:"center", gap:8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            Password updated!
          </div>
        )}
        <button
          onClick={() => { setSaved(true); setForm({ current:"", newPw:"", confirm:"" }); setTimeout(()=>setSaved(false),2500); }}
          style={{ marginTop:20, padding:"13px 24px", background:"#f97316", color:"#fff", border:"none", borderRadius:12, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 16px rgba(249,115,22,0.28)", transition:"all .2s" }}
          onMouseOver={e=>{ e.currentTarget.style.background="#ea580c"; e.currentTarget.style.transform="translateY(-1px)"; }}
          onMouseOut={e=>{ e.currentTarget.style.background="#f97316"; e.currentTarget.style.transform="translateY(0)"; }}>
          Update Password
        </button>
      </div>
    </div>
  );
};

/* ── Main Page ────────────────────────────────────────────── */
const ProfilePage = () => {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const location   = useLocation();
  const isAuth     = useSelector(selectIsAuthenticated);
  const user       = useSelector(selectCurrentUser);
  const [mounted,  setMounted]  = useState(false);

  // Determine initial tab from path
  const initTab = location.pathname.includes("orders") ? "orders" : "profile";
  const [activeTab, setActiveTab] = useState(initTab);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth]);

  const TABS = [
    { id:"profile",  label:"My Profile",    icon:<UserIcon/>   },
    { id:"orders",   label:"Order History", icon:<OrderIcon/>  },
    { id:"wishlist", label:"Wishlist",       icon:<HeartIcon/>  },
    { id:"security", label:"Security",      icon:<LockIcon/>   },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        .pr-root * { box-sizing:border-box; }
        .pr-root {
          font-family:'DM Sans',sans-serif;
          min-height:100vh;
          background:#fafafa;
          padding:36px 24px 80px;
        }

        /* Sidebar tab */
        .pr-tab {
          display:flex; align-items:center; gap:11px;
          padding:12px 16px; border-radius:12px;
          border:none; background:none; cursor:pointer;
          font-size:13px; font-weight:600; color:#71717a;
          font-family:'DM Sans',sans-serif;
          transition:all .2s; width:100%; text-align:left;
        }
        .pr-tab:hover  { background:#fff7ed; color:#f97316; }
        .pr-tab.active { background:#fff7ed; color:#f97316; border-left:3px solid #f97316; padding-left:13px; }

        /* Order card */
        .pr-order-card {
          background:#fff;
          border:1.5px solid #f4f4f5;
          border-radius:16px;
          padding:20px;
          transition:all .25s;
          animation: prFade .4s cubic-bezier(.34,1.2,.64,1) both;
        }
        .pr-order-card:hover { border-color:#fed7aa; box-shadow:0 4px 20px rgba(0,0,0,0.07); }

        /* Page fade */
        .pr-page { opacity:0; transform:translateY(14px); transition:opacity .5s ease, transform .5s cubic-bezier(.34,1.2,.64,1); }
        .pr-page.show { opacity:1; transform:translateY(0); }

        @keyframes prFade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        @media (max-width:768px) { .pr-layout { flex-direction:column !important; } .pr-sidebar { width:100% !important; } }
      `}</style>

      <div className="pr-root">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>

          {/* Breadcrumb */}
          <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#a3a3a3", fontWeight:500, marginBottom:28 }}>
            <Link to="/" style={{ color:"#a3a3a3", textDecoration:"none" }} onMouseOver={e=>e.currentTarget.style.color="#f97316"} onMouseOut={e=>e.currentTarget.style.color="#a3a3a3"}>Home</Link>
            <span>›</span>
            <span style={{ color:"#18181b", fontWeight:600, textTransform:"capitalize" }}>{activeTab === "orders" ? "Order History" : activeTab === "security" ? "Security" : "My Profile"}</span>
          </div>

          <div className={`pr-page ${mounted ? "show" : ""}`}>
            <div className="pr-layout" style={{ display:"flex", gap:28, alignItems:"flex-start" }}>

              {/* ── Sidebar ── */}
              <div className="pr-sidebar" style={{ width:240, flexShrink:0 }}>
                {/* User card */}
                <div style={{ background:"#fff", border:"1.5px solid #f4f4f5", borderRadius:20, padding:"24px 20px", marginBottom:12, textAlign:"center" }}>
                  <div style={{ width:60, height:60, borderRadius:"50%", background:"linear-gradient(135deg,#f97316,#ea580c)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:24, fontWeight:800, margin:"0 auto 12px", boxShadow:"0 4px 16px rgba(249,115,22,0.25)" }}>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div style={{ fontSize:15, fontWeight:800, color:"#18181b", marginBottom:3 }}>{user?.name || "User"}</div>
                  <div style={{ fontSize:11, color:"#a3a3a3", marginBottom:12 }}>{user?.email || ""}</div>
                  <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", color:"#16a34a", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:999, display:"inline-block" }}>
                    ✓ Verified Account
                  </div>
                </div>

                {/* Nav tabs */}
                <div style={{ background:"#fff", border:"1.5px solid #f4f4f5", borderRadius:20, padding:"10px", marginBottom:12 }}>
                  {TABS.map(tab => (
                    <button key={tab.id}
                      className={`pr-tab ${activeTab === tab.id ? "active" : ""}`}
                      onClick={() => {
                        if (tab.id === "wishlist") { navigate("/wishlist"); return; }
                        setActiveTab(tab.id);
                      }}>
                      <span style={{ display:"flex", opacity: activeTab===tab.id ? 1 : 0.5 }}>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Logout */}
                <button onClick={() => { dispatch(logout()); navigate("/"); }}
                  style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px", borderRadius:14, background:"#fef2f2", border:"1.5px solid #fecaca", color:"#ef4444", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .2s" }}
                  onMouseOver={e=>{ e.currentTarget.style.background="#fee2e2"; }}
                  onMouseOut={e=>{ e.currentTarget.style.background="#fef2f2"; }}>
                  <LogoutIcon/> Sign Out
                </button>
              </div>

              {/* ── Content ── */}
              <div style={{ flex:1, minWidth:0 }}>
                {/* Page title */}
                <div style={{ marginBottom:24 }}>
                  <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,4vw,36px)", fontWeight:700, color:"#18181b", margin:"0 0 4px", letterSpacing:"-0.025em" }}>
                    {activeTab === "profile"  && "My Profile"}
                    {activeTab === "orders"   && "Order History"}
                    {activeTab === "security" && "Security Settings"}
                  </h1>
                  <p style={{ fontSize:13, color:"#a3a3a3", margin:0 }}>
                    {activeTab === "profile"  && "Manage your personal information"}
                    {activeTab === "orders"   && `${MOCK_ORDERS.length} orders placed`}
                    {activeTab === "security" && "Keep your account secure"}
                  </p>
                </div>

                {activeTab === "profile"  && <ProfileTab  user={user}/>}
                {activeTab === "orders"   && <OrdersTab/>}
                {activeTab === "security" && <SecurityTab/>}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;