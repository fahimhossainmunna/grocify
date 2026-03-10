import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogin    from "../../hooks/useLogin";
import useRegister from "../../hooks/useRegister";

/* ── Icons ────────────────────────────────────────────────── */
const EyeIcon = ({ open }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const MailIcon  = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
const LockIcon  = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>);
const UserIcon  = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const PhoneIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>);
const LeafIcon  = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.92a1 1 0 001.71 1.05C7 19 8.5 17 12 16c0 3 .5 5 2 7"/><path d="M17 8c0-4-2-7-5-8 0 4 1 7 5 8z"/></svg>);

/* ── Input Field ──────────────────────────────────────────── */
const Field = ({ label, icon, type="text", value, onChange, error, placeholder, rightEl }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
    <label style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color: error ? "#ef4444" : "#9ca3af" }}>
      {label}
    </label>
    <div style={{ position:"relative" }}>
      <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#d1d5db", display:"flex", pointerEvents:"none" }}>
        {icon}
      </span>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width:"100%", boxSizing:"border-box",
          border:`1.5px solid ${error ? "#fca5a5" : "#ede9e6"}`,
          borderRadius:12, padding:"11px 42px 11px 42px",
          fontSize:14, fontWeight:500, color:"#1c1917",
          outline:"none", fontFamily:"'DM Sans',sans-serif",
          background: error ? "#fff8f8" : "#faf9f7",
          transition:"all .2s",
          letterSpacing:"0.01em",
        }}
        onFocus={e => {
          e.target.style.borderColor = "#f97316";
          e.target.style.background  = "#fff";
          e.target.style.boxShadow   = "0 0 0 3px rgba(249,115,22,0.10)";
        }}
        onBlur={e => {
          e.target.style.borderColor = error ? "#fca5a5" : "#ede9e6";
          e.target.style.background  = error ? "#fff8f8" : "#faf9f7";
          e.target.style.boxShadow   = "none";
        }}
      />
      {rightEl && (
        <span style={{ position:"absolute", right:13, top:"50%", transform:"translateY(-50%)", display:"flex" }}>
          {rightEl}
        </span>
      )}
    </div>
    {error && <span style={{ fontSize:11, color:"#ef4444", fontWeight:500, display:"flex", alignItems:"center", gap:4 }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="#ef4444"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
      {error}
    </span>}
  </div>
);

