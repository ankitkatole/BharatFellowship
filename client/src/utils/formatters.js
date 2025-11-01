// NEW function for Lakh/Crore
export const formatLargeNumber = (value) => {
  const num = Number(value);
  if (!isFinite(num)) return "-";
  if (num === 0) return "0";

  if (Math.abs(num) >= 1e7) {
    return `${(num / 1e7).toFixed(2)} Crore`;
  }
  if (Math.abs(num) >= 1e5) {
    return `${(num / 1e5).toFixed(2)} Lakh`;
  }
  // For numbers less than 1 Lakh, just use commas
  return num.toLocaleString("en-IN");
};

export const formatNumber = (value) => {
  const num = Number(value);
  if (!isFinite(num)) return "-";
  return num.toLocaleString("en-IN");
};

// UPDATED function to use formatLargeNumber logic
export const formatCurrencyLakh = (value) => {
  const num = Number(value);
  if (!isFinite(num)) return "-";
  if (num === 0) return "₹0";

  // The API data for Total_Exp is already in Lakhs.
  // So, 10000 Lakhs = 100 Crore.
  if (Math.abs(num) >= 10000) {
    return `₹${(num / 10000).toFixed(2)} Crore`;
  }
  // If it's less than 10000, it's already in Lakhs.
  return `₹${num.toFixed(2)} Lakh`;
};

export const formatPercent = (value) => {
  const num = Number(value);
  if (!isFinite(num)) return "-";
  return `${num.toFixed(1)}%`; // Use 1 decimal for simplicity
};
