import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Radio, Users, Clock, Lock, Play, Calendar } from 'lucide-react';

const MOCK_STREAMS = [
  {
    id: '1', title: 'Lagos Fashion Week Highlights', host: 'AdaStyle', viewers: 1234,
    thumbnail: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&h=400&fit=crop',
    status: 'live' as const, category: 'Fashion Show',
  },
  {
    id: '2', title: 'How to Style Ankara for Work', host: 'StyleKing_Lagos', viewers: 567,
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop',
    status: 'live' as const, category: 'Tutorial',
  },
  {
    id: '3', title: 'Vintage Thrift Haul — $50 Budget', host: 'ThriftQueen', viewers: 890,
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',
    status: 'live' as const, category: 'Shopping',
  },
];

const UPCOMING_STREAMS = [
  { id: '4', title: 'Saree Draping Masterclass', host: 'PriyaStyle', time: 'Tomorrow, 3:00 PM', category: 'Tutorial' },
  { id: '5', title: 'Tokyo Street Style Tour', host: 'TokyoDrip', time: 'Fri, 7:00 PM', category: 'Lifestyle' },
  { id: '6', title: 'Kente Collection Drop — Live Shopping', host: 'KofiDesigns', time: 'Sat, 12:00 PM', category: 'Shopping' },
  { id: '7', title: 'Modest Fashion Lookbook', host: 'FatimaGlam', time: 'Sun, 5:00 PM', category: 'Lookbook' },
];

export function DripLiveScreen() {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-cream-light pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-500 to-pink-600 px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('home')} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-display font-bold text-lg leading-tight">DRIP Live</h1>
              <p className="text-white/70 text-xs">Shop while you watch</p>
            </div>
          </div>
        </div>
      </header>

      {/* Coming Soon Banner */}
      <div className="mx-4 mt-4 p-5 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl border border-red-200/30 relative overflow-hidden">
        <div className="absolute top-2 right-2 px-2.5 py-1 bg-gold text-white text-[10px] font-bold rounded-full">COMING SOON</div>
        <Lock className="w-8 h-8 text-red-500 mb-2" />
        <h3 className="text-sm font-bold text-charcoal mb-1">Live Shopping is Coming!</h3>
        <p className="text-xs text-charcoal/60 leading-relaxed">
          Watch live fashion shows, tutorials, and shopping events. Tap to buy items in real-time as hosts showcase them. One-tap checkout during streams.
        </p>
      </div>

      {/* Mock Live Streams */}
      <div className="px-4 mt-4">
        <h3 className="text-sm font-semibold text-charcoal mb-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Live Now (Preview)
        </h3>
        <div className="space-y-3">
          {MOCK_STREAMS.map(stream => (
            <div key={stream.id} className="bg-white rounded-2xl overflow-hidden border border-cream-dark/10 shadow-xs relative">
              <div className="relative">
                <img src={stream.thumbnail} alt={stream.title} className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    LIVE
                  </span>
                  <span className="px-2 py-0.5 bg-black/50 text-white text-[10px] rounded-full flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {stream.viewers.toLocaleString()}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 bg-black/50 text-white text-[10px] rounded-full">{stream.category}</span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-semibold text-charcoal">{stream.title}</h4>
                <p className="text-xs text-charcoal/50 mt-0.5">Hosted by @{stream.host}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-semibold text-charcoal mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-charcoal/40" />
          Upcoming Streams
        </h3>
        <div className="space-y-2">
          {UPCOMING_STREAMS.map(stream => (
            <div key={stream.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-cream-dark/10">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Radio className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-charcoal truncate">{stream.title}</p>
                <p className="text-xs text-charcoal/40">@{stream.host}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-xs text-charcoal/40">
                  <Clock className="w-3 h-3" />
                  {stream.time}
                </div>
                <span className="text-[10px] text-gold font-medium">{stream.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
