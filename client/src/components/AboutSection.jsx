import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollWheel from './ScrollWheel';

const AboutSection = () => {
  const [tilt1, setTilt1] = useState(-6);
  const [tilt2, setTilt2] = useState(6);

  return (
    <section className="py-24 max-w-5xl mx-auto px-6 text-center relative" id="about">
      {/* Scroll indicator wheel top-right */}
      <ScrollWheel label="ABOUT • SQUAD •" />
      <p className="font-serif italic text-2xl text-neutral-800 mb-3">
        Who we are
      </p>
      <h2 className="font-condensed-heading text-5xl sm:text-7xl text-ef-black uppercase tracking-tight mb-6">
        THE CREW &amp; COACHES OF<br />
        <span className="text-neutral-900 font-serif italic font-normal text-6xl sm:text-7xl lowercase">
          Fitzone
        </span>
      </h2>
      <p className="text-lg sm:text-xl text-neutral-700 max-w-xl mx-auto font-medium leading-relaxed mb-10">
        No boring routines. No wasted reps. We are a squad of elite coaches and athletes obsessed with pure progression. Ready to transform, before you even realize you've started.
      </p>

      {/* Action Button with Liquid Wave Hover Effect */}
      <a
        href="#trainers"
        className="btn-wave-action inline-flex items-center space-x-3 bg-ef-blue text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-ef-dark-blue shadow-lg transition-all duration-300 group"
      >
        <svg className="btn-wave-layer" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 40">
          <path
            d="M0 20 C 150 5, 250 35, 400 20 C 550 5, 650 35, 800 20 C 950 5, 1050 35, 1200 20 L 1200 40 L 0 40 Z"
            fill="#ffffff"
          />
        </svg>
        <span className="btn-icon-bounce relative z-10 inline-block bg-white text-ef-blue p-1 rounded-full">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="relative z-10">MEET OUR SQUAD</span>
      </a>

      {/* Playful Polaroid Collage with Stickers */}
      <div className="relative mt-20 max-w-2xl mx-auto min-h-[460px] flex items-center justify-center" data-purpose="team-polaroids">
        {/* Polaroid Card 1: Gym Community Floor */}
        <div
          onMouseEnter={() => setTilt1(-2)}
          onMouseLeave={() => setTilt1(-6)}
          className="polaroid-item absolute -left-2 sm:left-4 top-2 bg-white p-4 pb-12 rounded shadow-2xl z-10 w-72 sm:w-80 border border-neutral-100 polaroid-shadow cursor-pointer transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${tilt1}deg)` }}
        >
          <div className="overflow-hidden bg-neutral-900 rounded aspect-square">
            <img
              alt="Fitzone squad at workout"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
            />
          </div>
          <div className="mt-4 flex items-center justify-between px-2">
            <span className="brand-script text-2xl text-neutral-700">outside the squat rack ☀️</span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-neutral-400">fitzone 2024</span>
          </div>
        </div>

        {/* Polaroid Card 2: Crew Gear & Merch */}
        <div
          onMouseEnter={() => setTilt2(2)}
          onMouseLeave={() => setTilt2(6)}
          className="polaroid-item absolute right-0 sm:right-6 top-16 bg-white p-4 pb-12 rounded shadow-2xl z-20 w-64 sm:w-72 border border-neutral-100 polaroid-shadow cursor-pointer transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${tilt2}deg)` }}
        >
          <div className="overflow-hidden bg-ef-blue rounded aspect-square relative">
            <img
              alt="Fitzone athlete in gear"
              className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-500 hover:scale-105"
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <span className="bg-neutral-900 text-white font-black text-xs px-3 py-1 uppercase tracking-wider rounded mb-1">
                NO EXCUSES,
              </span>
              <span className="bg-ef-pink text-white font-black text-xs px-3 py-1 uppercase tracking-wider rounded">
                JUST RESULTS.
              </span>
            </div>
          </div>
          <div className="mt-4 px-2 text-left">
            <span className="brand-script text-2xl text-neutral-700">club gear ✌️</span>
          </div>
        </div>

        {/* Floating Quirky Badge Sticker: "FITZONE RUN CLUB" */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 z-30 transform -rotate-12 hover:scale-110 transition-transform cursor-pointer"
          data-purpose="sticker-badge"
        >
          <div className="bg-white border-2 border-black rounded-full px-5 py-2 shadow-lg flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-ef-pink animate-ping"></span>
            <span className="font-black text-sm tracking-tight text-black uppercase">FITZONE RUN CLUB</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
