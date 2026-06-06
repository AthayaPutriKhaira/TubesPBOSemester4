import type { JenisKendaraan } from '../types/parking';

export const formatRupiah = (n: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n).replace('Rp', 'Rp ');
};

export const formatDurasi = (menit: number): string => {
  const jam = Math.floor(menit / 60);
  const sisaMenit = menit % 60;
  return `${jam} jam ${sisaMenit} menit`;
};

export const formatWaktu = (dt: string): string => {
  const date = new Date(dt);
  
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const hitungEstimasi = (waktuMasuk: string, jenis: JenisKendaraan): number => {
  const masuk = new Date(waktuMasuk).getTime();
  const now = new Date().getTime();
  const diffMinutes = Math.floor((now - masuk) / 1000 / 60);
  
  const tarif = jenis === 'Motor' ? 2000 : 5000;
  const jam = Math.ceil(diffMinutes / 60);
  
  return Math.max(1, jam) * tarif;
};
