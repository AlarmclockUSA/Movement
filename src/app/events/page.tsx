'use client';

import { useEvents } from '@/hooks/useEvents';
import Link from 'next/link';

export default function EventsPage() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-red-500">Failed to load events. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Events Calendar</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Join us for transformative gatherings, conferences, and workshops happening around the globe.
          </p>
        </div>
      </div>

      {/* Calendar View */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-16">
            {/* Group events by month */}
            {Object.entries(events.reduce((acc, event) => {
              const month = event.date.month;
              if (!acc[month]) acc[month] = [];
              acc[month].push(event);
              return acc;
            }, {} as Record<string, typeof events>)).map(([month, monthEvents]) => (
              <div key={month} className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-3xl font-bold mb-8">{month}</h2>
                <div className="space-y-6">
                  {monthEvents.map((event) => (
                    <Link 
                      href={`/events/${event.id}`}
                      key={event.id}
                      className="group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-8">
                        {/* Date */}
                        <div className="w-24 h-24 bg-white rounded-xl flex flex-col items-center justify-center shadow-sm">
                          <span className="text-3xl font-bold">{event.date.day}</span>
                          <span className="text-gray-500 text-sm">{event.date.month}</span>
                        </div>
                        {/* Event Details */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-2">{event.time}</p>
                          <p className="text-gray-500">{event.description}</p>
                        </div>
                        {/* Arrow */}
                        <div className="transform translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 