'use client';

const leaders = [
  {
    names: "Graham + Theresa Cooke",
    description: "Graham is the Visionary Architect and Director of the Brilliant Movement, bringing decades of experience in prophetic ministry and leadership development. Theresa partners with Graham in ministry and brings a powerful perspective on living in God's presence daily.",
    image: "/graham-theresa.jpg"
  },
  {
    names: "Dionne + Bridget van Zyl",
    description: "Dionne and Bridget serve as Executive Pastors of the Brilliant Movement, overseeing the day-to-day operations and spiritual direction of our community. They bring a passion for authentic community and transformational leadership to everything they do.",
    image: "/dionne-bridget.jpg"
  }
];

export default function LeadershipSection() {
  return (
    <div className="py-24 bg-[#f5f5f3]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[5rem] font-bold mb-20 tracking-tight">Our Team</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {leaders.map((leader, index) => (
            <div key={leader.names} className="space-y-8">
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
            href="/leadership" 
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