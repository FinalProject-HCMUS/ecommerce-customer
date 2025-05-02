import { Link } from 'react-router-dom'
import shopData from '../../locales/en/shopData.json'
import { t } from '../../helpers/i18n'

const Footer = () => {
  const { footer } = shopData
  return (
    <footer className="bg-gray-100 pt-16 pb-8 px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">{t('footer.title')}</h2>
            <p className="text-gray-600 mb-6 max-w-md"></p>
            <div className="flex space-x-4 text-justify">{t('footer.description')}</div>
          </div>

          {footer.hyperlink.map((item, index) => (
            <div key={index}>
              <h3 className="font-bold mb-6 text-sm uppercase">{t(`footer.hyperlink.${index}.title`)}</h3>
              <ul className="space-y-4">
                {item.links.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link to={subItem.path} className="text-gray-600 hover:text-black transition-colors">
                      {t(`footer.hyperlink.${index}.links.${subIndex}.label`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
