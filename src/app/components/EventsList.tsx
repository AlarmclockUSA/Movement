'use client';

import { useEvents } from '@/hooks/useEvents';
import Link from 'next/link';

export default function EventsList() {
  const { events, loading, error } = useEvents(5);

  if (loading) {
    return (
      <div className="py-24 bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-lg font-medium mb-2">Join Us</h3>
            <h2 className="text-6xl font-bold tracking-tight mb-8">Upcoming Events</h2>
            <div className="animate-pulse space-y-6">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-32 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-lg font-medium mb-2">Join Us</h3>
            <h2 className="text-6xl font-bold tracking-tight mb-8">Upcoming Events</h2>
            <p className="text-red-500">Failed to load events. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-[#f5f5f3]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h3 className="text-lg font-medium mb-2">Join Us</h3>
          <h2 className="text-6xl font-bold tracking-tight mb-8">Upcoming Events</h2>
          <a 
            href="/events" 
            className="relative overflow-hidden inline-block px-8 py-4 rounded-full text-lg font-medium button-gradient button-gradient-2"
            style={{
              background: 'url("/Brilliant Gradient Pack-07.jpg") no-repeat center center',
              backgroundSize: '400%',
              filter: 'brightness(1.1)',
              color: 'white'
            }}
          >
            SEE ALL EVENTS
          </a>
        </div>

        <div className="space-y-6">
          {events.map((event) => {
            // Determine if this should be a Link or anchor based on routing
            const EventWrapper = ({ children }: { children: React.ReactNode }) => {
              // Default to using the default event page if routing is not specified
              const useDefault = event.routing?.useDefault ?? true;
              const externalUrl = event.routing?.externalUrl;

              if (useDefault) {
                return (
                  <Link href={`/events/${event.id}`} className="block">
                    {children}
                  </Link>
                );
              }
              return (
                <a 
                  href={externalUrl || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  {children}
                </a>
              );
            };

            return (
              <EventWrapper key={event.id}>
                <div className="group flex items-center justify-between py-6 border-t border-gray-200 hover:bg-white transition-colors duration-300 px-4 -mx-4">
                  <div className="flex items-center space-x-12">
                    <div className="w-24 text-center">
                      <div className="text-4xl font-bold">{event.date.day}</div>
                      <div className="text-sm text-gray-500 uppercase">{event.date.month}</div>
                    </div>
                    <div className="max-w-xl">
                      <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                      <p className="text-gray-600 mb-2">{event.time}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                  <div className="transform translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </div>
                </div>
              </EventWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
} 