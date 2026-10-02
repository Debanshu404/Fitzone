import React, { useState } from 'react';
import ScrollWheel from './ScrollWheel';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does membership activation work after joining?',
      a: 'Instant access. Once you create your account and select a program, your dashboard unlocks 1,300+ video exercise tutorials, nutrition templates, and your personal gym access QR badge immediately.',
    },
    {
      q: 'Are the training plans beginner-friendly or for advanced athletes?',
      a: 'All programs feature tiered progression tracks. Whether you are stepping onto the gym floor for the first time or prepping for a powerlifting meet, coaches provide scaled load targets and weekly adjustments.',
    },
    {
      q: 'Can I switch or pause my subscription anytime?',
      a: 'Yes, 100% flexibility. You can upgrade, downgrade, or pause your subscription directly from your member dashboard with zero lock-in contracts or hidden fees.',
    },
    {
      q: 'Do I get direct 1-on-1 coaching support with my plan?',
      a: 'Yes! The Hybrid and Championship plans include weekly check-ins, lifting form video audits, and continuous macro target adjustments with our certified coaching staff.',
    },
    {
      q: 'What equipment do I need to follow the routines?',
      a: 'Our database and plans cover both full-facility gym equipment (barbells, racks, cables, dumbbells) and minimal-equipment bodyweight/conditioning tracks if you are traveling.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-5 max-w-4xl mx-auto relative text-center" id="faq">
      {/* Top right scroll wheel */}
      <ScrollWheel label="FAQ • ANSWERS •" />

      <p className="font-serif italic text-2xl text-neutral-800 mb-2">
        Got questions? We have answers.
      </p>

      <h2 className="font-condensed-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-ef-black mb-14">
        FREQUENTLY <span className="font-serif italic font-normal lowercase tracking-normal text-5xl sm:text-7xl lg:text-8xl text-neutral-800">asked questions</span>
      </h2>

      {/* Accordion List */}
      <div className="space-y-4 text-left">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className={`rounded-2xl border transition-all duration-300 cursor-pointer p-5 sm:p-6 ${
                isOpen
                  ? 'border-ef-blue bg-blue-50/30 shadow-md'
                  : 'border-neutral-200 bg-white hover:border-neutral-400'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-condensed-heading text-lg sm:text-xl uppercase tracking-wide text-neutral-900">
                  {faq.q}
                </h3>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-ef-blue text-white rotate-45' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  +
                </span>
              </div>

              {isOpen && (
                <p className="mt-4 text-neutral-600 font-medium text-sm sm:text-base leading-relaxed pr-8 animate-fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
