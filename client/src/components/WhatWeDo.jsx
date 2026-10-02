import React from 'react';
import { Link } from 'react-router-dom';
import ScrollWheel from './ScrollWheel';

const WhatWeDo = () => {
  return (
    <section className="py-24 sm:py-32 px-5 max-w-6xl mx-auto text-center relative" id="services">
      {/* Scroll indicator wheel top-right */}
      <ScrollWheel label="PILLARS • DELIVER •" />
      <p className="font-serif italic text-2xl text-neutral-800 mb-2">
        Our core pillars
      </p>
      <h2 className="font-condensed-heading text-6xl sm:text-8xl tracking-tight uppercase text-ef-black mb-16">
        WHAT WE <span className="font-serif italic font-normal lowercase tracking-normal text-6xl sm:text-8xl text-neutral-800">deliver</span>
      </h2>

      {/* 3 Posters Grid: Strength, Conditioning, Coaching */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 items-stretch mb-16" data-purpose="services-cards">
        {/* Card 1: STRENGTH */}
        <div
          className="service-card group bg-ef-blue text-white rounded-2xl p-5 flex flex-col justify-between hover-lift relative overflow-hidden text-left transition-all duration-500 ease-out"
          data-purpose="service-strength"
        >
          <div className="bg-white rounded-xl aspect-[4/5] p-6 flex flex-col items-center justify-center text-center overflow-hidden relative shadow-inner">
            <div className="w-32 h-32 relative transform group-hover:rotate-12 transition-transform duration-500">
              <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 100 100">
                <polygon fill="#38bdf8" points="50,10 85,28 50,48 15,28" />
                <polygon fill="#0284c7" points="15,28 50,48 50,88 15,68" />
                <polygon fill="#0369a1" points="50,48 85,28 85,68 50,88" />
                <polygon fill="#f43f5e" points="50,30 75,44 50,58 25,44" />
                <polygon fill="#e11d48" points="25,44 50,58 50,80 25,66" />
                <polygon fill="#be123c" points="50,58 75,44 75,66 50,80" />
              </svg>
            </div>
            <p className="text-neutral-500 text-xs font-black uppercase tracking-widest mt-4">
              POWER &amp; HYPERTROPHY
            </p>
          </div>
          <div className="mt-6">
            <h3 className="font-condensed-heading text-4xl uppercase tracking-wide">STRENGTH</h3>
            <p className="text-blue-100 text-sm font-medium mt-1 leading-snug">
              Heavy compound lifting, barbell mechanics &amp; targeted hypertrophy protocols.
            </p>
          </div>
        </div>

        {/* Card 2: HIIT & CONDITIONING */}
        <div
          className="service-card group bg-ef-pink text-white rounded-2xl p-5 flex flex-col justify-between hover-lift relative overflow-hidden text-left transition-all duration-500 ease-out"
          data-purpose="service-hiit"
        >
          <div className="absolute -top-1 -right-1 z-20 transform rotate-12">
            <span className="bg-ef-yellow text-ef-black font-black text-xs uppercase px-3 py-1.5 shadow-md border-2 border-black inline-block">
              JOIN THE SQUAD!
            </span>
          </div>
          <div className="bg-neutral-900 rounded-xl aspect-[4/5] overflow-hidden relative shadow-inner">
            <img
              alt="HIIT Workout Session"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded text-white text-xs font-mono">
              REC ● 00:45:00
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-condensed-heading text-4xl uppercase tracking-wide">ENDURANCE</h3>
            <p className="text-pink-100 text-sm font-medium mt-1 leading-snug">
              High-intensity interval training, metabolic conditioning &amp; athletic speed.
            </p>
          </div>
        </div>

        {/* Card 3: 1-ON-1 COACHING */}
        <div
          className="service-card group bg-ef-orange text-white rounded-2xl p-5 flex flex-col justify-between hover-lift relative overflow-hidden text-left transition-all duration-500 ease-out"
          data-purpose="service-coaching"
        >
          <div className="bg-neutral-900 rounded-xl aspect-[4/5] overflow-hidden relative shadow-inner">
            <img
              alt="Personal Trainer with Athlete"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute inset-4 border-2 border-white/50 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span>9:41</span>
                <span>5G 100%</span>
              </div>
              <div className="text-center font-black text-xs bg-ef-black/70 backdrop-blur rounded py-1 tracking-wider uppercase">
                TARGET: 2,400 KCAL • 180G PROTEIN
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-condensed-heading text-4xl uppercase tracking-wide">COACHING</h3>
            <p className="text-orange-100 text-sm font-medium mt-1 leading-snug">
              Direct accountability, nutrition macros, biometric tracking &amp; weekly form audits.
            </p>
          </div>
        </div>
      </div>

      {/* Ontdek Meer / Explore Exercises CTA with Flowing Animated Squiggle */}
      <Link to="/exercise" className="group inline-flex flex-col items-center cursor-pointer">
        <div className="inline-flex items-center space-x-2 text-ef-blue font-bold text-xl">
          <span>Search 1,300+ Exercise Tutorials</span>
          <span className="bg-ef-blue text-white rounded p-1 inline-flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <svg
          className="w-48 h-5 text-ef-blue mt-1 group-hover:scale-110 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 120 18"
        >
          <path
            className="squiggle-path"
            d="M2 9 C 12 3, 20 15, 32 9 C 44 3, 52 15, 64 9 C 76 3, 84 15, 96 9 C 106 3, 114 13, 118 9"
            strokeLinecap="round"
            strokeWidth="3.5"
          />
        </svg>
      </Link>
    </section>
  );
};

export default WhatWeDo;
