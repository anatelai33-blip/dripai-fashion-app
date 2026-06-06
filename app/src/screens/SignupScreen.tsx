import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Sparkles } from 'lucide-react';

export function SignupScreen() {
  const { navigateTo, setUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setUser({
        id: '1',
        email,
        name,
      });
      setIsLoading(false);
      navigateTo('home');
    }, 1500);
  };

  const handleSocialSignup = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        id: '2',
        email: `user@${provider}.com`,
        name: `${provider} User`,
      });
      setIsLoading(false);
      navigateTo('home');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light via-white to-cream-dark flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {[...Array(6)].map((_, i) => (
          <Sparkles 
            key={i}
            className="absolute text-gold/30 animate-pulse"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + (i % 3) * 35}%`,
              animationDelay: `${i * 0.3}s`,
              width: `${16 + i * 2}px`,
              height: `${16 + i * 2}px`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-4">
        <button 
          onClick={() => navigateTo('login')}
          className="p-2 hover:bg-cream-dark/20 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 relative z-10">
        
        {/* Logo Section */}
        <div 
          className={`text-center mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gold/20 rounded-3xl blur-xl animate-pulse" />
            <img 
              src="/logo.png" 
              alt="Drip with Mira" 
              className="w-24 h-24 mx-auto rounded-3xl shadow-gold relative z-10 animate-float"
            />
            <div className="absolute -inset-2 border-2 border-gold/30 rounded-3xl animate-spin-slow" />
          </div>
          
          <h1 className="text-4xl font-display font-bold text-gold mb-2 tracking-tight">
            Drip with <span className="text-charcoal">Mira</span>
          </h1>
        </div>

        {/* Welcome Message */}
        <div 
          className={`text-center mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl font-display font-semibold text-charcoal mb-2">
            Create Account
          </h2>
          <p className="text-charcoal/60 text-base">
            Start your fashion journey with us
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            className={`w-full max-w-sm mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm animate-slide-up`}
          >
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form 
          onSubmit={handleSignup} 
          className={`w-full max-w-sm space-y-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Name Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gold/5 rounded-2xl scale-95 group-focus-within:scale-100 group-focus-within:bg-gold/10 transition-all duration-300" />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60 group-focus-within:text-gold transition-colors" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="relative w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-cream-dark rounded-2xl text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gold/5 rounded-2xl scale-95 group-focus-within:scale-100 group-focus-within:bg-gold/10 transition-all duration-300" />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60 group-focus-within:text-gold transition-colors" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-cream-dark rounded-2xl text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gold/5 rounded-2xl scale-95 group-focus-within:scale-100 group-focus-within:bg-gold/10 transition-all duration-300" />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60 group-focus-within:text-gold transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border border-cream-dark rounded-2xl text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 hover:text-gold transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gold/5 rounded-2xl scale-95 group-focus-within:scale-100 group-focus-within:bg-gold/10 transition-all duration-300" />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60 group-focus-within:text-gold transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="relative w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-cream-dark rounded-2xl text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              required
            />
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-white font-semibold rounded-2xl shadow-gold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div 
          className={`flex items-center gap-4 my-6 w-full max-w-sm transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cream-dark to-transparent" />
          <span className="text-charcoal/40 text-sm">or continue with</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cream-dark to-transparent" />
        </div>

        {/* Social Signup */}
        <div 
          className={`flex gap-4 w-full max-w-sm transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => handleSocialSignup('google')}
            className="flex-1 py-3.5 px-4 bg-white border border-cream-dark rounded-xl flex items-center justify-center gap-3 hover:bg-cream-light hover:border-gold/30 hover:shadow-soft transition-all group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm text-charcoal font-medium">Google</span>
          </button>
          <button
            onClick={() => handleSocialSignup('apple')}
            className="flex-1 py-3.5 px-4 bg-charcoal text-white rounded-xl flex items-center justify-center gap-3 hover:bg-charcoal/90 hover:shadow-soft transition-all group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span className="text-sm font-medium">Apple</span>
          </button>
        </div>

        {/* Login Link */}
        <p 
          className={`mt-8 text-charcoal/60 text-sm transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Already have an account?{' '}
          <button 
            onClick={() => navigateTo('login')}
            className="text-gold font-semibold hover:text-gold-dark hover:underline transition-colors"
          >
            Sign In
          </button>
        </p>
      </div>

      {/* Support Contact */}
      <div className="relative z-10 pb-6 text-center">
        <p className="text-charcoal/40 text-xs">
          Need help?{' '}
          <a 
            href="https://wa.me/2348053916889" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-dark hover:underline transition-colors"
          >
            Contact Support
          </a>
        </p>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />
    </div>
  );
}
