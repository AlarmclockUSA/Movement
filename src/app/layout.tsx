'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled past the hero section (90vh)
      const scrolled = window.scrollY > window.innerHeight * 0.9;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'nav-scrolled' : ''}`}>
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[8px] transition-colors duration-300" />
          <div className={`absolute inset-0 transition-colors duration-300 ${
            isScrolled ? 'bg-gradient-to-b from-white/[0.12] to-white/[0.08]' : 'bg-gradient-to-b from-black/[0.02] to-transparent'
          }`} />
          <div className={`absolute inset-0 border-b transition-colors duration-300 ${
            isScrolled ? 'border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : 'border-white/[0.05]'
          }`} />
          
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <a href="/" className="h-10 relative group">
                  <img 
                    src={isScrolled ? "/Brilliant_Full-Color_Dark.png" : "/Brilliant_Full-Color_White.png"}
                    alt="Brilliant"
                    className="h-full w-auto transition-all duration-300 group-hover:brightness-110"
                  />
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a 
                  href="/about" 
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isScrolled ? 'text-gray-800/80 hover:text-gray-900' : 'text-white/90 hover:text-white'
                  }`}
                >
                  About
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-gradient-to-r from-gray-900/80 to-gray-900/60' : 'bg-gradient-to-r from-white to-white/80'
                  }`} />
                </a>
                <a 
                  href="/church" 
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isScrolled ? 'text-gray-800/80 hover:text-gray-900' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Church
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-gradient-to-r from-gray-900/80 to-gray-900/60' : 'bg-gradient-to-r from-white to-white/80'
                  }`} />
                </a>
                <a 
                  href="/leadership" 
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isScrolled ? 'text-gray-800/80 hover:text-gray-900' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Leadership
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-gradient-to-r from-gray-900/80 to-gray-900/60' : 'bg-gradient-to-r from-white to-white/80'
                  }`} />
                </a>
                <a 
                  href="/give" 
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isScrolled ? 'text-gray-800/80 hover:text-gray-900' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Give
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-gradient-to-r from-gray-900/80 to-gray-900/60' : 'bg-gradient-to-r from-white to-white/80'
                  }`} />
                </a>
                <a 
                  href="/watch"
                  className="relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 group"
                >
                  <span className="relative z-10 text-white">Watch Online</span>
                  <div className={`absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-[1.02] ${
                    isScrolled ? 'bg-black' : 'bg-white/10 backdrop-blur-sm'
                  }`} />
                  <div className={`absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                    isScrolled ? 'bg-gradient-to-r from-black/80 to-gray-900' : 'bg-white/20'
                  }`} />
                </a>
              </div>
              <div className="md:hidden flex items-center">
                <button className={`p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled ? 'hover:bg-black/5' : 'hover:bg-white/10'
                }`}>
                  <svg 
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isScrolled ? 'text-gray-900' : 'text-white'
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <main>{children}</main>
        
        <footer className="bg-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="text-lg font-bold mb-6">Our House</h3>
                <ul className="space-y-4">
                  <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="/beliefs" className="text-gray-300 hover:text-white transition-colors">Our Beliefs</a></li>
                  <li><a href="/leadership" className="text-gray-300 hover:text-white transition-colors">Our Leadership</a></li>
                  <li><a href="/careers" className="text-gray-300 hover:text-white transition-colors">Join Our Team</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-6">The Movement</h3>
                <ul className="space-y-4">
                  <li><a href="/church" className="text-gray-300 hover:text-white transition-colors">Church</a></li>
                  <li><a href="/leadership" className="text-gray-300 hover:text-white transition-colors">School of Leadership</a></li>
                  <li><a href="/plus" className="text-gray-300 hover:text-white transition-colors">Brilliant Plus</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-6">Resources</h3>
                <ul className="space-y-4">
                  <li><a href="/sermons" className="text-gray-300 hover:text-white transition-colors">Watch Messages</a></li>
                  <li><a href="/groups" className="text-gray-300 hover:text-white transition-colors">Join a Group</a></li>
                  <li><a href="/give" className="text-gray-300 hover:text-white transition-colors">Give</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-6">Stay Connected</h3>
                <p className="text-gray-300 mb-4">Sign up for updates and news from Brilliant Movement.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-full w-full focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-black px-6 py-2 rounded-r-full font-medium hover:bg-gray-200 transition-colors">
                    →
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-sm">© 2024 Brilliant Movement. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
