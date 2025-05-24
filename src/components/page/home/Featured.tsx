import { Link } from 'react-router-dom';
import { tUpperCase, t } from '../../../helpers/i18n';
import image from '../../../assets/images/about/about.png';

const Featured = () => {
  return (
    <section className="py-16 bg-white px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex space-x-4">
            <img
              src={image}
              alt="Male model"
              className="w h-auto object-cover"
            />
          </div>

          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">
              {tUpperCase('about.title')}
            </h2>
            <p className="text-gray-700 mb-8 text-justify">
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
