import { brands } from '../../../data/brands';
const Brands = () => {
  return (
    <div className="bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="brand-logo text-white text-xl md:text-2xl font-bold py-2 px-4"
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
