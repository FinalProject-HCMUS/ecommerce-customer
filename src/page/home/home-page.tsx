import React, { useEffect, useState } from 'react';
import Hero from '../../components/page/home/Hero';
import Brands from '../../components/page/home/Brands';
import Featured from '../../components/page/home/Featured';
import Contact from '../../components/page/home/Contact';
import CommonProducts from '../../components/page/home/CommonProduct';
import { shopName } from '../../data/navbar';
import { useProducts } from '../../hooks/products';
import { ProductResponse } from '../../interfaces';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { fetchTopProducts, loading: productsLoading } = useProducts();
  const [topSellingProducts, setTopSellingProducts] = useState<ProductResponse[]>([]);
  const [topTrendingProducts, setTopTrendingProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTopProducts(0, 30); // Fetch top products with pagination
      if (response) {
        const topSelling = response.topProducts.find((category) => category.title === 'TOP SELLING');
        const topTrending = response.topProducts.find((category) => category.title === 'TOP TRENDING');
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
        <div className="animate-pulse text-3xl font-bold">{shopName}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Brands />
        <Featured />
        <CommonProducts title="Top Selling Products" data={topSellingProducts} />
        <CommonProducts title="Top Trending Products" data={topTrendingProducts} />
        <Contact />
      </main>
    </div>
  );
};

export default HomePage;
