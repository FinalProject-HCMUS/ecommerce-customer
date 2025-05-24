import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import CartItem from '../../components/page/cart/CartItem';
import OrderSummary from '../../components/page/cart/OrderSummary';
import type { OrderSummaryData } from '../../interfaces/temp/cart';
import { CartItemResponse, UpdateCartItemRequest } from '../../interfaces';
import { useCart } from '../../hooks/cart';
import Loading from '../../components/shared/Loading';
import { t } from '../../helpers/i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { showError, showSuccess } from '../../utils/messageRender';

function App() {
  const { loading, fetchCartItemsByUserId, removeCartItem, modifyCartItem } =
    useCart();
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = userInfo?.id;
      if (!userId) return;
      const items = await fetchCartItemsByUserId(userId);
      if (items) {
        setCartItems(items);
      }
    };
    fetchCartItems();
  }, []);

  const updateQuantity = async (
    id: string,
    newQuantity: number
  ): Promise<void> => {
    if (newQuantity < 1) {
      showError(t('error.invalidQuantity'));
      return;
    }
    const request: UpdateCartItemRequest = {
      quantity: newQuantity,
      userId: userInfo?.id,
      itemId: id,
    };
    const updatedItem = await modifyCartItem(id, request);

    if (updatedItem) {
      // Update the item in the local state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      showSuccess(t('success.cartUpdated'));
    } else {
      showError(t('error.cartUpdateFailed'));
    }
  };

  const removeItem = async (id: string): Promise<void> => {
    const success = await removeCartItem(id);
    if (success) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      showSuccess(t('success.itemRemoved'));
    } else {
      showError(t('error.failedToRemoveItem'));
    }
  };

  if (loading) {
    return <Loading />;
  }

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      item?.product.price *
        (100 - item?.product.discountPercent) *
        item.quantity,
    0
  );

  const deliveryFee = 30000;
  const total = subtotal + deliveryFee;

  const orderSummaryData: OrderSummaryData = {
    subtotal,
    deliveryFee,
    total,
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 mx-8 px-4 py-8">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.cart'), path: '/cart' },
        ]}
      />

      {/* Page Title */}
      <h1 className="text-xl font-bold mb-8">{t('lbl.yourCart')}</h1>

      {cartItems.length === 0 && (
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('lbl.emptyCart')}
          </h2>
          <p className="mt-2 text-gray-600">{t('lbl.addItemsToCart')}</p>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <OrderSummary data={orderSummaryData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
