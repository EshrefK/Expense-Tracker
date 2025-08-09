"use client"
import { useRef } from "react"
import { addTransaction } from "@/app/actions/addTransaction"
import { toast } from "react-toastify"

export default function AddTransaction() {

    const formRef = useRef<HTMLFormElement>(null)

    const clientAction = async (formData: FormData) => {
        const {error} = await addTransaction(formData)

        if(error) {
            toast.error(error)
        }
        else {
            toast.success("Transaction added successfully")
            formRef.current?.reset()
        }

        
    }
  return (
    <>
        <h3>Add new transaction</h3>
        <form ref={formRef} action={clientAction}>
            <div className="form-control">
                <label htmlFor="text"></label>
                <input type="text" id="text" name="text" placeholder="Enter text..." />
            </div>
            <div className="form-control">
                <label htmlFor="amount">Amount <br/> (negative - expense, positive - income)</label>
                <input type="number" id="amount" name="amount" placeholder="Enter amount..."  step="0.01"/>
            </div>
            <button type="submit" className="btn">Add transaction</button>           
        </form>
    </>
  )
}
