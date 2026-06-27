import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Product, CartItem, User, Measurements, Screen } from '@/types';
import { AuthService, ProductService, CartService, FavoritesService, TryOnService, MeasurementsService, ShopifyService } from '@/services';

interface AppContextType {
  // Navigation
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  screenParams: any;
  setScreenParams: (params: any) => void;
  navigateTo: (screen: Screen, params?: any) => void;
  goBack: () => void;
  
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Auth
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // Products
  products: Product[];
  fetchProducts: (options?: any) => Promise<void>;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string) => Promise<void>;
  removeFromCart: (productId: string, size: string, color: string) => Promise<void>;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartCount: number;
  
  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  fetchFavorites: () => Promise<void>;
  
  // Try-On
  tryOnImage: string | null;
  setTryOnImage: (image: string | null) => void;
  tryOnProduct: Product | null;
  setTryOnProduct: (product: Product | null) => void;
  tryOnResult: string | null;
  setTryOnResult: (result: string | null) => void;
  processTryOn: () => Promise<void>;
  
  // Measurements
  measurements: Measurements;
  updateMeasurements: (measurements: Partial<Measurements>) => Promise<void>;
  saveMeasurements: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Navigation
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [screenParams, setScreenParams] = useState<any>({});
  const [, setScreenHistory] = useState<Screen[]>([]);
  
  // User
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Products
  const [products, setProducts] = useState<Product[]>([]);
  
  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Favorites
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Try-On
  const [tryOnImage, setTryOnImage] = useState<string | null>(null);
  const [tryOnProduct, setTryOnProduct] = useState<Product | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  
  // Measurements
  const [measurements, setMeasurements] = useState<Measurements>({});

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await AuthService.getUserData(firebaseUser.uid);
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || undefined,
          measurements: userData?.measurements
        });
        
        // Load user data
        await loadUserData(firebaseUser.uid);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load user data (cart, favorites, measurements)
  const loadUserData = async (userId: string) => {
    try {
      // Load cart
      const cartItems = await CartService.getCart(userId);
      setCart(cartItems);
      
      // Load favorites
      const favs = await FavoritesService.getFavorites(userId);
      setFavorites(favs);
      
      // Load measurements
      const meas = await MeasurementsService.getMeasurements(userId);
      if (meas) {
        setMeasurements(meas);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const navigateTo = useCallback((screen: Screen, params?: any) => {
    setScreenHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
    if (params) setScreenParams(params);
  }, [currentScreen]);

  const goBack = useCallback(() => {
    setScreenHistory(prev => {
      const newHistory = [...prev];
      const previousScreen = newHistory.pop();
      if (previousScreen) {
        setCurrentScreen(previousScreen);
      }
      return newHistory;
    });
  }, []);

  // Auth functions
  const loginWithEmail = async (email: string, password: string) => {
    const user = await AuthService.signInWithEmail(email, password);
    setUser(user);
    await loadUserData(user.id);
  };

  const loginWithGoogle = async () => {
    const user = await AuthService.signInWithGoogle();
    setUser(user);
    await loadUserData(user.id);
  };

  const signup = async (email: string, password: string, name: string) => {
    const user = await AuthService.signUpWithEmail(email, password, name);
    setUser(user);
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setCart([]);
    setFavorites([]);
    setMeasurements({});
  };

  // Product functions
  const fetchProducts = async (options?: any) => {
    try {
      const fetchedProducts = await ShopifyService.getProducts(options?.limit, options?.searchQuery);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Cart functions
  const addToCart = async (product: Product, size: string, color: string) => {
    if (!user) return;
    
    await CartService.addToCart(user.id, product, size, color);
    const updatedCart = await CartService.getCart(user.id);
    setCart(updatedCart);
  };

  const removeFromCart = async (productId: string, size: string, color: string) => {
    if (!user) return;
    
    await CartService.removeFromCart(user.id, productId, size, color);
    const updatedCart = await CartService.getCart(user.id);
    setCart(updatedCart);
  };

  const updateQuantity = async (productId: string, size: string, color: string, quantity: number) => {
    if (!user) return;
    
    await CartService.updateQuantity(user.id, productId, size, color, quantity);
    const updatedCart = await CartService.getCart(user.id);
    setCart(updatedCart);
  };

  const clearCart = async () => {
    if (!user) return;
    
    await CartService.clearCart(user.id);
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Favorites functions
  const fetchFavorites = async () => {
    if (!user) return;
    
    const favs = await FavoritesService.getFavorites(user.id);
    setFavorites(favs);
  };

  const toggleFavorite = async (productId: string) => {
    if (!user) {
      navigateTo('login');
      return;
    }
    
    const isFav = await FavoritesService.toggleFavorite(user.id, productId);
    
    if (isFav) {
      setFavorites(prev => [...prev, productId]);
    } else {
      setFavorites(prev => prev.filter(id => id !== productId));
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  // Try-On functions
  const processTryOn = async () => {
    if (!user || !tryOnImage || !tryOnProduct) return;
    
    try {
      // Create try-on record
      const tryOnId = await TryOnService.createTryOn(
        user.id,
        tryOnProduct.id,
        tryOnImage,
        tryOnProduct.images[0],
        tryOnProduct.category
      );
      
      // Process with FASHN AI (or simulate)
      if (import.meta.env.VITE_FASHN_API_KEY) {
        const { resultUrl, processingTime } = await TryOnService.processTryOn(
          tryOnImage,
          tryOnProduct.images[0],
          tryOnProduct.category
        );
        
        await TryOnService.updateTryOnResult(user.id, tryOnId, resultUrl, processingTime);
        setTryOnResult(resultUrl);
      } else {
        // Simulate processing
        await TryOnService.simulateTryOnProcessing(user.id, tryOnId, (progress) => {
          console.log(`Processing: ${progress}%`);
        });
        
        // Get the result
        const result = await TryOnService.getTryOnResult(user.id, tryOnId);
        if (result?.resultUrl) {
          setTryOnResult(result.resultUrl);
        }
      }
    } catch (error) {
      console.error('Error processing try-on:', error);
      throw error;
    }
  };

  // Measurements functions
  const updateMeasurements = async (newMeasurements: Partial<Measurements>) => {
    setMeasurements(prev => ({ ...prev, ...newMeasurements }));
  };

  const saveMeasurements = async () => {
    if (!user) return;
    
    await MeasurementsService.saveMeasurements(user.id, measurements);
  };

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      screenParams,
      setScreenParams,
      navigateTo,
      goBack,
      user,
      setUser,
      isAuthenticated: !!user,
      isLoading,
      loginWithEmail,
      loginWithGoogle,
      signup,
      logout,
      products,
      fetchProducts,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      favorites,
      toggleFavorite,
      isFavorite,
      fetchFavorites,
      tryOnImage,
      setTryOnImage,
      tryOnProduct,
      setTryOnProduct,
      tryOnResult,
      setTryOnResult,
      processTryOn,
      measurements,
      updateMeasurements,
      saveMeasurements,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
