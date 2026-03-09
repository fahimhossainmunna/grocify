import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  addToCart,
  toggleWishlist,
  clearWishlist,
  selectWishlist,
  selectCartItems,
} from "../../store/slices/cartSlice";

/* ─── Product Data ────────────────────────────────────────── */
import bananaImg        from "../../assets/banana.png";
import beefImg          from "../../assets/beef.png";
import broccoliImg      from "../../assets/broccoli.png";
import butterImg        from "../../assets/butter.png";
import cabbageImg       from "../../assets/cabbage.png";
import capsicumImg      from "../../assets/capsicum.png";
import cheeseImg        from "../../assets/cheese.png";
import chickenImg       from "../../assets/chicken-breast.png";
import condensedMilkImg from "../../assets/condensed-milk.png";
import eggplantImg      from "../../assets/eggplant.png";
import eggsImg          from "../../assets/eggs.png";
import freshFruitsImg   from "../../assets/fresh-fruits.png";
import fruitsVeggiesImg from "../../assets/fruits-and-veggies.png";
import grapesImg        from "../../assets/grapes.png";
import kaleImg          from "../../assets/kale.png";
import kiwiImg          from "../../assets/kiwi.png";
import lettuceImg       from "../../assets/lettuce.png";
import milkImg          from "../../assets/milk.png";
import pineappleImg     from "../../assets/pineapple.png";
import ricottaImg       from "../../assets/ricotta-cheese.png";
import salmonImg        from "../../assets/salmon.png";
import shrimpImg        from "../../assets/shrimp.png";
import sliceCheeseImg   from "../../assets/slice-cheese.png";
import strawberryImg    from "../../assets/strawberry.png";
import tilapiaImg       from "../../assets/tilapia.png";
import tofuImg          from "../../assets/tofu.png";
import yogurtImg        from "../../assets/yogurt.png";
import meatSeafoodImg   from "../../assets/meat-and-seafood.png";

