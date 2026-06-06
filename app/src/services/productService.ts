import { db } from '@/config/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  DocumentSnapshot
} from 'firebase/firestore';
import type { Product } from '@/types';

const PRODUCTS_COLLECTION = 'products';

export class ProductService {
  // Get all products
  static async getProducts(options?: {
    category?: string;
    limit?: number;
    lastDoc?: DocumentSnapshot;
    searchQuery?: string;
  }): Promise<{ products: Product[]; lastDoc: DocumentSnapshot | null }> {
    let q = query(collection(db, PRODUCTS_COLLECTION));
    
    // Apply category filter
    if (options?.category && options.category !== 'All') {
      q = query(q, where('category', '==', options.category.toLowerCase()));
    }
    
    // Apply search
    if (options?.searchQuery) {
      // Note: Firestore doesn't support full-text search natively
      // For production, consider using Algolia or similar
      const searchLower = options.searchQuery.toLowerCase();
      q = query(q, where('searchKeywords', 'array-contains', searchLower));
    }
    
    // Order by created date
    q = query(q, orderBy('createdAt', 'desc'));
    
    // Apply pagination
    if (options?.limit) {
      q = query(q, limit(options.limit));
    }
    
    if (options?.lastDoc) {
      q = query(q, startAfter(options.lastDoc));
    }
    
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    let lastDoc: DocumentSnapshot | null = null;
    
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
      lastDoc = doc;
    });
    
    return { products, lastDoc };
  }

  // Get product by ID
  static async getProductById(productId: string): Promise<Product | null> {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    
    return null;
  }

  // Get products by category
  static async getProductsByCategory(category: string): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category.toLowerCase()),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    
    return products;
  }

  // Get featured products
  static async getFeaturedProducts(limitCount: number = 10): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    
    return products;
  }

  // Get new arrivals
  static async getNewArrivals(limitCount: number = 10): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('isNew', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    
    return products;
  }

  // Get try-on enabled products
  static async getTryOnProducts(limitCount: number = 20): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('tryOnEnabled', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    
    return products;
  }

  // Get related products
  static async getRelatedProducts(productId: string, category: string, limitCount: number = 4): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category),
      where('__name__', '!=', productId),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    
    return products;
  }
}
