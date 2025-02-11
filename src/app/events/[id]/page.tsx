'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Event } from '@/types/event';
import Link from 'next/link';

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventDoc = await getDoc(doc(db, 'events', params.id));
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() } as Event);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-12"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {error || 'Event not found'}
            </h1>
            <Link 
              href="/events" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              View all events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] bg-black">
        {event.image ? (
          <img
            src={event.image.url}
            alt={event.image.alt}
            className="w-full h-full object-cover opacity-70"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-70" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex items-center space-x-6 text-lg">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {event.date.month} {event.date.day}
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.time}
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {event.location.type.charAt(0).toUpperCase() + event.location.type.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">About This Event</h2>
              <p className="text-gray-600 mb-8">
                {event.longDescription || event.description}
              </p>

              {event.speakers && event.speakers.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold mb-4">Speakers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        {speaker.image && (
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h4 className="font-medium">{speaker.name}</h4>
                          {speaker.role && (
                            <p className="text-gray-600 text-sm">{speaker.role}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Event Details</h3>
              
              {/* Location Details */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Location</h4>
                {event.location.type === 'online' ? (
                  <p className="text-gray-600">
                    This is an online event. Link will be provided after registration.
                  </p>
                ) : (
                  <div className="text-gray-600">
                    {event.location.address && <p>{event.location.address}</p>}
                    {event.location.city && event.location.state && (
                      <p>{event.location.city}, {event.location.state} {event.location.zipCode}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Registration Details */}
              {event.registration && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Registration</h4>
                  {event.registration.deadline && (
                    <p className="text-gray-600 mb-2">
                      Registration closes on{' '}
                      {new Date(event.registration.deadline).toLocaleDateString()}
                    </p>
                  )}
                  {event.registration.capacity && (
                    <p className="text-gray-600 mb-4">
                      Limited to {event.registration.capacity} attendees
                    </p>
                  )}
                </div>
              )}

              {/* Action Button */}
              {!event.routing.useDefault ? (
                <a
                  href={event.routing.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-black text-white px-6 py-3 rounded-full text-center font-medium hover:bg-gray-800 transition-colors inline-block"
                >
                  Register Now
                </a>
              ) : event.registration?.url ? (
                <Link
                  href={event.registration.url}
                  className="w-full bg-black text-white px-6 py-3 rounded-full text-center font-medium hover:bg-gray-800 transition-colors inline-block"
                >
                  Register Now
                </Link>
              ) : (
                <Link
                  href={`/watch`}
                  className="w-full bg-black text-white px-6 py-3 rounded-full text-center font-medium hover:bg-gray-800 transition-colors inline-block"
                >
                  Learn More
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 