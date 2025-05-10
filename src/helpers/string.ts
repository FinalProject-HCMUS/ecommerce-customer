const formatCurrency = (value: number, currency: 'USD' | 'VND'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export { formatCurrency };
