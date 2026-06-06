import { db } from '@/config/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';

export class FavoritesService {
  private static getFavoritesCollection(userId: string) {
    return collection(db, 'users', userId, 'favorites');
  }

  // Get user favorites
  static async getFavorites(userId: string): Promise<string[]> {
    const favoritesRef = this.getFavoritesCollection(userId);
    const snapshot = await getDocs(favoritesRef);
    
    const favorites: string[] = [];
    snapshot.forEach((doc) => {
      favorites.push(doc.id);
    });
    
    return favorites;
  }

  // Add to favorites
  static async addToFavorites(userId: string, productId: string): Promise<void> {
    const favoriteRef = doc(db, 'users', userId, 'favorites', productId);
    await setDoc(favoriteRef, {
      productId,
      addedAt: serverTimestamp()
    });
  }

  // Remove from favorites
  static async removeFromFavorites(userId: string, productId: string): Promise<void> {
    const favoriteRef = doc(db, 'users', userId, 'favorites', productId);
    await deleteDoc(favoriteRef);
  }

  // Toggle favorite
  static async toggleFavorite(userId: string, productId: string): Promise<boolean> {
    const favoriteRef = doc(db, 'users', userId, 'favorites', productId);
    const snapshot = await getDocs(this.getFavoritesCollection(userId));
    
    const isFavorite = snapshot.docs.some((doc) => doc.id === productId);
    
    if (isFavorite) {
      await deleteDoc(favoriteRef);
      return false;
    } else {
      await setDoc(favoriteRef, {
        productId,
        addedAt: serverTimestamp()
      });
      return true;
    }
  }

  // Check if product is favorite
  static async isFavorite(userId: string, productId: string): Promise<boolean> {
    const favoritesRef = this.getFavoritesCollection(userId);
    const snapshot = await getDocs(favoritesRef);
    
    return snapshot.docs.some((doc) => doc.id === productId);
  }
}
