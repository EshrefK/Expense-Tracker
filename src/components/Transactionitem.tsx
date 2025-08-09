'use client';

import { useState, useEffect } from 'react';
import { Transaction } from "@/types/Transaction";
import { CURRENCIES } from '@/types/Currency';
import { formatTransactionAmount, getCurrentCurrency } from '@/lib/currencyUtils';
import { toast } from "react-toastify";
import deleteTransaction from "@/app/actions/deleteTransaction";

export default function Transactionitem({transaction}: {transaction: Transaction}) {
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  useEffect(() => {
    setCurrency(getCurrentCurrency());
  }, []);

  const handleDelete = async (transactionId: string) => {
    const confirmed = confirm("Are you sure you want to delete this transaction?");
    if(!confirmed) return;
    
    const {message, error} = await deleteTransaction(transactionId);
    if(error) return toast.error(error);
    toast.success(message);
  };

  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
        {transaction.text} 
        <span>{formatTransactionAmount(transaction.amount, currency)}</span>
        <button className="delete-btn" onClick={() => handleDelete(transaction.id)}>X</button>
    </li>
  );
}
