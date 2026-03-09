import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  toggleWishlist,
  setShowCart,
  selectCartItems,
  selectCartCount,
  selectWishlist,
} from "../../store/slices/cartSlice";

import allBannerImg     from "../../assets/all-banner.jpg";
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

/* ── Data ─────────────────────────────────────────────────── */
const PRODUCTS = [
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

const CATEGORIES   = ["All","Fruits","Veggies","Dairy","Meat"];
const SORT_OPTIONS = [
  { label:"Default",         value:"default"    },
  { label:"Price: Low–High", value:"price-asc"  },
  { label:"Price: High–Low", value:"price-desc" },
  { label:"Top Rated",       value:"rating"     },
];
const BADGE_COLORS = {
  "Best Seller": { bg:"#fff7ed", color:"#ea580c", border:"#fed7aa" },
  "Organic":     { bg:"#f0fdf4", color:"#16a34a", border:"#bbf7d0" },
  "Fresh":       { bg:"#eff6ff", color:"#2563eb", border:"#bfdbfe" },
  "Farm Fresh":  { bg:"#f0fdf4", color:"#16a34a", border:"#bbf7d0" },
  "Premium":     { bg:"#fdf4ff", color:"#9333ea", border:"#e9d5ff" },
  "Value Pack":  { bg:"#fff7ed", color:"#ea580c", border:"#fed7aa" },
  "Imported":    { bg:"#f8fafc", color:"#475569", border:"#e2e8f0" },
  "Combo":       { bg:"#fefce8", color:"#ca8a04", border:"#fef08a" },
  "Daily Fresh": { bg:"#f0fdf4", color:"#16a34a", border:"#bbf7d0" },
  "Seasonal":    { bg:"#fdf4ff", color:"#9333ea", border:"#e9d5ff" },
  "Vegan":       { bg:"#f0fdf4", color:"#16a34a", border:"#bbf7d0" },
};
const ITEMS_PER_PAGE = 10;
const fmt = (n) => `$${Number(n).toFixed(2)}`;

/* ── Stars ────────────────────────────────────────────────── */
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

/* ── Product Card ─────────────────────────────────────────── */
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const wishlist  = useSelector(selectWishlist);
  const isInCart = cartItems.some(i => i.id === product.id);
  const isWished = wishlist.includes(product.id);
  const discount = Math.round(((product.old - product.price) / product.old) * 100);
  const bc       = product.badge ? BADGE_COLORS[product.badge] : null;

  return (
    <div className="shop-card" style={{ background:"#fff", borderRadius:20, overflow:"hidden", border:"1.5px solid #f4f4f5", transition:"transform .25s,box-shadow .25s", position:"relative", display:"flex", flexDirection:"column" }}>

      {/* Discount badge */}
      {discount > 0 && (
        <div style={{ position:"absolute", top:14, left:14, zIndex:2, background:"#f97316", color:"#fff", fontSize:10, fontWeight:800, padding:"3px 9px", borderRadius:999 }}>
          -{discount}%
        </div>
      )}

      {/* Wishlist button */}
      <button onClick={() => dispatch(toggleWishlist(product.id))}
        style={{ position:"absolute", top:12, right:12, zIndex:2, background: isWished ? "#fff7ed" : "#fff", border: isWished ? "1.5px solid #fed7aa" : "1.5px solid #f4f4f5", borderRadius:"50%", width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all .2s" }}>
        <svg width="15" height="15" viewBox="0 0 24 24"
          fill={isWished ? "#f97316" : "none"} stroke={isWished ? "#f97316" : "#a3a3a3"}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </button>

      {/* Image */}
      <div style={{ background:"linear-gradient(135deg,#fffbf7,#fff7ed)", padding:"28px 20px 16px", display:"flex", alignItems:"center", justifyContent:"center", minHeight:180 }}>
        <img src={product.img} alt={product.name} className="card-img"
          style={{ width:"100%", maxWidth:130, height:130, objectFit:"contain", transition:"transform .35s", filter:"drop-shadow(0 8px 16px rgba(0,0,0,0.10))" }}/>
      </div>

      {/* Info */}
      <div className="card-info" style={{ padding:"14px 18px 18px", flex:1, display:"flex", flexDirection:"column", gap:8 }}>
        {bc && (
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", background:bc.bg, color:bc.color, border:`1px solid ${bc.border}`, borderRadius:999, padding:"2px 10px", alignSelf:"flex-start" }}>
            {product.badge}
          </span>
        )}
        <div style={{ fontSize:15, fontWeight:700, color:"#18181b", lineHeight:1.35 }}>{product.name}</div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <Stars rating={product.rating}/>
          <span style={{ fontSize:11, color:"#a3a3a3", fontWeight:500 }}>({product.reviews})</span>
        </div>
        <div className="card-price-row" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto", paddingTop:6 }}>
          <div>
            <span style={{ fontSize:18, fontWeight:800, color:"#18181b" }}>{fmt(product.price)}</span>
            <span style={{ fontSize:11, color:"#a3a3a3", marginLeft:6, textDecoration:"line-through" }}>{fmt(product.old)}</span>
            <div style={{ fontSize:10, color:"#a3a3a3", marginTop:1 }}>per {product.unit}</div>
          </div>
          <button onClick={() => dispatch(addToCart(product))}
            style={{ display:"flex", alignItems:"center", gap:6, background: isInCart ? "#16a34a" : "#f97316", color:"#fff", border:"none", borderRadius:12, padding:"9px 14px", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .22s", whiteSpace:"nowrap" }}>
            {isInCart ? (
              <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>Added</>
            ) : (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>Add</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Pagination ───────────────────────────────────────────── */
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"48px 0 16px" }}>
    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
      style={{ width:40, height:40, borderRadius:12, border:"1.5px solid #e5e5e5", background:"#fff", cursor: currentPage===1 ? "not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", color: currentPage===1 ? "#d4d4d4":"#18181b", transition:"all .2s" }}
      onMouseOver={e => { if(currentPage!==1){ e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.color="#f97316"; }}}
      onMouseOut={e => { e.currentTarget.style.borderColor="#e5e5e5"; e.currentTarget.style.color=currentPage===1?"#d4d4d4":"#18181b"; }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
      <button key={page} onClick={() => onPageChange(page)}
        style={{ width:40, height:40, borderRadius:12, border: page===currentPage ? "none":"1.5px solid #e5e5e5", background: page===currentPage ? "#f97316":"#fff", color: page===currentPage ? "#fff":"#52525b", fontWeight: page===currentPage ? 800:600, fontSize:14, cursor:"pointer", transition:"all .2s", boxShadow: page===currentPage ? "0 4px 14px rgba(249,115,22,0.30)":"none" }}
        onMouseOver={e => { if(page!==currentPage){ e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.color="#f97316"; }}}
        onMouseOut={e => { if(page!==currentPage){ e.currentTarget.style.borderColor="#e5e5e5"; e.currentTarget.style.color="#52525b"; }}}>
        {page}
      </button>
    ))}

    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
      style={{ width:40, height:40, borderRadius:12, border:"1.5px solid #e5e5e5", background:"#fff", cursor: currentPage===totalPages ? "not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", color: currentPage===totalPages ? "#d4d4d4":"#18181b", transition:"all .2s" }}
      onMouseOver={e => { if(currentPage!==totalPages){ e.currentTarget.style.borderColor="#f97316"; e.currentTarget.style.color="#f97316"; }}}
      onMouseOut={e => { e.currentTarget.style.borderColor="#e5e5e5"; e.currentTarget.style.color=currentPage===totalPages?"#d4d4d4":"#18181b"; }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </div>
);

/* ── Shop Page ────────────────────────────────────────────── */
const Shop = () => {
  const dispatch  = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const [searchParams] = useSearchParams();

  const urlCategoryMap = { fruits: "Fruits", veggies: "Veggies", dairy: "Dairy", meat: "Meat" };
  const urlCat = searchParams.get("category");
  const initialCategory = urlCategoryMap[urlCat] || "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy]                 = useState("default");
  const [search, setSearch]                 = useState("");
  const [currentPage, setCurrentPage]       = useState(1);

  useEffect(() => {
    const cat = urlCategoryMap[searchParams.get("category")] || "All";
    setActiveCategory(cat);
    setCurrentPage(1);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== "All") list = list.filter(p => p.category === activeCategory);
    if (search.trim())            list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === "price-asc")   list = [...list].sort((a,b) => a.price - b.price);
    if (sortBy === "price-desc")  list = [...list].sort((a,b) => b.price - a.price);
    if (sortBy === "rating")      list = [...list].sort((a,b) => b.rating - a.rating);
    return list;
  }, [activeCategory, sortBy, search]);

  const handleCategory = (cat) => { setActiveCategory(cat); setCurrentPage(1); };
  const handleSearch   = (val) => { setSearch(val);         setCurrentPage(1); };
  const handleSort     = (val) => { setSortBy(val);         setCurrentPage(1); };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        .shop-root * { box-sizing: border-box; }
        .shop-root { font-family: 'DM Sans', sans-serif; background: #fafafa; min-height: 100vh; }
        .shop-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.10); }
        .shop-card:hover .card-img { transform: scale(1.08); }
        .cat-btn { border: 1.5px solid #e5e5e5; background: #fff; border-radius: 999px; padding: 8px 22px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s; font-family: 'DM Sans',sans-serif; color: #52525b; }
        .cat-btn:hover { border-color: #f97316; color: #f97316; }
        .cat-btn.active { background: #f97316; border-color: #f97316; color: #fff; box-shadow: 0 4px 16px rgba(249,115,22,0.28); }
        .sort-select { border: 1.5px solid #e5e5e5; background: #fff; border-radius: 12px; padding: 9px 36px 9px 16px; font-size: 13px; font-weight: 600; color: #18181b; outline: none; cursor: pointer; font-family: 'DM Sans',sans-serif; transition: border-color .2s; appearance: none; }
        .sort-select:focus { border-color: #f97316; }
        .search-input { border: 1.5px solid #e5e5e5; background: #fff; border-radius: 12px; padding: 9px 16px 9px 40px; font-size: 13px; font-weight: 500; color: #18181b; outline: none; font-family: 'DM Sans',sans-serif; transition: border-color .2s; width: 220px; }
        .search-input:focus { border-color: #f97316; }
        .card-img { width: 100%; max-width: 130px; height: 130px; object-fit: contain; transition: transform .35s; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.10)); }
        .card-info { padding: 14px 18px 18px; }
        @media (max-width: 768px) { 
          .card-img { max-width: 90px !important; height: 90px !important; }
          .card-info { padding: 10px 12px 14px !important; }
        }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 22px; }
        .card-price-row { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 6px; }
        @media (max-width: 768px) {
          .shop-toolbar { flex-direction: column !important; align-items: flex-start !important; }
          .search-input { width: 100% !important; }
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        @media (max-width: 400px) {
          .product-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .card-price-row { flex-direction: column; align-items: flex-start; gap: 10px; }
          .card-price-row button { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="shop-root">
        {/* ── Page Header ── */}
        <div style={{ background:"linear-gradient(135deg,#fffbf7 0%,#fff 60%,#fff7ed 100%)", borderBottom:"1px solid #f4f4f5", padding:"48px 24px 36px" }}>
          <div style={{ maxWidth:1280, margin:"0 auto" }}>

            {/* Breadcrumb */}
            <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#a3a3a3", fontWeight:500, marginBottom:16 }}>
              <a href="/" style={{ color:"#a3a3a3", textDecoration:"none" }}
                onMouseOver={e => e.currentTarget.style.color="#f97316"}
                onMouseOut={e => e.currentTarget.style.color="#a3a3a3"}>Home</a>
              <span>›</span>
              <span style={{ color:"#18181b", fontWeight:600 }}>Shop</span>
            </div>

            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:28 }}>
              <div>
                <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,5vw,52px)", fontWeight:700, color:"#18181b", margin:"0 0 8px", lineHeight:1.1, letterSpacing:"-0.02em" }}>
                  Fresh <span style={{ color:"#f97316" }}>Market</span>
                </h1>
                <p style={{ fontSize:14, color:"#71717a", margin:0 }}>{filtered.length} products — farm fresh, delivered daily</p>
              </div>

              {/* My Cart button → opens global cart drawer */}
              <button onClick={() => dispatch(setShowCart(true))}
                style={{ display:"flex", alignItems:"center", gap:10, background:"#18181b", color:"#fff", border:"none", borderRadius:14, padding:"12px 22px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background .2s" }}
                onMouseOver={e => e.currentTarget.style.background="#f97316"}
                onMouseOut={e => e.currentTarget.style.background="#18181b"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                My Cart
                {cartCount > 0 && (
                  <span style={{ background:"#f97316", color:"#fff", fontSize:10, fontWeight:800, borderRadius:999, padding:"2px 7px" }}>{cartCount}</span>
                )}
              </button>
            </div>

            {/* Banner */}
            <div style={{ borderRadius:20, overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,0.10)" }}>
              <img src={allBannerImg} alt="Fresh market banner" style={{ width:"100%", height:200, objectFit:"cover", display:"block" }}/>
            </div>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"24px 24px 0" }}>
          <div className="shop-toolbar" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} className={`cat-btn ${activeCategory===cat?"active":""}`} onClick={() => handleCategory(cat)}>{cat}</button>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
              <div style={{ position:"relative" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2.5" strokeLinecap="round"
                  style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}>
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input className="search-input" type="text" placeholder="Search products..." value={search} onChange={e => handleSearch(e.target.value)}/>
              </div>
              <div style={{ position:"relative" }}>
                <select className="sort-select" value={sortBy} onChange={e => handleSort(e.target.value)}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round"
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"28px 24px 16px" }}>
          {paginated.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 0", color:"#a3a3a3" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
              <div style={{ fontSize:16, fontWeight:600 }}>No products found</div>
              <div style={{ fontSize:13, marginTop:6 }}>Try a different search or category</div>
            </div>
          ) : (
            <div className="product-grid">
              {paginated.map(product => <ProductCard key={product.id} product={product}/>)}
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px 64px" }}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            <p style={{ textAlign:"center", fontSize:12, color:"#a3a3a3", marginTop:12 }}>
              Showing {(currentPage-1)*ITEMS_PER_PAGE+1}–{Math.min(currentPage*ITEMS_PER_PAGE, filtered.length)} of {filtered.length} products
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;