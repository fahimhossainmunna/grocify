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

/* ── Field ────────────────────────────────────────────────── */
const Field = ({ label, icon, type="text", value, onChange, error, placeholder, rightEl }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
    <label style={{ fontSize:11, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color: error ? "#ef4444" : "#a3a3a3" }}>
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
          border:`1.5px solid ${error ? "#fca5a5" : "#e5e7eb"}`,
          borderRadius:10, padding:"11px 40px 11px 42px",
          fontSize:14, fontWeight:500, color:"#18181b",
          outline:"none", fontFamily:"'DM Sans',sans-serif",
          background:"#fafafa", transition:"border-color .2s, box-shadow .2s",
        }}
        onFocus={e => { e.target.style.borderColor="#f97316"; e.target.style.background="#fff"; e.target.style.boxShadow="0 0 0 3px rgba(249,115,22,0.08)"; }}
        onBlur={e  => { e.target.style.borderColor=error?"#fca5a5":"#e5e7eb"; e.target.style.background="#fafafa"; e.target.style.boxShadow="none"; }}
      />
      {rightEl && (
        <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", display:"flex" }}>
          {rightEl}
        </span>
      )}
    </div>
    {error && <span style={{ fontSize:11, color:"#ef4444", fontWeight:500 }}>{error}</span>}
  </div>
);

