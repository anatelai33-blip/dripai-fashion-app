import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Info, Ruler, Weight, Shirt, Footprints, Watch } from 'lucide-react';

export function MeasurementsScreen() {
  const { navigateTo, measurements, updateMeasurements } = useApp();
  const [gender, setGender] = useState<'Men' | 'Women' | 'Prefer not to say'>('Prefer not to say');
  const [showInfo, setShowInfo] = useState(false);
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [shoeUnit, setShoeUnit] = useState<'US' | 'EU' | 'UK'>('US');

  const handleSave = () => {
    navigateTo('home');
  };

  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
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
            Your Measurements
          </h1>
          <div className="w-9" />
        </div>
        <p className="text-center text-sm text-charcoal/60 mt-1">
          Help us find your perfect fit
        </p>
      </header>

      {/* Gender Selection */}
      <div className="px-4 py-4">
        <div className="flex bg-white rounded-full p-1 shadow-soft">
          {(['Men', 'Women', 'Prefer not to say'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 py-2 text-xs font-medium rounded-full transition-all ${
                gender === g 
                  ? 'bg-dusty-blue text-white' 
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Body Measurements */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="bg-white rounded-2xl p-4 shadow-soft mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-dusty-blue" />
              <span className="font-medium text-charcoal">Body Measurements</span>
            </div>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-1 hover:bg-cream-light rounded-full transition-colors"
            >
              <Info className="w-4 h-4 text-charcoal/50" />
            </button>
          </div>

          {showInfo && (
            <div className="mb-4 p-3 bg-cream-light rounded-xl text-sm text-charcoal/70">
              Why we need this: Your measurements help us provide accurate size recommendations and personalize your shopping experience. We keep your data secure and private.
            </div>
          )}

          {/* Height */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-charcoal/40" />
                <span className="text-sm text-charcoal">Height</span>
              </div>
              <div className="flex bg-cream-light rounded-lg p-0.5">
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-2 py-1 text-xs rounded-md transition-all ${unit === 'cm' ? 'bg-white shadow-sm' : ''}`}
                >
                  cm
                </button>
                <button
                  onClick={() => setUnit('ft')}
                  className={`px-2 py-1 text-xs rounded-md transition-all ${unit === 'ft' ? 'bg-white shadow-sm' : ''}`}
                >
                  ft
                </button>
              </div>
            </div>
            <input
              type="number"
              placeholder={`e.g., 170 ${unit}`}
              value={measurements.height || ''}
              onChange={(e) => updateMeasurements({ height: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-cream-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          {/* Weight */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Weight className="w-4 h-4 text-charcoal/40" />
                <span className="text-sm text-charcoal">Weight</span>
              </div>
              <div className="flex bg-cream-light rounded-lg p-0.5">
                <button
                  onClick={() => setWeightUnit('kg')}
                  className={`px-2 py-1 text-xs rounded-md transition-all ${weightUnit === 'kg' ? 'bg-white shadow-sm' : ''}`}
                >
                  kg
                </button>
                <button
                  onClick={() => setWeightUnit('lb')}
                  className={`px-2 py-1 text-xs rounded-md transition-all ${weightUnit === 'lb' ? 'bg-white shadow-sm' : ''}`}
                >
                  lb
                </button>
              </div>
            </div>
            <input
              type="number"
              placeholder={`e.g., 65 ${weightUnit}`}
              value={measurements.weight || ''}
              onChange={(e) => updateMeasurements({ weight: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-cream-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          {/* Bust/Chest & Waist */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <span className="text-sm text-charcoal">Bust/Chest</span>
              <input
                type="number"
                placeholder="inches/cm"
                value={measurements.chest || ''}
                onChange={(e) => updateMeasurements({ chest: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-3 bg-cream-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
            <div>
              <span className="text-sm text-charcoal">Waist</span>
              <input
                type="number"
                placeholder="inches/cm"
                value={measurements.waist || ''}
                onChange={(e) => updateMeasurements({ waist: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-3 bg-cream-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
          </div>

          {/* Hips & Inseam */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-sm text-charcoal">Hips</span>
              <input
                type="number"
                placeholder="inches/cm"
                value={measurements.hips || ''}
                onChange={(e) => updateMeasurements({ hips: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-3 bg-cream-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
            <div>
              <span className="text-sm text-charcoal">Inseam</span>
              <input
                type="number"
                placeholder="inches/cm"
                value={measurements.inseam || ''}
                onChange={(e) => updateMeasurements({ inseam: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-3 bg-cream-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
          </div>
        </div>

        {/* Shoe Size */}
        <div className="bg-white rounded-2xl p-4 shadow-soft mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Footprints className="w-5 h-5 text-dusty-blue" />
            <span className="font-medium text-charcoal">Shoe Size</span>
          </div>
          <div className="flex gap-2 mb-3">
            {(['US', 'EU', 'UK'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setShoeUnit(u)}
                className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                  shoeUnit === u
                    ? 'bg-gold/10 border-gold text-gold'
                    : 'border-cream-dark text-charcoal/70'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder={`Enter ${shoeUnit} size`}
            value={measurements.shoeSize || ''}
            onChange={(e) => updateMeasurements({ shoeSize: e.target.value })}
            className="w-full px-4 py-3 bg-cream-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
        </div>

        {/* Watch Size */}
        <div className="bg-white rounded-2xl p-4 shadow-soft mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Watch className="w-5 h-5 text-dusty-blue" />
              <span className="font-medium text-charcoal">Watch Size</span>
            </div>
            <button className="text-xs text-gold hover:underline">
              Measuring Guide
            </button>
          </div>
          <input
            type="number"
            placeholder="Wrist Circumference (inches/cm)"
            value={measurements.wristCircumference || ''}
            onChange={(e) => updateMeasurements({ wristCircumference: Number(e.target.value) })}
            className="w-full px-4 py-3 bg-cream-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
        </div>

        {/* Clothing Sizes */}
        <div className="bg-white rounded-2xl p-4 shadow-soft mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Shirt className="w-5 h-5 text-dusty-blue" />
            <span className="font-medium text-charcoal">Clothing Sizes</span>
          </div>

          {/* Tops */}
          <div className="mb-4">
            <span className="text-sm text-charcoal/70">Tops</span>
            <div className="flex gap-2 mt-2 flex-wrap">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => updateMeasurements({ topSize: size })}
                  className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                    measurements.topSize === size
                      ? 'bg-gold/10 border-gold text-gold'
                      : 'border-cream-dark text-charcoal/70'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Bottoms */}
          <div className="mb-4">
            <span className="text-sm text-charcoal/70">Bottoms</span>
            <div className="flex gap-2 mt-2 flex-wrap">
              {['28', '29', '30', '32', '33', '34', '35', '37', '38', '40'].map((size) => (
                <button
                  key={size}
                  onClick={() => updateMeasurements({ bottomSize: size })}
                  className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                    measurements.bottomSize === size
                      ? 'bg-gold/10 border-gold text-gold'
                      : 'border-cream-dark text-charcoal/70'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dress/Suit */}
          <div>
            <span className="text-sm text-charcoal/70">Dress/Suit</span>
            <button className="w-full mt-2 px-4 py-3 bg-cream-light rounded-xl text-sm text-charcoal/70 text-left hover:bg-cream-dark transition-colors">
              View Size Chart
            </button>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-dark/20 px-4 py-4 flex gap-3">
        <button
          onClick={() => navigateTo('home')}
          className="flex-1 py-3 bg-cream-light text-charcoal/60 font-medium rounded-xl hover:bg-cream-dark transition-colors"
        >
          Skip for Now
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors"
        >
          Save Measurements
        </button>
      </div>
    </div>
  );
}
