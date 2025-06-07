import { tUpperCase, t } from '../../../helpers/i18n';
import shopData from '../../../locales/en/shopData.json';
import image from '../../../assets/images/hero/hero.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { hero } = shopData;

  return (
    <section className="pt-32 pb-16 bg-white px-8 flex justify-between items-center ">
      <div className="px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-fade-in mt-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {tUpperCase('hero.title')}
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg text-justify">
              {t('hero.description')}
            </p>
            <Link
              to="/products"
              className="btn-primary bg-black text-white px-8 py-3 rounded-full text-lg font-medium"
            >
              {t('btn.shopNow')}
            </Link>

            <div className="mt-12 space-y-10">
              {/* Chunk characteristics into rows of 3 and display each row */}
              {Array.from(
                { length: Math.ceil(hero.characteristics.length / 3) },
                (_, rowIndex) => {
                  const startIndex = rowIndex * 3;

                  return (
                    <div
                      key={`row-${rowIndex}`}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                      {hero.characteristics
                        .slice(startIndex, startIndex + 3)
                        .map((_, itemIndex) => {
                          const actualIndex = startIndex + itemIndex;

                          return (
                            <div key={actualIndex} className="text-center">
                              <h3 className="font-semibold mb-2">
                                {t(`hero.characteristics.${actualIndex}.title`)}
                              </h3>
                              <p className="text-sm text-gray-500 text-justify">
                                {t(
                                  `hero.characteristics.${actualIndex}.description`
                                )}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div className="relative animate-fade-in flex items-center justify-center">
            <img
              src={image}
              alt="Fashion models"
              className="w-3/4 h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
