import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  title?: string;
  showBack?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ title, showBack = false }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const formatDate = (d: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {showBack ? (
              <Link to="/" className="flex items-center text-gray-500 hover:text-brand-orange transition-colors mr-4">
                <span className="text-xl mr-1">←</span> 
                <span className="hidden sm:inline">Kembali ke Dashboard</span>
              </Link>
            ) : (
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:bg-orange-600 transition-colors">
                  P
                </div>
                <h1 className="font-bold text-xl text-gray-900 tracking-tight">
                  {title || (
                    <>Smart<span className="text-brand-orange">Parking</span></>
                  )}
                </h1>
              </Link>
            )}
            
            {title && showBack && (
              <h1 className="font-bold text-xl text-gray-900 ml-2">{title}</h1>
            )}
          </div>
          
          <div className="flex items-center text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
            <span className="mr-2">🕒</span>
            <span className="mr-2 hidden sm:inline">{formatDate(time)}</span>
            <span className="font-bold text-brand-orange">{formatTime(time)}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
