import { useState } from "react";
import { ReimbursementForm } from "../components/reimbursement-form";
import { ReimbursementType } from "../types/types";
import { postReim } from "../api/reimbursment-requests";


export function NewReimbursement(){

    const [form, setForm] = useState<ReimbursementType>({date_of_expense:0,expense_type:"",amount:0,additional_comments:""})
    const [errMsg, setErrMsg] = useState<String>("")

    async function handleReimRequest(){
        try {
            await postReim(form);
        } catch (error) {
            setErrMsg("Please complete all necessary fields in the form")
        }
    }

    return<>
    <div className="nav-cont">
        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Revature-768x768.webp" alt="Revature Logo"></img>
        <h1 className="primary-headings">Expense Reimbursement System</h1>
    </div>
    

        {errMsg.length > 0 &&
            <p>{errMsg}</p>}

    <div className="main-form-cont">
        <ReimbursementForm form={form} setForm={setForm}/>
        <button className="form-submit-buttons" onClick={handleReimRequest}>Request Reimbursement</button>
    </div>
    
    </>
}