import React, { useRef, useEffect } from 'react';

const MobileDishCard3D = ({ dish }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = (centerX - e.clientX) / 10;
      const rotateX = (e.clientY - centerY) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="group relative mb-8">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>

      {/* Main card */}
      <div
        ref={cardRef}
        className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl overflow-hidden transition-all duration-100 ease-out hover:translate-z-20 hover:scale-105 p-6"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-600 to-pink-600 rounded-full opacity-20"></div>

        {/* Image container */}
        <div className="relative h-64 mb-4 overflow-hidden rounded-xl">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          {/* Popular badge */}
          {dish.popular && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-black animate-pulse flex items-center gap-1">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Popular
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-amber-300 group-hover:to-orange-300 transition-all duration-300">
              {dish.name}
            </h3>
          </div>

          <p className="text-white text-sm mb-4 line-clamp-2 opacity-80">{dish.description}</p>

          <div className="flex justify-between items-center mb-4">
            <span className="bg-white/5 border border-white/10 text-white px-3 py-1 rounded-2xl text-xs font-medium">
              {dish.category}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-amber-400">★</span>
              <span className="text-white text-sm font-medium">{dish.rating}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300 mb-4"></div>

          {/* Sparkles */}
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-amber-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>

        {/* Floating price tag */}
        <div className="absolute top-4 right-4 bg-gradient-to-br from-amber-400 to-orange-500 text-black px-4 py-2 rounded-2xl border-4 border-white/20 font-black text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300 z-20">
          ₹{dish.price}
        </div>
      </div>
    </div>
  );
};

export default MobileDishCard3D;
