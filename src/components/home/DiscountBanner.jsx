import { Link } from "react-router-dom";
import FreshFruits from '../../assets/fresh-fruits.png';
import Container from "../ui/Container";

const DiscountBanner = () => {
  return (
    <section
      className="bg-zinc-100 bg-right bg-contain bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${FreshFruits})` }}
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-zinc-100 via-zinc-100/95 to-transparent pointer-events-none" />

      <Container>
        <div className="py-10 md:py-14 flex flex-col md:flex-row items-center gap-4 md:gap-2 relative">

          {/* 20% rotated — hidden on mobile, shown on md+ */}
          <div className="hidden md:flex flex-col items-center self-center shrink-0">
            <span className="text-[110px] leading-none text-orange-500 font-black transform -rotate-90 tracking-tighter drop-shadow-sm select-none">
              20%
            </span>
            <span className="text-xs font-black tracking-[0.25em] uppercase text-orange-400 mt-1">off</span>
          </div>

          {/* vertical divider — only md+ */}
          <div className="hidden md:block w-px h-32 bg-linear-to-b from-transparent via-orange-300 to-transparent self-center mx-6 shrink-0" />

          {/* content */}
          <div className="max-w-xl w-full">
            {/* badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500">Limited Time Offer</span>
            </div>

            {/* Mobile: show 20% inline above heading */}
            <div className="flex md:hidden items-baseline gap-3 mb-2">
              <span className="text-6xl font-black text-orange-500 tracking-tighter leading-none">20%</span>
              <span className="text-xs font-black tracking-[0.20em] uppercase text-orange-400">off</span>
            </div>

            <h3 className="text-4xl md:text-6xl text-zinc-800 font-black leading-tight tracking-tight">
              First Order <span className="text-orange-500">Discount!</span>
            </h3>

            <p className="text-zinc-800/70 my-5 text-sm leading-relaxed max-w-md">
              Enjoy an exclusive first order discount on our grocery website! Shop
              fresh essentials and save big on your first purchase. Fast delivery
              and quality guaranteed.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Link to /shop instead of plain button */}
              <Link
                to="/shop"
                className="py-3 px-7 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200 text-sm"
              >
                Get A Discount →
              </Link>
              <div className="flex items-center gap-2 border-2 border-dashed border-orange-300 rounded-xl px-4 py-2.5">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">Code:</span>
                <span className="text-sm font-black tracking-widest text-orange-500">FRESH20</span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default DiscountBanner;