// src/components/ContactForm.tsx - Clean Iframe Only
import React, { useState } from 'react';

interface ContactFormProps {
  projectName: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ projectName }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Interested in {projectName}?
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Loading State */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-600">Loading contact form...</p>
              </div>
            </div>
          )}

          {/* Google Form Iframe */}
          <iframe 
            src={`https://docs.google.com/forms/d/e/1FAIpQLSeXbvhQpRj0GU9OqbL5_MQ8jRRj2yukrHX8e2bFvPOoXrzjmw/viewform?embedded=true&timestamp=${Date.now()}`}
            width="100%"
            height="2200"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full border-0"
            onLoad={() => setIsLoaded(true)}
            title={`Contact form for ${projectName}`}
          >
            Loading contact form...
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;