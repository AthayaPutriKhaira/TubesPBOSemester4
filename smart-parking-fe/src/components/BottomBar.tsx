import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faClipboardList, faArrowRightFromBracket, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const BottomBar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-3xl mx-auto flex gap-2">
        <Link 
          to="/masuk" 
          className={`flex-1 py-3 px-2 rounded-xl text-center font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
            path === '/masuk' ? 'bg-green-600 text-white shadow-md' : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          <span><FontAwesomeIcon icon={faArrowRightToBracket} /></span> <span className="hidden sm:inline">Parkir</span> Masuk
        </Link>
        <Link 
          to="/keluar" 
          className={`flex-1 py-3 px-2 rounded-xl text-center font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
            path === '/keluar' ? 'bg-brand-red text-white shadow-md' : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
        >
          <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span> <span className="hidden sm:inline">Parkir</span> Keluar
        </Link>
        <Link 
          to="/riwayat" 
          className={`flex-1 py-3 px-2 rounded-xl text-center font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
            path === '/riwayat' ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span><FontAwesomeIcon icon={faClipboardList} /></span> Riwayat
        </Link>
        {user?.role === 'ADMIN' && (
          <Link 
            to="/report" 
            className={`flex-1 py-3 px-2 rounded-xl text-center font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
              path === '/report' ? 'bg-brand-orange text-white shadow-md' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
            }`}
          >
            <span><FontAwesomeIcon icon={faMoneyBillWave} /></span> <span className="hidden sm:inline">Report</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
