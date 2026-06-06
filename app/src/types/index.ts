export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  careInstructions?: string;
  shippingInfo?: string;
  inStock: boolean;
  tryOnEnabled: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  measurements?: Measurements;
  dripScore?: DripScore;
}

export interface Measurements {
  height?: number;
  weight?: number;
  chest?: number;
  bust?: number;
  waist?: number;
  hips?: number;
  inseam?: number;
  shoeSize?: string;
  wristCircumference?: number;
  topSize?: string;
  bottomSize?: string;
  dressSize?: string;
}

export interface TryOnResult {
  id: string;
  userId: string;
  productId: string;
  userPhotoUrl: string;
  productImageUrl: string;
  resultUrl: string | null;
  status: 'processing' | 'completed' | 'failed';
  category: string;
  createdAt: Date;
  expiresAt: Date | null;
  processingTime: number | null;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// AI Stylist
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Digital Wardrobe
export interface WardrobeItem {
  id: string;
  imageUrl: string;
  category: 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Shoes' | 'Accessories' | 'Traditional';
  name: string;
  color?: string;
  addedAt: Date;
}

// Gamification
export interface DripScore {
  points: number;
  level: 'Fresh' | 'Dripping' | 'Drippy' | 'Drip Lord' | 'Global Drip Icon';
  history: DripActivity[];
}

export interface DripActivity {
  id: string;
  action: string;
  points: number;
  timestamp: Date;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  level: string;
}

// Social Feed
export interface SocialPost {
  id: string;
  userName: string;
  userAvatar: string;
  images: string[];
  caption: string;
  likes: number;
  comments: SocialComment[];
  tags: string[];
  cultureBoard?: string;
  createdAt: Date;
  liked?: boolean;
}

export interface SocialComment {
  id: string;
  userName: string;
  content: string;
  timestamp: Date;
}

// Artisan Connect
export interface Artisan {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  region: string;
  rating: number;
  reviewCount: number;
  location: string;
  bio: string;
  priceRange: string;
}

export type Screen = 
  | 'splash' 
  | 'login' 
  | 'signup' 
  | 'home' 
  | 'product' 
  | 'tryon-upload' 
  | 'tryon-processing' 
  | 'tryon-result'
  | 'categories'
  | 'filters'
  | 'measurements'
  | 'favorites'
  | 'notifications'
  | 'error'
  | 'cart'
  // New features
  | 'ai-stylist'
  | 'wardrobe'
  | 'drip-score'
  | 'social'
  | 'artisan-connect'
  | 'ai-designer'
  | 'drip-live'
  // Company website pages
  | 'homepage'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'team'
  | 'contact';
