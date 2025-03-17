import React from 'react';
import { useEffect, useState } from 'react';
import Hero from '../../components/page/homepage/Hero';
import Brands from '../../components/page/homepage/Brands';
import Featured from '../../components/page/homepage/Featured';
import TopSelling from '../../components/page/homepage/TopSelling';
import TopTrending from '../../components/page/homepage/TopTrending';
import Contact from '../../components/page/homepage/Contact';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Shorter loading time for testing
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-pulse text-3xl font-bold">SHOP.CO</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <Brands />
        <Featured />
        <TopSelling />
        <TopTrending />
        <Contact />
      </main>
    </div>
  )
};

export default HomePage;
