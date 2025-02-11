export interface Feature {
  id?: string;
  title: string;
  description: string;
  link: {
    text: string;
    url: string;
  };
  image: {
    url: string;
    alt: string;
  };
  order: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 