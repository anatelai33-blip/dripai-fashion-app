import { useApp } from '@/contexts/AppContext';
import { categories, tryOnTypes } from '@/data/products';
import { ArrowLeft, Home, Search, Heart, User, Camera } from 'lucide-react';

export function CategoriesScreen() {
  const { navigateTo } = useApp();

  const categoryIcons: Record<string, React.ReactNode> = {
    suit: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <path d="M20 8 L16 20 L20 22 L24 12 L40 12 L44 22 L48 20 L44 8 Z" fill="#D4AF37"/>
        <path d="M22 22 L20 56 L32 60 L44 56 L42 22 Z" fill="#D4AF37"/>
        <path d="M28 22 L32 40 L36 22" fill="none" stroke="#B8941F" strokeWidth="1"/>
        <circle cx="32" cy="16" r="3" fill="white"/>
      </svg>
    ),
    dress: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <path d="M24 8 Q20 12 22 20 L20 30 L18 56 Q24 60 32 60 Q40 60 46 56 L44 30 L42 20 Q44 12 40 8 Q32 4 24 8Z" fill="#D4AF37"/>
        <path d="M28 20 L32 35 L36 20" fill="none" stroke="#B8941F" strokeWidth="1"/>
      </svg>
    ),
    shoe: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <path d="M8 40 Q8 32 16 30 L48 28 Q56 28 58 36 L58 48 Q58 52 52 52 L16 52 Q8 52 8 40Z" fill="#D4AF37"/>
        <path d="M16 30 L20 22 L28 24" fill="none" stroke="#B8941F" strokeWidth="2"/>
        <ellipse cx="40" cy="38" rx="8" ry="4" fill="#B8941F"/>
      </svg>
    ),
    watch: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <rect x="20" y="8" width="24" height="8" rx="2" fill="#D4AF37"/>
        <rect x="20" y="48" width="24" height="8" rx="2" fill="#D4AF37"/>
        <circle cx="32" cy="32" r="16" fill="#D4AF37"/>
        <circle cx="32" cy="32" r="12" fill="white"/>
        <path d="M32 24 L32 32 L38 36" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    bag: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <path d="M16 24 L12 52 Q12 56 16 56 L48 56 Q52 56 52 52 L48 24Z" fill="#D4AF37"/>
        <path d="M22 24 Q22 12 32 12 Q42 12 42 24" fill="none" stroke="#D4AF37" strokeWidth="4"/>
        <circle cx="32" cy="38" r="4" fill="#B8941F"/>
      </svg>
    ),
    star: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <path d="M32 4 L38 24 L60 24 L42 36 L48 56 L32 44 L16 56 L22 36 L4 24 L26 24Z" fill="#D4AF37"/>
      </svg>
    ),
  };

  const tryOnIcons: Record<string, React.ReactNode> = {
    body: (
      <svg viewBox="0 0 64 64" className="w-10 h-10">
        <path d="M24 8 Q20 10 20 16 Q20 22 24 24 L22 40 L20 56 L28 56 L30 40 L34 40 L36 56 L44 56 L42 40 L40 24 Q44 22 44 16 Q44 10 40 8 Q32 4 24 8Z" fill="#D4AF37"/>
      </svg>
    ),
    shirt: (
      <svg viewBox="0 0 64 64" className="w-10 h-10">
        <path d="M20 16 L12 20 L16 28 L20 24 L20 52 L44 52 L44 24 L48 28 L52 20 L44 16 Q32 20 20 16Z" fill="#D4AF37"/>
      </svg>
    ),
    glasses: (
      <svg viewBox="0 0 64 64" className="w-10 h-10">
        <path d="M8 24 Q8 20 12 20 L26 20 Q30 20 30 24 L30 32 Q30 38 24 38 L14 38 Q8 38 8 32Z" fill="#D4AF37"/>
        <path d="M34 24 Q34 20 38 20 L52 20 Q56 20 56 24 L56 32 Q56 38 50 38 L40 38 Q34 38 34 32Z" fill="#D4AF37"/>
        <path d="M30 26 L34 26" stroke="#D4AF37" strokeWidth="2"/>
      </svg>
    ),
  };

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
          <h1 className="flex-1 text-center font-display font-semibold text-charcoal text-lg">
            Categories
          </h1>
          <div className="w-9" />
        </div>
      </header>

      {/* Shopping Categories */}
      <div className="px-4 py-4">
        <h2 className="text-2xl font-display font-semibold text-gold text-center mb-6">
          What are you<br />shopping for today?
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigateTo('home', { category: category.name })}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow flex flex-col items-center gap-3"
            >
              <div className="text-gold">
                {categoryIcons[category.icon]}
              </div>
              <span className="text-sm font-medium text-charcoal">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Try-On Types */}
      <div className="px-4 py-4">
        <h2 className="text-2xl font-display font-semibold text-gold text-center mb-6">
          What would you like<br />to try on?
        </h2>
        
        <div className="grid grid-cols-3 gap-3">
          {tryOnTypes.slice(0, 3).map((type) => (
            <button
              key={type.id}
              onClick={() => navigateTo('tryon-upload', { type: type.id })}
              className="bg-white rounded-xl p-4 shadow-soft hover:shadow-card transition-shadow flex flex-col items-center gap-2"
            >
              <div className="text-gold">
                {tryOnIcons[type.icon] || categoryIcons[type.icon]}
              </div>
              <span className="text-xs font-medium text-charcoal text-center">{type.name}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {tryOnTypes.slice(3).map((type) => (
            <button
              key={type.id}
              onClick={() => navigateTo('tryon-upload', { type: type.id })}
              className="bg-white rounded-xl p-4 shadow-soft hover:shadow-card transition-shadow flex flex-col items-center gap-2"
            >
              <div className="text-gold">
                {tryOnIcons[type.icon] || categoryIcons[type.icon]}
              </div>
              <span className="text-xs font-medium text-charcoal text-center">{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Photo Section */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-gold" />
            </div>
            <span className="font-medium text-charcoal">Upload photo</span>
            <div className="flex gap-4">
              <button 
                onClick={() => navigateTo('tryon-upload')}
                className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center hover:bg-gold/10 transition-colors"
              >
                <Camera className="w-5 h-5 text-gold" />
              </button>
              <button 
                onClick={() => navigateTo('tryon-upload')}
                className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center hover:bg-gold/10 transition-colors"
              >
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-dark/30 px-6 py-3">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigateTo('home')}
            className="flex flex-col items-center gap-1 text-charcoal/50 hover:text-gold transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
          <button className="flex flex-col items-center gap-1 text-gold">
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
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </div>
  );
}
