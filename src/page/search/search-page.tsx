import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Filters from '../../components/page/search/Filters';
import ProductGrid from '../../components/page/search/ProductGrid';
import SearchHeader from '../../components/page/search/SearchHeader';
import Pagination from '../../components/shared/Pagination';
import type { Product } from '../../interfaces/temp/product';
import { products } from '../../data/products';

function App() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 250]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    let result = [...products];

    // Filter by price
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter((product) => selectedColors.includes(product.color));
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter((product) => product.sizes.some((size) => selectedSizes.includes(size)));
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [priceRange, selectedColors, selectedSizes, selectedCategories]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); // Keep this declaration

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mt-20 px-4 sm:px-6 font-sans">
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Products', path: '/products' },
        ]}
      />
      <SearchHeader
        totalProducts={filteredProducts.length}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
      />

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <Filters
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <ProductGrid products={currentProducts} />
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
