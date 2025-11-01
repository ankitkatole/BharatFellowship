import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);

const Glossary = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const terms = [
    { key: 'worksCompleted', title: t('worksCompleted'), definition: t('def_worksCompleted') },
    { key: 'familiesGotWork', title: t('familiesGotWork'), definition: t('def_familiesGotWork') },
    { key: 'totalMoneySpent', title: t('totalMoneySpent'), definition: t('def_totalMoneySpent') },
    { key: 'workdaysForWomen', title: t('workdaysForWomen'), definition: t('def_workdaysForWomen') },
    { key: 'salariesOnTime', title: t('salariesOnTime'), definition: t('def_salariesOnTime') },
  ];

  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-beige w-full max-w-2xl p-6 rounded-2xl shadow-lg border-2 border-black/20 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-black/70 p-1"
        >
          <CloseIcon />
        </button>
        
        <h2 className="text-3xl font-momo text-black mb-6 text-center">
          {t('glossaryTitle')}
        </h2>

        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
          <div className="p-4 bg-white/50 rounded-lg border-2 border-black/10">
            <h3 className="text-xl font-momo text-black">{t('colorLegendTitle')}</h3>
            <ul className="list-none mt-2 space-y-1 font-bold">
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                {t('colorGreen')}
              </li>
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                {t('colorYellow')}
              </li>
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                {t('colorRed')}
              </li>
            </ul>
          </div>

          {terms.map(term => (
            <div key={term.key} className="p-4 bg-white/50 rounded-lg border-2 border-black/10">
              <h3 className="text-xl font-momo text-black">{term.title}</h3>
              <p className="text-black font-bold mt-1">{term.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Glossary;

