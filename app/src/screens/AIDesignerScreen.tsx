import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Wand2, Lock, Sparkles, Palette } from 'lucide-react';

const EXAMPLE_DESIGNS = [
  { id: '1', prompt: 'Modern ankara blazer with gold buttons', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop', style: 'Afro-Modern' },
  { id: '2', prompt: 'Minimalist white linen jumpsuit', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop', style: 'Minimalist' },
  { id: '3', prompt: 'Embroidered silk kimono dress', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop', style: 'East Asian Fusion' },
  { id: '4', prompt: 'Streetwear hoodie with kente print', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', style: 'Street Culture' },
  { id: '5', prompt: 'Flowing abaya with geometric embroidery', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop', style: 'Middle Eastern' },
  { id: '6', prompt: 'Tailored saree gown for red carpet', image: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=400&h=500&fit=crop', style: 'South Asian Glam' },
];

export function AIDesignerScreen() {
  const { navigateTo } = useApp();
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-cream-light pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('home')} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-display font-bold text-lg leading-tight">AI Fashion Designer</h1>
              <p className="text-white/70 text-xs">Describe it. We'll design it.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Design Input */}
      <div className="mx-4 mt-4 p-5 bg-white rounded-2xl border border-cream-dark/10 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-semibold text-charcoal">Describe Your Dream Garment</h3>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A flowing ankara maxi dress with off-shoulder sleeves, gold embroidery along the hem, in vibrant orange and blue Adire pattern..."
          className="w-full h-28 px-4 py-3 bg-cream-light rounded-xl text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
        />
        <button className="w-full mt-3 py-3.5 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 relative overflow-hidden cursor-not-allowed opacity-80">
          <Lock className="w-4 h-4" />
          Generate Design — Coming Soon
          <span className="absolute top-1 right-2 px-2 py-0.5 bg-gold text-[10px] font-bold rounded-full text-white">BETA</span>
        </button>
      </div>

      {/* How It Will Work */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200/30">
        <h3 className="text-sm font-semibold text-charcoal mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          How It Will Work
        </h3>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Describe', desc: 'Tell the AI what you want in any language' },
            { step: '2', title: 'Generate', desc: 'AI creates multiple design variations' },
            { step: '3', title: 'Try On', desc: 'See it on your body with virtual try-on' },
            { step: '4', title: 'Make It Real', desc: 'Send to an artisan to craft your design' },
          ].map(item => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{item.step}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                <p className="text-xs text-charcoal/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example Gallery */}
      <div className="px-4 mt-4">
        <h3 className="text-sm font-semibold text-charcoal mb-3">Inspiration Gallery</h3>
        <div className="grid grid-cols-2 gap-3">
          {EXAMPLE_DESIGNS.map(design => (
            <div key={design.id} className="rounded-xl overflow-hidden bg-white border border-cream-dark/10 shadow-xs">
              <img src={design.image} alt={design.prompt} className="w-full aspect-[4/5] object-cover" />
              <div className="p-2.5">
                <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] rounded-full font-medium mb-1">
                  {design.style}
                </span>
                <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-2">"{design.prompt}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
