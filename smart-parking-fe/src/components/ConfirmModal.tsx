import React from 'react';

interface ConfirmModalProps {
  show: boolean;
  title: string;
  body: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, title, body, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      ></div>
      
      {/* Modal Card */}
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl text-gray-500">?</span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
          
          <div className="text-gray-600 mb-6 text-sm">
            {body}
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-brand-orange text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-sm"
            >
              Ya, Proses Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
