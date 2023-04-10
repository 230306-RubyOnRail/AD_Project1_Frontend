import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { ReimbursementViewType } from "../types/types";
import { showUserReims } from "../api/reimbursment-requests"
import {useNavigate} from "react-router-dom";


export function HomePage(){

    const navigate = useNavigate();
    const [reimbursements, setReimbursements] = useState<ReimbursementViewType[]>([])

    let getReims = async () => {
        let response = await showUserReims();
        if (response.status === 200) {
            setReimbursements(response.data);
            console.log(response.data);
        } else {
            console.log('Unable to retrieve user reimbursements');
        }
    }

    useEffect(() => {
        console.log('Use effect is triggered');
        return function() {
            console.log('Use effect cleanup (unmounting getReims component)')
        }
    }, []);

    useEffect(()=>{
        getReims();
    }, []);

    // useEffect(()=>{
    //     (async ()=>{
    //         const retrievedReims: ReimbursementType[] = await getReims();
    //         setReimbursements(retrievedReims);
    //     })();
    // }, [])

    return<>

    <Header/>

    <p>Welcome to Revature's expense reimbursement app! Our user-friendly platform makes it easy for you to submit your expenses and get reimbursed quickly. 
        Submit expenses on-the-go, from anywhere at any time.</p>

        <p>The following is a list of your currently submitted reimbursements:</p>

    <div>
        {reimbursements.length === 0 ? (
            <p>No reimbursements to display</p>
        ) : (
            <ul>
                {reimbursements.map((reimbursement: ReimbursementViewType) => (
                    <li key={reimbursement.id}>
                        <p>Submitted: {reimbursement.created_at}</p>
                        <p>Last Updated: {reimbursement.updated_at}</p>
                        <p>Date of expense: {reimbursement.date_of_expense}</p>
                        <p>Expense type: {reimbursement.expense_type}</p>
                        <p>Amount: {reimbursement.amount}</p>
                        <p>Additional comments: {reimbursement.additional_comments}</p>
                        <p>Status: {reimbursement.status}</p>
                        <button onClick={()=> navigate(`/updatereimbursement/${reimbursement.id}`)}>Update Reimbursement</button>
                    </li>
                ))}
            </ul>
        )}
    </div>
    
    </>
}