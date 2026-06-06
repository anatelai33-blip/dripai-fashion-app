import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import type { DripScore, DripActivity, LeaderboardEntry } from '@/types';
import { ArrowLeft, Trophy, Star, Flame, Crown, Zap, TrendingUp, Award, Users } from 'lucide-react';

const LEVELS = [
  { name: 'Fresh', min: 0, max: 499, icon: Star, color: 'from-gray-400 to-gray-500' },
  { name: 'Dripping', min: 500, max: 1499, icon: Flame, color: 'from-blue-400 to-blue-600' },
  { name: 'Drippy', min: 1500, max: 3999, icon: Zap, color: 'from-purple-400 to-purple-600' },
  { name: 'Drip Lord', min: 4000, max: 9999, icon: Crown, color: 'from-gold to-gold-dark' },
  { name: 'Global Drip Icon', min: 10000, max: Infinity, icon: Trophy, color: 'from-amber-400 to-red-500' },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'FashionQueen_NG', avatar: '👑', points: 12450, level: 'Global Drip Icon' },
  { rank: 2, name: 'StyleKing_Lagos', avatar: '🔥', points: 9800, level: 'Drip Lord' },
  { rank: 3, name: 'AnkaraVibes', avatar: '✨', points: 7650, level: 'Drip Lord' },
  { rank: 4, name: 'TokyoDrip', avatar: '🇯🇵', points: 5200, level: 'Drip Lord' },
  { rank: 5, name: 'LondonStyle', avatar: '🇬🇧', points: 3800, level: 'Drippy' },
  { rank: 6, name: 'NairobiChic', avatar: '🇰🇪', points: 2900, level: 'Drippy' },
  { rank: 7, name: 'DubaiGlam', avatar: '💎', points: 2100, level: 'Drippy' },
  { rank: 8, name: 'ParisMode', avatar: '🇫🇷', points: 1600, level: 'Drippy' },
  { rank: 9, name: 'AccraFresh', avatar: '🇬🇭', points: 900, level: 'Dripping' },
  { rank: 10, name: 'MumbaiStyle', avatar: '🇮🇳', points: 650, level: 'Dripping' },
];

const INITIAL_ACTIVITIES: DripActivity[] = [
  { id: '1', action: 'Joined DRIP', points: 100, timestamp: new Date(Date.now() - 86400000 * 7) },
  { id: '2', action: 'First virtual try-on', points: 50, timestamp: new Date(Date.now() - 86400000 * 5) },
  { id: '3', action: 'Added item to wardrobe', points: 20, timestamp: new Date(Date.now() - 86400000 * 3) },
  { id: '4', action: 'Shared an outfit', points: 30, timestamp: new Date(Date.now() - 86400000 * 2) },
  { id: '5', action: 'Used AI Stylist', points: 25, timestamp: new Date(Date.now() - 86400000) },
  { id: '6', action: 'Daily login streak (3 days)', points: 50, timestamp: new Date() },
];

function getLevel(points: number) {
  return LEVELS.find(l => points >= l.min && points <= l.max) || LEVELS[0];
}