const ALL_PRODUCTS = [
  { id:1,  name:"Organic Banana",       category:"Fruits",  price:0.75, old:1.05, img:bananaImg,        rating:4.8, reviews:124, badge:"Best Seller", unit:"kg"   },
  { id:2,  name:"Fresh Broccoli",       category:"Veggies", price:1.10, old:1.45, img:broccoliImg,      rating:4.6, reviews:89,  badge:"Organic",     unit:"pc"   },
  { id:3,  name:"Green Cabbage",        category:"Veggies", price:0.55, old:0.75, img:cabbageImg,       rating:4.5, reviews:67,  badge:null,          unit:"pc"   },
  { id:4,  name:"Red Capsicum",         category:"Veggies", price:0.85, old:1.15, img:capsicumImg,      rating:4.7, reviews:102, badge:"Fresh",       unit:"kg"   },
  { id:5,  name:"Purple Eggplant",      category:"Veggies", price:0.70, old:0.90, img:eggplantImg,      rating:4.4, reviews:54,  badge:null,          unit:"pc"   },
  { id:6,  name:"Farm Eggs",            category:"Dairy",   price:1.30, old:1.55, img:eggsImg,          rating:4.9, reviews:203, badge:"Farm Fresh",  unit:"dz"   },
  { id:7,  name:"Black Grapes",         category:"Fruits",  price:1.90, old:2.50, img:grapesImg,        rating:4.7, reviews:91,  badge:"Premium",     unit:"kg"   },
  { id:8,  name:"Fresh Kale",           category:"Veggies", price:0.90, old:1.15, img:kaleImg,          rating:4.5, reviews:48,  badge:"Organic",     unit:"bunch"},
  { id:9,  name:"Green Kiwi",           category:"Fruits",  price:1.70, old:2.10, img:kiwiImg,          rating:4.6, reviews:76,  badge:null,          unit:"kg"   },
  { id:10, name:"Iceberg Lettuce",      category:"Veggies", price:0.50, old:0.65, img:lettuceImg,       rating:4.3, reviews:39,  badge:null,          unit:"pc"   },
  { id:11, name:"Mixed Fresh Fruits",   category:"Fruits",  price:3.30, old:4.30, img:freshFruitsImg,   rating:4.8, reviews:156, badge:"Value Pack",  unit:"pack" },
  { id:12, name:"Pure Butter",          category:"Dairy",   price:1.15, old:1.35, img:butterImg,        rating:4.7, reviews:88,  badge:null,          unit:"250g" },
  { id:13, name:"Cheddar Cheese",       category:"Dairy",   price:1.55, old:1.95, img:cheeseImg,        rating:4.6, reviews:73,  badge:"Imported",    unit:"200g" },
  { id:14, name:"Chicken Breast",       category:"Meat",    price:2.70, old:3.30, img:chickenImg,       rating:4.8, reviews:167, badge:"Fresh",       unit:"kg"   },
  { id:15, name:"Condensed Milk",       category:"Dairy",   price:0.85, old:1.05, img:condensedMilkImg, rating:4.5, reviews:55,  badge:null,          unit:"tin"  },
  { id:16, name:"Fruits & Veggies Mix", category:"Fruits",  price:3.05, old:3.85, img:fruitsVeggiesImg, rating:4.7, reviews:112, badge:"Combo",       unit:"pack" },
  { id:17, name:"Fresh Milk",           category:"Dairy",   price:0.65, old:0.80, img:milkImg,          rating:4.8, reviews:189, badge:"Daily Fresh", unit:"ltr"  },
  { id:18, name:"Sweet Pineapple",      category:"Fruits",  price:1.45, old:1.85, img:pineappleImg,     rating:4.6, reviews:64,  badge:null,          unit:"pc"   },
  { id:19, name:"Ricotta Cheese",       category:"Dairy",   price:2.10, old:2.60, img:ricottaImg,       rating:4.5, reviews:41,  badge:"Imported",    unit:"250g" },
  { id:20, name:"Atlantic Salmon",      category:"Meat",    price:4.60, old:5.60, img:salmonImg,        rating:4.9, reviews:134, badge:"Premium",     unit:"kg"   },
  { id:21, name:"Tiger Shrimp",         category:"Meat",    price:3.45, old:4.25, img:shrimpImg,        rating:4.7, reviews:98,  badge:"Fresh",       unit:"kg"   },
  { id:22, name:"Slice Cheese",         category:"Dairy",   price:1.25, old:1.55, img:sliceCheeseImg,   rating:4.4, reviews:62,  badge:null,          unit:"pack" },
  { id:23, name:"Strawberry",           category:"Fruits",  price:2.30, old:2.90, img:strawberryImg,    rating:4.9, reviews:178, badge:"Seasonal",    unit:"250g" },
  { id:24, name:"Tilapia Fish",         category:"Meat",    price:1.90, old:2.40, img:tilapiaImg,       rating:4.5, reviews:59,  badge:null,          unit:"kg"   },
  { id:25, name:"Organic Tofu",         category:"Veggies", price:1.05, old:1.35, img:tofuImg,          rating:4.6, reviews:83,  badge:"Vegan",       unit:"pack" },
  { id:26, name:"Greek Yogurt",         category:"Dairy",   price:1.45, old:1.75, img:yogurtImg,        rating:4.7, reviews:107, badge:null,          unit:"200g" },
  { id:27, name:"Beef Steak",           category:"Meat",    price:5.00, old:6.15, img:beefImg,          rating:4.8, reviews:145, badge:"Premium",     unit:"kg"   },
  { id:28, name:"Meat & Seafood Pack",  category:"Meat",    price:6.25, old:7.70, img:meatSeafoodImg,   rating:4.7, reviews:92,  badge:"Combo",       unit:"pack" },
];

const fmt = (n) => `$${Number(n).toFixed(2)}`;

