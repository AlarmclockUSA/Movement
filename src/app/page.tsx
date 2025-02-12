'use client';

import Image from "next/image";
import LeadershipSection from "./components/LeadershipCarousel";
import EventsList from "./components/EventsList";
import FeaturesGrid from "./components/FeaturesGrid";
import { gatherings } from '@/data/gatherings';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useHero } from '@/hooks/useHero';

export default function Home() {
  const { messages, loading, error } = useHero();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative h-[66vh] min-h-[600px] bg-black overflow-hidden shadow-2xl animate-pulse" />
      </div>
    );
  }

  if (error || messages.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative h-[66vh] min-h-[600px] bg-black overflow-hidden shadow-2xl flex items-center justify-center">
          <p className="text-white text-xl">Failed to load content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen bg-black overflow-hidden shadow-2xl">
        {/* Watermark Text */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
          <div 
            className="absolute inset-0 flex items-center justify-center transform -rotate-12"
            style={{ mixBlendMode: 'soft-light' }}
          >
            <span 
              className="text-[20vw] font-black text-white opacity-[0.07] whitespace-nowrap tracking-tighter"
              style={{ 
                textShadow: '0 0 100px rgba(255,255,255,0.1)',
                fontFamily: 'sans-serif',
                letterSpacing: '-0.05em'
              }}
            >
              BRILLIANT
            </span>
          </div>
        </div>

        {/* Background with Gradient */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Base gradient layer */}
          <div 
            className="absolute inset-0 animate-gradient-move"
            style={{
              background: 'url("/Brilliant Gradient Pack-07.png")',
              opacity: 0.9,
              mixBlendMode: 'normal'
            }}
          />
          
          {/* Overlay gradient layer 1 */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20"
            style={{ mixBlendMode: 'overlay' }}
          />

          {/* Overlay gradient layer 2 */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-purple-900/10"
            style={{ mixBlendMode: 'color' }}
          />

          {/* Subtle light overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
              mixBlendMode: 'overlay'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center flex flex-col items-center justify-center gap-12 -mt-20">
            <div className="flex flex-col items-center">
              <h1>
                <span 
                  className="block text-[4.5rem] md:text-[5.5rem] font-bold tracking-tight text-white leading-[1.1] mb-6 max-w-[14ch]"
                  style={{
                    textShadow: '0 0 60px rgba(255,255,255,0.15)'
                  }}
                >
                  Discover God's extraordinary ways of being with you
                </span>
              </h1>
            </div>

            <div className="flex justify-center gap-4">
              <a 
                href="/watch" 
                className="inline-block bg-white text-black px-8 py-4 rounded-full 
                          text-base font-semibold hover:bg-white/90 transition-all duration-300
                          hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10"
              >
                WATCH ONLINE
              </a>
              <a
                href="/connect" 
                className="inline-block bg-black text-white border border-white/20 px-8 py-4 rounded-full 
                          text-base font-semibold hover:bg-black/80 transition-all duration-300
                          hover:scale-[1.02] hover:border-white/30"
              >
                JOIN THE MOVEMENT
              </a>
            </div>
          </div>
        </div>

        {/* Upcoming Gatherings */}
        <div className="absolute bottom-12 right-4 md:right-8 text-white">
          <div className="text-right">
            <h3 className="text-lg font-medium mb-2">Next Movement Gathering</h3>
            <div className="flex space-x-4">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">{gatherings[0].day} {gatherings[0].time}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">VIRTUAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the sections */}
      {/* Mission Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe that at its core, the gospel is about the Kind Intentions of God towards you. 
              The movement consists of three separate entities unified around a central goal: 
              Activating the Kingdom in the world around us.
            </p>
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
