export interface HeroMessage {
  id?: string;
  title: string;
  subtitle: string;
  background: string;
  order: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 