const Stars = ({ rating }) => (
  <div style={{ display:"flex", gap:2 }}>
    {[1,2,3,4,5].map(s => (
      <svg key={s} width="12" height="12" viewBox="0 0 24 24"
        fill={s <= Math.round(rating) ? "#f97316" : "#e5e7eb"} stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

/* ─── Wishlist Card ───────────────────────────────────────── */
const WishCard = ({ product, index }) => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const isInCart  = cartItems.some(i => i.id === product.id);
  const [removing, setRemoving] = useState(false);
  const [added,    setAdded]    = useState(false);
  const discount  = Math.round(((product.old - product.price) / product.old) * 100);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => dispatch(toggleWishlist(product.id)), 350);
  };

  const handleAdd = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className={`wl-card ${removing ? "wl-removing" : "wl-enter"}`}
      style={{ animationDelay: `${index * 0.06}s` }}>

      {/* Image */}
      <div className="wl-img-wrap" onClick={() => navigate(`/product/${product.id}`)}>
        {discount > 0 && (
          <div style={{ position:"absolute", top:10, left:10, zIndex:2, background:"#f97316", color:"#fff", fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:999 }}>
            -{discount}%
          </div>
        )}
        <img src={product.img} alt={product.name} className="wl-img"/>
      </div>

      {/* Info */}
      <div style={{ padding:"16px 18px 18px", display:"flex", flexDirection:"column", flex:1 }}>
        <div style={{ marginBottom:"auto" }}>
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"#a3a3a3", marginBottom:4, display:"block" }}>
            {product.category}
          </span>
          <div className="wl-name" onClick={() => navigate(`/product/${product.id}`)}>
            {product.name}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:5, marginBottom:12 }}>
            <Stars rating={product.rating}/>
            <span style={{ fontSize:11, color:"#a3a3a3" }}>({product.reviews})</span>
          </div>
        </div>

        {/* Price */}
        <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:14 }}>
          <span style={{ fontSize:20, fontWeight:900, color:"#18181b", letterSpacing:"-0.02em" }}>{fmt(product.price)}</span>
          <span style={{ fontSize:13, color:"#d4d4d4", textDecoration:"line-through" }}>{fmt(product.old)}</span>
          <span style={{ fontSize:11, color:"#a3a3a3" }}>/{product.unit}</span>
        </div>

        {/* Actions */}
        <div style={{ display:"flex", gap:8 }}>
          <button className={`wl-cart-btn ${added ? "wl-added" : ""} ${isInCart && !added ? "wl-already" : ""}`}
            onClick={handleAdd}>
            {added
              ? <><CheckIcon/> Added!</>
              : isInCart
                ? <><CheckIcon/> In Cart</>
                : <><CartIcon/> Add to Cart</>
            }
          </button>
          <button className="wl-remove-btn" onClick={handleRemove} title="Remove from wishlist">
            <TrashIcon/>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Icons ───────────────────────────────────────────────── */
const CartIcon  = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>);
const CheckIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>);
const TrashIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>);
const HeartIcon = () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>);

