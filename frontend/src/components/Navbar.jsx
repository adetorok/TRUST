import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import RoleSelectionModal from './RoleSelectionModal';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleRequestProposalClick = (e) => {
    e.preventDefault();
    setShowRoleModal(true);
  };

  const handleRoleSelect = (role) => {
    setShowRoleModal(false);
    // Navigate to home page and scroll to form
    window.location.href = '/#contact-form-section';
  };

  // Helper function to check if a path is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    return location.pathname === path;
  };

  // Helper function to get button styles based on active state
  const getButtonStyles = (path, isPrimary = false) => {
    const baseStyles = "px-4 py-2 rounded-md text-sm font-bold transition";
    
    if (isActive(path)) {
      return isPrimary 
        ? `${baseStyles} bg-[#10224E] text-[#E8EEFC]` 
        : `${baseStyles} bg-[#56F0C8] text-[#0B1220] border-2 border-[#56F0C8]`;
    }
    
    return isPrimary
      ? `${baseStyles} bg-[#16B1F0] text-white hover:bg-[#10224E]`
      : `${baseStyles} bg-white text-[#10224E] border border-[#10224E] hover:bg-[#56F0C8] hover:text-[#0B1220]`;
  };

  return (
    <>
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onRoleSelect={handleRoleSelect}
      />
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50" role="banner">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-xl font-bold text-[#56F0C8] focus:outline-none focus:ring-2 focus:ring-[#56F0C8] focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="TRUST - Go to homepage"
            >
              TRUST
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2" role="menubar">
              <Link 
                to="/" 
                className={`${getButtonStyles('/')} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
                role="menuitem"
                aria-label="Go to Home page"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`${getButtonStyles('/about')} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
                role="menuitem"
                aria-label="Go to About Us page"
              >
                About Us
              </Link>
              <Link 
                to="/sponsor" 
                className={`${getButtonStyles('/sponsor')} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
                role="menuitem"
                aria-label="Go to Sponsor / CRO page"
              >
                Sponsor / CRO
              </Link>
              <Link 
                to="/site" 
                className={`${getButtonStyles('/site')} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
                role="menuitem"
                aria-label="Go to Sites / Vendors page"
              >
                Sites / Vendors
              </Link>
              <button
                onClick={handleRequestProposalClick}
                className={`${getButtonStyles('/#contact', true)} focus:outline-none focus:ring-2 focus:ring-[#56F0C8] focus:ring-offset-2`}
                role="menuitem"
                aria-label="Request a proposal"
              >
                Request Proposal
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu" role="menu" aria-label="Mobile navigation">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-[#56F0C8] text-[#0B1220]' : 'text-slate-600 hover:text-slate-900'} focus:outline-none focus:ring-2 focus:ring-[#56F0C8] focus:ring-offset-2`}
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
              aria-label="Go to Home page"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'bg-[#56F0C8] text-[#0B1220]' : 'text-slate-600 hover:text-slate-900'} focus:outline-none focus:ring-2 focus:ring-[#56F0C8] focus:ring-offset-2`}
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
              aria-label="Go to About Us page"
            >
              About Us
            </Link>
            <Link 
              to="/sponsor" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/sponsor') ? 'bg-[#56F0C8] text-[#0B1220]' : 'text-slate-600 hover:text-slate-900'} focus:outline-none focus:ring-2 focus:ring-[#56F0C8] focus:ring-offset-2`}
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
              aria-label="Go to Sponsor / CRO page"
            >
              Sponsor / CRO
            </Link>
            <Link 
              to="/site" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/site') ? 'bg-[#56F0C8] text-[#0B1220]' : 'text-slate-600 hover:text-slate-900'} focus:outline-none focus:ring-2 focus:ring-[#56F0C8] focus:ring-offset-2`}
              onClick={() => setIsMobileMenuOpen(false)}
              role="menuitem"
              aria-label="Go to Sites / Vendors page"
            >
              Sites / Vendors
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                handleRequestProposalClick(e);
              }}
              className="block px-3 py-2 rounded-md text-base font-medium bg-[#16B1F0] text-white hover:bg-[#10224E] focus:outline-none focus:ring-2 focus:ring-[#56F0C8] focus:ring-offset-2"
              role="menuitem"
              aria-label="Request a proposal"
            >
              Request Proposal
            </button>
          </div>
        </div>
      )}
    </header>
    </>
  );
};

export default Navbar;
