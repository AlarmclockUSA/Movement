import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brilliant Movement",
  description: "For God. For People. For the City. For the World.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <a href="/" className="h-10">
                  <img 
                    src="/Brilliant_Full-Color_Dark.png"
                    alt="Brilliant"
                    className="h-full w-auto"
                  />
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="/about" className="text-sm font-medium hover:text-gray-600 transition-colors">About</a>
                <a href="/church" className="text-sm font-medium hover:text-gray-600 transition-colors">Church</a>
                <a href="/leadership" className="text-sm font-medium hover:text-gray-600 transition-colors">Leadership</a>
                <a href="/give" className="text-sm font-medium hover:text-gray-600 transition-colors">Give</a>
                <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Watch Online
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="pt-20">{children}</main>
        
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
