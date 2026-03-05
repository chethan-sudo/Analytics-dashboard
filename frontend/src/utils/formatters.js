const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const fullCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const integerFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export const formatCompactCurrency = (value) => compactCurrencyFormatter.format(value);

export const formatFullCurrency = (value) => fullCurrencyFormatter.format(value);

export const formatInteger = (value) => integerFormatter.format(value);

export const formatPercentValue = (value, decimals = 1) => `${Number(value).toFixed(decimals)}%`;

export const formatAxisMillions = (value) => {
  if (value === 0) {
    return "$0";
  }

  const millions = value / 1000000;
  const precision = millions >= 10 ? 0 : 1;
  return `$${millions.toFixed(precision)}M`;
};

export const formatCompactInteger = (value) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();