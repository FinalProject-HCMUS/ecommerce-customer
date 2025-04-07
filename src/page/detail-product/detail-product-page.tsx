import type React from 'react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import ProductGallery from '../../components/page/detail/ProductGallery';
import ProductInfo from '../../components/page/detail/ProductInfo';
import VirtualTryOn from '../../components/page/detail/VirtualTryOn';
import ProductDescription from '../../components/page/detail/ProductDescription';
import ReviewSection from '../../components/page/detail/ReviewSection';
import RelatedProducts from '../../components/page/detail/RelatedProducts';
import KEY_FLAG from '../../constants/flagsup';
import useFlagFeature from '../../hooks/useFlagFeature';

const App: React.FC = () => {
  const isVirtualTryOnEnable = useFlagFeature(KEY_FLAG.VIRTUAL_TRY_ON);
  const isRatingEnable = useFlagFeature(KEY_FLAG.RATING);

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

      {isVirtualTryOnEnable && <VirtualTryOn />}
      <ProductDescription />
      {isRatingEnable && <ReviewSection />}
      <RelatedProducts />
    </div>
  );
};

export default App;
