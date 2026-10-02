import React from 'react';
import ScrollWheel from './ScrollWheel';

const Reviews = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marcus K.',
      title: 'Member for 14 Months',
      badge: '-14 KG FAT LOSS',
      badgeColor: 'bg-ef-pink text-white',
      quote:
        '“The atmosphere at Fitzone is electric. The programming took all the guesswork out of my lifting. In 6 months I hit PRs I thought were impossible.”',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      scriptNote: 'pure discipline 🔥',
    },
    {
      id: 2,
      name: 'Sarah L.',
      title: 'Hybrid Shred Athlete',
      badge: '+5.5 KG LEAN MASS',
      badgeColor: 'bg-ef-blue text-white',
      quote:
        '“Hands down the best coaching community. The nutrition advice and tailored HIIT splits completely changed my energy levels and endurance.”',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
      scriptNote: 'unstoppable vibes ⚡',
    },
    {
      id: 3,
      name: 'David Chen',
      title: 'Powerlifting Competitor',
      badge: '220KG DEADLIFT PR',
      badgeColor: 'bg-ef-orange text-white',
      quote:
        '“Top-tier equipment and coaches that actually understand biomechanics. If you are serious about strength, there is nowhere else to train.”',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      scriptNote: 'heavy weight 👑',
    },
    {
      id: 4,
      name: 'Emma Watson',
      title: 'Run Club & Conditioning',
      badge: 'FIRST SUB-4HR MARATHON',
      badgeColor: 'bg-emerald-500 text-white',
      quote:
        '“Joined the Fitzone Run Club on a whim. The Saturday intervals and strength mobility routines got me across my first marathon finish line pain-free.”',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
      scriptNote: 'run club squad 🏃‍♀️',
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-5 max-w-6xl mx-auto relative text-center" id="reviews">
      {/* Scroll indicator wheel top-right */}
      <ScrollWheel label="REVIEWS • STORIES •" />

      <p className="font-serif italic text-2xl text-neutral-800 mb-2">
        Real stories from the floor
      </p>

      <h2 className="font-condensed-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-ef-black mb-16">
        ATHLETE <span className="font-serif italic font-normal lowercase tracking-normal text-5xl sm:text-7xl lg:text-8xl text-neutral-800">reviews</span>
      </h2>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white border-2 border-neutral-100 rounded-2xl p-7 shadow-xl hover-lift flex flex-col justify-between relative group transition-all duration-300"
          >
            <div>
              {/* Top Row: Athlete Profile & Badge */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-ef-blue/30 shadow-md">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-condensed-heading text-xl uppercase tracking-wide text-neutral-900">
                      {t.name}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      {t.title}
                    </p>
                  </div>
                </div>

                {/* Achievement Badge */}
                <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${t.badgeColor}`}>
                  {t.badge}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-3 text-ef-yellow">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-medium">
                {t.quote}
              </p>
            </div>

            {/* Bottom handwritten note */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="brand-script text-xl text-neutral-500">
                {t.scriptNote}
              </span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                VERIFIED MEMBER
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
