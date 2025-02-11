'use client';

import { useRef } from 'react';
import { useFeatures } from '@/hooks/useFeatures';
import Link from 'next/link';

export default function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { features, loading, error } = useFeatures();

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

  if (loading) {
    return (
      <div className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="px-8">
          <div className="flex overflow-x-auto pb-8 space-x-6 no-scrollbar">
            {[1, 2, 3].map((index) => (
              <div key={index} className="w-[400px] flex-shrink-0 h-[500px] animate-pulse">
                <div className="h-full bg-gray-200 rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="px-8">
          <div className="text-center text-gray-600">
            Failed to load features. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  if (features.length === 0) {
    return null;
  }

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
          {features.map((feature) => (
            <div key={feature.id} className="group relative overflow-hidden rounded-2xl w-[400px] flex-shrink-0 h-[500px] feature-box-gradient bg-[#1a1a1a] snap-start">
              <div className="feature-box-content">
                <img 
                  src={feature.image.url}
                  alt={feature.image.alt} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <h3 className="text-3xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 mb-6 text-lg">{feature.description}</p>
                  <Link 
                    href={feature.link.url} 
                    className="inline-flex items-center text-white font-medium text-lg hover:opacity-80 transition-opacity"
                  >
                    {feature.link.text} <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 