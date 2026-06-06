import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { getFirestore, collection, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHxWUf947wxw1136CnRCQta0EaE0k1sA0",
  authDomain: "drip-fashion-app.firebaseapp.com",
  projectId: "drip-fashion-app",
  storageBucket: "drip-fashion-app.firebasestorage.app",
  messagingSenderId: "407548389736",
  appId: "1:407548389736:web:a762cb432348a25cc0cedd",
  measurementId: "G-BMH0DVRH52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithEmail = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password);
export const signUpWithEmail = (email: string, password: string) => 
  createUserWithEmailAndPassword(auth, email, password);
export const updateUserProfile = (user: any, displayName: string, photoURL?: string) => 
  updateProfile(user, { displayName, photoURL: photoURL || '' });
export const logoutUser = () => signOut(auth);

// Firestore helpers
export const getUserDoc = (userId: string) => doc(db, 'users', userId);
export const getProductsCollection = () => collection(db, 'products');
export const getFavoritesCollection = (userId: string) => collection(db, 'users', userId, 'favorites');
export const getCartCollection = (userId: string) => collection(db, 'users', userId, 'cart');
export const getTryOnsCollection = (userId: string) => collection(db, 'users', userId, 'tryons');
export const getOrdersCollection = (userId: string) => collection(db, 'users', userId, 'orders');

// Storage helpers
export const uploadImage = async (userId: string, file: File, path: string) => {
  const storageRef = ref(storage, `${path}/${userId}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export { app };
