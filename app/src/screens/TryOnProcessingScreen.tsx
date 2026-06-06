import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';

export function TryOnProcessingScreen() {
  const { navigateTo } = useApp();
  const [progress, setProgress] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  const facts = [
    "Did you know? Our AI analyzes over 1000 data points for perfect fit",
    "Our AI considers fabric drape and body shape for realistic results",
    "We use advanced computer vision to match lighting and shadows",
    "Your try-on results are processed securely and privately",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            navigateTo('tryon-result');
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    const factInterval = setInterval(() => {
      setFactIndex(prev => (prev + 1) % facts.length);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(factInterval);
    };
  }, [navigateTo]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-3xl font-display font-semibold text-gold text-center mb-8">
        Creating<br />Your Look
      </h1>

      {/* Animated Dress Illustration */}
      <div className="relative w-56 h-64 mb-10">
        <svg viewBox="0 0 200 240" className="w-full h-full">
          <defs>
            <linearGradient id="dressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#E5C76B" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Dress shape */}
          <path 
            d="M70 40 Q60 50 55 70 Q50 90 60 110 L50 140 Q45 160 55 180 L60 220 Q65 235 100 235 Q135 235 140 220 L145 180 Q155 160 150 140 L140 110 Q150 90 145 70 Q140 50 130 40 Q120 30 100 30 Q80 30 70 40Z"
            fill="url(#dressGradient)"
            opacity="0.9"
            filter="url(#glow)"
          />
          
          {/* Sparkles */}
          <g className="animate-pulse">
            <circle cx="40" cy="60" r="2" fill="#D4AF37">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="160" cy="80" r="2" fill="#D4AF37">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="150" r="1.5" fill="#D4AF37">
              <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="180" r="2" fill="#D4AF37">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="30" r="1.5" fill="#D4AF37">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Swirl effect */}
          <ellipse 
            cx="100" cy="120" rx="80" ry="100" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="1"
            strokeDasharray="5,10"
            opacity="0.3"
            transform="rotate(15 100 120)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 120"
              to="360 100 120"
              dur="20s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs">
        <div className="h-4 bg-cream-light rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
              style={{ backgroundSize: '200% 100%' }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-charcoal/60">Processing with AI...</span>
          <div className="flex items-center gap-2">
            <span className="text-gold font-semibold">{progress}%</span>
            {progress >= 100 && (
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Fun Fact */}
      <div className="mt-8 p-4 bg-cream-light rounded-xl max-w-xs">
        <p className="text-sm text-charcoal/80 text-center animate-fade-in">
          {facts[factIndex]}
        </p>
      </div>
    </div>
  );
}
