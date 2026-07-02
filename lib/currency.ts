/**
 * Format a price in South African Rand (ZAR)
 * @param price - The price value (number or string)
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatZAR(
  price: number | string, 
  options: { 
    showSymbol?: boolean; 
    showCode?: boolean;
    decimals?: number;
  } = {}
): string {
  const {
    showSymbol = true,
    showCode = false,
    decimals = 2
  } = options;

  // Parse the price
  const numPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.]/g, '')) 
    : price;

  if (isNaN(numPrice)) {
    return showSymbol ? 'R 0.00' : '0.00';
  }

  // Format with Intl.NumberFormat for ZAR
  const formatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    currencyDisplay: showCode ? 'code' : 'symbol',
  });

  return formatter.format(numPrice);
}

/**
 * Format price for display in product cards (compact)
 */
export function formatPriceCompact(price: number | string): string {
  const numPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.]/g, '')) 
    : price;

  if (isNaN(numPrice)) return 'R 0.00';

  // Remove .00 for whole numbers
  if (Number.isInteger(numPrice)) {
    return `R ${numPrice.toLocaleString('en-ZA')}`;
  }

  return `R ${numPrice.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Parse a price string to a number
 */
export function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, ''));
}

/**
 * Convert price to cents (for calculations)
 */
export function priceToCents(price: number | string): number {
  const numPrice = typeof price === 'string' ? parsePrice(price) : price;
  return Math.round(numPrice * 100);
}

/**
 * Convert cents to price string
 */
export function centsToPrice(cents: number): string {
  return formatZAR(cents / 100);
}