export function DripScoreScreen() {
  const { navigateTo } = useApp();
  const [score, setScore] = useState<DripScore>({ points: 0, level: 'Fresh', history: [] });
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard' | 'history'>('overview');

  useEffect(() => {
    const saved = localStorage.getItem('drip-score');
    if (saved) {
      try { setScore(JSON.parse(saved)); } catch { /* ignore */ }
    } else {
      const initial: DripScore = {
        points: 275,
        level: 'Fresh',
        history: INITIAL_ACTIVITIES,
      };
      setScore(initial);
      localStorage.setItem('drip-score', JSON.stringify(initial));
    }
  }, []);

  const level = getLevel(score.points);
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1];
  const progress = nextLevel
    ? ((score.points - level.min) / (nextLevel.min - level.min)) * 100
    : 100;
  const LevelIcon = level.icon;

  return (
    <div className="min-h-screen bg-cream-light pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream-light/95 backdrop-blur-sm px-4 py-3 border-b border-cream-dark/20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('home')} className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-charcoal" />
          </button>
          <h1 className="text-lg font-display font-bold text-charcoal">DRIP Score</h1>
        </div>
      </header>

      {/* Score Card */}
      <div className="mx-4 mt-4 p-6 bg-gradient-to-br from-charcoal to-charcoal/90 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-full translate-y-6 -translate-x-6" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Your Level</p>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 bg-gradient-to-r ${level.color} rounded-full flex items-center justify-center`}>
                  <LevelIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-display font-bold text-xl">{level.name}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Points</p>
              <p className="text-3xl font-bold text-gold font-display">{score.points.toLocaleString()}</p>
            </div>
          </div>

          {nextLevel && (
            <div>
              <div className="flex justify-between text-xs text-white/40 mb-1.5">
                <span>{level.name}</span>
                <span>{nextLevel.min - score.points} pts to {nextLevel.name}</span>
              </div>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${level.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How to Earn */}
      <div className="mx-4 mt-4 p-4 bg-white rounded-2xl border border-cream-dark/10 shadow-xs">
        <h3 className="text-sm font-semibold text-charcoal mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gold" />
          How to Earn Points
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { action: 'Daily Login', pts: '+10' },
            { action: 'Virtual Try-On', pts: '+50' },
            { action: 'Share Outfit', pts: '+30' },
            { action: 'Add to Wardrobe', pts: '+20' },
            { action: 'Use AI Stylist', pts: '+25' },
            { action: 'First Purchase', pts: '+100' },
            { action: 'Write Review', pts: '+40' },
            { action: 'Refer a Friend', pts: '+200' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 bg-cream-light/50 rounded-lg">
              <span className="text-xs text-charcoal/70">{item.action}</span>
              <span className="text-xs font-bold text-gold">{item.pts}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-4 flex gap-1 bg-white rounded-xl p-1 border border-cream-dark/10">
        {(['overview', 'leaderboard', 'history'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
              activeTab === tab ? 'bg-gold text-white shadow-gold' : 'text-charcoal/50 hover:text-charcoal'
            }`}
          >
            {tab === 'overview' && <Award className="w-3.5 h-3.5 inline mr-1" />}
            {tab === 'leaderboard' && <Users className="w-3.5 h-3.5 inline mr-1" />}
            {tab === 'history' && <TrendingUp className="w-3.5 h-3.5 inline mr-1" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mx-4 mt-3">
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-charcoal">All Levels</h3>
            {LEVELS.map((lvl, i) => {
              const Icon = lvl.icon;
              const isCurrentLevel = lvl.name === level.name;
              return (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${isCurrentLevel ? 'bg-gold/5 border-gold/30' : 'bg-white border-cream-dark/10'}`}>
                  <div className={`w-10 h-10 bg-gradient-to-r ${lvl.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${isCurrentLevel ? 'text-gold' : 'text-charcoal'}`}>
                      {lvl.name} {isCurrentLevel && '← You'}
                    </p>
                    <p className="text-xs text-charcoal/40">
                      {lvl.max === Infinity ? `${lvl.min.toLocaleString()}+ pts` : `${lvl.min.toLocaleString()} - ${lvl.max.toLocaleString()} pts`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-2">
            {MOCK_LEADERBOARD.map(entry => (
              <div key={entry.rank} className={`flex items-center gap-3 p-3 rounded-xl ${entry.rank <= 3 ? 'bg-gold/5 border border-gold/20' : 'bg-white border border-cream-dark/10'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  entry.rank === 1 ? 'bg-yellow-400 text-white' :
                  entry.rank === 2 ? 'bg-gray-300 text-white' :
                  entry.rank === 3 ? 'bg-amber-600 text-white' :
                  'bg-cream-dark/30 text-charcoal/50'
                }`}>
                  {entry.rank}
                </div>
                <span className="text-xl">{entry.avatar}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-charcoal">{entry.name}</p>
                  <p className="text-xs text-charcoal/40">{entry.level}</p>
                </div>
                <p className="text-sm font-bold text-gold">{entry.points.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-2">
            {(score.history.length > 0 ? score.history : INITIAL_ACTIVITIES)
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-cream-dark/10">
                  <div>
                    <p className="text-sm text-charcoal">{activity.action}</p>
                    <p className="text-xs text-charcoal/30">
                      {new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-green-500">+{activity.points}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
