import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

import VehicleBadge from '../components/VehicleBadge';
import { parkingApi } from '../api/parking';
import type { RiwayatResponse } from '../types/parking';
import { formatRupiah, formatDurasi, formatWaktu } from '../utils/format';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faTriangleExclamation, faPrint, faArrowsRotate, faCircleInfo, faCircleCheck, faBolt, faFileArrowDown, faCaretDown, faMoneyBill, faCalculator, faFileLines } from '@fortawesome/free-solid-svg-icons';

const History: React.FC = () => {
  const [data, setData] = useState<RiwayatResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filterTanggal, setFilterTanggal] = useState('');
  const [filterJenis, setFilterJenis] = useState('');
  const [filterPlat, setFilterPlat] = useState('');

  const fetchRiwayat = async () => {
    setLoading(true);
    try {
      const res = await parkingApi.getRiwayat(filterTanggal, filterJenis, filterPlat);
      setData(res.data);
      setError('');
    } catch (err: any) {
      setError('Gagal memuat data riwayat');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayat();
  }, []);

  const handleApplyFilter = () => {
    fetchRiwayat();
  };

  const handleResetFilter = () => {
    setFilterTanggal('');
    setFilterJenis('');
    setFilterPlat('');
    // Need to trigger fetch after state updates, easiest way is to call API directly with empty params
    setTimeout(() => {
      parkingApi.getRiwayat('', '', '').then(res => setData(res.data)).catch(() => setError('Error'));
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar title="Riwayat Parkir" showBack={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-200">
            <FontAwesomeIcon icon={faTriangleExclamation} /> {error}
          </div>
        )}

        {data && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-500 font-medium">Total Transaksi</h3>
                  <span className="text-2xl text-blue-500"><FontAwesomeIcon icon={faFileLines} /></span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{data.totalTransaksi}</div>
                <div className="text-sm text-gray-400">{data.totalTransaksi} data sesuai filter</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-500 font-medium">Total Pendapatan</h3>
                  <span className="text-2xl text-green-500"><FontAwesomeIcon icon={faMoneyBill} /></span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{formatRupiah(data.totalPendapatan)}</div>
                <div className="text-sm text-gray-400">Semua waktu</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-500 font-medium">Rata-rata per Transaksi</h3>
                  <span className="text-2xl text-purple-500"><FontAwesomeIcon icon={faCalculator} /></span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{formatRupiah(data.rataRata)}</div>
                <div className="text-sm text-gray-400">Rata-rata biaya parkir</div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3 space-y-6">
                {/* Filter Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-800 mb-4"><FontAwesomeIcon icon={faCaretDown} /> Filter Data</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="date"
                      value={filterTanggal}
                      onChange={(e) => setFilterTanggal(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
                    />
                    <select
                      value={filterJenis}
                      onChange={(e) => setFilterJenis(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
                    >
                      <option value="">Semua Jenis</option>
                      <option value="Motor">Motor</option>
                      <option value="Mobil">Mobil</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Cari plat nomor..."
                      value={filterPlat}
                      onChange={(e) => setFilterPlat(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none uppercase"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleApplyFilter} className="px-6 py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                      🔍 Terapkan Filter
                    </button>
                    <button onClick={handleResetFilter} className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      <FontAwesomeIcon icon={faArrowsRotate} /> Reset
                    </button>
                  </div>
                </div>

                {/* Chart Card */}
                {data.chart7Hari && data.chart7Hari.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-800 mb-6"><FontAwesomeIcon icon={faChartSimple} /> Transaksi 7 Hari Terakhir</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.chart7Hari}>
                          <XAxis dataKey="tanggal" fontSize={12} tickMargin={10} />
                          <YAxis fontSize={12} />
                          <Tooltip 
                            formatter={(value: any, name: any) => [
                              name === 'pendapatan' ? formatRupiah(Number(value)) : value, 
                              name === 'pendapatan' ? 'Pendapatan' : 'Jumlah'
                            ]}
                          />
                          <Bar dataKey="jumlah" fill="#F97316" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Table Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                        <tr>
                          <th className="px-5 py-3">Plat Nomor</th>
                          <th className="px-5 py-3">Jenis</th>
                          <th className="px-5 py-3">Waktu Masuk</th>
                          <th className="px-5 py-3">Waktu Keluar</th>
                          <th className="px-5 py-3">Durasi</th>
                          <th className="px-5 py-3">Total Bayar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {loading ? (
                          <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-500">Loading...</td></tr>
                        ) : data.transaksi.length === 0 ? (
                          <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-500">Tidak ada riwayat parkir yang ditemukan.</td></tr>
                        ) : (
                          data.transaksi.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-5 py-4 font-bold text-gray-900">{item.platNomor}</td>
                              <td className="px-5 py-4"><VehicleBadge jenis={item.jenis} /></td>
                              <td className="px-5 py-4 whitespace-nowrap text-gray-600">{formatWaktu(item.waktuMasuk)}</td>
                              <td className="px-5 py-4 whitespace-nowrap text-gray-600">{formatWaktu(item.waktuKeluar)}</td>
                              <td className="px-5 py-4 text-gray-600">{formatDurasi(item.durasiMenit)}</td>
                              <td className="px-5 py-4 font-bold text-gray-900">{formatRupiah(item.totalBayar)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Side Panel Area */}
              <div className="xl:col-span-1 space-y-6">
                <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    <span><FontAwesomeIcon icon={faCircleInfo} /></span> Informasi Riwayat
                  </h3>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li className="flex items-start gap-2"><span><FontAwesomeIcon icon={faCircleCheck} /></span> <span>Semua transaksi parkir yang selesai akan tercatat di sini</span></li>
                    <li className="flex items-start gap-2"><span><FontAwesomeIcon icon={faCircleCheck} /></span> <span>Gunakan filter untuk mencari data spesifik</span></li>
                    <li className="flex items-start gap-2"><span><FontAwesomeIcon icon={faCircleCheck} /></span> <span>Chart menampilkan aktivitas 7 hari terakhir</span></li>
                    <li className="flex items-start gap-2 text-gray-500 font-medium mt-3 border-t border-yellow-200/50 pt-2">
                      <span><FontAwesomeIcon icon={faFileArrowDown} /></span> <span>Data dapat diekspor ke CSV</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                   <div className="p-4 border-b border-gray-100 bg-gray-50">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2"><span><FontAwesomeIcon icon={faBolt} /></span> Aksi Cepat</h3>
                   </div>
                   <div className="p-2 space-y-1">
                     <a href={parkingApi.exportCsvUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-gray-700 font-medium w-full text-left transition-colors">
                        <span className="w-8 h-8 rounded bg-green-100 flex items-center justify-center text-green-600 text-lg"><FontAwesomeIcon icon={faFileArrowDown} /></span>
                        Export CSV
                     </a>
                     <button onClick={() => window.print()} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-gray-700 font-medium w-full text-left transition-colors">
                        <span className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-lg"><FontAwesomeIcon icon={faPrint} /></span>
                        Print Data
                     </button>
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

export default History;
