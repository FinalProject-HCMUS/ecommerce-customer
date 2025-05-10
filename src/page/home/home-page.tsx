import React, { useEffect, useState } from 'react';
import Hero from '../../components/page/home/Hero';
import Brands from '../../components/page/home/Brands';
import Featured from '../../components/page/home/Featured';
import Contact from '../../components/page/home/Contact';
import CommonProducts from '../../components/page/home/CommonProduct';
import { useProducts } from '../../hooks/products';
import { ProductResponse } from '../../interfaces';
import { t } from '../../helpers/i18n';
import { TOP_PRODUCTS_PER_PAGE } from '../../constants/common';
import { TOP_SELLING, TOP_TRENDING } from '../../constants/common';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { fetchTopProducts, loading: productsLoading } = useProducts();
  const [topSellingProducts, setTopSellingProducts] = useState<
    ProductResponse[]
  >([]);
  const [topTrendingProducts, setTopTrendingProducts] = useState<
    ProductResponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTopProducts(0, TOP_PRODUCTS_PER_PAGE);

      if (response) {
        const topSelling = response.topProducts.find(
          (category) => category.title === TOP_SELLING
        );
        const topTrending = response.topProducts.find(
          (category) => category.title === TOP_TRENDING
        );
        console.log('Top Selling:', topSelling);
        console.log('Top Trending:', topTrending);
        if (topSelling) setTopSellingProducts(topSelling.data);
        if (topTrending) setTopTrendingProducts(topTrending.data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || productsLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-pulse text-3xl font-bold">{t('shopName')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Brands />
        <Featured />
        <CommonProducts title={t('lbl.topSelling')} data={topSellingProducts} />
        <CommonProducts
          title={t('lbl.topTrending')}
          data={topTrendingProducts}
        />
        <Contact />
      </main>
    </div>
  );
};

export default HomePage;
