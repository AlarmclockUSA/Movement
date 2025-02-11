'use client';

import { useRef } from 'react';

export default function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-24 bg-gray-50 overflow-hidden relative">
      <div className="px-8">
        {/* Navigation Arrows */}
        <button 
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button 
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/80 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div ref={containerRef} className="flex overflow-x-auto pb-8 space-x-6 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {/* Gatherings */}
          <div className="group relative overflow-hidden rounded-2xl w-[400px] flex-shrink-0 h-[500px] feature-box-gradient bg-[#1a1a1a] snap-start">
            <div className="feature-box-content">
              <img 
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"
                alt="Monthly Gatherings" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <h3 className="text-3xl font-bold text-white mb-3">Monthly Gatherings</h3>
                <p className="text-gray-300 mb-6 text-lg">Experience powerful worship and teaching every first Monday</p>
                <a href="/gatherings" className="inline-flex items-center text-white font-medium text-lg hover:opacity-80 transition-opacity">
                  Join Us <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Small Groups */}
          <div className="group relative overflow-hidden rounded-2xl w-[400px] flex-shrink-0 h-[500px] feature-box-gradient bg-[#1a1a1a] snap-start">
            <div className="feature-box-content">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2574&auto=format&fit=crop"
                alt="Small Groups" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <h3 className="text-3xl font-bold text-white mb-3">Small Groups</h3>
                <p className="text-gray-300 mb-6 text-lg">Connect deeply in our intimate online communities</p>
                <a href="/groups" className="inline-flex items-center text-white font-medium text-lg hover:opacity-80 transition-opacity">
                  Find Your Group <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Brilliant Plus */}
          <div className="group relative overflow-hidden rounded-2xl w-[400px] flex-shrink-0 h-[500px] feature-box-gradient bg-[#1a1a1a] snap-start">
            <div className="feature-box-content">
              <img 
                src="https://images.unsplash.com/photo-1501516069922-a9982bd6f3bd?q=80&w=2574&auto=format&fit=crop"
                alt="Brilliant Plus" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <h3 className="text-3xl font-bold text-white mb-3">Brilliant Plus</h3>
                <p className="text-gray-300 mb-6 text-lg">Daily devotionals and spiritual growth resources</p>
                <a href="/plus" className="inline-flex items-center text-white font-medium text-lg hover:opacity-80 transition-opacity">
                  Start Your Journey <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Live Events */}
          <div className="group relative overflow-hidden rounded-2xl w-[400px] flex-shrink-0 h-[500px] feature-box-gradient bg-[#1a1a1a] snap-start">
            <div className="feature-box-content">
              <img 
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2670&auto=format&fit=crop"
                alt="Live Events" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <h3 className="text-3xl font-bold text-white mb-3">Live Events</h3>
                <p className="text-gray-300 mb-6 text-lg">Transformative conferences and workshops</p>
                <a href="/events" className="inline-flex items-center text-white font-medium text-lg hover:opacity-80 transition-opacity">
                  View Calendar <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Business */}
          <div className="group relative overflow-hidden rounded-2xl w-[400px] flex-shrink-0 h-[500px] feature-box-gradient bg-[#1a1a1a] snap-start">
            <div className="feature-box-content">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
                alt="Business" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <h3 className="text-3xl font-bold text-white mb-3">Business</h3>
                <p className="text-gray-300 mb-6 text-lg">Kingdom principles for marketplace leaders</p>
                <a href="/business" className="inline-flex items-center text-white font-medium text-lg hover:opacity-80 transition-opacity">
                  Learn More <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 