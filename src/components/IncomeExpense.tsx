'use client';

import { useState, useEffect } from 'react';
import { CURRENCIES } from '@/types/Currency';
import { formatCurrency, getCurrentCurrency } from '@/lib/currencyUtils';

interface IncomeExpenseProps {
  initialIncome: number;
  initialExpense: number;
}

export default function IncomeExpense({ initialIncome, initialExpense }: IncomeExpenseProps) {
  const [income, setIncome] = useState(initialIncome);
  const [expense, setExpense] = useState(initialExpense);
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  useEffect(() => {
    setCurrency(getCurrentCurrency());
  }, []);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{formatCurrency(income, currency)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">{formatCurrency(expense, currency)}</p>
      </div>
    </div>
  );
}
