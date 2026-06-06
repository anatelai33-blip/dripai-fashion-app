import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Linkedin, Twitter, Mail, Award, Lightbulb, Target, Quote } from 'lucide-react';

export function TeamPage() {
  const { navigateTo } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
            <h1 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-6">
              Meet Our <span className="text-gold">Founder</span>
            </h1>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
              The visionary leader behind DripAI, driving digital innovation 
              from Awka, Nigeria to the world.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 rounded-3xl transform rotate-3" />
              <div className="relative bg-cream-light rounded-3xl overflow-hidden">
                <img 
                  src="/images/founder.jpg" 
                  alt="Founder"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gold text-white p-6 rounded-2xl shadow-gold">
                <div className="text-3xl font-display font-bold">5+</div>
                <div className="text-sm text-white/80">Years Leading</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-6">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-sm text-gold font-medium">Founder & CEO</span>
              </div>

              <h2 className="text-4xl font-display font-bold text-charcoal mb-4">
                The Visionary Behind <span className="text-gold">DripAI</span>
              </h2>

              <p className="text-lg text-charcoal/70 mb-6 leading-relaxed">
                The DripAI founder started this journey in 2019 with a simple belief: that world-class 
                technology should be built right here in Africa. From a small office in Awka, Anambra State, 
                what began as a telecommunications company has evolved into a full-service digital 
                innovation powerhouse.
              </p>

              <p className="text-lg text-charcoal/70 mb-8 leading-relaxed">
                With a passion for technology and a commitment to excellence, the founder has 
                led the DripAI team to deliver 50+ projects across mobile apps, e-commerce, Web3, and 
                SaaS platforms. The vision remains clear: to put African tech talent on the global map.
              </p>

              {/* Philosophy */}
              <div className="bg-cream-light rounded-2xl p-6 mb-8">
                <Quote className="w-8 h-8 text-gold mb-4" />
                <p className="text-charcoal/80 italic text-lg mb-4">
                  "Technology is not just about code—it's about solving real problems, creating 
                  opportunities, and building a better future. That's what drives us every day."
                </p>
                <div className="text-gold font-semibold">— Founder, DripAI</div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-cream-light rounded-xl flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-cream-light rounded-xl flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:founder@dripai.store" 
                  className="w-12 h-12 bg-cream-light rounded-xl flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Leadership <span className="text-gold">Philosophy</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              The principles that guide our vision and drive our success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: 'Innovation First',
                description: 'We constantly explore new technologies and approaches to stay ahead of the curve and deliver cutting-edge solutions.'
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Results-Driven',
                description: 'Every project is measured by its impact. We focus on delivering tangible results that drive business growth.'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Excellence Always',
                description: 'Good enough is never enough. We strive for excellence in every line of code, every design, every interaction.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Highlights */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">
              Journey <span className="text-gold">Highlights</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '2019', label: 'Company Founded', desc: 'Started in Awka, Nigeria' },
              { number: '50+', label: 'Projects Delivered', desc: 'Across multiple industries' },
              { number: '30+', label: 'Clients Served', desc: 'From startups to enterprises' },
              { number: '5+', label: 'Years of Growth', desc: 'Continuous innovation' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl font-display font-bold text-gold mb-2">{item.number}</div>
                <div className="font-semibold text-charcoal mb-1">{item.label}</div>
                <div className="text-sm text-charcoal/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-24 bg-gradient-to-r from-gold to-gold-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            We're always looking for talented individuals who share our passion for innovation.
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="px-10 py-4 bg-white text-gold font-semibold rounded-xl hover:bg-charcoal hover:text-white transition-all shadow-lg"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}
