import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import type { SocialPost } from '@/types';
import { ArrowLeft, Heart, MessageCircle, Share2, ShoppingBag, Flame, Globe } from 'lucide-react';

const CULTURE_BOARDS = [
  { id: 'all', name: 'All', emoji: '🌍' },
  { id: 'lagos', name: 'Lagos Street', emoji: '🇳🇬' },
  { id: 'tokyo', name: 'Tokyo Harajuku', emoji: '🇯🇵' },
  { id: 'london', name: 'London Chic', emoji: '🇬🇧' },
  { id: 'nairobi', name: 'Nairobi Vibe', emoji: '🇰🇪' },
  { id: 'dubai', name: 'Dubai Glam', emoji: '🇦🇪' },
  { id: 'paris', name: 'Paris Mode', emoji: '🇫🇷' },
  { id: 'mumbai', name: 'Mumbai Mix', emoji: '🇮🇳' },
];

const MOCK_POSTS: SocialPost[] = [
  {
    id: '1',
    userName: 'AdaStyle',
    userAvatar: '👩🏾‍🦱',
    images: ['https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600&h=800&fit=crop'],
    caption: 'Ankara meets modern — this combo is everything! 🔥 Who says traditional can\'t be trendy? #DRIPstyle #AnkaraVibes',
    likes: 234,
    comments: [
      { id: 'c1', userName: 'FashionKing', content: 'This is fire! 🔥', timestamp: new Date(Date.now() - 3600000) },
      { id: 'c2', userName: 'StyleQueen', content: 'Where did you get the fabric?', timestamp: new Date(Date.now() - 1800000) },
    ],
    tags: ['ankara', 'streetstyle', 'lagos'],
    cultureBoard: 'lagos',
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: '2',
    userName: 'TokyoDrip',
    userAvatar: '👨🏻',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop'],
    caption: 'Harajuku layering game strong today. Mixing vintage with streetwear 🇯🇵✨ #TokyoFashion #Harajuku',
    likes: 189,
    comments: [
      { id: 'c3', userName: 'StreetWearFan', content: 'The layers are perfect!', timestamp: new Date(Date.now() - 5400000) },
    ],
    tags: ['harajuku', 'streetwear', 'tokyo'],
    cultureBoard: 'tokyo',
    createdAt: new Date(Date.now() - 14400000),
  },
  {
    id: '3',
    userName: 'NairobiChic',
    userAvatar: '👩🏿',
    images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop'],
    caption: 'Maasai-inspired accessories with a modern twist. Culture is fashion, fashion is culture 🌍❤️ #NairobiStyle',
    likes: 312,
    comments: [
      { id: 'c4', userName: 'CultureLover', content: 'Beautiful representation!', timestamp: new Date(Date.now() - 10800000) },
      { id: 'c5', userName: 'BeadWork', content: 'Those beads are stunning!', timestamp: new Date(Date.now() - 7200000) },
    ],
    tags: ['maasai', 'accessories', 'nairobi'],
    cultureBoard: 'nairobi',
    createdAt: new Date(Date.now() - 21600000),
  },
  {
    id: '4',
    userName: 'DubaiGlam',
    userAvatar: '👩🏽',
    images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop'],
    caption: 'Modest fashion doesn\'t mean boring fashion. This abaya with gold detailing is everything 💎 #DubaiStyle #ModestFashion',
    likes: 456,
    comments: [
      { id: 'c6', userName: 'ModestQueen', content: 'Absolutely gorgeous!', timestamp: new Date(Date.now() - 3600000) },
    ],
    tags: ['abaya', 'modest', 'dubai'],
    cultureBoard: 'dubai',
    createdAt: new Date(Date.now() - 28800000),
  },
  {
    id: '5',
    userName: 'LondonStyle',
    userAvatar: '👨🏼',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop'],
    caption: 'Classic British tailoring with a streetwear edge. The trench coat never goes out of style 🇬🇧 #LondonFashion',
    likes: 178,
    comments: [],
    tags: ['tailoring', 'streetwear', 'london'],
    cultureBoard: 'london',
    createdAt: new Date(Date.now() - 36000000),
  },
];

const STYLE_CHALLENGES = [
  { id: '1', title: 'Monochrome Monday', description: 'Rock a single-color outfit', participants: 1234, emoji: '⬛' },
  { id: '2', title: 'Culture Fusion Friday', description: 'Mix two cultural styles', participants: 892, emoji: '🌍' },
  { id: '3', title: 'Thrift Flip Challenge', description: 'Style a thrifted piece', participants: 567, emoji: '♻️' },
];

