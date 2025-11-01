import React from "react";
import { useMgnregaData, ALL_STATES, YEARS } from "../../context/DataContext";

const FilterControls = () => {
  const { filters, setFilters, limit, setLimit, offset, setOffset, total, data, detectedDistrict } = useMgnregaData();

  const availableDistricts = Array.from(new Set([filters.district, ...data.map(d => d.district_name)].filter(Boolean))).sort();

  return (
    <div className="bg-beige border-2 border-black/20 rounded-2xl p-4 text-black shadow-lg animate-fadeIn">
      
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">

        <div>
          <label className="block text-sm font-bold text-black mb-2">State</label>
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
          <label className="block text-sm font-bold text-black mb-2">Financial Year</label>
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
          <label className="block text-sm font-bold text-black mb-2">District (optional)</label>

          <div className="flex gap-2">
            <input
              list="districts"
              className="flex-1 bg-beige border-2 border-black/20 rounded-lg px-3 py-2.5 text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-black/30"
              value={filters.district}
              onChange={(e) => { setOffset(0); setFilters({ ...filters, district: e.target.value.toUpperCase() }); }}
              placeholder="Type district"
            />

            <button
              className="px-3 py-2.5 rounded-lg bg-black text-beige border-2 border-black/20 text-sm font-bold hover:bg-black/80 transition-colors whitespace-nowrap disabled:opacity-50"
              disabled={!detectedDistrict}
              onClick={() => {
                if (!detectedDistrict) return;
                setOffset(0);
                setFilters(prev => ({ ...prev, district: detectedDistrict }));
              }}
            >
              {detectedDistrict ? "Set" : "Detecting..."}
            </button>
          </div>

          <datalist id="districts">
            {availableDistricts.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2">Rows per page</label>
          <select
            className="w-full bg-beige border-2 border-black/20 rounded-lg px-3 py-2.5 text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-black/30"
            value={limit}
            onChange={(e) => { setOffset(0); setLimit(parseInt(e.target.value)); }}
          >
            {[10,20,50,100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2 justify-end col-span-1 sm:col-span-4">
          <button
            className="px-4 py-2.5 rounded-lg bg-beige border-2 border-black/20 text-base font-bold text-black hover:bg-black hover:text-beige disabled:opacity-50 transition-colors"
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={offset === 0}
          >
            Prev
          </button>
          <button
            className="px-4 py-2.5 rounded-lg bg-black text-beige border-2 border-black text-base font-bold hover:bg-black/80 transition-colors"
            onClick={() => setOffset(offset + limit)}
            disabled={offset + limit >= total}
          >
            Next
          </button>
        </div>

      </div>

      <div className="mt-3 text-sm font-bold text-black">Showing {offset + 1} - {Math.min(offset + limit, total)} of {total || "?"}</div>

    </div>
  );
};

export default FilterControls;
