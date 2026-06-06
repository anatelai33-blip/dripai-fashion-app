import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Target, Lightbulb, Heart, Rocket, Award, Users, MapPin, ArrowRight } from 'lucide-react';

export function AboutPage() {
  const { navigateTo } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'We push boundaries and embrace new technologies to deliver cutting-edge solutions.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion for Excellence',
      description: 'Every project receives our full dedication and attention to detail.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Client Partnership',
      description: 'We work alongside our clients as true partners, not just service providers.'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Future-Focused',
      description: 'We build solutions that are scalable, secure, and ready for tomorrow.'
    }
  ];

  const milestones = [
    { year: '2019', title: 'The Beginning', description: 'Started as a telecommunications company in Awka, Nigeria.' },
    { year: '2020', title: 'First App Launch', description: 'Expanded into mobile app development with our first client project.' },
    { year: '2021', title: 'E-Commerce Division', description: 'Launched our e-commerce solutions division, powering online stores.' },
    { year: '2022', title: 'Web3 Exploration', description: 'Ventured into blockchain and decentralized applications.' },
    { year: '2023', title: 'SaaS Products', description: 'Launched our first SaaS product for business automation.' },
    { year: '2024', title: 'Growing Impact', description: '50+ projects delivered, serving clients across Africa and beyond.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-cream-light via-white to-cream-dark overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div 
            className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-8">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold font-medium">Headquartered in Awka, Nigeria</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-6">
              About <span className="text-gold">Anatelco</span>
            </h1>
            
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
              From telecommunications to digital innovation, Anatelco's journey has been 
              defined by a relentless pursuit of excellence and a passion for building 
              technology that transforms businesses across Africa and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-cream-light rounded-3xl p-10">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display font-bold text-charcoal mb-4">Our Mission</h2>
              <p className="text-charcoal/70 text-lg leading-relaxed">
                To empower businesses across Africa and beyond with world-class digital solutions 
                that drive growth, innovation, and sustainable success. We believe technology 
                should be accessible, impactful, and transformative.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-charcoal rounded-3xl p-10">
              <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                To be Africa's leading digital innovation company, recognized globally for 
                delivering exceptional technology solutions that shape the future of business. 
                We envision a continent powered by homegrown technological excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/hq-awka.jpg" 
                alt="Our Headquarters"
                className="rounded-3xl shadow-card w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-display font-bold text-charcoal mb-6">
                DripAI: From Awka to the <span className="text-gold">World</span>
              </h2>
              
              <div className="space-y-6 text-charcoal/70 text-lg leading-relaxed">
                <p>
                  DripAI started in 2019, in the vibrant city of Awka, Anambra State, Nigeria. 
                  What began as a telecommunications company quickly revealed a deeper calling: 
                  we weren't just connecting people through networks—we were connecting ideas 
                  to reality through technology.
                </p>
                
                <p>
                  As we grew, so did our ambitions. We expanded into mobile app development, 
                  creating intuitive applications that solved real problems. Our e-commerce 
                  solutions helped businesses thrive in the digital marketplace. When Web3 
                  emerged, we were among the first in Nigeria to explore its transformative potential.
                </p>
                
                <p>
                  Today, DripAI is a full-service digital innovation company. But our roots remain 
                  firmly planted in Awka, Anambra State—in the community that shaped us, the talent 
                  that fuels us, and the vision that drives us forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">
              More Than <span className="text-gold">Telecommunications</span>
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              While our journey began in telecom, we've evolved into a comprehensive 
              digital solutions provider.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Mobile Apps', desc: 'iOS & Android applications', image: '/images/apps-development.jpg' },
              { title: 'Web Apps', desc: 'Responsive web applications', image: '/images/commerce.jpg' },
              { title: 'E-Commerce', desc: 'Online store solutions', image: '/images/usecase-realestate.jpg' },
              { title: 'Web3/Blockchain', desc: 'Decentralized solutions', image: '/images/web3.jpg' },
              { title: 'SaaS Products', desc: 'Cloud-based software', image: '/images/saas.jpg' },
              { title: 'UI/UX Design', desc: 'User-centered design', image: '/images/usecase-fintech.jpg' },
              { title: 'Cloud Services', desc: 'Scalable infrastructure', image: '/images/usecase-education.jpg' },
              { title: 'Consulting', desc: 'Digital strategy', image: '/images/usecase-healthcare.jpg' }
            ].map((item, index) => (
              <div key={index} className="group bg-cream-light rounded-2xl overflow-hidden hover:shadow-card transition-all">
                <div className="h-32 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-charcoal mb-1">{item.title}</h3>
                  <p className="text-sm text-charcoal/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Our <span className="text-gold">Values</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">
              Our <span className="text-gold">Journey</span>
            </h2>
            <p className="text-lg text-charcoal/70">
              Milestones that mark our growth and evolution.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-gold font-display font-bold text-xl">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 relative">
                  <div className="w-4 h-4 bg-gold rounded-full" />
                  {index < milestones.length - 1 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gold/30" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-display font-semibold text-charcoal mb-1">{milestone.title}</h3>
                  <p className="text-charcoal/60">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-gold to-gold-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let's create something extraordinary together.
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="px-10 py-4 bg-white text-gold font-semibold rounded-xl hover:bg-charcoal hover:text-white transition-all shadow-lg inline-flex items-center gap-2"
          >
            Work With Us <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