/* ── Login Form ───────────────────────────────────────────── */
const LoginForm = ({ onSwitch }) => {
  const { form, setField, errors, apiErr, showPw, setShowPw, isLoading, handleSubmit } = useLogin();
  return (
    <div className="af-slide-in">
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:"#18181b", margin:"0 0 4px", letterSpacing:"-0.02em" }}>
          Welcome back
        </h2>
        <p style={{ fontSize:13, color:"#a3a3a3", margin:0 }}>Sign in to your Grocify account</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <Field label="Email" icon={<MailIcon/>} type="email"
          value={form.email} onChange={e=>setField("email",e.target.value)}
          error={errors.email} placeholder="john@example.com"/>
        <Field label="Password" icon={<LockIcon/>} type={showPw?"text":"password"}
          value={form.password} onChange={e=>setField("password",e.target.value)}
          error={errors.password} placeholder="Enter your password"
          rightEl={
            <button onClick={()=>setShowPw(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", color:"#d1d5db", padding:2, display:"flex", transition:"color .2s" }}
              onMouseOver={e=>e.currentTarget.style.color="#f97316"} onMouseOut={e=>e.currentTarget.style.color="#d1d5db"}>
              <EyeIcon open={showPw}/>
            </button>
          }/>
      </div>

      <div style={{ textAlign:"right", marginTop:8 }}>
        <a href="#" style={{ fontSize:12, fontWeight:600, color:"#f97316", textDecoration:"none" }}>Forgot password?</a>
      </div>

      {apiErr && (
        <div style={{ background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#ef4444", marginTop:8 }}>
          ⚠️ {apiErr}
        </div>
      )}

      <button className="af-btn" onClick={handleSubmit} disabled={isLoading} style={{ marginTop:20 }}>
        {isLoading ? <><span className="af-spin"/>Signing in...</> : "Sign In →"}
      </button>

      <p style={{ textAlign:"center", marginTop:16, fontSize:13, color:"#a3a3a3", margin:"16px 0 0" }}>
        Don't have an account?{" "}
        <button onClick={onSwitch} style={{ background:"none", border:"none", cursor:"pointer", color:"#f97316", fontWeight:700, fontSize:13, fontFamily:"'DM Sans',sans-serif", padding:0 }}>
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
      <div style={{ marginBottom:20 }}>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:"#18181b", margin:"0 0 4px", letterSpacing:"-0.02em" }}>
          Create account
        </h2>
        <p style={{ fontSize:13, color:"#a3a3a3", margin:0 }}>Join 10,000+ happy Grocify customers</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
        <Field label="Full Name" icon={<UserIcon/>}
          value={form.name} onChange={e=>setField("name",e.target.value)}
          error={errors.name} placeholder="John Doe"/>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:11 }}>
          <Field label="Email" icon={<MailIcon/>} type="email"
            value={form.email} onChange={e=>setField("email",e.target.value)}
            error={errors.email} placeholder="john@example.com"/>
          <Field label="Phone" icon={<PhoneIcon/>} type="tel"
            value={form.phone} onChange={e=>setField("phone",e.target.value)}
            error={errors.phone} placeholder="01XXXXXXXXX"/>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:11 }}>
          <Field label="Password" icon={<LockIcon/>} type={showPw?"text":"password"}
            value={form.password} onChange={e=>setField("password",e.target.value)}
            error={errors.password} placeholder="Min. 6 chars"
            rightEl={
              <button onClick={()=>setShowPw(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", color:"#d1d5db", padding:2, display:"flex", transition:"color .2s" }}
                onMouseOver={e=>e.currentTarget.style.color="#f97316"} onMouseOut={e=>e.currentTarget.style.color="#d1d5db"}>
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
              <div key={i} style={{ flex:1, height:3, borderRadius:999, background:i<=str.level?strColor[str.level]:"#e5e7eb", transition:"background .3s" }}/>
            ))}
            <span style={{ fontSize:11, color:"#a3a3a3", fontWeight:600, marginLeft:6, whiteSpace:"nowrap" }}>{str.label}</span>
          </div>
        )}

        {/* Terms */}
        <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
          <div onClick={()=>setAgreed(v=>!v)}
            style={{ width:17, height:17, borderRadius:5, border:`1.5px solid ${errors.agree?"#fca5a5":agreed?"#f97316":"#d1d5db"}`, background:agreed?"#f97316":"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s", cursor:"pointer" }}>
            {agreed && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
          </div>
          <span style={{ fontSize:12, color:"#6b7280" }}>
            I agree to{" "}<a href="#" style={{ color:"#f97316", textDecoration:"none", fontWeight:600 }}>Terms</a>{" "}&amp;{" "}<a href="#" style={{ color:"#f97316", textDecoration:"none", fontWeight:600 }}>Privacy</a>
          </span>
        </label>
        {errors.agree && <span style={{ fontSize:11, color:"#ef4444", marginTop:-4 }}>{errors.agree}</span>}
      </div>

      {apiErr && (
        <div style={{ background:"#fef2f2", border:"1.5px solid #fecaca", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#ef4444", marginTop:10 }}>
          ⚠️ {apiErr}
        </div>
      )}

      <button className="af-btn" onClick={handleSubmit} disabled={isLoading} style={{ marginTop:18 }}>
        {isLoading ? <><span className="af-spin"/>Creating account...</> : "Create Account →"}
      </button>

      <p style={{ textAlign:"center", marginTop:14, fontSize:13, color:"#a3a3a3", margin:"14px 0 0" }}>
        Already have an account?{" "}
        <button onClick={onSwitch} style={{ background:"none", border:"none", cursor:"pointer", color:"#f97316", fontWeight:700, fontSize:13, fontFamily:"'DM Sans',sans-serif", padding:0 }}>
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
    setTimeout(() => {
      setMode(next);
      setExiting(false);
      setExitDir("");
    }, 260);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .af-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f4;
          padding: 32px 20px;
        }

        .af-card {
          width: 100%;
          max-width: 580px;
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #e7e5e4;
          padding: 40px 44px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .5s ease, transform .5s cubic-bezier(.34,1.3,.64,1);
        }
        .af-card.show { opacity:1; transform:translateY(0); }

        /* Top orange bar */
        .af-top-bar {
          height: 3px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          border-radius: 20px 20px 0 0;
          margin: -40px -44px 32px;
        }

        /* Tabs */
        .af-tabs {
          display: flex;
          background: #f5f5f4;
          border-radius: 10px;
          padding: 4px;
          gap: 3px;
          margin-bottom: 28px;
        }
        .af-tab {
          flex: 1; padding: 9px;
          border: none; border-radius: 7px;
          font-size: 13px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all .25s ease;
        }
        .af-tab-on  { background: #fff; color: #18181b; box-shadow: 0 1px 4px rgba(0,0,0,0.10); }
        .af-tab-off { background: transparent; color: #a3a3a3; }
        .af-tab-off:hover { color: #71717a; }

        /* Form transition */
        .af-form-wrap { overflow: hidden; }
        .af-slide-in  { animation: slideIn .26s cubic-bezier(.4,0,.2,1) both; }
        .af-exit-left  { animation: exitLeft  .26s cubic-bezier(.4,0,.2,1) both; }
        .af-exit-right { animation: exitRight .26s cubic-bezier(.4,0,.2,1) both; }
        @keyframes slideIn    { from{opacity:0; transform:translateX(16px)} to{opacity:1; transform:translateX(0)} }
        @keyframes exitLeft   { from{opacity:1; transform:translateX(0)} to{opacity:0; transform:translateX(-16px)} }
        @keyframes exitRight  { from{opacity:1; transform:translateX(0)} to{opacity:0; transform:translateX(16px)} }

        /* Button */
        .af-btn {
          width: 100%; display:flex; align-items:center; justify-content:center; gap:8px;
          background: #f97316; color: #fff; border: none;
          border-radius: 10px; padding: 13px;
          font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background .2s, transform .2s, box-shadow .2s;
          box-shadow: 0 4px 16px rgba(249,115,22,0.28);
        }
        .af-btn:hover:not(:disabled) { background:#ea580c; transform:translateY(-1px); box-shadow:0 8px 24px rgba(249,115,22,0.36); }
        .af-btn:active:not(:disabled){ transform:translateY(0); }
        .af-btn:disabled { opacity:.6; cursor:not-allowed; }

        .af-spin {
          width:14px; height:14px;
          border:2px solid rgba(255,255,255,0.3);
          border-top-color:#fff; border-radius:50%;
          animation:spin .7s linear infinite;
          display:inline-block; flex-shrink:0;
        }
        @keyframes spin { to{transform:rotate(360deg)} }

        @media (max-width:600px) {
          .af-card { padding:32px 22px; }
          .af-top-bar { margin:-32px -22px 28px; }
        }
      `}</style>

      <div className="af-root">
        <div className={`af-card ${mounted ? "show" : ""}`}>

          {/* Orange top bar */}
         

          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
            <Link to="/" style={{ textDecoration:"none" }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"#18181b", letterSpacing:"-0.02em" }}>
                Gr<span style={{ color:"#f97316" }}>O</span>cify
                <sup style={{ fontSize:"8px", fontFamily:"'DM Sans',sans-serif", fontWeight:700, letterSpacing:"0.14em", color:"#a3a3a3", marginLeft:2 }}>FRESH</sup>
              </span>
            </Link>
            <Link to="/" style={{ fontSize:12, color:"#a3a3a3", textDecoration:"none", fontWeight:500, display:"flex", alignItems:"center", gap:4, transition:"color .2s" }}
              onMouseOver={e=>e.currentTarget.style.color="#f97316"} onMouseOut={e=>e.currentTarget.style.color="#a3a3a3"}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to home
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

        </div>
      </div>
    </>
  );
};

export default AuthPage;