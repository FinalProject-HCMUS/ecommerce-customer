import { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { navbarLinks } from '../../data/navbar';
import { RootState } from '../../context/store';
import { useSelector } from 'react-redux';
import UserDropdown from './UserDropdown';
import LanguageSwitcher from './LanguageSwitcher';
import { t } from '../../helpers/i18n';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get authentication state from Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              {t('shopName')}
            </Link>

            <nav className="hidden md:flex ml-10 space-x-8">
              {navbarLinks.map((link) => {
                // Conditionally render links based on authentication
                if (link.authenticate && !isAuthenticated) {
                  return null; // Hide links that require authentication if not authenticated
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="nav-link font-medium"
                  >
                    {t('navbar.' + link.label)}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/* Conditionally show cart and user icons if authenticated */}
            {isAuthenticated ? (
              <>
                <Link to="/cart">
                  <button data-testid="cart-button" className="p-2 hover:text-gray-600 transition-colors">
                    <FiShoppingCart size={20} />
                  </button>
                </Link>

                <UserDropdown />
              </>
            ) : (
              // Show Login button if not authenticated
              <Link to="/login">
                <button className="p-2 hover:text-gray-600 transition-colors">
                  {t('login')}
                </button>
              </Link>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-black mb-1.5"></div>
              <div className="w-6 h-0.5 bg-black mb-1.5"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
             {navbarLinks.map((link) => {
                // Conditionally render links based on authentication
                if (link.authenticate && !isAuthenticated) {
                  return null; // Hide links that require authentication if not authenticated
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="font-medium"
                  >
                    {t('navbar.' + link.label)}
                  </Link>
                );
              })}
            </nav>

          
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
