import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import type { ChatMessage } from '@/types';
import { ArrowLeft, Send, Sparkles, MessageCircle, Loader2 } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "Style me for a Lagos wedding 🇳🇬",
  "What goes with my ankara skirt?",
  "Find me a summer dress under $100",
  "Best outfit for a Tokyo date night 🇯🇵",
  "Help me style a saree for a modern look",
  "Casual streetwear for London winter",
  "Traditional meets modern — give me ideas",
  "What colors match my skin tone?",
];

const SYSTEM_PROMPT = `You are DRIP AI Stylist, a world-class multilingual fashion assistant created by DripAI. You help users find outfits, style advice, and fashion recommendations. You understand fashion from every culture — ankara, kente, aso-oke, sarees, kimonos, hanboks, abayas, batik, and Western fashion. You know streetwear, haute couture, traditional wear, and everything in between. Be friendly, knowledgeable, culturally aware, and confident. Keep responses concise but helpful. Use emoji occasionally. Never break character.`;

export function AIStylistScreen() {
  const { navigateTo } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        { role: 'user' as const, content: content.trim() },
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ''}`,
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: apiMessages,
          max_tokens: 500,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const assistantContent = data.choices?.[0]?.message?.content || "I'm having trouble thinking right now. Try again!";

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm currently offline, but I'll be back soon! In the meantime, try browsing our collection for inspiration. 💫",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-light flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gold to-gold-dark px-4 py-3 shadow-gold">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('home')} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-display font-bold text-lg leading-tight">DRIP AI Stylist</h1>
              <p className="text-white/70 text-xs">Your personal fashion assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mb-4 shadow-gold animate-pulse-glow">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-display font-bold text-charcoal mb-2">Hey, Fashion Icon! ✨</h2>
            <p className="text-charcoal/60 text-center text-sm mb-6 max-w-xs">
              I'm your AI stylist. Ask me anything about fashion — from ankara to athleisure, kimonos to couture.
            </p>
            <div className="w-full space-y-2">
              <p className="text-xs text-charcoal/40 uppercase tracking-wider font-semibold px-1">Try asking...</p>
              <div className="grid grid-cols-1 gap-2">
                {SUGGESTED_PROMPTS.slice(0, 4).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className="text-left px-4 py-3 bg-white rounded-xl text-sm text-charcoal hover:bg-gold/10 hover:border-gold/30 border border-cream-dark/30 transition-all duration-200 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 inline mr-2 text-gold" />
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-gold to-gold-dark text-white rounded-br-md'
                : 'bg-white text-charcoal border border-cream-dark/20 rounded-bl-md shadow-xs'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span className="text-[10px] font-semibold text-gold uppercase tracking-wider">DRIP Stylist</span>
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <p className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-white/60' : 'text-charcoal/30'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-cream-dark/20 shadow-xs">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-gold animate-spin" />
                <span className="text-sm text-charcoal/50">Styling your look...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts when conversation is active */}
      {messages.length > 0 && messages.length < 4 && !isLoading && (
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SUGGESTED_PROMPTS.slice(4).map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1.5 bg-white rounded-full text-xs text-charcoal border border-cream-dark/30 hover:bg-gold/10 hover:border-gold/30 transition-all flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-0 bg-cream-light/95 backdrop-blur-sm border-t border-cream-dark/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask me anything about fashion..."
            className="flex-1 px-4 py-3 bg-white rounded-xl text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold/30 border border-cream-dark/20"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-gold to-gold-dark rounded-xl text-white disabled:opacity-40 hover:shadow-gold transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
