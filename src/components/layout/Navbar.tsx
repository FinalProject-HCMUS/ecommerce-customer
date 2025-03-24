'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              SHOP.CO
            </Link>

            <nav className="hidden md:flex ml-10 space-x-8">
              <a href="/chat" className="nav-link font-medium">
                Chat
              </a>
              <a href="#" className="nav-link font-medium">
                Policy
              </a>
              <a href="#" className="nav-link font-medium">
                Blog
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <Link to="/cart">
            <button className="p-2 hover:text-gray-600 transition-colors">
              <FiShoppingCart size={20} />
            </button>
            </Link>

            <button className="p-2 hover:text-gray-600 transition-colors">
              <FiUser size={20} />
            </button>

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
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <nav className="flex flex-col space-y-4">
              <a href="#" className="font-medium">
                Chat
              </a>
              <a href="#" className="font-medium">
                Policy
              </a>
              <a href="#" className="font-medium">
                Blog
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
