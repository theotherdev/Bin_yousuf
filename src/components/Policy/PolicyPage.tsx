// src/components/Policy/PolicyPage.tsx - Updated with new WhatsApp message
import React, { useEffect, useRef } from 'react';

const PolicyPage: React.FC = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

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

  const handleContactClick = () => {
    const message =
      "Hi! I'm interested in learning more about EMAAR & HMR waterfront properties. Could you please provide me with more information?";
    const whatsappUrl = `https://wa.me/923360878079?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1
              ref={el => (sectionRefs.current[0] = el)}
              className="text-5xl lg:text-6xl font-semibold text-[#4c4c4c] mb-8 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            >
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-[#4c4c4c] mx-auto mb-8"></div>
            <p
              ref={el => (sectionRefs.current[1] = el)}
              className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-200"
            >
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
            <div
              ref={el => (sectionRefs.current[2] = el)}
              className="text-sm text-neutral-500 mt-4 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out delay-300"
            >
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Introduction */}
          <div
            ref={el => (sectionRefs.current[3] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-100">
              <h2 className="text-2xl font-semibold text-[#4c4c4c] mb-4">
                Introduction
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                BinYousuf Group ("we," "our," or "us") respects your privacy and
                is committed to protecting your personal information. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website, use our
                services, or interact with us in connection with our real estate
                services.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div
            ref={el => (sectionRefs.current[4] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">
              Information We Collect
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-neutral-300 pl-6">
                <h3 className="text-xl font-semibold text-[#4c4c4c] mb-3">
                  Personal Information
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily
                  provide to us, including:
                </p>
                <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                  <li>Name, email address, and phone number</li>
                  <li>Property preferences and investment requirements</li>
                  <li>Communication history and inquiry details</li>
                  <li>
                    Financial information for property transactions (when
                    applicable)
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-neutral-300 pl-6">
                <h3 className="text-xl font-semibold text-[#4c4c4c] mb-3">
                  Automatically Collected Information
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  When you visit our website, we may automatically collect:
                </p>
                <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
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
            ref={el => (sectionRefs.current[5] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">
              How We Use Your Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-neutral-200 rounded-none p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#4c4c4c] rounded-none flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-2-4H9m4 0V9a3 3 0 00-6 0v3h6z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c4c4c] mb-2">
                  Service Delivery
                </h3>
                <p className="text-neutral-600 text-sm">
                  To provide real estate services, respond to inquiries, and
                  facilitate property transactions.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-none p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#4c4c4c] rounded-none flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c4c4c] mb-2">
                  Communication
                </h3>
                <p className="text-neutral-600 text-sm">
                  To communicate with you about properties, updates, and respond
                  to your questions.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-none p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#4c4c4c] rounded-none flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c4c4c] mb-2">
                  Analytics
                </h3>
                <p className="text-neutral-600 text-sm">
                  To analyze website usage and improve our services and user
                  experience.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-none p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#4c4c4c] rounded-none flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#4c4c4c] mb-2">
                  Legal Compliance
                </h3>
                <p className="text-neutral-600 text-sm">
                  To comply with legal obligations and protect our rights and
                  interests.
                </p>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div
            ref={el => (sectionRefs.current[6] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">
              Information Sharing
            </h2>
            <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-100">
              <p className="text-neutral-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except in the
                following circumstances:
              </p>
              <ul className="list-disc list-inside text-neutral-700 space-y-2 ml-4">
                <li>
                  <strong>Partner Developers:</strong> We may share your
                  information with Emaar and HMR as our official partners to
                  facilitate property inquiries and transactions.
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share information
                  with trusted third-party service providers who assist us in
                  operating our website and conducting business.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose
                  information when required by law or to protect our rights,
                  property, or safety.
                </li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div
            ref={el => (sectionRefs.current[7] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">
              Data Security
            </h2>
            <div className="border-l-4 border-[#4c4c4c] pl-6">
              <p className="text-neutral-700 leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div
            ref={el => (sectionRefs.current[8] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">
              Your Rights
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
                    Access and Update
                  </h4>
                  <p className="text-neutral-600">
                    Request access to and correction of your personal
                    information
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
                    Deletion
                  </h4>
                  <p className="text-neutral-600">
                    Request deletion of your personal information (subject to
                    legal requirements)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#4c4c4c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
                  <h4 className="font-semibold text-[#4c4c4c] mb-1">Opt-out</h4>
                  <p className="text-neutral-600">
                    Unsubscribe from marketing communications at any time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div
            ref={el => (sectionRefs.current[9] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">
              Cookies and Tracking
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-neutral-700 leading-relaxed">
                Our website may use cookies and similar tracking technologies to
                enhance your browsing experience and analyze website traffic.
                You can control cookie settings through your browser
                preferences. Please note that disabling cookies may affect the
                functionality of our website.
              </p>
            </div>
          </div>

          {/* Changes to Policy */}
          <div
            ref={el => (sectionRefs.current[10] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <h2 className="text-3xl font-semibold text-[#4c4c4c] mb-6">
              Changes to This Policy
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last updated" date. We encourage you
              to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          {/* Contact Section */}
          <div
            ref={el => (sectionRefs.current[11] = el)}
            className="mb-12 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="bg-gradient-to-br from-[#4c4c4c] to-neutral-700 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Questions About This Policy?
              </h2>
              <p className="text-neutral-200 mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy or our data
                practices, please don't hesitate to contact us.
              </p>
              <button
                onClick={handleContactClick}
                className="inline-flex items-center gap-3 bg-white text-[#4c4c4c] px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Contact Us on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PolicyPage;
