
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: number;
  tags: string[];
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export type Page = 'home' | 'blog' | 'marketplace' | 'store' | 'about';
