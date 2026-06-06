import React from 'react';
import type { JenisKendaraan } from '../types/parking';

interface VehicleBadgeProps {
  jenis: JenisKendaraan;
}

const VehicleBadge: React.FC<VehicleBadgeProps> = ({ jenis }) => {
  if (jenis === 'Motor') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
        <span>🛵</span> Motor
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
      <span>🚗</span> Mobil
    </span>
  );
};

export default VehicleBadge;
