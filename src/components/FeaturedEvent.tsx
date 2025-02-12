'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { eventService } from '@/services/eventService';
import { format } from 'date-fns';

export default function FeaturedEvent() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedEvent = async () => {
      try {
        const featuredEvent = await eventService.getFeaturedEvent();
        setEvent(featuredEvent);
      } catch (error) {
        console.error('Error fetching featured event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedEvent();
  }, []);

  if (loading) {
    return (
      <div className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gray-200 animate-pulse" />
            <div className="space-y-8">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="h-24 bg-gray-200 rounded animate-pulse" />
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-12 bg-gray-200 rounded-full animate-pulse w-32" />
                <div className="h-12 bg-gray-200 rounded-full animate-pulse w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) return null;

  const dateRange = event.startDate === event.endDate
    ? format(new Date(event.startDate), 'MMMM d, yyyy')
    : `${format(new Date(event.startDate), 'MMM d')} - ${format(new Date(event.endDate), 'MMM d, yyyy')}`;

  return (
    <div className="relative py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-6">
              <div className="inline-block px-3 py-1 bg-white text-black text-sm font-medium tracking-wide mb-4">
                {event.type.toUpperCase()}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h3>
              <p className="text-white/90 text-lg">
                {dateRange}
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <p className="text-xl text-gray-800 leading-relaxed">
              {event.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`/events/${event.id}`}
                className="inline-block bg-black text-white px-8 py-4 rounded-full 
                          text-base font-semibold hover:bg-gray-900 transition-all duration-300
                          hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 text-center"
              >
                View Event →
              </a>
              <a 
                href={event.registrationUrl}
                className="inline-block bg-white text-black border border-black/10 px-8 py-4 rounded-full 
                          text-base font-semibold hover:bg-gray-50 transition-all duration-300
                          hover:scale-[1.02] hover:border-black/20 text-center"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 