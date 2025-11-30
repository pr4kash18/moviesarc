export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  year: number;
  duration: string;
  rating: number;
  category: string[];
  isPremium: boolean;
  trailerUrl?: string;
  videoUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isPremium: boolean;
  subscriptionEnd?: Date;
}
