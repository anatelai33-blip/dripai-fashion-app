import { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { products } from '@/data/products';
import { Search, ShoppingBag, Heart, Home, Camera, Sparkles, Shirt, Trophy, Users, Scissors, Wand2, Radio, ChevronRight } from 'lucide-react';

const FEATURES = [
  { id: 'ai-stylist', name: 'AI Stylist', icon: Sparkles, color: 'from-gold to-gold-dark', desc: 'Your fashion AI' },
  { id: 'wardrobe', name: 'Wardrobe', icon: Shirt, color: 'from-blue-400 to-blue-600', desc: 'Digital closet' },
  { id: 'drip-score', name: 'DRIP Score', icon: Trophy, color: 'from-purple-400 to-purple-600', desc: 'Level up' },
  { id: 'social', name: 'Social', icon: Users, color: 'from-pink-400 to-pink-600', desc: 'Style feed' },
  { id: 'artisan-connect', name: 'Artisans', icon: Scissors, color: 'from-emerald-400 to-emerald-600', desc: 'Find makers' },
  { id: 'ai-designer', name: 'AI Designer', icon: Wand2, color: 'from-violet-400 to-violet-600', desc: 'Create looks' },
  { id: 'drip-live', name: 'DRIP Live', icon: Radio, color: 'from-red-400 to-red-600', desc: 'Shop live' },
] as const;

export function HomeScreen() {
  const { navigateTo, toggleFavorite, isFavorite, cartCount } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => {
        if (selectedCategory === 'Men') return p.category === 'suits' || p.category === 'outerwear';
        if (selectedCategory === 'Women') return p.category === 'dresses';
        if (selectedCategory === 'Shoes') return p.category === 'shoes';
        if (selectedCategory === 'Watches') return p.category === 'watches';
        if (selectedCategory === 'Accessories') return p.category === 'accessories';
        return true;
      });
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  const categoryFilters = ['All', 'Men', 'Women', 'Shoes', 'Watches', 'Accessories'];

  return (
    <div className="min-h-screen bg-cream-light pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream-light/95 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="DRIP" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-display font-bold text-gold">DRIP</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo('favorites')}
              className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5 text-charcoal" />
            </button>
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
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
        </div>
      </header>

      {/* AI Stylist Banner */}
      <div className="px-4 pt-3">
        <button
          onClick={() => navigateTo('ai-stylist')}
          className="w-full p-4 bg-gradient-to-r from-charcoal to-charcoal/90 rounded-2xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all group"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-gold to-gold-dark rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-white font-display font-bold text-sm">DRIP AI Stylist</h3>
            <p className="text-white/50 text-xs">Ask me anything about fashion — I speak every style language</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gold" />
        </button>
      </div>

      {/* Features Grid */}
      <div className="px-4 pt-4">
        <h2 className="text-sm font-semibold text-charcoal mb-2.5">Explore Features</h2>
        <div className="grid grid-cols-4 gap-2">
          {FEATURES.map(feature => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => navigateTo(feature.id as any)}
                className="flex flex-col items-center gap-1.5 p-2.5 bg-white rounded-xl border border-cream-dark/10 hover:border-gold/30 hover:shadow-xs transition-all"
              >
                <div className={`w-9 h-9 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-[10px] font-medium text-charcoal text-center leading-tight">{feature.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 py-3">
        <h2 className="text-sm font-semibold text-charcoal mb-2.5">Shop Collection</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gold text-white'
                  : 'bg-white text-charcoal hover:bg-cream-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-soft"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-gold text-gold' : 'text-charcoal'}`} 
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-charcoal truncate">
                  {product.name}
                </h3>
                <p className="text-gold font-semibold text-sm mt-1">
                  ${product.price.toFixed(2)}
                </p>
                
                {/* Try It On Button */}
                <button
                  onClick={() => navigateTo('product', { product })}
                  className="w-full mt-3 py-2 bg-gold/10 text-gold text-xs font-medium rounded-lg flex items-center justify-center gap-1 hover:bg-gold hover:text-white transition-colors"
                >
                  <Camera className="w-3 h-3" />
                  Try It On
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-dark/30 px-4 py-2">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-0.5 text-gold">
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>
          <button 
            onClick={() => navigateTo('social')}
            className="flex flex-col items-center gap-0.5 text-charcoal/50 hover:text-gold transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Social</span>
          </button>
          <button 
            onClick={() => navigateTo('ai-stylist')}
            className="flex flex-col items-center gap-0.5 text-charcoal/50 hover:text-gold transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-gold to-gold-dark rounded-full flex items-center justify-center -mt-4 shadow-gold">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </button>
          <button 
            onClick={() => navigateTo('wardrobe')}
            className="flex flex-col items-center gap-0.5 text-charcoal/50 hover:text-gold transition-colors"
          >
            <Shirt className="w-5 h-5" />
            <span className="text-[10px]">Wardrobe</span>
          </button>
          <button 
            onClick={() => navigateTo('drip-score')}
            className="flex flex-col items-center gap-0.5 text-charcoal/50 hover:text-gold transition-colors"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[10px]">Score</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
