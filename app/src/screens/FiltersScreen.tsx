import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { brands } from '@/data/products';

export function FiltersScreen() {
  const { navigateTo } = useApp();
  const [gender, setGender] = useState<'Men' | 'Women' | 'Unisex'>('Unisex');
  const [expandedSections, setExpandedSections] = useState<string[]>(['clothing']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Tops', 'Bottoms', 'Suits']);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S']);
  const [selectedShoeSizes, setSelectedShoeSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(['Cotton']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setSelectedSizes([]);
    setSelectedShoeSizes([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
  };

  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#008000' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Brown', hex: '#8B4513' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-cream-dark/20 px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigateTo('home')}
            className="p-2 hover:bg-cream-light rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-charcoal" />
          </button>
          <h1 className="font-display font-semibold text-charcoal text-lg">Filters</h1>
          <button 
            onClick={clearAll}
            className="flex items-center gap-1 text-gold text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </header>

      {/* Gender Toggle */}
      <div className="px-4 py-4">
        <div className="flex bg-cream-light rounded-full p-1">
          {(['Men', 'Women', 'Unisex'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 py-2 text-sm font-medium rounded-full transition-all ${
                gender === g 
                  ? 'bg-gold text-white' 
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Sections */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Clothing */}
        <div className="border-b border-cream-dark/20">
          <button 
            onClick={() => toggleSection('clothing')}
            className="w-full py-4 flex items-center justify-between"
          >
            <span className="font-medium text-charcoal">Clothing</span>
            {expandedSections.includes('clothing') ? (
              <ChevronUp className="w-5 h-5 text-charcoal/50" />
            ) : (
              <ChevronDown className="w-5 h-5 text-charcoal/50" />
            )}
          </button>
          {expandedSections.includes('clothing') && (
            <div className="pb-4 flex flex-wrap gap-2">
              {['Tops', 'Bottoms', 'Dresses', 'Suits', 'Outerwear'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                    selectedCategories.includes(cat)
                      ? 'bg-gold/10 border-gold text-gold'
                      : 'border-cream-dark text-charcoal/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Shoes */}
        <div className="border-b border-cream-dark/20">
          <button 
            onClick={() => toggleSection('shoes')}
            className="w-full py-4 flex items-center justify-between"
          >
            <span className="font-medium text-charcoal">Shoes</span>
            <ChevronDown className="w-5 h-5 text-charcoal/50" />
          </button>
        </div>

        {/* Watches */}
        <div className="border-b border-cream-dark/20">
          <button 
            onClick={() => toggleSection('watches')}
            className="w-full py-4 flex items-center justify-between"
          >
            <span className="font-medium text-charcoal">Watches</span>
            <ChevronDown className="w-5 h-5 text-charcoal/50" />
          </button>
        </div>

        {/* Accessories */}
        <div className="border-b border-cream-dark/20">
          <button 
            onClick={() => toggleSection('accessories')}
            className="w-full py-4 flex items-center justify-between"
          >
            <span className="font-medium text-charcoal">Accessories</span>
            <ChevronDown className="w-5 h-5 text-charcoal/50" />
          </button>
        </div>

        {/* Price Range */}
        <div className="py-4 border-b border-cream-dark/20">
          <span className="font-medium text-charcoal">Price Range</span>
          <div className="mt-4">
            <div className="relative h-2 bg-cream-light rounded-full">
              <div 
                className="absolute h-full bg-gold rounded-full"
                style={{ 
                  left: `${(priceRange[0] / 5000) * 100}%`, 
                  right: `${100 - (priceRange[1] / 5000) * 100}%` 
                }}
              />
              <div 
                className="absolute w-4 h-4 bg-gold rounded-full -mt-1 shadow-md cursor-pointer"
                style={{ left: `${(priceRange[0] / 5000) * 100}%` }}
              />
              <div 
                className="absolute w-4 h-4 bg-gold rounded-full -mt-1 shadow-md cursor-pointer"
                style={{ left: `${(priceRange[1] / 5000) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-charcoal/60">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Size Selectors */}
        <div className="py-4 border-b border-cream-dark/20">
          <span className="font-medium text-charcoal">Size Selectors</span>
          <div className="mt-3">
            <span className="text-sm text-charcoal/60">Clothing Size</span>
            <div className="flex gap-2 mt-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`w-10 h-10 rounded-full text-sm border transition-all ${
                    selectedSizes.includes(size)
                      ? 'bg-gold/10 border-gold text-gold'
                      : 'border-cream-dark text-charcoal/70'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-charcoal/60">Shoe Size (US)</span>
            <div className="flex gap-2 mt-2">
              {['7', '8', '9', '10', '11', '12'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedShoeSizes(prev => 
                    prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                  )}
                  className={`w-10 h-10 rounded-full text-sm border transition-all ${
                    selectedShoeSizes.includes(size)
                      ? 'bg-gold/10 border-gold text-gold'
                      : 'border-cream-dark text-charcoal/70'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="py-4 border-b border-cream-dark/20">
          <span className="font-medium text-charcoal">Brand Filter</span>
          <div className="mt-3 relative">
            <input
              type="text"
              placeholder="Search Brands"
              className="w-full px-4 py-3 bg-cream-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${
                  selectedBrands.includes(brand)
                    ? 'bg-gold/10 border-gold text-gold'
                    : 'border-cream-dark text-charcoal/70'
                }`}
              >
                <div className={`w-4 h-4 rounded border ${selectedBrands.includes(brand) ? 'bg-gold border-gold' : 'border-charcoal/30'}`}>
                  {selectedBrands.includes(brand) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="py-4 border-b border-cream-dark/20">
          <span className="font-medium text-charcoal">Color Palette</span>
          <div className="flex flex-wrap gap-2 mt-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColors.includes(color.name) ? 'border-gold scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Material */}
        <div className="py-4">
          <span className="font-medium text-charcoal">Material</span>
          <div className="flex gap-2 mt-3">
            {['Leather', 'Cotton', 'Synthetic'].map((material) => (
              <button
                key={material}
                onClick={() => toggleMaterial(material)}
                className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                  selectedMaterials.includes(material)
                    ? 'bg-gold/10 border-gold text-gold'
                    : 'border-cream-dark text-charcoal/70'
                }`}
              >
                {material}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-dark/20 px-4 py-4 flex gap-3">
        <button
          onClick={clearAll}
          className="flex-1 py-3 border-2 border-gold text-gold font-medium rounded-xl hover:bg-gold/5 transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={() => navigateTo('home')}
          className="flex-1 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
