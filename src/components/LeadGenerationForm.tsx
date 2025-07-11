import React, { useState, useEffect } from 'react';

interface FormProps {
  headline?: string;
  image?: string;
  onlyForm: boolean;
  features: Array<string>;
  residency: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  beds: string;
  project: string;
  information: string[];
  howHeard: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  beds?: string;
  information?: string;
}

const LeadGenerationForm: React.FC<FormProps> = ({ 
  headline = "Get Exclusive Property Information",
  image,
  onlyForm,
  features,
  residency 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', beds: '', project: headline.replace('Interested in ', '').replace('?', ''), 
    information: [], howHeard: '', message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const bedsOptions = ['Studio', '1BR', '2BR', '3BR', '4BR+', 'Not decided'];
  const informationOptions = ['Floor plans & layouts', 'Pricing information', 'Payment plans', 'Site visit', 'Investment opportunities', 'Other'];
  const howHeardOptions = ['Website', 'Social Media', 'Referral', 'Advertisement', 'Other'];
  const projectOptions = { 
    Emaar: ['Panorama', 'The Views', 'Park Edge', 'Coral Towers', 'Pearl & Reef Towers'],
    HMR: ['AA Waterfront', 'Gold Crest Residence', 'H&S Residence', 'H1 Tower', 'Saima Marina', 'Saima Waterfront', 'Beach Terraces By Metro']
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) { 
      newErrors.email = 'Email is required'; 
    } else if (!emailRegex.test(formData.email)) { 
      newErrors.email = 'Please enter a valid email address'; 
    }
    if (!formData.phone.trim()) { 
      newErrors.phone = 'Phone number is required'; 
    } else if (formData.phone.replace(/\D/g, '').length < 10) { 
      newErrors.phone = 'Please enter a valid phone number'; 
    }
    if (!formData.beds) newErrors.beds = 'Please select number of beds';
    if (formData.information.length === 0) newErrors.information = 'Please select at least one information type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) { 
      setErrors(prev => ({ ...prev, [name]: undefined })); 
    }
  };

  const handleCheckboxChange = (option: string) => {
    setFormData(prev => ({ 
      ...prev, 
      information: prev.information.includes(option) 
        ? prev.information.filter(item => item !== option) 
        : [...prev.information, option] 
    }));
    if (errors.information) { 
      setErrors(prev => ({ ...prev, information: undefined })); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      source: 'project_page_form',
      residency,
      features: features.join(', ')
    };

    try {
      const response = await fetch('/api/sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({ 
            name: '', email: '', phone: '', beds: '', project: headline.replace('Interested in ', '').replace('?', ''), 
            information: [], howHeard: '', message: '' 
          });
          setErrors({});
          setSubmitStatus('idle');
        }, 5000);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormContent = () => (
    <section className="py-20 bg-neutral-50 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-3">{headline}</h2>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className={`w-full px-4 py-3 bg-white rounded-none border ${errors.name ? 'border-red-500 bg-red-50' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-neutral-500`} 
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className={`w-full px-4 py-3 bg-white rounded-none border ${errors.email ? 'border-red-500 bg-red-50' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-neutral-500`} 
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className={`w-full px-4 py-3 bg-white rounded-none border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-neutral-500`} 
                    placeholder="+92 300 1234567"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="beds" className="block text-sm font-medium text-neutral-700 mb-1">
                    Number of Beds <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="beds" 
                    id="beds" 
                    value={formData.beds} 
                    onChange={handleInputChange} 
                    className={`w-full px-4 py-3 bg-white rounded-none border ${errors.beds ? 'border-red-500 bg-red-50' : 'border-neutral-300'} focus:outline-none focus:ring-2 focus:ring-neutral-500 appearance-none cursor-pointer`}
                  >
                    <option value="">Select number of beds</option>
                    {bedsOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.beds && <p className="mt-1 text-sm text-red-500">{errors.beds}</p>}
                </div>
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-neutral-700 mb-1">
                    Project of Interest
                  </label>
                  <select 
                    name="project" 
                    id="project" 
                    value={formData.project} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 bg-white rounded-none border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 appearance-none cursor-pointer"
                  >
                    <option value="">Select a project (Optional)</option>
                    <optgroup label="Emaar">
                      {projectOptions.Emaar.map(p => <option key={p} value={p}>{p}</option>)}
                    </optgroup>
                    <optgroup label="HMR">
                      {projectOptions.HMR.map(p => <option key={p} value={p}>{p}</option>)}
                    </optgroup>
                    <option value="Multiple projects">Multiple projects</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  What information are you looking for? <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {informationOptions.map(option => (
                    <label key={option} className="flex items-center space-x-3 p-2 rounded-none hover:bg-neutral-50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.information.includes(option)} 
                        onChange={() => handleCheckboxChange(option)} 
                        className="h-4 w-4 text-neutral-600 border-neutral-300 rounded focus:ring-neutral-500"
                      />
                      <span className="text-sm text-neutral-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.information && <p className="mt-1 text-sm text-red-500">{errors.information}</p>}
              </div>
              <div>
                <label htmlFor="howHeard" className="block text-sm font-medium text-neutral-700 mb-1">
                  How did you hear about us?
                </label>
                <select 
                  name="howHeard" 
                  id="howHeard" 
                  value={formData.howHeard} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 bg-white rounded-none border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 appearance-none cursor-pointer"
                >
                  <option value="">Select an option (Optional)</option>
                  {howHeardOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex flex-col items-center space-y-4 pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`w-full md:w-auto px-8 py-4 bg-gradient-to-r from-neutral-700 to-neutral-600 text-white font-medium rounded-none shadow-lg hover:shadow-xl transform transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:from-neutral-800 hover:to-neutral-700'}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-none text-green-800 text-center w-full">
                    <span className="font-semibold">Thank you!</span> Your inquiry has been submitted.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-none text-red-800 text-center w-full">
                    <span className="font-semibold">Oops!</span> Something went wrong. Please try again.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-neutral-600">
            Prefer to talk? Call us at{' '}
            <a 
              href="https://wa.me/923360878079?text=Hi! I'm interested in learning more about BYG and your waterfront properties. Could you please provide me with more information?" 
              className="text-neutral-700 font-semibold hover:underline hover:text-neutral-900"
            >
              +92 336 0878079
            </a>
          </p>
        </div>
      </div>
    </section>
  );

  if (onlyForm) {
    return <FormContent />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Column */}
          {image && (
            <div className="lg:col-span-1">
              <img
                src={image}
                alt="Property"
                className="w-full h-64 lg:h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Description Column */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {headline}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Discover exclusive waterfront properties in {residency}. Get instant access to:
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-1">
            <FormContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadGenerationForm;