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
import Loading from '../../components/shared/Loading';
import { useEffect } from 'react';
import {
  ProductResponse,
  ProductImageResponse,
  ColorResponse,
  ProductColorSizeResponse,
  SizeResponse,
} from '../../interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { useCart } from '../../hooks/cart';
import { TIME_OUT_ADD_TO_CART } from '../../constants/common';
import { showError } from '../../utils/messageRender';

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
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { addCartItem } = useCart();

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

  const handleAddToCart = async (quantity: number, itemId: string) => {
    if (!userInfo?.id || !isAuthenticated) {
      showError(t('error.loginRequired'));
      return;
    }

    if (!quantity) {
      showError(t('error.quantityRequired'));
      return;
    }
    if (itemId === '') {
      showError(t('error.itemRequired'));
      return;
    }

    const cartItem = {
      userId: userInfo?.id,
      itemId: itemId,
      quantity: quantity,
    };

    const result = await addCartItem(cartItem);
    if (!result) return;
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, TIME_OUT_ADD_TO_CART);
  };

  if (productLoading || imagesLoading || productColorSizeLoading) {
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
            isAdding={isAdding}
            handleAddToCart={handleAddToCart}
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
