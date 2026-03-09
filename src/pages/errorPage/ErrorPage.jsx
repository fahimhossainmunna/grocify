import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Container from '../../components/ui/Container';

const ErrorPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-20">
      <Container>
        <div className="text-center space-y-8">
          <div className="relative">
            <h1 className="text-[150px] md:text-[250px] font-black text-zinc-100 leading-none select-none">
              404
            </h1>
            <p className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-black text-zinc-900 mt-10 tracking-tighter">
              Oops! Page Not Found
            </p>
          </div>

          <p className="text-zinc-500 text-lg md:text-xl max-w-md mx-auto font-medium leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="pt-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 bg-orange-500 text-white px-10 py-4 rounded-full font-black shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95 group text-lg"
            >
              <HiOutlineArrowLongLeft className="text-2xl transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>

          <div className="pt-10 opacity-20 flex justify-center gap-10 overflow-hidden grayscale">
             <img src="/icon.png" alt="Grocify" className="w-12 h-12 animate-bounce" />
             <img src="/icon.png" alt="Grocify" className="w-12 h-12 animate-bounce delay-100" />
             <img src="/icon.png" alt="Grocify" className="w-12 h-12 animate-bounce delay-200" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ErrorPage;