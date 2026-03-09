import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Shop from "./pages/shop/Shop";
import About from "./pages/about/About";
import Process from "./pages/process/Process";
import Contact from "./pages/contact/Contact";
import ErrorPage from "./pages/errorPage/ErrorPage";

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
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
