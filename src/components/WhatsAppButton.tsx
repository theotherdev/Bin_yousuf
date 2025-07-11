// src/components/WhatsAppButton.tsx - Updated with new WhatsApp message
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  message = "Hi! I'm interested in learning more about EMAAR & HMR waterfront properties. Could you please provide me with more information?",
  phoneNumber = "923360878079",
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  // GSAP Timeline for entrance animation
  useEffect(() => {
    if (!buttonRef.current) return;

    const tl = gsap.timeline({ delay: 1 });
    
    // Set initial states
    gsap.set(buttonRef.current, { 
      x: 100, 
      opacity: 0,
      scale: 0.8
    });
    
    gsap.set(badgeRef.current, { 
      scale: 0, 
      opacity: 0 
    });

    gsap.set(pulseRef.current, { 
      scale: 1, 
      opacity: 0 
    });

    // Entrance animation
    tl.to(buttonRef.current, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(badgeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .to(pulseRef.current, {
      opacity: 0.2,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2");

    // Continuous pulse animation
    gsap.to(pulseRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 2,
      ease: "power2.out",
      repeat: -1,
      repeatDelay: 1
    });

    return () => {
      tl.kill();
    };
  }, []);

  // GSAP Hover animations
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (buttonRef.current && iconRef.current && textRef.current && tooltipRef.current) {
      // Button hover animation
      gsap.to(buttonRef.current, {
        scale: 1.1,
        y: -4,
        duration: 0.4,
        ease: "power2.out"
      });

      // Icon rotation and scale
      gsap.to(iconRef.current, {
        rotation: 12,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Text expand animation
      gsap.to(textRef.current, {
        opacity: 1,
        maxWidth: "120px",
        marginLeft: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Shimmer effect
      if (shimmerRef.current) {
        gsap.fromTo(shimmerRef.current, 
          { x: "-100%" },
          { 
            x: "100%", 
            duration: 1,
            ease: "power2.inOut"
          }
        );
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (buttonRef.current && iconRef.current && textRef.current) {
      // Button return animation
      gsap.to(buttonRef.current, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Icon return animation
      gsap.to(iconRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Text collapse animation
      gsap.to(textRef.current, {
        opacity: 0,
        maxWidth: "0px",
        marginLeft: "-12px",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleWhatsAppClick = () => {
    // Click animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`fixed top-24 right-6 z-[999] ${className}`}>
      {/* Main WhatsApp Button */}
      <button
        ref={buttonRef}
        onClick={handleWhatsAppClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden bg-[#121212] hover:bg-black text-white shadow-lg will-change-transform"
        style={{
          borderRadius: '25px',
          padding: '12px 20px',
          minWidth: '60px',
          height: '50px'
        }}
        aria-label="Contact us on WhatsApp"
      >
        {/* Background Shimmer Effect */}
        <div 
          ref={shimmerRef}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12" 
        />
        
        {/* Button Content */}
        <div className="relative flex items-center gap-3">
          {/* WhatsApp Icon */}
          <div ref={iconRef} className="will-change-transform">
            <svg 
              className="w-6 h-6" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </div>
          
          {/* Text (appears on hover) */}
          <span 
            ref={textRef}
            className="whitespace-nowrap font-medium text-sm overflow-hidden will-change-transform"
            style={{ opacity: 0, maxWidth: '0px', marginLeft: '-12px' }}
          >
            Chat with us
          </span>
        </div>

        {/* Pulse Animation Ring */}
        <div 
          ref={pulseRef}
          className="absolute inset-0 rounded-full border-2 border-green-400 will-change-transform" 
        />
      </button>

      {/* Notification Badge */}
      <div 
        ref={badgeRef}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center will-change-transform"
      >
        1
      </div>

      {/* Floating Tooltip */}
      <div 
        ref={tooltipRef}
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm whitespace-nowrap pointer-events-none opacity-0"
      >
        Quick WhatsApp Support
        {/* Arrow */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-black/80" />
      </div>
    </div>
  );
};

export default WhatsAppButton;