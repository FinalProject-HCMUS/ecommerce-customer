import React, { useState } from 'react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import ProductGallery from '../../components/page/detail/ProductGallery';
import ProductInfo from '../../components/page/detail/ProductInfo';
import ProductDescription from '../../components/page/detail/ProductDescription';
import { t } from '../../helpers/i18n';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/products';
import { useProductImages } from '../../hooks/product-images';
import { useProductColorSize } from '../../hooks/product-color-size';
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
  const [colors, setColors] = useState<ColorResponse[]>([]);
  const [sizes, setSizes] = useState<SizeResponse[]>([]);
  const [product, setProduct] = useState<ProductResponse>();
  const [images, setImages] = useState<ProductImageResponse[]>([]);
  const [productColorSize, setProductColorSize] = useState<
    ProductColorSizeResponse[]
  >([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      const productData = await fetchProductById(id);
      const imagesData = await fetchProductImages(id);
      const productColorSizeData = await fetchProductColorSizes(id);

      if (productColorSizeData) {
        setProductColorSize(productColorSizeData);
        const colorRes = productColorSizeData
          .map((item) => item.color)
          .filter(
            (color, index, self) =>
              index === self.findIndex((c) => c.id === color.id)
          );
        const sizeRes = productColorSizeData
          .map((item) => item.size)
          .filter(
            (size, index, self) =>
              index === self.findIndex((s) => s.id === size.id)
          );
        setColors(colorRes);
        setSizes(sizeRes);
      }

      if (productData) {
        setProduct(productData);
      }
      if (imagesData) {
        setImages(imagesData);
      }
    };
    fetchProductDetails();
  }, [id]);

  

  if (productLoading || imagesLoading || productColorSizeLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10 px-4 py-8 font-sans">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.detailProduct'), path: '/product' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
      {product?.description && (
        <ProductDescription description={product.description} />
      )}
  
    </div>
  );
};

export default App;
