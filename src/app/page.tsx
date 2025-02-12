'use client';

import Image from "next/image";
import LeadershipSection from "./components/LeadershipCarousel";
import EventsList from "./components/EventsList";
import FeaturesGrid from "./components/FeaturesGrid";
import { gatherings } from '@/data/gatherings';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useHero } from '@/hooks/useHero';
import dynamic from 'next/dynamic';
import FeaturedEvent from '@/components/FeaturedEvent';

const Globe = dynamic(() => import('./components/Globe'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[100vh] overflow-hidden flex items-center">
        {/* Gradient Background with enhanced layering */}
        <div 
          className="absolute inset-0 animate-gradient-move"
          style={{
            background: 'url("/Brilliant Gradient Pack-07.png")',
            backgroundSize: '200% 200%',
            opacity: 0.94,
            mixBlendMode: 'normal'
          }}
        />
        
        {/* Multiple overlay layers for depth */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)]" />
        </div>
        
        {/* Content */}
        <div className="relative w-full pt-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Main Content */}
              <div className="lg:col-span-7 lg:col-start-1">
                <div className="space-y-10">
                  {/* Overline with enhanced styling */}
                  <div className="inline-flex items-center space-x-3">
                    <div className="h-[1px] w-8 bg-white/30" />
                    <p className="text-white/70 uppercase tracking-[0.25em] text-sm font-medium">
                      Welcome to Brilliant Movement
                    </p>
                  </div>
                  
                  {/* Headline with refined typography */}
                  <h1 className="space-y-6">
                    <span 
                      className="block text-7xl md:text-[8.5rem] font-extralight text-white leading-[0.9] tracking-tight"
                      style={{ fontFeatureSettings: '"salt" 1, "ss01" 1' }}
                    >
                      Discover
                    </span>
                    <span 
                      className="block text-3xl md:text-5xl font-light text-white/90 leading-tight max-w-[14ch] tracking-[-0.02em]"
                      style={{ fontFeatureSettings: '"salt" 1, "ss01" 1' }}
                    >
                      the astonishing ways God is with you
                    </span>
                  </h1>
                  
                  {/* Description with improved readability */}
                  <p className="text-xl md:text-2xl text-white/75 max-w-[45ch] leading-relaxed font-light tracking-wide">
                    Join a global community of believers experiencing the constant reality of partnership with God everyday.
                  </p>

                  {/* CTA Buttons with refined styling */}
                  <div className="flex flex-col sm:flex-row gap-5 pt-4">
                    <a 
                      href="/watch" 
                      className="group inline-flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 
                                text-white px-8 py-4 rounded-full text-base font-medium
                                hover:bg-white/10 transition-all duration-300
                                hover:scale-[1.02] hover:border-white/20"
                    >
                      <span>Watch Online</span>
                      <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a 
                      href="/connect" 
                      className="group inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full 
                                text-base font-medium hover:bg-white/95 transition-all duration-300
                                hover:scale-[1.02] hover:shadow-lg hover:shadow-black/10"
                    >
                      <span>Join the Movement</span>
                      <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats/Social Proof with enhanced design */}
              <div className="lg:col-span-4 lg:col-start-9">
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] transition-colors duration-300">
                    <p className="text-6xl font-extralight text-white mb-3 tracking-tight">24+</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-white/60 text-sm tracking-wide">Countries Represented</p>
                      <div className="flex-1 h-[1px] bg-white/10" />
                    </div>
                  </div>
                  <div className="p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] hover:bg-white/[0.05] transition-colors duration-300">
                    <p className="text-6xl font-extralight text-white mb-3 tracking-tight">48</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-white/60 text-sm tracking-wide">US States Connected</p>
                      <div className="flex-1 h-[1px] bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <span className="text-white/40 text-xs uppercase tracking-[0.3em] font-light">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </div>

      <FeaturedEvent />

      {/* About Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                At Brilliant everything starts in the heart of the Father
              </h2>
              <div className="w-12 h-1 bg-black/80" />
              <p className="text-xl text-gray-700 leading-relaxed">
                This is the heart of Brilliant - a global movement discovering an astonishing truth: in Christ, you're already completely free to live from your new nature.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <p className="text-xl text-gray-700 leading-relaxed">
                We're not about trying harder or doing better; we're about awakening to who you truly are.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Around the world, this revelation is transforming communities as believers, churches, businesses, and organizations discover the joy of living from heaven's perspective.
              </p>
              <div className="space-y-6">
                <p className="text-xl text-gray-900 font-medium">Together, we're pioneering a path of:</p>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-4 text-xl text-gray-700">
                    <span className="w-2 h-2 bg-black/80 rounded-full" />
                    <span>The constant reality of His presence</span>
                  </li>
                  <li className="flex items-center space-x-4 text-xl text-gray-700">
                    <span className="w-2 h-2 bg-black/80 rounded-full" />
                    <span>The unshakeable truth of His promises</span>
                  </li>
                  <li className="flex items-center space-x-4 text-xl text-gray-700">
                    <span className="w-2 h-2 bg-black/80 rounded-full" />
                    <span>The endless kindness of His heart toward us</span>
                  </li>
                </ul>
                <p className="text-xl text-gray-700 italic mt-6">
                  - because as He is, so are you in this world.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="/news" 
                  className="inline-block bg-black text-white px-8 py-4 rounded-full 
                            text-base font-semibold hover:bg-gray-900 transition-all duration-300
                            hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 text-center"
                >
                  Movement News →
                </a>
                <a 
                  href="/events" 
                  className="inline-block bg-white text-black border border-black/10 px-8 py-4 rounded-full 
                            text-base font-semibold hover:bg-gray-50 transition-all duration-300
                            hover:scale-[1.02] hover:border-black/20 text-center"
                >
                  Event Calendar →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Leadership Section */}
      <LeadershipSection />

      {/* Monthly Gatherings Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-7xl font-bold tracking-tight">Join Us</h2>
              <h3 className="text-4xl font-serif italic">in Church Online</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join us every first Monday of the month at 4 PM Pacific time for our global gathering. Experience powerful worship, transformative teaching, and connect with a community of believers from over 24 countries and 48 US States.
              </p>
              <a 
                href="/watch" 
                className="relative overflow-hidden inline-block px-8 py-4 rounded-full text-lg font-medium button-gradient button-gradient-3"
                style={{
                  background: 'url("/Brilliant Gradient Pack-07.jpg") no-repeat center center',
                  backgroundSize: '400%',
                  filter: 'brightness(1.1)',
                  color: 'white'
                }}
              >
                Watch Online
              </a>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img 
                src="/ave-calvar-D49fXkVA2Uk-unsplash.png"
                alt="Worship gathering"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <EventsList />

      {/* CTA Section */}
      <div className="relative py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 text-gray-300">
            Be part of a movement that's changing lives around the world.
          </p>
          <a 
            href="/connect" 
            className="relative overflow-hidden inline-block px-8 py-4 rounded-full font-medium button-gradient button-gradient-4"
            style={{
              background: 'url("/Brilliant Gradient Pack-07.jpg") no-repeat center center',
              backgroundSize: '400%',
              filter: 'brightness(1.1)',
              color: 'white'
            }}
          >
            Get Connected
          </a>
        </div>
      </div>
    </div>
  );
}
