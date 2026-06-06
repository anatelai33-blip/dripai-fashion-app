import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ExternalLink, Code2, ShoppingCart, Globe, Cloud, ArrowRight, Star } from 'lucide-react';

export function PortfolioPage() {
  const { navigateTo } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'PaySwift',
      category: 'apps',
      categoryLabel: 'Mobile App',
      icon: <Code2 className="w-5 h-5" />,
      image: '/images/usecase-fintech.jpg',
      description: 'A secure mobile banking application with biometric authentication, real-time transactions, and investment tracking.',
      features: ['Biometric Login', 'Real-time Transfers', 'Investment Dashboard', 'Bill Payments'],
      technologies: ['React Native', 'Node.js', 'PostgreSQL'],
      results: '50K+ downloads, 4.8★ rating',
      link: '#'
    },
    {
      id: 2,
      title: 'LearnHub',
      category: 'apps',
      categoryLabel: 'Web Platform',
      icon: <Code2 className="w-5 h-5" />,
      image: '/images/usecase-education.jpg',
      description: 'An interactive e-learning platform with video courses, progress tracking, and certification.',
      features: ['Video Courses', 'Progress Tracking', 'Quizzes & Assessments', 'Certificates'],
      technologies: ['React', 'Django', 'AWS'],
      results: '10K+ active students',
      link: '#'
    },
    {
      id: 3,
      title: 'MedConnect',
      category: 'apps',
      categoryLabel: 'Healthcare App',
      icon: <Code2 className="w-5 h-5" />,
      image: '/images/usecase-healthcare.jpg',
      description: 'Telemedicine platform connecting patients with doctors for virtual consultations.',
      features: ['Video Consultations', 'Appointment Booking', 'Medical Records', 'Prescriptions'],
      technologies: ['Flutter', 'Firebase', 'WebRTC'],
      results: '5K+ consultations monthly',
      link: '#'
    },
    {
      id: 4,
      title: 'LuxeMarket',
      category: 'commerce',
      categoryLabel: 'E-Commerce',
      icon: <ShoppingCart className="w-5 h-5" />,
      image: '/images/usecase-realestate.jpg',
      description: 'Luxury fashion marketplace with AR try-on and personalized recommendations.',
      features: ['AR Try-On', 'AI Recommendations', 'Secure Payments', 'Multi-vendor'],
      technologies: ['Shopify', 'React', 'TensorFlow'],
      results: '200% increase in sales',
      link: '#'
    },
    {
      id: 5,
      title: 'ArtChain',
      category: 'web3',
      categoryLabel: 'Web3 / NFT',
      icon: <Globe className="w-5 h-5" />,
      image: '/images/web3.jpg',
      description: 'NFT marketplace for African digital artists to mint, sell, and trade artwork.',
      features: ['NFT Minting', 'Auction System', 'Royalty Distribution', 'Wallet Integration'],
      technologies: ['Ethereum', 'Solidity', 'IPFS', 'Web3.js'],
      results: '$1M+ in NFT sales',
      link: '#'
    },
    {
      id: 6,
      title: 'DeFiLend',
      category: 'web3',
      categoryLabel: 'DeFi Platform',
      icon: <Globe className="w-5 h-5" />,
      image: '/images/web3.jpg',
      description: 'Decentralized lending protocol enabling peer-to-peer crypto loans.',
      features: ['Smart Contracts', 'Collateral Management', 'Interest Automation', 'Governance'],
      technologies: ['Solidity', 'Polygon', 'Chainlink'],
      results: '$5M+ TVL',
      link: '#'
    },
    {
      id: 7,
      title: 'TaskFlow',
      category: 'saas',
      categoryLabel: 'SaaS Product',
      icon: <Cloud className="w-5 h-5" />,
      image: '/images/saas.jpg',
      description: 'Project management SaaS for remote teams with real-time collaboration.',
      features: ['Kanban Boards', 'Time Tracking', 'Team Chat', 'Reporting'],
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      results: '2K+ teams onboarded',
      link: '#'
    },
    {
      id: 8,
      title: 'SalesSync',
      category: 'saas',
      categoryLabel: 'CRM SaaS',
      icon: <Cloud className="w-5 h-5" />,
      image: '/images/saas.jpg',
      description: 'Customer relationship management platform for sales teams.',
      features: ['Lead Management', 'Pipeline Tracking', 'Email Integration', 'Analytics'],
      technologies: ['Vue.js', 'Laravel', 'MySQL'],
      results: '30% sales increase for clients',
      link: '#'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'apps', label: 'Apps' },
    { id: 'commerce', label: 'E-Commerce' },
    { id: 'web3', label: 'Web3' },
    { id: 'saas', label: 'SaaS' }
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
            <h1 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-6">
              Our <span className="text-gold">Portfolio</span>
            </h1>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
              Explore our latest projects and see how we've helped businesses 
              transform their digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-cream-dark/20 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  filter === cat.id
                    ? 'bg-gold text-white shadow-gold'
                    : 'bg-cream-light text-charcoal hover:bg-gold/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-charcoal flex items-center gap-1.5">
                      {project.icon}
                      {project.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-display font-bold text-charcoal">{project.title}</h3>
                    <a 
                      href={project.link}
                      className="p-2 bg-cream-light rounded-full text-gold hover:bg-gold hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  <p className="text-charcoal/70 mb-6">{project.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-cream-light text-charcoal/60 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 border border-cream-dark text-charcoal/50 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="flex items-center gap-2 text-gold">
                    <Star className="w-5 h-5 fill-gold" />
                    <span className="font-semibold">{project.results}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '30+', label: 'Happy Clients' },
              { number: '5+', label: 'Countries Served' },
              { number: '99%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-2">{stat.number}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">
              Client <span className="text-gold">Testimonials</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Chinedu Okafor', 
                role: 'CEO, PaySwift',
                quote: 'Drip with Mira transformed our vision into a world-class fintech app. Their attention to detail and technical expertise exceeded our expectations.'
              },
              { 
                name: 'Amara Nwosu', 
                role: 'Founder, ArtChain',
                quote: 'The Web3 expertise they brought to our NFT marketplace was incredible. They understood our vision and delivered beyond what we imagined.'
              },
              { 
                name: 'Emeka Ibrahim', 
                role: 'CTO, TaskFlow',
                quote: 'Our SaaS product was built with precision and care. The team was responsive, professional, and truly invested in our success.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-cream-light rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-charcoal/70 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-charcoal">{testimonial.name}</div>
                  <div className="text-sm text-charcoal/50">{testimonial.role}</div>
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
            Have a Project in Mind?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let's create something amazing together.
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="px-10 py-4 bg-white text-gold font-semibold rounded-xl hover:bg-charcoal hover:text-white transition-all shadow-lg inline-flex items-center gap-2"
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
