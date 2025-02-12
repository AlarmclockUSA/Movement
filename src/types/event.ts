export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  type: 'conference' | 'gathering' | 'workshop';
  status: 'upcoming' | 'ongoing' | 'past';
  location: {
    type: 'virtual' | 'physical' | 'hybrid';
    address?: string;
    city?: string;
    country?: string;
  };
  registrationUrl: string;
  price?: {
    amount: number;
    currency: string;
  };
  capacity?: number;
  speakers?: {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
  }[];
  schedule?: {
    date: string;
    sessions: {
      time: string;
      title: string;
      description: string;
      speaker?: string;
    }[];
  }[];
} 