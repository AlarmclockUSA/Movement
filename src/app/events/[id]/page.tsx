'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types/event';
import { eventService } from '@/services/eventService';
import { format } from 'date-fns';

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await eventService.getEventById(params.id);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-[400px] bg-gray-100 rounded-2xl mb-12" />
            <div className="h-12 bg-gray-100 w-2/3 mb-6" />
            <div className="h-6 bg-gray-100 w-1/3 mb-12" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-100 w-full" />
              <div className="h-4 bg-gray-100 w-5/6" />
              <div className="h-4 bg-gray-100 w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <a 
            href="/events"
            className="inline-block px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-colors"
          >
            View All Events
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-black">
        <img 
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 bg-white text-black text-sm font-medium rounded-full mb-6">
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center">
                  <span className="text-lg">
                    {format(new Date(event.startDate), 'MMMM d, yyyy')}
                    {event.startDate !== event.endDate && 
                      ` - ${format(new Date(event.endDate), 'MMMM d, yyyy')}`
                    }
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg">
                    {event.location.type.charAt(0).toUpperCase() + event.location.type.slice(1)}
                    {event.location.city && ` • ${event.location.city}`}
                    {event.location.country && `, ${event.location.country}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">About This Event</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
              </div>

              {event.schedule && event.schedule.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">Schedule</h2>
                  <div className="space-y-8">
                    {event.schedule.map((day, index) => (
                      <div key={index}>
                        <h3 className="text-xl font-bold mb-4">
                          {format(new Date(day.date), 'EEEE, MMMM d')}
                        </h3>
                        <div className="space-y-4">
                          {day.sessions.map((session, sessionIndex) => (
                            <div 
                              key={sessionIndex}
                              className="flex gap-6 p-4 rounded-lg bg-gray-50"
                            >
                              <div className="w-24 font-medium">{session.time}</div>
                              <div>
                                <div className="font-medium">{session.title}</div>
                                {session.speaker && (
                                  <div className="text-gray-600 mt-1">{session.speaker}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.speakers && event.speakers.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">Speakers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {event.speakers.map((speaker) => (
                      <div key={speaker.id} className="flex gap-4">
                        <img 
                          src={speaker.imageUrl}
                          alt={speaker.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold">{speaker.name}</h3>
                          <p className="text-gray-600">{speaker.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Registration Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Registration</h3>
                {event.price ? (
                  <div className="text-3xl font-bold mb-6">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: event.price.currency
                    }).format(event.price.amount)}
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-gray-700 mb-6">Free Event</div>
                )}
                
                {event.capacity && (
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-600 mb-2">Capacity</div>
                    <div className="text-lg font-medium">{event.capacity} attendees</div>
                  </div>
                )}

                <a
                  href={event.registrationUrl}
                  className="block w-full py-4 px-8 bg-black text-white text-center font-medium rounded-full
                           hover:bg-gray-900 transition-colors duration-300 mb-4"
                >
                  Register Now
                </a>
                
                <a
                  href="/events"
                  className="block w-full py-4 px-8 bg-white text-black text-center font-medium rounded-full
                           border border-black/10 hover:bg-gray-50 transition-colors duration-300"
                >
                  View Other Events
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 