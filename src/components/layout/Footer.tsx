import { Link } from 'react-router-dom'
import { footerData } from '../../data/footer'

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8 px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">{footerData.shopName}</h2>
            <p className="text-gray-600 mb-6 max-w-md"></p>
            <div className="flex space-x-4">{footerData.introductoryText}</div>
          </div>

          {footerData.data.map((item, index) => (
            <div key={index}>
              <h3 className="font-bold mb-6 text-sm uppercase">{item.title}</h3>
              <ul className="space-y-4">
                {item.links.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link to={subItem.path} className="text-gray-600 hover:text-black transition-colors">
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Repeat for HELP and RESOURCES */}
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
