import { use } from 'react';
import { Event } from '@/types/event';
import { eventService } from '@/services/eventService';
import { format, isValid, parseISO } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

function formatDate(dateString: string | undefined) {
  if (!dateString) return 'Date TBD';
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      return 'Date TBD';
    }
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date TBD';
  }
}

function capitalizeFirstLetter(str: string | undefined) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const event = use(eventService.getEventById(resolvedParams.id));

  if (!event) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link 
            href="/events"
            className="inline-block px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-900 transition-colors"
          >
            View All Events
          </Link>
        </div>
      </div>
    );
  }

  const defaultImage = '/images/event-placeholder.jpg'; // Add a default image path

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-black">
        {event.imageUrl ? (
          <Image 
            src={event.imageUrl}
            alt={event.title || 'Event image'}
            fill
            className="object-cover opacity-70"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              {event.type && (
                <div className="inline-block px-3 py-1 bg-white text-black text-sm font-medium rounded-full mb-6">
                  {capitalizeFirstLetter(event.type)}
                </div>
              )}
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center">
                  <span className="text-lg">
                    {formatDate(event.startDate)}
                    {event.startDate !== event.endDate && event.endDate && 
                      ` - ${formatDate(event.endDate)}`
                    }
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center">
                    <span className="text-lg">
                      {capitalizeFirstLetter(event.location.type)}
                      {event.location.city && ` • ${event.location.city}`}
                      {event.location.country && `, ${event.location.country}`}
                    </span>
                  </div>
                )}
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
                          {formatDate(day.date)}
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
                        {speaker.imageUrl ? (
                          <Image 
                            src={speaker.imageUrl}
                            alt={speaker.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-200" />
                        )}
                        <div>
                          <h3 className="font-bold">{speaker.name}</h3>
                          {speaker.role && <p className="text-gray-600">{speaker.role}</p>}
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

                {event.registrationUrl && (
                  <Link
                    href={event.registrationUrl}
                    className="block w-full py-4 px-8 bg-black text-white text-center font-medium rounded-full
                             hover:bg-gray-900 transition-colors duration-300 mb-4"
                  >
                    Register Now
                  </Link>
                )}
                
                <Link
                  href="/events"
                  className="block w-full py-4 px-8 bg-white text-black text-center font-medium rounded-full
                           border border-black/10 hover:bg-gray-50 transition-colors duration-300"
                >
                  View Other Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 