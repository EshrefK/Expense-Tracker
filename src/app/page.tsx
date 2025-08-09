import Guest from "@/components/Guest"
import { currentUser } from "@clerk/nextjs/server"
import AddTransaction from "@/components/AddTransaction"
import Balance from "@/components/Balance"
import IncomeExpense from "@/components/IncomeExpense"
import TransactionList from "@/components/TransactionList"
import getUserBalance from "@/app/actions/getUserBalance"
import getIncomeExpense from "@/app/actions/getIncomeExpense"

export default async function HomePage() {
  const user = await currentUser()

  if(!user) return <Guest />

  // Fetch data for components
  const { balance } = await getUserBalance()
  const { income, expense } = await getIncomeExpense()

  return (
    <div>
      <h2>Welcome, {user.firstName}</h2>
      <Balance initialBalance={Number(balance?.toFixed(2) ?? 0)} />
      <IncomeExpense 
        initialIncome={Number(income?.toFixed(2) ?? 0)} 
        initialExpense={Number(expense?.toFixed(2) ?? 0)} 
      />
      <AddTransaction />
      <TransactionList />
    </div>
  )
}
