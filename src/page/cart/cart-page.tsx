import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import CartItem from '../../components/page/cart/CartItem';
import OrderSummary from '../../components/page/cart/OrderSummary';
import {
  CartItemResponse,
  OrderSummaryData,
  UpdateCartItemRequest,
} from '../../interfaces';
import { useCart } from '../../hooks/cart';
import Loading from '../../components/shared/Loading';
import { t } from '../../helpers/i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { showError, showSuccess } from '../../utils/messageRender';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const { loading, fetchCartItemsByUserId, removeCartItem, modifyCartItem } =
    useCart();
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = userInfo?.id;
      if (!userId) return;
      const items = await fetchCartItemsByUserId(userId);
      if (items) {
        setCartItems(items);
        // By default, select all items
        setSelectedItems(new Set(items.map((item) => item.id)));
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

      // Also remove from selected items if it was selected
      if (selectedItems.has(id)) {
        const newSelectedItems = new Set(selectedItems);
        newSelectedItems.delete(id);
        setSelectedItems(newSelectedItems);
      }

      showSuccess(t('success.itemRemoved'));
    } else {
      showError(t('error.failedToRemoveItem'));
    }
  };

  const handleSelectItem = (id: string, isSelected: boolean) => {
    const newSelectedItems = new Set(selectedItems);

    if (isSelected) {
      newSelectedItems.add(id);
    } else {
      newSelectedItems.delete(id);
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Select all items
      setSelectedItems(new Set(cartItems.map((item) => item.id)));
    } else {
      // Clear all selections
      setSelectedItems(new Set());
    }
  };

  if (loading) {
    return <Loading />;
  }

  const handleCheckout = () => {
    // Filter cart items to only include selected ones
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.has(item.id)
    );

    // Navigate to checkout with selected items
    navigate('/checkout', {
      state: {
        selectedCartItems,
        orderSummary: {
          subtotal,
          deliveryFee,
          total,
        },
      },
    });
  };

  // Calculate order summary based on selected items only
  const subtotal = cartItems
    .filter((item) => selectedItems.has(item.id))
    .reduce(
      (sum, item) =>
        sum +
        (item?.product.price *
          (100 - item?.product.discountPercent) *
          item.quantity) /
          100,
      0
    );

  const deliveryFee = selectedItems.size > 0 ? 30000 : 0;
  const total = subtotal + deliveryFee;

  const orderSummaryData: OrderSummaryData = {
    subtotal,
    deliveryFee,
    total,
    selectedItemCount: selectedItems.size,
    totalItemCount: cartItems.length,
  };

  const areAllSelected =
    cartItems.length > 0 && selectedItems.size === cartItems.length;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 py-8">
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
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="select-all"
                checked={areAllSelected}
                onChange={handleSelectAll}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2"
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                {t('lbl.selectAll')} ({selectedItems.size}/{cartItems.length})
              </label>
            </div>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                isSelected={selectedItems.has(item.id)}
                onSelect={handleSelectItem}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <OrderSummary
              data={orderSummaryData}
              isCheckoutEnabled={selectedItems.size > 0}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
