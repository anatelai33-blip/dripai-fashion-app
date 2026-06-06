import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';

export function SplashScreen() {
  const { navigateTo } = useApp();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigateTo('login'), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigateTo]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-light to-white flex flex-col items-center justify-center p-6">
      {/* Animated Rings */}
      <div className="relative w-48 h-48 mb-8">
        <div className="absolute inset-0 animate-spin-slow">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#E5C76B" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
            {/* Outer ring */}
            <ellipse 
              cx="100" cy="100" rx="90" ry="70" 
              fill="none" 
              stroke="url(#goldGradient)" 
              strokeWidth="2"
              opacity="0.6"
              transform="rotate(0 100 100)"
            />
            {/* Middle ring */}
            <ellipse 
              cx="100" cy="100" rx="85" ry="65" 
              fill="none" 
              stroke="url(#goldGradient)" 
              strokeWidth="2"
              opacity="0.8"
              transform="rotate(30 100 100)"
            />
            {/* Inner ring */}
            <ellipse 
              cx="100" cy="100" rx="80" ry="60" 
              fill="none" 
              stroke="url(#goldGradient)" 
              strokeWidth="2"
              opacity="1"
              transform="rotate(60 100 100)"
            />
            {/* Sparkles */}
            <circle cx="30" cy="50" r="2" fill="#D4AF37" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="170" cy="60" r="2" fill="#D4AF37" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="150" r="2" fill="#D4AF37" opacity="0.7">
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>

      {/* Logo */}
      <div className="text-center mb-8">
        <img 
          src="/logo.png" 
          alt="DRIP" 
          className="w-24 h-24 mx-auto mb-4 rounded-2xl shadow-gold"
        />
        <span className="text-4xl font-display font-bold text-gold tracking-wider">Drip with Mira</span>
        <p className="text-charcoal/60 text-sm font-body mt-2">Your Personal AI Stylist, Anytime, Anywhere</p>
      </div>

      {/* Loading Text */}
      <p className="text-charcoal/80 text-lg font-display mb-6">
        Creating Your Look...
      </p>
      <p className="text-charcoal/50 text-sm mb-8">
        This usually takes 15-30 seconds
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-3 bg-cream-dark rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gold text-sm mt-3 font-medium">{progress}%</p>
    </div>
  );
}
