import { useState } from "react";
import { ReimbursementForm } from "../components/reimbursement-form";


export function NewReimbursement(){

    const [form, setForm] = useState<boolean>(true)

    function handleRequest(){

    }

    return<>
    <div>
        <ReimbursementForm/>
        <button onClick={handleRequest}>Request Reimbursement</button>
    </div>
    
    </>
}