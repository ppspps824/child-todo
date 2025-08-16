
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 p-4 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl shadow-lg transform -rotate-2">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
          きょうの やることリスト
        </h1>
        <p className="text-white/90 text-lg mt-1">🌟 がんばるぞ！ 🌟</p>
    </header>
  );
};

export default Header;
