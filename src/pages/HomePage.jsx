import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaDumbbell, FaUserFriends, FaCrown, FaHeadset, FaCalculator, FaLock, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(2)
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedCustomerSegment, setExpandedCustomerSegment] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        console.log('Fetching subscriptions from:', API_ENDPOINTS.SUBSCRIPTIONS)
        const response = await axios.get(API_ENDPOINTS.SUBSCRIPTIONS)
        console.log('Subscriptions response:', response.data)
        
        if (Array.isArray(response.data)) {
          setSubscriptions(response.data)
        } else {
          console.error('Response data is not an array:', response.data)
          setError('Invalid data format received from server')
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching subscriptions:', error)
        console.error('Error details:', error.response?.data || error.message)
        setError(error.response?.data?.message || error.message || 'Failed to load subscription plans')
        setLoading(false)
      }
    }
    
    fetchSubscriptions()

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

  const handleChoosePlan = (subscriptionId) => {
    navigate(`/plan-details/${subscriptionId}`);
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
      <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between h-16 items-center">
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

            {/* Centered nav links (desktop) */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
              <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
              <button onClick={() => scrollToSection('pricing')} className="nav-link">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            </div>

            {/* Right CTA (desktop) */}
            <div className="hidden md:flex">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-full transition duration-300">
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
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-4 rounded-full text-lg font-semibold transition duration-300">
                Get FREE Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="section-padding pt-24 md:pt-32 pb-0 md:pb-0 bg-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-purple-50 text-gray-700 text-sm md:text-base fade-in hover:bg-purple-100 transition-colors duration-300 cursor-pointer">
            <span className="font-normal">Are you a Gym Owner?</span>
            <span className="font-medium">Explore how to use T2G for growth.</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight fade-in tracking-[-0.06em]">
            <span className="inline-block relative">
              Revolutionize
              <span className="absolute bottom-2 left-0 w-full h-3 md:h-4 bg-yellow-400 -z-10"></span>
            </span>
            {" "}The Way
            <br />
            Gyms Grow
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 md:mb-12 fade-in max-w-3xl mx-auto leading-relaxed font-normal">
            Uncover the Untapped Potential of Your Growth to Connect with Members and Scale Your Fitness Business
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in">
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-4 md:px-10 md:py-4 rounded-full text-base md:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto">
              Get Quote – For Free
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 md:px-10 md:py-4 rounded-full text-base md:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 inline-flex items-center gap-2 w-full sm:w-auto">
              Schedule a Call
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      

      {/* Dashboard Showcase Section */}
      <div className="pt-0 md:pt-0 bg-gradient-to-b  via-white to-yellow-50/20 pb-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Mockup - 3D Fan Layout */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] fade-in" style={{perspective: '2000px'}}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br  via-transparent to-yellow-200/20 blur-3xl"></div>
            
            {/* Left Screen - Rotated */}
            <div 
              className="absolute left-0 right-0 mx-auto w-[85%] md:w-[75%] lg:w-[65%] top-1/2 -translate-y-1/2 transition-all duration-700 hover:translate-x-[-10px] hover:rotate-[-12deg]"
              style={{
                transform: 'translateY(-50%) translateX(-8%) rotateY(25deg) rotateZ(-8deg) scale(0.85)',
                transformStyle: 'preserve-3d',
                zIndex: 6,
                opacity: 3.6
              }}
            >
              <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 backdrop-blur-sm p-3 md:p-4 lg:p-6">
                <img 
                  src="/image.png" 
                  alt="T2G Dashboard - Client Management" 
                  className="w-full h-auto rounded-lg opacity-90"
                />
              </div>
            </div>

            {/* Center Screen - Main Focus */}
            <div 
              className="absolute left-0 right-0 mx-auto w-[85%] md:w-[75%] lg:w-[65%] top-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-105"
              style={{
                transform: 'translateY(0%) scale(1)',
                transformStyle: 'preserve-3d',
                zIndex: 9
              }}
            >
              <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-4 md:p-5 lg:p-7">
                <img 
                  src="/image.png" 
                  alt="T2G Dashboard Analytics" 
                  className="w-full h-auto rounded-lg md:rounded-xl"
                />
              </div>

              {/* Floating Stats - Left */}
              <div className="hidden lg:block absolute -left-12 xl:-left-16 top-1/4 bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-4 border border-gray-100 scale-in" style={{animationDelay: '0.3s', zIndex: 4}}>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-3">
                    <FaUserFriends className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">365</p>
                    <p className="text-sm text-gray-600">Total Clients</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats - Right */}
              <div className="hidden lg:block absolute -right-12 xl:-right-16 top-1/3 bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-4 border border-gray-100 scale-in" style={{animationDelay: '0.5s', zIndex: 4}}>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3">
                    <FaDumbbell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">275</p>
                    <p className="text-sm text-gray-600">Active Members</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Screen - Rotated */}
            <div 
              className="absolute left-0 right-0 mx-auto w-[85%] md:w-[75%] lg:w-[65%] top-1/2 -translate-y-1/2 transition-all duration-700 hover:translate-x-[10px] hover:rotate-[12deg]"
              style={{
                transform: 'translateY(-50%) translateX(8%) rotateY(-25deg) rotateZ(8deg) scale(0.85)',
                transformStyle: 'preserve-3d',
                zIndex: 6,
                opacity: 1.6
              }}
            >
              <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 backdrop-blur-sm p-3 md:p-4 lg:p-6">
                <img 
                  src="/image.png" 
                  alt="T2G Dashboard - Analytics" 
                  className="w-full h-auto rounded-lg opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Heading Section */}
          <div className="text-center mt-16 md:mt-20 fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Revolutionize Your Fitness Brand
              <br />
              with{" "}
              <span className="inline-block relative">
                Smart Dashboard
                <span className="absolute bottom-2 left-0 w-full h-3 md:h-4 bg-yellow-400 -z-10"></span>
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Manage your entire gym operations from a single, powerful dashboard. Track members, monitor subscriptions, and grow your business effortlessly.
            </p>
          </div>
        </div>
      </div>
      </section>

      {/* Features Overview */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 fade-in">
              Powerful Features for Your Gym
            </h2>
            <p className="text-base md:text-lg text-gray-600 fade-in max-w-2xl mx-auto">
              Everything you need to manage and grow your fitness business in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in border border-purple-100">
              <div className="bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaUserFriends className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Client Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track and manage all your gym members from a centralized dashboard
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-yellow-50 to-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in border border-yellow-100">
              <div className="bg-yellow-400 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaDumbbell className="w-7 h-7 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Active Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor subscriptions and member activity in real-time
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in border border-blue-100">
              <div className="bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaCalculator className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Income Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track revenue trends and financial performance with detailed insights
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 fade-in border border-gray-200">
              <div className="bg-gray-900 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FaHeadset className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get help whenever you need it with our dedicated support team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4 items-start">
            {/* Left: Heading + Accordion */}
            <div className="space-y-6 md:space-y-6">
              <div className="space-y-4">
                <p className="text-sm md:text-base text-gray-600">Expanding the Limits of Possibility with Tailored Solutions</p>
                <div>
                  <h2 className="text-[34px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.05] tracking-[-0.02em] text-gray-900">
                    <span className="block">Explore</span>
                    <span className="block font-normal italic">Smart Fitness</span>
                    <span className="block">Capabilities</span>
                  </h2>
                </div>
              </div>

              {/* Accordion List */}
              <div className="divide-y divide-gray-200 border-t border-b">
                {[
                  {
                    title: 'Members Management',
                    description:
                      'Centralize profiles, attendance, payments, and communication with effortless control.',
                  },
                  {
                    title: 'Brand & Communication',
                    description:
                      'Engage members via IVR and WhatsApp with timely, personalized interactions.',
                  },
                  {
                    title: 'Mobile Development',
                    description:
                      'We deliver user‑friendly apps with engaging interfaces and seamless functionality across platforms.',
                  },
                  {
                    title: 'Data Security',
                    description:
                      'OTP and IP safeguards protect user accounts and sensitive information end‑to‑end.',
                  },
                ].map((item, index) => {
                  const isActive = activeFeatureIndex === index
                  return (
                    <button
                      key={item.title}
                      onClick={() => setActiveFeatureIndex(index)}
                      className={`w-full text-left py-5 md:py-6 transition-colors ${
                        isActive ? 'text-gray-900' : 'text-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-6">
                        <div className="mt-1 text-gray-500 min-w-[24px]">{index + 1}.</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-[18px] md:text-[20px] font-semibold">{item.title}</h3>
                            <svg
                              className={`w-5 h-5 transition-transform ${isActive ? 'translate-x-1' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          {isActive && (
                            <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="relative w-full flex items-center justify-center lg:-ml-4">
              <div className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]">
                <img
                  src="/pic1.gif"
                  alt="Illustration"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Experience */}
      <section className="section-padding bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black fade-in">
              Experience of our Customer
            </h2>
            <span className="absolute top-0 right-0 text-sm md:text-base text-black">2025®</span>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Two Testimonial Cards */}
            <div className="space-y-6">
              {/* Testimonial Card 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md fade-in">
                <p className="text-gray-800 mb-4 leading-relaxed">
                  <span className="italic font-bold">Incredible team!</span> They delivered exactly what we needed, on time and beyond expectations.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-black">
                    <span>★★★★★</span>
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 transition-colors">
                    <span className="text-black font-bold text-lg">+</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-black">James Carter</p>
                    <p className="text-gray-600 text-sm">Wilson & Co</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md fade-in">
                <p className="text-gray-800 mb-4 leading-relaxed">
                  <span className="italic font-bold">Incredible team!</span> They delivered exactly what we needed, on time and beyond expectations.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-black">
                    <span>★★★★★</span>
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2 transition-colors">
                    <span className="text-black font-bold text-lg">+</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img src="https://images.pexels.com/photos/774909/pexels-photo-655909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-black">James Carter</p>
                    <p className="text-gray-600 text-sm">Wilson & Co</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Rating Summary Card */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md fade-in">
              <div className="mb-6">
                <p className="text-4xl md:text-5xl font-bold text-black mb-4">4.9/5</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We've delivered 56+ projects that help companies generate real results.
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-black font-medium mb-3">nayvis®</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-black border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-black border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-black border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-black border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </div>
                  <div className="flex text-black ml-2">
                    <span>★★★★★</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Trusted by clients worldwide</p>
              </div>

              <button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors">
                Leave a review
              </button>
            </div>

            {/* Right Column - Two Testimonial Cards */}
            <div className="space-y-6">
              {/* Testimonial Card 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md fade-in">
                <p className="text-gray-800 mb-4 leading-relaxed">
                  A smooth process from start to finish. Highly professional team!
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-black border-2 border-white flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-black"></div>
                  </div>
                  <div>
                    <p className="font-bold text-black">Anna Martinez</p>
                    <p className="text-gray-600 text-sm">Marketing Director</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 4 */}
              <div className="bg-white p-6 rounded-xl shadow-md fade-in">
                <p className="text-gray-800 mb-4 leading-relaxed">
                  Our new branding is exactly what we envisioned—clean, modern, and unique. <span className="font-bold">#1 in our industry.</span>
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-black">Emily Davis</p>
                    <p className="text-gray-600 text-sm">Startup Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-black fade-in">
            Membership Plans
          </h2>
          
        
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              <p className="mt-4 text-gray-600">Loading subscription plans...</p>
              <p className="mt-2 text-sm text-gray-500">Fetching from: {API_ENDPOINTS.SUBSCRIPTIONS}</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 font-semibold mb-2">Failed to load subscription plans</p>
                <p className="text-red-500 text-sm mb-2">{error}</p>
                <p className="text-xs text-gray-600 mb-2">Endpoint: {API_ENDPOINTS.SUBSCRIPTIONS}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-gray-600 font-semibold">No subscription plans available</p>
                <p className="text-gray-500 text-sm mt-2">The API returned an empty array</p>
                <p className="text-xs text-gray-500 mt-2">Endpoint: {API_ENDPOINTS.SUBSCRIPTIONS}</p>
              </div>
            </div>
          ) : (
            <div>
              
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {subscriptions.map((subscription, index) => (
                  <div 
                    key={subscription.subscriptionId || index} 
                    className={`p-6 md:p-8 rounded-lg shadow-lg ${
                      index === 1 ? 'bg-black text-white transform scale-105' : 'bg-[#F4F1EA] text-black'
                    }`}
                  >
                    <h3 className={`text-2xl font-bold mb-4 ${index === 1 ? 'text-white' : 'text-black'}`}>
                      {subscription.subscriptionName || 'Unnamed Plan'}
                    </h3>
                    <p className={`text-4xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-black'}`}>
                      ₹{subscription.subscriptionAmount || 0}
                    </p>
                    <p className={`text-sm mb-6 ${index === 1 ? 'text-gray-200' : 'text-gray-600'}`}>
                      for {subscription.subscriptionMonths || 0} {subscription.subscriptionMonths === 1 ? 'month' : 'months'}
                    </p>
                    <ul className={`space-y-3 mb-8 ${index === 1 ? 'text-gray-200' : 'text-gray-600'}`}>
                      {subscription.details && subscription.details.length > 0 ? (
                        subscription.details.map((detail, detailIndex) => (
                          <li key={detail.subscriptionDetailsId || detailIndex}>✓ {detail.details}</li>
                        ))
                      ) : (
                        <li>No details available</li>
                      )}
                    </ul>
                    <button 
                      onClick={() => handleChoosePlan(subscription.subscriptionId)} 
                      className={`w-full px-6 py-3 rounded-full font-semibold transition duration-300 ${
                        index === 1 
                          ? 'bg-white text-black hover:bg-gray-100' 
                          : 'btn-primary'
                      }`}
                    >
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Who We Serve & Purpose Section */}
      <section className="section-padding bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column - WHO WE SERVE */}
            <div className="fade-in">
              <h3 className="text-sm uppercase tracking-wider text-gray-700 mb-8 font-semibold">
                WHO WE SERVE
              </h3>
              
              {/* Customer Segments List */}
              <div className="space-y-0 border-t border-gray-300">
                {[
                  { name: 'CONSUMERS', description: 'Individual customers and end-users' },
                  { name: 'SMALL & MEDIUM BUSINESSES', description: 'Growing businesses looking to scale' },
                  { name: 'GOVERNMENT & PUBLIC SECTORS', description: 'Public sector organizations and agencies' },
                  { name: 'LARGE ENTERPRISES', description: 'Enterprise-level organizations with complex needs' },
                  { name: 'BANKS & CREDIT UNIONS', description: 'Financial institutions and banking services' }
                ].map((segment, index) => (
                  <div key={index} className="border-b border-gray-300">
                    <button
                      onClick={() => setExpandedCustomerSegment(expandedCustomerSegment === index ? null : index)}
                      className="w-full flex items-center justify-between py-5 text-left group"
                    >
                      <span className={`text-xl font-bold ${
                        index === 4 ? 'text-black' : 'text-gray-700'
                      } group-hover:text-black transition-colors`}>
                        {segment.name}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                        <span className="text-gray-700 font-bold text-lg">+</span>
                      </div>
                    </button>
                    {expandedCustomerSegment === index && (
                      <div className="pb-4 text-gray-600">
                        {segment.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pricing Information */}
              <p className="mt-8 text-gray-700 leading-relaxed">
                We offer flexible pricing based on project complexity and duration—ranging from fixed project fees to retainer and hourly models.
              </p>
            </div>

            {/* Right Column - OUR PURPOSE & OUR MISSION */}
            <div className="fade-in space-y-12">
              {/* OUR PURPOSE */}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-700 mb-6 font-semibold">
                  OUR PURPOSE
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our purpose is to make AI accessible and affordable for everyone, empowering businesses of all sizes to leverage the power of AI to drive innovation, automate processes, and unlock new opportunities.
                </p>
              </div>

              {/* OUR MISSION */}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-700 mb-6 font-semibold">
                  OUR MISSION
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to make AI accessible and affordable for everyone, empowering businesses of all sizes to leverage the power of AI to drive innovation, automate processes, and unlock new opportunities.
                </p>
              </div>
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