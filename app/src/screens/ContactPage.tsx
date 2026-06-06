import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';

export function ContactPage() {
  const { } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: [
        'Drip with Mira Headquarters',
        'Awka, Anambra State',
        'Nigeria'
      ]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: [
        '+234 805 391 6889',
        'Mon - Fri, 9am - 6pm WAT'
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: [
        'hello@dripai.store',
        'support@dripai.store'
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      details: [
        'Monday - Friday: 9AM - 6PM',
        'Saturday: 10AM - 4PM',
        'Sunday: Closed'
      ]
    }
  ];

  const services = [
    'Mobile App Development',
    'Web Development',
    'E-Commerce Solutions',
    'Web3 / Blockchain',
    'SaaS Development',
    'UI/UX Design',
    'Consulting',
    'Other'
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
              Get in <span className="text-gold">Touch</span>
            </h1>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? We'd love to hear from you. 
              Reach out and let's start building something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white -mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-card border border-cream-dark/20">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-charcoal mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-charcoal/60 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-cream-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-card">
              <h2 className="text-3xl font-display font-bold text-charcoal mb-2">
                Start Your <span className="text-gold">Project</span>
              </h2>
              <p className="text-charcoal/60 mb-8">
                Fill out the form below and the DripAI team will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-charcoal mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-charcoal/60">
                    Thank you for reaching out. We'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Service Needed</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, idx) => (
                          <option key={idx} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map & HQ Image */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl overflow-hidden shadow-card">
                <img 
                  src="/images/hq-awka.jpg" 
                  alt="Our Headquarters in Awka"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-charcoal mb-2">
                    Visit DripAI Headquarters
                  </h3>
                  <p className="text-charcoal/60 mb-4">
                    Located in the heart of Awka, Anambra State, Nigeria. 
                    Our doors are always open for a chat over coffee.
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Awka,Anambra,Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold font-semibold hover:underline"
                  >
                    Get Directions <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-charcoal rounded-3xl p-6 text-white">
                <h3 className="text-xl font-display font-semibold mb-4">Prefer to Call?</h3>
                <p className="text-white/60 mb-4">
                  Speak directly with the DripAI team. We're available Monday to Friday, 9AM to 6PM WAT.
                </p>
                <a 
                  href="tel:+2348053916889"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold rounded-xl font-semibold hover:bg-gold-light transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +234 805 391 6889
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What services do you offer?',
                a: 'We offer comprehensive digital solutions including mobile app development, web development, e-commerce platforms, Web3/blockchain solutions, and SaaS product development.'
              },
              {
                q: 'How long does a typical project take?',
                a: 'Project timelines vary based on complexity. A simple app might take 4-8 weeks, while more complex projects can take 3-6 months. We provide detailed timelines during our discovery phase.'
              },
              {
                q: 'Do you work with international clients?',
                a: 'Absolutely! While we\'re based in Awka, Nigeria, we work with clients from around the world. Our team is experienced in remote collaboration and communication.'
              },
              {
                q: 'What is your pricing model?',
                a: 'We offer flexible pricing based on project scope—fixed-price for well-defined projects and time-and-materials for more flexible engagements. Contact us for a custom quote.'
              },
              {
                q: 'Do you provide ongoing support?',
                a: 'Yes, we offer maintenance and support packages for all our projects. This includes bug fixes, updates, and feature enhancements to keep your product running smoothly.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-cream-light rounded-2xl p-6">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-2">{faq.q}</h3>
                <p className="text-charcoal/70">{faq.a}</p>
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
            Let's turn your ideas into reality. Reach out today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+2348053916889"
              className="px-8 py-4 bg-white text-gold font-semibold rounded-xl hover:bg-charcoal hover:text-white transition-all inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
            <a 
              href="mailto:hello@dripai.store"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gold transition-all inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