export function SocialFeedScreen() {
  const { navigateTo } = useApp();
  const [posts, setPosts] = useState<SocialPost[]>(MOCK_POSTS);
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [activeTab, setActiveTab] = useState<'feed' | 'challenges'>('feed');

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const filteredPosts = selectedBoard === 'all' ? posts : posts.filter(p => p.cultureBoard === selectedBoard);

  const timeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - new Date(date).getTime()) / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-cream-light pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream-light/95 backdrop-blur-sm px-4 py-3 border-b border-cream-dark/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigateTo('home')} className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-charcoal" />
            </button>
            <h1 className="text-lg font-display font-bold text-charcoal">DRIP Social</h1>
          </div>
          <Globe className="w-5 h-5 text-gold" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-cream-dark/10 mb-3">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === 'feed' ? 'bg-gold text-white' : 'text-charcoal/50'}`}
          >
            Style Feed
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === 'challenges' ? 'bg-gold text-white' : 'text-charcoal/50'}`}
          >
            <Flame className="w-3.5 h-3.5 inline mr-1" />
            Challenges
          </button>
        </div>

        {/* Culture Boards */}
        {activeTab === 'feed' && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CULTURE_BOARDS.map(board => (
              <button
                key={board.id}
                onClick={() => setSelectedBoard(board.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                  selectedBoard === board.id
                    ? 'bg-gold text-white shadow-gold'
                    : 'bg-white text-charcoal/60 border border-cream-dark/30'
                }`}
              >
                <span>{board.emoji}</span>
                {board.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {activeTab === 'feed' ? (
        <div className="space-y-4 pt-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white mx-4 rounded-2xl overflow-hidden border border-cream-dark/10 shadow-xs">
              {/* Post Header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 bg-cream-dark/20 rounded-full flex items-center justify-center text-lg">
                  {post.userAvatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-charcoal">{post.userName}</p>
                  <p className="text-xs text-charcoal/40">{timeAgo(post.createdAt)}</p>
                </div>
                {post.cultureBoard && (
                  <span className="px-2.5 py-1 bg-gold/10 text-gold text-[10px] rounded-full font-medium">
                    {CULTURE_BOARDS.find(b => b.id === post.cultureBoard)?.emoji} {CULTURE_BOARDS.find(b => b.id === post.cultureBoard)?.name}
                  </span>
                )}
              </div>

              {/* Post Image */}
              <img src={post.images[0]} alt="Post" className="w-full aspect-[4/5] object-cover" />

              {/* Actions */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-4 mb-2">
                  <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 transition-all">
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-red-500 text-red-500' : 'text-charcoal/60'}`} />
                    <span className="text-xs text-charcoal/60">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 text-charcoal/60" />
                    <span className="text-xs text-charcoal/60">{post.comments.length}</span>
                  </button>
                  <button>
                    <Share2 className="w-5 h-5 text-charcoal/60" />
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => navigateTo('home')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                    <span className="text-xs font-medium text-gold">Shop Look</span>
                  </button>
                </div>

                <p className="text-sm text-charcoal leading-relaxed">{post.caption}</p>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-gold">#{tag}</span>
                  ))}
                </div>

                {/* Comments Preview */}
                {post.comments.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-cream-dark/10">
                    {post.comments.slice(0, 2).map(comment => (
                      <p key={comment.id} className="text-xs text-charcoal/70 mb-1">
                        <span className="font-semibold">{comment.userName}</span> {comment.content}
                      </p>
                    ))}
                    {post.comments.length > 2 && (
                      <p className="text-xs text-charcoal/40 mt-1">View all {post.comments.length} comments</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-3">
          <h2 className="text-sm font-semibold text-charcoal flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            Active Challenges
          </h2>
          {STYLE_CHALLENGES.map(challenge => (
            <div key={challenge.id} className="bg-white p-4 rounded-2xl border border-cream-dark/10 shadow-xs">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{challenge.emoji}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-charcoal">{challenge.title}</h3>
                  <p className="text-xs text-charcoal/50 mt-0.5">{challenge.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-charcoal/40">{challenge.participants.toLocaleString()} participants</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-gold to-gold-dark text-white text-xs font-semibold rounded-xl shadow-gold">
                  Join
                </button>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-gold/10 to-gold/5 p-4 rounded-2xl border border-gold/20 mt-4">
            <h3 className="text-sm font-bold text-charcoal mb-1">🏆 Weekly Winner</h3>
            <p className="text-xs text-charcoal/60">Last week's "Culture Fusion Friday" winner was <span className="font-semibold text-gold">@AdaStyle</span> with her stunning ankara-denim fusion look! 500 DRIP Points awarded.</p>
          </div>
        </div>
      )}
    </div>
  );
}
