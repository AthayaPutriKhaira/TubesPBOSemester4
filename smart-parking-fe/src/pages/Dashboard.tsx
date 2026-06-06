import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import StatCard from '../components/StatCard';
import VehicleBadge from '../components/VehicleBadge';
import { parkingApi } from '../api/parking';
import type { DashboardData } from '../types/parking';
import { formatDurasi, formatWaktu } from '../utils/format';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchDashboard = async () => {
    try {
      const result = await parkingApi.getDashboard();
      setData(result.data);
      setLastUpdate(new Date());
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memuat data dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-200">
            ⚠️ {error}
          </div>
        )}

        {data && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard 
                label="Kendaraan Aktif" 
                value={data.kendaraanAktif} 
                icon="🚗" 
                subLabel={`${((data.kendaraanAktif / 100) * 100).toFixed(0)}% terisi`}
                progress={(data.kendaraanAktif / 100) * 100}
              />
              <StatCard 
                label="Mobil" 
                value={data.jumlahMobil} 
                icon="🚙" 
                subLabel={`${data.kendaraanAktif > 0 ? ((data.jumlahMobil / data.kendaraanAktif) * 100).toFixed(0) : 0}% dari total`}
              />
              <StatCard 
                label="Motor" 
                value={data.jumlahMotor} 
                icon="🛵" 
                subLabel={`${data.kendaraanAktif > 0 ? ((data.jumlahMotor / data.kendaraanAktif) * 100).toFixed(0) : 0}% dari total`}
              />
              <StatCard 
                label="Kapasitas Tersedia" 
                value={data.kapasitasTersedia} 
                icon="🅿️" 
                subLabel="Dari 100 slot total"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Active Vehicles Table */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span>🚗</span> Kendaraan Aktif di Area Parkir
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">Kendaraan yang belum melakukan checkout</p>
                    </div>
                    <span className="bg-orange-100 text-brand-orange px-3 py-1 rounded-full text-sm font-semibold">
                      {data.kendaraanAktif} Kendaraan
                    </span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                        <tr>
                          <th className="px-5 py-3">Plat Nomor</th>
                          <th className="px-5 py-3">Jenis</th>
                          <th className="px-5 py-3">Waktu Masuk</th>
                          <th className="px-5 py-3">Durasi</th>
                          <th className="px-5 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {data.listAktif.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                              Tidak ada kendaraan di area parkir saat ini.
                            </td>
                          </tr>
                        ) : (
                          data.listAktif.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-5 py-4 font-bold text-gray-900">{item.platNomor}</td>
                              <td className="px-5 py-4"><VehicleBadge jenis={item.jenis} /></td>
                              <td className="px-5 py-4">
                                <div className="font-medium text-gray-900">{formatWaktu(item.waktuMasuk).split(' ')[1]}</div>
                                <div className="text-xs text-gray-500">{formatWaktu(item.waktuMasuk).split(' ')[0]}</div>
                              </td>
                              <td className="px-5 py-4 text-gray-700">
                                <span className="inline-block mr-1">⏱</span> {formatDurasi(item.durasiMenit)}
                              </td>
                              <td className="px-5 py-4">
                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> Aktif
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 italic flex items-center gap-1.5">
                    <span>🔄</span> Durasi diperbarui otomatis setiap 30 detik (Update terakhir: {formatWaktu(lastUpdate.toISOString()).split(' ')[1]})
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span>⚡</span> Aksi Cepat
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    <Link to="/masuk" className="flex items-center p-5 hover:bg-green-50 transition-colors group">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl mr-4 group-hover:bg-green-200 transition-colors">
                        📥
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Parkir Masuk</h3>
                        <p className="text-sm text-gray-500">Input kendaraan baru</p>
                      </div>
                      <div className="text-gray-400 group-hover:text-green-600">›</div>
                    </Link>
                    
                    <Link to="/keluar" className="flex items-center p-5 hover:bg-red-50 transition-colors group">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 text-xl mr-4 group-hover:bg-red-200 transition-colors">
                        📤
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Parkir Keluar</h3>
                        <p className="text-sm text-gray-500">Checkout kendaraan</p>
                      </div>
                      <div className="text-gray-400 group-hover:text-red-600">›</div>
                    </Link>

                    <Link to="/riwayat" className="flex items-center p-5 hover:bg-gray-50 transition-colors group">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 text-xl mr-4 group-hover:bg-gray-200 transition-colors">
                        🔄
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Riwayat Parkir</h3>
                        <p className="text-sm text-gray-500">Lihat histori lengkap</p>
                      </div>
                      <div className="text-gray-400 group-hover:text-gray-900">›</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
