import { FiTwitter, FiInstagram, FiFacebook, FiGithub } from "react-icons/fi"

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8 px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">SHOP.CO</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              We have clothes that suits your style and which you're proud to wear. From summer to winter.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FiTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FiGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-sm uppercase">COMPANY</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Career
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-sm uppercase">HELP</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-sm uppercase">RESOURCES</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Free eBooks
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Development Tutorial
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  How to - Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  YouTube Playlist
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">Shop.co © 2000-2023, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

