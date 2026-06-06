import { db } from '@/config/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import type { CartItem, Product } from '@/types';

export class CartService {
  private static getCartCollection(userId: string) {
    return collection(db, 'users', userId, 'cart');
  }

  // Get cart items
  static async getCart(userId: string): Promise<CartItem[]> {
    const cartRef = this.getCartCollection(userId);
    const snapshot = await getDocs(cartRef);
    
    const cartItems: CartItem[] = [];
    snapshot.forEach((doc) => {
      cartItems.push(doc.data() as CartItem);
    });
    
    return cartItems;
  }

  // Add item to cart
  static async addToCart(
    userId: string, 
    product: Product, 
    size: string, 
    color: string,
    quantity: number = 1
  ): Promise<void> {
    const cartItemId = `${product.id}_${size}_${color}`;
    const cartItemRef = doc(db, 'users', userId, 'cart', cartItemId);
    
    await setDoc(cartItemRef, {
      product,
      size,
      color,
      quantity,
      addedAt: serverTimestamp()
    });
  }

  // Update cart item quantity
  static async updateQuantity(
    userId: string, 
    productId: string, 
    size: string, 
    color: string,
    quantity: number
  ): Promise<void> {
    const cartItemId = `${productId}_${size}_${color}`;
    const cartItemRef = doc(db, 'users', userId, 'cart', cartItemId);
    
    if (quantity <= 0) {
      await deleteDoc(cartItemRef);
    } else {
      await updateDoc(cartItemRef, { quantity });
    }
  }

  // Remove item from cart
  static async removeFromCart(
    userId: string, 
    productId: string, 
    size: string, 
    color: string
  ): Promise<void> {
    const cartItemId = `${productId}_${size}_${color}`;
    const cartItemRef = doc(db, 'users', userId, 'cart', cartItemId);
    await deleteDoc(cartItemRef);
  }

  // Clear cart
  static async clearCart(userId: string): Promise<void> {
    const cartRef = this.getCartCollection(userId);
    const snapshot = await getDocs(cartRef);
    
    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  }

  // Get cart total
  static getCartTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  // Get cart item count
  static getCartItemCount(cartItems: CartItem[]): number {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}
