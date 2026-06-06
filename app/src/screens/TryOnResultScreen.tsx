import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, ShoppingBag, Share, Heart, RefreshCw } from 'lucide-react';

export function TryOnResultScreen() {
  const { navigateTo, tryOnImage, tryOnProduct, addToCart, toggleFavorite, isFavorite } = useApp();

  const handleShopNow = () => {
    if (tryOnProduct) {
      addToCart(tryOnProduct, tryOnProduct.sizes[0], tryOnProduct.colors[0].name);
      navigateTo('home');
    }
  };

  const handleTryAnother = () => {
    navigateTo('tryon-upload');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-4 py-4 flex items-center border-b border-cream-dark/20">
        <button 
          onClick={() => navigateTo('home')}
          className="p-2 hover:bg-cream-light rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-charcoal text-lg">
          Try-On Results
        </h1>
        <div className="w-9" />
      </header>

      {/* Comparison */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Original */}
          <div className="text-center">
            <p className="text-sm text-charcoal/60 mb-2">Original</p>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-light">
              {tryOnImage ? (
                <img 
                  src={tryOnImage} 
                  alt="Original" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-charcoal/20 rounded-full" />
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          <div className="text-center">
            <p className="text-sm text-charcoal/60 mb-2">Your New Look</p>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-light">
              {tryOnProduct ? (
                <img 
                  src={tryOnProduct.images[0]} 
                  alt="Try-on result" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 100 120" className="w-20 h-24 text-charcoal/30">
                    <path 
                      d="M30 10 Q25 20 25 35 Q25 50 35 55 L30 70 Q27 85 35 100 L40 115 Q45 120 50 120 Q55 120 60 115 L65 100 Q73 85 70 70 L65 55 Q75 50 75 35 Q75 20 70 10 Q60 0 50 0 Q40 0 30 10Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        {tryOnProduct && (
          <div className="text-center mb-6">
            <h2 className="text-xl font-display font-semibold text-gold">
              {tryOnProduct.name}
            </h2>
            <p className="text-2xl font-bold text-gold mt-1">
              ${tryOnProduct.price.toFixed(2)}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={handleShopNow}
            className="col-span-1 py-3 bg-gold text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gold-dark active:scale-[0.98] transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs">Shop</span>
          </button>
          
          <button
            className="col-span-1 py-3 border-2 border-gold text-gold font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gold/5 active:scale-[0.98] transition-all"
          >
            <Share className="w-4 h-4" />
            <span className="text-xs">Share</span>
          </button>
          
          <button
            onClick={() => tryOnProduct && toggleFavorite(tryOnProduct.id)}
            className="col-span-1 py-3 border-2 border-gold text-gold font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gold/5 active:scale-[0.98] transition-all"
          >
            <Heart className={`w-4 h-4 ${tryOnProduct && isFavorite(tryOnProduct.id) ? 'fill-gold' : ''}`} />
            <span className="text-xs">Save</span>
          </button>
          
          <button
            onClick={handleTryAnother}
            className="col-span-1 py-3 border-2 border-gold text-gold font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gold/5 active:scale-[0.98] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-xs">Try</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-cream-dark/30 px-6 py-3">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigateTo('home')}
            className="flex flex-col items-center gap-1 text-charcoal/50 hover:text-gold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <button 
            onClick={() => navigateTo('categories')}
            className="flex flex-col items-center gap-1 text-charcoal/50 hover:text-gold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button 
            onClick={() => navigateTo('tryon-upload')}
            className="flex flex-col items-center gap-1 text-gold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          <button 
            onClick={() => navigateTo('favorites')}
            className="flex flex-col items-center gap-1 text-charcoal/50 hover:text-gold transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigateTo('measurements')}
            className="flex flex-col items-center gap-1 text-charcoal/50 hover:text-gold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}
