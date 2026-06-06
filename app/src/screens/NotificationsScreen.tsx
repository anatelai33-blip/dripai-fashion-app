import { useApp } from '@/contexts/AppContext';
import { Check } from 'lucide-react';

export function NotificationsScreen() {
  const { navigateTo } = useApp();

  const benefits = [
    { id: 1, text: 'New arrivals tailored for you', checked: true },
    { id: 2, text: 'Exclusive deals and discounts', checked: true },
    { id: 3, text: 'Your try-on results are ready', checked: true },
    { id: 4, text: 'Order updates and shipping', checked: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-light to-white flex flex-col p-6">
      {/* Bell Animation */}
      <div className="flex-1 flex flex-col items-center justify-center pt-12">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 animate-pulse-glow">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <defs>
                <linearGradient id="bellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#E5C76B" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                <filter id="bellGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Bell */}
              <path 
                d="M60 20 Q40 20 40 45 L35 80 Q30 85 35 90 L85 90 Q90 85 85 80 L80 45 Q80 20 60 20Z"
                fill="url(#bellGradient)"
                filter="url(#bellGlow)"
              />
              
              {/* Bell clapper */}
              <circle cx="60" cy="95" r="8" fill="url(#bellGradient)" />
              
              {/* Bell top */}
              <rect x="52" y="12" width="16" height="10" rx="3" fill="url(#bellGradient)" />
              
              {/* Sparkles */}
              <g className="animate-pulse">
                <path d="M20 30 L22 35 L27 37 L22 39 L20 44 L18 39 L13 37 L18 35 Z" fill="#D4AF37">
                  <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M95 25 L97 30 L102 32 L97 34 L95 39 L93 34 L88 32 L93 30 Z" fill="#D4AF37">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                </path>
                <path d="M100 60 L102 65 L107 67 L102 69 L100 74 L98 69 L93 67 L98 65 Z" fill="#D4AF37">
                  <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite" />
                </path>
                <path d="M15 70 L17 75 L22 77 L17 79 L15 84 L13 79 L8 77 L13 75 Z" fill="#D4AF37">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
                </path>
              </g>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-display font-semibold text-charcoal text-center mb-2">
          Stay in the Loop
        </h1>

        {/* Benefits List */}
        <div className="w-full max-w-sm space-y-4 mt-8">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-gold" />
              </div>
              <span className="text-charcoal">{benefit.text}</span>
            </div>
          ))}
        </div>

        <p className="text-charcoal/50 text-sm text-center mt-8">
          You can change this anytime in settings
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm mx-auto space-y-3 pb-8">
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-4 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark active:scale-[0.98] transition-all"
        >
          Enable Notifications
        </button>
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-4 border-2 border-gold text-gold font-medium rounded-xl hover:bg-gold/5 active:scale-[0.98] transition-all"
        >
          Not Now
        </button>
      </div>
    </div>
  );
}
