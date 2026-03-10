import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";
import Process from "./pages/process/Process";
import Contact from "./pages/contact/Contact";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Checkout from "./pages/checkout/Checkout";
import AuthPage from "./pages/authPage/AuthPage";
import Wishlist from "./pages/wishlist/Wishlist";
import ProfilePage from "./pages/profile/ProfilePage";
import FAQ from "./pages/faq/FAQ";
import DeliveryInfo from "./pages/delivery/Deliveryinfo";
import ReturnsPolicy from "./pages/returns/ReturnsPolicy";
import TrackOrder from "./pages/track-order/TrackOrder";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="process" element={<Process />} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<ProfilePage />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="delivery-info" element={<DeliveryInfo />} />
          <Route path="returns" element={<ReturnsPolicy />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
