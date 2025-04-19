import { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { navbarSearchPlaceholder, shopName } from '../../data/navbar';
import { navbarLinks } from '../../data/navbar';
import { RootState } from '../../context/store';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get authentication state from Redux
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              {shopName}
            </Link>

            <nav className="hidden md:flex ml-10 space-x-8">
              {navbarLinks.map((link) => {
                // Conditionally render links based on authentication
                if (link.authenticate && !isAuthenticated) {
                  return null; // Hide links that require authentication if not authenticated
                }
                return (
                  <Link key={link.path} to={link.path} className="nav-link font-medium">
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder={navbarSearchPlaceholder}
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Conditionally show cart and user icons if authenticated */}
            {isAuthenticated ? (
              <>
                <Link to="/cart">
                  <button className="p-2 hover:text-gray-600 transition-colors">
                    <FiShoppingCart size={20} />
                  </button>
                </Link>

                <Link to="/profile">
                  <button className="p-2 hover:text-gray-600 transition-colors">
                    <FiUser size={20} />
                  </button>
                </Link>
              </>
            ) : (
              // Show Login button if not authenticated
              <Link to="/login">
                <button className="p-2 hover:text-gray-600 transition-colors">Login</button>
              </Link>
            )}

            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                  <Link key={link.path} to={link.path} className="font-medium">
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Conditionally show cart and user icons or login button */}
            <div className="mt-4 flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="flex items-center space-x-2">
                    <FiShoppingCart size={20} />
                    <span>Cart</span>
                  </Link>
                  <Link to="/profile" className="flex items-center space-x-2">
                    <FiUser size={20} />
                    <span>Profile</span>
                  </Link>
                </>
              ) : (
                <Link to="/login" className="flex items-center space-x-2">
                  <button className="p-2 hover:text-gray-600 transition-colors">Login</button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
