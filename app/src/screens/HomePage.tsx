import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ArrowRight, Code2, ShoppingCart, Globe, Cloud, Sparkles, Phone, MapPin, Mail } from 'lucide-react';

export function HomePage() {
  const { navigateTo } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Mobile & Web Apps',
      description: 'Custom applications built with cutting-edge technology for iOS, Android, and web platforms.',
      image: '/images/apps-development.jpg'
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'E-Commerce Solutions',
      description: 'End-to-end commerce platforms with secure payments, inventory management, and seamless UX.',
      image: '/images/commerce.jpg'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Web3 & Blockchain',
      description: 'Decentralized applications, smart contracts, and blockchain integration for the future of digital.',
      image: '/images/web3.jpg'
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'SaaS Products',
      description: 'Scalable cloud-based software solutions that power businesses across industries.',
      image: '/images/saas.jpg'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Delivered' },
    { number: '30+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '15+', label: 'Team Members' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-light via-white to-cream-dark" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          {[...Array(8)].map((_, i) => (
            <Sparkles 
              key={i}
              className="absolute text-gold/20 animate-pulse"
              style={{
                top: `${10 + i * 10}%`,
                left: `${5 + (i % 4) * 25}%`,
                animationDelay: `${i * 0.2}s`,
                width: `${20 + i * 3}px`,
                height: `${20 + i * 3}px`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <div 
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-8">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-sm text-gold font-medium">Based in Awka, Nigeria</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-charcoal mb-6 leading-tight">
              Building the Future of
              <span className="block text-gold">Digital Innovation</span>
            </h1>
            
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto mb-10">
              DripAI is a leading technology company based in Awka, Nigeria. We build 
              exceptional mobile apps, e-commerce platforms, Web3 solutions, and SaaS 
              products that transform businesses across Africa and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigateTo('services')}
                className="px-8 py-4 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-gold"
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigateTo('portfolio')}
                className="px-8 py-4 border-2 border-gold text-gold font-semibold rounded-xl hover:bg-gold hover:text-white transition-all"
              >
                View Our Work
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
              What We <span className="text-gold">Build</span>
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              From concept to deployment, we deliver cutting-edge digital solutions 
              that drive growth and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                onClick={() => navigateTo('services')}
                className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-charcoal mb-3">{service.title}</h3>
                  <p className="text-charcoal/70">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/hq-awka.jpg" 
                alt="Our Headquarters in Awka"
                className="rounded-3xl shadow-card w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-display font-bold text-charcoal mb-6">
                Our Story Starts in <span className="text-gold">Awka</span>
              </h2>
              <p className="text-charcoal/70 text-lg mb-6 leading-relaxed">
                Founded in the heart of Anambra State, we began with a simple vision: 
                to bring world-class technology solutions to businesses across Africa and beyond.
              </p>
              <p className="text-charcoal/70 text-lg mb-6 leading-relaxed">
                What started as a telecommunications venture quickly evolved into something greater. 
                Today, we're a full-service digital innovation company, building everything from 
                mobile applications to decentralized Web3 platforms.
              </p>
              <p className="text-charcoal/70 text-lg leading-relaxed">
                Our mission is to empower businesses with technology that matters—solutions that 
                are scalable, secure, and designed for the future.
              </p>
              <button 
                onClick={() => navigateTo('about')}
                className="mt-8 text-gold font-semibold flex items-center gap-2 hover:gap-4 transition-all"
              >
                Read Our Full Story <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gold to-gold-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let's discuss your project and bring your vision to life.
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="px-10 py-4 bg-white text-gold font-semibold rounded-xl hover:bg-charcoal hover:text-white transition-all shadow-lg"
          >
            Start a Project
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-lg" />
                <span className="text-xl font-display font-bold text-white">Anatelco</span>
              </div>
              <p className="text-white/60">
                Building the future of digital innovation from Awka, Nigeria.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/60">
                <li><button onClick={() => navigateTo('services')} className="hover:text-gold transition-colors">App Development</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-gold transition-colors">E-Commerce</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-gold transition-colors">Web3 Solutions</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-gold transition-colors">SaaS Products</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60">
                <li><button onClick={() => navigateTo('about')} className="hover:text-gold transition-colors">About Us</button></li>
                <li><button onClick={() => navigateTo('portfolio')} className="hover:text-gold transition-colors">Portfolio</button></li>
                <li><button onClick={() => navigateTo('team')} className="hover:text-gold transition-colors">Our Team</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-gold transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-white/60">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  Awka, Anambra State, Nigeria
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold" />
                  +234 805 391 6889
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" />
                  hello@dripai.store
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/40">
            <p>&copy; 2024 DripAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
