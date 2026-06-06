import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import ConfirmModal from '../components/ConfirmModal';
import { parkingApi } from '../api/parking';
import type { KendaraanAktif, StrukData } from '../types/parking';
import { hitungEstimasi, formatRupiah, formatDurasi, formatWaktu } from '../utils/format';

const ParkingOut: React.FC = () => {
  const [kendaraanList, setKendaraanList] = useState<KendaraanAktif[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [struk, setStruk] = useState<StrukData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());

  // Real-time update for estimation
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toISOString()), 30000);
    return () => clearInterval(timer);
  }, []);

  const fetchKendaraanAktif = async () => {
    try {
      const res = await parkingApi.getKendaraanAktif();
      setKendaraanList(res.data);
    } catch (err: any) {
      setError('Gagal memuat data kendaraan aktif');
    }
  };

  useEffect(() => {
    fetchKendaraanAktif();
  }, []);

  const selectedKendaraan = kendaraanList.find(k => k.id === selectedId);

  const handleProcess = () => {
    if (!selectedId) {
      setError('Pilih kendaraan terlebih dahulu');
      return;
    }
    setError('');
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!selectedId) return;
    
    setLoading(true);
    try {
      const res = await parkingApi.postKeluar({ id: Number(selectedId) });
      setStruk(res.data);
      setShowModal(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memproses parkir keluar');
      setShowModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStruk(null);
    setSelectedId('');
    setError('');
    fetchKendaraanAktif();
  };

  const handleCopy = () => {
    if (!struk) return;
    const text = `
Struk Parkir Smart Parking
---------------------------
Plat Nomor : ${struk.platNomor}
Jenis      : ${struk.jenis}
Masuk      : ${formatWaktu(struk.waktuMasuk)}
Keluar     : ${formatWaktu(struk.waktuKeluar)}
Durasi     : ${struk.durasiMenit} menit
---------------------------
Total Bayar: ${formatRupiah(struk.totalBayar)}
    `.trim();
    navigator.clipboard.writeText(text);
    alert('Struk disalin ke clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar title="Parkir Keluar" showBack={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div className="lg:col-span-2">
            {!struk ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🚗</span> Pilih Kendaraan Keluar
                  </h2>
                </div>

                <div className="p-6">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 border border-red-200 text-sm">
                      ⚠️ {error}
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-brand-red font-bold mb-2">🚗 Plat Nomor Kendaraan *</label>
                    <select
                      value={selectedId}
                      onChange={(e) => setSelectedId(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-red focus:ring-0 outline-none text-lg transition-colors appearance-none bg-white"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236B7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                    >
                      <option value="" disabled>-- Pilih Kendaraan (Ketik Plat Nomor) --</option>
                      {kendaraanList.map((k) => (
                        <option key={k.id} value={k.id}>
                          {k.platNomor} ({k.jenis}) - Masuk: {formatWaktu(k.waktuMasuk).split(' ')[1]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedKendaraan && (
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-2">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-500 text-sm mb-1">Durasi Parkir</p>
                            <p className="font-bold text-xl text-gray-800">
                              {(() => {
                                const msk = new Date(selectedKendaraan.waktuMasuk).getTime();
                                const now = new Date(currentTime).getTime();
                                return formatDurasi(Math.floor((now - msk) / 60000));
                              })()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500 text-sm mb-1">Estimasi Biaya</p>
                            <p className="font-bold text-2xl text-brand-red">
                              {formatRupiah(hitungEstimasi(selectedKendaraan.waktuMasuk, selectedKendaraan.jenis))}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-yellow-200/50 text-xs text-gray-500 flex items-center gap-1.5">
                          <span>ℹ️</span> Perhitungan berdasarkan durasi parkir dan tarif per jam
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={handleProcess}
                      className="flex-[2] bg-brand-red hover:bg-red-600 text-white font-bold py-3.5 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <span>→</span> Proses Parkir Keluar
                    </button>
                    <button
                      onClick={() => setSelectedId('')}
                      className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <span>×</span> Batal
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Inline Struk View */
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 max-w-sm mx-auto">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">✓</div>
                    <h2 className="text-xl font-bold text-gray-900">Transaksi Berhasil</h2>
                    <p className="text-sm text-gray-500">Bukti pembayaran parkir</p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 mb-6">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="py-2 text-gray-500">Plat Nomor</td><td className="py-2 font-bold text-right">{struk.platNomor}</td></tr>
                        <tr><td className="py-2 text-gray-500">Jenis Kendaraan</td><td className="py-2 font-medium text-right">{struk.jenis}</td></tr>
                        <tr><td className="py-2 text-gray-500">Waktu Masuk</td><td className="py-2 font-medium text-right">{formatWaktu(struk.waktuMasuk)}</td></tr>
                        <tr><td className="py-2 text-gray-500">Waktu Keluar</td><td className="py-2 font-medium text-right">{formatWaktu(struk.waktuKeluar)}</td></tr>
                        <tr><td className="py-2 text-gray-500">Durasi Parkir</td><td className="py-2 font-medium text-right">{formatDurasi(struk.durasiMenit)}</td></tr>
                      </tbody>
                    </table>
                    
                    <div className="my-3 border-t-2 border-dashed border-gray-200"></div>
                    
                    <table className="w-full text-sm">
                      <tbody>
                        <tr><td className="py-1 text-gray-500">Tarif per Jam</td><td className="py-1 text-right">{formatRupiah(struk.tarifPerJam)}</td></tr>
                        <tr><td className="py-1 text-gray-500">Lama Parkir</td><td className="py-1 text-right">{struk.lamaJam} jam</td></tr>
                        <tr><td className="py-3 font-bold text-base text-gray-900">TOTAL BAYAR</td><td className="py-3 font-bold text-xl text-brand-orange text-right">{formatRupiah(struk.totalBayar)}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="text-center text-xs text-gray-400 italic mb-8">
                    <p>Terima kasih atas kunjungan Anda</p>
                    <p>Struk ini sah sebagai bukti pembayaran</p>
                    <p className="mt-2">{new Date().toLocaleString()}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button onClick={() => window.print()} className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                      <span>🖨️</span> Cetak Struk
                    </button>
                    <button onClick={handleCopy} className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center gap-2">
                      <span>📋</span> Salin Struk
                    </button>
                    <button onClick={handleReset} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 flex items-center justify-center gap-2">
                      <span>🔄</span> Transaksi Baru
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Panel Area */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <span>ℹ️</span> Informasi Parkir Keluar
              </h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li className="flex items-start gap-2"><span>✅</span> <span>Pastikan plat nomor sesuai dengan fisik kendaraan</span></li>
                <li className="flex items-start gap-2"><span>✅</span> <span>Tarif dihitung otomatis berdasarkan waktu masuk</span></li>
                <li className="flex items-start gap-2"><span>✅</span> <span>Pembayaran dapat dilakukan setelah struk keluar</span></li>
                <li className="flex items-start gap-2"><span>✅</span> <span>Data transaksi akan tersimpan di riwayat</span></li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-bold text-gray-800">Tarif Parkir per Jam</h3>
               </div>
               <div className="p-4 space-y-3">
                 <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                   <div className="flex items-center gap-2 text-gray-700 font-medium"><span>🛵</span> Motor</div>
                   <div className="font-bold text-gray-900">Rp 2.000<span className="text-xs text-gray-500 font-normal">/jam</span></div>
                 </div>
                 <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2 text-gray-700 font-medium"><span>🚗</span> Mobil</div>
                   <div className="font-bold text-gray-900">Rp 5.000<span className="text-xs text-gray-500 font-normal">/jam</span></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      <ConfirmModal
        show={showModal}
        title="Konfirmasi Parkir Keluar"
        body={
          selectedKendaraan ? (
            <div className="text-left bg-gray-50 p-4 rounded-lg space-y-2 border border-gray-100 mx-auto max-w-xs">
              <p><strong>Plat:</strong> {selectedKendaraan.platNomor} ({selectedKendaraan.jenis})</p>
              <p><strong>Masuk:</strong> {formatWaktu(selectedKendaraan.waktuMasuk).split(' ')[1]}</p>
              <p><strong>Durasi:</strong> {formatDurasi(Math.floor((new Date(currentTime).getTime() - new Date(selectedKendaraan.waktuMasuk).getTime()) / 60000))}</p>
              <p className="text-brand-red font-bold pt-2 border-t mt-2">Estimasi: {formatRupiah(hitungEstimasi(selectedKendaraan.waktuMasuk, selectedKendaraan.jenis))}</p>
            </div>
          ) : null
        }
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default ParkingOut;