/* ─── Main ────────────────────────────────────────────────── */
const Wishlist = () => {
  const dispatch   = useNavigate();
  const navigate   = useNavigate();
  const wishlistIds = useSelector(selectWishlist);
  const cartItems   = useSelector(selectCartItems);
  const reduxDispatch = useDispatch();

  const [mounted,    setMounted]    = useState(false);
  const [sortBy,     setSortBy]     = useState("default");
  const [showClear,  setShowClear]  = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  // Build wishlist products from ids
  let items = ALL_PRODUCTS.filter(p => wishlistIds.includes(p.id));
  if (sortBy === "price-asc")  items = [...items].sort((a,b) => a.price - b.price);
  if (sortBy === "price-desc") items = [...items].sort((a,b) => b.price - a.price);
  if (sortBy === "name")       items = [...items].sort((a,b) => a.name.localeCompare(b.name));
  if (sortBy === "rating")     items = [...items].sort((a,b) => b.rating - a.rating);

  const totalSavings = items.reduce((s, p) => s + (p.old - p.price), 0);
  const totalValue   = items.reduce((s, p) => s + p.price, 0);
  const inCartCount  = items.filter(p => cartItems.some(c => c.id === p.id)).length;

  const addAll = () => {
    items.forEach(p => reduxDispatch(addToCart(p)));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        .wl-root * { box-sizing:border-box; }
        .wl-root {
          font-family:'DM Sans',sans-serif;
          min-height:100vh;
          background:#fafafa;
          padding:36px 24px 80px;
        }

        /* Card */
        .wl-card {
          background:#fff;
          border:1.5px solid #f4f4f5;
          border-radius:20px;
          display:flex;
          flex-direction:column;
          overflow:hidden;
          transition:all .25s cubic-bezier(.4,0,.2,1);
        }
        .wl-card:hover {
          border-color:#fed7aa;
          box-shadow:0 8px 32px rgba(0,0,0,0.09);
          transform:translateY(-3px);
        }

        /* Card enter animation — staggered */
        .wl-enter {
          animation: wlEnter .45s cubic-bezier(.34,1.2,.64,1) both;
        }
        @keyframes wlEnter {
          from { opacity:0; transform:translateY(20px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        /* Remove animation */
        .wl-removing {
          animation: wlRemove .35s ease forwards;
        }
        @keyframes wlRemove {
          to { opacity:0; transform:scale(0.88) translateY(8px); }
        }

        /* Image wrap */
        .wl-img-wrap {
          background:linear-gradient(135deg,#fffbf7,#fff7ed);
          padding:24px 20px;
          display:flex; align-items:center; justify-content:center;
          height:180px; position:relative; overflow:hidden; cursor:pointer;
        }
        .wl-img {
          width:110px; height:110px; object-fit:contain;
          filter:drop-shadow(0 8px 20px rgba(0,0,0,0.10));
          transition:transform .35s cubic-bezier(.34,1.56,.64,1);
        }
        .wl-card:hover .wl-img { transform:scale(1.08) translateY(-4px); }

        .wl-name {
          font-size:15px; font-weight:700; color:#18181b;
          line-height:1.3; cursor:pointer; transition:color .2s;
          margin-bottom:2px;
        }
        .wl-name:hover { color:#f97316; }

        /* Add to cart btn */
        .wl-cart-btn {
          flex:1; display:flex; align-items:center; justify-content:center; gap:7px;
          background:#18181b; color:#fff; border:none; border-radius:10px;
          padding:10px 14px; font-size:12px; font-weight:700;
          cursor:pointer; font-family:'DM Sans',sans-serif;
          transition:all .25s cubic-bezier(.34,1.56,.64,1);
        }
        .wl-cart-btn:hover { background:#f97316; transform:translateY(-1px); }
        .wl-cart-btn.wl-added   { background:#16a34a; }
        .wl-cart-btn.wl-already { background:#f0fdf4; color:#16a34a; border:1.5px solid #bbf7d0; }

        /* Remove btn */
        .wl-remove-btn {
          width:38px; height:38px; border-radius:10px;
          border:1.5px solid #f4f4f5; background:#fff; color:#a3a3a3;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:all .2s; flex-shrink:0;
        }
        .wl-remove-btn:hover { border-color:#fecaca; background:#fef2f2; color:#ef4444; }

        /* Sort select */
        .wl-sort {
          border:1.5px solid #e5e5e5; border-radius:10px;
          padding:8px 14px; font-size:13px; font-weight:600;
          color:#18181b; background:#fff; cursor:pointer;
          font-family:'DM Sans',sans-serif; outline:none;
          transition:border-color .2s;
        }
        .wl-sort:focus { border-color:#f97316; }

        /* Stats bar */
        .wl-stat {
          background:#fff; border:1.5px solid #f4f4f5; border-radius:14px;
          padding:14px 20px; flex:1; min-width:140px;
          transition:border-color .2s;
        }
        .wl-stat:hover { border-color:#fed7aa; }

        /* Add all btn */
        .wl-add-all {
          display:flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#f97316,#ea580c);
          color:#fff; border:none; border-radius:12px; padding:12px 24px;
          font-size:14px; font-weight:700; cursor:pointer;
          font-family:'DM Sans',sans-serif;
          box-shadow:0 4px 16px rgba(249,115,22,0.28);
          transition:all .3s cubic-bezier(.34,1.56,.64,1);
        }
        .wl-add-all:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(249,115,22,0.38); }

        /* Page fade */
        .wl-page { opacity:0; transform:translateY(12px); transition:opacity .5s ease, transform .5s cubic-bezier(.34,1.2,.64,1); }
        .wl-page.show { opacity:1; transform:translateY(0); }

        /* Clear confirm */
        .wl-confirm {
          background:#fef2f2; border:1.5px solid #fecaca; border-radius:12px;
          padding:14px 20px; display:flex; align-items:center; gap:14px;
          animation:wlEnter .3s ease both;
        }

        @media (max-width:640px) {
          .wl-root { padding:24px 16px 80px; }
          .wl-stats { flex-wrap:wrap !important; }
        }
      `}</style>

      <div className="wl-root">
        <div style={{ maxWidth:1200, margin:"0 auto" }}>

          {/* Breadcrumb */}
          <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#a3a3a3", fontWeight:500, marginBottom:28 }}>
            <Link to="/" style={{ color:"#a3a3a3", textDecoration:"none" }} onMouseOver={e=>e.currentTarget.style.color="#f97316"} onMouseOut={e=>e.currentTarget.style.color="#a3a3a3"}>Home</Link>
            <span>›</span>
            <span style={{ color:"#18181b", fontWeight:600 }}>Wishlist</span>
          </div>

          <div className={`wl-page ${mounted ? "show" : ""}`}>

            {/* Header */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:32 }}>
              <div>
                <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,5vw,44px)", fontWeight:700, color:"#18181b", margin:"0 0 6px", letterSpacing:"-0.025em", lineHeight:1.1 }}>
                  My Wishlist
                  {items.length > 0 && (
                    <span style={{ fontSize:"clamp(14px,2vw,18px)", fontWeight:700, color:"#f97316", marginLeft:14, background:"#fff7ed", border:"1.5px solid #fed7aa", borderRadius:999, padding:"2px 14px", verticalAlign:"middle" }}>
                      {items.length}
                    </span>
                  )}
                </h1>
                <p style={{ fontSize:13, color:"#a3a3a3", margin:0 }}>Products you love, saved for later</p>
              </div>

              {items.length > 0 && (
                <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                  <select className="wl-sort" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                    <option value="default">Sort: Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name A–Z</option>
                  </select>
                  <button className="wl-add-all" onClick={addAll}>
                    <CartIcon/> Add All to Cart
                  </button>
                </div>
              )}
            </div>

            {/* Stats bar */}
            {items.length > 0 && (
              <div className="wl-stats" style={{ display:"flex", gap:12, marginBottom:28, flexWrap:"wrap" }}>
                {[
                  { label:"Items saved",     value:items.length,                       suffix:"",         icon:"🛍️" },
                  { label:"Total value",     value:fmt(totalValue),                    suffix:"",         icon:"💰" },
                  { label:"You save",        value:fmt(totalSavings),                  suffix:" total",   icon:"🎉" },
                  { label:"Already in cart", value:`${inCartCount}/${items.length}`,   suffix:" items",   icon:"🛒" },
                ].map(s => (
                  <div key={s.label} className="wl-stat">
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:18 }}>{s.icon}</span>
                      <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"#a3a3a3" }}>{s.label}</span>
                    </div>
                    <div style={{ fontSize:20, fontWeight:900, color:"#18181b", letterSpacing:"-0.02em" }}>
                      {s.value}<span style={{ fontSize:12, color:"#a3a3a3", fontWeight:500 }}>{s.suffix}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Clear confirm */}
            {showClear && (
              <div className="wl-confirm" style={{ marginBottom:20 }}>
                <span style={{ fontSize:13, fontWeight:600, color:"#ef4444", flex:1 }}>
                  Remove all {items.length} items from wishlist?
                </span>
                <button onClick={() => { reduxDispatch(clearWishlist()); setShowClear(false); }}
                  style={{ background:"#ef4444", color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                  Yes, clear all
                </button>
                <button onClick={() => setShowClear(false)}
                  style={{ background:"#f4f4f5", color:"#52525b", border:"none", borderRadius:8, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                  Cancel
                </button>
              </div>
            )}

            {/* Grid */}
            {items.length > 0 ? (
              <>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:18, marginBottom:28 }}>
                  {items.map((p, i) => <WishCard key={p.id} product={p} index={i}/>)}
                </div>

                {/* Clear wishlist link */}
                <div style={{ textAlign:"center" }}>
                  <button onClick={() => setShowClear(true)}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"#a3a3a3", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", textDecoration:"underline", transition:"color .2s" }}
                    onMouseOver={e=>e.currentTarget.style.color="#ef4444"}
                    onMouseOut={e=>e.currentTarget.style.color="#a3a3a3"}>
                    Clear entire wishlist
                  </button>
                </div>
              </>
            ) : (
              /* Empty state */
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:420, textAlign:"center", padding:"40px 20px" }}>
                <div style={{ marginBottom:24, opacity:0.4 }}>
                  <HeartIcon/>
                </div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:"#18181b", margin:"0 0 10px", letterSpacing:"-0.02em" }}>
                  Your wishlist is empty
                </h2>
                <p style={{ fontSize:14, color:"#a3a3a3", margin:"0 0 28px", maxWidth:320, lineHeight:1.6 }}>
                  Save your favourite products here so you never forget them.
                </p>
                <button onClick={() => navigate("/shop")}
                  style={{ background:"linear-gradient(135deg,#f97316,#ea580c)", color:"#fff", border:"none", borderRadius:12, padding:"13px 32px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 16px rgba(249,115,22,0.28)", transition:"all .3s cubic-bezier(.34,1.56,.64,1)" }}
                  onMouseOver={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(249,115,22,0.38)"; }}
                  onMouseOut={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(249,115,22,0.28)"; }}>
                  Browse Products →
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;