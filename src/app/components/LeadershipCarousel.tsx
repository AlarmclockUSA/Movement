'use client';

import { useTeam } from '@/hooks/useTeam';

export default function LeadershipSection() {
  const { team, loading, error } = useTeam();

  // Filter for featured team members only
  const featuredTeam = team.filter(member => member.featured);

  if (loading) {
    return (
      <div className="py-24 bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[5rem] font-bold mb-20 tracking-tight">Our Team</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {[1, 2].map((index) => (
              <div key={index} className="space-y-8 animate-pulse">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200" />
                <div>
                  <div className="h-8 bg-gray-200 rounded w-2/3 mb-6" />
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-4/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[5rem] font-bold mb-20 tracking-tight">Our Team</h2>
          <p className="text-red-500">Failed to load team. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (featuredTeam.length === 0) {
    return null;
  }

  return (
    <div className="py-24 bg-[#f5f5f3]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[5rem] font-bold mb-20 tracking-tight">Our Team</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {featuredTeam.map((leader) => (
            <div key={leader.id} className="space-y-8">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src={leader.image}
                  alt={leader.names}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-6">{leader.names}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="/team" 
            className="relative overflow-hidden inline-block px-8 py-4 rounded-full text-lg font-medium button-gradient button-gradient-1"
            style={{
              background: 'url("/Brilliant Gradient Pack-07.jpg") no-repeat center center',
              backgroundSize: '400%',
              filter: 'brightness(1.1)',
              color: 'white'
            }}
          >
            MEET OUR TEAM
          </a>
        </div>
      </div>
    </div>
  );
} 