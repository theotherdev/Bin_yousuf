// src/components/Navigation.tsx - Updated with new WhatsApp message
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getProjectCounts } from '../data/projects.js';
import logoImage from '../assets/projects/logo.webp';

interface NavigationProps {
  currentPath: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projectCounts, setProjectCounts] = useState({ emaar: 5, hmr: 7 }); // Default values to prevent layout shift
  const [isClient, setIsClient] = useState(false);
  
  // WhatsApp button refs for GSAP
  const whatsappBtnRef = useRef<HTMLButtonElement>(null);
  const whatsappIconRef = useRef<HTMLDivElement>(null);
  const whatsappMobileBtnRef = useRef<HTMLButtonElement>(null);

  const isHomePage = currentPath === '/' || currentPath === '';
  const isProjectDetailPage = currentPath.startsWith('/projects/') && currentPath !== '/projects/';
  const isAboutPage = currentPath === '/about' || currentPath === '/about/';

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only update counts on client-side to prevent hydration mismatch
    if (isClient) {
      const counts = getProjectCounts();
      setProjectCounts(counts);
    }

    // Close menu on resize to desktop
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, isClient]);

  // GSAP WhatsApp button animations
  useEffect(() => {
    if (!isClient) return;

    // Desktop button animation
    if (whatsappBtnRef.current && whatsappIconRef.current) {
      // Initial entrance animation
      gsap.fromTo(whatsappBtnRef.current, 
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: "back.out(1.7)",
          delay: 0.8
        }
      );

      // Subtle pulse effect
      gsap.to(whatsappIconRef.current, {
        scale: 1.1,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Mobile button animation
    if (whatsappMobileBtnRef.current) {
      gsap.fromTo(whatsappMobileBtnRef.current, 
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: "back.out(1.7)",
          delay: 0.9
        }
      );
    }

  }, [isClient]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburgerBtn = document.getElementById('hamburgerBtn');

      if (isMenuOpen && mobileMenu && hamburgerBtn &&
          !mobileMenu.contains(target) && !hamburgerBtn.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = "Hi! I'm interested in learning more about EMAAR & HMR waterfront properties. Could you please provide me with more information?";
    const whatsappUrl = `https://wa.me/923360878079?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close mobile menu if open
    if (isMenuOpen) {
      closeMenu();
    }
  };

  // WhatsApp button hover animations
  const handleWhatsAppHover = () => {
    if (whatsappBtnRef.current && whatsappIconRef.current) {
      gsap.to(whatsappBtnRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(whatsappIconRef.current, {
        rotation: 15,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleWhatsAppLeave = () => {
    if (whatsappBtnRef.current && whatsappIconRef.current) {
      gsap.to(whatsappBtnRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(whatsappIconRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Click animation
    if (whatsappBtnRef.current) {
      gsap.to(whatsappBtnRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    const message = "Hi! I'm interested in learning more about EMAAR & HMR waterfront properties. Could you please provide me with more information?";
    const whatsappUrl = `https://wa.me/923360878079?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close mobile menu if open
    if (isMenuOpen) {
      closeMenu();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-[10px] z-[1000] border-b border-black/10 will-change-transform">
      <div className="flex justify-between items-center max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center gap-5">
          <a 
            href="/" 
            className="flex items-center gap-3 no-underline group"
          >
            {/* Logo Image with fixed dimensions to prevent layout shift */}
            <img 
              src={logoImage.src} 
              alt="BYG Logo" 
              className="h-8 w-auto transition-all duration-300 group-hover:brightness-110"
              width="24"
              height="24"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-[60px]">
          <a 
            href="/" 
            className={`text-sm font-normal transition-colors duration-300 hover:text-black whitespace-nowrap ${
              isHomePage ? 'text-black' : 'text-neutral-500'
            }`}
          >
            Projects
          </a>
          <a 
            href="/#project-1" 
            className="text-neutral-500 text-sm font-normal transition-colors duration-300 hover:text-black whitespace-nowrap"
          >
            Emaar
          </a>
          <a 
            href="/#project-6" 
            className="text-neutral-500 text-sm font-normal transition-colors duration-300 hover:text-black whitespace-nowrap"
          >
            HMR Waterfront
          </a>
        </div>

        <div className="hidden md:flex items-center gap-[30px]">
          <a 
            href="/about" 
            className={`text-sm font-normal transition-colors duration-300 hover:text-black whitespace-nowrap ${
              isAboutPage ? 'text-black' : 'text-neutral-500'
            }`}
          >
            About
          </a>
          <button 
            onClick={handleContactClick}
            className="text-neutral-500 text-sm font-normal transition-colors duration-300 hover:text-black bg-transparent border-none cursor-pointer font-inherit whitespace-nowrap"
          >
            Contact
          </button>
          
          {/* Compact WhatsApp Button */}
          <button
            ref={whatsappBtnRef}
            onClick={handleWhatsAppClick}
            onMouseEnter={handleWhatsAppHover}
            onMouseLeave={handleWhatsAppLeave}
            className="relative flex items-center justify-center bg-[#121212] hover:bg-black text-white w-9 h-9 rounded-full shadow-md hover:shadow-lg transition-all duration-300 will-change-transform group"
            aria-label="Contact us on WhatsApp"
            title="WhatsApp Us"
          >
            <div ref={whatsappIconRef} className="will-change-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Menu and WhatsApp */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile WhatsApp Button - Always Visible */}
          <button
            ref={whatsappMobileBtnRef}
            onClick={handleWhatsAppClick}
            className="bg-[#121212] hover:bg-black text-white p-2 rounded-full shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center"
            style={{ minWidth: '40px', minHeight: '40px' }}
            aria-label="Contact us on WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </button>

          {/* Hamburger Button */}
          <button
            id="hamburgerBtn"
            className={`bg-transparent border-none cursor-pointer p-2 flex flex-col gap-1 transition-all duration-300 ${
              isMenuOpen ? 'active' : ''
            }`}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
            style={{ minWidth: '40px', minHeight: '40px' }}
          >
            <span className={`w-5 h-0.5 bg-neutral-800 transition-all duration-300 rounded-[1px] ${
              isMenuOpen ? 'transform rotate-45 translate-x-[6px] translate-y-[6px]' : ''
            }`} />
            <span className={`w-5 h-0.5 bg-neutral-800 transition-all duration-300 rounded-[1px] ${
              isMenuOpen ? 'opacity-0' : ''
            }`} />
            <span className={`w-5 h-0.5 bg-neutral-800 transition-all duration-300 rounded-[1px] ${
              isMenuOpen ? 'transform -rotate-45 translate-x-[6px] -translate-y-[6px]' : ''
            }`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobileMenu"
        className={`fixed top-20 left-0 right-0 bg-white backdrop-blur-[20px] border-b border-black/10
          transform transition-all duration-300 ease-out -shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:hidden
          ${isMenuOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-full opacity-0 invisible'
          }`}
      >
        <div className="px-10 py-[30px] flex flex-col gap-5">
          <a
            href="/"
            className={`text-neutral-500 text-base font-medium transition-all duration-300 py-3 
              border-b border-black/5 flex justify-between items-center
              hover:text-black hover:translate-x-[5px] ${
              isHomePage ? 'text-black' : ''
            }`}
            onClick={closeMenu}
          >
            Projects
          </a>
          <a
            href="/#project-1"
            className="text-neutral-500 text-base font-medium transition-all duration-300 py-3 
              border-b border-black/5 flex justify-between items-center
              hover:text-black hover:translate-x-[5px]"
            onClick={closeMenu}
          >
            Emaar
            <span className="bg-neutral-600 text-white text-xs font-semibold px-2 py-1 rounded-xl min-w-[20px] text-center">
              {projectCounts.emaar}
            </span>
          </a>
          <a
            href="/#project-6"
            className="text-neutral-500 text-base font-medium transition-all duration-300 py-3 
              border-b border-black/5 flex justify-between items-center
              hover:text-black hover:translate-x-[5px]"
            onClick={closeMenu}
          >
            HMR Waterfront
            <span className="bg-neutral-600 text-white text-xs font-semibold px-2 py-1 rounded-xl min-w-[20px] text-center">
              {projectCounts.hmr}
            </span>
          </a>
          <a
            href="/about"
            className={`text-neutral-500 text-base font-medium transition-all duration-300 py-3 
              border-b border-black/5 flex justify-between items-center
              hover:text-black hover:translate-x-[5px] ${
              isAboutPage ? 'text-black' : ''
            }`}
            onClick={closeMenu}
          >
            About
          </a>
          <button
            onClick={handleContactClick}
            className="text-neutral-500 text-base font-medium transition-all duration-300 py-3 
              border-b border-black/5 flex justify-between items-center
              hover:text-black hover:translate-x-[5px] bg-transparent border-none cursor-pointer 
              text-left w-full font-inherit"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;