import React, { useState, useEffect } from 'react';
import CategoryBar from './components/CategoryBar';
import MobileDishCard3D from './components/MobileDishCard3D';
import MobileDishCardFallback from './components/MobileDishCardFallback';
import { useCafeLighting } from './hooks/useCafeLighting';
import { useDevicePerformance } from './hooks/useDevicePerformance';
import { menuData, categories } from './data/menuData';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const isDarkMode = useCafeLighting();
  const isLowEnd = useDevicePerformance();

  const filteredDishes = activeCategory === 'All'
    ? menuData
    : menuData.filter(dish => dish.category === activeCategory);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/5 border-b border-white/10 text-center py-5">
          <div className="flex items-center justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur-lg opacity-50"></div>
              {/* <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div> */}
            </div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
            Adda Menu
          </h1>
          <p className="text-sm text-gray-400 mt-1">Where Every Bite Tells a Story</p>
        </header>

        <CategoryBar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <main className="px-4 pb-8">
          {filteredDishes.map(dish => (
            isLowEnd ? (
              <MobileDishCardFallback key={dish.id} dish={dish} />
            ) : (
              <MobileDishCard3D key={dish.id} dish={dish} />
            )
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;
