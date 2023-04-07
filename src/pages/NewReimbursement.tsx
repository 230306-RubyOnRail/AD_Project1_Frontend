import { useState } from "react";
import { ReimbursementForm } from "../components/reimbursement-form";
import { ReimbursmentForm } from "../types/types";


export function NewReimbursement(){

    const [form, setForm] = useState<ReimbursmentForm>({date_of_expense:0,expense_type:"",amount:0,additional_comments:""})

    function handleRequest(){

    }

    return<>
    <div className="nav-cont">
        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Revature-768x768.webp" alt="Revature Logo"></img>
        <h1 className="primary-headings">Expense Reinbursement System</h1>
    </div>
    <div className="main-form-cont">
        <ReimbursementForm form={form} setForm={setForm}/>
        <button className="form-submit-buttons" onClick={handleRequest}>Request Reimbursement</button>
    </div>
    
    </>
}