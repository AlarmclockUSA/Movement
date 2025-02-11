import { db } from './firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import type { TeamMember } from '@/types/team';

const initialTeam: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    names: "Graham + Theresa Cooke",
    roles: ["Global Pastors", "Movement Directors"],
    description: "Graham is the Visionary Architect and Director of the Brilliant Movement, bringing decades of experience in prophetic ministry and leadership development. Theresa partners with Graham in ministry and brings a powerful perspective on living in God's presence daily.",
    longDescription: "Graham and Theresa have dedicated their lives to helping people discover and live in the kind intentions of God. With over three decades of ministry experience, they've impacted countless lives through their teachings on prophetic ministry, leadership, and spiritual transformation. Their unique approach combines deep biblical wisdom with practical application, helping believers navigate their spiritual journey with confidence and joy.",
    image: "/graham-theresa.jpg",
    social: {
      website: "https://brilliantperspectives.com",
      facebook: "https://facebook.com/brilliantperspectives",
      instagram: "https://instagram.com/brilliantperspectives"
    },
    order: 1,
    active: true,
    featured: true
  },
  {
    names: "Dionne + Bridget van Zyl",
    roles: ["Executive Pastors", "Community Leaders"],
    description: "Dionne and Bridget serve as Executive Pastors of the Brilliant Movement, overseeing the day-to-day operations and spiritual direction of our community. They bring a passion for authentic community and transformational leadership to everything they do.",
    longDescription: "As Executive Pastors, Dionne and Bridget are committed to fostering genuine connections and spiritual growth within our global community. Their leadership style emphasizes building authentic relationships and creating spaces where people can encounter God's presence. They oversee our community groups, pastoral care, and various ministry initiatives that help people grow in their faith journey.",
    image: "/dionne-bridget.jpg",
    social: {
      facebook: "https://facebook.com/brilliantmovement",
      instagram: "https://instagram.com/brilliantmovement"
    },
    order: 2,
    active: true,
    featured: true
  },
  {
    names: "Sarah Anderson",
    roles: ["Worship Director", "Creative Arts Pastor"],
    description: "Sarah leads our global worship experiences with a passion for creating spaces where people can encounter God's presence through music and creative expression.",
    longDescription: "With over 15 years of experience in worship ministry, Sarah has developed a unique approach to leading worship that combines contemporary expressions with deep theological understanding. She oversees our creative arts department, mentoring emerging worship leaders and fostering an environment of creative excellence. Her heart for authentic worship has helped shape our community's approach to experiencing God's presence.",
    image: "/sarah-anderson.jpg",
    social: {
      instagram: "https://instagram.com/brilliantmovement.worship"
    },
    order: 3,
    active: true,
    featured: false
  },
  {
    names: "Michael + Rachel Chen",
    roles: ["Community Group Directors", "Pastoral Care Leaders"],
    description: "Michael and Rachel oversee our global network of community groups, ensuring that every member has a place to belong and grow in their faith journey.",
    longDescription: "As Community Group Directors, Michael and Rachel have revolutionized how we approach small group ministry in a digital age. Their innovative approach combines online and in-person gatherings, creating meaningful connections across geographical boundaries. They've developed comprehensive training programs for group leaders and established support systems that help foster genuine community in our digital-first environment.",
    image: "/michael-rachel.jpg",
    social: {
      facebook: "https://facebook.com/brilliantmovement.community",
      instagram: "https://instagram.com/brilliantmovement.community"
    },
    order: 4,
    active: true,
    featured: false
  },
  {
    names: "David Thompson",
    roles: ["Digital Strategy Director", "Technology Pastor"],
    description: "David leads our digital initiatives, ensuring that our global community stays connected and engaged through innovative technology solutions.",
    longDescription: "David brings over a decade of experience in technology and ministry, bridging the gap between digital innovation and spiritual formation. He oversees our online platforms, mobile apps, and digital infrastructure, making sure that our community has the tools they need to stay connected and grow in their faith. His vision for leveraging technology for Kingdom impact has been instrumental in expanding our global reach.",
    image: "/david-thompson.jpg",
    social: {
      website: "https://brilliantmovement.tech",
      instagram: "https://instagram.com/brilliantmovement.tech"
    },
    order: 5,
    active: true,
    featured: false
  },
  {
    names: "Maria Rodriguez",
    roles: ["Next Generation Pastor", "Youth Ministry Director"],
    description: "Maria leads our youth and young adult initiatives, fostering an environment where the next generation can discover their identity in Christ and develop their leadership potential.",
    longDescription: "With a background in education and youth ministry, Maria has developed innovative programs that engage young people in their faith journey. She oversees our youth mentorship program, leadership development initiatives for young adults, and creates spaces where the next generation can explore their faith in authentic ways. Her approach combines biblical teaching with practical life application, helping young people navigate their faith in today's world.",
    image: "/maria-rodriguez.jpg",
    social: {
      instagram: "https://instagram.com/brilliantmovement.youth"
    },
    order: 6,
    active: true,
    featured: false
  }
];

async function seedTeam() {
  try {
    console.log('Clearing existing team members...');
    const teamRef = db.collection('team');
    const existingTeam = await teamRef.get();
    
    const batch = db.batch();
    existingTeam.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('Existing team members cleared.');

    console.log('Adding new team members...');
    const timestamp = Timestamp.now();
    
    const addPromises = initialTeam.map(member => 
      teamRef.add({
        ...member,
        createdAt: timestamp,
        updatedAt: timestamp
      })
    );

    await Promise.all(addPromises);
    console.log('Team members seeded successfully!');
  } catch (error) {
    console.error('Error seeding team:', error);
    throw error;
  }
}

// Only run if this file is being executed directly
if (require.main === module) {
  seedTeam()
    .then(() => {
      console.log('Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error during seeding:', error);
      process.exit(1);
    });
} 