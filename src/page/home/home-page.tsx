import React from 'react';
import { useEffect, useState } from 'react';
import Hero from '../../components/page/home/Hero';
import Brands from '../../components/page/home/Brands';
import Featured from '../../components/page/home/Featured';
import { topProducts } from '../../data/products';
import Contact from '../../components/page/home/Contact';
import CommonProducts from '../../components/page/home/CommonProduct';
import { shopName } from '../../data/navbar';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Shorter loading time for testing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
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
        {topProducts.map((category) => (
          <CommonProducts key={category.title} title={category.title} data={category.data} />
        ))}
        <Contact />
      </main>
    </div>
  );
};

export default HomePage;
