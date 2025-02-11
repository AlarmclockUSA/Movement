import Image from "next/image";
import LeadershipSection from "./components/LeadershipCarousel";
import EventsList from "./components/EventsList";
import FeaturesGrid from "./components/FeaturesGrid";
import { gatherings } from '@/data/gatherings';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative mx-4 md:mx-8 lg:mx-12 mt-4 h-[66vh] min-h-[600px] bg-black overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
          <img 
            src="/church-background.jpg" 
            alt="Church background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Gradient Layers */}
        <div 
          className="absolute inset-0 w-full h-full opacity-90 animate-gradient rounded-[2.5rem] md:rounded-[3rem] overflow-hidden"
          style={{
            background: 'url("/Brilliant Gradient Pack-07.jpg") no-repeat center center',
            backgroundSize: '150% 150%',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
            filter: 'blur(80px) saturate(140%)',
            transform: 'scale(1.2)'
          }}
        />
        <div 
          className="absolute inset-0 w-full h-full animate-gradient-reverse rounded-[2.5rem] md:rounded-[3rem] overflow-hidden"
          style={{
            background: 'url("/Brilliant Gradient Pack-07.jpg") no-repeat center center',
            backgroundSize: '150% 150%',
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
            opacity: '0.95'
          }}
        />
        
        {/* Animated Shapes - Minimal */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-white/5 -top-[100px] -right-[100px] blur-3xl animate-pulse" 
               style={{ animationDuration: '4s' }} />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-6">
            <h1 className="space-y-2">
              <span 
                className="block text-[8rem] font-bold tracking-tight text-white leading-none"
                style={{
                  textShadow: '0 0 60px rgba(255,255,255,0.15)'
                }}
              >
                Brilliant
              </span>
            </h1>
            <p className="text-base md:text-lg font-light leading-relaxed text-white/90 max-w-xl">
              A global movement of people, churches and businesses dedicated to living the life that Jesus paid for.
            </p>
            <div className="flex flex-row gap-4">
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
