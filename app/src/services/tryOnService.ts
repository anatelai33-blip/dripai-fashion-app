import { db, storage } from '@/config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { TryOnResult } from '@/types';

const FASHN_API_KEY = import.meta.env.VITE_FASHN_API_KEY || '';
const FASHN_API_URL = import.meta.env.VITE_FASHN_API_URL || 'https://api.fashn.ai/v1';

export class TryOnService {
  private static getTryOnsCollection(userId: string) {
    return collection(db, 'users', userId, 'tryons');
  }

  // Upload user photo to Firebase Storage
  static async uploadUserPhoto(userId: string, file: File): Promise<string> {
    const storageRef = ref(storage, `user_photos/${userId}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  // Create try-on request
  static async createTryOn(
    userId: string,
    productId: string,
    userPhotoUrl: string,
    productImageUrl: string,
    category: string
  ): Promise<string> {
    const tryOnRef = doc(collection(db, 'users', userId, 'tryons'));
    
    await setDoc(tryOnRef, {
      userId,
      productId,
      userPhotoUrl,
      productImageUrl,
      resultUrl: null,
      status: 'processing',
      category,
      createdAt: serverTimestamp(),
      expiresAt: null,
      processingTime: null
    });
    
    return tryOnRef.id;
  }

  // Call FASHN AI API for try-on
  static async processTryOn(
    personImageUrl: string,
    garmentImageUrl: string,
    category: string
  ): Promise<{ resultUrl: string; processingTime: number }> {
    const response = await fetch(`${FASHN_API_URL}/tryon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FASHN_API_KEY}`
      },
      body: JSON.stringify({
        person_image: personImageUrl,
        garment_image: garmentImageUrl,
        category: this.mapCategory(category)
      })
    });

    if (!response.ok) {
      throw new Error(`FASHN API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      resultUrl: data.result_url,
      processingTime: data.processing_time
    };
  }

  // Update try-on result
  static async updateTryOnResult(
    userId: string,
    tryOnId: string,
    resultUrl: string,
    processingTime: number
  ): Promise<void> {
    const tryOnRef = doc(db, 'users', userId, 'tryons', tryOnId);
    
    // Calculate expiration (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    await updateDoc(tryOnRef, {
      resultUrl,
      status: 'completed',
      processingTime,
      expiresAt: serverTimestamp()
    });
  }

  // Get try-on result
  static async getTryOnResult(userId: string, tryOnId: string): Promise<TryOnResult | null> {
    const tryOnRef = doc(db, 'users', userId, 'tryons', tryOnId);
    const snapshot = await getDoc(tryOnRef);
    
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as TryOnResult;
    }
    
    return null;
  }

  // Get user's try-on history
  static async getTryOnHistory(userId: string): Promise<TryOnResult[]> {
    const tryOnsRef = this.getTryOnsCollection(userId);
    const snapshot = await getDocs(tryOnsRef);
    
    const tryOns: TryOnResult[] = [];
    snapshot.forEach((doc) => {
      tryOns.push({ id: doc.id, ...doc.data() } as TryOnResult);
    });
    
    return tryOns;
  }

  // Map our categories to FASHN categories
  private static mapCategory(category: string): string {
    const categoryMap: Record<string, string> = {
      'tops': 'tops',
      'bottoms': 'bottoms',
      'dresses': 'dresses',
      'outerwear': 'outerwear',
      'shoes': 'bottoms', // FASHN doesn't have shoes, use bottoms as fallback
      'watches': 'tops', // FASHN doesn't have watches, use tops as fallback
      'accessories': 'tops'
    };
    
    return categoryMap[category.toLowerCase()] || 'tops';
  }

  // Simulate try-on processing (for demo without real API)
  static async simulateTryOnProcessing(
    userId: string,
    tryOnId: string,
    onProgress?: (progress: number) => void
  ): Promise<void> {
    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      onProgress?.(i);
    }
    
    // Simulate result
    await this.updateTryOnResult(
      userId,
      tryOnId,
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
      28.5
    );
  }
}

// Import getDocs
import { getDocs } from 'firebase/firestore';
