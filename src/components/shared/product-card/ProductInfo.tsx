interface ProductInfoProps {
    name: string
    description: string
    price: string
  }
  
  export default function ProductInfo({ name }: ProductInfoProps) {
    return (
      <>
        <h3 className="text-md font-semibold text-gray-800 mb-2">{name}</h3>
      </>
    )
  }
  
  