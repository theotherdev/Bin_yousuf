// src/components/About/AboutUsPage.tsx - Updated with new WhatsApp message
import React, { useEffect, useRef } from 'react';
import { getProjectCounts } from '../../data/projects';

// Import the partner logos - add these to your assets folder
import emaarLogo from '../../assets/projects/emaar-logo.png';
import hmrLogo from '../../assets/projects/hmr-logo.png';

const AboutUsPage: React.FC = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const projectCounts = getProjectCounts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleWhatsAppClick = () => {
    const message =
      "Hi! I'm interested in learning more about EMAAR & HMR waterfront properties. Could you please provide me with more information?";
    const whatsappUrl = `https://wa.me/923360878079?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1
              ref={el => (sectionRefs.current[0] = el)}
              className="text-5xl lg:text-6xl font-semibold text-[#4c4c4c] mb-8 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            >
              About Us
            </h1>
            <div className="w-24 h-1 bg-[#4c4c4c] mx-auto mb-8"></div>
            <p
              ref={el => (sectionRefs.current[1] = el)}
              className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-200"
            >
              BinYousuf Group – Specialists in waterfront properties
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Main Content */}
            <div
              ref={el => (sectionRefs.current[2] = el)}
              className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            >
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#4c4c4c] mb-8 leading-tight">
                Delivering Dreams Wrapped in Ocean Views
              </h2>

              <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
                <p>
                  At BinYousuf Group, we don't just sell properties—we deliver
                  dreams wrapped in ocean views. As the{' '}
                  <strong className="text-[#4c4c4c]">
                    official sales partners
                  </strong>{' '}
                  of HMR Waterfront and Emaar Oceanfront, we open doors to a
                  lifestyle that blends prestige, serenity, and investment
                  potential like never before.
                </p>

                <p>
                  Karachi's waterfront is transforming, and we're leading the
                  movement. Our expertise, unparalleled service, and passion for
                  luxury living ensure every transaction is seamless, strategic,
                  and rewarding.
                </p>

                <p className="text-xl font-semibold text-[#4c4c4c]">
                  Step into a world where the sea meets sophistication. Your
                  journey starts with BinYousuf Group.
                </p>
              </div>

              <div className="mt-12">
                <button
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-3 bg-[#121212] hover:bg-black text-white px-8 py-4 rounded-none font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Get In Touch
                </button>
              </div>
            </div>

            {/* Right Column - Stats & Features */}
            <div
              ref={el => (sectionRefs.current[3] = el)}
              className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-300"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="text-center p-6 bg-neutral-50 rounded-none hover:bg-neutral-100 transition-colors duration-300">
                  <div className="text-4xl font-semibold text-[#4c4c4c] mb-2">
                    {projectCounts.emaar + projectCounts.hmr}+
                  </div>
                  <div className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
                    Premium Projects
                  </div>
                </div>

                <div className="text-center p-6 bg-neutral-50 rounded-none hover:bg-neutral-100 transition-colors duration-300">
                  <div className="text-4xl font-semibold text-[#4c4c4c] mb-2">
                    10+
                  </div>
                  <div className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
                    Years Experience
                  </div>
                </div>

                <div className="text-center p-6 bg-neutral-50 rounded-none hover:bg-neutral-100 transition-colors duration-300">
                  <div className="text-4xl font-semibold text-[#4c4c4c] mb-2">
                    2
                  </div>
                  <div className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
                    Official Partnerships
                  </div>
                </div>

                <div className="text-center p-6 bg-neutral-50 rounded-none hover:bg-neutral-100 transition-colors duration-300">
                  <div className="text-4xl font-semibold text-[#4c4c4c] mb-2">
                    100+
                  </div>
                  <div className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
                    Happy Clients
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-[#4c4c4c] mb-6">
                  Our Expertise
                </h3>

                <div className="flex items-start gap-4 group">
                  <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-neutral-600 transition-colors duration-300">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#4c4c4c] mb-1">
                      Official Sales Partners
                    </h4>
                    <p className="text-neutral-600">
                      Authorized partnerships with premium waterfront developers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-neutral-600 transition-colors duration-300">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#4c4c4c] mb-1">
                      Luxury Oceanfront Properties
                    </h4>
                    <p className="text-neutral-600">
                      Specialized in premium sea-facing residential developments
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-neutral-600 transition-colors duration-300">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#4c4c4c] mb-1">
                      Investment Guidance
                    </h4>
                    <p className="text-neutral-600">
                      Strategic market insights and investment consultation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-neutral-600 transition-colors duration-300">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#4c4c4c] mb-1">
                      End-to-End Service
                    </h4>
                    <p className="text-neutral-600">
                      Complete transaction management from selection to handover
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section - Updated with actual logos */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            ref={el => (sectionRefs.current[4] = el)}
            className="text-center mb-16 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-4xl font-semibold text-[#4c4c4c] mb-4">
              Our Trusted Partners
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Official sales partners with the most prestigious waterfront
              developers in Karachi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Emaar Partnership - Updated with logo */}
            <div
              ref={el => (sectionRefs.current[5] = el)}
              className="bg-white rounded-xl p-8 -shadow-lg hover:shadow-xl transition-all duration-500 opacity-0 transform translate-y-8 hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white rounded-none flex items-center justify-center mr-4 -shadow-lg border border-neutral-100 p-2">
                  <img
                    src={emaarLogo.src}
                    alt="Emaar Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[#4c4c4c]">
                    Emaar Oceanfront
                  </h3>
                  <p className="text-neutral-600 font-medium">
                    Official Sales Partner
                  </p>
                </div>
              </div>

              <p className="text-neutral-700 mb-6 leading-relaxed">
                Partnered with Emaar to bring world-class oceanfront living to
                Karachi. Our collaboration ensures access to premium sea-facing
                apartments and luxury amenities.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                  <span className="text-neutral-600">
                    Sea-facing luxury apartments
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                  <span className="text-neutral-600">
                    World-class amenities
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                  <span className="text-neutral-600">
                    Premium DHA Phase 8 location
                  </span>
                </div>
              </div>

              <a
                href="/projects?section=emaar"
                className="inline-flex items-center gap-2 text-neutral-700 font-medium hover:text-neutral-900 transition-colors duration-300 group"
              >
                View Emaar Projects
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* HMR Partnership - Updated with logo */}
            <div
              ref={el => (sectionRefs.current[6] = el)}
              className="bg-white rounded-xl p-8 -shadow-lg hover:shadow-xl transition-all duration-500 opacity-0 transform translate-y-8 hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white rounded-none flex items-center justify-center mr-4 -shadow-lg border border-neutral-100 p-2">
                  <img
                    src={hmrLogo.src}
                    alt="HMR Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[#4c4c4c]">
                    HMR Waterfront
                  </h3>
                  <p className="text-neutral-600 font-medium">
                    Official Sales Partner
                  </p>
                </div>
              </div>

              <p className="text-neutral-700 mb-6 leading-relaxed">
                Official sales partner for HMR Waterfront's premium residential
                projects. Offering diverse waterfront living options with modern
                design and exceptional value.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                  <span className="text-neutral-600">
                    Waterfront residences
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                  <span className="text-neutral-600">
                    Modern architectural design
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
                  <span className="text-neutral-600">
                    Comprehensive lifestyle amenities
                  </span>
                </div>
              </div>

              <a
                href="/projects#project-6"
                className="inline-flex items-center gap-2 text-neutral-700 font-medium hover:text-neutral-900 transition-colors duration-300 group"
              >
                View HMR Projects
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Enhanced Design */}
      <section className="relative py-24 bg-gradient-to-br from-[#4c4c4c] via-neutral-700 to-neutral-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div
            ref={el => (sectionRefs.current[7] = el)}
            className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            {/* Enhanced Heading */}
            <div className="mb-8">
              <h2 className="text-4xl lg:text-6xl font-semibold text-white mb-4 tracking-tight">
                Ready to Find Your
              </h2>
              <div className="relative inline-block">
                <h2 className="text-4xl lg:text-6xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Dream Waterfront Home?
                </h2>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full transform scale-x-0 animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="max-w-4xl mx-auto mb-16">
              <p className="text-xl lg:text-2xl text-neutral-200 leading-relaxed mb-6">
                Let our waterfront specialists guide you to the perfect property
                investment.
              </p>
              <p className="text-lg text-neutral-300 font-medium">
                Your oceanfront lifestyle awaits – where luxury meets the sea.
              </p>
            </div>

            {/* Enhanced Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button
                onClick={handleWhatsAppClick}
                className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-5 -rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl -shadow-lg transform-gpu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 -rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <svg
                  className="w-7 h-7 group-hover:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span className="relative z-10">WhatsApp Us</span>
              </button>

              <a
                href="/projects"
                className="group relative inline-flex items-center gap-4 bg-transparent border-2 border-white/80 hover:border-white text-white hover:bg-white hover:text-[#4c4c4c] px-10 py-5 -rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-sm"
              >
                <span className="relative z-10">View Projects</span>
                <svg
                  className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6m-6 4h6"
                  />
                </svg>
                <div className="absolute inset-0 bg-white -rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-neutral-300">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium">+92 336 0878079</span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">info@binyousufgroup.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
