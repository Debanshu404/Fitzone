import React from 'react';
import { Link } from 'react-router-dom';
import ScrollWheel from './ScrollWheel';

const Trainers = () => {
  const trainers = [
    {
      id: 1,
      name: 'MARCUS',
      scriptName: 'Marcus',
      badge: 'POWERLIFTING & STRENGTH',
      badgeColor: 'bg-amber-500',
      img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop',
      aspect: 'aspect-[4/5]',
      isCondensedTitle: true,
      containerClass: 'relative group',
    },
    {
      id: 2,
      name: 'Elena',
      scriptName: 'Elena',
      badge: 'HIIT & ENDURANCE',
      badgeColor: 'bg-ef-pink',
      img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
      aspect: 'aspect-square',
      containerClass: 'relative group md:mt-16',
      scriptColor: 'text-ef-blue',
    },
    {
      id: 3,
      name: 'Nadia',
      scriptName: 'Nadia',
      badge: 'FUNCTIONAL HYPERTROPHY',
      badgeColor: 'bg-ef-blue',
      img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop',
      aspect: 'aspect-[4/5]',
      containerClass: 'relative group md:-mt-8',
      hasSticker: true,
      stickerText: 'NO EXCUSES, JUST RESULTS.',
    },
    {
      id: 4,
      name: 'Kai',
      scriptName: 'Kai',
      badge: 'CALISTHENICS & AGILITY',
      badgeColor: 'bg-emerald-500',
      img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
      aspect: 'aspect-[4/5]',
      containerClass: 'relative group',
      scriptColor: 'text-ef-blue',
      hasPurpleBadge: true,
    },
    {
      id: 5,
      name: 'Sarah',
      scriptName: 'Sarah',
      badge: 'MOBILITY & CONDITIONING',
      badgeColor: 'bg-ef-orange',
      img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop',
      aspect: 'aspect-square',
      containerClass: 'relative group md:-mt-12',
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-5 max-w-5xl mx-auto relative" id="trainers">
      {/* Scroll indicator wheel top-right */}
      <ScrollWheel label="COACHES • CREW •" />
      {/* Brand Tag Pill */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-16 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-black italic text-lg tracking-wider border-2 border-red-700 shadow-sm">
          FZ
        </div>
      </div>

      <p className="font-serif italic text-2xl text-neutral-800">
        The master coaches of Fitzone
      </p>

      <h2 className="font-condensed-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight text-neutral-900 uppercase mb-16">
        COACH<span className="text-ef-blue">ING</span>-SQUAD
      </h2>

      {/* Irregular Editorial Grid of Trainers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start" data-purpose="team-members-grid">
        {/* Member 1: Marcus */}
        <div className="relative group">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-neutral-100 aspect-[4/5] hover-lift">
            <img
              alt="Coach Marcus"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={trainers[0].img}
            />
            <div className="absolute top-4 left-4 bg-amber-500 text-white font-extrabold px-3 py-1 rounded text-xs uppercase tracking-wider shadow">
              {trainers[0].badge}
            </div>
            <div className="absolute bottom-6 left-6">
              <span className="font-condensed-heading text-6xl text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                {trainers[0].name}
              </span>
            </div>
          </div>
        </div>

        {/* Member 2: Elena */}
        <div className="relative group md:mt-16">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-neutral-100 aspect-square hover-lift">
            <img
              alt="Coach Elena"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={trainers[1].img}
            />
            <div className="absolute top-6 left-6">
              <span className="brand-script text-6xl text-ef-blue font-black drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">
                {trainers[1].scriptName}
              </span>
            </div>
          </div>
        </div>

        {/* Member 3: Nadia */}
        <div className="relative group md:-mt-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-neutral-100 aspect-[4/5] hover-lift">
            <img
              alt="Coach Nadia"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={trainers[2].img}
            />
            <div className="absolute top-6 left-6">
              <span className="brand-script text-6xl text-white font-black drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                {trainers[2].scriptName}
              </span>
            </div>
            <div className="absolute bottom-8 right-6 transform rotate-6 hover:rotate-0 transition-transform">
              <div className="bg-emerald-500 text-white font-black text-xs uppercase px-4 py-2 rounded-xl shadow-lg border-2 border-white leading-tight">
                NO EXCUSES,<br />JUST RESULTS.
              </div>
            </div>
          </div>
        </div>

        {/* Member 4: Kai */}
        <div className="relative group">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-neutral-100 aspect-[4/5] hover-lift">
            <img
              alt="Coach Kai"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={trainers[3].img}
            />
            <div className="absolute top-8 left-8">
              <span className="brand-script text-6xl text-ef-blue font-black drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">
                {trainers[3].scriptName}
              </span>
            </div>
            <div className="absolute top-1/3 right-8 transform -rotate-12">
              <span className="bg-purple-600 text-yellow-300 font-black text-sm px-3 py-1 rounded shadow-md border-2 border-white">
                FITZONE<span className="text-white">PRO</span>
              </span>
            </div>
          </div>
        </div>

        {/* Member 5: Sarah */}
        <div className="relative group md:-mt-12">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-neutral-100 aspect-square hover-lift">
            <img
              alt="Coach Sarah"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={trainers[4].img}
            />
            <div className="absolute bottom-8 left-8">
              <span className="brand-script text-6xl text-white font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {trainers[4].scriptName}
              </span>
            </div>
          </div>
        </div>

        {/* Physical Fitness Weight Disc Object & CTA */}
        <div className="flex flex-col justify-between h-full pt-8">
          <div className="w-56 h-56 rounded-full mx-auto md:mx-0 p-2 bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-300 shadow-xl border-4 border-white flex items-center justify-center relative group hover:rotate-45 transition-transform duration-700 cursor-pointer">
            <div className="w-16 h-16 rounded-full border-4 border-neutral-400/50 bg-white flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-neutral-200"></div>
            </div>
            <div className="absolute top-6">
              <span className="brand-script text-2xl text-ef-orange font-bold">20 KG OLYMPIC</span>
            </div>
            <div className="absolute bottom-6 flex items-center space-x-1">
              <span className="bg-neutral-900 text-[9px] text-white font-black px-2 py-0.5 rounded">FZ-PRO</span>
              <span className="bg-ef-pink text-[9px] text-white font-black px-1.5 py-0.5 rounded">v.1</span>
            </div>
          </div>

          {/* Bottom Squad CTA with Animated Wave */}
          <div className="mt-12">
            <a className="group inline-flex flex-col items-start cursor-pointer" href="#contact">
              <div className="inline-flex items-center space-x-2 text-ef-blue font-bold text-xl">
                <span>Book a 1-on-1 Consultation</span>
                <span className="bg-ef-blue text-white rounded p-1 inline-flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <svg
                className="w-48 h-5 text-ef-blue mt-1 group-hover:scale-105 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 160 18"
              >
                <path
                  className="squiggle-path"
                  d="M2 9 C 14 3, 26 15, 40 9 C 54 3, 66 15, 80 9 C 94 3, 106 15, 120 9 C 134 3, 146 15, 158 9"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
