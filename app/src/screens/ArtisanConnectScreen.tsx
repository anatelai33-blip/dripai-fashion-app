import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import type { Artisan } from '@/types';
import { ArrowLeft, Star, MapPin, Filter, Lock } from 'lucide-react';

const REGIONS = ['All', 'West Africa', 'East Africa', 'North Africa', 'South Asia', 'Middle East', 'Southeast Asia', 'Europe', 'Americas'];

const MOCK_ARTISANS: Artisan[] = [
  {
    id: '1', name: 'Mama Adunni', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop',
    specialty: 'Ankara & Aso-Oke Tailoring', region: 'West Africa', rating: 4.9, reviewCount: 234,
    location: 'Lagos, Nigeria', bio: 'Master tailor with 20+ years of experience in traditional Nigerian fashion.', priceRange: '$30-$200',
  },
  {
    id: '2', name: 'Kofi Mensah', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop',
    specialty: 'Kente Weaving & Design', region: 'West Africa', rating: 4.8, reviewCount: 189,
    location: 'Accra, Ghana', bio: 'Third-generation kente weaver preserving Ashanti textile traditions.', priceRange: '$50-$500',
  },
  {
    id: '3', name: 'Priya Sharma', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    specialty: 'Saree Draping & Embroidery', region: 'South Asia', rating: 4.9, reviewCount: 312,
    location: 'Mumbai, India', bio: 'Specializes in bridal sarees with intricate zardozi and mirror work.', priceRange: '$40-$800',
  },
  {
    id: '4', name: 'Fatima Al-Hassan', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    specialty: 'Abaya & Modest Fashion', region: 'Middle East', rating: 4.7, reviewCount: 156,
    location: 'Dubai, UAE', bio: 'Luxury modest fashion designer blending tradition with haute couture.', priceRange: '$100-$1,500',
  },
  {
    id: '5', name: 'Wanjiku Kamau', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    specialty: 'Maasai Beadwork & Accessories', region: 'East Africa', rating: 4.8, reviewCount: 98,
    location: 'Nairobi, Kenya', bio: 'Creates stunning contemporary accessories inspired by Maasai beading traditions.', priceRange: '$15-$150',
  },
  {
    id: '6', name: 'Nguyen Thi Mai', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
    specialty: 'Ao Dai & Silk Tailoring', region: 'Southeast Asia', rating: 4.9, reviewCount: 201,
    location: 'Ho Chi Minh City, Vietnam', bio: 'Master silk artisan crafting modern ao dai with traditional techniques.', priceRange: '$50-$400',
  },
];

export function ArtisanConnectScreen() {
  const { navigateTo } = useApp();
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filtered = selectedRegion === 'All' ? MOCK_ARTISANS : MOCK_ARTISANS.filter(a => a.region === selectedRegion);

  return (
    <div className="min-h-screen bg-cream-light pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream-light/95 backdrop-blur-sm px-4 py-3 border-b border-cream-dark/20">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigateTo('home')} className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-charcoal" />
          </button>
          <div>
            <h1 className="text-lg font-display font-bold text-charcoal">Artisan Connect</h1>
            <p className="text-xs text-charcoal/50">Discover master craftspeople worldwide</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-1">
          <Filter className="w-3.5 h-3.5 text-charcoal/40" />
          <span className="text-xs text-charcoal/40 uppercase tracking-wider font-semibold">Region</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {REGIONS.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedRegion === region
                  ? 'bg-gold text-white shadow-gold'
                  : 'bg-white text-charcoal/60 border border-cream-dark/30'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </header>

      {/* Artisan Cards */}
      <div className="px-4 pt-4 space-y-3">
        {filtered.map(artisan => (
          <div key={artisan.id} className="bg-white rounded-2xl overflow-hidden border border-cream-dark/10 shadow-xs relative">
            <div className="flex gap-4 p-4">
              <img src={artisan.photo} alt={artisan.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-charcoal">{artisan.name}</h3>
                <p className="text-xs text-gold font-medium mt-0.5">{artisan.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-charcoal/40" />
                  <span className="text-xs text-charcoal/50">{artisan.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-gold text-gold" />
                    <span className="text-xs font-semibold text-charcoal">{artisan.rating}</span>
                    <span className="text-xs text-charcoal/40">({artisan.reviewCount})</span>
                  </div>
                  <span className="text-xs text-charcoal/30">•</span>
                  <span className="text-xs text-charcoal/50">{artisan.priceRange}</span>
                </div>
              </div>
            </div>
            <p className="px-4 pb-2 text-xs text-charcoal/60 leading-relaxed">{artisan.bio}</p>
            
            {/* Coming Soon Overlay on Book Button */}
            <div className="px-4 pb-4">
              <button className="w-full py-2.5 bg-charcoal/5 text-charcoal/40 rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-not-allowed">
                <Lock className="w-3.5 h-3.5" />
                Book Artisan — Coming Soon
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon Banner */}
      <div className="mx-4 mt-6 p-5 bg-gradient-to-r from-charcoal to-charcoal/90 rounded-2xl text-center">
        <Lock className="w-8 h-8 text-gold mx-auto mb-2" />
        <h3 className="text-white font-display font-bold mb-1">Booking Coming Soon</h3>
        <p className="text-white/50 text-xs leading-relaxed">
          Soon you'll be able to book artisans directly, share your body measurements, and get custom pieces made just for you.
        </p>
      </div>
    </div>
  );
}
