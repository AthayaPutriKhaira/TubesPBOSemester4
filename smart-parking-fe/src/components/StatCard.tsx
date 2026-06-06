import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  icon?: React.ReactNode;
  progress?: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subLabel, icon, progress }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-gray-500 font-medium">{label}</h3>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
      {subLabel && <div className="text-sm text-gray-400">{subLabel}</div>}
      
      {progress !== undefined && (
        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
          <div 
            className="bg-brand-orange h-1.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
