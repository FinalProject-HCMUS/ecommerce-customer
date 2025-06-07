import { Link } from 'react-router-dom';
import { tUpperCase, t } from '../../../helpers/i18n';
import image from '../../../assets/images/about/about.png';

const Featured = () => {
  return (
    <section className="py-16 bg-white px-8">
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         <div className="relative animate-fade-in flex items-center justify-center">
            <img
              src={image}
              alt="Fashion models"
              className="w-3/4 h-auto rounded-lg"
            />
          </div>

          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">
              {tUpperCase('about.title')}
            </h2>
            <p className="text-gray-700 mb-8 text-justify mr-8">
              {t('about.description')}
            </p>
            <Link
              to="/products"
              className="btn-primary bg-black text-white px-6 py-3 rounded-full font-medium"
            >
              {t('btn.seeCollection')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
