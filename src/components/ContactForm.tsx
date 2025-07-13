// UPDATED ContactForm.tsx with Website Color Theme - June 5, 2025
// Updated to match website's neutral color scheme (#4c4c4c, #666)

import React, { useState, useEffect } from 'react';

// --- WRAPPER APP TO RUN THE FORM ---
const App = ({ projectName }: { projectName: string }) => {
  return (
    <>
      {/* This is your actual form component */}
      <ContactForm projectName={projectName} />
    </>
  );
};

// --- THE CONTACT FORM COMPONENT ---
interface ContactFormProps {
  projectName: string;
}

interface FormData {
  name: string; email: string; phone: string;
  project: string; howHeard: string; message: string;
}

interface FormErrors {
  name?: string; email?: string; phone?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ projectName }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', project: projectName, howHeard: '', message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const howHeardOptions = [ 'Website', 'Social Media', 'Referral', 'Advertisement', 'Other' ];
  const projectOptions = { 
    Emaar: ['Panorama', 'The Views', 'Park Edge', 'Coral Towers', 'Pearl & Reef Towers'],
    HMR: ['AA Waterfront', 'Gold Crest Residence', 'H&S Residence', 'H1 Tower', 'Saima Marina', 'Saima Waterfront', 'Beach Terraces By Metro']
  };

  useEffect(() => {
    setFormData(prev => ({ ...prev, project: projectName }));
  }, [projectName]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Only validate if fields are filled out
    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.phone.trim() && formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) { setErrors(prev => ({ ...prev, [name]: undefined })); }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Prepare data for Sheets API
    const submissionData = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      property: formData.project,
      residency: '', // Can be added to form later if needed
      features: '', // Can be added to form later if needed
      source: 'website_lead_form',
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    };

    try {
      const response = await fetch('/api/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();
      
      // Enhanced logging for debugging
      // Response logged in development only
      if (process.env.NODE_ENV === 'development') {
        console.log('API Response:', result);
        console.log('Response status:', response.status);
      }

      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', project: projectName, howHeard: '', message: '' });
          setErrors({});
          setSubmitStatus('idle');
        }, 5000);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('API returned error:', result);
        }
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      // Only log errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Form submission error:', error);
        console.error('Full error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
        if (typeof window !== 'undefined') {
          console.log('Submission data was:', submissionData);
        }
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <section className="py-16 md:py-24" style={{backgroundColor: '#FAFAFA'}}>
          <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-10">
                  <div className="inline-block p-3 bg-neutral-100 rounded-full mb-6">
                      <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                      Interested in {projectName}?
                  </h2>
                  <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                      Get detailed information about pricing, floor plans, and investment opportunities.
                  </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                  <div className="bg-black px-8 py-6">
                      <h3 className="text-xl font-semibold text-white">Contact Information</h3>
                      <p className="text-body-sm text-gray-300 mt-1">We'll respond within 24 hours</p>
                  </div>
                  
                  <div className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                              <label htmlFor="name" className="block text-body-sm font-semibold text-neutral-700 mb-2">
                                  Name
                              </label>
                              <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                className={`w-full px-4 py-3.5 border ${errors.name ? 'border-red-300 bg-red-50' : 'border-neutral-300 hover:border-neutral-400'} rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all duration-200 bg-neutral-50 focus:bg-white`} 
                                placeholder="Your full name (optional)"
                              />
                              {errors.name && <p className="mt-2 text-body-sm text-red-600 flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {errors.name}
                              </p>}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                  <label htmlFor="email" className="block text-body-sm font-semibold text-neutral-700 mb-2">
                                      Email
                                  </label>
                                  <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    className={`w-full px-4 py-3.5 border ${errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-300 hover:border-neutral-400'} rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all duration-200 bg-neutral-50 focus:bg-white`} 
                                    placeholder="your@email.com (optional)"
                                  />
                                  {errors.email && <p className="mt-2 text-body-sm text-red-600 flex items-center">
                                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                      {errors.email}
                                  </p>}
                              </div>
                              
                              <div>
                                  <label htmlFor="phone" className="block text-body-sm font-semibold text-neutral-700 mb-2">
                                      Phone
                                  </label>
                                  <input 
                                    type="tel" 
                                    name="phone" 
                                    id="phone" 
                                    value={formData.phone} 
                                    onChange={handleInputChange} 
                                    className={`w-full px-4 py-3.5 border ${errors.phone ? 'border-red-300 bg-red-50' : 'border-neutral-300 hover:border-neutral-400'} rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all duration-200 bg-neutral-50 focus:bg-white`} 
                                    placeholder="+92 300 1234567 (optional)"
                                  />
                                  {errors.phone && <p className="mt-2 text-body-sm text-red-600 flex items-center">
                                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                      {errors.phone}
                                  </p>}
                              </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                  <label htmlFor="project" className="block text-body-sm font-semibold text-neutral-700 mb-2">
                                      Project Interest
                                  </label>
                                  <div className="relative">
                                      <select 
                                        name="project" 
                                        id="project" 
                                        value={formData.project} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3.5 border border-neutral-300 hover:border-neutral-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-200 bg-neutral-50 focus:bg-white"
                                      >
                                        <option value="">Any project</option>
                                        <optgroup label="Emaar">{projectOptions.Emaar.map(p => <option key={p} value={p}>{p}</option>)}</optgroup>
                                        <optgroup label="HMR">{projectOptions.HMR.map(p => <option key={p} value={p}>{p}</option>)}</optgroup>
                                        <option value="Multiple projects">Multiple projects</option>
                                        <option value="Not sure">Not sure</option>
                                      </select>
                                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                          <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                          </svg>
                                      </div>
                                  </div>
                              </div>
                              
                              <div>
                                  <label htmlFor="howHeard" className="block text-body-sm font-semibold text-neutral-700 mb-2">
                                      How did you find us?
                                  </label>
                                  <div className="relative">
                                      <select 
                                        name="howHeard" 
                                        id="howHeard" 
                                        value={formData.howHeard} 
                                        onChange={handleInputChange} 
                                        className="w-full px-4 py-3.5 border border-neutral-300 hover:border-neutral-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-200 bg-neutral-50 focus:bg-white"
                                      >
                                        <option value="">Optional</option>
                                        {howHeardOptions.map(o => <option key={o} value={o}>{o}</option>)}
                                      </select>
                                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                          <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                          </svg>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="pt-6">
                              <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className={`w-full px-6 py-4 bg-black hover:bg-gray-900 text-white font-semibold rounded-lg transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'} focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                              >
                                {isSubmitting ? (
                                  <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                                    </svg>
                                    Submitting...
                                  </span>
                                ) : (
                                  <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    Get Property Information
                                  </span>
                                )}
                              </button>
                              
                              {submitStatus === 'success' && (
                                <div className="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                                  <div className="flex items-center text-green-800">
                                    <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Thank you for your interest!</p>
                                        <p className="text-body-sm text-green-700">Our team will contact you within 24 hours with detailed information.</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {submitStatus === 'error' && (
                                <div className="mt-6 p-5 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg">
                                  <div className="flex items-center text-red-800">
                                    <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold">Something went wrong</p>
                                        <p className="text-body-sm text-red-700">Please try again or contact us directly via WhatsApp.</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                      </form>
                  </div>
              </div>
              
              <div className="mt-12 text-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200 shadow-lg inline-block">
                      <p className="text-neutral-700 mb-4 font-medium">Prefer to talk directly?</p>
                      <a 
                        href="https://wa.me/923360878079?text=Hi! I'm interested in learning more about BYG properties." 
                        className="inline-flex items-center px-6 py-3 bg-[#121212] hover:bg-black text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.309"/>
                        </svg>
                        WhatsApp Us
                      </a>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default App;