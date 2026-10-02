import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';

const FinalCTA = () => {
  const { auth } = useAuth();

  return (
    <>
      <section className="bg-ef-cream py-24 sm:py-32 border-t border-neutral-200 text-center" id="join">
        <div className="max-w-4xl mx-auto px-6">
          <span className="brand-script text-4xl text-ef-blue font-bold block mb-4">
            Ready to reach peak physical power?
          </span>

          <h2 className="font-condensed-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-ef-black mb-8 leading-none">
            READY TO BRING YOUR BODY<br />
            <span className="font-serif italic font-normal text-6xl sm:text-8xl lowercase text-neutral-800">
              in motion?
            </span>
          </h2>

          <p className="text-neutral-600 text-lg sm:text-xl max-w-xl mx-auto font-medium mb-10">
            Tell us your target weight, strength goal, or event. We engineer the exact workout splits, nutrition macros, and coaching to guarantee your transformation.
          </p>

          {/* Animated Primary CTA Button with Liquid Wave Ripple Effect */}
          <Link
            to={auth?.user ? '/dashboard/user' : '/register'}
            className="btn-wave-action inline-flex items-center space-x-3 bg-ef-blue text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-ef-dark-blue shadow-2xl transition-all duration-300 group"
          >
            <svg className="btn-wave-layer" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 40">
              <path
                d="M0 20 C 150 5, 250 35, 400 20 C 550 5, 650 35, 800 20 C 950 5, 1050 35, 1200 20 L 1200 40 L 0 40 Z"
                fill="#ffffff"
              />
            </svg>
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse relative z-10"></span>
            <span className="relative z-10">{auth?.user ? 'GO TO MEMBER DASHBOARD' : 'START YOUR MEMBERSHIP'}</span>
            <span className="btn-icon-bounce ml-1 inline-block relative z-10">→</span>
          </Link>
        </div>
      </section>

      {/* Infinite Moving Ticker Bar (Bottom of Page, High-Contrast Yellow/Black) */}
      <div
        className="w-full bg-ef-yellow text-ef-black py-4 overflow-hidden border-y-2 border-black font-black uppercase text-sm sm:text-base tracking-widest select-none"
        data-purpose="infinite-marquee"
      >
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="mx-4">
            HIGH INTENSITY WORKOUTS • PERSONALIZED NUTRITION PLANS • PUSH BEYOND LIMITS • NO EXCUSES, JUST RESULTS • 24/7 ACCESS • FITZONE RUN CLUB • CERTIFIED COACHES •
          </span>
          <span className="mx-4">
            HIGH INTENSITY WORKOUTS • PERSONALIZED NUTRITION PLANS • PUSH BEYOND LIMITS • NO EXCUSES, JUST RESULTS • 24/7 ACCESS • FITZONE RUN CLUB • CERTIFIED COACHES •
          </span>
          <span className="mx-4">
            HIGH INTENSITY WORKOUTS • PERSONALIZED NUTRITION PLANS • PUSH BEYOND LIMITS • NO EXCUSES, JUST RESULTS • 24/7 ACCESS • FITZONE RUN CLUB • CERTIFIED COACHES •
          </span>
          <span className="mx-4">
            HIGH INTENSITY WORKOUTS • PERSONALIZED NUTRITION PLANS • PUSH BEYOND LIMITS • NO EXCUSES, JUST RESULTS • 24/7 ACCESS • FITZONE RUN CLUB • CERTIFIED COACHES •
          </span>
        </div>
      </div>
    </>
  );
};

export default FinalCTA;
