import { db } from '@/config/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import type { Measurements } from '@/types';

export class MeasurementsService {
  // Get user measurements
  static async getMeasurements(userId: string): Promise<Measurements | null> {
    const userRef = doc(db, 'users', userId);
    const snapshot = await getDoc(userRef);
    
    if (snapshot.exists()) {
      const data = snapshot.data();
      return data.measurements || null;
    }
    
    return null;
  }

  // Save user measurements
  static async saveMeasurements(userId: string, measurements: Measurements): Promise<void> {
    const userRef = doc(db, 'users', userId);
    
    await setDoc(userRef, {
      measurements,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }

  // Update specific measurement
  static async updateMeasurement(
    userId: string, 
    key: keyof Measurements, 
    value: number | string
  ): Promise<void> {
    const userRef = doc(db, 'users', userId);
    
    await setDoc(userRef, {
      [`measurements.${key}`]: value,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }

  // Get size recommendation based on measurements
  static getSizeRecommendation(
    measurements: Measurements,
    category: 'tops' | 'bottoms' | 'dresses' | 'shoes'
  ): string {
    // This is a simplified recommendation logic
    // In production, you'd have more sophisticated algorithms
    
    if (category === 'tops') {
      if (measurements.chest) {
        if (measurements.chest < 86) return 'XS';
        if (measurements.chest < 91) return 'S';
        if (measurements.chest < 96) return 'M';
        if (measurements.chest < 101) return 'L';
        return 'XL';
      }
      return measurements.topSize || 'M';
    }
    
    if (category === 'bottoms') {
      if (measurements.waist) {
        if (measurements.waist < 71) return '28';
        if (measurements.waist < 76) return '30';
        if (measurements.waist < 81) return '32';
        if (measurements.waist < 86) return '34';
        return '36';
      }
      return measurements.bottomSize || '32';
    }
    
    if (category === 'dresses') {
      if (measurements.bust && measurements.waist && measurements.hips) {
        // Use the largest measurement for dress sizing
        const maxMeasurement = Math.max(measurements.bust, measurements.waist, measurements.hips);
        if (maxMeasurement < 86) return 'XS';
        if (maxMeasurement < 91) return 'S';
        if (maxMeasurement < 96) return 'M';
        if (maxMeasurement < 101) return 'L';
        return 'XL';
      }
      return measurements.dressSize || 'M';
    }
    
    if (category === 'shoes') {
      return measurements.shoeSize || '9';
    }
    
    return 'M';
  }

  // Convert measurements between units
  static convertHeight(value: number, from: 'cm' | 'ft', to: 'cm' | 'ft'): number {
    if (from === to) return value;
    
    if (from === 'cm' && to === 'ft') {
      return value / 30.48;
    }
    
    if (from === 'ft' && to === 'cm') {
      return value * 30.48;
    }
    
    return value;
  }

  static convertWeight(value: number, from: 'kg' | 'lb', to: 'kg' | 'lb'): number {
    if (from === to) return value;
    
    if (from === 'kg' && to === 'lb') {
      return value * 2.20462;
    }
    
    if (from === 'lb' && to === 'kg') {
      return value / 2.20462;
    }
    
    return value;
  }

  // Convert shoe sizes
  static convertShoeSize(size: number, from: 'US' | 'EU' | 'UK', to: 'US' | 'EU' | 'UK'): number {
    if (from === to) return size;
    
    // Simplified conversion chart
    const conversions: Record<string, Record<string, number>> = {
      'US': { 'EU': 33, 'UK': -0.5 },
      'EU': { 'US': -33, 'UK': -33.5 },
      'UK': { 'US': 0.5, 'EU': 33.5 }
    };
    
    return size + (conversions[from]?.[to] || 0);
  }
}
