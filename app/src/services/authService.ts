import { 
  auth, 
  signInWithGoogle, 
  signInWithEmail, 
  signUpWithEmail, 
  updateUserProfile,
  logoutUser,
  db 
} from '@/config/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import type { User } from '@/types';

export class AuthService {
  // Get current user
  static getCurrentUser() {
    return auth.currentUser;
  }

  // Listen to auth state changes
  static onAuthStateChanged(callback: (user: any) => void) {
    return auth.onAuthStateChanged(callback);
  }

  // Sign in with Google
  static async signInWithGoogle(): Promise<User> {
    const result = await signInWithGoogle();
    const firebaseUser = result.user;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        createdAt: serverTimestamp(),
        role: 'customer',
        favorites: [],
        measurements: {}
      });
    }
    
    return this.mapFirebaseUser(firebaseUser);
  }

  // Sign in with email/password
  static async signInWithEmail(email: string, password: string): Promise<User> {
    const result = await signInWithEmail(email, password);
    return this.mapFirebaseUser(result.user);
  }

  // Sign up with email/password
  static async signUpWithEmail(email: string, password: string, name: string): Promise<User> {
    const result = await signUpWithEmail(email, password);
    
    // Update profile
    await updateUserProfile(result.user, name);
    
    // Create user document
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      displayName: name,
      photoURL: null,
      createdAt: serverTimestamp(),
      role: 'customer',
      favorites: [],
      measurements: {}
    });
    
    return this.mapFirebaseUser(result.user);
  }

  // Logout
  static async logout(): Promise<void> {
    await logoutUser();
  }

  // Get user data from Firestore
  static async getUserData(userId: string): Promise<any> {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  }

  // Update user profile
  static async updateUserData(userId: string, data: Partial<User>): Promise<void> {
    await setDoc(doc(db, 'users', userId), data, { merge: true });
  }

  // Map Firebase user to our User type
  private static mapFirebaseUser(firebaseUser: any): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || undefined
    };
  }
}