/* ── Login Form ───────────────────────────────────────────── */
const LoginForm = ({ onSwitch }) => {
  const { form, setField, errors, apiErr, showPw, setShowPw, isLoading, handleSubmit } = useLogin();
  return (
    <div className="af-slide-in">
      <div style={{ marginBottom:22 }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:"#1c1917", margin:"0 0 6px", letterSpacing:"-0.025em", lineHeight:1.1 }}>
          Welcome back
        </h2>
        <p style={{ fontSize:13, color:"#a8a29e", margin:0, fontWeight:400 }}>Sign in to your Grocify account</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <Field label="Email" icon={<MailIcon/>} type="email"
          value={form.email} onChange={e=>setField("email",e.target.value)}
          error={errors.email} placeholder="you@example.com"/>
        <Field label="Password" icon={<LockIcon/>} type={showPw?"text":"password"}
          value={form.password} onChange={e=>setField("password",e.target.value)}
          error={errors.password} placeholder="Enter your password"
          rightEl={
            <button onClick={()=>setShowPw(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", color:"#c4b5a4", padding:2, display:"flex", transition:"color .2s" }}
              onMouseOver={e=>e.currentTarget.style.color="#f97316"} onMouseOut={e=>e.currentTarget.style.color="#c4b5a4"}>
              <EyeIcon open={showPw}/>
            </button>
          }/>
      </div>

      <div style={{ textAlign:"right", marginTop:8 }}>
        <a href="#" style={{ fontSize:12, fontWeight:600, color:"#f97316", textDecoration:"none", opacity:0.85, transition:"opacity .2s" }}
          onMouseOver={e=>e.currentTarget.style.opacity=1} onMouseOut={e=>e.currentTarget.style.opacity=0.85}>
          Forgot password?
        </a>
      </div>

      {apiErr && (
        <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#dc2626", marginTop:10, display:"flex", alignItems:"center", gap:8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#dc2626"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="16" r="1" fill="#fff"/></svg>
          {apiErr}
        </div>
      )}

      <button className="af-btn" onClick={handleSubmit} disabled={isLoading} style={{ marginTop:18 }}>
        {isLoading ? <><span className="af-spin"/>Signing in...</> : "Sign In →"}
      </button>

      {/* Divider */}
      <div style={{ display:"flex", alignItems:"center", gap:12, margin:"18px 0" }}>
        <div style={{ flex:1, height:"1px", background:"linear-gradient(to right, transparent, #e7e5e4)" }}/>
        <span style={{ fontSize:11, color:"#c4b5a4", fontWeight:600, letterSpacing:"0.05em" }}>OR</span>
        <div style={{ flex:1, height:"1px", background:"linear-gradient(to left, transparent, #e7e5e4)" }}/>
      </div>

      <p style={{ textAlign:"center", fontSize:13, color:"#a8a29e", margin:0 }}>
        Don't have an account?{" "}
        <button onClick={onSwitch} style={{ background:"none", border:"none", cursor:"pointer", color:"#f97316", fontWeight:700, fontSize:13, fontFamily:"'DM Sans',sans-serif", padding:0, textDecoration:"underline", textUnderlineOffset:3 }}>
          Create one
        </button>
      </p>
    </div>
  );
};

/* ── Register Form ────────────────────────────────────────── */
const RegisterForm = ({ onSwitch }) => {
  const { form, setField, errors, apiErr, showPw, setShowPw, agreed, setAgreed, isLoading, passwordStrength, handleSubmit } = useRegister();
  const str = passwordStrength();
  const strColor = { 1:"#ef4444", 2:"#f97316", 3:"#eab308", 4:"#22c55e" };

  return (
    <div className="af-slide-in">
      <div style={{ marginBottom:18 }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:"#1c1917", margin:"0 0 6px", letterSpacing:"-0.025em", lineHeight:1.1 }}>
          Create account
        </h2>
        <p style={{ fontSize:13, color:"#a8a29e", margin:0 }}>Join 10,000+ happy Grocify customers</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        <Field label="Full Name" icon={<UserIcon/>}
          value={form.name} onChange={e=>setField("name",e.target.value)}
          error={errors.name} placeholder="John Doe"/>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <Field label="Email" icon={<MailIcon/>} type="email"
            value={form.email} onChange={e=>setField("email",e.target.value)}
            error={errors.email} placeholder="you@example.com"/>
          <Field label="Phone" icon={<PhoneIcon/>} type="tel"
            value={form.phone} onChange={e=>setField("phone",e.target.value)}
            error={errors.phone} placeholder="01XXXXXXXXX"/>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <Field label="Password" icon={<LockIcon/>} type={showPw?"text":"password"}
            value={form.password} onChange={e=>setField("password",e.target.value)}
            error={errors.password} placeholder="Min. 6 chars"
            rightEl={
              <button onClick={()=>setShowPw(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", color:"#c4b5a4", padding:2, display:"flex", transition:"color .2s" }}
                onMouseOver={e=>e.currentTarget.style.color="#f97316"} onMouseOut={e=>e.currentTarget.style.color="#c4b5a4"}>
                <EyeIcon open={showPw}/>
              </button>
            }/>
          <Field label="Confirm" icon={<LockIcon/>} type={showPw?"text":"password"}
            value={form.confirm} onChange={e=>setField("confirm",e.target.value)}
            error={errors.confirm} placeholder="Re-enter"/>
        </div>

        {/* Password strength */}
        {form.password.length > 0 && (
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            {[1,2,3,4].map(i=>(
              <div key={i} style={{ flex:1, height:3, borderRadius:999, background:i<=str.level?strColor[str.level]:"#e7e5e4", transition:"background .3s" }}/>
            ))}
            <span style={{ fontSize:11, color:"#a8a29e", fontWeight:600, marginLeft:6, whiteSpace:"nowrap" }}>{str.label}</span>
          </div>
        )}

        {/* Terms */}
        <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
          <div onClick={()=>setAgreed(v=>!v)}
            style={{ width:18, height:18, borderRadius:6, border:`1.5px solid ${errors.agree?"#fca5a5":agreed?"#f97316":"#d6d3d1"}`, background:agreed?"#f97316":"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s", cursor:"pointer", boxShadow: agreed ? "0 2px 8px rgba(249,115,22,0.25)" : "none" }}>
            {agreed && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
          </div>
          <span style={{ fontSize:12, color:"#78716c" }}>
            I agree to{" "}<a href="#" style={{ color:"#f97316", textDecoration:"none", fontWeight:600 }}>Terms</a>{" "}&amp;{" "}<a href="#" style={{ color:"#f97316", textDecoration:"none", fontWeight:600 }}>Privacy Policy</a>
          </span>
        </label>
        {errors.agree && <span style={{ fontSize:11, color:"#ef4444", marginTop:-4 }}>{errors.agree}</span>}
      </div>

      {apiErr && (
        <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#dc2626", marginTop:10 }}>
          {apiErr}
        </div>
      )}

      <button className="af-btn" onClick={handleSubmit} disabled={isLoading} style={{ marginTop:16 }}>
        {isLoading ? <><span className="af-spin"/>Creating account...</> : "Create Account →"}
      </button>

      <div style={{ display:"flex", alignItems:"center", gap:12, margin:"16px 0" }}>
        <div style={{ flex:1, height:"1px", background:"linear-gradient(to right, transparent, #e7e5e4)" }}/>
        <span style={{ fontSize:11, color:"#c4b5a4", fontWeight:600, letterSpacing:"0.05em" }}>OR</span>
        <div style={{ flex:1, height:"1px", background:"linear-gradient(to left, transparent, #e7e5e4)" }}/>
      </div>

      <p style={{ textAlign:"center", fontSize:13, color:"#a8a29e", margin:0 }}>
        Already have an account?{" "}
        <button onClick={onSwitch} style={{ background:"none", border:"none", cursor:"pointer", color:"#f97316", fontWeight:700, fontSize:13, fontFamily:"'DM Sans',sans-serif", padding:0, textDecoration:"underline", textUnderlineOffset:3 }}>
          Sign in
        </button>
      </p>
    </div>
  );
};

/* ── Main ─────────────────────────────────────────────────── */
const AuthPage = () => {
  const [mode,    setMode]    = useState("login");
  const [exiting, setExiting] = useState(false);
  const [exitDir, setExitDir] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const switchTo = (next) => {
    if (next === mode || exiting) return;
    const dir = next === "register" ? "left" : "right";
    setExitDir(dir);
    setExiting(true);
    setTimeout(() => { setMode(next); setExiting(false); setExitDir(""); }, 260);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .af-root {
          font-family: 'DM Sans', sans-serif;
          min-height: calc(100vh - 102px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          width: 100%;
          position: relative;
          overflow: hidden;
          background: #faf9f7;
        }

        /* Subtle background pattern */
        .af-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 15% 20%, rgba(249,115,22,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 85% 80%, rgba(249,115,22,0.04) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Floating decorative circles */
        .af-deco {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .af-deco-1 {
          width: 320px; height: 320px;
          top: -100px; left: -80px;
          background: radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%);
        }
        .af-deco-2 {
          width: 240px; height: 240px;
          bottom: -60px; right: -60px;
          background: radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%);
        }
        .af-deco-3 {
          width: 80px; height: 80px;
          top: 30%; right: 8%;
          border: 1.5px solid rgba(249,115,22,0.10);
        }

        .af-card {
          width: 100%;
          max-width: 520px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.9);
          padding: 36px 40px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.8) inset,
            0 4px 6px rgba(0,0,0,0.02),
            0 20px 60px rgba(0,0,0,0.09),
            0 0 0 1px rgba(231,229,228,0.6);
          opacity: 0;
          transform: translateY(24px) scale(0.98);
          transition: opacity .55s ease, transform .55s cubic-bezier(.34,1.2,.64,1);
          position: relative;
          z-index: 1;
        }
        .af-card.show { opacity:1; transform:translateY(0) scale(1); }

        /* Accent line top of card */
        .af-card::before {
          content: '';
          position: absolute;
          top: -1px; left: 40px; right: 40px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #f97316 30%, #fb923c 70%, transparent);
          border-radius: 999px;
        }

        /* Tabs */
        .af-tabs {
          display: flex;
          background: #f5f3f0;
          border-radius: 12px;
          padding: 3px;
          gap: 2px;
          margin-bottom: 24px;
          border: 1px solid #ede9e6;
        }
        .af-tab {
          flex: 1; padding: 9px 12px;
          border: none; border-radius: 9px;
          font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all .25s cubic-bezier(.34,1.2,.64,1);
          letter-spacing: 0.01em;
        }
        .af-tab-on  {
          background: #fff;
          color: #1c1917;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset;
        }
        .af-tab-off { background: transparent; color: #a8a29e; }
        .af-tab-off:hover { color: #78716c; }

        /* Form transition */
        .af-form-wrap { overflow: hidden; }
        .af-slide-in   { animation: slideIn  .28s cubic-bezier(.4,0,.2,1) both; }
        .af-exit-left  { animation: exitLeft  .28s cubic-bezier(.4,0,.2,1) both; }
        .af-exit-right { animation: exitRight .28s cubic-bezier(.4,0,.2,1) both; }
        @keyframes slideIn    { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:translateX(0)} }
        @keyframes exitLeft   { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(-18px)} }
        @keyframes exitRight  { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(18px)} }

        /* Sign in button */
        .af-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #fff; border: none;
          border-radius: 12px; padding: 13px 20px;
          font-size: 14px; font-weight: 700; letter-spacing: 0.02em;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all .25s cubic-bezier(.34,1.2,.64,1);
          box-shadow: 0 4px 14px rgba(249,115,22,0.32), 0 1px 0 rgba(255,255,255,0.15) inset;
        }
        .af-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(249,115,22,0.40), 0 1px 0 rgba(255,255,255,0.15) inset;
        }
        .af-btn:active:not(:disabled) { transform: translateY(0); }
        .af-btn:disabled { opacity:.55; cursor:not-allowed; }

        .af-spin {
          width:14px; height:14px;
          border:2px solid rgba(255,255,255,0.3);
          border-top-color:#fff; border-radius:50%;
          animation:spin .7s linear infinite;
          display:inline-block; flex-shrink:0;
        }
        @keyframes spin { to{transform:rotate(360deg)} }

        /* Trust badges */
        .af-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 600; color: #a8a29e;
          letter-spacing: 0.02em;
        }

        @media (max-width: 600px) {
          .af-root { padding: 20px 14px; min-height: calc(100vh - 102px); }
          .af-card { padding: 28px 20px; border-radius: 20px; }
          .af-card::before { left: 24px; right: 24px; }
          .af-deco-3 { display: none; }
        }
      `}</style>

      <div className="af-root">
        {/* Decorative bg elements */}
        <div className="af-deco af-deco-1"/>
        <div className="af-deco af-deco-2"/>
        <div className="af-deco af-deco-3"/>

        <div className={`af-card ${mounted ? "show" : ""}`}>

          {/* Logo + Back */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
            <Link to="/" style={{ textDecoration:"none" }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"#1c1917", letterSpacing:"-0.02em" }}>
                Gr<span style={{ color:"#f97316" }}>O</span>cify
                <sup style={{ fontSize:"8px", fontFamily:"'DM Sans',sans-serif", fontWeight:700, letterSpacing:"0.14em", color:"#a8a29e", marginLeft:2 }}>FRESH</sup>
              </span>
            </Link>
            <Link to="/"
              style={{ fontSize:12, color:"#a8a29e", textDecoration:"none", fontWeight:500, display:"flex", alignItems:"center", gap:5, padding:"6px 12px", borderRadius:99, border:"1px solid #ede9e6", background:"#faf9f7", transition:"all .2s" }}
              onMouseOver={e=>{ e.currentTarget.style.color="#f97316"; e.currentTarget.style.borderColor="#fed7aa"; }}
              onMouseOut={e=>{ e.currentTarget.style.color="#a8a29e"; e.currentTarget.style.borderColor="#ede9e6"; }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Home
            </Link>
          </div>

          {/* Tabs */}
          <div className="af-tabs">
            <button className={`af-tab ${mode==="login"    ? "af-tab-on":"af-tab-off"}`} onClick={()=>switchTo("login")}>Sign In</button>
            <button className={`af-tab ${mode==="register" ? "af-tab-on":"af-tab-off"}`} onClick={()=>switchTo("register")}>Create Account</button>
          </div>

          {/* Form */}
          <div className="af-form-wrap">
            <div className={exiting ? `af-exit-${exitDir}` : "af-slide-in"}>
              {mode === "login"
                ? <LoginForm    onSwitch={()=>switchTo("register")}/>
                : <RegisterForm onSwitch={()=>switchTo("login")}/>
              }
            </div>
          </div>

          {/* Trust row */}
          <div style={{ display:"flex", justifyContent:"center", gap:20, marginTop:22, paddingTop:18, borderTop:"1px solid #f5f3f0", flexWrap:"wrap" }}>
            <span className="af-badge"><LeafIcon/> 100% Organic</span>
            <span className="af-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Secure & Private
            </span>
            <span className="af-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              10k+ Members
            </span>
          </div>

        </div>
      </div>
    </>
  );
};

export default AuthPage;