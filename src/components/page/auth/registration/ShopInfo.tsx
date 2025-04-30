import { shopInfo } from '../../../../data/shopInfo'

const ShopInfo = () => {
  return (
    <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold mb-8">{shopInfo.name}</h1>
      <p className="text-lg max-w-md mb-6">{shopInfo.description}</p>
      <ul className="text-left max-w-md space-y-2">
        {shopInfo.benefits.map((benefit, index) => (
          <li key={index} className="text-gray-700">
            • {benefit}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShopInfo
