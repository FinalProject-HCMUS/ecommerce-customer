import type React from "react"
import Breadcrumb from "../../components/shared/Breadcrumb"
import ProductGallery from "../../components/page/detail/ProductGallery"
import ProductInfo from "../../components/page/detail/ProductInfo"
import VirtualTryOn from "../../components/page/detail/VirtualTryOn"
import ProductDescription from "../../components/page/detail/ProductDescription"
import ReviewSection from "../../components/page/detail/ReviewSection"
import RelatedProducts from "../../components/page/detail/RelatedProducts"

const App: React.FC = () => {
  return (
    <div className="max-w-7xl mt-10 px-4 py-8 font-sans">
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Product', path: '/product' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery />
        <ProductInfo />
      </div>

      <VirtualTryOn />
      <ProductDescription />
      <ReviewSection />
      <RelatedProducts />
    </div>
  )
}

export default App

