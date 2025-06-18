// src/components/Policy/PolicyPage.tsx
import React, { useEffect, useRef } from 'react';

const PolicyPage: React.FC = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    const message = "Hi! I have a question regarding your privacy policy. Could you please help me?";
    const whatsappUrl = `https://wa.me/923360878079?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 
              ref={(el) => (sectionRefs.current[0] = el)}
              className="text-5xl lg:text-6xl font-semibold text-[#4c4c4c] mb-8 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            >
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-[#4c4c4c] mx-auto mb-8"></div>
            <p 
              ref={(el) => (sectionRefs.current[1] = el)}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-200"
            >
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div 
              ref={(el) => (sectionRefs.current[2] = el)}
              className="text-sm text-gray-500 mt-4 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-300"
            >
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Introduction */}
          <div 
            ref={(el) => (sectionRefs.current[3] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-[#4c4c4c] mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                BinYousuf Group ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                use our services, or interact with us in connection with our real estate services.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div 
            ref={(el) => (sectionRefs.current[4] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">Information We Collect</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-gray-300 pl-6">
                <h3 className="text-xl font-semibold text-[#4c4c4c] mb-3">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Name, email address, and phone number</li>
                  <li>Property preferences and investment requirements</li>
                  <li>Communication history and inquiry details</li>
                  <li>Financial information for property transactions (when applicable)</li>
                </ul>
              </div>

              <div className="border-l-4 border-gray-300 pl-6">
                <h3 className="text-xl font-semibold text-[#4c4c4c] mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you visit our website, we may automatically collect:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referral source and website usage patterns</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div 
            ref={(el) => (sectionRefs.current[5] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">How We Use Your Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-none p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#4c4c4c] rounded-none flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-2-4H9m4 0V9a3 3 0 00-6 0v3h6z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c4c4c] mb-2">Service Delivery</h3>
                <p className="text-gray-600 text-sm">
                  To provide real estate services, respond to inquiries, and facilitate property transactions.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-none p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#4c4c4c] rounded-none flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c4c4c] mb-2">Communication</h3>
                <p className="text-gray-600 text-sm">
                  To communicate with you about properties, updates, and respond to your questions.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-none p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#4c4c4c] rounded-none flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c4c4c] mb-2">Analytics</h3>
                <p className="text-gray-600 text-sm">
                  To analyze website usage and improve our services and user experience.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-none p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#4c4c4c] rounded-none flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c4c4c] mb-2">Legal Compliance</h3>
                <p className="text-gray-600 text-sm">
                  To comply with legal obligations and protect our rights and interests.
                </p>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div 
            ref={(el) => (sectionRefs.current[6] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">Information Sharing</h2>
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Partner Developers:</strong> We may share your information with Emaar and HMR as our official partners to facilitate property inquiries and transactions.</li>
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and conducting business.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights, property, or safety.</li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div 
            ref={(el) => (sectionRefs.current[7] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">Data Security</h2>
            <div className="border-l-4 border-[#4c4c4c] pl-6">
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div 
            ref={(el) => (sectionRefs.current[8] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">Your Rights</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4c4c4c] mb-1">Access and Update</h4>
                  <p className="text-gray-600">Request access to and correction of your personal information</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4c4c4c] mb-1">Deletion</h4>
                  <p className="text-gray-600">Request deletion of your personal information (subject to legal requirements)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4c4c4c] mb-1">Opt-out</h4>
                  <p className="text-gray-600">Unsubscribe from marketing communications at any time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div 
            ref={(el) => (sectionRefs.current[9] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">Cookies and Tracking</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. 
                You can control cookie settings through your browser preferences. Please note that disabling cookies may affect the functionality of our website.
              </p>
            </div>
          </div>

          {/* Changes to Policy */}
          <div 
            ref={(el) => (sectionRefs.current[10] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default PolicyPage;