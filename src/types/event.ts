export interface Event {
  id?: string;
  title: string;
  description: string;
  longDescription?: string;
  date: {
    day: string;
    month: string;
  };
  time: string;
  location: {
    type: 'online' | 'physical' | 'hybrid';
    url?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  routing: {
    useDefault: boolean; // If true, use the default event page, if false, use external link
    externalUrl?: string; // Only used when useDefault is false
  };
  registration?: {
    required: boolean;
    url?: string;
    deadline?: Date;
    capacity?: number;
  };
  speakers?: Array<{
    name: string;
    role?: string;
    image?: string;
  }>;
  image?: {
    url: string;
    alt: string;
  };
  active: boolean;
  recurring?: {
    type: 'monthly';
    dayOfWeek: number; // 1 for Monday
    weekOfMonth: number; // 1 for first week
    enabled: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
  order?: number;
} 