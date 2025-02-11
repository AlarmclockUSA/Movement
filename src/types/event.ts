export interface Event {
  id?: string;
  title: string;
  description: string;
  date: {
    day: string;
    month: string;
  };
  time: string;
  link: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  order?: number;
} 