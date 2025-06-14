import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useCart } from '../../../hooks/cart';
import { useProductColorSize } from '../../../hooks/product-color-size';
import {
  ColorResponse,
  ProductColorSizeResponse,
  ProductResponse,
  SizeResponse,
} from '../../../interfaces';
import { useSelector } from 'react-redux';
import { showError } from '../../../utils/messageRender';
import { t } from 'i18next';
import ColorSelector from '../../page/detail/ColorSelector';
import SizeSelector from '../../page/detail/SizeSelector';
import QuantityControl from '../QuantityControl';
import AddToCartButton from '../AddToCartButton';
import { RootState } from '../../../context/store';
import { formatCurrency } from '../../../helpers/string';
import { common } from '../../../constants';

const { TIME_OUT_ADD_TO_CART } = common;
interface QuickAddDialogProps {
  product: ProductResponse;
  isOpen: boolean;
  onClose: () => void;
}

const QuickAddDialog: React.FC<QuickAddDialogProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { fetchProductColorSizes } = useProductColorSize();

  const [colors, setColors] = useState<ColorResponse[]>([]);
  const [sizes, setSizes] = useState<SizeResponse[]>([]);
  const [productColorSize, setProductColorSize] = useState<
    ProductColorSizeResponse[]
  >([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [itemId, setItemId] = useState<string>('');
  const { addCartItem } = useCart();
  const [quantityAvailable, setQuantityAvailable] = useState<number>(
    product.total || 0
  );

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isOpen || !product.id) return;

    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const productColorSizeData = await fetchProductColorSizes(product.id);

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
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [isOpen]);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const matchingProduct = productColorSize.find(
        (pcs) => pcs.color.id === selectedColor && pcs.size.id === selectedSize
      );
      if (matchingProduct) {
        setItemId(matchingProduct.id);
        setQuantityAvailable(matchingProduct.quantity);
      } else {
        setQuantityAvailable(0);
      }
    } else {
      setQuantityAvailable(product.total || 0); // Reset to total if no color or size is selected
    }
  }, [selectedColor, selectedSize, productColorSize, product.total]);

  const handleAddToCart = async () => {
    if (!userInfo?.id || !isAuthenticated) {
      showError(t('error.loginRequired'));
      return;
    }

    if (!quantity) {
      showError(t('error.quantityRequired'));
      return;
    }

    if (!selectedColor || !selectedSize) {
      showError(t('error.selectOptions'));
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

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-30" />

        <div className="relative mx-auto max-w-3xl w-full bg-white p-4 rounded-[12px] shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-800 border-r-transparent"></div>
              <p className="mt-2">{t('loading')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex justify-center">
                <img
                  src={product?.mainImageUrl}
                  alt={product?.name}
                  className="object-cover h-64 w-full rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {product && formatCurrency(product.price, 'VND')}
                </p>

                {colors.length > 0 && (
                  <div className="mb-4">
                    <ColorSelector
                      colors={colors}
                      selectedColor={selectedColor}
                      onChange={setSelectedColor}
                    />
                  </div>
                )}

                {sizes.length > 0 && (
                  <div className="mb-4">
                    <SizeSelector
                      sizes={sizes}
                      selectedSize={selectedSize}
                      onChange={setSelectedSize}
                    />
                  </div>
                )}

                {quantityAvailable !== 0 && (
                  <div className="mb-4">
                    <QuantityControl
                      quantity={quantity}
                      onIncrement={() => setQuantity((q) => q + 1)}
                      onDecrement={() =>
                        setQuantity((q) => (q > 1 ? q - 1 : 1))
                      }
                    />
                  </div>
                )}

                {quantityAvailable !== 0 && (
                  <div className="mt-auto">
                    <AddToCartButton
                      isAdding={isAdding}
                      onClick={handleAddToCart}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default QuickAddDialog;
