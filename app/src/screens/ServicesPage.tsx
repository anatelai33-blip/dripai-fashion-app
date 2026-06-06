import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Code2, ShoppingCart, Globe, Cloud, Check, ArrowRight, Smartphone, Database, Shield, Zap } from 'lucide-react';

export function ServicesPage() {
  const { navigateTo } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 'apps',
      icon: <Code2 className="w-10 h-10" />,
      title: 'Mobile & Web App Development',
      shortDesc: 'Custom applications for iOS, Android, and web',
      description: 'We build high-performance, user-centric applications that deliver exceptional experiences across all platforms. From concept to deployment, we handle every aspect of app development.',
      image: '/images/apps-development.jpg',
      features: [
        'Native iOS & Android Development',
        'Cross-Platform Solutions (React Native, Flutter)',
        'Progressive Web Apps (PWA)',
        'API Development & Integration',
        'App Store Optimization',
        'Ongoing Maintenance & Support'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'React', 'Node.js'],
      useCases: [
        { title: 'FinTech Banking App', desc: 'Secure mobile banking with biometric authentication' },
        { title: 'E-Learning Platform', desc: 'Interactive educational app with video courses' },
        { title: 'Healthcare Telemedicine', desc: 'Doctor-patient consultation platform' }
      ]
    },
    {
      id: 'commerce',
      icon: <ShoppingCart className="w-10 h-10" />,
      title: 'E-Commerce Solutions',
      shortDesc: 'End-to-end online store development',
      description: 'Transform your business with powerful e-commerce platforms that drive sales and delight customers. We create seamless shopping experiences with secure payments and inventory management.',
      image: '/images/commerce.jpg',
      features: [
        'Custom Online Store Development',
        'Payment Gateway Integration',
        'Inventory Management Systems',
        'Multi-vendor Marketplaces',
        'Shopping Cart Optimization',
        'Order & Shipping Management'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal', 'AWS'],
      useCases: [
        { title: 'Fashion Retail Store', desc: 'Luxury fashion e-commerce with AR try-on' },
        { title: 'Multi-vendor Marketplace', desc: 'Platform connecting buyers and sellers' },
        { title: 'B2B Wholesale Portal', desc: 'Bulk ordering system for businesses' }
      ]
    },
    {
      id: 'web3',
      icon: <Globe className="w-10 h-10" />,
      title: 'Web3 & Blockchain',
      shortDesc: 'Decentralized applications and smart contracts',
      description: 'Enter the decentralized future with our Web3 solutions. From smart contracts to dApps, we help businesses leverage blockchain technology for transparency, security, and innovation.',
      image: '/images/web3.jpg',
      features: [
        'Smart Contract Development',
        'Decentralized Apps (dApps)',
        'NFT Marketplaces',
        'DeFi Solutions',
        'Token Creation & ICO',
        'Blockchain Integration'
      ],
      technologies: ['Ethereum', 'Solidity', 'Web3.js', 'IPFS', 'Polygon', 'Hardhat'],
      useCases: [
        { title: 'NFT Art Marketplace', desc: 'Platform for digital artists to mint and sell NFTs' },
        { title: 'DeFi Lending Protocol', desc: 'Decentralized finance application' },
        { title: 'Supply Chain Tracking', desc: 'Transparent product journey on blockchain' }
      ]
    },
    {
      id: 'saas',
      icon: <Cloud className="w-10 h-10" />,
      title: 'SaaS Products',
      shortDesc: 'Cloud-based software solutions',
      description: 'Build scalable Software-as-a-Service products that solve real business problems. We design, develop, and deploy cloud-native applications with subscription models and multi-tenancy.',
      image: '/images/saas.jpg',
      features: [
        'Cloud-Native Architecture',
        'Multi-tenant Systems',
        'Subscription Management',
        'Analytics Dashboards',
        'API-First Design',
        'Auto-scaling Infrastructure'
      ],
      technologies: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
      useCases: [
        { title: 'Project Management Tool', desc: 'Team collaboration and task management' },
        { title: 'CRM Platform', desc: 'Customer relationship management system' },
        { title: 'Analytics Dashboard', desc: 'Business intelligence and reporting' }
      ]
    }
  ];

  const currentService = services[activeService];

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
              Our <span className="text-gold">Services</span>
            </h1>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
              From mobile apps to blockchain solutions, we offer comprehensive digital services 
              that help businesses thrive in the modern world.
            </p>
          </div>
        </div>
      </section>

      {/* Service Navigation */}
      <section className="py-12 bg-white border-b border-cream-dark/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeService === index
                    ? 'bg-gold text-white shadow-gold'
                    : 'bg-cream-light text-charcoal hover:bg-gold/10'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Service Detail */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 rounded-3xl transform rotate-3" />
              <img 
                src={currentService.image} 
                alt={currentService.title}
                className="relative rounded-3xl shadow-card w-full"
              />
            </div>

            {/* Content */}
            <div>
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6">
                {currentService.icon}
              </div>
              <h2 className="text-4xl font-display font-bold text-charcoal mb-4">
                {currentService.title}
              </h2>
              <p className="text-xl text-charcoal/70 mb-8 leading-relaxed">
                {currentService.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-charcoal mb-4">What We Offer</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {currentService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-charcoal/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-charcoal mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {currentService.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-cream-light text-charcoal/70 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => navigateTo('contact')}
                className="px-8 py-4 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark transition-all flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">
              Use Cases for <span className="text-gold">{currentService.title}</span>
            </h2>
            <p className="text-lg text-charcoal/70">
              Real-world applications of our {currentService.title.toLowerCase()} services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {currentService.useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-card transition-all">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4">
                  {index === 0 ? <Smartphone className="w-6 h-6" /> : 
                   index === 1 ? <Database className="w-6 h-6" /> : 
                   <Shield className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-display font-semibold text-charcoal mb-2">{useCase.title}</h3>
                <p className="text-charcoal/60">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">
              Our <span className="text-gold">Process</span>
            </h2>
            <p className="text-lg text-charcoal/70">
              How we bring your ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your goals and requirements' },
              { step: '02', title: 'Design', desc: 'Creating intuitive user experiences' },
              { step: '03', title: 'Development', desc: 'Building with clean, scalable code' },
              { step: '04', title: 'Deployment', desc: 'Launching and continuous support' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-white text-2xl font-display font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-semibold text-charcoal mb-2">{item.title}</h3>
                <p className="text-charcoal/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Why Choose <span className="text-gold">Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="w-8 h-8" />, title: 'Fast Delivery', desc: 'Agile methodology ensures quick turnaround without compromising quality.' },
              { icon: <Shield className="w-8 h-8" />, title: 'Secure & Scalable', desc: 'Enterprise-grade security and architecture that grows with your business.' },
              { icon: <Check className="w-8 h-8" />, title: 'Quality Assured', desc: 'Rigorous testing and QA processes for bug-free delivery.' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center text-gold mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-gold to-gold-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let's discuss how we can help bring your vision to life.
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="px-10 py-4 bg-white text-gold font-semibold rounded-xl hover:bg-charcoal hover:text-white transition-all shadow-lg inline-flex items-center gap-2"
          >
            Get a Free Quote <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
