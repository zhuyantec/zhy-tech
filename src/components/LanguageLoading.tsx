import React from 'react';

const LanguageLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[var(--primary)] border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-600">Detecting language...</p>
      </div>
    </div>
  );
};

export default LanguageLoading; 