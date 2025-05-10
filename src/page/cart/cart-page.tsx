import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import CartItem from '../../components/page/cart/CartItem';
import OrderSummary from '../../components/page/cart/OrderSummary';
import type { OrderSummaryData } from '../../interfaces/temp/cart';
import { CartItemResponse } from '../../interfaces';
import { useCart } from '../../hooks/cart';
import Loading from '../../components/shared/Loading';
import { t } from '../../helpers/i18n';

function App() {
  const { loading, fetchCartItemsByUserId } = useCart();
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = 'user-id'; // Replace with actual user ID
      const items = await fetchCartItemsByUserId(userId);
      if (items) {
        setCartItems(items);
      }
    };
    fetchCartItems();
  }, []);

  const updateQuantity = (id: string, newQuantity: number): void => {};

  const removeItem = (id: string): void => {};

  if (loading) {
    return <Loading />;
  }

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountRate = 0.2; // 20%
  const discountAmount = subtotal * discountRate;
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  const orderSummaryData: OrderSummaryData = {
    subtotal,
    discountRate,
    discountAmount,
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>
        <div className="lg:col-span-1">
          <OrderSummary data={orderSummaryData} />
        </div>
      </div>
    </div>
  );
}

export default App;
