import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { ReimbursementType } from "../types/types";


export function HomePage(){

    const [reimbursements, setReimbursements] = useState<ReimbursementType>({date_of_expense:0,expense_type:"",amount:0,additional_comments:""})

    useEffect(()=>{
        (async ()=>{
            const retrievedReims: ReimbursementType[] = await indexReims();
            setReimbursements(retrievedReims);
        })();
    }, [])

    return<>

    <Header/>

    <p>Welcome to Revature's expense reimbursement app! Our user-friendly platform makes it easy for you to submit your expenses and get reimbursed quickly. 
        Submit expenses on-the-go, from anywhere at any time.</p>

    <div>
        
    </div>
    
    </>
}