import image from '../../../assets/image_template.png'
const Hero = () => {
    return (
      <section className="pt-32 pb-16 bg-white px-8">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                A SENTENCE TO
                <br />
                WELCOME CUSTOMER
              </h1>
              <p className="text-gray-600 mb-8 max-w-lg">
                Some sentences to introduce about shop. Example: Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to your sense of style.
              </p>
              <button className="btn-primary bg-black text-white px-8 py-3 rounded-full text-lg font-medium">
                Shop Now
              </button>
  
              <div className="grid grid-cols-3 gap-8 mt-12">
                {["High-Quality Products", "Sustainable Materials", "Happy Customers"].map((item, index) => (
                  <div key={index} className="text-center">
                    <h3 className="font-semibold mb-2">{item.split(" ")[0]}</h3>
                    <p className="text-sm text-gray-500">Some characteristics about shop</p>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="relative animate-fade-in">
              <img
                src={image}
                alt="Fashion models"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default Hero