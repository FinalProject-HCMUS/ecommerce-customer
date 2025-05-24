import React from 'react';
import { Package } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
  onClearSearch?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  onClearSearch,
}) => {
  return (
    <div className="text-center py-12">
      <Package className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        No orders found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchTerm
          ? "Try adjusting your search or filter to find what you're looking for."
          : "You haven't placed any orders yet."}
      </p>
      {searchTerm && onClearSearch && (
        <button
          onClick={onClearSearch}
          className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Clear Search
        </button>
      )}
    </div>
  );
};

export default EmptyState;
