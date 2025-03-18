import type React from "react"
import Breadcrumb from "../../components/shared/Breadcrumb"
import ProductGallery from "../../components/page/detailpage/ProductGallery"
import ProductInfo from "../../components/page/detailpage/ProductInfo"
import VirtualTryOn from "../../components/page/detailpage/VirtualTryOn"
import ProductDescription from "../../components/page/detailpage/ProductDescription"
import ReviewSection from "../../components/page/detailpage/ReviewSection"
import RelatedProducts from "../../components/page/detailpage/RelatedProducts"

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

