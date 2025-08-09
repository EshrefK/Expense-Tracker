import { Currency, CURRENCIES } from "@/types/Currency";

export function formatCurrency(amount: number, currency: Currency): string {
  const absAmount = Math.abs(amount);
  
  // For JPY, don't show decimal places
  if (currency.code === 'JPY') {
    const formattedAmount = absAmount.toFixed(0);
    return `${currency.symbol}${formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  
  // For other currencies, show 2 decimal places with commas
  const formattedAmount = absAmount.toFixed(2);
  return `${currency.symbol}${formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function formatTransactionAmount(amount: number, currency: Currency): string {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? "-" : "+";
  
  // For JPY, don't show decimal places
  if (currency.code === 'JPY') {
    const formattedAmount = absAmount.toFixed(0);
    return `${sign}${currency.symbol}${formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  
  // For other currencies, show 2 decimal places with commas
  const formattedAmount = absAmount.toFixed(2);
  return `${sign}${currency.symbol}${formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function getCurrentCurrency(): Currency {
  // This will be used on the client side to get the selected currency
  if (typeof window !== 'undefined') {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      const currency = CURRENCIES.find(c => c.code === savedCurrency);
      if (currency) {
        return currency;
      }
    }
  }
  return CURRENCIES[0]; // Default to USD
}
