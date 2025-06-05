// src/components/ContactForm.tsx
import React, { useState, useEffect } from 'react';

interface ContactFormProps {
  projectName: string;
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
  project?: string;
  information?: string;
  howHeard?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ projectName }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    beds: '',
    project: projectName,
    information: [],
    howHeard: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const projects = {
    Emaar: [
      'Panorama',
      'The Views',
      'Park Edge',
      'Coral Towers',
      'Pearl & Reef Towers'
    ],
    HMR: [
      'AA Waterfront',
      'Gold Crest Residence',
      'H&S Residence',
      'H1 Tower',
      'Saima Marina',
      'Saima Waterfront',
      'Beach Terraces By Metro'
    ]
  };

  const informationOptions = [
    'Pricing & Payment Plans',
    'Floor Plans & Unit Details',
    'Property Features & Amenities',
    'Location & Accessibility',
    'Investment Opportunities',
    'Construction Timeline',
    'Site Visit Booking',
    'Legal Documentation'
  ];

  const howHeardOptions = [
    'Google Search',
    'Social Media (Facebook/Instagram)',
    'Friend/Family Referral',
    'Property Portal (Zameen/OLX)',
    'Billboard/Outdoor Advertising',
    'Newspaper/Magazine',
    'Radio',
    'Other'
  ];

  const bedsOptions = ['Studio', '1BR', '2BR', '3BR', '4BR+', 'Not decided'];

  // Set project name on mount
  useEffect(() => {
    setFormData(prev => ({ ...prev, project: projectName }));
  }, [projectName]);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.beds) {
      newErrors.beds = 'Please select number of beds';
    }

    if (!formData.project) {
      newErrors.project = 'Please select a project';
    }

    if (formData.information.length === 0) {
      newErrors.information = 'Please select at least one information type';
    }

    if (!formData.howHeard) {
      newErrors.howHeard = 'Please select how you heard about us';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
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
    
    // Clear error for information field
    if (errors.information) {
      setErrors(prev => ({ ...prev, information: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare form data for Google Forms
      const formBody = new URLSearchParams({
        'entry.1195041335': formData.name,
        'entry.79234155': formData.email,
        'entry.1708096009': formData.phone,
        'entry.2092815482': formData.beds,
        'entry.1777513188': formData.project,
        'entry.1168048118': formData.information.join(', '),
        'entry.388465524': formData.howHeard,
        'entry.2089179122': formData.message || 'No additional message'
      });

      // Submit to Google Forms
      // IMPORTANT: The target Google Form (1FAIpQLSeXbvhQpRj0GU9OqbL5_MQ8jRRj2yukrHX8e2bFvPOoXrzjmw)
      // must be configured to accept responses and its entry IDs must match the ones used here.
      const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSeXbvhQpRj0GU9OqbL5_MQ8jRRj2yukrHX8e2bFvPOoXrzjmw/formResponse', {
        method: 'POST',
        mode: 'no-cors', // Google Forms typically requires no-cors for cross-origin submissions like this
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString()
      });

      // Since Google Forms returns opaque (no-cors) response, we can't check response.ok.
      // We assume success if the fetch doesn't throw an error.
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          beds: '',
          project: projectName, // Reset to initial project name
          information: [],
          howHeard: '',
          message: ''
        });
        setSubmitStatus('idle'); // Reset status for next submission
      }, 5000); // Display success message for 5 seconds

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
       // Optionally, reset error status after a few seconds
       setTimeout(() => {
        setSubmitStatus('idle');
      }, 7000); // Display error message for 7 seconds
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-gray-50 to-white font-inter"> {/* Added font-inter */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight font-poppins">
            Interested in {projectName}?
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto font-poppins">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Form Card Container */}
        <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Personal Information Section */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-6">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white rounded-lg border ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-poppins`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 error-message font-poppins">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white rounded-lg border ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-poppins`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 error-message font-poppins">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white rounded-lg border ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-poppins`}
                      placeholder="+92 300 1234567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 error-message font-poppins">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Preferences Section */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-6">Property Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Number of Beds */}
                  <div>
                    <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                      Number of Beds <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="beds"
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white rounded-lg border ${
                        errors.beds ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-poppins appearance-none cursor-pointer`}
                    >
                      <option value="">Select number of beds</option>
                      {bedsOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.beds && (
                      <p className="mt-1 text-sm text-red-500 error-message font-poppins">{errors.beds}</p>
                    )}
                  </div>

                  {/* Project of Interest */}
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                      Project of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white rounded-lg border ${
                        errors.project ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-poppins appearance-none cursor-pointer`}
                    >
                      {/* <option value="">Select a project</option>  // Can be uncommented if no default selection is preferred */}
                      <optgroup label="Emaar">
                        {projects.Emaar.map(project => (
                          <option key={project} value={project}>{project}</option>
                        ))}
                      </optgroup>
                      <optgroup label="HMR">
                        {projects.HMR.map(project => (
                          <option key={project} value={project}>{project}</option>
                        ))}
                      </optgroup>
                      <option value="Multiple projects">Multiple projects</option>
                      <option value="Not sure">Not sure</option>
                    </select>
                    {errors.project && (
                      <p className="mt-1 text-sm text-red-500 error-message font-poppins">{errors.project}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Information Needed Section */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 font-poppins mb-6">
                  What information do you need? <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {informationOptions.map(option => (
                    <label key={option} className="flex items-start space-x-3 cursor-pointer hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200">
                      <input
                        type="checkbox"
                        checked={formData.information.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="w-5 h-5 mt-0.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition-colors duration-200 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 font-poppins select-none leading-tight">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.information && (
                  <p className="text-sm text-red-500 error-message font-poppins mt-2">{errors.information}</p>
                )}
              </div>

              {/* Additional Fields */}
              <div className="space-y-6"> {/* This div wraps the "howHeard" and "message" fields */}
                {/* How Did You Hear About Us */}
                <div>
                  <label htmlFor="howHeard" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                    How did you hear about us? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="howHeard"
                    name="howHeard"
                    value={formData.howHeard}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white rounded-lg border ${
                      errors.howHeard ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-poppins appearance-none cursor-pointer`}
                  >
                    <option value="">Select an option</option>
                    {howHeardOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.howHeard && (
                    <p className="mt-1 text-sm text-red-500 error-message font-poppins">{errors.howHeard}</p>
                  )}
                </div>

                {/* Additional Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-poppins resize-none"
                    placeholder="Tell us more about your requirements..."
                  />
                </div>
              </div>

              {/* Submit Button & Messages Section */}
              <div className="flex flex-col items-center space-y-4 pt-4">
                {/* MODIFIED Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'
                  } font-poppins`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Inquiry'
                  )}
                </button>

                {/* MODIFIED Success Message */}
                {submitStatus === 'success' && (
                  <div className="w-full md:w-auto p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in-up">
                    <p className="text-green-800 text-center font-poppins">
                      <span className="font-semibold">Thank you!</span> Your inquiry has been submitted successfully. We'll contact you soon.
                    </p>
                  </div>
                )}

                {/* MODIFIED Error Message */}
                {submitStatus === 'error' && (
                  <div className="w-full md:w-auto p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in-up">
                    <p className="text-red-800 text-center font-poppins">
                      <span className="font-semibold">Oops!</span> Something went wrong. Please try again or contact us directly.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* MODIFIED Contact Information Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 font-poppins">
            Prefer to talk? Call us at{' '}
            <a href="tel:+923360878079" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              +92 336 0878079
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

// Main App component to render the ContactForm
// This is for demonstration purposes if you want to run this file directly.
// In a real Next.js or Create React App, you'd import ContactForm into a page.
const App = () => {
  // You can dynamically set the projectName or pass a static one.
  // Example: Fetch from URL params, or based on the page.
  const exampleProjectName = "Panorama Residences"; 

  return (
    <>
      {/* Include Tailwind CSS. In a real project, this is usually in your global CSS or layout file. */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Add Poppins font from Google Fonts. In a real project, do this in your HTML head or global CSS. */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        /* Basic animation for fade-in */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
      <ContactForm projectName={exampleProjectName} />
    </>
  );
};


export default App; // Exporting App for direct rendering. In your project, you'll export ContactForm.
// To use ContactForm in your project: export default ContactForm;
