import image from '../../../assets/image_template.png';
import { features } from '../../../data/features';
const Featured = () => {
  return (
    <section className="py-16 bg-white px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex space-x-4">
            <img src={image} alt="Male model" className="w h-auto object-cover" />
          </div>

          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">{features.shopName}</h2>
            <p className="text-gray-700 mb-8">{features.shopDescription}</p>
            <button className="btn-primary bg-black text-white px-6 py-3 rounded-full font-medium">
              {features.buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
