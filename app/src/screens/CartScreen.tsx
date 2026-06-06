import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Home, Search, Heart, Camera } from 'lucide-react';

export function CartScreen() {
  const { navigateTo, cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useApp();

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
            Shopping Bag ({cartCount})
          </h1>
          {cart.length > 0 && (
            <button 
              onClick={() => clearCart()}
              className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors"
            >
              <Trash2 className="w-5 h-5 text-charcoal/60" />
            </button>
          )}
        </div>
      </header>

      {/* Cart Items */}
      <div className="px-4 py-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="w-16 h-16 text-charcoal/20 mb-4" />
            <h2 className="text-xl font-display font-semibold text-charcoal mb-2">
              Your bag is empty
            </h2>
            <p className="text-charcoal/60 mb-6 text-center">
              Looks like you haven't added anything to your bag yet.
            </p>
            <button
              onClick={() => navigateTo('home')}
              className="px-8 py-3 bg-gold text-white font-semibold rounded-xl hover:bg-gold-light transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div 
                key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                className="bg-white rounded-2xl p-4 flex gap-4"
              >
                {/* Product Image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-charcoal text-sm truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-charcoal/60 text-xs mt-1">
                    Size: {item.size} · Color: {item.color}
                  </p>
                  <p className="text-gold font-semibold mt-2">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) {
                          removeFromCart(item.product.id, item.size, item.color);
                        } else {
                          updateQuantity(item.product.id, item.size, item.color, item.quantity - 1);
                        }
                      }}
                      className="w-8 h-8 rounded-full bg-cream-light flex items-center justify-center hover:bg-cream-dark/30 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-charcoal" />
                    </button>
                    <span className="text-sm font-semibold text-charcoal w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-cream-light flex items-center justify-center hover:bg-cream-dark/30 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-charcoal" />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                  className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors self-start"
                >
                  <Trash2 className="w-4 h-4 text-charcoal/40" />
                </button>
              </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 mt-6">
              <h3 className="font-display font-semibold text-charcoal mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Subtotal ({cartCount} items)</span>
                  <span className="text-charcoal font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Shipping</span>
                  <span className="text-gold font-medium">Free</span>
                </div>
                <div className="border-t border-cream-dark/20 pt-3 flex justify-between">
                  <span className="font-display font-semibold text-charcoal">Total</span>
                  <span className="font-display font-bold text-gold text-lg">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full mt-6 py-4 bg-gold text-white font-semibold rounded-xl hover:bg-gold-light transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-dark/10 px-6 py-3 z-50">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <button onClick={() => navigateTo('home')} className="flex flex-col items-center gap-1">
            <Home className="w-5 h-5 text-charcoal/40" />
            <span className="text-[10px] text-charcoal/40">Home</span>
          </button>
          <button onClick={() => navigateTo('categories')} className="flex flex-col items-center gap-1">
            <Search className="w-5 h-5 text-charcoal/40" />
            <span className="text-[10px] text-charcoal/40">Browse</span>
          </button>
          <button onClick={() => navigateTo('tryon-upload')} className="flex flex-col items-center gap-1">
            <Camera className="w-5 h-5 text-charcoal/40" />
            <span className="text-[10px] text-charcoal/40">Try On</span>
          </button>
          <button onClick={() => navigateTo('favorites')} className="flex flex-col items-center gap-1">
            <Heart className="w-5 h-5 text-charcoal/40" />
            <span className="text-[10px] text-charcoal/40">Favorites</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <span className="text-[10px] text-gold font-medium">Bag</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
