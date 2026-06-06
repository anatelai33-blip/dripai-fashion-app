import { useApp } from '@/contexts/AppContext';
import { products } from '@/data/products';
import { ArrowLeft, Heart, Home, Search, ShoppingBag, User, Camera, RefreshCw } from 'lucide-react';

export function FavoritesScreen() {
  const { navigateTo, favorites, toggleFavorite, cartCount } = useApp();
  
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-cream-light pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream-light/95 backdrop-blur-sm px-4 py-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigateTo('home')}
            className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-charcoal" />
          </button>
          <h1 className="flex-1 text-center font-display font-semibold text-gold text-lg">
            My Favorites
          </h1>
          <button 
            onClick={() => navigateTo('cart')}
            className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5 text-charcoal" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <p className="text-center text-sm text-charcoal/60 mt-2">
          <RefreshCw className="w-3 h-3 inline mr-1" />
          Pull to refresh
        </p>
      </header>

      {/* Favorites Grid */}
      {favoriteProducts.length > 0 ? (
        <div className="px-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            {favoriteProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-soft"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">Out of Stock</span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-gold text-gold" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="text-sm font-medium text-charcoal truncate">
                    {product.name}
                  </h3>
                  <p className="text-gold font-semibold text-sm mt-1">
                    ¥{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-cream-dark/30 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-gold/50" />
          </div>
          <p className="text-charcoal/60 text-lg mb-4">No favorites yet</p>
          <button
            onClick={() => navigateTo('home')}
            className="px-8 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors"
          >
            Start Shopping
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-dark/30 px-6 py-3">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigateTo('home')}
            className="flex flex-col items-center gap-1 text-charcoal/50 hover:text-gold transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigateTo('categories')}
            className="flex flex-col items-center gap-1 text-charcoal/50 hover:text-gold transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigateTo('tryon-upload')}
            className="flex flex-col items-center gap-1 text-charcoal/50 hover:text-gold transition-colors"
          >
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center -mt-4 shadow-gold">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-1 text-gold">
            <Heart className="w-5 h-5 fill-gold" />
          </button>
          <button 
            onClick={() => navigateTo('measurements')}
            className="flex flex-col items-center gap-1 text-charcoal/50 hover:text-gold transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </div>
  );
}
