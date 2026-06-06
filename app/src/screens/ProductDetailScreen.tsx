import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Star, ChevronDown, ChevronUp, Camera, ShoppingBag, Heart, ArrowLeft } from 'lucide-react';

export function ProductDetailScreen() {
  const { navigateTo, screenParams, addToCart, toggleFavorite, isFavorite } = useApp();
  const { product } = screenParams || {};
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    navigateTo('home');
    return null;
  }

  const handleTryOn = () => {
    navigateTo('tryon-upload', { product });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
  };

  const relatedProducts = [
    { id: 'r1', name: 'Silk Dress', price: 100, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=250&fit=crop' },
    { id: 'r2', name: 'Designer Heels', price: 100, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=250&fit=crop' },
    { id: 'r3', name: 'Statement Handbag', price: 160, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=250&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => navigateTo('home')}
          className="p-2 hover:bg-cream-light rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </button>
        <span className="font-display font-semibold text-charcoal">Product Details</span>
        <button 
          onClick={() => toggleFavorite(product.id)}
          className="p-2 hover:bg-cream-light rounded-full transition-colors"
        >
          <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-gold text-gold' : 'text-charcoal'}`} />
        </button>
      </header>

      {/* Product Images */}
      <div className="relative">
        <div className="aspect-square bg-cream-light">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image Dots */}
        {product.images.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {product.images.map((_: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-gold w-4' : 'bg-cream-dark'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-4 pt-4">
        <h1 className="text-2xl font-display font-semibold text-charcoal">
          {product.name}
        </h1>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-cream-dark'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-charcoal/60">({product.reviewCount} Reviews)</span>
        </div>

        {/* Price */}
        <p className="text-3xl font-bold text-gold mt-3">
          ${product.price.toFixed(2)}
        </p>

        {/* Size Selection */}
        <div className="mt-4">
          <label className="text-sm font-medium text-charcoal/70 uppercase tracking-wide">
            Size
          </label>
          <div className="flex gap-2 mt-2">
            {product.sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                  selectedSize === size
                    ? 'border-gold bg-gold text-white'
                    : 'border-cream-dark text-charcoal hover:border-gold/50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mt-4">
          <label className="text-sm font-medium text-charcoal/70 uppercase tracking-wide">
            Color
          </label>
          <div className="flex gap-3 mt-2">
            {product.colors.map((color: { name: string; hex: string }) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color.name ? 'border-gold scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleTryOn}
            className="flex-1 py-4 bg-gold text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gold-dark active:scale-[0.98] transition-all"
          >
            <Camera className="w-5 h-5" />
            Try It On
          </button>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 py-4 border-2 border-gold text-gold font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gold hover:text-white active:scale-[0.98] transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </button>

        {/* Expandable Sections */}
        <div className="mt-6 space-y-2">
          {[
            { id: 'desc', title: 'Description', content: product.description },
            { id: 'care', title: 'Care Instructions', content: product.careInstructions || 'Professional clean recommended.' },
            { id: 'shipping', title: 'Shipping', content: product.shippingInfo || 'Free worldwide shipping on orders over $50.' },
          ].map((section) => (
            <div key={section.id} className="border-b border-cream-dark/30">
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full py-3 flex items-center justify-between text-left"
              >
                <span className="font-medium text-charcoal">{section.title}</span>
                {expandedSection === section.id ? (
                  <ChevronUp className="w-5 h-5 text-charcoal/50" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-charcoal/50" />
                )}
              </button>
              {expandedSection === section.id && (
                <p className="pb-3 text-sm text-charcoal/70 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Related Products */}
        <div className="mt-8">
          <h3 className="text-lg font-display font-semibold text-gold mb-4">
            You May Also Like
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {relatedProducts.map((item) => (
              <div 
                key={item.id}
                onClick={() => navigateTo('product', { product: { ...item, images: [item.image], sizes: ['M'], colors: [{name: 'Default', hex: '#ccc'}], rating: 4, reviewCount: 10, category: 'related', inStock: true, tryOnEnabled: true } })}
                className="flex-shrink-0 w-32 cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-cream-light">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-charcoal mt-2 truncate">{item.name}</p>
                <p className="text-sm font-medium text-gold">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
