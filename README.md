# 🛒 Grocify — Premium Fresh Grocery Web App

> A modern, full-featured grocery e-commerce frontend built with **React**, **Redux Toolkit**, and **React Router**.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?style=flat-square&logo=redux)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)

---

## ✨ Features

- 🏠 **Home Page** — Hero section, shop by category, discount banner, customer reviews
- 🛍️ **Shop Page** — Product grid with category filter and search
- 📦 **Product Detail** — Image zoom, tabs (description/nutrition/reviews), related products
- 🛒 **Cart Drawer** — Slide-in cart with quantity control, real-time total
- ❤️ **Wishlist** — Save products, sort, add all to cart
- 💳 **Checkout** — 3-step flow (Delivery → Payment → Confirm) with promo codes
- 👤 **Auth Page** — Sign In / Create Account with animated tab switch
- 🧑 **Profile Page** — Edit profile, order history, security settings
- 🔐 **Auth State** — Redux-based login/logout with mock authentication
- 📱 **Responsive** — Mobile-first design with hamburger drawer
- 🎨 **Premium UI** — Cormorant Garamond + DM Sans fonts, orange accent theme

---

## 🖥️ Pages & Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/shop` | Shop |
| `/product/:id` | Product Detail |
| `/wishlist` | Wishlist |
| `/checkout` | Checkout |
| `/login` | Sign In |
| `/register` | Create Account |
| `/profile` | User Profile |
| `/orders` | Order History |
| `/about` | About Us |
| `/process` | Our Process |
| `/contact` | Contact |
| `*` | 404 Error Page |

---

## 🗂️ Project Structure

```
src/
├── assets/              # Images, icons
├── components/
│   ├── common/
│   │   ├── Navbar/      # Sticky navbar with cart & user dropdown
│   │   └── Footer/
│   ├── home/            # ShopByCategory, DiscountBanner, etc.
│   └── ui/              # Container, Flex helpers
├── hooks/
│   ├── useNavbar.js
│   ├── useLogin.js
│   ├── useRegister.js
│   ├── useCountUp.js
│   └── Cartslice.js     # Redux cart slice
├── layouts/
│   └── RootLayout.jsx
├── pages/
│   ├── Home/
│   ├── shop/
│   ├── product/
│   ├── wishlist/
│   ├── checkout/
│   ├── auth/
│   ├── profile/
│   ├── about/
│   ├── process/
│   ├── contact/
│   └── error/
├── store/
│   ├── store.js
│   ├── slices/
│   │   ├── cartSlice.js
│   │   └── authSlice.js
│   └── api/
│       └── grocifyApi.js
├── App.jsx
└── main.jsx
```

---

## ⚙️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Redux Toolkit | Global state (cart, auth) |
| React Router v6 | Client-side routing |
| Vite | Build tool & dev server |
| React Icons | Icon library |
| RTK Query | API integration (ready) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/grocify.git
cd grocify

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Authentication (Mock)

Currently uses **mock authentication** for frontend development. To test:

- Go to `/login`
- Enter any valid email (e.g. `test@test.com`) and password (min 6 chars)
- You'll be logged in with a mock user

**To connect a real backend**, update `src/hooks/useLogin.js`:
```js
// Uncomment the real API call and comment out the mock block
const result = await login({ email, password }).unwrap();
```

---

## 🛒 Redux State

### Cart Slice (`cartSlice.js`)
| Action | Description |
|--------|-------------|
| `addToCart(product)` | Add item to cart |
| `removeFromCart(id)` | Remove item |
| `updateQty({ id, qty })` | Update quantity |
| `clearCart()` | Empty cart |
| `toggleWishlist(product)` | Add/remove from wishlist |
| `clearWishlist()` | Empty wishlist |
| `setShowCart(bool)` | Toggle cart drawer |

### Auth Slice (`authSlice.js`)
| Action | Description |
|--------|-------------|
| `setCredentials({ user, token })` | Login user |
| `logout()` | Clear user session |

---

## 🎨 Design System

- **Fonts:** Cormorant Garamond (display) + DM Sans (body)
- **Primary Color:** `#f97316` (Orange)
- **Background:** `#fafafa` / `#fff`
- **Border Radius:** 12–20px
- **Shadow:** Layered soft shadows

---

## 📦 Promo Codes (Checkout)

| Code | Discount |
|------|----------|
| `GROCIFY10` | 10% off |
| `FRESH20` | 20% off |
| `SAVE15` | 15% off |

---

## 📄 License

This project is for educational/portfolio purposes.

---

<p align="center">Made with ❤️ by <strong>Fahim Hossain Munna</strong></p>
