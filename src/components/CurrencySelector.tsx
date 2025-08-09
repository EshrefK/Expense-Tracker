'use client';

import { useState, useEffect } from 'react';
import { CURRENCIES, Currency } from '@/types/Currency';

export default function CurrencySelector() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved currency from localStorage
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      const currency = CURRENCIES.find(c => c.code === savedCurrency);
      if (currency) {
        setSelectedCurrency(currency);
      }
    }
  }, []);

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency.code);
    setIsOpen(false);
    
    // Refresh the page to update all components with new currency
    window.location.reload();
  };

  return (
    <div className="currency-selector">
      <button 
        className="currency-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {selectedCurrency.symbol} {selectedCurrency.code}
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="currency-dropdown">
          {CURRENCIES.map((currency) => (
            <button
              key={currency.code}
              className={`currency-option ${selectedCurrency.code === currency.code ? 'selected' : ''}`}
              onClick={() => handleCurrencyChange(currency)}
              type="button"
            >
              <span className="currency-symbol">{currency.symbol}</span>
              <span className="currency-name">{currency.name}</span>
              <span className="currency-code">({currency.code})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
