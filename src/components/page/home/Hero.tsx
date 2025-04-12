import { heroData } from '../../../data/hero';

const Hero = () => {
  return (
    <section className="pt-32 pb-16 bg-white px-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{heroData.title}</h1>
            <p className="text-gray-600 mb-8 max-w-lg">{heroData.description}</p>
            <button className="btn-primary bg-black text-white px-8 py-3 rounded-full text-lg font-medium">
              {heroData.buttonText}
            </button>

            <div className="grid grid-cols-3 gap-8 mt-12">
              {heroData.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <img src={heroData.image} alt="Fashion models" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
