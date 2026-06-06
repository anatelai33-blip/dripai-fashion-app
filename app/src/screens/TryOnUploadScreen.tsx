import { useRef, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Camera, Image, User, ArrowLeft, Lightbulb } from 'lucide-react';

export function TryOnUploadScreen() {
  const { navigateTo, screenParams, setTryOnImage, setTryOnProduct } = useApp();
  const { product } = screenParams || {};
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (selectedImage) {
      setTryOnImage(selectedImage);
      if (product) {
        setTryOnProduct(product);
      }
      navigateTo('tryon-processing');
    }
  };

  const handleUseProfilePhoto = () => {
    // Simulate using a profile photo
    setSelectedImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-light to-white flex flex-col">
      {/* Header */}
      <header className="px-4 py-4 flex items-center">
        <button 
          onClick={() => navigateTo('home')}
          className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-charcoal text-lg">
          Virtual Try-On
        </h1>
        <div className="w-9" />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Upload Area */}
        <div className="w-full max-w-sm">
          {/* Person Silhouette */}
          <div className="relative w-48 h-64 mx-auto mb-8">
            {selectedImage ? (
              <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-gold shadow-gold">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 200 260" className="w-full h-full">
                  <defs>
                    <linearGradient id="silhouetteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F5E6D3" />
                      <stop offset="100%" stopColor="#E8D4BC" />
                    </linearGradient>
                  </defs>
                  {/* Dashed outline */}
                  <ellipse 
                    cx="100" cy="60" rx="45" ry="50" 
                    fill="none" 
                    stroke="#D4AF37" 
                    strokeWidth="2"
                    strokeDasharray="8,6"
                    opacity="0.6"
                  />
                  <path 
                    d="M100 110 L100 120 M55 120 Q30 140 30 200 Q30 240 50 250 L150 250 Q170 240 170 200 Q170 140 145 120 L100 110"
                    fill="url(#silhouetteGradient)"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeDasharray="8,6"
                    opacity="0.6"
                  />
                  {/* Inner gradient fill */}
                  <ellipse 
                    cx="100" cy="60" rx="35" ry="40" 
                    fill="url(#silhouetteGradient)"
                    opacity="0.5"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Upload Buttons */}
          <div className="space-y-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
              capture="environment"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 bg-gold text-white font-medium rounded-xl flex items-center justify-center gap-3 hover:bg-gold-dark active:scale-[0.98] transition-all"
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 bg-white border-2 border-gold text-gold font-medium rounded-xl flex items-center justify-center gap-3 hover:bg-gold/5 active:scale-[0.98] transition-all"
            >
              <Image className="w-5 h-5" />
              Choose from Gallery
            </button>
            
            <button
              onClick={handleUseProfilePhoto}
              className="w-full py-4 bg-white border-2 border-gold text-gold font-medium rounded-xl flex items-center justify-center gap-3 hover:bg-gold/5 active:scale-[0.98] transition-all"
            >
              <User className="w-5 h-5" />
              Use Profile Photo
            </button>
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 bg-cream-light rounded-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Lightbulb className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-medium text-charcoal text-sm">Tips for best results:</p>
                <p className="text-charcoal/60 text-xs mt-1">
                  Full body shot, Plain background, Good lighting, Face visible
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          {selectedImage && (
            <button
              onClick={handleContinue}
              className="w-full mt-6 py-4 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark active:scale-[0.98] transition-all animate-slide-up"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
