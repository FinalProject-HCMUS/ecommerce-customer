import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/shared/Breadcrumb'
import Filters from '../../components/page/search/Filters'
import ProductGrid from '../../components/page/search/ProductGrid'
import SearchHeader from '../../components/page/search/SearchHeader'
import Pagination from '../../components/shared/Pagination'
import { useProducts } from '../../hooks/products'
import { ProductResponse, Pageable } from '../../interfaces'
import { PRODUCT_PER_PAGE } from '../../constants/common'
import Loading from '../../components/shared/Loading'
import { t } from '../../helpers/i18n'
import SearchInput from '../../components/page/search/SearchInput'

function App() {
  const { loading, fetchAllProducts } = useProducts()

  const [productResponse, setProductRes] = useState<Pageable<ProductResponse[]>>()
  const [keySearch, setKeySearch] = useState<string>()
  const [currentPage, setCurrentPage] = useState(0)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
  const [selectedColors, setSelectedColors] = useState<string>()
  const [selectedSizes, setSelectedSizes] = useState<string>()
  const [selectedCategories, setSelectedCategories] = useState<string>()

  useEffect(() => {
    const fetchData = async () => {
      console.log(keySearch)
      const res = await fetchAllProducts({
        page: currentPage,
        perPage: PRODUCT_PER_PAGE,
        keySearch: keySearch,
        fromPrice: priceRange[0],
        topPrice: priceRange[1],
        category: selectedCategories,
        color: selectedColors,
        size: selectedSizes,
      });
      console.log('Product Response:', res)
      if (res) {
        setProductRes(res)
      }
    }
    fetchData()
  }, [priceRange, selectedColors, selectedSizes, selectedCategories, keySearch, currentPage, priceRange])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber-1)
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if(loading) {
    return (<Loading />)
  }

  return (
    <div className="max-w-7xl mt-20 px-4 sm:px-6 font-sans">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.products'), path: '/products' },
        ]}
      />
      
      
      <SearchInput keySearch={keySearch} setKeySearch={setKeySearch}/>
      <SearchHeader keySearch={keySearch || ''} />
      

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <Filters
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedColor={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <ProductGrid products={productResponse?.content || []} />
      </div>

      <Pagination currentPage={currentPage + 1} totalPages={productResponse?.totalPages || 0} onPageChange={handlePageChange} />
    </div>
  )
}

export default App
