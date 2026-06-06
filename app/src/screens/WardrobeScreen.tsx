import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import type { WardrobeItem } from '@/types';
import { ArrowLeft, Plus, Shirt, X, Sparkles, Camera, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories', 'Traditional'] as const;

const OUTFIT_TIPS = [
  "Try pairing your ankara top with high-waisted jeans for a fusion look!",
  "A classic white shirt + tailored trousers never fails for a power meeting.",
  "Layer a denim jacket over your favorite dress for casual weekend vibes.",
  "Mix traditional and modern — a kente sash with a blazer is fire 🔥",
  "Monochrome outfits instantly look more expensive. Try all-cream today!",
];

export function WardrobeScreen() {
  const { navigateTo } = useApp();
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<WardrobeItem['category']>('Tops');
  const [newItemImage, setNewItemImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dailyTip] = useState(OUTFIT_TIPS[Math.floor(Math.random() * OUTFIT_TIPS.length)]);

  useEffect(() => {
    const saved = localStorage.getItem('drip-wardrobe');
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('drip-wardrobe', JSON.stringify(items));
    }
  }, [items]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewItemImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addItem = () => {
    if (!newItemImage || !newItemName.trim()) return;
    const item: WardrobeItem = {
      id: Date.now().toString(),
      imageUrl: newItemImage,
      category: newItemCategory,
      name: newItemName.trim(),
      addedAt: new Date(),
    };
    setItems(prev => [item, ...prev]);
    setShowAddModal(false);
    setNewItemName('');
    setNewItemCategory('Tops');
    setNewItemImage(null);
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const updated = prev.filter(i => i.id !== id);
      localStorage.setItem('drip-wardrobe', JSON.stringify(updated));
      return updated;
    });
  };

  const filtered = selectedCategory === 'All' ? items : items.filter(i => i.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cream-light pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream-light/95 backdrop-blur-sm px-4 py-3 border-b border-cream-dark/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigateTo('home')} className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-charcoal" />
            </button>
            <div>
              <h1 className="text-lg font-display font-bold text-charcoal">My Wardrobe</h1>
              <p className="text-xs text-charcoal/50">{items.length} items</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2.5 bg-gradient-to-r from-gold to-gold-dark rounded-xl text-white shadow-gold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Outfit of the Day */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-gold/10 to-gold/5 rounded-2xl border border-gold/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-1">Outfit Tip of the Day</h3>
            <p className="text-xs text-charcoal/70 leading-relaxed">{dailyTip}</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-1.5 mb-1">
          <Filter className="w-3.5 h-3.5 text-charcoal/40" />
          <span className="text-xs text-charcoal/40 uppercase tracking-wider font-semibold">Filter</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gold text-white shadow-gold'
                  : 'bg-white text-charcoal/70 border border-cream-dark/30 hover:border-gold/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Wardrobe Grid */}
      <div className="px-4 mt-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-cream-dark/30 rounded-full flex items-center justify-center mb-4">
              <Shirt className="w-8 h-8 text-charcoal/30" />
            </div>
            <h3 className="text-charcoal/50 font-medium mb-1">
              {items.length === 0 ? 'Your wardrobe is empty' : 'No items in this category'}
            </h3>
            <p className="text-xs text-charcoal/30 mb-4">
              {items.length === 0 ? 'Start adding your clothes!' : 'Try a different filter'}
            </p>
            {items.length === 0 && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-white rounded-xl text-sm font-medium shadow-gold"
              >
                <Camera className="w-4 h-4 inline mr-1.5" />
                Add First Item
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filtered.map(item => (
              <div key={item.id} className="relative group rounded-xl overflow-hidden bg-white shadow-xs border border-cream-dark/10">
                <img src={item.imageUrl} alt={item.name} className="w-full aspect-square object-cover" />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
                <div className="p-2">
                  <p className="text-xs font-medium text-charcoal truncate">{item.name}</p>
                  <span className="inline-block mt-0.5 px-2 py-0.5 bg-gold/10 text-gold text-[10px] rounded-full font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold text-charcoal">Add to Wardrobe</h2>
              <button onClick={() => { setShowAddModal(false); setNewItemImage(null); setNewItemName(''); }} className="p-2 hover:bg-cream-dark/20 rounded-full">
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Photo Upload */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square rounded-2xl border-2 border-dashed border-cream-dark/40 flex flex-col items-center justify-center cursor-pointer hover:border-gold/50 transition-colors overflow-hidden mb-4"
            >
              {newItemImage ? (
                <img src={newItemImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera className="w-10 h-10 text-charcoal/30 mb-2" />
                  <p className="text-sm text-charcoal/40">Tap to upload photo</p>
                </>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            {/* Name */}
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item name (e.g., Blue Ankara Top)"
              className="w-full px-4 py-3 bg-cream-light rounded-xl text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold/30 mb-3"
            />

            {/* Category */}
            <div className="flex flex-wrap gap-2 mb-5">
              {CATEGORIES.filter(c => c !== 'All').map(cat => (
                <button
                  key={cat}
                  onClick={() => setNewItemCategory(cat as WardrobeItem['category'])}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    newItemCategory === cat
                      ? 'bg-gold text-white'
                      : 'bg-cream-light text-charcoal/60 border border-cream-dark/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={addItem}
              disabled={!newItemImage || !newItemName.trim()}
              className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-dark text-white rounded-xl font-semibold disabled:opacity-40 shadow-gold hover:shadow-lg transition-all"
            >
              Add to Wardrobe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
