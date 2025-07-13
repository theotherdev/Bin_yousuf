// src/components/Footer.tsx
import React from 'react';
import { projects, getProjectCounts } from '../data/projects';
import logoImage from '../assets/projects/logo.webp';

const Footer: React.FC = () => {
  const projectCounts = getProjectCounts();
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Footer Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
      
      <footer className="relative w-full py-16" style={{backgroundColor: '#F2F2EC'}}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,0,0,0.05) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(0,0,0,0.05) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="relative mx-auto w-full max-w-7xl px-8">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Company Logo and Map */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <img 
                  src={logoImage.src} 
                  alt="BinYousuf Group Logo" 
                  className="h-16 w-auto mb-6"
                  style={{filter: 'brightness(0.2)'}}
                />
                
                {/* Google Maps Iframe - Full Interactive Map */}
                <div className="relative rounded-lg overflow-hidden h-48 w-full shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14460.816326988188!2d67.29673298089614!3d25.027147338248188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb34ba7aedde237%3A0xef200ee78d0e7246!2sMidway%20Commercial-B%2C%20Bahria%20Town%20Karachi!5e0!3m2!1sen!2s!4v1752291903438!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BinYousuf Group Office Location - Midway Commercial-B, Bahria Town Karachi"
                    className="w-full h-full"
                  ></iframe>
                  
                  {/* View Larger Map Overlay Link */}
                  <div className="absolute top-2 left-2">
                    <a 
                      href="https://maps.app.goo.gl/MwwtfoP37kS9s5EW6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs bg-white px-2 py-1 rounded shadow text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                      View larger map
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Pages Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wider">
                PAGES
              </h3>
              <nav className="space-y-4">
                <a 
                  href="/projects/panorama" 
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  Panorama
                </a>
                <a 
                  href="/projects/aa-waterfront" 
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  AA Waterfront
                </a>
                <a 
                  href="/projects/the-views" 
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  The Views
                </a>
                <a 
                  href="/projects/coral" 
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  Coral
                </a>
                <a 
                  href="/projects/pear-reef-towers" 
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  Pear Reef Towers
                </a>
              </nav>
            </div>

            {/* Follow Us Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wider">
                FOLLOW US
              </h3>
              <nav className="space-y-4">
                <a 
                  href="https://www.linkedin.com/company/binyousuf-group" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://www.instagram.com/binyousuf.group" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  Instagram
                </a>
                <a 
                  href="https://www.facebook.com/binyousufgroup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  Facebook
                </a>
                <a 
                  href="https://www.youtube.com/@binyousufgroup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  YouTube
                </a>
                <a 
                  href="mailto:info@binyousufgroup.com"
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  info@binyousufgroup.com
                </a>
              </nav>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 uppercase tracking-wider">
                LEGAL
              </h3>
              <nav className="space-y-4">
                <a 
                  href="/privacy-policy" 
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/terms-conditions" 
                  className="block text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  Terms & Conditions
                </a>
              </nav>
            </div>
          </div>

          {/* Bottom Section with Social Icons */}
          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col items-center gap-6">
              
              {/* Copyright */}
              <div className="text-sm text-gray-600 text-center">
                © {currentYear} Bin Yousuf Group™ with{' '}
                <span className="text-red-600">❤</span> from{' '}
                <a 
                  href="https://otherdev.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300 underline hover:no-underline"
                >
                  The Other Dev
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4">
                
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/binyousufgroup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 p-2 rounded hover:bg-blue-100 hover:scale-110 transform"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/binyousuf.group" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition-all duration-300 p-2 rounded hover:bg-pink-100 hover:scale-110 transform"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.004 2.163c2.672 0 2.988.01 4.041.058 1.088.049 1.681.228 2.075.379a3.468 3.468 0 011.254.816 3.468 3.468 0 01.816 1.254c.151.394.33.987.379 2.075.048 1.053.058 1.369.058 4.041s-.01 2.988-.058 4.041c-.049 1.088-.228 1.681-.379 2.075a3.468 3.468 0 01-.816 1.254 3.468 3.468 0 01-1.254.816c-.394.151-.987.33-2.075.379-1.053.048-1.369.058-4.041.058s-2.988-.01-4.041-.058c-1.088-.049-1.681-.228-2.075-.379a3.468 3.468 0 01-1.254-.816 3.468 3.468 0 01-.816-1.254c-.151-.394-.33-.987-.379-2.075-.048-1.053-.058-1.369-.058-4.041s.01-2.988.058-4.041c.049-1.088.228-1.681.379-2.075a3.468 3.468 0 01.816-1.254 3.468 3.468 0 011.254-.816c.394-.151.987-.33 2.075-.379 1.053-.048 1.369-.058 4.041-.058zm0-2.163C9.232 0 8.893.014 7.825.063 6.764.112 6.017.294 5.364.556a5.631 5.631 0 00-2.034 1.324A5.631 5.631 0 001.996 3.914c-.262.653-.444 1.4-.493 2.461C1.454 7.443 1.44 7.782 1.44 10.554s.014 3.111.063 4.179c.049 1.061.231 1.808.493 2.461a5.631 5.631 0 001.324 2.034 5.631 5.631 0 002.034 1.324c.653.262 1.4.444 2.461.493 1.068.049 1.407.063 4.179.063s3.111-.014 4.179-.063c1.061-.049 1.808-.231 2.461-.493a5.631 5.631 0 002.034-1.324 5.631 5.631 0 001.324-2.034c.262-.653.444-1.4.493-2.461.049-1.068.063-1.407.063-4.179s-.014-3.111-.063-4.179c-.049-1.061-.231-1.808-.493-2.461a5.631 5.631 0 00-1.324-2.034A5.631 5.631 0 0016.486.556c-.653-.262-1.4-.444-2.461-.493C15.957.014 15.618 0 12.846 0H12.004zm0 5.838a4.716 4.716 0 100 9.432 4.716 4.716 0 000-9.432zm0 7.784a3.068 3.068 0 110-6.136 3.068 3.068 0 010 6.136zm6.013-7.97a1.102 1.102 0 11-2.204 0 1.102 1.102 0 012.204 0z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/binyousuf-group" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 p-2 rounded hover:bg-blue-100 hover:scale-110 transform"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://www.youtube.com/@binyousufgroup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 transition-all duration-300 p-2 rounded hover:bg-red-100 hover:scale-110 transform"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;