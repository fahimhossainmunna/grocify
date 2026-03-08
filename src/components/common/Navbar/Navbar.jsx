import { useNavigate } from "react-router-dom";
import useNavbar from "../../../hooks/useNavbar";
import { useCart } from "../../../store/CartContext";

const navLinks = [
  { name: "Home",       link: "/"        },
  { name: "About Us",   link: "/about"   },
  { name: "Process",    link: "/process" },
  { name: "Contact Us", link: "/contact" },
];

/* ── Icons ────────────────────────────────────────────────── */
const HeartIcon = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24"
    fill={filled ? "#f97316" : "none"} stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const BagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="15" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Navbar ───────────────────────────────────────────────── */
const Navbar = () => {
  const navigate = useNavigate();

  /* UI state from hook */
  const {
    showMenu, scrolled, searchOpen, searchRef,
    openMenu, closeMenu, toggleSearch, closeSearch,
  } = useNavbar();

  /* Global cart + wishlist from context */
  const {
    cartItems, cartCount, cartTotal,
    addToCart, removeFromCart, updateQty, clearCart,
    wishlist, toggleWishlist,
    showCart, setShowCart,
  } = useCart();

  const wishlistActive = wishlist.length > 0;
  const fmt = (n) => `$${Number(n).toFixed(2)}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .gr-root { font-family: 'DM Sans', sans-serif; }
        .gr-logo { font-family: 'Cormorant Garamond', serif; font-weight: 700; letter-spacing: -0.03em; }
        .gr-link { position: relative; text-decoration: none; }
        .gr-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1.5px; background: #f97316; transition: width 0.35s cubic-bezier(.4,0,.2,1); }
        .gr-link:hover::after { width: 100%; }
        .gr-link:hover { color: #f97316 !important; }
        .gr-icon-btn { display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 50%; background: transparent; border: none; cursor: pointer; color: #27272a; transition: background .2s, color .2s, transform .2s; }
        .gr-icon-btn:hover { background: #fff7ed; color: #f97316; transform: scale(1.08); }
        .gr-drawer-link { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; text-decoration: none; color: #18181b; font-size: 22px; font-family: 'Cormorant Garamond', serif; font-weight: 700; border-bottom: 1px solid #f4f4f5; transition: color .2s, transform .25s; cursor: pointer; }
        .gr-drawer-link:hover { color: #f97316; transform: translateX(6px); }
        .gr-drawer-link:hover .gr-arrow { opacity: 0.8; }
        .gr-arrow { opacity: 0.25; transition: opacity .2s; }
        .gr-search-wrap { overflow: hidden; max-width: 0; opacity: 0; transition: max-width .4s cubic-bezier(.4,0,.2,1), opacity .3s ease; }
        .gr-search-wrap.open { max-width: 220px; opacity: 1; }
        .gr-nav-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.38); backdrop-filter: blur(5px); z-index: 105; transition: opacity .4s ease, visibility .4s ease; opacity: 0; visibility: hidden; pointer-events: none; }
        .gr-nav-overlay.open { opacity: 1; visibility: visible; pointer-events: auto; }
        .gr-nav-drawer { position: fixed; top: 0; right: 0; height: 100vh; width: 340px; background: #fafafa; z-index: 110; box-shadow: -8px 0 48px rgba(0,0,0,0.13); transform: translateX(100%); transition: transform .45s cubic-bezier(.4,0,.2,1); display: flex; flex-direction: column; }
        .gr-nav-drawer.open { transform: translateX(0); }
        .gr-marquee { display: flex; gap: 48px; animation: grMarquee 20s linear infinite; white-space: nowrap; }
        @keyframes grMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        /* Cart Drawer */
        .gr-cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); backdrop-filter: blur(4px); z-index: 190; opacity: 0; visibility: hidden; transition: all .3s; }
        .gr-cart-overlay.open { opacity: 1; visibility: visible; }
        .gr-cart-drawer { position: fixed; top: 0; right: 0; height: 100vh; width: 400px; background: #fff; z-index: 200; box-shadow: -8px 0 48px rgba(0,0,0,0.13); transform: translateX(100%); transition: transform .45s cubic-bezier(.4,0,.2,1); display: flex; flex-direction: column; font-family: 'DM Sans',sans-serif; }
        .gr-cart-drawer.open { transform: translateX(0); }
        .gr-cart-item { display: flex; align-items: center; gap: 14px; background: #fafafa; border-radius: 14px; padding: 12px 14px; border: 1px solid #f4f4f5; }
        @media (min-width: 1024px) { .gr-desktop-nav { display: flex !important; } .gr-hamburger { display: none !important; } }
        @media (max-width: 767px)  { .gr-desktop-search { display: none !important; } }
        @media (max-width: 480px)  { .gr-nav-drawer { width: 100vw; } .gr-cart-drawer { width: 100vw; } }
      `}</style>

      {/* ── Announcement Bar ───────────────────────────────── */}
      <div style={{ background:"#18181b", height:"34px", display:"flex", alignItems:"center", overflow:"hidden" }}>
        <div className="gr-marquee gr-root" style={{ fontSize:"11px", fontWeight:500, letterSpacing:"0.06em", color:"#a1a1aa" }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:"48px" }}>
              <span>🌿 &nbsp;Free delivery on orders over $99</span>
              <span style={{ color:"#f97316", fontSize:"7px" }}>◆</span>
              <span>✦ &nbsp;Fresh organic produce daily</span>
              <span style={{ color:"#f97316", fontSize:"7px" }}>◆</span>
              <span>🎁 &nbsp;Use code GROCIFY10 for 10% off</span>
              <span style={{ color:"#f97316", fontSize:"7px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Header ────────────────────────────────────────── */}
      <header className="gr-root" style={{
        position:"sticky", top:0, zIndex:50,
        background:"rgba(255,255,255,0.97)",
        borderBottom:"1px solid #f4f4f5",
        backdropFilter:"blur(12px)",
        boxShadow: scrolled ? "0 2px 28px rgba(0,0,0,0.08)" : "none",
        transition:"box-shadow .3s ease",
      }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:"68px" }}>

            {/* Logo */}
            <a href="/" className="gr-logo" style={{ fontSize:"28px", color:"#18181b", textDecoration:"none", lineHeight:1, display:"flex", alignItems:"baseline", gap:"4px" }}>
              Gr<span style={{ color:"#f97316" }}>O</span>cify
              <sup style={{ fontSize:"9px", fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:"0.12em", color:"#a3a3a3", marginLeft:"2px" }}>FRESH</sup>
            </a>

            {/* Desktop Nav */}
            <nav className="gr-desktop-nav" style={{ display:"none" }}>
              <ul style={{ display:"flex", gap:"36px", listStyle:"none", margin:0, padding:0 }}>
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <a href={item.link} className="gr-link" style={{ fontSize:"12px", fontWeight:600, color:"#27272a", letterSpacing:"0.08em", textTransform:"uppercase" }}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div style={{ display:"flex", alignItems:"center", gap:"2px" }}>

              {/* Search (desktop) */}
              <div className="gr-desktop-search" style={{ display:"flex", alignItems:"center" }}>
                <div className={`gr-search-wrap ${searchOpen ? "open" : ""}`}>
                  <input ref={searchRef} type="text" placeholder="Search products..." onBlur={closeSearch}
                    style={{ width:"100%", border:"none", borderBottom:"1.5px solid #f97316", background:"transparent", padding:"4px 8px", fontSize:"13px", outline:"none", color:"#18181b", fontFamily:"'DM Sans',sans-serif" }}/>
                </div>
                <button className="gr-icon-btn" onClick={toggleSearch} aria-label="Search"><SearchIcon /></button>
              </div>

              {/* Wishlist */}
              <button className="gr-icon-btn" onClick={() => toggleWishlist("__nav__")} aria-label="Wishlist"
                style={{ color: wishlistActive ? "#f97316" : "#27272a" }}>
                <HeartIcon filled={wishlistActive} />
              </button>

              {/* Cart */}
              <button className="gr-icon-btn" onClick={() => setShowCart(true)} aria-label="Cart" style={{ position:"relative" }}>
                <BagIcon />
                {cartCount > 0 && (
                  <span style={{ position:"absolute", top:"6px", right:"5px", background:"#f97316", color:"#fff", fontSize:"9px", fontWeight:700, width:"16px", height:"16px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #fff" }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button className="gr-icon-btn gr-hamburger" onClick={openMenu} aria-label="Open menu"><MenuIcon /></button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Nav Drawer Overlay ─────────────────────────────── */}
      <div className={`gr-nav-overlay ${showMenu ? "open" : ""}`} onClick={closeMenu}/>

      {/* ── Nav Drawer ────────────────────────────────────── */}
      <aside className={`gr-nav-drawer gr-root ${showMenu ? "open" : ""}`}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"22px 28px 18px", borderBottom:"1px solid #f4f4f5" }}>
          <span className="gr-logo" style={{ fontSize:"24px", color:"#18181b" }}>
            Gr<span style={{ color:"#f97316" }}>O</span>cify
            <sup style={{ fontSize:"9px", fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:"0.12em", color:"#a3a3a3", marginLeft:"3px" }}>FRESH</sup>
          </span>
          <button onClick={closeMenu} style={{ background:"none", border:"none", cursor:"pointer", color:"#71717a", padding:"6px", borderRadius:"8px", lineHeight:0, transition:"color .2s" }}
            onMouseOver={e => e.currentTarget.style.color="#f97316"}
            onMouseOut={e => e.currentTarget.style.color="#71717a"}>
            <CloseIcon />
          </button>
        </div>

        <div style={{ padding:"20px 28px 0" }}>
          <div style={{ display:"flex", alignItems:"center", background:"#f9f9f9", border:"1.5px solid #e5e5e5", borderRadius:"12px", padding:"0 14px" }}>
            <SearchIcon />
            <input type="text" placeholder="Search fresh products..."
              style={{ flex:1, border:"none", background:"transparent", padding:"12px 10px", fontSize:"13px", outline:"none", color:"#18181b", fontFamily:"'DM Sans',sans-serif" }}/>
          </div>
        </div>

        <div style={{ padding:"24px 28px 0", flex:1, overflowY:"auto" }}>
          <p style={{ fontSize:"10px", fontWeight:700, color:"#a3a3a3", letterSpacing:"0.14em", textTransform:"uppercase", margin:"0 0 16px", paddingBottom:"10px", borderBottom:"1px solid #f4f4f5" }}>
            Navigation
          </p>
          <ul style={{ listStyle:"none", margin:0, padding:0 }}>
            {navLinks.map((item) => (
              <li key={item.name}>
                <div className="gr-drawer-link" onClick={() => { navigate(item.link); closeMenu(); }}>
                  {item.name}
                  <span className="gr-arrow"><ArrowIcon /></span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ padding:"20px 28px", display:"flex", gap:"10px" }}>
          <button style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"12px", borderRadius:"12px", background:"#fff7ed", border:"1.5px solid #fed7aa", color:"#ea580c", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .2s" }}
            onMouseOver={e => e.currentTarget.style.background="#ffedd5"}
            onMouseOut={e => e.currentTarget.style.background="#fff7ed"}>
            <HeartIcon /> Wishlist
          </button>
          <button onClick={() => { closeMenu(); setShowCart(true); }}
            style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"12px", borderRadius:"12px", background:"#f97316", border:"none", color:"#fff", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .2s" }}
            onMouseOver={e => e.currentTarget.style.background="#ea580c"}
            onMouseOut={e => e.currentTarget.style.background="#f97316"}>
            <BagIcon /> Cart
            {cartCount > 0 && (
              <span style={{ background:"#fff", color:"#f97316", borderRadius:"999px", fontSize:"10px", fontWeight:700, padding:"1px 7px" }}>{cartCount}</span>
            )}
          </button>
        </div>

        <div style={{ padding:"14px 28px 28px", borderTop:"1px solid #f4f4f5" }}>
          <div style={{ display:"flex", gap:"20px", marginBottom:"10px" }}>
            {["FB","IG","TW","LI"].map(s => (
              <a key={s} href="#" style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.08em", color:"#71717a", textDecoration:"none", transition:"color .2s" }}
                onMouseOver={e => e.currentTarget.style.color="#f97316"}
                onMouseOut={e => e.currentTarget.style.color="#71717a"}>{s}</a>
            ))}
          </div>
          <p style={{ fontSize:"10px", color:"#a3a3a3", margin:0, fontStyle:"italic" }}>© 2026 Grocify — Premium Fresh Produce</p>
        </div>
      </aside>

      {/* ── Cart Overlay ───────────────────────────────────── */}
      <div className={`gr-cart-overlay ${showCart ? "open" : ""}`} onClick={() => setShowCart(false)}/>

      {/* ── Cart Drawer ────────────────────────────────────── */}
      <aside className={`gr-cart-drawer ${showCart ? "open" : ""}`}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"22px 24px", borderBottom:"1px solid #f4f4f5" }}>
          <div>
            <h2 style={{ margin:0, fontSize:20, fontWeight:800, color:"#18181b" }}>My Cart</h2>
            <p style={{ margin:0, fontSize:12, color:"#a3a3a3", marginTop:2 }}>{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => setShowCart(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#71717a", padding:6, borderRadius:8, lineHeight:0, transition:"color .2s" }}
            onMouseOver={e => e.currentTarget.style.color="#f97316"}
            onMouseOut={e => e.currentTarget.style.color="#71717a"}>
            <CloseIcon />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 0", color:"#a3a3a3" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🛒</div>
              <div style={{ fontWeight:600, fontSize:15 }}>Your cart is empty</div>
              <div style={{ fontSize:12, marginTop:6 }}>Add some fresh products!</div>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {cartItems.map(item => (
                <div key={item.id} className="gr-cart-item">
                  <img src={item.img} alt={item.name} style={{ width:52, height:52, objectFit:"contain", background:"#fff7ed", borderRadius:10, padding:4 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:"#18181b" }}>{item.name}</div>
                    <div style={{ fontSize:12, color:"#a3a3a3", marginTop:2 }}>{fmt(item.price)} × {item.qty}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)}
                      style={{ width:26, height:26, border:"1.5px solid #e5e5e5", background:"#fff", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:700, color:"#18181b", display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                    <span style={{ fontSize:13, fontWeight:700, minWidth:18, textAlign:"center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}
                      style={{ width:26, height:26, border:"1.5px solid #e5e5e5", background:"#fff", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:700, color:"#18181b", display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#d4d4d4", padding:4, lineHeight:0, transition:"color .2s" }}
                    onMouseOver={e => e.currentTarget.style.color="#ef4444"}
                    onMouseOut={e => e.currentTarget.style.color="#d4d4d4"}>
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding:"20px 24px 28px", borderTop:"1px solid #f4f4f5" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <span style={{ fontSize:13, color:"#71717a", fontWeight:500 }}>Subtotal</span>
              <span style={{ fontSize:20, fontWeight:800, color:"#18181b" }}>{fmt(cartTotal)}</span>
            </div>
            <button style={{ width:"100%", background:"#f97316", color:"#fff", border:"none", borderRadius:14, padding:"15px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .2s", marginBottom:10 }}
              onMouseOver={e => e.currentTarget.style.background="#ea580c"}
              onMouseOut={e => e.currentTarget.style.background="#f97316"}>
              Checkout → {fmt(cartTotal)}
            </button>
            <button onClick={clearCart} style={{ width:"100%", background:"transparent", color:"#a3a3a3", border:"1.5px solid #e5e5e5", borderRadius:14, padding:"12px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all .2s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor="#ef4444"; e.currentTarget.style.color="#ef4444"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor="#e5e5e5"; e.currentTarget.style.color="#a3a3a3"; }}>
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;