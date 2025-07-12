import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const StickyWhatsAppButton: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !buttonRef.current || !iconRef.current) return;

    // Initial entrance animation
    gsap.fromTo(buttonRef.current, 
      { scale: 0.8, opacity: 0, y: 50 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        duration: 0.8, 
        ease: "back.out(1.7)",
        delay: 1
      }
    );

    // Subtle pulse effect on icon
    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 2.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

  }, [isClient]);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
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

    const message = "Hi! I'm interested in learning more about EMAAR & HMR waterfront properties. Could you please provide me with more information?";
    const whatsappUrl = `https://wa.me/923360878079?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMouseEnter = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: 15,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  if (!isClient) return null;

  return (
    <button
      ref={buttonRef}
      onClick={handleWhatsAppClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 bg-[#121212] hover:bg-black text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 will-change-transform z-[9999] flex items-center gap-3 font-medium hover:-translate-y-0.5"
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <div ref={iconRef} className="will-change-transform flex-shrink-0">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </div>
      <span className="text-sm font-medium whitespace-nowrap">
        WhatsApp
      </span>
    </button>
  );
};

export default StickyWhatsAppButton;