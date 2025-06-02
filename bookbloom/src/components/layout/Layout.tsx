'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl' | '4xl';
  className?: string;
}

export default function Layout({ 
  children, 
  showSidebar = true, 
  maxWidth = '7xl',
  className = '' 
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Auto-close sidebar on mobile when resizing
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showSidebar, sidebarOpen]);

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const maxWidthClasses = {
    'full': 'max-w-full',
    '7xl': 'max-w-7xl',
    '6xl': 'max-w-6xl', 
    '5xl': 'max-w-5xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blossom-white via-sakura-light/30 to-sky-blue/20 ${className}`}>
      {/* Header */}
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMobileMenuOpen={sidebarOpen && isMobile}
      />
      
      {/* Main Layout Container */}
      <div className="relative flex min-h-[calc(100vh-4rem)]">
        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={handleOverlayClick}
          />
        )}

        {/* Sidebar */}
        {showSidebar && (
          <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="fixed top-16 left-0 bottom-0 w-64 xl:w-72 z-30">
                <Sidebar 
                  isOpen={true}
                  onClose={() => setSidebarOpen(false)}
                />
              </div>
            </div>
            
            {/* Mobile Sidebar */}
            <div className={`
              fixed top-16 left-0 bottom-0 z-40 lg:hidden
              transform transition-transform duration-300 ease-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <Sidebar 
                isOpen={true}
                onClose={() => setSidebarOpen(false)}
                className="h-full"
              />
            </div>
          </>
        )}
        
        {/* Main Content */}
        <main className={`
          flex-1 relative overflow-x-hidden
          transition-all duration-300 ease-out
          ${showSidebar ? 'lg:ml-64 xl:ml-72' : ''}
        `}>
          {/* Content Container */}
          <div className={`
            ${maxWidthClasses[maxWidth]} mx-auto
            px-4 sm:px-6 lg:px-8 py-6 lg:py-8
            min-h-full
          `}>
            {/* Content Wrapper with Japanese Minimalism */}
            <div className="space-y-6 lg:space-y-8">
              {children}
            </div>
          </div>

          {/* Scroll to Top Button */}
          <ScrollToTopButton />
        </main>
      </div>
    </div>
  );
}

// Scroll to Top Button Component
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-gradient-to-br from-sakura-main to-sakura-deep
        text-white shadow-[var(--shadow-bloom)]
        hover:scale-110 hover:shadow-xl
        transition-all duration-300 ease-out
        flex items-center justify-center
        group
      "
      aria-label="Scroll to top"
    >
      <svg 
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
      
      {/* Decorative petals */}
      <div className="absolute -top-1 -right-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        🌸
      </div>
    </button>
  );
}