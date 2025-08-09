import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import CurrencySelector from "./CurrencySelector";

export default async function Header() {
    const user = await checkUser();

  return (
    <>
    <nav className="navbar">
        <div className="navbar-container">
            <h2>Expense Tracker</h2>
            
            <div className="navbar-right">
                <CurrencySelector />
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    </nav>
    </>
  )
}
