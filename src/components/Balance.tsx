'use client';

import { useState, useEffect } from 'react';
import { CURRENCIES } from '@/types/Currency';
import { formatCurrency, getCurrentCurrency } from '@/lib/currencyUtils';

interface BalanceProps {
  initialBalance: number;
}

export default function Balance({ initialBalance }: BalanceProps) {
  const [balance, setBalance] = useState(initialBalance);
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  useEffect(() => {
    setCurrency(getCurrentCurrency());
  }, []);

  return (
    <>
      <h4>Your Balance</h4>
      <h1 id="balance">{formatCurrency(balance, currency)}</h1>
    </>
  );
}
