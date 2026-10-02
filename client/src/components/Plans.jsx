import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/fetchData';
import ScrollWheel from './ScrollWheel';

const Plans = () => {
  const [dbPlans, setDbPlans] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/plan/getall-plan`);
        if (res.data && res.data.success && res.data.plans.length > 0) {
          setDbPlans(res.data.plans);
        }
      } catch (err) {
        // Fallback cards are active
      }
    };
    fetchPlans();
  }, []);

  const featuredPrograms = [
    {
      id: dbPlans[0]?._id || 'hybrid-athlete',
      name: dbPlans[0]?.planName || 'HYBRID ATHLETE',
      tag: 'STRENGTH & CONDITIONING',
      bgBorder: 'bg-ef-orange',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
      monthly: dbPlans[0]?.monthlyPlanAmount || '1,499',
      yearly: dbPlans[0]?.yearlyPlanAmount || '12,999',
      stickyTop: 'top-24 sm:top-32',
      zIndex: 'z-10',
      description: 'Engineered for functional power, stamina, and full-body athletic conditioning.',
    },
    {
      id: dbPlans[1]?._id || 'hypertrophy-beast',
      name: dbPlans[1]?.planName || 'HYPERTROPHY BEAST',
      tag: 'PURE MUSCLE SCULPTING',
      bgBorder: 'bg-ef-blue',
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop',
      monthly: dbPlans[1]?.monthlyPlanAmount || '1,999',
      yearly: dbPlans[1]?.yearlyPlanAmount || '15,999',
      stickyTop: 'top-28 sm:top-36',
      zIndex: 'z-20',
      description: 'High-volume progressive overload splits targeting maximum muscle definition.',
    },
    {
      id: dbPlans[2]?._id || 'championship-elite',
      name: dbPlans[2]?.planName || 'CHAMPIONSHIP ELITE',
      tag: '👑 VIP 1-ON-1 COACHING',
      bgBorder: 'bg-ef-yellow',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      monthly: dbPlans[2]?.monthlyPlanAmount || '2,999',
      yearly: dbPlans[2]?.yearlyPlanAmount || '24,999',
      stickyTop: 'top-32 sm:top-40',
      zIndex: 'z-30',
      description: 'Direct coach access, weekly nutrition macro audits, biometric scans, and priority facility access.',
      hasSpecialPill: true,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="bg-ef-black text-white pt-24 sm:pt-32 pb-44 px-5 relative"
      id="plans"
    >
      {/* Top right scroll wheel (Dark variant) */}
      <ScrollWheel dark={true} label="PROGRAMS • STACK •" />

      <div className="max-w-4xl mx-auto text-center">
        <p className="font-serif italic text-2xl text-neutral-300 mb-2">
          Uncompromising intensity, engineered for results.
        </p>
        <h2 className="font-condensed-heading text-6xl sm:text-8xl tracking-tight uppercase text-white mb-16">
          FLAGSHIP <span className="font-serif italic font-normal lowercase tracking-normal text-6xl sm:text-8xl text-neutral-200">programs</span>
        </h2>

        {/* Scroll-Triggered Stacking Cards Centered Container */}
        <div className="relative max-w-3xl mx-auto space-y-12 sm:space-y-16 pb-12" data-purpose="portfolio-stack">
          {featuredPrograms.map((program, idx) => (
            <article
              key={program.id || idx}
              className={`stack-card group sticky ${program.stickyTop} cursor-pointer text-left ${program.zIndex} transition-all duration-500`}
              data-index={idx}
              data-purpose="work-item"
            >
              <div
                className={`${program.bgBorder} p-3 sm:p-5 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-[1.015] border-2 border-white/10`}
              >
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
                  <img
                    alt={program.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                    src={program.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

                  {/* Top Left Tag */}
                  <div className="absolute top-4 left-5 sm:top-6 sm:left-6">
                    <span className="bg-neutral-900/90 text-white font-black px-3.5 py-1 rounded-full text-[11px] tracking-widest border border-white/20 uppercase shadow-md">
                      {program.tag}
                    </span>
                  </div>

                  {/* Top Right Price Tag */}
                  <div className="absolute top-4 right-5 sm:top-6 sm:right-6">
                    <span className="bg-black/80 backdrop-blur-md text-white font-mono text-xs sm:text-sm font-bold px-3.5 py-1 rounded-lg border border-white/10">
                      ₹{program.monthly}/mo
                    </span>
                  </div>

                  {/* Center Pink Liquid Wave Action Pill on Top Card */}
                  {program.hasSpecialPill && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        to={program.id !== 'championship-elite' ? `/plan-detail/${program.id}` : '/register'}
                        className="btn-wave-action inline-flex items-center bg-ef-pink text-white font-black text-xs sm:text-sm tracking-widest uppercase rounded shadow-2xl border-2 border-white/40 hover:scale-105 transition-transform group"
                      >
                        <svg className="btn-wave-layer" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 40">
                          <path
                            d="M0 22 C 150 8, 250 36, 400 22 C 550 8, 650 36, 800 22 C 950 8, 1050 36, 1200 22 L 1200 40 L 0 40 Z"
                            fill="#ffffff"
                          />
                        </svg>
                        <span className="relative z-10 bg-white/20 px-3 py-3 border-r border-white/25 flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="relative z-10 px-5 py-3">SELECT THIS PLAN</span>
                      </Link>
                    </div>
                  )}

                  {/* Bottom Content Area */}
                  <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 px-6 sm:px-8 flex flex-col items-center text-center">
                    <h3 className="font-condensed-heading text-4xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase drop-shadow-xl mb-1">
                      {program.name}
                    </h3>
                    <p className="text-neutral-300 text-xs sm:text-sm max-w-lg hidden sm:block font-medium">
                      {program.description}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
