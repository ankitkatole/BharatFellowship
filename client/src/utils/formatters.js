export const formatNumber = (value) => {
  const num = Number(value);
  if (!isFinite(num)) return "-";
  return num.toLocaleString("en-IN");
};

export const formatCurrencyLakh = (value) => {
  const num = Number(value);
  if (!isFinite(num)) return "-";
  // API returns amounts in lakhs sometimes; treat generically as number and show Cr for large
  if (Math.abs(num) >= 1e7) return `₹${(num / 1e7).toFixed(2)} Cr`;
  if (Math.abs(num) >= 1e5) return `₹${(num / 1e5).toFixed(2)} L`;
  return `₹${formatNumber(num)}`;
};

export const formatPercent = (value) => {
  const num = Number(value);
  if (!isFinite(num)) return "-";
  return `${num.toFixed(2)}%`;
};


