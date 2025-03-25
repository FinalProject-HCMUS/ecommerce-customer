import { footerData } from '../../data/footer';

<footer className="bg-gray-100 pt-16 pb-8 px-8">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">SHOP.CO</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          We have clothes that suits your style and which you're proud to wear. From summer to winter.
        </p>
        <div className="flex space-x-4">
          {footerData.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.path}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              {React.createElement(require('react-icons/fi')[link.icon], { className: 'w-4 h-4' })}
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-6 text-sm uppercase">COMPANY</h3>
        <ul className="space-y-4">
          {footerData.company.map((item, index) => (
            <li key={index}>
              <a href={item.path} className="text-gray-600 hover:text-black transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Repeat for HELP and RESOURCES */}
    </div>

    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-600 text-sm mb-4 md:mb-0">{footerData.copyright}</p>
    </div>
  </div>
</footer>;