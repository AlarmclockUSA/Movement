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
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Auto-advance carousel with longer interval
  useEffect(() => {
    if (messages.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [messages.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative mx-4 md:mx-8 lg:mx-12 mt-4 h-[66vh] min-h-[600px] bg-black overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl animate-pulse" />
      </div>
    );
  }

  if (error || messages.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative mx-4 md:mx-8 lg:mx-12 mt-4 h-[66vh] min-h-[600px] bg-black overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl flex items-center justify-center">
          <p className="text-white text-xl">Failed to load content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative mx-4 md:mx-8 lg:mx-12 mt-4 h-[66vh] min-h-[600px] bg-black overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl">
        {/* Background Image with Overlay */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 12, ease: "linear" }}
            >
              <img 
                src={messages[currentMessageIndex].background}
                alt="Background"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-black/60" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient Layers */}
        <motion.div 
          key={`gradient-${currentMessageIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full animate-gradient rounded-[2.5rem] md:rounded-[3rem] overflow-hidden"
          style={{
            background: 'url("/Brilliant Gradient Pack-07.jpg") no-repeat center center',
            backgroundSize: '150% 150%',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
            filter: 'blur(80px) saturate(140%)',
            transform: 'scale(1.2)'
          }}
        />
        <motion.div 
          key={`gradient-reverse-${currentMessageIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full animate-gradient-reverse rounded-[2.5rem] md:rounded-[3rem] overflow-hidden"
          style={{
            background: 'url("/Brilliant Gradient Pack-07.jpg") no-repeat center center',
            backgroundSize: '150% 150%',
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        />
        
        {/* Animated Shapes - Minimal */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-white/5 -top-[100px] -right-[100px] blur-3xl animate-pulse" 
               style={{ animationDuration: '4s' }} />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center flex flex-col items-center justify-center gap-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="flex flex-col items-center"
              >
                <h1>
                  <span 
                    className="block text-[8rem] font-bold tracking-tight text-white leading-none mb-6"
                    style={{
                      textShadow: '0 0 60px rgba(255,255,255,0.15)'
                    }}
                  >
                    {messages[currentMessageIndex].title}
                  </span>
                </h1>
                <motion.p 
                  className="text-base md:text-lg font-light leading-relaxed text-white/90 max-w-xl text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  {messages[currentMessageIndex].subtitle}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Dots */}
            <div className="flex justify-center space-x-2">
              {messages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMessageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentMessageIndex === index 
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
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

        {/* Refined Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-[26px] h-[42px] rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" 
                 style={{ animationDuration: '1.5s' }} />
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
