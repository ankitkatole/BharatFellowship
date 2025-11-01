import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

const API_URL = "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";
const API_KEY = import.meta.env.VITE_API_KEY;

export const ALL_STATES = [
  "UTTAR PRADESH","MADHYA PRADESH","BIHAR","ASSAM","MAHARASHTRA","GUJARAT",
  "RAJASTHAN","TAMIL NADU","CHHATTISGARH","KARNATAKA","TELANGANA","ODISHA",
  "ANDHRA PRADESH","PUNJAB","JHARKHAND","HARYANA","ARUNACHAL PRADESH",
  "JAMMU AND KASHMIR","MANIPUR","UTTARAKHAND","KERALA","HIMACHAL PRADESH",
  "MEGHALAYA","WEST BENGAL","MIZORAM","NAGALAND","TRIPURA","SIKKIM",
  "ANDAMAN AND NICOBAR","LADAKH","PUDUCHERRY","GOA","DN HAVELI AND DD","LAKSHADWEEP"
];

export const YEARS = [
  "2020-2021","2021-2022","2022-2023","2023-2024","2024-2025"
];

const normalizeDistrictName = (raw = "") => {
  if (!raw) return "";
  let s = String(raw).toUpperCase();
  s = s.replace(/\(.+?\)/g, " ");
  const noise = ["RURAL","RURAL TALUKA","TALUKA","TALUK","TEHSIL","TAHSIL","BLOCK","SUBDIVISION","SUB DIVISION","NAGAR","NAGAR PANCHAYAT","MUNICIPALITY","MUNICIPAL CORPORATION","MUNICIPAL","GRAM PANCHAYAT","PANCHAYAT","CIVIL","DIST.","DIST","DISTRICT","WARD","TOWN","CITY","VILLAGE"];
  noise.forEach((w) => {
    const re = new RegExp(`\\b${w}\\b`, "g");
    s = s.replace(re, " ");
  });
  s = s.replace(/[-\/,]/g, " ").replace(/\s+/g, " ").trim();
  const tokens = s.split(" ").filter(Boolean);
  if (tokens.length > 2) {
    const last = tokens[tokens.length - 1];
    const first = tokens[0];
    s = last.length > 2 ? last : first;
  } else if (tokens.length === 2) {
    const [a, b] = tokens;
    if (["NORTH","SOUTH","EAST","WEST","CENTRAL"].includes(b)) {
      s = `${a} ${b}`;
    } else {
      s = `${a} ${b}`.trim();
    }
  } else {
    s = tokens.join(" ").trim();
  }
  return s;
};

export const MgnregaDataProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    state: "MAHARASHTRA",
    year: "2024-2025",
    district: "",
  });
  const [detectedDistrict, setDetectedDistrict] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [geoSupported, setGeoSupported] = useState(typeof navigator !== "undefined" && "geolocation" in navigator);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        "api-key": API_KEY,
        format: "json",
        offset: String(offset),
        limit: String(limit),
      });
      if (filters.state) params.append("filters[state_name]", filters.state);
      if (filters.year) params.append("filters[fin_year]", filters.year);
      if (filters.district) params.append("filters[district_name]", filters.district);
      const url = `${API_URL}?${params.toString()}`;
      const res = await fetch(url);
      const json = await res.json();
      setData(json.records || []);
      if (typeof json.total === "number") setTotal(json.total);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters, offset, limit]);

  useEffect(() => {
    if (!geoSupported) return;
    const timeoutId = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&accept-language=en`;
          const resp = await fetch(url, { headers: { Accept: "application/json" } });
          if (!resp.ok) return;
          const json = await resp.json();
          const address = json.address || {};
          const addressFields = ["district","state_district","county","city_district","city","town","village","municipality","hamlet","locality","borough"];
          let candidate = "";
          for (const field of addressFields) {
            if (address[field]) {
              const normalized = normalizeDistrictName(address[field]);
              if (normalized) {
                candidate = normalized;
                break;
              }
            }
          }
          if (!candidate) {
            const fallbackParts = [address.city,address.county,address.state_district,address.town,address.village].filter(Boolean);
            candidate = normalizeDistrictName(fallbackParts.join(" "));
          }
          if (!candidate && json.display_name) {
            const tokens = String(json.display_name).split(",").map(t => t.trim());
            for (const t of tokens) {
              const n = normalizeDistrictName(t);
              if (n) { candidate = n; break; }
            }
          }
          if (!candidate) return;
          const cleaned = candidate.replace(/\d+/g, "").trim();
          if (!cleaned || cleaned.length < 2) return;
          const candidateState = (address.state || "").toUpperCase();
          if (candidateState && ALL_STATES.includes(candidateState)) {
            setDetectedDistrict(cleaned);
            setFilters((prev) => ({
              ...prev,
              state: candidateState,
              district: cleaned,
            }));
            setOffset(0);
          } else if (ALL_STATES.includes(filters.state)) {
            setDetectedDistrict(cleaned);
            setFilters((prev) => ({
              ...prev,
              district: cleaned,
            }));
            setOffset(0);
          } else {
            setDetectedDistrict(cleaned);
            setFilters((prev) => ({ ...prev, district: cleaned }));
            setOffset(0);
          }
        } catch (err) {}
      }, () => {}, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [geoSupported]);

  return (
    <DataContext.Provider value={{
      data,
      filters,
      setFilters,
      loading,
      error,
      limit,
      setLimit,
      offset,
      setOffset,
      total,
      geoSupported,
      detectedDistrict,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useMgnregaData = () => useContext(DataContext);
