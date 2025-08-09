import { Transaction } from "@/types/Transaction"
import getTransactions from "@/app/actions/getTransactions"
import Transactionitem from "@/components/Transactionitem"

export default async function TransactionList() {
    const {transactions, error} = await getTransactions()

    if(error) return <p>{error}</p>

  return (
    <>
    <h3>History</h3>
    <ul id="list" className="list">
        { transactions && transactions.map((transaction: Transaction) => (
            <Transactionitem key={transaction.id} transaction={transaction} />
        ))}
    </ul>
    </>
  )
}
