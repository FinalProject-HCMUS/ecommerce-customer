import React, { useState } from 'react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import ProductGallery from '../../components/page/detail/ProductGallery';
import ProductInfo from '../../components/page/detail/ProductInfo';
import VirtualTryOn from '../../components/page/detail/VirtualTryOn';
import ProductDescription from '../../components/page/detail/ProductDescription';
import ReviewSection from '../../components/page/detail/ReviewSection';
import { t } from '../../helpers/i18n';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/products';
import { useProductImages } from '../../hooks/product-images';
import { useProductColorSize } from '../../hooks/product-color-size';
import { useColors } from '../../hooks/color';
import { useSizes } from '../../hooks/size';
import Loading from '../../components/shared/Loading';
import { useEffect } from 'react';
import {
  ProductResponse,
  ProductImageResponse,
  ColorResponse,
  ProductColorSizeResponse,
  SizeResponse,
} from '../../interfaces';

const App: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const { fetchProductById, loading: productLoading } = useProducts();
  const { loading: imagesLoading, fetchProductImages } = useProductImages();
  const { loading: productColorSizeLoading, fetchProductColorSizes } =
    useProductColorSize();
  const { loading: colorLoading, fetchAllColors } = useColors();
  const { loading: sizeLoading, fetchAllSizes } = useSizes();

  const [product, setProduct] = useState<ProductResponse>();
  const [images, setImages] = useState<ProductImageResponse[]>([]);
  const [productColorSize, setProductColorSize] = useState<
    ProductColorSizeResponse[]
  >([]);
  const [colors, setColors] = useState<ColorResponse[]>([]);
  const [sizes, setSizes] = useState<SizeResponse[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        const productData = await fetchProductById(id);
        const imagesData = await fetchProductImages(id);
        const colorRes = await fetchAllColors();
        const productColorSizeData = await fetchProductColorSizes(id);
        const sizeRes = await fetchAllSizes();

        if (sizeRes && productColorSizeData) {
          const sizeIds = productColorSizeData.map((item) => item.sizeId);
          const filteredSizes = sizeRes.content.filter((size) =>
            sizeIds.includes(size.id)
          );
          setSizes(filteredSizes);
        }

        if (colorRes && productColorSizeData) {
          const colorIds = productColorSizeData.map((item) => item.colorId);
          const filteredColors = colorRes.content.filter((color) =>
            colorIds.includes(color.id)
          );
          setColors(filteredColors);
        }

        if (productColorSizeData) {
          setProductColorSize(productColorSizeData);
        }

        if (productData) {
          setProduct(productData);
        }
        if (imagesData) {
          setImages(imagesData);
        }
      }
    };
    fetchProductDetails();
  }, [id]);

  if (
    productLoading ||
    imagesLoading ||
    productColorSizeLoading ||
    colorLoading ||
    sizeLoading
  ) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mt-10 px-4 py-8 font-sans">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.detailProduct'), path: '/product' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {images && <ProductGallery images={images} />}
        {product && (
          <ProductInfo
            product={product}
            colors={colors}
            productColorSize={productColorSize}
            sizes={sizes}
          />
        )}
      </div>

      <VirtualTryOn />
      {product?.description && (
        <ProductDescription description={product.description} />
      )}
      <ReviewSection />
    </div>
  );
};

export default App;
