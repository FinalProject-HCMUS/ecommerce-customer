import { t } from '../../../../helpers/i18n';
import { register } from '../../../../locales/en/shopData.json';

const ShopInfo = () => {
  console.log(t('register.benefit'));
  return (
    <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold mb-8">{t('register.shopName')}</h1>
      <p className="text-lg max-w-md mb-6 text-justify">
        {t('register.description')}
      </p>
      <ul className="text-left max-w-md space-y-2">
        {register.benefit.map((item, index) => (
          <li key={index} className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
            <span className="text-lg max-w-md">
              {t(`register.benefit.${index}.value`)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopInfo;
