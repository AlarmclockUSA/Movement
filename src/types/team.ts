export interface TeamMember {
  id?: string;
  names: string;
  roles: string[];
  description: string;
  longDescription: string;
  image: string;
  social: {
    website?: string;
    facebook?: string;
    instagram?: string;
  };
  order: number;
  active: boolean;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 