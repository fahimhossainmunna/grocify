import React from "react";
import Hero from "../components/home/Hero";
import ShopByCategory from "../components/home/ShopByCategory";
import OurValues from "../components/home/OurValues";
import DiscountBanner from "../components/home/DiscountBanner";
import OurProcess from "../components/home/OurProcess";
import CustomerSaying from "../components/home/CustomerSaying";
const Home = () => {
  return (
    <div>
     <Hero/>
     <ShopByCategory/>
     <OurValues/>
     <DiscountBanner/>
     <OurProcess/>
     <CustomerSaying/>
    </div>
  );
};

export default Home;
