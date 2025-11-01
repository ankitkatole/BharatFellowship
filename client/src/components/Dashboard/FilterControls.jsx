import React from "react";
import { useMgnregaData, ALL_STATES, YEARS } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext"; // Import language hook

const FilterControls = () => {
  const { filters, setFilters, limit, setLimit, offset, setOffset, total, data } = useMgnregaData();
  const { t } = useLanguage(); // Get translation function

  const availableDistricts = Array.from(new Set([filters.district, ...data.map(d => d.district_name)].filter(Boolean))).sort();

  return (
    <div className="bg-beige border-2 border-black/20 rounded-2xl p-4 text-black shadow-lg animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-bold text-black mb-2">{t('state')}</label>
          <select
            className="w-full bg-beige border-2 border-black/20 rounded-lg px-3 py-2.5 text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-black/30"
            value={filters.state}
            onChange={(e) => { setOffset(0); setFilters({ ...filters, state: e.target.value }); }}
          >
            {ALL_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2">{t('financialYear')}</label>
          <select
            className="w-full bg-beige border-2 border-black/20 rounded-lg px-3 py-2.5 text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-black/30"
            value={filters.year}
            onChange={(e) => { setOffset(0); setFilters({ ...filters, year: e.target.value }); }}
          >
            {YEARS.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2">{t('district')}</label>
          <input
            list="districts"
            className="w-full bg-beige border-2 border-black/20 rounded-lg px-3 py-2.5 text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-black/30"
            value={filters.district}
            onChange={(e) => { setOffset(0); setFilters({ ...filters, district: e.target.value.toUpperCase() }); }}
            placeholder="Type to filter district"
          />
          <datalist id="districts">
            {availableDistricts.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2">{t('rowsPerPage')}</label>
          <select
            className="w-full bg-beige border-2 border-black/20 rounded-lg px-3 py-2.5 text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-black/30"
            value={limit}
            onChange={(e) => { setOffset(0); setLimit(parseInt(e.target.value)); }}
          >
            {[10,20,50,100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm font-bold text-black mb-2 sm:mb-0">
          {t('showing')} {offset + 1} - {Math.min(offset + limit, total)} {t('of')} {total || "?"}
        </div>
        <div className="flex items-center gap-2 justify-end">
          <button
            className="px-4 py-2.5 rounded-lg bg-beige border-2 border-black/20 text-base font-bold text-black hover:bg-black hover:text-beige disabled:opacity-50 transition-colors"
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={offset === 0}
          >
            {t('prev')}
          </button>
          <button
            className="px-4 py-2.5 rounded-lg bg-black text-beige border-2 border-black text-base font-bold hover:bg-black/80 transition-colors"
            onClick={() => setOffset(offset + limit)}
            disabled={offset + limit >= total}
          >
            {t('next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
