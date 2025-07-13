import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaDumbbell, FaUserFriends, FaCrown, FaHeadset, FaCalculator, FaLock, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa'

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach((el) => observer.observe(el));

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      document.querySelectorAll('.parallax-element').forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleChoosePlan = (planType) => {
    navigate(`/plan-details/${planType.toLowerCase()}`);
  };

  const features = [
    {
      icon: <FaUserFriends className="w-12 h-12 text-black" />,
      title: "Members Management",
      description: "This feature streamlines the administrative tasks associated with managing gym memberships, user profiles, attendance, payments, and communication."
    },
    {
      icon: <FaHeadset className="w-12 h-12 text-black" />,
      title: "IVR System",
      description: "Incorporating IVR technology into a gym's communication strategy can lead to improved operational efficiency, enhanced member satisfaction, and more effective utilization of staff resources."
    },
    {
      icon: <FaDumbbell className="w-12 h-12 text-black" />,
      title: "WhatsApp",
      description: "WhatsApp can serve as a powerful tool to enhance member engagement, improve communication, and create a stronger bond between gyms and their members."
    },
    {
      icon: <FaCalculator className="w-12 h-12 text-black" />,
      title: "BMI Integration",
      description: "BMI integration provides members with an initial baseline measurement of their body composition, helping them understand where they stand in terms of health and fitness."
    },
    {
      icon: <FaCrown className="w-12 h-12 text-black" />,
      title: "Pay Roll Management",
      description: "Payroll management extremely helpful for gym owners and managers in streamlining their administrative processes and ensuring accurate and timely payment to their staff."
    },
    {
      icon: <FaLock className="w-12 h-12 text-black" />,
      title: "Data Security",
      description: "OTP (One-Time Password) system and IP security are strong measures to enhance data safety in your Gym. These security practices contribute significantly to protecting user accounts and sensitive information."
    }
  ];

  const services = [
    {
      title: "Sales & Marketing",
      description: "Our specialized platform enables you to improve member acquisition at your fitness club and boost your sales and marketing performance. You can maximize your reach and attract new club members like never before.",
      image: "https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      title: "Operations",
      description: "Our health club and fitness management software solutions are intended to make running your club a breeze. Our software can assist you with streamlining your operations and saving time and money by managing member registrations and payments, tracking attendance, and generating reports.",
      image: "https://images.pexels.com/photos/3912953/pexels-photo-3912953.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <img src="https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=40" alt="T2G Logo" className="h-8 w-8 rounded-full" />
              <h1 className="text-2xl font-bold text-black ml-2">T2G</h1>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-black hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <FaBars className="h-6 w-6" />
            </button>

            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
              <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
              <button onClick={() => scrollToSection('pricing')} className="nav-link">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
              <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full transition duration-300">
                Get FREE Trial
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />
        )}

        <div className={`mobile-menu ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="mobile-menu-header">
            <div className="flex items-center">
              <img src="https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=40" alt="T2G Logo" className="h-8 w-8 rounded-full" />
              <h2 className="text-xl font-bold text-black ml-2">T2G</h2>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="mobile-menu-close"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          
          <div className="py-2">
            <button onClick={() => scrollToSection('home')} className="mobile-nav-link">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="mobile-nav-link">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="mobile-nav-link">
              Pricing
            </button>
            <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">
              Contact
            </button>
            <div className="px-6 py-4">
              <button className="w-full bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-full text-lg font-semibold transition duration-300">
                Get FREE Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="section-padding pt-24 md:pt-32 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-black leading-tight fade-in">
              Gym management software for fitness industry
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 fade-in max-w-2xl">
              All-In-One Gym Membership Management Software With Multiple Features Made for Gyms & Fitness Health Clubs.
            </p>
            <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg font-semibold transition duration-300 fade-in">
              Request a free demo
            </button>
          </div>
          <div className="relative mt-8 md:mt-0">
            <img 
              src="https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=1200" 
              alt="Dashboard Preview" 
              className="rounded-lg shadow-2xl w-full float-animation"
            />
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="section-padding bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 fade-in">
              T2G provides smart fitness features
            </h2>
            <p className="text-lg md:text-xl text-gray-600 fade-in max-w-3xl mx-auto">
              Sign-up members and prospects online or through an in-person kiosk, using a laptop, tablet or mobile device.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-8">
              <img 
                src="https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Dashboard Preview" 
                className="rounded-lg shadow-2xl mb-8 slide-in-left w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="Feature 1" 
                  className="rounded-lg shadow-lg scale-in w-full"
                />
                <img 
                  src="https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=300" 
                  alt="Feature 2" 
                  className="rounded-lg shadow-lg scale-in w-full"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 slide-in-right">
                Member Registration Process
              </h3>
              <p className="text-lg text-gray-600 mb-6 slide-in-right">
                Empower your club members with our top-notch fitness software solutions, granting them autonomy and self-management capabilities.
              </p>
              
              <div className="space-y-4">
                {['quick', 'member', 'app'].map((section, index) => (
                  <button 
                    key={section}
                    onClick={() => toggleSection(section)}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <span className="font-semibold text-black">
                      {section === 'quick' && 'Quick Registration'}
                      {section === 'member' && 'Member Registration'}
                      {section === 'app' && 'Gym App'}
                    </span>
                    <FaChevronDown className={`transform transition-transform duration-300 ${expandedSection === section ? 'rotate-180' : ''}`} />
                  </button>
                ))}
                {expandedSection && (
                  <div className="p-4 bg-white rounded-lg mt-2 slide-in-right">
                    <p className="text-gray-600">
                      {expandedSection === 'quick' && 'Streamlined registration process for quick member onboarding.'}
                      {expandedSection === 'member' && 'Complete member profile creation and management system.'}
                      {expandedSection === 'app' && 'Mobile application for members to track their fitness journey.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-black fade-in">
            Smart Fitness Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#F4F1EA] p-6 md:p-8 rounded-lg shadow-lg text-center fade-in">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-black">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 fade-in">
              India's Finest Gym Software
            </h2>
            <p className="text-lg md:text-xl text-gray-600 fade-in">
              Empowering fitness businesses with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div key={index} className={`bg-white p-6 md:p-8 rounded-lg shadow-lg ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}`}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-48 object-cover rounded-lg mb-6 scale-in"
                />
                <h3 className="text-2xl font-bold text-black mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-black fade-in">
            Membership Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-[#F4F1EA] p-6 md:p-8 rounded-lg shadow-lg fade-in">
              <h3 className="text-2xl font-bold mb-4 text-black">Basic</h3>
              <p className="text-4xl font-bold mb-6 text-black">$29<span className="text-sm">/month</span></p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li>✓ Access to gym floor</li>
                <li>✓ Basic equipment</li>
                <li>✓ Locker room access</li>
              </ul>
              <button onClick={() => handleChoosePlan('Basic')} className="w-full btn-primary">Choose Plan</button>
            </div>
            <div className="bg-black p-6 md:p-8 rounded-lg shadow-lg transform scale-105 fade-in">
              <h3 className="text-2xl font-bold mb-4 text-white">Premium</h3>
              <p className="text-4xl font-bold mb-6 text-white">$49<span className="text-sm">/month</span></p>
              <ul className="space-y-3 mb-8 text-gray-200">
                <li>✓ All Basic features</li>
                <li>✓ Group classes</li>
                <li>✓ Personal trainer</li>
                <li>✓ Nutrition plan</li>
              </ul>
              <button onClick={() => handleChoosePlan('Premium')} className="w-full bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition duration-300">
                Choose Plan
              </button>
            </div>
            <div className="bg-[#F4F1EA] p-6 md:p-8 rounded-lg shadow-lg fade-in">
              <h3 className="text-2xl font-bold mb-4 text-black">Elite</h3>
              <p className="text-4xl font-bold mb-6 text-black">$79<span className="text-sm">/month</span></p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li>✓ All Premium features</li>
                <li>✓ 24/7 access</li>
                <li>✓ Spa access</li>
                <li>✓ Guest passes</li>
              </ul>
              <button onClick={() => handleChoosePlan('Elite')} className="w-full btn-primary">Choose Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-black fade-in">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="fade-in">
              <h3 className="text-2xl font-bold mb-6 text-black">Contact Information</h3>
              <div className="space-y-4 text-gray-600">
                <p>📍 123 Fitness Street, New York, NY 10001</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ contact@T2G.com</p>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4 text-black">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 6:00 AM - 10:00 PM</p>
                  <p>Saturday - Sunday: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
            <form className="bg-white p-6 md:p-8 rounded-lg shadow-lg fade-in">
              <div className="space-y-6">
                <div>
                  <label className="block text-black mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-black mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-black mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black"></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4 text-black">T2G</h4>
            <p className="text-gray-600 mb-6">Transform your body and mind with our premium fitness experience.</p>
            <p className="text-gray-600">© 2024 T2G. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage