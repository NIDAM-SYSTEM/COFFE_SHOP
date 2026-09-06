export type MenuCategory = 'Coffee' | 'Tea' | 'Cookies' | 'Coffee Machines';

export interface MenuItem {
  id: string;
  name: string;
  sub: string;
  price: number;
  category: MenuCategory;
  pastelColor: string;
  image: string;
  rating?: number;
}

export interface ProcessNode {
  id: number;
  title: string;
  description: string;
  image: string;
  badge: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  handle: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sub?: string;
}
