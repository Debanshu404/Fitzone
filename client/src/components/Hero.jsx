import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import ScrollWheel from './ScrollWheel';

const Hero = () => {
  const { auth } = useAuth();
  const [activeFrame, setActiveFrame] = useState(0);
  const scrubberRef = useRef(null);

  const frames = [
    {
      id: 0,
      tag: 'FRAME 01 • STRENGTH',
      tagBg: 'bg-ef-blue text-white',
      title: 'Power & Hypertrophy',
      // High-energy gym illustration / SVG
      type: 'svg',
    },
    {
      id: 1,
      tag: 'FRAME 02 • INTENSITY',
      tagBg: 'bg-ef-pink text-white',
      title: 'HIIT & Endurance',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      overlay: 'bg-blue-900/40 mix-blend-multiply',
    },
    {
      id: 2,
      tag: 'FRAME 03 • AGILITY',
      tagBg: 'bg-ef-yellow text-ef-black',
      title: 'Dynamic Athleticism',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
      overlay: 'bg-ef-orange/30 mix-blend-overlay',
    },
    {
      id: 3,
      tag: 'FRAME 04 • COMMUNITY',
      tagBg: 'bg-ef-blue text-white',
      title: 'Fitzone Squad & Crew',
      img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop',
      overlay: 'bg-ef-blue/30 mix-blend-color',
    },
  ];

  const handleMouseMove = (e) => {
    if (!scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, x / rect.width));
    const nextIndex = Math.min(frames.length - 1, Math.floor(progress * frames.length));
    setActiveFrame(nextIndex);
  };

  const handleMouseLeave = () => {
    setActiveFrame(0);
  };

  const tickerItems = [
    { text: 'HIGH INTENSITY WORKOUTS', color: 'text-ef-blue' },
    { text: "PERSONALIZED PLANS & NUTRITION", color: 'text-ef-pink' },
    { text: 'TRANSFORM YOUR PHYSIQUE', color: 'text-ef-orange' },
    { text: 'NO EXCUSES, JUST RESULTS', color: 'text-ef-blue' },
    { text: 'FITZONE RUN CLUB', isPill: true },
    { text: 'PRO CERTIFIED COACHES', color: 'text-ef-pink' },
    { text: 'STATE-OF-THE-ART GEAR', color: 'text-ef-blue' },
  ];

  return (
    <section className="pt-8 pb-16 md:pb-20 text-center flex flex-col items-center overflow-hidden relative">
      {/* Scroll indicator wheel top-right */}
      <ScrollWheel label="FITZONE • SCROLL •" />

      <div className="max-w-4xl mx-auto px-4 w-full flex flex-col items-center">
        {/* Interactive Image Sequence Container (Scrubs smoothly as cursor moves left to right) */}
        <div
          ref={scrubberRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          id="interactive-scrubber"
          data-purpose="hero-scrubber"
          className="w-full max-w-sm sm:max-w-md aspect-[1.12/1] rounded-2xl overflow-hidden shadow-2xl relative mb-10 bg-neutral-900 border-4 border-white cursor-ew-resize group select-none transition-all duration-300 hover:shadow-blue-500/20"
        >
          {/* Frame 1: Stylized Gym Vector Art */}
          <div
            className={`scrubber-frame absolute inset-0 transition-opacity duration-300 ${
              activeFrame === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <svg className="w-full h-full object-cover" viewBox="0 0 500 450" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gymGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#0038ff" />
                  <stop offset="100%" stopColor="#001880" />
                </linearGradient>
                <linearGradient id="neonGlow" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#f5ec78" />
                  <stop offset="100%" stopColor="#ff3e75" />
                </linearGradient>
              </defs>
              <rect fill="url(#gymGrad)" height="450" width="500" />
              
              {/* Gym Squat Rack & Weight Stack Elements */}
              <g transform="translate(100, 45)">
                <line stroke="#f5ec78" strokeLinecap="round" strokeWidth="8" x1="150" x2="80" y1="210" y2="340" />
                <line stroke="#f5ec78" strokeLinecap="round" strokeWidth="8" x1="150" x2="220" y1="210" y2="340" />
                <line stroke="#ff5a22" strokeLinecap="round" strokeWidth="6" x1="150" x2="150" y1="210" y2="330" />
                
                {/* Weight plate display */}
                <rect fill="url(#neonGlow)" height="210" rx="14" stroke="#ffffff" strokeWidth="5" width="300" x="0" y="0" />
                <circle cx="250" cy="55" fill="#ff3e75" r="24" />
                <circle cx="65" cy="40" fill="#ffffff" opacity="0.8" r="14" />
                <circle cx="160" cy="50" fill="#ffffff" r="5" />
                <circle cx="210" cy="90" fill="#ffffff" r="3" />
                <text x="35" y="120" fill="#111111" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="32" letterSpacing="-1">
                  FITZONE 24/7
                </text>
                <text x="35" y="155" fill="#111111" fontFamily="'Instrument Serif', serif" fontStyle="italic" fontSize="22">
                  power • endurance • grit
                </text>
              </g>

              {/* Athletic Silhouette shapes */}
              <g transform="translate(60, 160)">
                <ellipse cx="140" cy="190" fill="#111111" rx="90" ry="45" />
                <path d="M90 200 C 90 150, 130 135, 175 150 C 200 160, 215 200, 195 240 Z" fill="#ff3e75" />
                <circle cx="190" cy="130" fill="#f5ec78" r="28" />
              </g>
              <g transform="translate(260, 180)">
                <ellipse cx="65" cy="160" fill="#ff5a22" rx="42" ry="50" />
                <circle cx="65" cy="90" fill="#ffffff" r="24" />
              </g>
            </svg>
          </div>

          {/* Frame 2, 3, 4: High Quality Photographic Cuts */}
          {frames.slice(1).map((frame) => (
            <div
              key={frame.id}
              className={`scrubber-frame absolute inset-0 transition-opacity duration-300 ${
                activeFrame === frame.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img alt={frame.title} className="w-full h-full object-cover" src={frame.img} />
              <div className={`absolute inset-0 ${frame.overlay}`} />
              <div
                className={`absolute top-4 left-4 ${frame.tagBg} font-black text-[10px] tracking-widest uppercase px-2.5 py-1 rounded shadow-md`}
              >
                {frame.tag}
              </div>
            </div>
          ))}

          {/* Interactive Hint & Progress Indicators at Bottom of card */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
            <span className="bg-black/75 backdrop-blur-sm text-[10px] font-black text-white px-2.5 py-1 rounded tracking-wider uppercase flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ef-pink animate-ping"></span>
              <span>SCRUB MOUSE TO EXPLORE</span>
            </span>

            {/* Scrubber dots indicator */}
            <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
              {frames.map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full transition-all duration-200 ${
                    activeFrame === i ? 'w-3 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Subtitle & Giant Impact Headline */}
        <p className="text-xl sm:text-2xl font-serif text-neutral-800 italic mb-3">
          Daily coaching, elite workouts &amp; unstoppable community
        </p>

        <h1 className="font-condensed-heading text-5xl sm:text-7xl lg:text-8xl tracking-tighter uppercase text-ef-black mb-8 leading-[0.9]">
          BRING YOUR PHYSIQUE<br />
          <span className="font-serif italic font-normal lowercase tracking-normal text-6xl sm:text-8xl lg:text-9xl text-neutral-900 block mt-1">
            in motion
          </span>
        </h1>

        {/* Ontdek Meer / Explore Plans CTA with Flowing Animated Squiggle */}
        <a
          href="#plans"
          className="group inline-flex flex-col items-center mt-2 cursor-pointer"
          data-purpose="scroll-trigger"
        >
          <div className="inline-flex items-center space-x-2 text-ef-blue font-bold text-lg">
            <span>Explore Plans &amp; Workouts</span>
            <span className="bg-ef-blue text-white rounded p-1 inline-flex items-center justify-center transform group-hover:translate-y-1 transition-transform">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          {/* Animated hand-drawn vector wave */}
          <svg
            className="w-36 h-5 text-ef-blue mt-1 group-hover:scale-110 transition-transform duration-300"
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
        </a>

        {/* Quick Auth buttons for visitors */}
        {!auth?.user && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn-wave-action inline-flex items-center space-x-2 bg-ef-blue text-white px-7 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-ef-dark-blue shadow-lg transition-all duration-300 group"
            >
              <svg className="btn-wave-layer" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 40">
                <path
                  d="M0 20 C 150 5, 250 35, 400 20 C 550 5, 650 35, 800 20 C 950 5, 1050 35, 1200 20 L 1200 40 L 0 40 Z"
                  fill="#ffffff"
                />
              </svg>
              <span className="relative z-10">JOIN FITZONE</span>
              <span className="btn-icon-bounce relative z-10">→</span>
            </Link>
            <Link
              to="/exercise"
              className="inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase border border-gray-300 px-6 py-3 rounded-full hover:border-ef-blue hover:text-ef-blue transition-all duration-300"
            >
              <span>BROWSE 1300+ EXERCISES</span>
            </Link>
          </div>
        )}
      </div>

      {/* Moving Train Ticker Marquee */}
      <div className="w-full mt-14 mb-4 py-3 train-ticker-wrapper select-none border-y border-neutral-100 bg-white" data-purpose="home-train-marquee">
        <div className="flex whitespace-nowrap animate-train-marquee">
          {[1, 2, 3, 4].map((unit) => (
            <div key={unit} className="flex items-center space-x-6 mx-4">
              {tickerItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {item.isPill ? (
                    <span className="text-xs sm:text-sm font-black uppercase tracking-[0.22em] px-2.5 py-0.5 rounded-full border border-black/15 text-neutral-900 bg-neutral-50 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ef-pink animate-ping"></span> {item.text}
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.22em] text-neutral-900 flex items-center gap-2">
                      <span className={`${item.color} text-base`}>✦</span> {item.text}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Brand Partner Logo Strip */}
      <div className="w-full mt-8 border-y border-neutral-100 py-8 bg-white" data-purpose="partner-logos">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center sm:justify-between gap-8 md:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="text-2xl font-black text-ef-blue tracking-tighter uppercase flex items-center">
            <span className="w-3.5 h-3.5 rounded-full bg-ef-blue mr-2"></span>
            GYMSHARK
          </div>
          <div className="text-2xl font-black italic text-ef-blue tracking-wider">
            NIKE ATHLETICS
          </div>
          <div className="text-2xl font-extrabold text-ef-blue tracking-tight flex items-center space-x-1">
            <span className="w-3 h-3 border-2 border-dashed border-ef-blue rounded-full inline-block"></span>
            <span>UNDER ARMOUR</span>
          </div>
          <div className="text-2xl font-black tracking-widest text-ef-blue uppercase">
            ELEIKO
          </div>
          <div className="text-xl font-black text-ef-blue tracking-tight">
            OPTIMUM NUTRITION
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
