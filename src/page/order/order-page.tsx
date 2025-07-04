import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import EmptyState from '../../components/page/order/EmptyState';
import LoadingSkeleton from '../../components/page/order/LoadingSkeleton';
import { statusConfig } from '../../data/statusConfig';
import StatusBadge from '../../components/page/order/StatusBadge';
import OrderCard from '../../components/page/order/OrderCard';
import Pagination from '../../components/shared/Pagination';
import Breadcrumb from '../../components/shared/Breadcrumb';
import { useOrderSearch } from '../../hooks/order';
import { OrderResponse, Status } from '../../interfaces';
import { t } from 'i18next';
import { formatCurrency } from '../../helpers/string';
import { useSettingsContext } from '../../context/settingContext';

// Status Timeline Modal
const StatusModalComponent: React.FC<{
  order: OrderResponse | null;
  onClose: () => void;
}> = ({ order, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { settings } = useSettingsContext();
  const currencyCode = (settings.find(
    (setting) => setting.key === 'CurrencyCode'
  )?.value || 'VND') as 'USD' | 'VND';

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  if (!order) return null;

  // All possible statuses in order
  const allStatuses: Status[] = [
    Status.NEW,
    Status.PROCESSING,
    Status.PACKAGED,
    Status.PICKED,
    Status.SHIPPING,
    Status.DELIVERED,
    Status.CANCELLED,
    Status.REFUNDED,
  ];

  // Special statuses that can happen at any point
  const specialStatuses: Status[] = [Status.CANCELLED, Status.REFUNDED];

  // Check if a status is completed
  const isCompleted = (status: Status) => {
    return order.orderTracks.some((history) => history.status === status);
  };

  // Check if status is the current one
  const isCurrent = (status: Status) => {
    return order.status === status;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Find status history entry
  const getStatusHistory = (status: Status) => {
    return order.orderTracks.find((history) => history.status === status);
  };

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div
        ref={modalRef}
        className="bg-white shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        style={{
          animation: 'scaleIn 0.3s ease-out forwards',
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('order.orderStatus')}: {order.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Main status timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('order.timeline')}
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {/* Status steps */}
              <div className="space-y-8">
                {allStatuses.map((status, index) => {
                  const statusHistory = getStatusHistory(status);
                  const completed = isCompleted(status);
                  const current = isCurrent(status);

                  return (
                    <div key={status} className="relative flex items-start">
                      <div
                        className={`absolute left-7 top-7 h-full ${index === allStatuses.length - 1 ? 'hidden' : ''}`}
                      ></div>
                      <div
                        className={`flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center border-2 ${
                          completed
                            ? `${statusConfig[status].bgColor} ${statusConfig[status].borderColor}`
                            : 'bg-white border-gray-200'
                        } ${current ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
                      >
                        {completed ? (
                          statusConfig[status].icon
                        ) : (
                          <span className="text-gray-400">{index + 1}</span>
                        )}
                      </div>
                      <div className="ml-4 min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {statusConfig[status].text}
                        </div>
                        {statusHistory ? (
                          <>
                            <div className="text-sm text-gray-500">
                              {formatDate(statusHistory.updatedTime)}
                            </div>
                            {statusHistory.notes && (
                              <div className="mt-1 text-sm text-gray-600">
                                {statusHistory.notes}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-sm text-gray-400">
                            {t('pending')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Special statuses (if applicable) */}
          {specialStatuses.some((status) => isCompleted(status)) && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {t('order.specialStatuses')}
              </h3>
              <div className="space-y-4">
                {specialStatuses.map((status) => {
                  const statusHistory = getStatusHistory(status);
                  if (!statusHistory) return null;

                  return (
                    <div
                      key={status}
                      className="flex items-start p-3 rounded-[12px] bg-gray-50"
                    >
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${statusConfig[status].bgColor}`}
                      >
                        {statusConfig[status].icon}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {statusConfig[status].text}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(statusHistory.updatedTime)}
                        </div>
                        {statusHistory.notes && (
                          <div className="mt-1 text-sm text-gray-600">
                            {statusHistory.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Order summary */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('order.orderSummary')}
            </h3>
            <div className="bg-gray-50 rounded-[12px] p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">
                    {t('order.orderDate')}
                  </div>
                  <div className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    {t('order.totalAmount')}
                  </div>
                  <div className="font-medium">
                    {formatCurrency(order.total, currencyCode)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    {t('order.items')}
                  </div>
                  {/* <div className="font-medium">
                    {order..reduce((sum, item) => sum + item.quantity, 0)}{' '}
                    items
                  </div> */}
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    {t('order.currentStatus')}
                  </div>
                  <div className="font-medium flex items-center mt-1">
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-[12px] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {t('order.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

const OrdersPage: React.FC = () => {
  // Replace mock data with useOrderSearch hook
  const { orders, loading, pageable, searchParams, setSearchParams } =
    useOrderSearch({
      page: 0,
      size: 20,
      sort: ['createdAt,desc'],
    });

  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(
    null
  );

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchParams({ keyword });
  };

  // Handle status filter changes
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status =
      e.target.value === 'all' ? undefined : (e.target.value as Status);
    setSearchParams({ status });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page - 1 });
  };

  // View order status details
  const handleViewStatus = (order: OrderResponse) => {
    setSelectedOrder(order);
  };

  // Close modal
  const closeModal = () => {
    setSelectedOrder(null);
  };

  // Clear search
  const clearSearch = () => {
    setSearchParams({ keyword: undefined, status: undefined });
  };

  // Get current page for pagination component (convert from 0-based to 1-based)
  const currentPage = (pageable?.pageable.pageNumber ?? 0) + 1;
  const totalPages = pageable?.totalPages ?? 1;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.orders'), path: '/orders' },
        ]}
      />
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('order.title')}
        </h1>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-[12px] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition duration-150 ease-in-out"
            placeholder={t('order.searchOrders')}
            value={searchParams.keyword || ''}
            onChange={handleSearchChange}
          />
        </div>
        <div className="relative inline-block w-full md:w-48 rounded-[12px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 sm:text-sm rounded-[12px] transition duration-150 ease-in-out appearance-none bg-white"
            value={searchParams.status || 'all'}
            onChange={handleStatusChange}
          >
            <option value="all">{t('order.allStatuses')}</option>
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {t(`order.status.${status}`)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {loading ? (
          <LoadingSkeleton count={5} />
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewStatus={() => handleViewStatus(order)}
            />
          ))
        ) : (
          <EmptyState
            searchTerm={searchParams.keyword || ''}
            onClearSearch={clearSearch}
          />
        )}
      </div>

      {/* Pagination */}
      {!loading && orders.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Status Modal */}
      {selectedOrder && (
        <StatusModalComponent order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
};

export default OrdersPage;
