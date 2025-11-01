import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ColorLegend = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-4 p-4 bg-beige rounded-2xl border-2 border-black/20 shadow-lg animate-fadeIn">
      <h3 className="text-lg font-momo text-black text-center mb-2">
        {t('colorLegendTitle')}
      </h3>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-1">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
          <span className="font-bold text-black">{t('colorGreen')}</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
          <span className="font-bold text-black">{t('colorYellow')}</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
          <span className="font-bold text-black">{t('colorRed')}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorLegend;
